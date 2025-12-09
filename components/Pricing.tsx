import React from 'react';
import { Check, Zap, Rocket, Shield, Globe, Server } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Essentiel",
      price: "199",
      description: "La présence digitale indispensable pour démarrer sereinement.",
      icon: Globe,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      features: [
        "Site Vitrine One-Page",
        "Hébergement Sécurisé inclus",
        "Certificat SSL (HTTPS)",
        "Optimisation Mobile",
        "Formulaire de contact"
      ]
    },
    {
      name: "Business",
      price: "399",
      description: "Une solution complète pour convertir vos visiteurs en clients.",
      icon: Rocket,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      features: [
        "Site Multi-pages (jusqu'à 5)",
        "CMS (Modifiez vos textes)",
        "Optimisation SEO avancée",
        "Blog / Actualités",
        "Statistiques visiteurs",
        "Support prioritaire"
      ]
    },
    {
      name: "Elite",
      price: "499",
      description: "Performance maximale et sécurité de niveau militaire.",
      icon: Shield,
      color: "fuchsia",
      gradient: "from-fuchsia-600 to-purple-600",
      features: [
        "Design 100% Sur Mesure",
        "Fonctionnalités E-commerce",
        "Audit de Sécurité mensuel",
        "Pare-feu WAF Dédié",
        "Sauvegardes horaires",
        "Maintenance 24/7 incluse"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative bg-background overflow-hidden" id="pricing">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display text-textMain">
            Des tarifs <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">transparents</span>
          </h2>
          <p className="text-textMuted text-lg">
            Investissez dans une infrastructure web robuste. Pas de frais cachés, pas de surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                      <div className={`mt-0.5 p-0.5 rounded-full bg-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-500/20 text-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-400`}>
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
      </div>
    </section>
  );
};