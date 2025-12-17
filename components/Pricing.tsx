import React, { useState, useRef } from 'react';
import { Check, Zap, Rocket, Shield, Globe, Server, Loader2, ArrowRightLeft, Clock, Plus, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const Pricing: React.FC = () => {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1); // Le pack du milieu ouvert par défaut

  const handleCheckout = async (offerKey: string) => {
    try {
      setLoadingKey(offerKey);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerKey }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erreur de paiement:", error);
      alert("Une erreur est survenue lors de l'initialisation du paiement. Veuillez réessayer.");
      setLoadingKey(null);
    }
  };

  const scrollTable = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const togglePlan = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const plans = [
    {
      key: "essential", // Clé Stripe conservée
      name: "Pack Visibilité",
      price: "199",
      description: "Pour être visible localement et rassurer vos prospects.",
      icon: Globe,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      cumulative: false,
      features: [
        "Site Vitrine Optimisé (1-3 pages)",
        "Création fiche Google Maps Pro",
        "Design rassurant & professionnel",
        "Appels à l'action stratégiques",
        "TJM intervention réduit (-15%)",
        "Hébergement rapide inclus",
        "Optimisation mobile parfaite",
        "Maintenance technique de base"
      ]
    },
    {
      key: "business",
      name: "Pack Croissance",
      price: "399",
      description: "Pour dépasser vos concurrents et générer des leads.",
      icon: Rocket,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      cumulative: true,
      previousPlan: "Pack Visibilité",
      features: [
        "Site Complet Haute Conversion (1-6 pages)",
        "Optimisation Google Maps Avancée",
        "Stratégie de mots-clés SEO (Basic)",
        "Copywriting de vente persuasif",
        "TJM intervention réduit (-40%)",
        "Intégration prise de RDV / Devis"
      ]
    },
    {
      key: "elite",
      name: "Pack Leader",
      price: "499",
      description: "Pour devenir le choix incontournable de votre marché.",
      icon: Shield,
      color: "fuchsia",
      gradient: "from-fuchsia-600 to-purple-600",
      cumulative: true,
      previousPlan: "Pack Croissance",
      features: [
        "Site Autorité (1-9 pages)",
        "Stratégie SEO Complète (Contenu)",
        "Visibilité Google Maps Maximale",
        "Expérience utilisateur Premium",
        "TJM intervention réduit (-50%)",
        "Tracking avancé des conversions"
      ]
    }
  ];

  // Nouvelle structure de la grille tarifaire basée sur le TJM
  const laborRates = [
    { 
      label: "Taux Journalier Moyen (TJM)", 
      base: "199 -", 
      start: "169 -", 
      pro: "119 -", 
      premium: "99 -",
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
    <section className="py-16 lg:py-20 xl:py-24 relative bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16" id="pricing">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display text-textMain">
            Investissez dans votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">croissance</span>
          </h2>
          <p className="text-textMuted text-lg">
            Des forfaits conçus pour générer du retour sur investissement, pas des dépenses.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <div key={index} className="relative group cursor-pointer lg:cursor-default" onClick={() => togglePlan(index)}>
              
              <Card className={`h-full relative flex flex-col p-5 lg:p-6 xl:p-8 bg-surface/50 border-border hover:border-opacity-50 transition-all duration-300 ${expandedIndex === index ? 'ring-1 ring-fuchsia-500/30 bg-surface' : ''}`}>
                
                {/* Header Section (Contains basic info + Price on Mobile) */}
                <div className="flex items-center justify-between lg:block mb-0 lg:mb-6 xl:mb-8">
                  
                  <div className="flex items-center gap-4 lg:block">
                      {/* Icon */}
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <plan.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      
                      {/* Title & Price (Mobile Row) */}
                      <div className="flex flex-col lg:block">
                          <h3 className="text-lg lg:text-xl font-bold text-textMain">{plan.name}</h3>
                          {/* Mobile Price Display in Header */}
                          <div className="lg:hidden font-display font-bold text-textMain text-lg">
                             {plan.price}- <span className="text-xs text-textMuted font-sans font-normal">/ installation</span>
                          </div>
                      </div>
                  </div>

                  {/* Mobile Chevron */}
                  <div className="lg:hidden">
                     <ChevronDown className={`w-6 h-6 text-textMuted transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-fuchsia-500' : ''}`} />
                  </div>

                  {/* Desktop Price Display (Hidden on Mobile Header to avoid duplication) */}
                  <div className="hidden lg:flex flex-col mt-2 lg:mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-4xl xl:text-5xl font-bold font-display text-textMain">{plan.price}-</span>
                    </div>
                    <span className="text-sm font-medium text-textMuted mt-1">+ 29- / mois (Hébergement & Suivi)</span>
                  </div>
                </div>

                {/* Collapsible Content */}
                <div className={`${expandedIndex === index ? 'block animate-in fade-in slide-in-from-top-2' : 'hidden'} lg:flex flex-col flex-grow`}>
                    
                    {/* Description */}
                    <p className="text-sm text-textMuted leading-relaxed mb-6 mt-4 lg:mt-0">
                        {plan.description}
                    </p>
                    
                    {/* Mobile Only: Recurring price info since it wasn't in header */}
                    <div className="lg:hidden text-sm font-medium text-fuchsia-500 mb-6 bg-fuchsia-500/10 p-2 rounded-lg text-center">
                        + 29- / mois (Hébergement & Suivi)
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                    {/* Cumulative Header */}
                    {plan.cumulative && (
                        <div className="flex items-start gap-3 pb-2 mb-2 border-b border-border/50">
                        <div className={`mt-0.5 p-0.5 rounded-full bg-${plan.color === 'orange' ? 'orange' : 'fuchsia'}-500/20 text-${plan.color === 'orange' ? 'orange' : 'fuchsia'}-400 shrink-0`}>
                            <Plus className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-bold text-textMain italic">Tout du {plan.previousPlan}, plus :</span>
                        </div>
                    )}

                    {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-textMain/80">
                        <div className={`mt-0.5 p-0.5 rounded-full bg-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-500/20 text-${plan.color === 'orange' ? 'orange' : plan.color === 'fuchsia' ? 'fuchsia' : 'cyan'}-400 shrink-0`}>
                            <Check className="w-3 h-3" />
                        </div>
                        <span className={idx < 2 && !plan.cumulative ? "font-bold text-textMain" : ""}>{feature}</span>
                        </div>
                    ))}
                    </div>

                    <Button 
                    variant={plan.price === "399" ? 'secondary' : 'outline'} 
                    className="w-full"
                    onClick={(e) => { e.stopPropagation(); handleCheckout(plan.key); }}
                    disabled={loadingKey === plan.key}
                    >
                    {loadingKey === plan.key ? (
                        <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Redirection...
                        </>
                    ) : (
                        "Choisir ce forfait"
                    )}
                    </Button>
                </div>

              </Card>
            </div>
          ))}
        </div>

        {/* Labor Grid Section */}
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