import React from 'react';
import { X, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import './astral-theme.css';

// Composant interne Hero spécifique au thème Astral
const AstralHero = () => (
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
    <div className="astral-glass px-4 py-2 rounded-full mb-8 astral-float border-cyan-400/30">
      <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Design System V2.0</span>
    </div>

    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
        ASTRAL
      </span>
      <br />
      <span className="text-white text-4xl md:text-6xl font-light tracking-wide">EXPERIENCE</span>
    </h1>

    <p className="max-w-xl text-indigo-100 text-lg mb-10 leading-relaxed font-medium drop-shadow-md">
      Une architecture isolée, épurée et spatiale. Des couleurs vibrantes pour une immersion totale.
    </p>

    <div className="flex gap-4">
      <button className="astral-btn-glow px-8 py-4 text-white rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2">
        Explorer <ArrowRight className="w-5 h-5" />
      </button>
      <button className="px-8 py-4 astral-glass text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/30">
        Documentation
      </button>
    </div>

    {/* Floating Cards Demo */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pb-12">
      {[
        { icon: Globe, title: "Global Reach", val: "100%" },
        { icon: Zap, title: "Performance", val: "< 50ms" },
        { icon: Cpu, title: "Processing", val: "Neural" }
      ].map((item, i) => (
        <div key={i} className={`astral-glass p-6 rounded-2xl flex flex-col items-center gap-3 border-t border-white/20 shadow-xl ${i % 2 === 0 ? 'astral-float' : 'astral-float-delayed'}`}>
          <div className="p-3 bg-indigo-500 rounded-full text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]">
            <item.icon className="w-6 h-6" />
          </div>
          <span className="text-cyan-200 font-bold uppercase tracking-wider">{item.title}</span>
          <span className="text-2xl font-bold text-white drop-shadow-lg">{item.val}</span>
        </div>
      ))}
    </div>
  </div>
);

// Composant Background simplifié (Statique + Gradient)
const AstralBackground = () => {
  return (
    <div className="fixed inset-0 astral-bg-static">
      {/* Nebulas statiques mais brillantes */}
      <div className="astral-nebula bg-fuchsia-600 top-[10%] left-[20%] w-[400px] h-[400px] mix-blend-screen animate-pulse"></div>
      <div className="astral-nebula bg-cyan-500 bottom-[10%] right-[10%] w-[500px] h-[500px] mix-blend-screen opacity-50"></div>
      
      {/* Grid overlay simple */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>
  );
};

export const AstralTheme: React.FC = () => {
  return (
    <div className="min-h-screen astral-theme bg-[#1e1b4b] overflow-x-hidden relative">
      <AstralBackground />
      
      <div className="relative z-50 min-h-screen flex flex-col">
        {/* Header Astral */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
              <span className="font-bold text-white text-xs">A</span>
            </div>
            <span className="font-display font-bold text-white tracking-widest drop-shadow-md">ASTRAL UI</span>
          </div>

          <a 
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-full astral-glass hover:bg-white/20 transition-all text-white border border-white/20"
          >
            <span className="text-sm font-bold shadow-black drop-shadow-sm">Retour au site</span>
            <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/40 transition-colors">
              <X className="w-4 h-4" />
            </div>
          </a>
        </header>

        {/* Contenu Principal */}
        <main className="flex-grow flex items-center justify-center">
          <AstralHero />
        </main>
      </div>
    </div>
  );
};