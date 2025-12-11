import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// On réutilise la config ici pour éviter les soucis d'import inter-dossiers dans les Serverless Functions simples
const STRIPE_OFFERS = [
  {
    key: "essential",
    name: "Offre Essentiel",
    amount: 19900, 
    currency: "eur",
    description: "La solution de découverte efficace pour son activité"
  },
  {
    key: "business",
    name: "Offre Business",
    amount: 39900, 
    currency: "eur",
    description: "La solution technique pour développer son chiffre d'affaires"
  },
  {
    key: "elite",
    name: "Offre Elite",
    amount: 49900, 
    currency: "eur",
    description: "La solution d'architecture complète pour croissance avancée"
  }
];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Sécurité basique : on accepte que les POST pour éviter les déclenchements accidentels
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY manquante sur le serveur' });
  }

  const logs: string[] = [];
  const log = (msg: string) => logs.push(msg);

  try {
    log(' Démarrage de l\'initialisation via API...');

    for (const offer of STRIPE_OFFERS) {
      // 1. Vérifier existence
      const prices = await stripe.prices.list({
        lookup_keys: [offer.key],
        active: true,
        limit: 1,
      });

      if (prices.data.length > 0) {
        log(` L'offre [${offer.key}] existe déjà. (Price ID: ${prices.data[0].id})`);
        continue;
      }

      // 2. Créer Produit
      log(` Création du produit pour [${offer.key}]...`);
      const product = await stripe.products.create({
        name: offer.name,
        description: offer.description,
      });

      // 3. Créer Prix
      const price = await stripe.prices.create({
        unit_amount: offer.amount,
        currency: offer.currency,
        product: product.id,
        lookup_key: offer.key,
        transfer_lookup_key: true,
      });

      log(`🎉 Succès ! Offre [${offer.key}] créée. (Price ID: ${price.id})`);
    }

    log('🏁 Initialisation terminée avec succès.');
    
    return res.status(200).json({ success: true, logs });

  } catch (error: any) {
    console.error('Erreur Init Stripe:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message, 
      logs 
    });
  }
}