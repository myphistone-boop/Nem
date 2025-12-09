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
  // Simple routing based on Query Parameters
  // e.g. ?theme=astral
  const [theme] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('theme');
    }
    return null;
  });

  // Render Astral Theme Page
  if (theme === 'astral') {
    return <AstralTheme />;
  }

  // Render Nature Theme Page
  if (theme === 'nature') {
    return <NatureTheme />;
  }

  // Render Main Agency Site
  return (
    <div className="font-sans antialiased text-textMain min-h-screen flex flex-col bg-background transition-colors duration-300 relative">
      <Navbar />
      
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