
import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Calendar, MessageCircle, Activity, ShieldCheck, Lock, Cpu, Globe, Zap, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToFAQ = () => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[110vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#090014]" id="home">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Synthwave Sun Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full synthwave-sun-glow"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 grid-bg opacity-30 animate-[pulse_10s_ease-in-out_infinite]"></div>
        
        {/* Deep glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-950/30 border border-fuchsia-500/20 w-fit mx-auto lg:mx-0 backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.1)]">
            <ShieldCheck className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs font-bold text-fuchsia-200 tracking-wide uppercase">Agence Web & Cybersécurité</span>
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-display">
            L'élite du <br />
            <span className="synthwave-gradient-text drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">Développement Web</span>
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
            Conception de sites sur mesure, maintenance proactive et sécurité impénétrable. Nous construisons l'infrastructure digitale qui protège et propulse votre entreprise.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
            <Button variant="primary" size="lg" onClick={scrollToContact}>
              <Calendar className="w-5 h-5" />
              Demander un audit
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToFAQ}>
              <MessageCircle className="w-5 h-5" />
              Poser une question
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#090014] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs text-white font-bold ring-2 ring-fuchsia-500/20">
                    <span className="text-[10px]">{['DEV', 'SEC', 'OPS', 'QA'][i-1]}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">100%</span> sécurisé & maintenu
            </p>
          </div>
        </div>

        {/* Right Column: Animation Composition */}
        <div className="lg:col-span-7 relative h-[600px] w-full hidden lg:block perspective-[1000px]">
          
          {/* Main Dashboard Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] z-20 animate-float-slow rotate-y-6 rotate-x-6">
            <Card className="h-full bg-[#150528]/80 border-fuchsia-500/30 shadow-[0_0_50px_rgba(217,70,239,0.15)] backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xs text-fuchsia-300 uppercase tracking-widest font-bold">État du Système</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-display font-bold text-white mt-1 shadow-black drop-shadow-md">Opérationnel</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  <Activity className="w-4 h-4" /> 99.9% Uptime
                </div>
              </div>
              
              {/* Fake System Metrics with Synthwave Gradient */}
              <div className="flex flex-col gap-4 mt-4">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Performance Serveur</span>
                        <span className="text-white">98%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-gradient-to-r from-fuchsia-500 to-orange-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Sécurité / Firewall</span>
                        <span className="text-white">Actif</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Optimisation Cache</span>
                        <span className="text-white">100%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>Dernier scan: Il y a 2 min</span>
                <span className="flex items-center gap-1 text-green-400"><Lock className="w-3 h-3"/> Sécurisé</span>
              </div>
            </Card>
          </div>

          {/* Floating Metric Card 1 (Top Right) */}
          <div className="absolute top-24 -right-4 z-30 animate-float-medium">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-orange-500 bg-[#150528]/90 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Menaces bloquées</p>
                <p className="text-xl font-bold text-white">142</p>
              </div>
            </div>
          </div>

          {/* Floating Metric Card 2 (Bottom Left) */}
          <div className="absolute bottom-20 left-4 z-30 animate-float-fast">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-cyan-400 bg-[#150528]/90 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Vitesse de chargement</p>
                <p className="text-xl font-bold text-white">0.4s</p>
              </div>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fuchsia-500/10 rounded-full z-0 animate-[spin_40s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-[#090014] rounded-full border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <Globe className="w-5 h-5 text-fuchsia-400" />
             </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-dashed border-orange-500/10 rounded-full z-0 animate-[spin_60s_linear_infinite_reverse]">
             <div className="absolute bottom-1/4 left-10 p-2 bg-[#090014] rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Cpu className="w-5 h-5 text-orange-400" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};