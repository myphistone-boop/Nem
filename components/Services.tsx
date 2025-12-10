import React from 'react';
import { Card } from './ui/Card';
import { Layout, ShieldCheck, Server } from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: "Création de Site Sur Mesure",
      description: "Que vous ayez besoin d'un site vitrine élégant ou d'une boutique en ligne performante, nous concevons des solutions adaptées à votre image et à vos objectifs de croissance.",
      icon: Layout
    },
    {
      title: "Sécurité & Maintenance",
      description: "Nous assurons une veille technique et mettons en place les protections nécessaires pour détecter les failles et sécuriser les données de votre entreprise.",
      icon: ShieldCheck
    },
    {
      title: "Optimisation de la Visibilité",
      description: "Un site technique sain est la base d'un bon référencement. Nous assurons la rapidité et la stabilité nécessaires pour plaire à vos visiteurs et à Google.",
      icon: Server
    }
  ];

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative bg-background" id="services">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 font-display text-textMain">Des services complets pour <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">votre réussite en ligne</span></h2>
          <p className="text-textMuted text-lg">
            Nous vous accompagnons de la conception à la maintenance, pour que votre site reste un atout commercial performant sur le long terme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full bg-surface/50 border-border group">
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 w-fit group-hover:from-fuchsia-500/20 group-hover:to-orange-500/20 transition-colors border border-border">
                <service.icon className="w-8 h-8 text-fuchsia-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-textMain group-hover:text-fuchsia-400 transition-colors">{service.title}</h3>
              <p className="text-textMuted leading-relaxed mb-6 group-hover:text-textMain transition-colors">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-fuchsia-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                En savoir plus <span className="ml-1 text-lg group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};