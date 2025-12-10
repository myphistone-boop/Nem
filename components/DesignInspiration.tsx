import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Paintbrush, Layout, Zap, CheckCircle2, MousePointerClick, Eye } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

// Import Icons for themes
import { HeartHandshake, Flower2, Briefcase, PenTool, Hammer, LayoutTemplate, ShoppingBag } from 'lucide-react';

export const DesignInspiration: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState('impact');

  const themes = [
    { 
      id: 'impact', 
      label: 'Startup Tech', 
      icon: Zap, 
      color: 'text-yellow-400',
      description: "Style Nike/Apple. Typographie massive, animations 3D, contrastes forts. Idéal pour marquer les esprits.",
      tag: "Business Moderne"
    },
    { 
      id: 'care', 
      label: 'Nature & Soins', 
      icon: HeartHandshake, 
      color: 'text-green-600',
      description: "Palette végétale, douceur et sérénité. Parfait pour les thérapeutes, le bien-être et la santé naturelle.",
      tag: "Santé / Bien-être"
    },
    { 
      id: 'esthetic', 
      label: 'Esthétique', 
      icon: Flower2, 
      color: 'text-pink-400',
      description: "L'élégance poudrée. Tons beiges et or, typographie raffinée. Pour les salons de beauté et le luxe accessible.",
      tag: "Beauté / Luxe"
    },
    { 
      id: 'coaching', 
      label: 'Coaching', 
      icon: Briefcase, 
      color: 'text-violet-400',
      description: "Sombre, dynamique et structuré. Un design qui inspire le leadership et la performance.",
      tag: "Business / Sport"
    },
    { 
      id: 'consultant', 
      label: 'Profession Libérale', 
      icon: PenTool, 
      color: 'text-amber-600',
      description: "Sobre, géométrique et rassurant. Le choix parfait pour les experts, avocats et consultants.",
      tag: "Corporate / Expert"
    },
    { 
      id: 'artisan', 
      label: 'Artisan', 
      icon: Hammer, 
      color: 'text-blue-500',
      description: "Pragmatique et efficace. Mise en avant des coordonnées et des services. Idéal pour le bâtiment.",
      tag: "BTP / Services"
    },
    { 
      id: 'commerce', 
      label: 'Commerce Local', 
      icon: ShoppingBag, 
      color: 'text-orange-500',
      description: "Chaleureux et visuel. Une vitrine numérique pour fleuristes, décorateurs et boutiques physiques.",
      tag: "Boutique / Artisanat"
    },
    { 
      id: 'classic', 
      label: 'Classique', 
      icon: LayoutTemplate, 
      color: 'text-slate-400',
      description: "Minimalisme pur. Fond blanc, lisibilité maximale. S'adapte à absolument tous les secteurs.",
      tag: "Universel"
    },
  ];

  const currentTheme = themes.find(t => t.id === selectedThemeId) || themes[0];

  return (
    <section className="py-20 bg-surface-highlight border-y border-border relative overflow-hidden">
       {/* Background Element */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Text Content - REVAMPED FOR CLARITY & ACTION */}
          <div className="relative">
            {/* Blinking Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-bold mb-8 shadow-[0_0_20px_rgba(217,70,239,0.4)] animate-pulse">
                <MousePointerClick className="w-5 h-5" />
                <span>ZONE DE TEST INTERACTIVE</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6 text-textMain leading-tight">
              Ne l'imaginez pas. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-orange-500">Testez-le maintenant.</span>
            </h2>
            
            <p className="text-textMuted text-xl leading-relaxed mb-10">
              Nous avons créé <strong>8 sites complets</strong> pour vous aider à vous projeter. 
              C'est une expérience live : naviguez dedans comme si c'était le vôtre.
            </p>

            {/* Instruction Steps */}
            <div className="space-y-6 relative">
                {/* Connecting Line */}
                <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-border -z-10"></div>

                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 rounded-full bg-surface border-2 border-fuchsia-500 flex items-center justify-center text-fuchsia-500 font-bold text-xl shadow-[0_0_15px_rgba(217,70,239,0.2)] group-hover:scale-110 transition-transform bg-background">1</div>
                    <div>
                        <h4 className="font-bold text-textMain text-lg group-hover:text-fuchsia-500 transition-colors">Choisissez un univers</h4>
                        <p className="text-sm text-textMuted">Utilisez la liste déroulante ci-contre.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 rounded-full bg-surface border-2 border-orange-500 flex items-center justify-center text-orange-500 font-bold text-xl shadow-[0_0_15px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform bg-background">2</div>
                    <div>
                        <h4 className="font-bold text-textMain text-lg group-hover:text-orange-500 transition-colors">Cliquez sur "Voir le design"</h4>
                        <p className="text-sm text-textMuted">Le site de démonstration s'ouvrira en plein écran.</p>
                    </div>
                </div>
            </div>

            {/* Arrow pointing to the right (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 -right-16 transform -translate-y-1/2 translate-x-1/2 z-20">
                 <div className="text-textMuted/30 animate-pulse">
                    <ArrowRight className="w-20 h-20" />
                 </div>
            </div>
             {/* Arrow pointing down (Mobile only) */}
             <div className="lg:hidden flex justify-center mt-8 text-textMuted/30 animate-bounce">
                <ArrowRight className="w-12 h-12 rotate-90" />
             </div>
          </div>

          {/* Right: Interactive Dropdown Showcase */}
          <div className="relative">
             <div className="bg-background border-2 border-fuchsia-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.1)] relative z-20">
                <label className="block text-sm font-bold uppercase text-fuchsia-500 tracking-wider mb-4 flex items-center gap-2">
                    <Paintbrush className="w-4 h-4" />
                    Sélecteur de Thème
                </label>
                
                {/* Custom Dropdown Trigger */}
                <div className="relative mb-8">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between bg-surface border-2 border-border rounded-xl px-5 py-5 text-left hover:border-fuchsia-500 transition-all duration-300 group shadow-sm hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-background border border-border ${currentTheme.color} shadow-inner`}>
                                <currentTheme.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-textMuted uppercase tracking-wide">Thème sélectionné</span>
                                <span className="font-bold text-textMain text-xl">{currentTheme.label}</span>
                            </div>
                        </div>
                        <div className={`p-2 rounded-full bg-surface-highlight group-hover:bg-fuchsia-500 group-hover:text-white transition-colors`}>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-surface/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 max-h-[350px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => {
                                        setSelectedThemeId(theme.id);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-highlight transition-colors text-left border-b border-border/50 last:border-0 group"
                                >
                                    <theme.icon className={`w-5 h-5 ${theme.color} group-hover:scale-110 transition-transform`} />
                                    <div>
                                        <span className={`block text-base font-bold ${selectedThemeId === theme.id ? 'text-textMain' : 'text-textMuted group-hover:text-textMain'}`}>
                                            {theme.label}
                                        </span>
                                        <span className="text-xs text-textMuted/70">{theme.tag}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Theme Preview Card */}
                <div className="bg-surface-highlight rounded-2xl p-8 border border-border animate-in fade-in slide-in-from-bottom-4 duration-500 key={selectedThemeId}">
                    <div className="flex justify-between items-start mb-6">
                        <span className="inline-block px-3 py-1 rounded bg-background border border-border text-xs font-bold text-textMuted uppercase shadow-sm">
                            {currentTheme.tag}
                        </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-textMain mb-3">{currentTheme.label}</h3>
                    <p className="text-textMuted mb-8 leading-relaxed text-lg">
                        {currentTheme.description}
                    </p>

                    <a 
                        href={`?theme=${currentTheme.id}`}
                        className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-bold text-lg rounded-xl shadow-[0_10px_40px_-10px_rgba(217,70,239,0.5)] hover:shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <Eye className="w-5 h-5" />
                            Voir le design en live
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                </div>
             </div>
             
             {/* Decorative Elements behind card */}
             <div className="absolute top-4 -right-4 w-full h-full bg-gradient-to-br from-fuchsia-500/10 to-orange-500/10 rounded-3xl -z-10 blur-2xl"></div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};