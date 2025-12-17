import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Layout, MapPin, TrendingUp, ChevronDown } from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services: Service[] = [
    {
      title: "Site Web Immersif & Convaincant",
      description: "Nous ne créons pas de simples sites vitrines. Nous construisons des outils de vente au design unique, optimisés pour guider l'utilisateur vers l'achat ou la prise de contact.",
      icon: Layout
    },
    {
      title: "Optimisation Google Maps",
      description: "Devenez le choix évident sur votre secteur. Nous optimisons votre fiche Google Business pour capter tous les clients qui cherchent vos services à proximité.",
      icon: MapPin
    },
    {
      title: "Référencement SEO & Performance",
      description: "Positionnez-vous comme le choix évident. Nous propulsons votre site en haut des résultats de recherche pour un flux constant de prospects qualifiés.",
      icon: TrendingUp
    }
  ];

  const toggleService = (index: number) => {
    // Si on clique sur celui déjà ouvert, on le ferme, sinon on l'ouvre
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16" id="services">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 font-display text-textMain">Des services complets pour <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">votre réussite commerciale</span></h2>
          <p className="text-textMuted text-lg">
            De la visibilité locale à la conversion finale, nous gérons toute la chaîne d'acquisition pour que votre entreprise prospère.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} onClick={() => toggleService(index)} className="cursor-pointer lg:cursor-default">
              <Card className={`bg-surface/50 border-border group transition-all duration-300 ${expandedIndex === index ? 'ring-1 ring-fuchsia-500/30' : ''}`}>
                
                {/* Header: Always Visible */}
                <div className="flex items-center justify-between lg:block">
                  <div className="flex items-center gap-4 lg:block">
                    <div className="lg:mb-6 p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 w-fit group-hover:from-fuchsia-500/20 group-hover:to-orange-500/20 transition-colors border border-border">
                      <service.icon className="w-6 h-6 lg:w-8 lg:h-8 text-fuchsia-500 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-textMain group-hover:text-fuchsia-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Mobile Chevron */}
                  <div className="lg:hidden text-textMuted">
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-fuchsia-500' : ''}`} />
                  </div>
                </div>

                {/* Content: Hidden on Mobile unless expanded */}
                <div className={`mt-4 lg:mt-0 ${expandedIndex === index ? 'block animate-in fade-in slide-in-from-top-2' : 'hidden'} lg:block`}>
                  <div className="lg:mt-3">
                    <p className="text-textMuted leading-relaxed mb-6 group-hover:text-textMain transition-colors text-sm lg:text-base">
                      {service.description}
                    </p>
                    <a href="#contact" className="inline-flex items-center text-sm font-semibold text-fuchsia-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                      En savoir plus <span className="ml-1 text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>

              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};