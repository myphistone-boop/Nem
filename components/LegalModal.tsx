
import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { Button } from './ui/Button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300 custom-scrollbar">
        <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-fuchsia-500" />
            <h2 className="text-lg font-bold text-textMain">Mentions Légales</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-highlight rounded-full transition-colors text-textMuted hover:text-textMain"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 text-textMuted text-sm leading-relaxed">
          
          <section>
            <h3 className="text-textMain font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Édition du site
            </h3>
            <p>
              Le site Nemphisia est édité par l'agence Nemphisia, spécialisée dans la création de solutions digitales sur mesure.
              <br />
              <strong>Contact :</strong> contact@nemphisia.com
            </p>
          </section>

          <section>
            <h3 className="text-textMain font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span>
              Hébergement
            </h3>
            <p>
              Ce site est hébergé sur une infrastructure Cloud sécurisée répondant aux normes de sécurité actuelles. Les données techniques sont stockées dans des centres de données sécurisés.
            </p>
          </section>

          <section>
            <h3 className="text-textMain font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              Propriété Intellectuelle
            </h3>
            <p>
              L’ensemble de ce site (structure, textes, logos, images et design) relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Toute reproduction, totale ou partielle, est interdite sans autorisation expresse.
            </p>
          </section>

          <section>
            <h3 className="text-textMain font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
              Responsabilité & Données
            </h3>
            <p>
              Les informations fournies sur le site le sont à titre indicatif. Nemphisia ne saurait être tenu responsable des erreurs ou omissions.
              <br /><br />
              <strong>Données personnelles :</strong> Les informations recueillies via le formulaire de contact sont uniquement utilisées pour répondre à votre demande. Elles ne sont ni vendues ni cédées à des tiers.
            </p>
          </section>

        </div>

        <div className="sticky bottom-0 bg-surface/95 backdrop-blur border-t border-border p-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
