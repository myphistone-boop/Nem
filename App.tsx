import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-textMain min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Approach />
        <Solutions />
        <Services />
        <Benefits />
        <Comparison />
        <Education />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;