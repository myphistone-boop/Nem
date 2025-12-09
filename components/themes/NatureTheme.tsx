import React from 'react';
import { X, ArrowRight, Flower2, Sparkles } from 'lucide-react';
import './nature-theme.css';

// Background organique optimisé sans particules lourdes
const NatureBackground = () => {
  return (
    <div className="fixed inset-0 z-0 nature-bg-static overflow-hidden">
      {/* Orbs de lumière chaude statiques mais vibrants */}
      <div className="nature-beam top-[10%] right-[20%] w-[600px] h-[600px] opacity-40"></div>
      <div className="nature-beam bottom-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-400 opacity-20"></div>

      {/* Texture grain subtile */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

// Hero section avec le Mandala
const NatureHero = () => (
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:gap-24 py-20 lg:py-0">
    
    {/* Colonne Gauche : Texte */}
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl animate-in fade-in slide-in-from-left-10 duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#fbbf24] rounded-full mb-8 bg-emerald-900/40 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.3)]">
        <Sparkles className="w-4 h-4 text-[#fbbf24]" />
        <span className="text-[#fbbf24] text-xs tracking-[0.2em] uppercase font-bold font-serif">Harmonie & Bien-être</span>
      </div>

      <h1 className="text-5xl lg:text-7xl mb-6 leading-[1.1] drop-shadow-xl">
        <span className="block text-white italic font-serif">L'essence</span>
        <span className="block text-[#fbbf24] font-bold drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">Du Sacré</span>
      </h1>

      <p className="text-emerald-100 text-lg font-sans font-medium leading-relaxed mb-10 drop-shadow-md">
        Une expérience digitale conçue pour les thérapeutes et les marques premium. 
        Le design ne doit pas seulement être beau, il doit apaiser l'esprit.
      </p>

      <div className="flex gap-6 items-center">
        <button className="nature-btn px-10 py-4 rounded-sm text-lg flex items-center gap-3 group shadow-xl">
          Commencer le voyage
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="text-emerald-200 hover:text-white transition-colors font-serif italic text-lg decoration-1 underline-offset-4 hover:underline">
          En savoir plus
        </button>
      </div>

      <div className="nature-line-decoration">
        <div className="nature-line"></div>
        <Flower2 className="w-5 h-5 text-[#fbbf24]" />
        <div className="nature-line"></div>
      </div>
    </div>

    {/* Colonne Droite : Le Mandala et les Planètes */}
    <div className="relative mt-12 lg:mt-0 animate-in fade-in zoom-in duration-1000 delay-300">
      <div className="nature-mandala-container scale-75 lg:scale-100">
        {/* Cercles concentriques animés (Mandala de base) */}
        <div className="nature-ring nature-ring-1"></div>
        <div className="nature-ring nature-ring-2"></div>
        <div className="nature-ring nature-ring-3"></div>
        
        {/* Système planétaire (Orbites + Planètes) */}
        <div className="nature-orbit nature-orbit-inner">
           <div className="nature-planet nature-planet-1"></div>
        </div>
        
        <div className="nature-orbit nature-orbit-middle">
           <div className="nature-planet nature-planet-2"></div>
        </div>

        <div className="nature-orbit nature-orbit-outer">
           <div className="nature-planet nature-planet-3"></div>
        </div>

        {/* Icône Centrale (Logo Star) */}
        <div className="nature-glyph z-20">
            {/* SVG Custom géométrique ou icône complexe */}
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#fbbf24]">
                <path d="M12 2L14.5 9L22 12L14.5 15L12 22L9.5 15L2 12L9.5 9L12 2Z" fill="rgba(251, 191, 36, 0.2)" />
                <circle cx="12" cy="12" r="3" strokeWidth="1" fill="#fbbf24" />
                <circle cx="12" cy="12" r="8" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
        </div>
      </div>
    </div>
  </div>
);

export const NatureTheme: React.FC = () => {
  return (
    <div className="min-h-screen nature-theme bg-[#064e3b] overflow-x-hidden relative">
      <NatureBackground />
      
      <div className="relative z-50 min-h-screen flex flex-col">
        <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
          <div className="flex items-center gap-3">
             <div className="h-[2px] w-8 bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
             <span className="font-serif text-xl tracking-widest text-white uppercase font-bold drop-shadow-md">Nature & Gold</span>
          </div>

          <a 
            href="/"
            className="group flex items-center gap-2 px-6 py-2 border-2 border-[#fbbf24]/50 rounded-full hover:bg-[#fbbf24] hover:text-[#064e3b] transition-all duration-500 bg-black/20 backdrop-blur-md"
          >
            <span className="text-sm font-serif tracking-wider uppercase font-bold">Fermer</span>
            <X className="w-4 h-4" />
          </a>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <NatureHero />
        </main>
      </div>
    </div>
  );
};