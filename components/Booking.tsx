import React, { useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { Card } from './ui/Card';

export const Booking: React.FC = () => {
  useEffect(() => {
    // Load Calendly script dynamically
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.setAttribute('async', 'true');
    head?.appendChild(script);

    return () => {
      // Cleanup optional
    }
  }, []);

  return (
    <section className="py-24 bg-[#05010a] relative border-t border-white/5" id="booking">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-900/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-sm font-medium mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Rendez-vous offert</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
                    Réservez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">Audit Technique</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    30 minutes pour analyser l'architecture, la sécurité et les performances de votre site actuel. Sans engagement.
                </p>
            </div>

            <div className="max-w-5xl mx-auto relative">
                {/* Decorative border wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-b from-fuchsia-500/20 to-orange-500/20 rounded-2xl blur-md opacity-75"></div>
                
                <Card className="p-2 bg-[#150528] relative overflow-hidden min-h-[750px] lg:h-[750px]">
                    {/* Calendly Widget */}
                    <div 
                        className="calendly-inline-widget w-full h-full" 
                        data-url="https://calendly.com/nouvo-digital/30min?hide_gdpr_banner=1&background_color=150528&text_color=ffffff&primary_color=d946ef" 
                        style={{ minWidth: '320px', height: '100%' }} 
                    />
                </Card>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span>Durée : 30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-fuchsia-400" />
                    <span>Audit 100% Gratuit</span>
                </div>
            </div>
        </div>
    </section>
  );
};