
import React, { useRef } from 'react';
import { Card } from './ui/Card';
import { Clock, ArrowRightLeft } from 'lucide-react';

export const PricingLabor: React.FC = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollTable = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Nouvelle structure de la grille tarifaire basée sur le TJM
  const laborRates = [
    { 
      label: "Taux Journalier Moyen (TJM)", 
      base: "199 €", 
      start: "169 €", 
      pro: "119 €", 
      premium: "99 €",
      isPrice: true 
    },
    { 
      label: "Réduction sur l'expertise", 
      base: "0%", 
      start: "-15%", 
      pro: "-40%", 
      premium: "-50%",
      isHighlight: true 
    },
    { 
      label: "Mode de facturation", 
      base: "Au prorata", 
      start: "Au prorata", 
      pro: "Au prorata", 
      premium: "Au prorata",
      isText: true
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface-highlight border-t border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 font-display text-textMain">
            Grille Tarifaire <span className="text-fuchsia-400">Évolutions</span>
          </h3>
          <p className="text-center text-textMuted mb-2 max-w-2xl mx-auto">
             Besoin d'ajouter une page, de changer une offre ou de lancer une campagne ? Nos experts interviennent à un tarif préférentiel selon votre pack.
          </p>
          <div className="flex justify-center items-center gap-2 mb-8 text-sm text-textMain/70 bg-surface/50 w-fit mx-auto px-4 py-2 rounded-full border border-border">
             <Clock className="w-4 h-4 text-fuchsia-500" />
             <span>La tarification est calculée au <strong>prorata du temps dédié</strong> à la tâche.</span>
          </div>
          
          {/* Scroll Hint Button for Mobile */}
          <div className="lg:hidden flex justify-center mb-4">
             <button 
                onClick={scrollTable}
                className="flex items-center gap-2 px-5 py-2.5 bg-surface-highlight border border-fuchsia-500/30 rounded-full text-xs font-bold text-fuchsia-500 uppercase tracking-widest shadow-sm hover:bg-fuchsia-500/10 transition-all active:scale-95 active:bg-fuchsia-500/20"
             >
                <ArrowRightLeft className="w-4 h-4" />
                Glisser pour voir les prix
             </button>
          </div>

          <Card className="overflow-hidden p-0 border-border bg-surface/50">
            <div className="overflow-x-auto" ref={tableContainerRef}>
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-surface-highlight/50">
                    <th className="p-4 pl-6 font-bold text-textMain text-sm uppercase tracking-wider w-[30%]">Tarification Expert</th>
                    <th className="p-4 font-bold text-textMuted text-center w-[15%]">Standard</th>
                    <th className="p-4 font-bold text-cyan-500 dark:text-cyan-400 text-center w-[15%]">Pack Visibilité</th>
                    <th className="p-4 font-bold text-orange-500 dark:text-orange-400 text-center w-[15%]">Pack Croissance</th>
                    <th className="p-4 font-bold text-fuchsia-500 dark:text-fuchsia-400 text-center w-[15%]">Pack Leader</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {laborRates.map((rate, idx) => (
                    <tr key={idx} className="hover:bg-surface-highlight/50 transition-colors">
                      <td className="p-4 pl-6 text-sm font-medium text-textMain">{rate.label}</td>
                      
                      {/* Standard Column */}
                      <td className={`p-4 text-center text-sm ${
                        rate.isPrice || rate.isText 
                          ? 'font-bold text-black dark:text-white' 
                          : 'text-textMuted'
                      }`}>
                        {rate.base}
                      </td>

                      {/* Start Column */}
                      <td className={`p-4 text-center text-sm ${
                        rate.isHighlight 
                          ? 'font-bold text-cyan-600 dark:text-cyan-400' 
                          : (rate.isPrice || rate.isText ? 'font-bold text-black dark:text-white' : 'text-textMuted')
                      }`}>
                        {rate.start}
                      </td>

                      {/* Pro Column */}
                      <td className={`p-4 text-center text-sm ${
                        rate.isHighlight 
                          ? 'font-bold text-orange-600 dark:text-orange-400' 
                          : (rate.isPrice || rate.isText ? 'font-bold text-black dark:text-white' : 'text-textMuted')
                      }`}>
                        {rate.pro}
                      </td>

                      {/* Premium Column */}
                      <td className={`p-4 text-center text-sm ${
                        rate.isHighlight 
                          ? 'font-bold text-fuchsia-600 dark:text-fuchsia-400' 
                          : (rate.isPrice || rate.isText ? 'font-bold text-black dark:text-white' : 'text-textMuted')
                      }`}>
                        {rate.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
