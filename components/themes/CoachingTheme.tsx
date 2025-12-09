import React from 'react';
import { X, Check, ArrowRight, Star, Target, Zap, Users, ShieldCheck, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import './coaching-theme.css';

export const CoachingTheme: React.FC = () => {
  return (
    <div className="coaching-theme min-h-screen text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-violet-600 flex items-center justify-center font-bold text-xl rounded-lg shadow-lg shadow-violet-500/20">
                    M
                </div>
                <span className="font-bold text-xl tracking-tight">MARC <span className="text-violet-400">V.</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <a href="#home" className="hover:text-white transition-colors">Accueil</a>
                <a href="#programmes" className="hover:text-white transition-colors">Programmes</a>
                <a href="#results" className="hover:text-white transition-colors">Résultats</a>
                <a href="#about" className="hover:text-white transition-colors">À Propos</a>
            </div>

            <div className="flex items-center gap-4">
                <a href="#contact" className="hidden md:block px-5 py-2 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded hover:bg-slate-200 transition-colors">
                    Me contacter
                </a>
                <a href="/" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 coaching-hero-bg overflow-hidden">
        {/* Glow effect behind coach */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Target className="w-4 h-4" />
                    Business & Life Coaching
                </div>
                <h1 className="text-5xl lg:text-7xl coaching-title mb-6">
                    Ne rêvez plus votre vie.<br/>
                    <span className="coaching-gradient-text">Dirigez-la.</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed border-l-4 border-violet-600 pl-6">
                    J'accompagne les entrepreneurs et les leaders ambitieux à briser leurs plafonds de verre et à atteindre une performance durable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="coaching-btn text-center">
                        Réserver ma séance stratégique
                    </a>
                    <a href="#programmes" className="coaching-btn-secondary text-center">
                        Découvrir les programmes
                    </a>
                </div>
            </div>

            <div className="relative lg:h-[600px] flex items-end justify-center lg:justify-end">
                {/* Image Placeholder */}
                <div className="relative w-full max-w-md aspect-[3/4] coaching-portrait-frame">
                     <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                        alt="Marc V. Coach" 
                        className="w-full h-full object-cover rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                     />
                     
                     {/* Floating Badge */}
                     <div className="absolute bottom-8 -left-8 bg-slate-800 p-4 rounded border border-white/10 shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-1000">
                        <div className="bg-green-500/20 p-2 rounded text-green-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Clients accompagnés</p>
                            <p className="text-xl font-bold text-white">500+</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">À qui s'adresse ce coaching ?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Ma méthode n'est pas pour tout le monde. Elle est pour ceux qui sont prêts à passer à l'action.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "L'Entrepreneur Débordé", desc: "Vous avez du succès, mais vous êtes esclave de votre entreprise. Retrouvez du temps et de la clarté.", icon: Zap },
                    { title: "Le Leader en Transition", desc: "Vous prenez de nouvelles responsabilités et devez affirmer votre leadership et votre vision.", icon: Target },
                    { title: "Le Visionnaire Bloqué", desc: "Vous avez de grandes idées mais vous procrastinez sur l'exécution. Passez de la pensée à l'action.", icon: ShieldCheck }
                ].map((item, i) => (
                    <div key={i} className="coaching-card p-8 rounded-lg group">
                        <div className="coaching-icon-box group-hover:bg-violet-600 group-hover:text-white transition-colors">
                            <item.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-20 bg-[#1e293b]">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <span className="text-violet-400 font-bold uppercase tracking-widest text-sm mb-2 block">Mes Offres</span>
                    <h2 className="text-4xl font-bold">Choisissez votre trajectoire</h2>
                </div>
                <div className="text-slate-400 max-w-md text-right lg:text-left">
                    Des accompagnements sur mesure pour répondre à vos enjeux actuels, que ce soit pour une problématique précise ou une transformation globale.
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Programme 1 */}
                <div className="bg-[#0f172a] p-10 rounded-lg border border-white/5 hover:border-violet-500/50 transition-colors flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2">Coaching Performance</h3>
                        <p className="text-slate-400 text-sm mb-6">Accompagnement individuel 3 mois</p>
                        <div className="text-4xl font-bold text-white mb-2">1 990 €</div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Paiement en 3x disponible</p>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                        {['12 Séances de coaching (1h)', 'Audit complet de votre situation', 'Support WhatsApp illimité 5j/7', 'Plan d\'action personnalisé'].map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-violet-500 flex-shrink-0" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="coaching-btn text-center w-full block">Candidater</a>
                </div>

                {/* Programme 2 */}
                <div className="bg-gradient-to-br from-violet-900/20 to-slate-900 p-10 rounded-lg border border-violet-500/30 relative flex flex-col">
                    <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                        Best Seller
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2">Business Mastery</h3>
                        <p className="text-slate-400 text-sm mb-6">Accompagnement intensif 6 mois</p>
                        <div className="text-4xl font-bold text-white mb-2">4 500 €</div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Places limitées</p>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                        {['24 Séances stratégiques', 'Audit Business & Mindset', 'Accès à mon réseau privé', 'Journée VIP en présentiel', 'Suivi quotidien des KPIs'].map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-sky-400 flex-shrink-0" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="coaching-btn text-center w-full block bg-white text-slate-900 hover:bg-slate-200">Candidater</a>
                </div>
            </div>
        </div>
      </section>

      {/* Résultats (Text Only) */}
      <section id="results" className="py-20 bg-[#0f172a] border-y border-white/5">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-bold mb-8">Des résultats concrets,<br/> pas de la théorie.</h2>
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">Chiffre d'Affaires x2</h4>
                        <p className="text-slate-400">Pour Julien, consultant, en seulement 4 mois d'accompagnement sur son offre et son pricing.</p>
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">10h de travail en moins / semaine</h4>
                        <p className="text-slate-400">Pour Sarah, CEO, grâce à une restructuration complète de ses processus et de son équipe.</p>
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">Lancement réussi</h4>
                        <p className="text-slate-400">Pour Thomas, qui a enfin osé quitter son poste de cadre pour lancer sa startup.</p>
                    </div>
                </div>
            </div>
            
            {/* Testimonial Card */}
            <div className="bg-[#1e293b] p-8 md:p-12 rounded-lg relative">
                <div className="text-violet-500 mb-6">
                    <Star className="w-5 h-5 inline-block fill-current" />
                    <Star className="w-5 h-5 inline-block fill-current" />
                    <Star className="w-5 h-5 inline-block fill-current" />
                    <Star className="w-5 h-5 inline-block fill-current" />
                    <Star className="w-5 h-5 inline-block fill-current" />
                </div>
                <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                    "Marc a une capacité incroyable à voir ce que vous ne voyez pas. Il ne vous dit pas ce que vous voulez entendre, mais ce que vous avez besoin d'entendre pour avancer. C'est le meilleur investissement que j'ai fait pour mon business."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-white">David L.</div>
                        <div className="text-sm text-slate-500">CEO @ TechStart</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-violet-500 p-1">
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Marc" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Qui suis-je ?</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Ancien directeur commercial dans la Tech, j'ai vécu le burn-out, la perte de sens, puis la reconstruction. 
                Aujourd'hui coach certifié, je mets mon expérience du terrain et ma compréhension de la psychologie humaine au service de votre réussite.
                <br/><br/>
                Ma mission : vous donner les outils pour construire une vie et un business qui vous ressemblent, sans sacrifier votre santé ni vos valeurs.
            </p>
            <div className="flex justify-center gap-8">
                <div className="text-center">
                    <div className="text-3xl font-bold text-violet-400">10 ans</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">D'expérience Corporate</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-violet-400">Certifié</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">HEC Paris Coaching</div>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-[#1e293b] border-t border-white/5">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
            <div>
                <h2 className="text-4xl font-bold mb-6">Prêt à passer au niveau supérieur ?</h2>
                <p className="text-slate-400 mb-8 text-lg">
                    Remplissez ce formulaire pour postuler à un accompagnement. Je lis chaque message personnellement.
                </p>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-300">
                        <Mail className="w-6 h-6 text-violet-500" />
                        <span>marc.v@coaching-elite.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                        <MapPin className="w-6 h-6 text-violet-500" />
                        <span>Bordeaux & Visio</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300 pt-4">
                        <a href="#" className="p-2 bg-slate-800 rounded hover:bg-violet-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-slate-800 rounded hover:bg-violet-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <form className="bg-[#0f172a] p-8 rounded-lg border border-white/5 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Prénom</label>
                        <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-violet-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Nom</label>
                        <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-violet-500 focus:outline-none transition-colors" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                    <input type="email" className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-violet-500 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Votre objectif principal</label>
                    <select className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-violet-500 focus:outline-none transition-colors">
                        <option>Développer mon business</option>
                        <option>Gestion du stress / Équilibre</option>
                        <option>Leadership & Management</option>
                        <option>Transition de carrière</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Message</label>
                    <textarea rows={4} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-violet-500 focus:outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="button" className="coaching-btn w-full">Envoyer ma candidature</button>
            </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#020617] border-t border-white/5 text-center text-slate-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 Marc V. Coaching. Tous droits réservés.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            </div>
        </div>
      </footer>
    </div>
  );
};