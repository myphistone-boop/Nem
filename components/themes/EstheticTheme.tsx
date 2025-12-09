import React from 'react';
import { X, Sparkles, Star, Calendar, Clock, MapPin, Instagram, Facebook, Flower2, Scissors, Eye, Heart } from 'lucide-react';
import './esthetic-theme.css';

export const EstheticTheme: React.FC = () => {
  return (
    <div className="esthetic-theme min-h-screen flex flex-col esthetic-texture">
      
      {/* Navbar Premium */}
      <nav className="fixed top-0 w-full z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-[#f3e8e8] py-4 transition-all">
        <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Flower2 className="w-6 h-6 text-[#be185d]" />
                <span className="esthetic-serif text-2xl font-medium tracking-tight text-[#1c1917]">L'Éclat<span className="text-[#be185d]">.</span></span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-[#78716c]">
                <a href="#home" className="hover:text-[#be185d] transition-colors uppercase tracking-widest text-xs">Accueil</a>
                <a href="#prestations" className="hover:text-[#be185d] transition-colors uppercase tracking-widest text-xs">Soins</a>
                <a href="#galerie" className="hover:text-[#be185d] transition-colors uppercase tracking-widest text-xs">Le Salon</a>
                <a href="#avis" className="hover:text-[#be185d] transition-colors uppercase tracking-widest text-xs">Avis</a>
            </div>

            {/* Action */}
            <div className="flex items-center gap-4">
                 <a href="#contact" className="hidden md:flex items-center gap-2 px-6 py-2 bg-[#1c1917] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#44403c] transition-colors">
                    <span>Réserver</span>
                 </a>
                 <a href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-[#d6d3d1] text-[#78716c] hover:bg-white hover:border-[#be185d] hover:text-[#be185d] transition-colors">
                    <X className="w-4 h-4" />
                 </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-32 pb-20 lg:min-h-screen flex items-center">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50%] h-[80%] bg-gradient-to-b from-[#fce7f3] to-transparent opacity-40 blur-[100px] pointer-events-none rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-t from-[#fef3c7] to-transparent opacity-30 blur-[100px] pointer-events-none rounded-tr-full"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 esthetic-fade-up">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#fce7f3] text-[#be185d] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                    Institut de beauté & Bien-être
                </span>
                <h1 className="esthetic-heading text-5xl lg:text-7xl leading-[1.1] mb-8">
                    Révélez votre <br/>
                    <span className="text-[#be185d] italic">lumière naturelle.</span>
                </h1>
                <p className="text-lg text-[#78716c] mb-10 leading-relaxed font-light max-w-md mx-auto lg:mx-0">
                    Un sanctuaire dédié à la beauté intemporelle. Soins du visage, manucure d'exception et rituels relaxants dans un cadre poudré et apaisant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#contact" className="esthetic-btn esthetic-btn-gold shadow-lg shadow-[#d4af37]/20">
                        Prendre rendez-vous
                    </a>
                    <a href="#prestations" className="esthetic-btn esthetic-btn-outline">
                        Découvrir la carte
                    </a>
                </div>
            </div>

            {/* Visual */}
            <div className="order-1 lg:order-2 relative esthetic-fade-up esthetic-delay-2">
                 <div className="relative z-10 esthetic-image-glow aspect-[4/5] max-w-md mx-auto">
                    <img 
                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" 
                        alt="Soins Visage Femme" 
                        className="w-full h-full object-cover"
                    />
                 </div>
                 {/* Decorative Circle Behind */}
                 <div className="absolute top-10 -right-10 w-full h-full border border-[#d4af37]/20 rounded-[40px] z-0 hidden lg:block"></div>
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="bg-[#fdf2f8] p-2 rounded-full text-[#be185d]">
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#78716c]">Satisfaction</p>
                        <p className="text-sm font-bold text-[#1c1917]">4.9/5 (120+ avis)</p>
                    </div>
                 </div>
            </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="prestations" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="esthetic-heading text-4xl mb-4">Nos Rituels Beauté</h2>
                <p className="text-[#78716c] font-light">
                    Chaque soin est une invitation au lâcher-prise. Nous utilisons exclusivement des produits naturels et respectueux de votre peau.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="esthetic-card group cursor-pointer">
                    <div className="w-14 h-14 bg-[#fdf2f8] rounded-full flex items-center justify-center text-[#be185d] mb-6 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="esthetic-serif text-2xl font-bold mb-3 text-[#1c1917]">Soins Visage</h3>
                    <p className="text-sm text-[#78716c] mb-6 leading-relaxed">
                        Hydrafacial, peeling doux et massages liftants Kobido pour un teint éclatant et repulpé.
                    </p>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#be185d] border-b border-[#be185d] pb-1">Voir les tarifs</span>
                </div>

                {/* Service 2 */}
                <div className="esthetic-card group cursor-pointer">
                    <div className="w-14 h-14 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706] mb-6 group-hover:scale-110 transition-transform">
                        <Flower2 className="w-6 h-6" />
                    </div>
                    <h3 className="esthetic-serif text-2xl font-bold mb-3 text-[#1c1917]">Onglerie</h3>
                    <p className="text-sm text-[#78716c] mb-6 leading-relaxed">
                        Manucure russe, vernis semi-permanent et soins des mains. L'élégance jusqu'au bout des ongles.
                    </p>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#d97706] border-b border-[#d97706] pb-1">Voir les tarifs</span>
                </div>

                {/* Service 3 */}
                <div className="esthetic-card group cursor-pointer">
                    <div className="w-14 h-14 bg-[#f3e8ff] rounded-full flex items-center justify-center text-[#9333ea] mb-6 group-hover:scale-110 transition-transform">
                        <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="esthetic-serif text-2xl font-bold mb-3 text-[#1c1917]">Regard</h3>
                    <p className="text-sm text-[#78716c] mb-6 leading-relaxed">
                        Extensions de cils, rehaussement et restructuration des sourcils pour intensifier votre regard.
                    </p>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9333ea] border-b border-[#9333ea] pb-1">Voir les tarifs</span>
                </div>
            </div>
        </div>
      </section>

      {/* Why Choose Us / Aesthetics */}
      <section id="galerie" className="py-24 bg-[#fdfbf7]">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                    <img src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-[1.02] transition-transform duration-500" alt="Spa Detail" />
                    <img src="https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-md hover:scale-[1.02] transition-transform duration-500" alt="Produits" />
                </div>
                <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-md hover:scale-[1.02] transition-transform duration-500" alt="Interior" />
                    <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-[1.02] transition-transform duration-500" alt="Nails" />
                </div>
            </div>

            {/* Content */}
            <div>
                <h2 className="esthetic-heading text-4xl mb-6">Un cocon de douceur</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#d4af37] shadow-sm shrink-0">
                            <Star className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1c1917] mb-1">Expertise Reconnue</h4>
                            <p className="text-sm text-[#78716c]">Nos esthéticiennes sont formées aux dernières techniques et utilisent des produits de haute qualité.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#d4af37] shadow-sm shrink-0">
                            <Heart className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1c1917] mb-1">Approche Personnalisée</h4>
                            <p className="text-sm text-[#78716c]">Chaque femme est unique. Nous prenons le temps d'analyser vos besoins pour un résultat sur-mesure.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#d4af37] shadow-sm shrink-0">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1c1917] mb-1">Hygiène Irréprochable</h4>
                            <p className="text-sm text-[#78716c]">Stérilisation stricte des outils et environnement sain pour votre sécurité et votre confort.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                     <p className="text-sm font-medium text-[#1c1917] italic">"La beauté commence au moment où vous décidez d'être vous-même." — Coco Chanel</p>
                </div>
            </div>
         </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-white border-t border-[#f3e8e8]">
        <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="esthetic-heading text-4xl text-center mb-12">Nos Forfaits Signature</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Basic */}
                <div className="border border-[#f3e8e8] rounded-3xl p-8 text-center hover:border-[#be185d]/30 transition-colors">
                    <h3 className="esthetic-serif text-xl font-bold mb-2">L'Essentiel</h3>
                    <p className="text-xs text-[#78716c] uppercase tracking-wide mb-6">Manucure Express</p>
                    <div className="text-4xl font-light text-[#1c1917] mb-6">35€</div>
                    <ul className="text-sm text-[#78716c] space-y-3 mb-8">
                        <li>Limage des ongles</li>
                        <li>Repousse des cuticules</li>
                        <li>Pose de vernis classique</li>
                        <li>Hydratation</li>
                    </ul>
                    <a href="#contact" className="block w-full py-3 rounded-full border border-[#d6d3d1] text-xs font-bold uppercase tracking-widest hover:bg-[#1c1917] hover:text-white transition-colors">Choisir</a>
                </div>

                {/* Popular */}
                <div className="bg-[#fdf2f8] rounded-3xl p-8 text-center relative transform md:-translate-y-4 shadow-xl shadow-pink-100">
                    <div className="absolute top-4 right-4 text-[#be185d]">
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <h3 className="esthetic-serif text-xl font-bold mb-2 text-[#be185d]">L'Éclat</h3>
                    <p className="text-xs text-[#be185d]/80 uppercase tracking-wide mb-6">Soin Visage + Cils</p>
                    <div className="text-4xl font-light text-[#be185d] mb-6">85€</div>
                    <ul className="text-sm text-[#1c1917] space-y-3 mb-8">
                        <li>Soin visage Hydratant (45min)</li>
                        <li>Rehaussement de cils</li>
                        <li>Teinture des cils offerte</li>
                        <li>Massage crânien</li>
                    </ul>
                    <a href="#contact" className="block w-full py-3 rounded-full bg-[#be185d] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#9d174d] transition-colors shadow-lg shadow-[#be185d]/20">Choisir</a>
                </div>

                {/* Premium */}
                <div className="border border-[#f3e8e8] rounded-3xl p-8 text-center hover:border-[#be185d]/30 transition-colors">
                    <h3 className="esthetic-serif text-xl font-bold mb-2">Le Rituel</h3>
                    <p className="text-xs text-[#78716c] uppercase tracking-wide mb-6">Détente Absolue</p>
                    <div className="text-4xl font-light text-[#1c1917] mb-6">120€</div>
                    <ul className="text-sm text-[#78716c] space-y-3 mb-8">
                        <li>Massage Corps (1h)</li>
                        <li>Soin Visage Coup d'Éclat</li>
                        <li>Manucure Spa</li>
                        <li>Thé gourmand offert</li>
                    </ul>
                    <a href="#contact" className="block w-full py-3 rounded-full border border-[#d6d3d1] text-xs font-bold uppercase tracking-widest hover:bg-[#1c1917] hover:text-white transition-colors">Choisir</a>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="avis" className="py-24 bg-[#fdfbf7]">
        <div className="container mx-auto px-6">
            <h2 className="esthetic-heading text-4xl text-center mb-16">Elles nous font confiance</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Chloé M.", txt: "Mon rendez-vous mensuel incontournable. L'équipe est adorable et le résultat toujours parfait. Mention spéciale pour le soin visage !", rating: 5 },
                    { name: "Julie P.", txt: "J'ai testé le rehaussement de cils pour la première fois et je suis bluffée. Un regard de biche naturel, j'adore.", rating: 5 },
                    { name: "Sophie D.", txt: "Le salon est magnifique, on s'y sent tout de suite apaisée. Une parenthèse de bonheur dans ma semaine chargée.", rating: 5 },
                ].map((avis, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#f3e8e8]">
                        <div className="flex text-[#d4af37] mb-4 gap-1">
                            {[...Array(avis.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-[#78716c] italic mb-6 text-sm leading-relaxed">"{avis.txt}"</p>
                        <p className="font-bold text-[#1c1917] text-sm font-serif">— {avis.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="bg-[#1c1917] text-[#e7e5e4] pt-24 pb-12">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
                {/* Contact Info */}
                <div>
                    <h2 className="esthetic-serif text-4xl text-white mb-6">Prendre rendez-vous</h2>
                    <p className="text-[#a8a29e] mb-10 font-light">
                        Pour toute question ou demande spécifique, n'hésitez pas à nous contacter. Nous avons hâte de vous accueillir.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-[#d4af37] mt-1" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Adresse</h4>
                                <p className="text-[#a8a29e]">24 Rue de la Beauté<br/>75001 Paris</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-[#d4af37] mt-1" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Horaires</h4>
                                <p className="text-[#a8a29e]">Mardi - Samedi : 10h - 19h<br/>Jeudi nocturne jusqu'à 21h</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Calendar className="w-6 h-6 text-[#d4af37] mt-1" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Réservation</h4>
                                <p className="text-[#a8a29e]">01 23 45 67 89<br/>contact@leclat-institut.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-10">
                        <a href="#" className="w-10 h-10 rounded-full border border-[#44403c] flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[#44403c] flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Simple Form */}
                <form className="bg-white rounded-3xl p-8 text-[#1c1917]">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-[#78716c] mb-2">Prénom</label>
                            <input type="text" className="w-full bg-[#f5f5f4] border-0 rounded-lg p-3 focus:ring-2 focus:ring-[#be185d] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-[#78716c] mb-2">Nom</label>
                            <input type="text" className="w-full bg-[#f5f5f4] border-0 rounded-lg p-3 focus:ring-2 focus:ring-[#be185d] outline-none" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-[#78716c] mb-2">Email</label>
                        <input type="email" className="w-full bg-[#f5f5f4] border-0 rounded-lg p-3 focus:ring-2 focus:ring-[#be185d] outline-none" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-[#78716c] mb-2">Prestation souhaitée</label>
                        <select className="w-full bg-[#f5f5f4] border-0 rounded-lg p-3 focus:ring-2 focus:ring-[#be185d] outline-none text-[#44403c]">
                            <option>Soin Visage</option>
                            <option>Manucure / Onglerie</option>
                            <option>Extensions de Cils</option>
                            <option>Massage</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase text-[#78716c] mb-2">Message (Optionnel)</label>
                        <textarea rows={3} className="w-full bg-[#f5f5f4] border-0 rounded-lg p-3 focus:ring-2 focus:ring-[#be185d] outline-none resize-none"></textarea>
                    </div>
                    <button type="button" className="w-full py-4 rounded-full bg-[#1c1917] text-white font-bold uppercase tracking-widest hover:bg-[#be185d] transition-colors shadow-lg">
                        Envoyer ma demande
                    </button>
                </form>
            </div>

            <div className="border-t border-[#44403c] pt-8 text-center text-xs text-[#78716c] uppercase tracking-widest">
                © {new Date().getFullYear()} L'Éclat Institut. Design par Nemphisia.
            </div>
        </div>
      </section>
    </div>
  );
};