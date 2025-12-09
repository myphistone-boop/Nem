import React from 'react';
import { Phone, MapPin, Clock, Hammer, Paintbrush, Wrench, ShieldCheck, CheckCircle2, Star, ChevronRight, X, Ruler } from 'lucide-react';
import './artisan-theme.css';

export const ArtisanTheme: React.FC = () => {
  return (
    <div className="artisan-theme min-h-screen flex flex-col">
      
      {/* Top Bar - Contact Rapide */}
      <div className="bg-[#0f172a] text-white py-2 px-6 text-sm hidden md:flex justify-between items-center">
        <div className="flex gap-6">
            <span className="flex items-center gap-2 text-slate-300"><MapPin className="w-4 h-4 text-[#ea580c]" /> Intervention sur Bordeaux & CUB</span>
            <span className="flex items-center gap-2 text-slate-300"><Clock className="w-4 h-4 text-[#ea580c]" /> Lun - Sam : 8h00 - 19h00</span>
        </div>
        <div className="font-bold text-[#ea580c]">Urgences 24/7</div>
      </div>

      {/* Navbar Simple & Robuste */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e40af] rounded flex items-center justify-center text-white">
                    <Hammer className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-[#0f172a] uppercase leading-none">Batir<span className="text-[#1e40af]">Pro</span></h1>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Rénovation & Dépannage</span>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
                <a href="#services" className="hover:text-[#1e40af] transition-colors">Nos Services</a>
                <a href="#realisations" className="hover:text-[#1e40af] transition-colors">Réalisations</a>
                <a href="#tarifs" className="hover:text-[#1e40af] transition-colors">Tarifs</a>
                <a href="#contact" className="hover:text-[#1e40af] transition-colors">Contact</a>
            </div>

            {/* Phone CTA */}
            <div className="flex items-center gap-4">
                 <a href="tel:0612345678" className="hidden md:flex flex-col items-end mr-4">
                    <span className="text-xs text-slate-500 font-medium">Une urgence ?</span>
                    <span className="text-xl font-black text-[#ea580c] leading-none">06 12 34 56 78</span>
                 </a>
                 <a href="/" className="flex items-center justify-center w-8 h-8 rounded border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                    <X className="w-5 h-5" />
                 </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-[#f8fafc] py-12 lg:py-24 border-b border-slate-200">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
                <div className="inline-block px-3 py-1 bg-blue-100 text-[#1e40af] font-bold text-xs uppercase tracking-wide mb-6 rounded">
                    Artisan Qualifié RGE
                </div>
                <h2 className="text-4xl lg:text-5xl lg:leading-tight font-black text-[#0f172a] mb-6">
                    Travaux de rénovation <br/> et dépannage rapide.
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg">
                    Plomberie, électricité, peinture et petits travaux. 
                    Un artisan de confiance pour tous vos besoins, avec des tarifs clairs et un travail soigné.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="artisan-btn artisan-btn-primary">
                        Demander un devis gratuit
                    </a>
                    <a href="tel:0612345678" className="artisan-btn artisan-btn-outline">
                        Appeler maintenant
                    </a>
                </div>

                <div className="mt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Devis sous 24h</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Assurance Décennale</div>
                </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img 
                    src="https://lh3.googleusercontent.com/d/1TkEPhEYKmWOKJVSdbDv7KxOiGV7tFpGS" 
                    alt="Artisan au travail" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <p className="font-bold text-lg">Plus de 15 ans d'expérience</p>
                    <p className="text-sm opacity-90">À votre service depuis 2008</p>
                </div>
            </div>
         </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Nos Domaines d'Intervention</h3>
                <p className="text-slate-600">Nous intervenons pour les particuliers et les professionnels. Pas de sous-traitance, un seul interlocuteur.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Plomberie & Sanitaire", desc: "Recherche de fuite, installation de chauffe-eau, rénovation de salle de bain.", icon: Wrench },
                    { title: "Peinture & Déco", desc: "Peinture murs et plafonds, pose de papier peint, enduits de lissage.", icon: Paintbrush },
                    { title: "Petits Travaux", desc: "Montage de meubles, pose d'étagères, changement de serrures.", icon: Hammer },
                    { title: "Revêtements de Sol", desc: "Pose de parquet flottant, lino, moquette et carrelage.", icon: Ruler },
                    { title: "Dépannage Urgent", desc: "Intervention rapide pour fuites d'eau ou coupures de courant.", icon: Phone, highlight: true },
                    { title: "Rénovation Complète", desc: "Coordination de travaux pour remettre à neuf votre appartement.", icon: ShieldCheck }
                ].map((s, i) => (
                    <div key={i} className={`artisan-card ${s.highlight ? 'border-[#ea580c] border-2 bg-orange-50' : ''}`}>
                        <div className={`w-12 h-12 rounded flex items-center justify-center mb-4 ${s.highlight ? 'bg-[#ea580c] text-white' : 'bg-slate-100 text-[#1e40af]'}`}>
                            <s.icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-[#0f172a] mb-2">{s.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#f1f5f9]">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1e40af] mx-auto mb-6 shadow-sm">
                        <Clock className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Ponctualité & Rapidité</h4>
                    <p className="text-slate-600 text-sm">Nous respectons les délais annoncés. En cas de retard imprévu, vous êtes prévenu immédiatement.</p>
                </div>
                <div className="p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1e40af] mx-auto mb-6 shadow-sm">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Travail Garanti</h4>
                    <p className="text-slate-600 text-sm">Tous nos travaux sont couverts par une assurance décennale et responsabilité civile professionnelle.</p>
                </div>
                <div className="p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1e40af] mx-auto mb-6 shadow-sm">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Devis Transparent</h4>
                    <p className="text-slate-600 text-sm">Pas de surprise sur la facture. Le devis est détaillé, gratuit et sans engagement de votre part.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Réalisations */}
      <section id="realisations" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-[#0f172a] mb-12 text-center">Nos Derniers Chantiers</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1974&auto=format&fit=crop"
                ].map((src, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded bg-slate-100 cursor-pointer">
                        <img src={src} alt="Chantier" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold border border-white px-4 py-2 rounded uppercase text-sm">Voir le projet</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-20 bg-[#f8fafc] border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-3xl font-bold text-[#0f172a] mb-12 text-center">Tarifs Clairs & Forfaits</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded border border-slate-200 shadow-sm">
                    <h4 className="text-xl font-bold text-[#1e40af] mb-4">Dépannage Simple</h4>
                    <p className="text-sm text-slate-500 mb-6">Intervention rapide pour petits problèmes (1h max).</p>
                    <div className="text-4xl font-black text-[#0f172a] mb-6">90€ <span className="text-sm font-normal text-slate-500">TTC</span></div>
                    <ul className="space-y-3 text-sm text-slate-600 mb-8">
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Déplacement inclus</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 1h de main d'œuvre</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Petites fournitures</li>
                    </ul>
                    <a href="#contact" className="block text-center py-3 border-2 border-[#1e40af] text-[#1e40af] font-bold rounded hover:bg-blue-50">Appeler</a>
                </div>

                <div className="bg-white p-8 rounded border-2 border-[#ea580c] shadow-lg relative transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 bg-[#ea580c] text-white text-xs font-bold px-3 py-1 uppercase rounded-bl">Populaire</div>
                    <h4 className="text-xl font-bold text-[#ea580c] mb-4">Journée Artisan</h4>
                    <p className="text-sm text-slate-500 mb-6">Idéal pour cumuler plusieurs petits travaux.</p>
                    <div className="text-4xl font-black text-[#0f172a] mb-6">450€ <span className="text-sm font-normal text-slate-500">TTC</span></div>
                    <ul className="space-y-3 text-sm text-slate-600 mb-8">
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 7 heures de travail</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Outillage professionnel</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Conseils personnalisés</li>
                    </ul>
                    <a href="#contact" className="block text-center py-3 bg-[#ea580c] text-white font-bold rounded hover:bg-[#c2410c]">Réserver</a>
                </div>

                <div className="bg-white p-8 rounded border border-slate-200 shadow-sm">
                    <h4 className="text-xl font-bold text-[#1e40af] mb-4">Projet Rénovation</h4>
                    <p className="text-sm text-slate-500 mb-6">Salle de bain, cuisine, peinture complète.</p>
                    <div className="text-4xl font-black text-[#0f172a] mb-6">Sur Devis</div>
                    <ul className="space-y-3 text-sm text-slate-600 mb-8">
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Visite technique gratuite</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Devis détaillé sous 24h</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Planning respecté</li>
                    </ul>
                    <a href="#contact" className="block text-center py-3 border-2 border-[#1e40af] text-[#1e40af] font-bold rounded hover:bg-blue-50">Demander un RDV</a>
                </div>
            </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-3xl font-bold text-[#0f172a] mb-12 text-center">Avis Clients</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#f8fafc] p-6 rounded border border-slate-100">
                    <div className="flex text-[#fbbf24] mb-3">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-slate-700 mb-4 italic">"Intervention rapide pour une fuite d'eau un dimanche. Très pro et tarif correct pour une urgence. Je recommande."</p>
                    <p className="font-bold text-sm text-[#0f172a]">- Michel D., Bordeaux</p>
                </div>
                <div className="bg-[#f8fafc] p-6 rounded border border-slate-100">
                    <div className="flex text-[#fbbf24] mb-3">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-slate-700 mb-4 italic">"Rénovation complète de ma salle de bain. Travail soigné, chantier laissé propre tous les soirs. Merci à l'équipe."</p>
                    <p className="font-bold text-sm text-[#0f172a]">- Sophie L., Mérignac</p>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#1e3a8a] text-white">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">Parlons de votre projet.</h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Vous avez besoin d'un conseil ou d'un devis ? Appelez-nous directement ou remplissez le formulaire. Réponse garantie dans la journée.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded hover:bg-white/20 transition-colors">
                            <Phone className="w-8 h-8 text-[#ea580c]" />
                            <div>
                                <p className="text-xs text-blue-200 uppercase font-bold">Appelez-nous</p>
                                <p className="text-2xl font-bold">06 12 34 56 78</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <MapPin className="w-6 h-6 text-[#ea580c]" />
                            <span className="text-lg">Intervention 30km autour de Bordeaux</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Clock className="w-6 h-6 text-[#ea580c]" />
                            <span className="text-lg">Du Lundi au Samedi : 8h - 19h</span>
                        </div>
                    </div>
                </div>

                <form className="bg-white p-8 rounded shadow-2xl text-slate-800">
                    <h3 className="text-2xl font-bold mb-6 text-[#0f172a]">Demande de devis</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nom</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-[#1e40af] outline-none" placeholder="Votre nom" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Téléphone</label>
                            <input type="tel" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-[#1e40af] outline-none" placeholder="06..." />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
                        <input type="email" className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-[#1e40af] outline-none" placeholder="votre@email.com" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description du besoin</label>
                        <textarea rows={4} className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-[#1e40af] outline-none resize-none" placeholder="Bonjour, je souhaiterais..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-4 rounded uppercase tracking-wide transition-colors">
                        Envoyer ma demande
                    </button>
                    <p className="text-xs text-slate-400 mt-4 text-center">Vos données ne seront jamais transmises à des tiers.</p>
                </form>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center md:text-left grid md:grid-cols-4 gap-8">
            <div>
                <h4 className="text-white font-bold text-lg mb-4 uppercase">BatirPro</h4>
                <p className="text-sm">Votre artisan de confiance pour tous vos travaux de rénovation et dépannage.</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-4 uppercase">Services</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Plomberie</a></li>
                    <li><a href="#" className="hover:text-white">Électricité</a></li>
                    <li><a href="#" className="hover:text-white">Peinture</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-4 uppercase">Légal</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Mentions Légales</a></li>
                    <li><a href="#" className="hover:text-white">CGV</a></li>
                    <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-4 uppercase">Contact</h4>
                <p className="text-sm mb-2">123 Avenue de la Rénovation<br/>33000 Bordeaux</p>
                <p className="text-sm text-[#ea580c] font-bold">06 12 34 56 78</p>
            </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © {new Date().getFullYear()} BatirPro. Site web réalisé par Nemphisia.
        </div>
      </footer>
    </div>
  );
};