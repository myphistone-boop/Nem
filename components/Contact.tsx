import React, { useState } from 'react';
import { Card } from './ui/Card';
import { ArrowRight, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const SERVICE_ID = "service_nojvkzo";
const TEMPLATE_ID = "template_0pmrqy8";
const PUBLIC_KEY = "5--S4w9ONU_9K-_eL";

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
    // Formulaire de contact désactivé
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      message: formData.message
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
    <section className="py-10 lg:py-14 relative overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-fuchsia-900/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[100px] animate-pulse-glow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Info Side */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 text-textMain">
              Recevez votre <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">Plan d'Action Commercial</span>
            </h2>
            <p className="text-textMuted text-lg mb-8 leading-relaxed">
              Prêt à remplir votre carnet de commandes ? 
              Contactez-nous pour une analyse gratuite de votre potentiel de croissance sur internet. Réponse stratégique sous 24h.
            </p>

          </div>

          {/* Form Side */}
          <Card className="p-8 lg:p-10 border-border bg-surface/80 backdrop-blur-xl shadow-[0_0_50px_rgba(217,70,239,0.1)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-textMuted tracking-wider">Prénom</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-background border border-border rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-fuchsia-500 focus:bg-surface-highlight transition-all placeholder-gray-500"
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-textMuted tracking-wider">Nom</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-background border border-border rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-fuchsia-500 focus:bg-surface-highlight transition-all placeholder-gray-500"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-textMuted tracking-wider">Email professionnel</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border border-border rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-fuchsia-500 focus:bg-surface-highlight transition-all placeholder-gray-500"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-textMuted tracking-wider">Vos objectifs</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background border border-border rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-fuchsia-500 focus:bg-surface-highlight transition-all resize-none placeholder-gray-500"
                  placeholder="Ex: Je veux plus de clients locaux, je veux refaire mon site pour mieux vendre..."
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
                
                {status === 'idle' && "Demander mon audit gratuit"}
                {status === 'loading' && "Envoi en cours..."}
                {status === 'success' && "Demande reçue !"}
                {status === 'error' && "Erreur (Ouverture mail...)"}
                
                {status === 'idle' && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
              
              {errorMessage && (
                  <p className="text-center text-xs text-orange-400 mt-2 animate-pulse">
                      {errorMessage}
                  </p>
              )}
              
              <p className="text-center text-xs text-textMuted mt-2">
                Vos informations servent uniquement à préparer votre stratégie.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
