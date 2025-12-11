import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { STRIPE_OFFERS } from '../config/stripe-config';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Sécurité simple par token
  const token = req.query.token;
  if (token !== process.env.BOOTSTRAP_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY is missing' });
  }

  const results: Array<{ key: string; priceId: string; status: 'created' | 'already_exists' }> = [];

  try {
    for (const offer of STRIPE_OFFERS) {
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
          status: 'already_exists',
        });
        continue;
      }

      // 2) Créer le Product
      const product = await stripe.products.create({
        name: offer.name,
        description: offer.description,
      });

      // 3) Créer le Price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: offer.amount,
        currency: offer.currency,
        lookup_key: offer.key,
        active: true,
      });

      results.push({
        key: offer.key,
        priceId: price.id,
        status: 'created',
      });
    }

    return res.status(200).json({
      message: 'Bootstrap Stripe terminé',
      results,
    });
  } catch (error: any) {
    console.error('Stripe bootstrap error:', error);
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}