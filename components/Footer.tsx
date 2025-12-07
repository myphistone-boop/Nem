import React from 'react';
import { Rocket } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-highlight border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white transform -rotate-45" />
            </div>
            <span className="text-lg font-bold text-textMain">Nemphisia</span>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center">
            <a href="#" className="text-textMuted hover:text-textMain text-sm transition-colors">Accueil</a>
            <a href="#" className="text-textMuted hover:text-textMain text-sm transition-colors">Services</a>
            <a href="#" className="text-textMuted hover:text-textMain text-sm transition-colors">Contact</a>
            <a href="#" className="text-textMuted hover:text-textMain text-sm transition-colors">Mentions Légales</a>
          </div>
        </div>
        
        <div className="text-center text-xs text-textMuted">
          &copy; {new Date().getFullYear()} Nemphisia. Tous droits réservés. <br />
          L'excellence du développement web sécurisé.
        </div>
      </div>
    </footer>
  );
};