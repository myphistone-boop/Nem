// Configuration des offres Stripe utilisée côté front (ou pour affichage)
export const STRIPE_OFFERS = [
  {
    key: "essential",
    name: "Offre Essentiel",
    amount: 19900, // 199.00 €
    currency: "eur",
    description: "La solution de découverte efficace pour son activité",
  },
  {
    key: "business",
    name: "Offre Business",
    amount: 39900, // 399.00 €
    currency: "eur",
    description:
      "La solution technique pour développer son chiffre d'affaires",
  },
  {
    key: "elite",
    name: "Offre Elite",
    amount: 49900, // 499.00 €
    currency: "eur",
    description:
      "La solution d'architecture complète pour croissance avancée",
  },
] as const;

export type StripeOfferKey = (typeof STRIPE_OFFERS)[number]["key"];
