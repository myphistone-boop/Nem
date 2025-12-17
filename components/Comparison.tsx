import React from 'react';
import { Rocket, Target, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/Card';

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 container mx-auto px-6 relative bg-background">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Site Immersif */}
        <Card className="bg-gradient-to-br from-surface to-surface-highlight border-fuchsia-500/20 shadow-[0_0_30px_rgba(217,70,239,0.05)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-fuchsia-500/20 rounded-xl text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-textMain">Site Web Magnétique</h3>
          </div>
          <p className="text-textMuted mb-8 min-h-[60px]">
            Oubliez les sites "brochure" qui ne vendent pas. Nous créons des expériences immersives conçues pour séduire et convertir vos visiteurs en clients.
          </p>
          <ul className="space-y-4">
            {["Design Unique & Mémorable", "Copywriting de vente persuasif", "Optimisé pour la conversion"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-textMuted">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* Visibilité Omnicanale */}
        <Card className="bg-gradient-to-br from-surface to-surface-highlight border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.05)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-textMain">Visibilité Omnicanale</h3>
          </div>
          <p className="text-textMuted mb-8 min-h-[60px]">
            Être beau ne suffit pas, il faut être vu. Nous vous positionnons là où sont vos clients : en tête de Google et sur la carte locale.
          </p>
          <ul className="space-y-4">
            {["Premières positions Google Maps", "SEO pour mots-clefs rentables", "Gestion de votre E-Réputation"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-textMuted">
                <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};