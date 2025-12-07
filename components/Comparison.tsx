import React from 'react';
import { Code, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/Card';

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 container mx-auto px-6 relative bg-background">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Dev Column */}
        <Card className="bg-gradient-to-br from-surface to-surface-highlight border-fuchsia-500/20 shadow-[0_0_30px_rgba(217,70,239,0.05)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-fuchsia-500/20 rounded-xl text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-textMain">Développement Sur Mesure</h3>
          </div>
          <p className="text-textMuted mb-8 min-h-[60px]">
            La création de votre outil digital. Un code propre, une architecture pensée pour l'avenir et un design qui vous démarque de la concurrence.
          </p>
          <ul className="space-y-4">
            {["Design Unique (Pas de template)", "Code optimisé & rapide", "Fonctionnalités personnalisées"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-textMuted">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* Security Column */}
        <Card className="bg-gradient-to-br from-surface to-surface-highlight border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.05)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-textMain">Maintenance & Sécurité</h3>
          </div>
          <p className="text-textMuted mb-8 min-h-[60px]">
            La protection de votre investissement. Nous surveillons votre site 24/7 pour prévenir les pannes et bloquer les attaques avant qu'elles n'arrivent.
          </p>
          <ul className="space-y-4">
            {["Monitoring 24/7", "Sauvegardes journalières", "Protection Anti-Hack"].map((item, i) => (
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