import React from 'react';
import { X, ArrowRight, Check, Award, BarChart, Users, FileText, ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';
import './consultant-theme.css';

export const ConsultantTheme: React.FC = () => {
  return (
    <div className="consultant-theme min-h-screen flex flex-col">
      
      {/* Navbar Pro */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B1120] text-white py-5 border-b border-white/5">
        <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo Text Minimalist */}
            <div className="text-xl font-bold tracking-tight">
                THOMAS <span className="text-[#C5A47E]">DURAND</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-300">
                <a href="#home" className="hover:text-white transition-colors">Accueil</a>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
                <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
                <a href="#apropos" className="hover:text-white transition-colors">À Propos</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <a href="#contact" className="hidden md:block text-sm font-bold text-[#C5A47E] uppercase tracking-wider hover:text-white transition-colors">
                    Me contacter
                </a>
                <a href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-slate-400 hover:bg-white hover:text-[#0B1120] transition-colors">
                    <X className="w-4 h-4" />
                </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative bg-[#0B1120] pt-32 pb-24 lg:pt-48 lg:pb-32 text-white overflow-hidden">
        {/* Abstract Geometry Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0F1629] skew-x-12 origin-top-right z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
                <p className="text-[#C5A47E] font-medium tracking-wider uppercase text-sm mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-[#C5A47E]"></span>
                    Consultant en Stratégie Digitale
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                    Transformer votre vision en <span className="consultant-underline">résultats mesurables</span>.
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
                    J'accompagne les dirigeants et les organisations dans leur transformation numérique avec une approche pragmatique, structurée et orientée vers la performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="consultant-btn consultant-btn-primary">
                        Prendre contact
                    </a>
                    <a href="#" className="consultant-btn consultant-btn-outline">
                        Télécharger la brochure
                    </a>
                </div>
            </div>

            {/* Silhouette / Photo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                 <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-b from-[#1E293B] to-[#0B1120] border border-white/10 p-2">
                    <img 
                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop" 
                        alt="Consultant Portrait" 
                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl w-64">
                        <p className="text-[#0B1120] text-3xl font-bold font-serif mb-1">15+</p>
                        <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Années d'expérience internationale</p>
                    </div>
                 </div>
            </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
                <h2 className="text-3xl font-bold text-[#0B1120] mb-6">Domaines d'intervention</h2>
                <p className="text-slate-600">
                    Des solutions sur-mesure pour répondre aux défis complexes de votre entreprise. Mon expertise couvre trois axes stratégiques majeurs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Stratégie de Croissance", desc: "Audit de marché, positionnement concurrentiel et élaboration de business models innovants.", icon: BarChart },
                    { title: "Transformation Digitale", desc: "Digitalisation des processus, implémentation d'outils CRM/ERP et conduite du changement.", icon: Users },
                    { title: "Performance Opérationnelle", desc: "Optimisation des coûts, restructuration organisationnelle et amélioration de la productivité.", icon: Award }
                ].map((s, i) => (
                    <div key={i} className="consultant-card group">
                        <div className="w-12 h-12 bg-[#F1F5F9] flex items-center justify-center text-[#0B1120] mb-6 group-hover:bg-[#0B1120] group-hover:text-[#C5A47E] transition-colors">
                            <s.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0B1120] mb-4">{s.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                            {s.desc}
                        </p>
                        <a href="#contact" className="inline-flex items-center text-sm font-bold text-[#C5A47E] uppercase tracking-wider group-hover:text-[#0B1120] transition-colors">
                            En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Trust / Logos */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Ils me font confiance</p>
            <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-60 grayscale">
                {/* Fake Logos - Simple text for demo */}
                <span className="text-xl font-bold text-slate-800">NEXUS CORP</span>
                <span className="text-xl font-bold text-slate-800">ALTA FINANCE</span>
                <span className="text-xl font-bold text-slate-800">GLOBAL TECH</span>
                <span className="text-xl font-bold text-slate-800">STRATOS GROUP</span>
                <span className="text-xl font-bold text-slate-800">VELOCITY</span>
            </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="expertise" className="py-24 bg-[#0B1120] text-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-3xl font-bold mb-6">Une méthodologie éprouvée</h2>
                    <p className="text-slate-400 mb-8">
                        Pas de solutions toutes faites. J'applique une démarche rigoureuse en trois temps pour garantir l'atteinte de vos objectifs.
                    </p>
                    <a href="#contact" className="text-[#C5A47E] font-bold underline underline-offset-4 decoration-1">Discuter de votre projet</a>
                </div>

                <div className="lg:w-2/3 grid gap-8">
                    {[
                        { step: "01", title: "Diagnostic & Audit", desc: "Analyse approfondie de votre situation, de vos données et de vos processus internes." },
                        { step: "02", title: "Plan d'Action Stratégique", desc: "Co-construction d'une feuille de route détaillée avec jalons et KPIs précis." },
                        { step: "03", title: "Implémentation & Suivi", desc: "Accompagnement opérationnel jusqu'à l'obtention des résultats visés." }
                    ].map((m, i) => (
                        <div key={i} className="flex gap-6 items-start border-b border-white/10 pb-8 last:border-0">
                            <span className="text-3xl font-bold text-[#C5A47E] opacity-50 font-serif">{m.step}</span>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                                <p className="text-slate-400">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* About */}
      <section id="apropos" className="py-24 bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#C5A47E]"></div>
                <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop" 
                    alt="Working" 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 p-8" 
                />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#C5A47E]"></div>
            </div>
            
            <div>
                <h2 className="text-3xl font-bold text-[#0B1120] mb-6">À propos de Thomas Durand</h2>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p>
                        Diplômé d'HEC et fort de 15 années d'expérience au sein de cabinets internationaux, j'ai fondé mon activité de conseil avec une conviction : l'expertise doit être accessible et pragmatique.
                    </p>
                    <p>
                        Je ne suis pas un théoricien. J'ai occupé des postes de direction opérationnelle, ce qui me permet de comprendre intimement les défis auxquels vous faites face. Mon approche combine rigueur analytique et sensibilité humaine.
                    </p>
                    <p>
                        Mon engagement : vous apporter une clarté immédiate et des leviers d'action concrets pour pérenniser votre activité.
                    </p>
                </div>
                
                <div className="mt-8 flex gap-4">
                    <a href="#" className="p-3 border border-slate-200 hover:bg-[#0B1120] hover:text-white hover:border-[#0B1120] transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="p-3 border border-slate-200 hover:bg-[#0B1120] hover:text-white hover:border-[#0B1120] transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials (Simple Text) */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
            {[
                { txt: "L'intervention de Thomas a été décisive pour notre restructuration. Sa vision claire et son calme ont rassuré nos équipes.", author: "Jean-Philippe R., CEO" },
                { txt: "Un consultant qui comprend vraiment les enjeux terrain. Pas de jargon, que des résultats. Je recommande vivement.", author: "Marie L., DRH" }
            ].map((t, i) => (
                <div key={i} className="bg-white p-8 border-l-4 border-[#C5A47E] shadow-sm">
                    <p className="text-lg text-slate-700 italic mb-6">"{t.txt}"</p>
                    <p className="text-xs font-bold text-[#0B1120] uppercase tracking-wider">{t.author}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0B1120] text-white">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Discutons de vos enjeux</h2>
                <p className="text-slate-400 text-lg">
                    Le premier échange est gratuit et sans engagement. Il nous permet de valider la pertinence d'une collaboration.
                </p>
            </div>

            <div className="bg-white text-[#0B1120] p-10 lg:p-16 shadow-2xl">
                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Nom Complet</label>
                            <input type="text" className="consultant-input" placeholder="Votre nom" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Entreprise</label>
                            <input type="text" className="consultant-input" placeholder="Votre société" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">Email Professionnel</label>
                        <input type="email" className="consultant-input" placeholder="email@entreprise.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">Objet de la demande</label>
                        <select className="consultant-input">
                            <option>Demande d'accompagnement stratégique</option>
                            <option>Besoin ponctuel / Audit</option>
                            <option>Demande d'information</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-slate-500">Message</label>
                         <textarea rows={4} className="consultant-input resize-none" placeholder="Décrivez brièvement votre contexte..."></textarea>
                    </div>
                    
                    <button type="button" className="consultant-btn consultant-btn-dark w-full">
                        Envoyer ma demande
                    </button>
                </form>

                <div className="mt-10 pt-10 border-t border-slate-100 grid md:grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#C5A47E]" />
                        <span className="text-slate-600">contact@thomasdurand.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#C5A47E]" />
                        <span className="text-slate-600">+33 6 12 34 56 78</span>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1629] border-t border-white/5 py-12 text-slate-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <span className="font-bold text-white tracking-tight uppercase">Thomas Durand</span>
                <span className="mx-2">|</span>
                <span>Consultant en Stratégie</span>
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">CGV</a>
            </div>
            <div>
                © {new Date().getFullYear()} Tous droits réservés.
            </div>
        </div>
      </footer>
    </div>
  );
};