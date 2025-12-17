import React, { useState } from 'react';
import { Search, BrainCircuit, Star, ChevronRight } from 'lucide-react';
import { Card } from './ui/Card';

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const topics = [
    {
      title: "SEO vs Google Maps",
      short: "Architecture d'Acquisition",
      icon: Search,
      color: "from-fuchsia-500 to-purple-600",
      content: "Le SEO (référencement naturel) vous place en haut des recherches globales, captant les clients qui cherchent une solution. Google Maps (Pack Local) cible les clients qui cherchent un service *près de chez eux*. La combinaison des deux vous assure de capter 100% du marché disponible."
    },
    {
      title: "Psychologie de Vente",
      short: "Design de Conversion",
      icon: BrainCircuit,
      color: "from-orange-500 to-red-600",
      content: "Un beau site ne suffit pas. Nous utilisons les principes de la psychologie cognitive (preuve sociale, urgence, autorité) pour structurer votre site. Chaque bouton, chaque image et chaque titre est pensé pour guider le visiteur vers une seule action : vous contacter ou acheter."
    },
    {
      title: "Réputation & Avis",
      short: "Confiance Client",
      icon: Star,
      color: "from-cyan-400 to-blue-600",
      content: "Avant de vous appeler, vos prospects lisent vos avis. Une fiche Google optimisée avec des avis gérés et une réponse professionnelle augmente drastiquement votre taux de conversion. Nous vous aidons à bâtir une réputation en béton qui rassure vos futurs clients avant même le premier contact."
    }
  ];

  return (
    <section className="py-24 bg-background" id="education">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 text-textMain">Comprendre <br/><span className="text-fuchsia-400">l'acquisition</span></h2>
          <p className="text-textMuted max-w-2xl text-lg">
            Nous rendons le marketing transparent pour vous permettre de comprendre comment il sert votre croissance financière.
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