import React from 'react';
import { Check, Zap, Rocket, Shield, Globe, Server } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Essentiel",
      price: "199",
      description: "La solution de découverte efficace pour son activité",
      icon: Globe,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      features: [
        "Site vitrine 1-3 pages",
        "1 post-modification offerte",
        "Formulaire de contact (180 mails /mois)",
        "Design sur mesure",
        "Optimisation mobile",
        "Hébergement + SSL",
        "Maintenance web (DNS, domaine)",
        "Maintenance technique (clés API, intégrations statiques)"
      ]
    },
    {
      name: "Business",
      price: "399",
      description: "La solution technique pour développer son chiffre d'affaires en ligne",
      icon: Rocket,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      features: [
        "Site vitrine 1–6 pages",
        "2 post-modifications offertes",
        "−25 % sur toute la main-d’œuvre",
        "Formulaire de contact (180 mails /mois)",
        "Design sur mesure",
        "Optimisation mobile",
        "Hébergement + SSL",
        "Maintenance web (DNS, domaine)",
        "Maintenance technique (clés API, intégrations statiques)"
      ]
    },
    {
      name: "Elite",
      price: "499",
      description: "La solution d'architecture complète pour soutenir une croissance avancée",
      icon: Shield,
      color: "fuchsia",
      gradient: "from-fuchsia-600 to-purple-600",
      features: [
        "Site vitrine 1–9 pages",
        "3 post-modifications offertes",
        "−50 % sur toute la main-d’œuvre",
        "Formulaire de contact (180 mails /mois)",
        "Design sur mesure",
        "Optimisation mobile",
        "Hébergement + SSL",
        "Maintenance web (DNS, domaine)",
        "Maintenance technique (clés API, intégrations statiques)"
      ]
    }
  ];

  const laborRates = [
    { label: "Ajout d’animations légères", base: 25, business: 18, elite: 12 },
    { label: "Animation de section ou de titre", base: 40, business: 30, elite: 20 },
    { label: "Effet visuel premium", base: 35, business: 26, elite: 17 },
    { label: "Création d’une carte ou d’un bloc design", base: 30, business: 22, elite: 15 },
    { label: "Fond graphique / dégradé personnalisé", base: 20, business: 15, elite: 10 },
    { label: "Fond animé", base: 60, business: 45, elite: 30 },
    { label: "Mise en forme d’une section complète", base: 50, business: 37, elite: 25 },
    { label: "Galerie ou bloc images stylisé", base: 45, business: 33, elite: 22 },
    { label: "Bouton ou CTA premium", base: 20, business: 15, elite: 10 },
    { label: "Éléments décoratifs (icônes, séparateurs...)", base: 15, business: 11, elite: 7 },
  ];

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative bg-background overflow-hidden" id="pricing">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display text-textMain">
            Des tarifs <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">clairs</span>
          </h2>
          <p className="text-textMuted text-lg">
            Investissez dans une expertise technique au service de votre chiffre d'affaires.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <div key={index} className="relative group">
              
              <Card className={`h-full relative flex flex-col p-6 xl:p-8 bg-surface/50 border-border hover:border-opacity-50 transition-all duration-300`}>
                
                <div className="mb-6 xl:mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-textMain mb-2">{plan.name}</h3>
                  
                  {/* Prix et Maintenance */}
                  <div className="flex flex-col mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-4xl xl:text-5xl font-bold font-display text-textMain">{plan.price}-</span>
                    </div>
                    <span className="text-sm font-medium text-textMuted mt-1">+ 29- / mois de maintenance</span>
                  </div>

                  <p className="text-sm text-textMuted leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-textMain/80">
                      <div className={`mt-0.5 p-0.5 rounded-full bg-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-500/20 text-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-400 shrink-0`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.price === "399" ? 'secondary' : 'outline'} 
                  className="w-full"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Choisir ce forfait
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {/* Labor Grid Section */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 font-display text-textMain">
            Grille Tarifaire <span className="text-fuchsia-400">à la carte</span>
          </h3>
          <p className="text-center text-textMuted mb-8 max-w-2xl mx-auto">
             Tarifs pour les interventions supplémentaires (hors forfait ou modifications incluses). Les réductions Business et Elite sont automatiquement appliquées.
          </p>

          <Card className="overflow-hidden p-0 border-border bg-surface/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-surface-highlight/50">
                    <th className="p-4 pl-6 font-bold text-textMain text-sm uppercase tracking-wider w-[40%]">Intervention</th>
                    <th className="p-4 font-bold text-textMuted text-center w-[20%]">Essentiel</th>
                    <th className="p-4 font-bold text-orange-500 text-center w-[20%]">Business <span className="text-xs opacity-70 block sm:inline">(-25%)</span></th>
                    <th className="p-4 font-bold text-fuchsia-500 text-center w-[20%]">Elite <span className="text-xs opacity-70 block sm:inline">(-50%)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {laborRates.map((rate, idx) => (
                    <tr key={idx} className="hover:bg-surface-highlight/50 transition-colors">
                      <td className="p-4 pl-6 text-sm font-medium text-textMain">{rate.label}</td>
                      <td className="p-4 text-center text-sm font-bold text-textMuted">{rate.base}-</td>
                      <td className="p-4 text-center text-sm font-bold text-orange-500">{rate.business}-</td>
                      <td className="p-4 text-center text-sm font-bold text-fuchsia-500">{rate.elite}-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};