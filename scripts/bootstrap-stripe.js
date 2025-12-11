
/**
 * SCRIPT D'INITIALISATION STRIPE
 * 
 * Usage:
 * 1. Assurez-vous d'avoir STRIPE_SECRET_KEY dans votre environnement
 * 2. Exécutez: node scripts/bootstrap-stripe.js
 */

const Stripe = require('stripe');

// Configuration des offres (Dupliquée ici pour éviter les problèmes d'import TS dans un script JS simple)
const OFFERS = [
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Utilisez la version la plus récente
});

async function bootstrap() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ ERREUR: La variable STRIPE_SECRET_KEY est manquante.');
    process.exit(1);
  }

  console.log('🚀 Démarrage de l\'initialisation des produits Stripe...');

  for (const offer of OFFERS) {
    try {
      // 1. Vérifier si un prix existe déjà avec cette clé de recherche
      const prices = await stripe.prices.list({
        lookup_keys: [offer.key],
        active: true,
        limit: 1,
      });

      if (prices.data.length > 0) {
        console.log(`✅ L'offre [${offer.key}] existe déjà. (Price ID: ${prices.data[0].id})`);
        continue;
      }

      // 2. Si non, créer le produit
      console.log(`✨ Création du produit pour [${offer.key}]...`);
      const product = await stripe.products.create({
        name: offer.name,
        description: offer.description,
      });

      // 3. Créer le prix associé
      const price = await stripe.prices.create({
        unit_amount: offer.amount,
        currency: offer.currency,
        product: product.id,
        lookup_key: offer.key,
        transfer_lookup_key: true, // Permet de retrouver le prix via la clé
      });

      console.log(`🎉 Succès ! Offre [${offer.key}] créée. (Price ID: ${price.id})`);

    } catch (error) {
      console.error(`❌ Erreur lors du traitement de [${offer.key}]:`, error.message);
    }
  }

  console.log('\n🏁 Initialisation terminée.');
}

bootstrap();
