import React from 'react';
import { Card } from './ui/Card';

export const Solutions: React.FC = () => {
  const brands = [
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 21.36c-2.05 0-4.01-.58-5.65-1.57-1.63-.98-2.9-2.29-3.77-3.84-.88-1.54-1.15-3.32-.98-5.18.17-1.87.89-3.6 2.06-5 1.18-1.4 2.74-2.45 4.51-2.95 1.77-.5 3.65-.43 5.37.23 1.72.66 3.2 1.83 4.22 3.37 1.02 1.54 1.51 3.39 1.34 5.25-.17 1.86-.88 3.59-2.05 4.99-1.17 1.4-2.73 2.45-4.5 2.95-1.77.5-3.66.42-5.38-.24M12 2.64c-2.49 0-4.88.97-6.66 2.71C3.58 7.09 2.59 9.47 2.59 11.97c0 2.5.99 4.89 2.75 6.66 1.76 1.77 4.15 2.76 6.66 2.76 2.5 0 4.88-.99 6.66-2.76 1.77-1.77 2.76-4.16 2.76-6.66 0-2.5-.99-4.88-2.76-6.63-1.78-1.74-4.17-2.7-6.66-2.7" opacity=".3" />
          <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z" />
        </svg>
      )
    },
    {
      name: 'Security',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      )
    },
    {
      name: 'Cloud',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
        </svg>
      )
    },
    {
      name: 'Code',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      )
    },
    {
      name: 'Database',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 2C6.48 2 2 4.02 2 6.5V9c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5V6.5C22 4.02 17.52 2 12 2zm0 7c-4.27 0-7.86-1.25-8-3V6.5C4.14 4.75 7.73 3.5 12 3.5s7.86 1.25 8 3V6c-.14 1.75-3.73 3-8 3zM2 11.5v2.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2.5c0 1.9-3.32 3.5-8 3.5s-8-1.6-8-3.5zm0 5v2.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2.5c0 1.9-3.32 3.5-8 3.5s-8-1.6-8-3.5z" />
        </svg>
      )
    },
    {
      name: 'Mobile',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
        </svg>
      )
    }
  ];
  
  return (
    <section className="py-20 relative bg-surface-highlight">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 font-display text-textMain">
          Une Stack Technique <span className="text-fuchsia-400">Robuste</span>
        </h2>
        
        <Card className="max-w-4xl mx-auto border-border bg-background/60 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center py-8 px-4">
            {brands.map((brand, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center group-hover:bg-surface-highlight group-hover:scale-110 transition-all duration-300 border border-border group-hover:border-fuchsia-500/30 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.2)] text-textMuted group-hover:text-textMain">
                   {brand.icon}
                </div>
                <span className="font-bold text-textMuted group-hover:text-fuchsia-400 text-xs tracking-wider transition-colors uppercase">{brand.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-border px-4">
            <p className="text-textMuted max-w-2xl mx-auto">
              Nemphisia utilise les technologies les plus modernes pour garantir pérennité et évolutivité à vos projets web. Nous ne faisons aucun compromis sur la qualité du code.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};