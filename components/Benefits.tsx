import React from 'react';
import { Card } from './ui/Card';
import { Zap, Lock, HeartHandshake } from 'lucide-react';
import { Benefit } from '../types';

export const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      title: "Performance Extrême",
      description: "Des temps de chargement réduits au minimum pour un meilleur référencement et une expérience utilisateur fluide.",
      badge: "Vitesse"
    },
    {
      title: "Sécurité Maximale",
      description: "Protection proactive contre les piratages et fuites de données. Vos clients sont en sécurité chez vous.",
      badge: "Zéro Risque"
    },
    {
      title: "Sérénité Totale",
      description: "Déléguez la technique. En cas de bug ou de panne, nous intervenons immédiatement sans surcoût.",
      badge: "Maintenance"
    }
  ];

  return (
    <section className="py-24 bg-[#090014] relative overflow-hidden" id="why">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
             <h2 className="text-3xl lg:text-5xl font-bold leading-tight font-display">
              Imaginé pour votre <br/>
              <span className="synthwave-gradient-text drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">tranquillité d'esprit</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg text-gray-400 border-l-2 border-fuchsia-500/30 pl-6">
              Concentrez-vous sur votre métier. Nemphisia gère la complexité technologique, les serveurs et la sécurité avec une rigueur militaire.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>
              <Card className="h-full border-t border-t-white/10 bg-[#150528]/80 backdrop-blur-md">
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 border border-white/5 group-hover:border-fuchsia-500/30 transition-colors">
                  {benefit.badge}
                </div>
                <div className="mt-8 mb-4">
                  {index === 0 && <Zap className="w-10 h-10 text-orange-400 mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]" />}
                  {index === 1 && <Lock className="w-10 h-10 text-fuchsia-400 mb-4 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]" />}
                  {index === 2 && <HeartHandshake className="w-10 h-10 text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]" />}
                  <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};