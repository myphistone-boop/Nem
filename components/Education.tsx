import React, { useState } from 'react';
import { Code, ShieldAlert, Server, ChevronRight } from 'lucide-react';
import { Card } from './ui/Card';

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const topics = [
    {
      title: "Front-end vs Back-end",
      short: "Architecture Web",
      icon: Code,
      color: "from-fuchsia-500 to-purple-600",
      content: "Le 'Front-end' est votre vitrine : c'est ce que vos clients voient et ce qui les convainc d'acheter. Le 'Back-end' est le moteur technique qui assure la rapidité et le bon fonctionnement. Chez Nemphisia, nous optimisons les deux pour maximiser votre chiffre d'affaires."
    },
    {
      title: "La Cybersécurité",
      short: "Sécurité",
      icon: ShieldAlert,
      color: "from-orange-500 to-red-600",
      content: "Chaque site est protégé par un certificat SSL (HTTPS), garantissant un échange sécurisé entre le navigateur et le serveur. Les configurations techniques sont mises en place selon les bonnes pratiques du secteur, incluant une surveillance régulière et des protections adaptées aux besoins d’un site vitrine. L’objectif est de maintenir un environnement fiable, stable et conforme aux standards actuels, sans surcharge technique inutile."
    },
    {
      title: "Maintenance & Hosting",
      short: "Maintenance",
      icon: Server,
      color: "from-cyan-400 to-blue-600",
      content: "Un site web repose sur plusieurs composants techniques qui doivent rester opérationnels en continu : hébergement, nom de domaine, certificats de sécurité, annuaires DNS et mises à jour de compatibilité. Une veille quotidienne est assurée afin de détecter rapidement tout comportement anormal, garantir la disponibilité du site et maintenir des performances stables. Les certificats SSL (HTTPS) assurent un échange chiffré entre le navigateur et le serveur, tandis que la gestion du domaine et des DNS veille à une résolution rapide et fiable. L’infrastructure d’hébergement optimise la vitesse de chargement et la stabilité, assurant au final une présence en ligne cohérente, professionnelle et durable, sans intervention technique nécessaire de la part du client."
    }
  ];

  return (
    <section className="py-24 bg-background" id="education">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 text-textMain">Comprendre <br/><span className="text-fuchsia-400">la technique</span></h2>
          <p className="text-textMuted max-w-2xl text-lg">
            Nous rendons la technologie transparente pour vous permettre de comprendre comment elle sert votre croissance.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Tabs Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                  activeTab === index 
                    ? 'bg-surface border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.15)]' 
                    : 'bg-transparent border-border hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${topic.color} text-white shadow-lg`}>
                    <topic.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeTab === index ? 'text-textMain' : 'text-textMuted group-hover:text-textMain'}`}>
                      {topic.short}
                    </h3>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === index ? 'text-fuchsia-400 rotate-90 lg:rotate-0' : 'text-textMuted'}`} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <Card className="h-full bg-surface/60 border-border flex flex-col justify-center p-8 lg:p-12 min-h-[400px]">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topics[activeTab].color} flex items-center justify-center mb-6 shadow-xl animate-in fade-in zoom-in duration-500`}>
                {React.createElement(topics[activeTab].icon, { className: "w-8 h-8 text-white" })}
              </div>
              
              <h3 className="text-3xl font-bold text-textMain mb-6 font-display animate-in slide-in-from-bottom-2 duration-500 key={activeTab}">
                {topics[activeTab].title}
              </h3>
              
              <p className="text-textMuted text-lg leading-relaxed animate-in slide-in-from-bottom-4 duration-500 key={activeTab}-p">
                {topics[activeTab].content}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};