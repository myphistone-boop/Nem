import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Approach } from './components/Approach';
import { Solutions } from './components/Solutions';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { Comparison } from './components/Comparison';
import { Education } from './components/Education';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Booking } from './components/Booking';
import { AstralTheme } from './components/themes/AstralTheme';
import { NatureTheme } from './components/themes/NatureTheme';

const App: React.FC = () => {
  const [isAstralOpen, setIsAstralOpen] = useState(false);
  const [isNatureOpen, setIsNatureOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-textMain min-h-screen flex flex-col bg-background transition-colors duration-300 relative">
      <Navbar 
        onOpenAstral={() => setIsAstralOpen(true)} 
        onOpenNature={() => setIsNatureOpen(true)}
      />
      
      {/* Themes Overlays */}
      <AstralTheme isOpen={isAstralOpen} onClose={() => setIsAstralOpen(false)} />
      <NatureTheme isOpen={isNatureOpen} onClose={() => setIsNatureOpen(false)} />

      <main className="flex-grow">
        <Hero />
        <Approach />
        <Solutions />
        <Services />
        <Benefits />
        <Comparison />
        <Education />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;