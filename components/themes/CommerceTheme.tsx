
import React from 'react';
import { X, MapPin, Phone, Clock, Instagram, Facebook, Mail, Flower, Gift, Coffee, Heart } from 'lucide-react';
import './commerce-theme.css';

export const CommerceTheme: React.FC = () => {
  return (
    <div className="commerce-theme min-h-screen flex flex-col">
      
      {/* Navbar Chaleureuse */}
      <nav className="fixed top-0 w-full z-50 bg-[#fffaf5]/90 backdrop-blur-md border-b border-[#e6e1db]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#c27a63] flex items-center justify-center text-white">
                    <Flower className="w-5 h-5" />
                </div>
                <span className="commerce-serif text-xl font-bold tracking-tight text-[#5c4d41]">L'Atelier <span className="text-[#c27a63]">Botanique</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5c4d41]">
                <a href="#home" className="hover:text-[#c27a63] transition-colors">Accueil</a>
                <a href="#services" className="hover:text-[#c27a63] transition-colors">Savoir-faire</a>
                <a href="#galerie" className="hover:text-[#c27a63] transition-colors">La Boutique</a>
                <a href="#contact" className="hover:text-[#c27a63] transition-colors">Nous trouver</a>
            </div>

            <div className="flex items-center gap-4">
                <a href="#contact" className="hidden md:block text-sm font-bold text-[#c27a63] border-b-2 border-[#c27a63] pb-0.5 hover:text-[#a86550] hover:border-[#a86550] transition-colors">
                    Nous contacter
                </a>
                <a href="/" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e8dccb] text-[#5c4d41] hover:bg-[#c27a63] hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
                <span className="inline-block px-3 py-1 bg-[#d8e2dc] text-[#5c4d41] rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                    Fleuriste & Décoration à Lyon
                </span>
                <h1 className="commerce-heading text-5xl lg:text-7xl mb-6 leading-tight">
                    Des fleurs pour <br/>
                    <span className="text-[#c27a63] italic">raconter vos histoires.</span>
                </h1>
                <p className="text-lg text-[#4a4a4a] mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Bienvenue dans notre univers végétal. Compositions florales sauvages, objets de décoration artisanaux et ateliers créatifs au cœur du quartier.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#contact" className="commerce-btn commerce-btn-primary">
                        Venir à la boutique
                    </a>
                    <a href="#services" className="commerce-btn commerce-btn-outline">
                        Nos prestations
                    </a>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <div className="relative aspect-[4/5] rounded-t-full rounded-b-[200px] overflow-hidden border-8 border-white shadow-xl">
                    <img 
                        src="https://images.unsplash.com/photo-1591241123495-23c21d8b671c?q=80&w=1974&auto=format&fit=crop" 
                        alt="Fleuriste Boutique" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="commerce-heading text-3xl mb-4 text-[#5c4d41]">Notre Savoir-Faire</h2>
                <p className="text-[#4a4a4a]">Plus qu'une boutique, un lieu de vie et de création autour du végétal.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Compositions", desc: "Bouquets frais de saison, fleurs séchées et couronnes pour embellir votre intérieur.", icon: Flower },
                    { title: "Événements", desc: "Mariages, anniversaires, deuil. Nous vous accompagnons dans tous les moments de vie.", icon: Gift },
                    { title: "Ateliers", desc: "Apprenez l'art floral autour d'un thé. Cours collectifs tous les samedis matin.", icon: Coffee }
                ].map((s, i) => (
                    <div key={i} className="commerce-card group">
                        <div className="w-14 h-14 mx-auto bg-[#fffaf5] rounded-full flex items-center justify-center text-[#c27a63] mb-4 group-hover:scale-110 transition-transform border border-[#e8dccb]">
                            <s.icon className="w-7 h-7" />
                        </div>
                        <h3 className="commerce-serif text-xl font-bold mb-3 text-[#5c4d41]">{s.title}</h3>
                        <p className="text-[#4a4a4a] text-sm leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Galerie / Ambiance */}
      <section id="galerie" className="py-20 bg-[#fffaf5]">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="commerce-heading text-3xl mb-2 text-[#5c4d41]">L'Ambiance de la Boutique</h2>
                    <p className="text-[#4a4a4a]">Un cabinet de curiosités végétales à découvrir.</p>
                </div>
                <a href="#contact" className="text-[#c27a63] font-bold border-b border-[#c27a63] hover:text-[#a86550] transition-colors">
                    Voir sur Instagram
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
                <div className="commerce-gallery-img col-span-2 row-span-2 h-full">
                    <img src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Boutique" />
                </div>
                <div className="commerce-gallery-img h-full">
                    <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fleurs" />
                </div>
                <div className="commerce-gallery-img h-full">
                    <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop" className="w-full h-full object-cover" alt="Déco" />
                </div>
                <div className="commerce-gallery-img col-span-2 h-full">
                     <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Atelier" />
                </div>
            </div>
         </div>
      </section>

      {/* À Propos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
                <img 
                    src="https://images.unsplash.com/photo-1596436974751-698a96ec572c?q=80&w=1887&auto=format&fit=crop" 
                    alt="Artisan Fleuriste" 
                    className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
                />
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="commerce-heading text-3xl mb-6 text-[#5c4d41]">Passion & Nature</h2>
                <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                    Je suis Marie, artisan fleuriste passionnée par la nature sauvage. 
                    J'ai ouvert l'Atelier Botanique pour partager mon amour des fleurs de saison et de la décoration authentique.
                </p>
                <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                    Ici, pas de catalogue standardisé. Chaque bouquet est une création unique, composée au gré des arrivages de mes producteurs locaux préférés.
                </p>
                <div className="flex items-center gap-2 text-[#c27a63] font-bold">
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Fait main avec amour</span>
                </div>
            </div>
        </div>
      </section>

      {/* Contact & Infos */}
      <section id="contact" className="py-20 bg-[#fffaf5] border-t border-[#e6e1db]">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Infos Pratiques */}
                <div>
                    <h2 className="commerce-heading text-3xl mb-8 text-[#5c4d41]">Nous rendre visite</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div className="commerce-info-box">
                            <MapPin className="w-6 h-6 text-[#c27a63] mb-4" />
                            <h4 className="font-bold text-[#5c4d41] mb-2">Adresse</h4>
                            <p className="text-sm text-[#4a4a4a]">14 Place des Arts<br/>69002 Lyon</p>
                        </div>
                        <div className="commerce-info-box">
                            <Clock className="w-6 h-6 text-[#c27a63] mb-4" />
                            <h4 className="font-bold text-[#5c4d41] mb-2">Horaires</h4>
                            <p className="text-sm text-[#4a4a4a]">Mardi - Samedi<br/>10h00 - 19h30</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <a href="tel:0412345678" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#e6e1db] hover:border-[#c27a63] transition-colors">
                            <Phone className="w-5 h-5 text-[#c27a63]" />
                            <span className="font-bold text-[#5c4d41]">04 12 34 56 78</span>
                        </a>
                        <a href="mailto:bonjour@atelier.com" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#e6e1db] hover:border-[#c27a63] transition-colors">
                            <Mail className="w-5 h-5 text-[#c27a63]" />
                            <span className="font-bold text-[#5c4d41]">bonjour@atelier.com</span>
                        </a>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e6e1db]">
                    <h3 className="commerce-heading text-2xl mb-6 text-[#5c4d41]">Envoyer un message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nom" className="commerce-input" />
                            <input type="text" placeholder="Prénom" className="commerce-input" />
                        </div>
                        <input type="email" placeholder="Email" className="commerce-input" />
                        <textarea rows={4} placeholder="Votre message..." className="commerce-input resize-none"></textarea>
                        <button type="button" className="commerce-btn commerce-btn-primary w-full">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5c4d41] text-[#e8dccb] py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <Flower className="w-5 h-5" />
                <span className="commerce-serif font-bold text-lg">L'Atelier Botanique</span>
            </div>
            
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>

            <div className="text-xs opacity-60">
                © {new Date().getFullYear()} Tous droits réservés.
            </div>
        </div>
      </footer>
    </div>
  );
};
