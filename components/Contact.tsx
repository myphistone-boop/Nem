
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Phone, Mail, ArrowRight, MapPin, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const SERVICE_ID = "service_jihajwy";
const TEMPLATE_ID = "template_uru60s8";
const PUBLIC_KEY = "tEQkg5ut1bS_3U_R8";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openMailClient = () => {
    const subject = `Projet Web Nemphisia: ${formData.firstName} ${formData.lastName}`;
    const body = `Nom: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:myphistone@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      message: formData.message,
      to_email: 'myphistone@gmail.com' 
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      const errorText = error.text || JSON.stringify(error);
      console.error('ERREUR EMAILJS:', errorText);
      
      setStatus('error');
      setErrorMessage("Ouverture de votre boîte mail...");
      
      // Fallback automatique vers mailto après 1.5s
      setTimeout(() => {
          openMailClient();
      }, 1500);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[#05010a]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-fuchsia-900/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[100px] animate-pulse-glow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Info Side */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              Discutons de votre <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">Projet Web</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Vous avez besoin d'un site performant ou de sécuriser votre existant ? Nemphisia est là pour coder votre vision. Réponse technique sous 24h.
            </p>

            <div className="space-y-6">
              <Card className="p-4 flex items-center gap-4 bg-[#150528]/50 border-white/5 hover:border-fuchsia-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-700 flex items-center justify-center text-white shadow-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-fuchsia-300 uppercase font-bold tracking-wider">Téléphone</p>
                  <a href="tel:+33651553268" className="text-white text-lg font-medium hover:text-orange-400 transition-colors">
                    +33 6 51 55 32 68
                  </a>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 bg-[#150528]/50 border-white/5 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-orange-300 uppercase font-bold tracking-wider">Email</p>
                  <a href="mailto:myphistone@gmail.com" className="text-white text-lg font-medium hover:text-fuchsia-400 transition-colors">
                    myphistone@gmail.com
                  </a>
                </div>
              </Card>

              <div className="flex items-center gap-4 pl-2 opacity-60">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400">Disponible dans toute la France</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <Card className="p-8 lg:p-10 border-white/10 bg-[#150528]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(217,70,239,0.1)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Prénom</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:bg-white/10 transition-all placeholder-gray-600"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Nom</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:bg-white/10 transition-all placeholder-gray-600"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Email professionnel</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:bg-white/10 transition-all placeholder-gray-600"
                  placeholder="john@entreprise.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Détails techniques du projet</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:bg-white/10 transition-all resize-none placeholder-gray-600"
                  placeholder="Type de site, technologies souhaitées, problèmes de sécurité rencontrés..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full mt-2"
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === 'success' && <CheckCircle className="w-5 h-5" />}
                {status === 'error' && <AlertTriangle className="w-5 h-5" />}
                
                {status === 'idle' && "Envoyer la demande"}
                {status === 'loading' && "Envoi en cours..."}
                {status === 'success' && "Message reçu !"}
                {status === 'error' && "Erreur (Ouverture mail...)"}
                
                {status === 'idle' && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
              
              {errorMessage && (
                  <p className="text-center text-xs text-orange-400 mt-2 animate-pulse">
                      {errorMessage}
                  </p>
              )}
              
              <p className="text-center text-xs text-gray-500 mt-2">
                Vos données techniques restent confidentielles.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};