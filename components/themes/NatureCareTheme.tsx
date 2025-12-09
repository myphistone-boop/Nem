import React from 'react';
import { X, ArrowRight, Leaf, Sun, Heart, Star, MapPin, Mail, Phone } from 'lucide-react';
import './nature-care-theme.css';

export const NatureCareTheme: React.FC = () => {
  return (
    <div className="care-theme min-h-screen relative overflow-x-hidden">
      {/* Texture grain subtile sur tout le site */}
      <div className="care-grain"></div>

      {/* Navbar Minimaliste Transparente */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-[#4d7c0f]" />
            <span className="care-heading text-xl font-bold tracking-tight">Sagesse & Nature</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534e]">
            <a href="#accueil" className="hover:text-[#14532d] transition-colors">Accueil</a>
            <a href="#apropos" className="hover:text-[#14532d] transition-colors">À propos</a>
            <a href="#methodes" className="hover:text-[#14532d] transition-colors">Méthodes</a>
            <a href="#temoignages" className="hover:text-[#14532d] transition-colors">Témoignages</a>
          </div>

          <div className="flex items-center gap-4">
             <a href="#contact" className="hidden md:block px-6 py-2.5 bg-[#14532d] text-white rounded-full text-sm font-medium hover:bg-[#4d7c0f] transition-colors shadow-sm">
                Prendre RDV
             </a>
             <a href="/" className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors" title="Quitter la démo">
                <X className="w-5 h-5" />
             </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
            {/* Image de fond douce (Plante/Lumière) */}
            <img 
                src="https://images.unsplash.com/photo-1616401776146-236cee1ddae3?q=80&w=2128&auto=format&fit=crop" 
                alt="Feuilles vertes et lumière douce" 
                className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay dégradé blanc pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fafaf9] via-[#fafaf9]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2">
            <div className="max-w-xl care-fade-in">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f0fdf4] border border-[#dcfce7] text-[#15803d] text-xs font-semibold tracking-wider uppercase mb-6">
                    Thérapies Holistiques
                </span>
                <h1 className="care-heading text-5xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 text-[#1c1917]">
                    Retrouvez votre <br/>
                    <span className="text-[#4d7c0f] italic">équilibre intérieur.</span>
                </h1>
                <p className="text-lg md:text-xl text-[#57534e] mb-10 leading-relaxed font-light">
                    Un accompagnement bienveillant pour reconnecter votre corps et votre esprit. Libérez vos tensions et avancez avec sérénité.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="care-btn text-center shadow-lg shadow-[#14532d]/10">
                        Commencer votre chemin
                    </a>
                    <a href="#apropos" className="care-btn-outline text-center">
                        Découvrir mon approche
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Présentation (À propos) */}
      <section id="apropos" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1 care-fade-in care-delay-1">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-200 relative z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop" 
                            alt="Portrait thérapeute souriante" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative square */}
                    <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#d4a373]/30 rounded-[2rem] -z-0"></div>
                </div>

                <div className="order-1 lg:order-2 care-fade-in">
                    <h2 className="care-heading text-4xl mb-6">Bonjour, je suis Camille.</h2>
                    <h3 className="text-[#4d7c0f] font-medium text-lg mb-6">Naturopathe & Sophrologue certifiée</h3>
                    
                    <div className="space-y-6 text-[#57534e] leading-relaxed">
                        <p>
                            Depuis plus de 10 ans, j'accompagne les personnes qui se sentent submergées par le stress, la fatigue ou les émotions. Mon approche n'est pas de "traiter" un symptôme, mais d'écouter la personne dans sa globalité.
                        </p>
                        <p>
                            Je crois profondément que la nature nous offre toutes les clés pour guérir. En combinant des techniques de respiration, une alimentation saine et une écoute active, nous créons ensemble un espace de sécurité pour votre transformation.
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-stone-100 flex gap-12">
                        <div>
                            <span className="block text-3xl font-serif text-[#14532d] font-bold">10+</span>
                            <span className="text-sm text-[#78716c]">Années d'expérience</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-serif text-[#14532d] font-bold">500+</span>
                            <span className="text-sm text-[#78716c]">Patients accompagnés</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Méthodes */}
      <section id="methodes" className="py-24 bg-[#f0fdf4]">
         <div className="container mx-auto px-6 text-center max-w-3xl mb-16 care-fade-in">
            <h2 className="care-heading text-4xl mb-4">Mes approches</h2>
            <p className="text-[#57534e]">
                Chaque séance est unique et adaptée à vos besoins du moment. J'utilise une synergie de méthodes douces.
            </p>
         </div>

         <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="care-card p-8 text-center care-fade-in care-delay-1">
                <div className="w-16 h-16 mx-auto bg-[#dcfce7] rounded-full flex items-center justify-center text-[#15803d] mb-6">
                    <Leaf className="w-8 h-8" />
                </div>
                <h3 className="care-heading text-xl font-bold mb-3">Naturopathie</h3>
                <p className="text-sm text-[#57534e] leading-relaxed">
                    Rééquilibrage alimentaire, phytothérapie et hygiène de vie pour retrouver votre vitalité naturelle.
                </p>
            </div>

            <div className="care-card p-8 text-center care-fade-in care-delay-2">
                <div className="w-16 h-16 mx-auto bg-[#ffedd5] rounded-full flex items-center justify-center text-[#c2410c] mb-6">
                    <Sun className="w-8 h-8" />
                </div>
                <h3 className="care-heading text-xl font-bold mb-3">Sophrologie</h3>
                <p className="text-sm text-[#57534e] leading-relaxed">
                    Techniques de respiration et visualisations positives pour gérer le stress et les émotions.
                </p>
            </div>

            <div className="care-card p-8 text-center care-fade-in care-delay-3">
                <div className="w-16 h-16 mx-auto bg-[#fae8ff] rounded-full flex items-center justify-center text-[#a21caf] mb-6">
                    <Heart className="w-8 h-8" />
                </div>
                <h3 className="care-heading text-xl font-bold mb-3">Écoute Active</h3>
                <p className="text-sm text-[#57534e] leading-relaxed">
                    Un temps de parole libre et sans jugement pour déposer vos charges mentales en toute sécurité.
                </p>
            </div>
         </div>
      </section>

      {/* Témoignages (Design Soft) */}
      <section id="temoignages" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="care-heading text-4xl text-center mb-16">Paroles de patients</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { txt: "Une écoute d'une rare qualité. Je suis sortie de la séance avec une légèreté que je n'avais pas ressentie depuis des années.", author: "Sarah L." },
                    { txt: "Camille a su trouver les mots justes. Ses conseils en naturopathie ont transformé mon quotidien sans contrainte.", author: "Marc D." },
                    { txt: "Un havre de paix. Le cabinet est apaisant et l'approche est très professionnelle tout en étant chaleureuse.", author: "Elodie P." }
                ].map((t, i) => (
                    <div key={i} className="bg-[#fafaf9] p-8 rounded-2xl relative">
                        <div className="flex text-[#d4a373] mb-4">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-[#57534e] italic mb-6">"{t.txt}"</p>
                        <p className="font-bold text-[#1c1917] font-serif text-sm">— {t.author}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Tarifs (Simple & Clean) */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200">
         <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="care-heading text-4xl mb-12">Séances & Tarifs</h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
                    <h3 className="font-bold text-lg mb-2 text-[#1c1917]">Première Consultation</h3>
                    <p className="text-sm text-[#78716c] mb-6">Bilan complet (1h30)</p>
                    <div className="text-4xl font-serif text-[#14532d] mb-6">80€</div>
                    <ul className="text-sm text-[#57534e] space-y-3 mb-8 w-full text-left pl-4">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Anamnèse complète</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Bilan de vitalité</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Programme d'hygiène vitale personnalisé</li>
                    </ul>
                    <a href="#contact" className="care-btn w-full">Réserver</a>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#d4a373]"></div>
                    <h3 className="font-bold text-lg mb-2 text-[#1c1917]">Consultation de Suivi</h3>
                    <p className="text-sm text-[#78716c] mb-6">Accompagnement (45 min)</p>
                    <div className="text-4xl font-serif text-[#14532d] mb-6">60€</div>
                    <ul className="text-sm text-[#57534e] space-y-3 mb-8 w-full text-left pl-4">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Point sur les évolutions</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Ajustement du programme</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#4d7c0f]"></div>Exercices de relaxation</li>
                    </ul>
                    <a href="#contact" className="care-btn-outline w-full hover:bg-[#14532d] hover:text-white hover:border-[#14532d]">Réserver</a>
                </div>
            </div>
         </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="bg-[#f0fdf4] rounded-[3rem] p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center shadow-inner">
                <div>
                    <h2 className="care-heading text-4xl mb-6">Prendre soin de vous commence ici.</h2>
                    <p className="text-[#57534e] mb-8">
                        Vous avez une question ou souhaitez prendre rendez-vous ? 
                        Remplissez le formulaire ci-contre, je vous réponds sous 24h avec douceur.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#14532d] shadow-sm">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-[#57534e]">12 Rue de la Paix, 75002 Paris</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#14532d] shadow-sm">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-[#57534e]">contact@camille-therapie.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#14532d] shadow-sm">
                                <Phone className="w-5 h-5" />
                            </div>
                            <span className="text-[#57534e]">06 12 34 56 78</span>
                        </div>
                    </div>
                </div>

                <form className="bg-white p-8 rounded-3xl shadow-lg shadow-[#14532d]/5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Votre Prénom" className="care-input" />
                        <input type="text" placeholder="Votre Nom" className="care-input" />
                    </div>
                    <input type="email" placeholder="Votre Email" className="care-input" />
                    <select className="care-input text-[#57534e]">
                        <option>Je souhaite prendre RDV</option>
                        <option>J'ai une question</option>
                        <option>Autre demande</option>
                    </select>
                    <textarea rows={4} placeholder="Comment puis-je vous aider ?" className="care-input resize-none"></textarea>
                    <button type="button" className="care-btn w-full text-lg">Envoyer mon message</button>
                </form>
            </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-12 bg-[#1c1917] text-[#a8a29e]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#d4a373]" />
                <span className="text-white font-serif font-bold tracking-wide">Sagesse & Nature</span>
            </div>
            <div className="flex gap-8 text-sm">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">CGV</a>
            </div>
            <div className="text-xs">
                © 2024 Design par Nemphisia
            </div>
        </div>
      </footer>
    </div>
  );
};