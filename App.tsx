
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Approach } from './components/Approach';
import { Services } from './components/Services';
import { Education } from './components/Education';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Pricing } from './components/Pricing';
import { DemoNav } from './components/ui/DemoNav';
import { DesignInspiration } from './components/DesignInspiration';
import { LegalModal } from './components/LegalModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminInit } from './components/AdminInit'; // Import de la page Admin

// Import Themes
import { ImpactTheme } from './components/themes/ImpactTheme';
import { NatureCareTheme } from './components/themes/NatureCareTheme';
import { EstheticTheme } from './components/themes/EstheticTheme';
import { CoachingTheme } from './components/themes/CoachingTheme';
import { ArtisanTheme } from './components/themes/ArtisanTheme';
import { ConsultantTheme } from './components/themes/ConsultantTheme';
import { ClassicTheme } from './components/themes/ClassicTheme';
import { CommerceTheme } from './components/themes/CommerceTheme';

const App: React.FC = () => {
  // Simple routing based on Query Parameters
  const [theme] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('theme');
    }
    return null;
  });

  // Check for admin mode
  const isAdmin = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('admin') === 'true';

  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Helper to wrap themes with the Demo Navigation
  const renderTheme = (Component: React.FC) => (
    <>
      <DemoNav />
      <Component />
    </>
  );

  // Render Admin Page
  if (isAdmin) {
    return <AdminInit />;
  }

  // Render Theme Pages
  if (theme === 'care') return renderTheme(NatureCareTheme);
  if (theme === 'esthetic') return renderTheme(EstheticTheme);
  if (theme === 'coaching') return renderTheme(CoachingTheme);
  if (theme === 'consultant') return renderTheme(ConsultantTheme);
  if (theme === 'artisan') return renderTheme(ArtisanTheme);
  if (theme === 'classic') return renderTheme(ClassicTheme);
  if (theme === 'impact') return renderTheme(ImpactTheme);
  if (theme === 'commerce') return renderTheme(CommerceTheme);

  // Render Main Agency Site
  return (
    <div className="font-sans antialiased text-textMain min-h-screen flex flex-col bg-background transition-colors duration-300 relative">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <DesignInspiration />
        <Approach />
        <Services />
        <Education />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer onOpenLegal={() => setIsLegalModalOpen(true)} />
      
      {/* Bouton WhatsApp flottant (Mobile uniquement) */}
      <WhatsAppButton />
      
      {/* Modale Mentions Légales */}
      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
    </div>
  );
};

export default App;
