import React from 'react';
import { Search, ShoppingBag, User, Menu, X, Package, ShieldCheck, Headphones } from 'lucide-react';
import './boutique-theme.css';

export const BoutiqueTheme: React.FC = () => {
  return (
    <div className="boutique-theme min-h-screen flex flex-col">
      
      {/* Barre d'annonce */}
      <div className="bg-black text-white text-xs font-medium text-center py-2.5 tracking-wide">
        LIVRAISON OFFERTE DÈS 150€ D'ACHAT • RETOURS GRATUITS SOUS 30 JOURS
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-[#e5e5e5] z-50 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-4">
             <Menu className="w-6 h-6 text-[#1a1a1a]" />
          </div>

          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-[#1a1a1a] absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
            L'ATELIER<span className="text-[#999]">.</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="boutique-nav-link">Nouveautés</a>
            <a href="#" className="boutique-nav-link">Collection</a>
            <a href="#" className="boutique-nav-link">Accessoires</a>
            <a href="#" className="boutique-nav-link">Maison</a>
            <a href="#" className="boutique-nav-link text-red-700">Soldes</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Shop Icons */}
            <div className="flex items-center gap-5 text-[#1a1a1a]">
                <Search className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
                <a href="#" className="hidden md:block"><User className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" /></a>
                <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-full">0</span>
                </div>
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
            
            {/* Prominent Close Button */}
             <a 
              href="/" 
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#1a1a1a] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#333] transition-all shadow-sm hover:shadow-md"
            >
              <span>Fermer</span>
              <X className="w-3 h-3" />
            </a>

            {/* Mobile Close Button (Icon only) */}
            <a 
              href="/" 
              className="md:hidden flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-black"
            >
              <X className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-140px)]">
          
          {/* Left: Content */}
          <div className="flex flex-col justify-center px-8 lg:px-24 py-16 bg-white order-2 lg:order-1">
            <div className="max-w-xl mx-auto lg:mx-0 boutique-fade-in">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4 block">Collection Automne / Hiver</span>
              <h1 className="text-5xl lg:text-6xl font-medium text-[#1a1a1a] leading-tight mb-6 boutique-heading">
                L'Élégance <br />
                au Quotidien.
              </h1>
              <p className="text-lg text-[#555] mb-10 leading-relaxed max-w-md boutique-fade-in boutique-delay-1">
                Découvrez des pièces intemporelles, conçues avec des matières nobles pour durer toute une vie. Une approche minimaliste de la mode.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 boutique-fade-in boutique-delay-2">
                <button className="boutique-btn group">
                  Acheter maintenant 
                </button>
                <button className="boutique-btn-outline">
                  Voir le Lookbook
                </button>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-[50vh] lg:h-auto bg-[#f0f0f0] overflow-hidden order-1 lg:order-2 boutique-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
              alt="Femme élégante portant un manteau beige dans une rue commerçante" 
              className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
        </div>

        {/* Features / Reassurance Bar */}
        <div className="border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
              
              <div className="px-4 boutique-fade-in boutique-delay-3 flex flex-col items-center gap-3">
                <Package className="w-8 h-8 text-[#1a1a1a] stroke-1" />
                <div>
                    <h3 className="font-medium text-[#1a1a1a] mb-1">Livraison Rapide</h3>
                    <p className="text-sm text-[#555]">Expédition sous 24h & Suivi colis</p>
                </div>
              </div>

              <div className="px-4 pt-8 md:pt-0 boutique-fade-in boutique-delay-3 flex flex-col items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#1a1a1a] stroke-1" />
                <div>
                    <h3 className="font-medium text-[#1a1a1a] mb-1">Paiement Sécurisé</h3>
                    <p className="text-sm text-[#555]">Transactions cryptées SSL 256-bit</p>
                </div>
              </div>

              <div className="px-4 pt-8 md:pt-0 boutique-fade-in boutique-delay-3 flex flex-col items-center gap-3">
                <Headphones className="w-8 h-8 text-[#1a1a1a] stroke-1" />
                <div>
                    <h3 className="font-medium text-[#1a1a1a] mb-1">Service Client</h3>
                    <p className="text-sm text-[#555]">Disponible du Lundi au Samedi</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};