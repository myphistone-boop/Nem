import React from 'react';
import { X, ArrowRight, CheckCircle2, Mail, MapPin, Smartphone, Instagram, Linkedin, LayoutTemplate } from 'lucide-react';
import './classic-theme.css';

export const ClassicTheme: React.FC = () => {
  return (
    <div className="classic-theme min-h-screen flex flex-col">
      
      {/* Navbar Clean */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] transition-all">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
            {/* Logo Typographique */}
            <div className="text-xl font-bold tracking-tight text-[#111827]">
                ATELIER <span className="text-slate-500 font-normal">CLASSIQUE</span>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4b5563]">
                <a href="#home" className="hover:text-[#111827] transition-colors">Accueil</a>
                <a href="#services" className="hover:text-[#111827] transition-colors">Services</a>
                <a href="#about" className="hover:text-[#111827] transition-colors">À Propos</a>
                <a href="#contact" className="hover:text-[#111827] transition-colors">Contact</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <a href="#contact" className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-[#111827] rounded-md hover:bg-[#374151] transition-colors">
                    Prendre RDV
                </a>
                <a href="/" className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
                    <X className="w-4 h-4" />
                </a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 classic-fade-in">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 block">
                    Professionnel & Indépendant
                </span>
                <h1 className="classic-heading text-5xl lg:text-6xl leading-[1.1] mb-6">
                    L'excellence dans <br/>
                    la simplicité.
                </h1>
                <p className="text-lg text-[#4b5563] mb-8 leading-relaxed max-w-lg">
                    Nous créons des solutions durables et esthétiques pour votre activité. Une approche centrée sur l'essentiel, sans compromis sur la qualité.
                </p>
                <div className="flex gap-4">
                    <a href="#services" className="classic-btn classic-btn-primary">
                        Découvrir mes services
                    </a>
                    <a href="#about" className="classic-btn classic-btn-outline">
                        En savoir plus
                    </a>
                </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 classic-fade-in classic-delay-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                        alt="Workspace Minimalist" 
                        className="w-full h-full object-cover classic-img-hover"
                    />
                </div>
            </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-[#f9fafb] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16 classic-fade-in">
                <h2 className="classic-heading text-3xl mb-4">Ce que je propose</h2>
                <p className="text-[#4b5563]">
                    Des prestations claires, adaptées aux besoins des indépendants et des petites structures.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Consulting Stratégique", desc: "Analyse de votre marché et définition d'objectifs clairs pour développer votre activité sereinement." },
                    { title: "Design & Création", desc: "Identité visuelle, webdesign ou architecture d'intérieur. Des concepts intemporels qui vous ressemblent." },
                    { title: "Accompagnement", desc: "Un suivi régulier et personnalisé pour garantir la réussite de vos projets sur le long terme." }
                ].map((s, i) => (
                    <div key={i} className="classic-card classic-fade-in classic-delay-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mb-6 text-[#111827]">
                            <LayoutTemplate className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-[#111827] mb-3">{s.title}</h3>
                        <p className="text-[#4b5563] text-sm leading-relaxed mb-6">
                            {s.desc}
                        </p>
                        <a href="#contact" className="inline-flex items-center text-sm font-semibold text-[#111827] hover:underline underline-offset-4">
                            En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Full Width Visual Break */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-gray-100 mb-8">
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                    alt="Office Detail" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <h2 className="classic-heading text-3xl">Pourquoi me choisir ?</h2>
                <div className="space-y-4 text-[#4b5563]">
                    <p className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0" />
                        Une expertise reconnue et une écoute attentive.
                    </p>
                    <p className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0" />
                        Des livrables de haute qualité, respectant les délais.
                    </p>
                    <p className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0" />
                        Une communication transparente à chaque étape.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#f9fafb] border-t border-[#e5e7eb]">
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
                <h2 className="classic-heading text-3xl mb-6">À propos</h2>
                <div className="space-y-6 text-[#4b5563] leading-relaxed">
                    <p>
                        Je m'appelle Alexandre, et je suis convaincu que la clarté est la clé de la réussite. Depuis 10 ans, j'aide mes clients à simplifier leur message et à optimiser leurs outils.
                    </p>
                    <p>
                        Mon approche est pragmatique : pas de jargon inutile, pas de promesses irréalistes. Juste du travail bien fait et une relation de confiance.
                    </p>
                </div>
                <div className="mt-8 pt-8 border-t border-[#e5e7eb] flex gap-8">
                    <div>
                        <span className="block text-2xl font-bold text-[#111827]">10+</span>
                        <span className="text-xs text-[#6b7280] uppercase tracking-wide">Années d'expérience</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-[#111827]">150+</span>
                        <span className="text-xs text-[#6b7280] uppercase tracking-wide">Projets réalisés</span>
                    </div>
                </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" 
                    alt="Portrait" 
                    className="w-72 h-96 object-cover rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="classic-heading text-3xl text-center mb-16">Témoignages</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-[#f9fafb] rounded-lg">
                    <p className="text-[#4b5563] italic mb-6">"Un travail d'une grande finesse. Alexandre a su capter l'essence de notre marque et la traduire visuellement avec perfection."</p>
                    <p className="text-sm font-bold text-[#111827] uppercase tracking-wide">— Marie Dubois, Architecte</p>
                </div>
                <div className="p-8 bg-[#f9fafb] rounded-lg">
                    <p className="text-[#4b5563] italic mb-6">"Professionnel, réactif et à l'écoute. Le résultat dépasse nos attentes. Une collaboration fluide du début à la fin."</p>
                    <p className="text-sm font-bold text-[#111827] uppercase tracking-wide">— Thomas Laurent, Fondateur TechFlow</p>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-xl">
            <div className="text-center mb-12">
                <h2 className="classic-heading text-3xl mb-4">Parlons de votre projet</h2>
                <p className="text-[#4b5563]">Remplissez le formulaire ci-dessous, je vous répondrai sous 24h.</p>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase">Prénom</label>
                        <input type="text" className="classic-input" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#6b7280] uppercase">Nom</label>
                        <input type="text" className="classic-input" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase">Email</label>
                    <input type="email" className="classic-input" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase">Message</label>
                    <textarea rows={4} className="classic-input resize-none"></textarea>
                </div>
                <button type="button" className="classic-btn classic-btn-primary w-full mt-4">
                    Envoyer le message
                </button>
            </form>

            <div className="mt-12 flex justify-center gap-8 text-[#4b5563]">
                <a href="#" className="hover:text-[#111827] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#111827] transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="mailto:contact@email.com" className="hover:text-[#111827] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#f9fafb] border-t border-[#e5e7eb] text-center text-xs text-[#6b7280]">
        <div className="container mx-auto px-6">
            <p>© {new Date().getFullYear()} Atelier Classique. Tous droits réservés.</p>
            <div className="flex justify-center gap-4 mt-2">
                <a href="#" className="hover:text-[#111827]">Mentions Légales</a>
                <a href="#" className="hover:text-[#111827]">Confidentialité</a>
            </div>
        </div>
      </footer>

    </div>
  );
};