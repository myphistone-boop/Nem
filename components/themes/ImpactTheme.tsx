import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Command, Shield, Zap, Globe } from 'lucide-react';
import './impact-theme.css';

export const ImpactTheme: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !cardRef.current || !titleRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate percentage from center (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      // Rotate Card (opposite to mouse)
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * -10}deg) 
        rotateX(${y * 10}deg) 
        scale(1.02)
      `;
      
      // Move Title slightly
      titleRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="impact-theme min-h-screen bg-[#F5F5F7] overflow-hidden flex flex-col relative">
      
      {/* Navbar Minimaliste - Texte Noir et Bouton visible */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 text-[#1d1d1f]">
        <div className="flex items-center gap-2">
            <Command className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">IMPACT</span>
        </div>
        
        {/* Bouton Fermer contrasté */}
        <a 
          href="/" 
          className="flex items-center gap-3 text-sm font-medium bg-white/80 backdrop-blur-md border border-gray-200 px-5 py-2.5 rounded-full shadow-sm hover:scale-105 hover:shadow-md transition-all text-[#1d1d1f]"
        >
            <span>Fermer</span>
            <div className="bg-[#1d1d1f] rounded-full p-0.5 text-white">
              <X className="w-3 h-3" />
            </div>
        </a>
      </nav>

      {/* Hero Section */}
      <div 
        ref={containerRef}
        className="flex-grow flex flex-col lg:flex-row items-center justify-center relative px-6 lg:px-20 pt-20"
      >
        {/* Abstract Background Element (Blurry blob) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-300 to-purple-300 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

        {/* Left Column: Typography */}
        <div className="z-10 text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start space-y-8">
            <h1 ref={titleRef} className="impact-big-title impact-fade-up">
                THINK<br />
                DIGITAL.
            </h1>
            <p className="text-xl md:text-2xl text-[#86868b] font-medium max-w-md impact-fade-up impact-delay-1 leading-relaxed">
                Repoussez les limites de l'expérience web.
                Rapidité extrême. Sécurité absolue. Design intemporel.
            </p>
            <div className="flex gap-4 impact-fade-up impact-delay-2 pt-4">
                <button className="impact-btn group">
                    Commencer le projet <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="impact-btn-outline">
                    Voir la démo
                </button>
            </div>
        </div>

        {/* Right Column: Floating 3D Card (Product) */}
        <div className="lg:w-1/2 h-[500px] md:h-[700px] w-full flex items-center justify-center relative z-20 impact-fade-up impact-delay-3 perspective-1000">
             {/* The Card */}
             <div 
                ref={cardRef} 
                className="impact-card-3d impact-glass-panel w-full max-w-md aspect-[3/4] rounded-[40px] p-8 flex flex-col justify-between relative"
             >
                {/* Internal UI of the card */}
                <div className="flex justify-between items-center">
                    <div className="w-12 h-1 bg-black/10 rounded-full"></div>
                    <div className="text-xs font-bold text-black/40">NEMPHISIA OS</div>
                </div>

                {/* Center Content of Card */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 backdrop-blur-md shadow-sm transform translate-z-10 transition-transform hover:scale-105 cursor-pointer">
                        <div className="p-3 bg-blue-500 rounded-2xl text-white">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-black/50 uppercase">Vitesse</div>
                            <div className="text-2xl font-bold text-black">0.4s Load</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 backdrop-blur-md shadow-sm transform translate-z-10 transition-transform hover:scale-105 cursor-pointer">
                        <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-black/50 uppercase">Sécurité</div>
                            <div className="text-2xl font-bold text-black">Grade A+</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 backdrop-blur-md shadow-sm transform translate-z-10 transition-transform hover:scale-105 cursor-pointer">
                        <div className="p-3 bg-purple-500 rounded-2xl text-white">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-black/50 uppercase">Réseau</div>
                            <div className="text-2xl font-bold text-black">Global CDN</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Card */}
                <div className="mt-8 pt-6 border-t border-black/5">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold tracking-tight">100%</span>
                        <div className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full">
                            OPTIMIZED
                        </div>
                    </div>
                </div>

                {/* Decorative floating badge outside card */}
                <div className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                    <span className="text-xs font-bold text-gray-400">STATUS</span>
                    <div className="text-green-500 font-bold flex items-center gap-1">
                        ● Online
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* Bottom Ticker / Footer for Hero */}
      <div className="absolute bottom-0 w-full py-6 border-t border-black/5 flex justify-center gap-12 text-xs font-semibold text-gray-400 tracking-widest uppercase opacity-60">
        <span>Designé en Californie</span>
        <span>•</span>
        <span>Construit en France</span>
        <span>•</span>
        <span>Imaginé pour le style</span>
      </div>
    </div>
  );
};