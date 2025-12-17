import React, { useState } from 'react';
import { Search, BrainCircuit, Star, ChevronRight, CheckCircle2, Target, Rocket, ChevronDown } from 'lucide-react';
import { Card } from './ui/Card';

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const topics = [
    {
      title: "Visibilité Omnicanale",
      short: "Architecture d'Acquisition",
      icon: Target,
      color: "from-orange-500 to-red-600",
      content: "Être beau ne suffit pas, il faut être vu. Nous vous positionnons là où sont vos clients : en tête de Google (SEO) et sur la carte locale (Maps).",
      details: [
        "Premières positions Google Maps",
        "SEO pour mots-clefs rentables",
        "Flux d'appels réguliers et qualifiés"
      ]
    },
    {
      title: "Site Web Magnétique",
      short: "Design de Conversion",
      icon: Rocket,
      color: "from-fuchsia-500 to-purple-600",
      content: "Oubliez les sites 'brochure' qui ne vendent pas. Nous créons des expériences immersives avec un copywriting persuasif pour transformer vos visiteurs en clients fidèles.",
      details: [
        "Design Unique & Mémorable",
        "Copywriting de vente persuasif",
        "Optimisé pour la conversion maximale"
      ]
    },
    {
      title: "Réputation & Autorité",
      short: "Confiance Client",
      icon: Star,
      color: "from-cyan-400 to-blue-600",
      content: "Avant de vous appeler, vos prospects lisent vos avis. Nous vous aidons à bâtir une réputation en béton qui rassure vos futurs clients avant même le premier contact.",
      details: [
        "Gestion de votre E-Réputation",
        "Preuve sociale automatisée",
        "Réponses stratégiques aux avis"
      ]
    }
  ];

  const toggleMobile = (index: number) => {
    setMobileExpanded(mobileExpanded === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-background" id="education">
      <div className="container mx-auto px-6">
        <div className="mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 lg:mb-6 text-textMain">Comprendre <br/><span className="text-fuchsia-400">l'acquisition</span></h2>
          <p className="text-textMuted max-w-2xl text-lg hidden lg:block">
            Nous rendons le marketing transparent. Voici les trois piliers essentiels que nous activons pour garantir votre croissance.
          </p>
          <p className="text-textMuted text-base lg:hidden">
             Les 3 piliers essentiels pour garantir votre croissance.
          </p>
        </div>

        {/* MOBILE VIEW: Accordion */}
        <div className="lg:hidden flex flex-col gap-3">
            {topics.map((topic, index) => (
                <div key={index} className="border border-border rounded-xl overflow-hidden bg-surface/30">
                    <button 
                        onClick={() => toggleMobile(index)}
                        className="w-full flex items-center justify-between p-4 text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${topic.color} text-white shadow-sm`}>
                                <topic.icon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-textMain">{topic.short}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-textMuted transition-transform duration-300 ${mobileExpanded === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 pt-0 border-t border-border/50">
                            <p className="text-sm text-textMuted mt-4 mb-4 leading-relaxed">
                                {topic.content}
                            </p>
                            <ul className="space-y-3">
                                {topic.details.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-textMain text-sm font-medium">
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${topic.color.includes('orange') ? 'text-orange-500' : topic.color.includes('fuchsia') ? 'text-fuchsia-500' : 'text-cyan-500'}`} />
                                    {item}
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* DESKTOP VIEW: Tabs Side-by-Side */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Tabs Navigation */}
          <div className="col-span-4 flex flex-col gap-4">
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
          <div className="col-span-8">
            <Card className="h-full bg-surface/60 border-border flex flex-col justify-center p-12 min-h-[400px]">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topics[activeTab].color} flex items-center justify-center mb-6 shadow-xl animate-in fade-in zoom-in duration-500`}>
                {React.createElement(topics[activeTab].icon, { className: "w-8 h-8 text-white" })}
              </div>
              
              <h3 className="text-3xl font-bold text-textMain mb-6 font-display animate-in slide-in-from-bottom-2 duration-500 key={activeTab}">
                {topics[activeTab].title}
              </h3>
              
              <p className="text-textMuted text-lg leading-relaxed mb-8 animate-in slide-in-from-bottom-4 duration-500 key={activeTab}-p">
                {topics[activeTab].content}
              </p>

              <ul className="space-y-4 animate-in slide-in-from-bottom-6 duration-500 delay-100">
                {topics[activeTab].details.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-textMain font-medium">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${topics[activeTab].color.includes('orange') ? 'text-orange-500' : topics[activeTab].color.includes('fuchsia') ? 'text-fuchsia-500' : 'text-cyan-500'}`} />
                    {item}
                  </li>
                ))}
              </ul>

            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};