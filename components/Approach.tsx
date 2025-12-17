
import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, MapPin, Search, MousePointerClick } from 'lucide-react';
import { Card } from './ui/Card';

export const Approach: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-20 xl:py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content - ID added here for direct scrolling */}
          <div className="order-2 lg:order-1" id="approach">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 font-display text-textMain">
              Une stratégie d'acquisition <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">complète pour votre entreprise</span>
            </h2>
            <p className="text-textMuted text-lg mb-6 leading-relaxed">
              Avoir un site ne suffit plus. Pour gagner des parts de marché, vous devez être visible là où vos clients cherchent et les convaincre instantanément.
            </p>
            <p className="text-textMuted text-lg mb-8 leading-relaxed">
              Chez Nemphisia, nous déployons un écosystème digital complet (Site, Maps, SEO) conçu pour capturer le trafic local, écraser la concurrence et maximiser vos appels entrants.
            </p>
            <Button variant="secondary" onClick={scrollToContact}>
              Obtenir mon plan d'action
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Visual Content */}
          <div className="order-1 lg:order-2 relative">
             {/* Abstract background shape */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-fuchsia-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
             
             <Card className="relative z-10 p-6 lg:p-8 border-border bg-surface/80 backdrop-blur-xl">
                <div className="flex flex-col gap-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group">
                    <div className="p-3 rounded-lg bg-fuchsia-500/20 text-fuchsia-500 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">Domination Locale (Pack Maps)</h4>
                      <p className="text-sm text-textMuted">Apparaissez en premier quand vos clients cherchent vos services sur Google.</p>
                    </div>
                  </div>

                   {/* Connector */}
                   <div className="h-6 w-0.5 bg-gradient-to-b from-fuchsia-500/50 to-orange-500/50 ml-9 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>

                   {/* Step 2 */}
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group">
                    <div className="p-3 rounded-lg bg-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">SEO & Visibilité</h4>
                      <p className="text-sm text-textMuted">Positionnez votre site devant vos concurrents sur les mots-clefs qui rapportent.</p>
                    </div>
                  </div>

                   {/* Connector */}
                   <div className="h-6 w-0.5 bg-gradient-to-b from-orange-500/50 to-cyan-500/50 ml-9 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>

                   {/* Step 3 */}
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group">
                    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-500 group-hover:scale-110 transition-transform">
                      <MousePointerClick className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">Site à Haute Conversion</h4>
                      <p className="text-sm text-textMuted">Un design immersif qui transforme les visiteurs en clients fidèles.</p>
                    </div>
                  </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
