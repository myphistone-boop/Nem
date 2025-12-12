import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// On DUPLIQUE volontairement la config ici pour éviter tout problème d'import
const OFFERS = [
  {
    key: "essential",
    name: "Offre Essentiel",
    amount: 19900,
    currency: "eur",
    description: "La solution de découverte efficace pour son activité",
  },
  {
    key: "business",
    name: "Offre Business",
    amount: 39900,
    currency: "eur",
    description:
      "La solution technique pour développer son chiffre d'affaires",
  },
  {
    key: "elite",
    name: "Offre Elite",
    amount: 49900,
    currency: "eur",
    description:
      "La solution d'architecture complète pour croissance avancée",
  },
];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Optionnel : restreindre à GET seulement
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Sécurité simple par token dans la query
  const token = req.query.token;
  if (!token || token !== process.env.BOOTSTRAP_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res
      .status(500)
      .json({ error: "STRIPE_SECRET_KEY is missing from environment" });
  }

  const results: Array<{
    key: string;
    priceId: string;
    status: "created" | "already_exists";
  }> = [];

  try {
    for (const offer of OFFERS) {
      // 1) Vérifier si un Price existe déjà avec cette lookup_key
      const existing = await stripe.prices.list({
        lookup_keys: [offer.key],
        active: true,
        limit: 1,
      });

      if (existing.data.length > 0) {
        results.push({
          key: offer.key,
          priceId: existing.data[0].id,
          status: "already_exists",
        });
        continue;
      }

      // 2) Créer le Product
      const product = await stripe.products.create({
        name: offer.name,
        description: offer.description,
      });

      // 3) Créer le Price associé
      const price = await stripe.prices.create({
        unit_amount: offer.amount,
        currency: offer.currency,
        product: product.id,
        lookup_key: offer.key,
        active: true,
      });

      results.push({
        key: offer.key,
        priceId: price.id,
        status: "created",
      });
    }

    return res.status(200).json({
      message: "Bootstrap Stripe terminé",
      results,
    });
  } catch (error: any) {
    console.error("Stripe bootstrap error:", error);
    return res
      .status(500)
      .json({ error: error?.message || "Unknown Stripe error" });
  }
}