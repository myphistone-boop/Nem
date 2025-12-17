import React from 'react';
import { Card } from './ui/Card';
import { Zap, TrendingUp, Award } from 'lucide-react';
import { Benefit } from '../types';

export const Benefits: React.FC = () => {
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

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>
              <Card className="h-full border-t border-t-border bg-surface/80 backdrop-blur-md">
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-background text-xs font-medium text-textMuted border border-border group-hover:border-fuchsia-500/30 transition-colors">
                  {benefit.badge}
                </div>
                <div className="mt-8 mb-4">
                  {index === 0 && <TrendingUp className="w-10 h-10 text-orange-500 mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]" />}
                  {index === 1 && <Award className="w-10 h-10 text-fuchsia-500 mb-4 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]" />}
                  {index === 2 && <Zap className="w-10 h-10 text-cyan-500 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]" />}
                  <h3 className="text-xl font-bold mb-2 text-textMain">{benefit.title}</h3>
                  <p className="text-textMuted text-sm">{benefit.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};