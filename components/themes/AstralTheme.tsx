import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import './astral-theme.css';

interface AstralThemeProps {
  isOpen: boolean;
  onClose: () => void;
}

// Composant interne Hero spécifique au thème Astral
const AstralHero = () => (
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
    <div className="astral-glass px-4 py-2 rounded-full mb-8 astral-float">
      <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">Design System V2.0</span>
    </div>

    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300">
        ASTRAL
      </span>
      <br />
      <span className="text-white text-4xl md:text-6xl font-light">EXPERIENCE</span>
    </h1>

    <p className="max-w-xl text-blue-100/70 text-lg mb-10 leading-relaxed">
      Une architecture isolée, épurée et spatiale. Ce thème démontre la capacité à injecter des univers visuels complètement indépendants au sein d'une même application.
    </p>

    <div className="flex gap-4">
      <button className="astral-btn-glow px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center gap-2">
        Explorer <ArrowRight className="w-4 h-4" />
      </button>
      <button className="px-8 py-4 astral-glass text-white rounded-xl font-medium hover:bg-white/10 transition-all border border-white/10">
        Documentation
      </button>
    </div>

    {/* Floating Cards Demo */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {[
        { icon: Globe, title: "Global Reach", val: "100%" },
        { icon: Zap, title: "Performance", val: "< 50ms" },
        { icon: Cpu, title: "Processing", val: "Neural" }
      ].map((item, i) => (
        <div key={i} className={`astral-glass p-6 rounded-2xl flex flex-col items-center gap-3 ${i % 2 === 0 ? 'astral-float' : 'astral-float-delayed'}`}>
          <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-300">
            <item.icon className="w-6 h-6" />
          </div>
          <span className="text-sm text-blue-200 uppercase tracking-wider">{item.title}</span>
          <span className="text-2xl font-bold text-white">{item.val}</span>
        </div>
      ))}
    </div>
  </div>
);

// Composant interne Background spécifique au thème Astral
const AstralBackground = () => {
  // Génération statique d'étoiles pour éviter les calculs lourds au render
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 3 + 2}s`,
    opacity: Math.random() * 0.7 + 0.3
  }));

  return (
    <div className="absolute inset-0 astral-star-field z-0">
      {/* Nebulas */}
      <div className="astral-nebula bg-indigo-600 top-[-10%] left-[20%] w-[500px] h-[500px] opacity-30"></div>
      <div className="astral-nebula bg-cyan-600 bottom-[-10%] right-[10%] w-[600px] h-[600px] opacity-20 animation-delay-2000"></div>
      
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="astral-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            '--opacity': star.opacity
          } as React.CSSProperties}
        />
      ))}
      
      {/* Grid overlay subtle */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

export const AstralTheme: React.FC<AstralThemeProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden'; // Empêcher le scroll du site principal
    } else {
      const timer = setTimeout(() => setMounted(false), 500); // Délai pour l'animation de sortie
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] transition-opacity duration-500 astral-theme ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <AstralBackground />
      
      <div className="relative z-50 h-full w-full overflow-y-auto">
        {/* Header Astral */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="font-bold text-white text-xs">A</span>
            </div>
            <span className="font-display font-bold text-white tracking-widest">ASTRAL UI</span>
          </div>

          <button 
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 rounded-full astral-glass hover:bg-white/10 transition-all text-white"
          >
            <span className="text-sm font-medium opacity-70 group-hover:opacity-100">Retour au site</span>
            <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
              <X className="w-4 h-4" />
            </div>
          </button>
        </header>

        {/* Contenu Principal */}
        <main className="min-h-screen flex flex-col">
          <AstralHero />
        </main>
      </div>
    </div>
  );
};