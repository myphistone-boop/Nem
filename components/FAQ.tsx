import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Combien de temps pour avoir des résultats ?",
      answer:
        "Dès la mise en ligne, l'optimisation de votre fiche Google Maps peut générer des appels en quelques jours. Pour le SEO (référencement naturel), les premiers effets significatifs se font sentir sous 1 à 3 mois, avec une croissance continue sur le long terme."
    },
    {
      question: "Pourquoi investir dans un site alors que j'ai les réseaux sociaux ?",
      answer:
        "Les réseaux sociaux sont loués (vous dépendez de l'algorithme), votre site vous appartient. C'est le seul endroit où vous contrôlez 100% du message et où vous pouvez convertir un visiteur en client sans distraction. De plus, 80% des clients cherchent sur Google avant d'acheter, pas sur Instagram."
    },
    {
      question: "Comment garantissez-vous que je passerai devant mes concurrents ?",
      answer:
        "Nous utilisons des techniques avancées d'analyse concurrentielle et de SEO local. Nous identifions les mots-clefs qu'ils utilisent et nous créons un contenu plus pertinent, une structure technique plus rapide et une autorité locale supérieure pour les surclasser."
    },
    {
      question: "À quoi servent les 29- / mois de maintenance ?",
      answer:
        "Ce n'est pas juste de la maintenance, c'est votre assurance tranquillité. Cela couvre l'hébergement haute vitesse, la sécurisation des données clients, et surtout la garantie que votre 'machine à vendre' reste opérationnelle 24/7 sans que vous ayez à lever le petit doigt."
    },
    {
      question: "Puis-je modifier le site moi-même ?",
      answer:
        "Pour garantir la performance et ne pas casser le référencement (SEO), nous gérons la structure. Cependant, vous pouvez nous demander des modifications de textes ou d'images via votre pack d'heures. Cela assure que chaque changement sert votre objectif de vente."
    },
    {
      question: "Le site sera-t-il visible sur mobile ?",
      answer:
        "Absolument. Plus de 60% des recherches locales se font sur mobile. Nos sites sont 'Mobile First', conçus spécifiquement pour que le bouton 'Appeler' ou 'Réserver' soit toujours sous le pouce de votre futur client."
    },
    {
      question: "Je suis une petite entreprise, est-ce adapté ?",
      answer:
        "C'est justement conçu pour vous. Les grandes entreprises ont des départements marketing entiers. Nemphisia vous donne accès aux mêmes armes (SEO, Design pro, Stratégie) pour vous permettre de rivaliser et de gagner localement, même avec un petit budget."
    },
    {
      question: "Que se passe-t-il si j'arrête ?",
      answer:
        "Vous restez propriétaire de votre nom de domaine. Si vous arrêtez, le site est mis hors ligne, mais vous ne devez rien de plus. Nous croyons en la fidélisation par les résultats, pas par des contrats verrouillés."
    }
  ];


  return (
    <section className="py-12 lg:py-24 bg-background relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-8 lg:mb-16" id="faq">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Questions Business</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-textMain">Une <span className="text-orange-400">question ?</span></h2>
          <p className="text-textMuted">
            Comprendre comment nous allons booster votre activité.
          </p>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-300 border-border bg-surface/50 overflow-visible ${openIndex === index ? 'border-fuchsia-500/30 ring-1 ring-fuchsia-500/20' : 'hover:border-border'}`}
              hoverEffect={false}
            >
              <div 
                className="flex items-center justify-between p-1 lg:p-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className={`text-base lg:text-lg font-medium transition-colors pr-4 lg:pr-8 ${openIndex === index ? 'text-textMain' : 'text-textMuted'}`}>
                  {faq.question}
                </h3>
                <ChevronDown className={`w-5 h-5 text-fuchsia-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-2 lg:mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="text-textMuted leading-relaxed pb-2 border-t border-border pt-4 whitespace-pre-line text-sm lg:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};