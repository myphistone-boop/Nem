import React, { useState } from 'react';
import { ArrowRight, Zap, HeartHandshake, Flower2, Briefcase, PenTool, Hammer, LayoutTemplate, ShoppingBag, MousePointerClick, Sparkles, ChevronDown } from 'lucide-react';

export const DesignInspiration: React.FC = () => {
  const [selectedMobileTheme, setSelectedMobileTheme] = useState('impact');

  // Configuration des thèmes avec des couleurs renforcées pour le mode sombre
  const themes = [
    { 
      id: 'impact', 
      label: 'Startup Tech', 
      icon: Zap, 
      color: 'text-yellow-600 dark:text-yellow-400',
      bgBase: 'bg-yellow-50 dark:bg-yellow-500/10',
      borderBase: 'border-yellow-200 dark:border-yellow-400/50',
      hoverShadow: 'hover:shadow-yellow-500/20',
      tag: "Business Moderne"
    },
    { 
      id: 'care', 
      label: 'Nature & Soins', 
      icon: HeartHandshake, 
      color: 'text-emerald-600 dark:text-emerald-400',
      bgBase: 'bg-emerald-50 dark:bg-emerald-500/10',
      borderBase: 'border-emerald-200 dark:border-emerald-400/50',
      hoverShadow: 'hover:shadow-emerald-500/20',
      tag: "Santé / Bien-être"
    },
    { 
      id: 'esthetic', 
      label: 'Esthétique', 
      icon: Flower2, 
      color: 'text-pink-600 dark:text-pink-400',
      bgBase: 'bg-pink-50 dark:bg-pink-500/10',
      borderBase: 'border-pink-200 dark:border-pink-400/50',
      hoverShadow: 'hover:shadow-pink-500/20',
      tag: "Beauté / Luxe"
    },
    { 
      id: 'coaching', 
      label: 'Coaching', 
      icon: Briefcase, 
      color: 'text-violet-600 dark:text-violet-400',
      bgBase: 'bg-violet-50 dark:bg-violet-500/10',
      borderBase: 'border-violet-200 dark:border-violet-400/50',
      hoverShadow: 'hover:shadow-violet-500/20',
      tag: "Business / Sport"
    },
    { 
      id: 'consultant', 
      label: 'Prof. Libérale', 
      icon: PenTool, 
      color: 'text-amber-600 dark:text-amber-400',
      bgBase: 'bg-amber-50 dark:bg-amber-500/10',
      borderBase: 'border-amber-200 dark:border-amber-400/50',
      hoverShadow: 'hover:shadow-amber-500/20',
      tag: "Corporate / Expert"
    },
    { 
      id: 'artisan', 
      label: 'Artisan', 
      icon: Hammer, 
      color: 'text-blue-600 dark:text-blue-400',
      bgBase: 'bg-blue-50 dark:bg-blue-500/10',
      borderBase: 'border-blue-200 dark:border-blue-400/50',
      hoverShadow: 'hover:shadow-blue-500/20',
      tag: "BTP / Services"
    },
    { 
      id: 'commerce', 
      label: 'Commerce', 
      icon: ShoppingBag, 
      color: 'text-orange-600 dark:text-orange-400',
      bgBase: 'bg-orange-50 dark:bg-orange-500/10',
      borderBase: 'border-orange-200 dark:border-orange-400/50',
      hoverShadow: 'hover:shadow-orange-500/20',
      tag: "Boutique / Artisanat"
    },
    { 
      id: 'classic', 
      label: 'Classique', 
      icon: LayoutTemplate, 
      color: 'text-slate-600 dark:text-slate-400',
      bgBase: 'bg-slate-100 dark:bg-slate-800',
      borderBase: 'border-slate-200 dark:border-slate-400/50',
      hoverShadow: 'hover:shadow-slate-500/20',
      tag: "Universel"
    },
  ];

  const activeMobileTheme = themes.find(t => t.id === selectedMobileTheme) || themes[0];

  return (
    <section className="py-24 bg-surface-highlight border-y border-border relative overflow-hidden">
       {/* Background Element */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Text Content (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-bold mb-8 shadow-[0_0_20px_rgba(217,70,239,0.4)] animate-pulse">
                <MousePointerClick className="w-5 h-5" />
                <span>DÉMO INTERACTIVE</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 text-textMain leading-tight">
              Plongez dans un design <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-orange-500">en un seul clic.</span>
            </h2>
            
            <p className="text-textMuted text-lg leading-relaxed mb-8">
              Nous avons créé <strong>plusieurs univers complets</strong> pour vous aider à vous projeter. 
              <br/><br/>
              Chaque carte est une porte d'entrée : cliquez pour explorer instantanément le site de démonstration correspondant, comme si c'était le vôtre.
            </p>

            <div className="hidden lg:flex items-center gap-3 text-sm font-medium text-textMuted/60">
                <Sparkles className="w-5 h-5 text-fuchsia-500" />
                <span>Testez l'expérience utilisateur dès maintenant</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-8 relative z-20">
             
             {/* Mobile ONLY: Dropdown List */}
             <div className="lg:hidden mt-4">
                <div className="bg-background border border-border p-5 rounded-2xl shadow-lg relative">
                    <label className="text-xs font-bold text-textMuted uppercase tracking-wider mb-3 block flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-fuchsia-500" />
                        Choisir un univers
                    </label>
                    
                    <div className="flex flex-col gap-3">
                        {/* Custom Select Wrapper */}
                        <div className="relative">
                            <select 
                                value={selectedMobileTheme}
                                onChange={(e) => setSelectedMobileTheme(e.target.value)}
                                className="w-full appearance-none bg-surface border border-border rounded-xl pl-12 pr-10 py-3.5 text-base font-bold text-textMain focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-shadow cursor-pointer"
                            >
                                {themes.map((theme) => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.label}
                                    </option>
                                ))}
                            </select>
                            
                            {/* Icon Overlay */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <activeMobileTheme.icon className={`w-5 h-5 ${activeMobileTheme.color}`} />
                            </div>
                            
                            {/* Chevron */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textMuted">
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Action Button */}
                        <a 
                            href={`?theme=${activeMobileTheme.id}`}
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
                        >
                            <span>Voir le thème</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        
                        {/* Tag Info */}
                        <div className="text-center pt-1">
                             <span className={`text-xs font-medium uppercase tracking-widest ${activeMobileTheme.color}`}>
                                {activeMobileTheme.tag}
                             </span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Desktop ONLY: Grid */}
             <div className="hidden lg:grid md:grid-cols-2 gap-5">
                {themes.map((theme) => (
                    <a 
                        key={theme.id}
                        href={`?theme=${theme.id}`}
                        className={`
                            group relative overflow-hidden rounded-2xl p-6
                            border-2 transition-all duration-300
                            hover:-translate-y-1 hover:shadow-xl
                            flex items-start justify-between gap-4
                            ${theme.bgBase} ${theme.borderBase} ${theme.hoverShadow}
                            cursor-pointer w-full h-full
                        `}
                    >
                        {/* Container Gauche: Icone + Texte */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Icon Container with solid color */}
                            <div className={`
                                w-14 h-14 shrink-0 rounded-xl flex items-center justify-center 
                                bg-white dark:bg-surface border border-border/50 shadow-sm
                                transition-transform duration-300 group-hover:scale-110
                            `}>
                                <theme.icon className={`w-7 h-7 ${theme.color}`} />
                            </div>

                            {/* Text Content - Titres blancs en dark mode */}
                            <div className="flex flex-col min-w-0">
                                <h3 className={`text-lg font-bold transition-colors ${theme.color} dark:text-white group-hover:brightness-110 truncate`}>
                                    {theme.label}
                                </h3>
                                <p className="text-xs font-medium text-textMuted dark:text-gray-100 dark:font-bold uppercase tracking-wider mt-0.5 truncate">
                                    {theme.tag}
                                </p>
                            </div>
                        </div>

                        {/* Button "Voir" - En Flux (pas absolu) pour éviter le chevauchement */}
                        <div className={`
                            shrink-0
                            px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wide
                            bg-white dark:bg-surface border border-border/50 shadow-sm
                            group-hover:bg-fuchsia-600 group-hover:text-white group-hover:border-fuchsia-600 group-hover:shadow-lg
                            transition-all duration-300 flex items-center gap-1.5 text-textMain dark:text-white
                        `}>
                            Voir
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    </a>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};