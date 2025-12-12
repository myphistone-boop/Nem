import React, { useState } from 'react';
import { ArrowLeft, Palette, ChevronDown, Check, HeartHandshake, Flower2, Briefcase, PenTool, Hammer, LayoutTemplate, Zap, ShoppingBag, Info } from 'lucide-react';

export const DemoNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Récupérer le thème actuel depuis l'URL
  const currentTheme = new URLSearchParams(window.location.search).get('theme');

  const themes = [
    { id: 'impact', label: 'Impact', icon: Zap, color: 'text-yellow-400' },
    { id: 'care', label: 'Nature & Soins', icon: HeartHandshake, color: 'text-green-600' },
    { id: 'esthetic', label: 'Esthétique', icon: Flower2, color: 'text-pink-400' },
    { id: 'coaching', label: 'Coaching', icon: Briefcase, color: 'text-violet-400' },
    { id: 'consultant', label: 'Prof. Libérale', icon: PenTool, color: 'text-amber-600' },
    { id: 'artisan', label: 'Artisan', icon: Hammer, color: 'text-blue-500' },
    { id: 'commerce', label: 'Commerce', icon: ShoppingBag, color: 'text-orange-500' },
    { id: 'classic', label: 'Classique', icon: LayoutTemplate, color: 'text-slate-400' },
  ];

  return (
    <div className="fixed top-20 md:top-28 left-4 z-[9999] flex items-center gap-3 font-sans flex-wrap pointer-events-none">
      
      {/* Container interactif pour les boutons */}
      <div className="flex items-start gap-2 pointer-events-auto">
        {/* Bouton Retour Site Principal */}
        <a 
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/10 hover:bg-black hover:scale-105 transition-all duration-300 group"
            title="Revenir à l'accueil Nemphisia"
        >
            <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="w-3 h-3" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider pr-1 hidden sm:inline">Nemphisia</span>
            <span className="text-xs font-bold uppercase tracking-wider pr-1 sm:hidden">Retour</span>
        </a>

        {/* Dropdown Sélecteur de Thème */}
        <div className="relative">
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/10 hover:bg-black transition-all duration-300 ${isOpen ? 'ring-2 ring-white/20' : ''}`}
            >
            <Palette className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs font-bold uppercase tracking-wider sm:hidden">Choix Thème</span>
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Changer de thème</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-1 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Sélectionner un design
                </div>
                {themes.map((theme) => (
                <a 
                    key={theme.id}
                    href={`?theme=${theme.id}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${currentTheme === theme.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <div className="flex items-center gap-3">
                        <theme.icon className={`w-4 h-4 ${theme.color}`} />
                        <span className="text-sm font-medium">{theme.label}</span>
                    </div>
                    {currentTheme === theme.id && <Check className="w-3 h-3 text-white" />}
                </a>
                ))}
            </div>
            )}
        </div>
      </div>

      {/* Badge Informatif (Non cliquable pour ne pas gêner) */}
      <div className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md text-black rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/20">
         <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
         </span>
         <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Ceci est un site exemple</span>
         <span className="text-xs font-bold uppercase tracking-wider sm:hidden">Site Exemple</span>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};