import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, User, Wrench, ArrowLeft, Search } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { BookingConfirmation } from './BookingConfirmation';
import { ManageBooking } from './ManageBooking';

interface Business {
  slug: string;
  name: string;
  services: string[];
  hours: { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number };
}

export const BookingPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'choose' | 'book' | 'manage' | 'confirmed'>('choose');
  const [confirmation, setConfirmation] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/slots?slug=${slug}&date=${new Date().toISOString().split('T')[0]}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError('Établissement introuvable');
        } else {
          fetch(`/api/lookup?slug=${slug}&ref=__PING__`)
            .then(r => r.json())
            .then(lookupData => {
              setBusiness({
                slug,
                name: lookupData.business_name || slug,
                services: [],
                hours: { days: [], start: '', end: '', slot_duration: 60 },
              });
            });
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les informations');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-14 bg-background min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-textMuted">Chargement...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-32 pb-14 bg-background min-h-screen">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-textMain mb-4">{error}</h1>
          <a href="/" className="text-fuchsia-500 hover:underline">Retour à l'accueil</a>
        </div>
      </section>
    );
  }

  if (mode === 'confirmed' && confirmation) {
    return <BookingConfirmation data={confirmation} slug={slug} onBack={() => setMode('choose')} />;
  }

  return (
    <section className="pt-32 pb-14 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-lg">
        {mode !== 'choose' && (
          <button
            onClick={() => setMode('choose')}
            className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-fuchsia-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-600 to-orange-500 flex items-center justify-center">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-textMain">
            {business?.name}
          </h1>
          <p className="text-textMuted mt-2">Prise de rendez-vous en ligne</p>
        </div>

        {mode === 'choose' && (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setMode('book')}
              className="w-full p-6 rounded-2xl border border-border bg-surface/50 hover:border-fuchsia-500/30 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-fuchsia-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-textMain group-hover:text-fuchsia-500 transition-colors">
                    Prendre rendez-vous
                  </h2>
                  <p className="text-sm text-textMuted">Réserver un créneau disponible</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMode('manage')}
              className="w-full p-6 rounded-2xl border border-border bg-surface/50 hover:border-fuchsia-500/30 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-textMain group-hover:text-fuchsia-500 transition-colors">
                    Gérer mon rendez-vous
                  </h2>
                  <p className="text-sm text-textMuted">Consulter, décaler ou annuler</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {mode === 'book' && (
          <BookingForm
            slug={slug}
            onConfirmed={(data) => {
              setConfirmation(data);
              setMode('confirmed');
            }}
          />
        )}

        {mode === 'manage' && (
          <ManageBooking slug={slug} />
        )}
      </div>
    </section>
  );
};
