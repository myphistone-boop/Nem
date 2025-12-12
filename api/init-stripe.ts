import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ ok: false, error: "STRIPE_SECRET_KEY missing" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16" as any,
    });

    // Appel tout simple pour tester la connexion
    const balance = await stripe.balance.retrieve();

    return res.status(200).json({ ok: true, hasBalance: !!balance.object });
  } catch (e: any) {
    console.error("init-stripe error:", e?.message || e);
    return res.status(500).json({ ok: false, error: e?.message || "error" });
  }
}