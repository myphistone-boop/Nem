import React from 'react';
import { Card } from './ui/Card';
import { TrendingUp, Phone, Users, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const ConcreteResults: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const metrics = [
    {
      label: "Appels Entrants",
      value: "x3",
      desc: "Grâce à l'optimisation Google Maps, nos clients triplent leurs appels en moyenne dès le 3ème mois.",
      icon: Phone,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      label: "Trafic Qualifié",
      value: "+150%",
      desc: "Un référencement SEO ciblé attire des prospects qui cherchent exactement vos services.",
      icon: Users,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    {
      label: "Conversion Site",
      value: "Top 10%",
      desc: "Nos sites ne sont pas juste beaux. Ils transforment vos visiteurs en clients fidèles.",
      icon: TrendingUp,
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-500/10"
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-background border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-4xl font-bold font-display text-textMain mb-4">
                    Des résultats <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-orange-500">mesurables</span>
                </h2>
                <p className="text-textMuted">
                    Nous ne vendons pas du rêve, mais de la croissance. Voici l'impact concret de nos stratégies sur l'activité de nos partenaires.
                </p>
            </div>
            <div className="hidden lg:block">
                <Button variant="outline" onClick={scrollToContact} size="sm">
                    Voir les études de cas
                </Button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <Card key={i} className="relative overflow-hidden border-border bg-surface/30 hover:bg-surface transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${m.bg} ${m.color}`}>
                    <m.icon className="w-6 h-6" />
                </div>
                <span className={`text-4xl font-bold font-display ${m.color}`}>{m.value}</span>
              </div>
              <h3 className="text-lg font-bold text-textMain mb-2">{m.label}</h3>
              <p className="text-sm text-textMuted leading-relaxed">
                {m.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
            <Button variant="primary" onClick={scrollToContact} className="w-full">
                Booster mes résultats
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>
    </section>
  );
};