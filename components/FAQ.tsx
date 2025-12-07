import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Mon site est-il protégé contre le piratage ?",
      answer: "Oui. La sécurité est notre priorité absolue. Nous implémentons des pare-feux (WAF), sécurisons les bases de données et effectuons des mises à jour constantes pour fermer toute brèche potentielle."
    },
    {
      question: "Utilisez-vous des templates ou du code sur mesure ?",
      answer: "Nous privilégions le développement sur mesure pour garantir performance et unicité. Si votre budget est serré, nous pouvons adapter des solutions existantes, mais toujours en optimisant le code source."
    },
    {
      question: "Que se passe-t-il si mon site tombe en panne ?",
      answer: "Avec notre forfait maintenance, nous sommes alertés instantanément grâce à nos sondes de monitoring. Nous intervenons généralement dans l'heure pour rétablir le service."
    },
    {
      question: "Puis-je modifier le contenu moi-même ?",
      answer: "Absolument. Même pour un site sur mesure, nous intégrons une interface d'administration (CMS) intuitive qui vous permet de changer textes et images sans toucher une ligne de code."
    }
  ];

  return (
    <section className="py-24 bg-[#090014] relative" id="faq">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Technique</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">Une <span className="text-orange-400">question ?</span></h2>
          <p className="text-gray-400">
            Des réponses claires sur notre expertise technique.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-300 border-white/5 bg-[#150528]/50 overflow-visible ${openIndex === index ? 'border-fuchsia-500/30 ring-1 ring-fuchsia-500/20' : 'hover:border-white/10'}`}
              hoverEffect={false}
            >
              <div 
                className="flex items-center justify-between p-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                  {faq.question}
                </h3>
                <ChevronDown className={`w-5 h-5 text-fuchsia-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="text-gray-400 leading-relaxed pb-2 border-t border-white/5 pt-4">
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