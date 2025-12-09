import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon, Palette, ChevronDown, Sparkles, Leaf } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize state based on the DOM to match the head script immediately
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    // We double check local storage just in case, but rely on the class presence mostly
    if (localStorage.theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'Pourquoi Nemphisia ?', href: '#why' },
    { label: "Qu'est-ce que c'est ?", href: '#education' },
    { label: 'Une question ?', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept anchor links starting with #
    if (!href.startsWith('#')) return;

    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if(contactSection) {
        contactSection.scrollIntoView({behavior: 'smooth'});
        setIsMobileMenuOpen(false);
    }
  };

  // Determine if background should be shown: if scrolled OR mobile menu is open
  const showBackground = isScrolled || isMobileMenuOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showBackground ? 'bg-background/80 backdrop-blur-xl border-b border-border py-4 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo and Theme Toggle Group */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-600 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all">
              <Rocket className="w-5 h-5 text-white transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-xl font-bold tracking-tight text-textMain font-display">Nemphisia</span>
          </a>

          {/* Vertical Divider and Theme Toggle - Separated for better visual balance */}
          <div className="hidden md:flex items-center ml-8 pl-8 border-l border-border h-8">
            <button
              onClick={toggleTheme}
              className={`
                flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300
                ${isDark 
                  ? 'bg-surface border-fuchsia-500/30 text-textMuted hover:text-white hover:border-fuchsia-500 hover:bg-surface-highlight hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-500 hover:shadow-md'
                }
              `}
              aria-label="Changer le thème"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-xs font-bold uppercase tracking-wide">Activer luminosité</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wide">Désactiver luminosité</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)} 
              className="text-sm font-medium text-textMuted hover:text-textMain transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-orange-500 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}

          {/* Style Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-sm font-medium text-textMuted hover:text-textMain transition-colors py-1">
              <Palette className="w-4 h-4" />
              <span>Styles</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full right-0 pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-surface/90 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2 flex flex-col gap-1 overflow-hidden">
                <div className="px-3 py-2 text-xs font-bold text-textMuted uppercase tracking-wider">Thèmes Démo</div>
                
                {/* Astral Button */}
                <a 
                  href="?theme=astral"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-highlight text-textMain text-sm transition-colors text-left group/item"
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="block font-medium">Astral</span>
                    <span className="text-[10px] text-textMuted">Design Ethereal</span>
                  </div>
                </a>

                {/* Nature Button */}
                <a 
                  href="?theme=nature"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-highlight text-textMain text-sm transition-colors text-left group/item"
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="block font-medium">Nature & Gold</span>
                    <span className="text-[10px] text-textMuted">Design Thérapeute</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button variant="primary" size="sm" onClick={scrollToContact}>
            Nous contacter
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
           {/* Mobile Theme Toggle (Simple Icon) */}
           <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface border border-border text-textMuted"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            className="text-textMain p-2 hover:bg-surface rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 lg:hidden flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-lg font-medium text-textMain py-3 border-b border-border hover:text-fuchsia-500 transition-colors"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Style Buttons */}
          <div className="py-2 border-b border-border">
             <p className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2">Thèmes</p>
             <a 
                href="?theme=astral"
                className="w-full flex items-center gap-3 text-lg font-medium text-textMain py-2 hover:text-indigo-400 transition-colors text-left"
              >
                <div className="p-1 rounded bg-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                Thème Astral
              </a>
              <a 
                href="?theme=nature"
                className="w-full flex items-center gap-3 text-lg font-medium text-textMain py-2 hover:text-emerald-400 transition-colors text-left"
              >
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                Thème Nature
              </a>
          </div>

          <Button className="w-full mt-4" onClick={scrollToContact}>Nous contacter</Button>
        </div>
      )}
    </nav>
  );
};