
import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, Smartphone, Shield, Zap } from 'lucide-react';
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
              Un accompagnement total au <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">service de votre entreprise</span>
            </h2>
            <p className="text-textMuted text-lg mb-6 leading-relaxed">
              Nous vous accompagnons à 100% sur votre projet, en mettant à disposition notre expertise technique. Car un site lent ou mal conçu fait perdre des clients chaque jours, optez pour le professionnalisme. 
            </p>
            <p className="text-textMuted text-lg mb-8 leading-relaxed">
              Chez Nemphisia, nous créons des sites sur mesure, pensés pour convertir vos visiteurs en clients. Nous mettons en place les meilleures pratiques techniques pour maximiser votre visibilité et vos résultats.
            </p>
            <Button variant="secondary" onClick={scrollToContact}>
              Discuter de mon projet
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
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">Performance & Conversion</h4>
                      <p className="text-sm text-textMuted">Un site rapide retient les visiteurs et favorise les ventes.</p>
                    </div>
                  </div>

                   {/* Connector */}
                   <div className="h-6 w-0.5 bg-gradient-to-b from-fuchsia-500/50 to-orange-500/50 ml-9 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>

                   {/* Step 2 */}
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group">
                    <div className="p-3 rounded-lg bg-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">Sérénité Technique</h4>
                      <p className="text-sm text-textMuted">Maintenance régulière pour prévenir les failles et bugs.</p>
                    </div>
                  </div>

                   {/* Connector */}
                   <div className="h-6 w-0.5 bg-gradient-to-b from-orange-500/50 to-cyan-500/50 ml-9 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>

                   {/* Step 3 */}
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group">
                    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-500 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-textMain">Expérience Mobile</h4>
                      <p className="text-sm text-textMuted">Une navigation parfaite pour capturer le trafic mobile.</p>
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
