import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Calendar, MessageCircle, Activity, ShieldCheck, Lock, Cpu, Globe, Zap } from 'lucide-react';

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
    <section className="relative min-h-screen lg:min-h-[90vh] xl:min-h-[100vh] flex items-center pt-28 pb-12 lg:pt-32 overflow-hidden bg-background transition-colors duration-300" id="home">
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

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-highlight border border-border w-fit mx-auto lg:mx-0 backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.1)]">
            <ShieldCheck className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs font-bold text-textMain tracking-wide uppercase">Agence Web & Expertise Technique</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold leading-[1.1] tracking-tight font-display text-textMain">
            Votre Site Web <br />
            <span className="synthwave-gradient-text drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">Sur Mesure</span>
          </h1>
          
          <p className="text-base lg:text-lg text-textMuted leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
            Décuplez votre chiffre d'affaires et augmentez votre visibilité en ligne. Nous mettons notre expertise technique au service de votre entreprise pour créer des sites performants et sécurisés.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center lg:justify-start pt-2">
            <Button variant="primary" size="lg" onClick={scrollToContact} className="w-full sm:w-auto">
              <Calendar className="w-5 h-5" />
              Lancer mon projet
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToFAQ} className="w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              Une question ?
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="pt-6 lg:pt-8 border-t border-border flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs text-textMain font-bold ring-2 ring-fuchsia-500/20">
                    <span className="text-[10px]">{['SEO', 'UX', 'DEV', 'SEC'][i-1]}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-textMuted">
              <span className="font-bold text-textMain">Site maintenu & sécurisé</span>
            </p>
          </div>
        </div>

        {/* Right Column: Animation Composition */}
        {/* Added scale transform for LG screens to fit smaller laptops */}
        <div className="relative h-[500px] lg:h-[600px] w-full hidden lg:block perspective-[1000px] lg:scale-[0.85] xl:scale-100 origin-center lg:origin-right transition-transform duration-500">
          
          {/* Main Dashboard Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] z-20 animate-float-slow rotate-y-6 rotate-x-6">
            <Card className="h-full bg-surface/90 border-fuchsia-500/30 shadow-[0_0_50px_rgba(217,70,239,0.15)] backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xs text-fuchsia-400 uppercase tracking-widest font-bold">Performance du Site</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-display font-bold text-textMain mt-1 shadow-black drop-shadow-md">Optimisé</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  <Activity className="w-4 h-4" /> En ligne
                </div>
              </div>
              
              {/* Fake System Metrics with Synthwave Gradient */}
              <div className="flex flex-col gap-4 mt-4">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-textMuted">
                        <span>Visibilité (SEO)</span>
                        <span className="text-textMain">En hausse</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-fuchsia-500 to-orange-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-textMuted">
                        <span>Maintenance Sécurité</span>
                        <span className="text-textMain">Active</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-textMuted">
                        <span>Expérience Utilisateur</span>
                        <span className="text-textMain">Fluide</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 flex justify-between items-center text-xs text-textMuted font-mono">
                <span>Dernière mise à jour: Aujourd'hui</span>
                <span className="flex items-center gap-1 text-green-500"><Lock className="w-3 h-3"/> HTTPS</span>
              </div>
            </Card>
          </div>

          {/* Floating Metric Card 1 (Top Right) */}
          <div className="absolute top-24 -right-4 z-30 animate-float-medium">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-orange-500 bg-surface/90 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-textMuted uppercase tracking-wide">Trafic</p>
                <p className="text-xl font-bold text-textMain">+45%</p>
              </div>
            </div>
          </div>

          {/* Floating Metric Card 2 (Bottom Left) */}
          <div className="absolute bottom-20 left-4 z-30 animate-float-fast">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-cyan-400 bg-surface/90 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-textMuted uppercase tracking-wide">Vitesse</p>
                <p className="text-xl font-bold text-textMain">0.4s</p>
              </div>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fuchsia-500/10 rounded-full z-0 animate-[spin_40s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-background rounded-full border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <Globe className="w-5 h-5 text-fuchsia-400" />
             </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-dashed border-orange-500/10 rounded-full z-0 animate-[spin_60s_linear_infinite_reverse]">
             <div className="absolute bottom-1/4 left-10 p-2 bg-background rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Cpu className="w-5 h-5 text-orange-400" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};