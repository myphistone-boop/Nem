import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Pourquoi le tarif est-il aussi accessible ?",
      answer:
        "Le modèle repose sur une expertise éprouvée de ce type d’architecture, l’usage d’outils techniques performants et des processus de production optimisés. L’objectif est de moderniser les pratiques du marché et de rendre l’accès à un site réellement professionnel possible même pour les budgets les plus restreints, sans compromis sur la qualité."
    },
    {
      question: "Le site peut-il être modifié directement par l’utilisateur ?",
      answer:
        "L’accès aux éléments techniques n’est pas ouvert afin de préserver la stabilité du système, la cohérence visuelle et l’intégrité de la structure. Toutes les interventions sont encadrées afin de garantir un résultat constant et fiable dans le temps."
    },
    {
      question: "Comment sont gérées les mises à jour après la mise en ligne ?",
      answer:
        "La structure est conçue pour fonctionner durablement sans nécessité de modifications régulières. En cas d’évolution ponctuelle (texte, image ou information essentielle), une intervention peut être réalisée selon la grille tarifaire applicable."
    },
    {
      question: "Que couvre l’abonnement mensuel de 29 - ?",
      answer:
        "L’abonnement inclut l’hébergement sécurisé, la maintenance technique courante, les mises à jour nécessaires et la surveillance générale du bon fonctionnement du site. L’ensemble est conçu pour assurer une présence en ligne stable, performante et sans complexité technique."
    },
    {
      question: "Que se passe-t-il en cas d’arrêt du service ?",
      answer:
        "En cas de résiliation, une copie des composants essentiels du site est fournie. L’hébergement, la maintenance continue et la surveillance technique sont alors interrompus. Un échange préalable est recommandé afin d’identifier les solutions de transition les plus adaptées."
    },
    {
      question: "Le site final bénéficie-t-il d’une qualité professionnelle ?",
      answer:
        "Le site est conçu sur mesure, sans recours à des blocs préfabriqués. Les idées de design proposées servent uniquement de repères visuels pour orienter les choix esthétiques. La structure finale est réalisée spécifiquement pour l’activité concernée, avec un rendu moderne, cohérent, responsive et conforme aux standards professionnels."
    },
    {
      question: "Le site sera-t-il correctement visible sur Google ?",
      answer:
        "La construction respecte les standards techniques attendus par les moteurs de recherche : structure propre, chargement rapide, affichage mobile optimisé et balises essentielles configurées. Il s’agit du niveau de visibilité naturel attendu pour un site vitrine conforme aux bonnes pratiques."
    },
    {
      question: "Quel est le délai de réalisation ?",
      answer:
        "Le délai dépend principalement des contenus fournis. Une fois les textes et visuels transmis, la mise en ligne intervient en général sous 48 à 72 heures."
    },
    {
      question: "Une gestion technique est-elle nécessaire de la part du client ?",
      answer:
        "Aucune manipulation technique n’est requise. L’hébergement, la maintenance, les mises à jour et la sécurité de base sont entièrement pris en charge pour garantir une expérience fluide et sans contrainte."
    }
  ];


  return (
    <section className="py-24 bg-background relative" id="faq">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Technique</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-textMain">Une <span className="text-orange-400">question ?</span></h2>
          <p className="text-textMuted">
            Tout ce que vous devez savoir sur le fonctionnement.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-300 border-border bg-surface/50 overflow-visible ${openIndex === index ? 'border-fuchsia-500/30 ring-1 ring-fuchsia-500/20' : 'hover:border-border'}`}
              hoverEffect={false}
            >
              <div 
                className="flex items-center justify-between p-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className={`text-lg font-medium transition-colors pr-8 ${openIndex === index ? 'text-textMain' : 'text-textMuted'}`}>
                  {faq.question}
                </h3>
                <ChevronDown className={`w-5 h-5 text-fuchsia-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="text-textMuted leading-relaxed pb-2 border-t border-border pt-4 whitespace-pre-line">
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