import React from 'react';
import { Card } from './ui/Card';
import { Linkedin, Twitter, Github, User } from 'lucide-react';

export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Ali Guennoun",
      role: "Directeur Stratégie Digitale",
      image: "https://lh3.googleusercontent.com/d/1fBHn-s2aWSxI8qiIOBZBIontcrR7iprl",
      desc: "Expert en solutions digitales pour entreprises. Il traduit vos besoins business en spécifications techniques claires.",
      socials: [Linkedin, Twitter]
    },
    {
      name: "Kevin Hawkins",
      role: "Lead Développeur & SEO Technique",
      image: "https://lh3.googleusercontent.com/d/1BquDtGndE1kxt2XgCQBnN4tLBpy9z0KA",
      desc: "Spécialiste du code propre et de l'optimisation moteur de recherche. Il construit les fondations invisibles de votre succès.",
      socials: [Linkedin, Github]
    },
    {
      name: "Pablo Belmonte",
      role: "Responsable Développement & Cybersécurité",
      image: "https://lh3.googleusercontent.com/d/1PWZpmAL_WxQqMpbpI4Mlw_0FFH75oUjE",
      desc: "Architecte système et expert en sécurité offensive. Il garantit l'intégrité et la robustesse de vos infrastructures web.",
      socials: [Github, Twitter]
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="team">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-fuchsia-900/10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-textMain">Notre <span className="text-fuchsia-400">Équipe Technique</span></h2>
          <p className="text-textMuted max-w-2xl mx-auto">
            Des ingénieurs et experts passionnés par le code, unis par une mission : créer le web de demain, sécurisé et performant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <Card key={idx} className="group text-center bg-surface/80 border-border hover:border-fuchsia-500/30">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=150528&color=d946ef&size=256&font-size=0.33`;
                  }}
                  className="w-full h-full object-cover rounded-full relative z-10 border-2 border-surface bg-surface" 
                />
              </div>
              <h3 className="text-xl font-bold text-textMain mb-1 font-display">{member.name}</h3>
              <p className="text-fuchsia-500 text-sm font-medium mb-4 uppercase tracking-wider">{member.role}</p>
              <p className="text-textMuted text-sm mb-6 px-4">
                {member.desc}
              </p>
              <div className="flex justify-center gap-4">
                {member.socials.map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-full bg-background border border-border hover:bg-surface-highlight text-textMuted hover:text-textMain transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};