import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Pourquoi le prix est-il aussi accessible ?",
      answer: "Parce que je maîtrise parfaitement ce type de site : j’ai déjà développé de nombreux projets similaires, ce qui me permet d’aller très vite et d’éviter les heures de travail superflues. Je ne pars pas de blocs préfabriqués : je code moi-même les sections essentielles, avec une structure déjà optimisée que j’adapte à votre activité. Cette expertise me permet d’offrir un site professionnel, propre et performant, à un tarif beaucoup plus accessible que les agences traditionnelles."
    },
    {
      question: "Est-ce que je pourrai modifier mon site moi-même ?",
      answer: "Non. Pour garantir la stabilité, la qualité visuelle et éviter toute erreur technique, l’accès n’est pas ouvert. Je gère entièrement votre site pour vous, afin que vous n’ayez jamais à toucher à l’aspect technique."
    },
    {
      question: "Et si je veux changer quelque chose plus tard ?",
      answer: "Le site est pensé pour être durable et ne pas nécessiter de modifications fréquentes. Si vous souhaitez une mise à jour ponctuelle (texte, photo, information importante), elle peut être faite sur demande et facturée simplement selon le temps nécessaire."
    },
    {
      question: "Que comprend l’abonnement mensuel de 29- ?",
      answer: "L’abonnement couvre : l’hébergement sécurisé, les mises à jour techniques, la maintenance, la surveillance du site et les corrections techniques si nécessaire. L’objectif est que votre site fonctionne parfaitement sans que vous ayez à vous en occuper."
    },
    {
      question: "Puis-je arrêter l’abonnement quand je veux ?",
      answer: "Oui. L’abonnement est sans engagement. En cas d’arrêt, une copie du site vous est fournie, mais il ne sera plus maintenu ni hébergé par mes services."
    },
    {
      question: "Est-ce que mon site sera vraiment professionnel ?",
      answer: "Oui. Le design repose sur un thème premium que j’adapte à votre activité. Votre site sera clair, moderne, optimisé pour mobile et donnera une image sérieuse dès la première seconde."
    },
    {
      question: "Et le référencement, comment ça marche ?",
      answer: "Votre site est optimisé techniquement pour être correctement lu par Google : structure propre, rapidité, version mobile, balises essentielles. Cela suffit pour une présence locale normale. Le référencement avancé (SEO) n’est pas inclus mais peut être ajouté en option si vous en avez besoin."
    },
    {
      question: "Combien de temps faut-il pour recevoir mon site ?",
      answer: "En général, votre site est livré rapidement, dans les 48–72 heures une fois que vous avez fourni vos textes et images."
    },
    {
      question: "Est-ce que je dois m’occuper de la technique ?",
      answer: "Non. Je gère tout : hébergement, mises à jour, sécurité, maintenance. Vous pouvez vous concentrer sur votre activité."
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