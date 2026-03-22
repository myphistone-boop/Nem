
import React from 'react';
import { Rocket, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const Pricing: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const includes = [
    "Site sur mesure (1 à 9 pages)",
    "Design professionnel & responsive mobile",
    "Optimisation SEO & Google Maps",
    "Copywriting de vente persuasif",
    "Appels à l'action stratégiques",
    "Hébergement rapide inclus",
    "Formulaire de contact / prise de RDV",
    "Maintenance technique de base",
  ];

  return (
    <section className="py-10 lg:py-14 relative bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16" id="pricing">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display text-textMain">
            Investissez dans votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">croissance</span>
          </h2>
          <p className="text-textMuted text-lg">
            Un tarif adapté à votre projet, sans surprise. Notre équipe vous accompagne pour définir la solution idéale.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="relative p-8 lg:p-12 bg-surface/50 border-border">

            {/* Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-orange-500 flex items-center justify-center text-white shadow-lg mx-auto mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-textMain font-display mb-2">Votre site sur-mesure</h3>
              <p className="text-textMuted">Selon la complexité, le nombre de pages et vos besoins spécifiques.</p>
            </div>

            {/* Price Range */}
            <div className="text-center mb-8 py-6 border-y border-border">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl lg:text-6xl font-bold font-display text-textMain">300</span>
                <span className="text-2xl lg:text-3xl font-bold text-textMuted">-</span>
                <span className="text-5xl lg:text-6xl font-bold font-display text-textMain">600€</span>
              </div>
              <span className="text-sm font-medium text-textMuted mt-2 block">+ 29€ / mois (Hébergement & Suivi)</span>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {includes.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-textMain/80">
                  <div className="mt-0.5 p-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button variant="secondary" className="w-full" size="lg" onClick={scrollToContact}>
              Demander un devis personnalisé
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-center text-xs text-textMuted mt-4">
              Notre équipe commerciale vous recontacte sous 24h avec une proposition adaptée.
            </p>

          </Card>
        </div>
      </div>
    </section>
  );
};
