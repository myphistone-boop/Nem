import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Zap, TrendingUp, Award, ChevronDown } from 'lucide-react';
import { Benefit } from '../types';

export const Benefits: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const benefits: Benefit[] = [
    {
      title: "Flux de clients constant",
      description: "En combinant SEO et Google Maps, nous assurons que votre téléphone sonne et que vos demandes de devis augmentent régulièrement.",
      badge: "Croissance"
    },
    {
      title: "Référence sur votre ville",
      description: "Nous optimisons votre présence pour que vous passiez devant vos concurrents directs. Devenez l'acteur incontournable de votre secteur.",
      badge: "Autorité"
    },
    {
      title: "Retour sur Investissement",
      description: "Chaque euro investi dans votre visibilité doit vous en rapporter plus. Notre approche est focalisée sur la rentabilité et l'augmentation de votre CA.",
      badge: "Rentabilité"
    }
  ];

  const toggleBenefit = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="why">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
             <h2 className="text-3xl lg:text-5xl font-bold leading-tight font-display text-textMain">
              Un partenaire dédié à <br/>
              <span className="synthwave-gradient-text drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">votre développement</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg text-textMuted border-l-2 border-fuchsia-500/30 pl-6">
              Ne laissez pas le marché à vos concurrents. Nemphisia vous apporte les outils d'acquisition clients les plus performants pour développer sereinement votre activité.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative group cursor-pointer lg:cursor-default" onClick={() => toggleBenefit(index)}>
              <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>
              
              <Card className="h-full border-t border-t-border bg-surface/80 backdrop-blur-md">
                
                {/* Mobile Header Layout */}
                <div className="flex items-center justify-between lg:block">
                   <div className="flex items-center gap-4 lg:block">
                      <div className="lg:mb-4 lg:mt-8">
                        {index === 0 && <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]" />}
                        {index === 1 && <Award className="w-8 h-8 lg:w-10 lg:h-10 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]" />}
                        {index === 2 && <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]" />}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold lg:mb-2 text-textMain">{benefit.title}</h3>
                   </div>

                   {/* Mobile Badge & Chevron */}
                   <div className="flex items-center gap-3 lg:absolute lg:top-6 lg:right-6">
                      <div className="hidden sm:block lg:block px-3 py-1 rounded-full bg-background text-xs font-medium text-textMuted border border-border group-hover:border-fuchsia-500/30 transition-colors">
                        {benefit.badge}
                      </div>
                      <div className="lg:hidden">
                         <ChevronDown className={`w-5 h-5 text-textMuted transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} />
                      </div>
                   </div>
                </div>

                {/* Collapsible Content */}
                <div className={`mt-4 lg:mt-0 ${expandedIndex === index ? 'block animate-in fade-in slide-in-from-top-1' : 'hidden'} lg:block`}>
                   {/* Mobile badge shown inside content for very small screens */}
                   <div className="sm:hidden mb-3 inline-block px-3 py-1 rounded-full bg-background text-xs font-medium text-textMuted border border-border">
                        {benefit.badge}
                   </div>
                   <p className="text-textMuted text-sm leading-relaxed">{benefit.description}</p>
                </div>

              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};