import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { offerKey } = req.body as { offerKey?: string };

    if (!offerKey) {
      return res.status(400).json({ error: "Missing offerKey" });
    }

    // 1. Récupérer le prix Stripe via la lookup_key
    const prices = await stripe.prices.list({
      lookup_keys: [offerKey],
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      return res
        .status(404)
        .json({ error: "Price not found for this offerKey" });
    }

    const priceId = prices.data[0].id;
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || (req.headers.origin as string);

    // 2. Créer la session Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}#pricing`,
      cancel_url: `${siteUrl}/?canceled=true#pricing`,
      billing_address_collection: "auto",
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe API Error:", err?.message || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}