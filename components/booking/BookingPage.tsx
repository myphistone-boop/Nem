import React, { useState, useEffect } from 'react';
import { Calendar, Search, ArrowLeft, Loader2 } from 'lucide-react';
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
          setBusiness({
            slug,
            name: data.business_name || slug,
            services: data.services || [],
            hours: { days: [], start: '', end: '', slot_duration: 60 },
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
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-2">{error}</h1>
          <a href="/" className="text-blue-600 hover:underline text-sm">Retour à l'accueil</a>
        </div>
      </section>
    );
  }

  if (mode === 'confirmed' && confirmation) {
    return <BookingConfirmation data={confirmation} slug={slug} onBack={() => setMode('choose')} />;
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-5 py-12">

        {/* Header */}
        <div className="mb-8">
          {mode !== 'choose' && (
            <button
              onClick={() => setMode('choose')}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
          )}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg">
              {business?.name?.charAt(0) || '?'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{business?.name}</h1>
              <p className="text-sm text-slate-500">Prise de rendez-vous en ligne</p>
            </div>
          </div>
        </div>

        {/* Card container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {mode === 'choose' && (
            <div className="divide-y divide-slate-100">
              <button
                onClick={() => setMode('book')}
                className="w-full p-6 hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Prendre rendez-vous
                    </h2>
                    <p className="text-sm text-slate-500">Choisir une date et un créneau</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
                </div>
              </button>

              <button
                onClick={() => setMode('manage')}
                className="w-full p-6 hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Search className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Gérer mon rendez-vous
                    </h2>
                    <p className="text-sm text-slate-500">Consulter, décaler ou annuler</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
                </div>
              </button>
            </div>
          )}

          {mode === 'book' && (
            <div className="p-6">
              <BookingForm
                slug={slug}
                services={business?.services || []}
                onConfirmed={(data) => {
                  setConfirmation(data);
                  setMode('confirmed');
                }}
              />
            </div>
          )}

          {mode === 'manage' && (
            <div className="p-6">
              <ManageBooking slug={slug} />
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">Propulsé par Nemphisia</p>
      </div>
    </section>
  );
};
