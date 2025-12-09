import React from 'react';
import { X, ArrowRight, Flower2, Sparkles } from 'lucide-react';
import './nature-theme.css';

// Background organique avec brume et particules
const NatureBackground = () => {
  // Génération de particules dorées
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 5 + 5}s`,
    opacity: Math.random() * 0.5 + 0.2,
    maxOpacity: Math.random() * 0.8 + 0.4
  }));

  // Génération d'étoiles (points blancs)
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    duration: `${Math.random() * 3 + 2}s`,
    opacity: Math.random() * 0.6 + 0.2
  }));

  return (
    <div className="fixed inset-0 z-0 bg-[#0f1c15] overflow-hidden">
      {/* Étoiles en arrière-plan */}
      {stars.map((s, i) => (
        <div 
          key={`star-${i}`}
          className="nature-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            '--duration': s.duration,
            '--opacity': s.opacity
          } as React.CSSProperties}
        />
      ))}

      {/* Brume d'ambiance */}
      <div className="absolute inset-0 nature-mist animate-pulse-glow"></div>
      
      {/* Orbs de lumière chaude */}
      <div className="absolute top-[10%] right-[20%] w-[600px] h-[600px] bg-[#d4af37] rounded-full mix-blend-soft-light blur-[150px] opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#8da399] rounded-full mix-blend-soft-light blur-[120px] opacity-10 animate-float-delayed"></div>

      {/* Particules Dorées */}
      {particles.map((p, i) => (
        <div 
          key={i}
          className="nature-particle"
          style={{
            top: p.top,
            left: p.left,
            width: Math.random() > 0.5 ? '2px' : '4px',
            height: Math.random() > 0.5 ? '2px' : '4px',
            '--duration': p.duration,
            '--opacity': p.opacity,
            '--max-opacity': p.maxOpacity
          } as React.CSSProperties}
        />
      ))}
      
      {/* Texture grain subtile */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
    </div>
  );
};

// Hero section avec le Mandala
const NatureHero = () => (
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:gap-24 py-20 lg:py-0">
    
    {/* Colonne Gauche : Texte */}
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl animate-in fade-in slide-in-from-left-10 duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#d4af37]/30 rounded-full mb-8 bg-[#0f1c15]/50 backdrop-blur-sm">
        <Sparkles className="w-3 h-3 text-[#d4af37]" />
        <span className="text-[#d4af37] text-xs tracking-[0.2em] uppercase font-serif">Harmonie & Bien-être</span>
      </div>

      <h1 className="text-5xl lg:text-7xl mb-6 leading-[1.1]">
        <span className="block text-[#f2efe4] italic">L'essence</span>
        <span className="block text-[#d4af37] font-semibold">Du Sacré</span>
      </h1>

      <p className="text-[#8da399] text-lg font-sans font-light leading-relaxed mb-10">
        Une expérience digitale conçue pour les thérapeutes et les marques premium. 
        Le design ne doit pas seulement être beau, il doit apaiser l'esprit et inspirer confiance.
      </p>

      <div className="flex gap-6 items-center">
        <button className="nature-btn px-8 py-3 rounded-sm text-lg flex items-center gap-3 group">
          Commencer le voyage
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="text-[#8da399] hover:text-[#f2efe4] transition-colors font-serif italic text-lg decoration-1 underline-offset-4 hover:underline">
          En savoir plus
        </button>
      </div>

      <div className="nature-line-decoration">
        <div className="nature-line"></div>
        <Flower2 className="w-4 h-4 text-[#d4af37]" />
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
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#d4af37]">
                <path d="M12 2L14.5 9L22 12L14.5 15L12 22L9.5 15L2 12L9.5 9L12 2Z" fill="rgba(212, 175, 55, 0.2)" />
                <circle cx="12" cy="12" r="3" strokeWidth="0.5" />
                <circle cx="12" cy="12" r="8" strokeWidth="0.5" strokeDasharray="1 2" />
            </svg>
        </div>
      </div>
    </div>
  </div>
);

export const NatureTheme: React.FC = () => {
  return (
    <div className="min-h-screen nature-theme bg-[#0f1c15] overflow-x-hidden relative">
      <NatureBackground />
      
      <div className="relative z-50 min-h-screen flex flex-col">
        <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-8 bg-[#d4af37]"></div>
             <span className="font-serif text-xl tracking-widest text-[#f2efe4] uppercase">Nature & Gold</span>
          </div>

          <a 
            href="/"
            className="group flex items-center gap-2 px-6 py-2 border border-[#d4af37]/30 rounded-full hover:bg-[#d4af37] hover:text-[#0f1c15] transition-all duration-500"
          >
            <span className="text-sm font-serif tracking-wider uppercase">Fermer</span>
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