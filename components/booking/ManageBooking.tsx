import React, { useState, useEffect } from 'react';
import { Search, Phone, Hash, Loader2, Calendar, Clock, Wrench, X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { RescheduleForm } from './RescheduleForm';

interface BookingData {
  reference: string;
  first_name: string;
  last_name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export const ManageBooking: React.FC<{ slug: string; initialRef?: string }> = ({ slug, initialRef }) => {
  const [searchType, setSearchType] = useState<'ref' | 'phone'>('ref');
  const [searchValue, setSearchValue] = useState(initialRef || '');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [selected, setSelected] = useState<BookingData | null>(null);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);

  const doSearch = async (ref?: string, phone?: string) => {
    setError('');
    setLoading(true);
    setBookings([]);
    setSelected(null);

    const param = ref ? `ref=${ref}` : `phone=${encodeURIComponent(phone || '')}`;

    try {
      const res = await fetch(`/api/lookup?slug=${slug}&${param}`);
      const data = await res.json();

      if (!res.ok || data.bookings.length === 0) {
        setError('Aucun rendez-vous trouvé');
        setLoading(false);
        return;
      }

      if (data.bookings.length === 1) {
        setSelected(data.bookings[0]);
      } else {
        setBookings(data.bookings);
      }
      setLoading(false);
    } catch {
      setError('Erreur réseau');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) doSearch(initialRef);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'ref') doSearch(searchValue);
    else doSearch(undefined, searchValue);
  };

  const handleCancel = async () => {
    if (!selected) return;
    setCancelling(true);

    try {
      const res = await fetch('/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: selected.reference }),
      });

      if (res.ok) {
        setCancelled(true);
      } else {
        setError('Erreur lors de l\'annulation');
      }
      setCancelling(false);
      setConfirmCancel(false);
    } catch {
      setError('Erreur réseau');
      setCancelling(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";

  if (cancelled) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <X className="w-7 h-7 text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Rendez-vous annulé</h2>
        <p className="text-sm text-slate-500">Votre rendez-vous a été annulé. Vous pouvez fermer cette page.</p>
      </div>
    );
  }

  if (rescheduled) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Rendez-vous modifié</h2>
        <p className="text-sm text-slate-500">Votre nouveau créneau a été confirmé. Vous pouvez fermer cette page.</p>
      </div>
    );
  }

  if (rescheduling && selected) {
    return (
      <RescheduleForm
        slug={slug}
        reference={selected.reference}
        onRescheduled={() => setRescheduled(true)}
        onBack={() => setRescheduling(false)}
        onCancel={() => { setRescheduling(false); setConfirmCancel(true); }}
      />
    );
  }

  // Cancel confirmation dialog
  if (confirmCancel && selected) {
    return (
      <div className="py-4">
        <button
          onClick={() => setConfirmCancel(false)}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <X className="w-7 h-7 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Annuler le rendez-vous ?</h2>
          <p className="text-sm text-slate-500 mb-6">
            Cette action est irréversible. Votre créneau sera libéré.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setConfirmCancel(false)}
              className="flex-1 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Non, garder le RDV
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Oui, annuler
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm text-center mt-3">{error}</p>}
      </div>
    );
  }

  if (selected) {
    const dateFormatted = new Date(selected.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="space-y-5">
        <button
          onClick={() => { setSelected(null); setBookings([]); }}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Nouvelle recherche
        </button>

        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
          <div className="flex items-center gap-3 px-5 py-4">
            <Hash className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Référence</p>
              <p className="text-sm font-semibold text-slate-900">{selected.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Date</p>
              <p className="text-sm font-medium text-slate-900">{dateFormatted}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Heure</p>
              <p className="text-sm font-medium text-slate-900">{selected.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Wrench className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Intervention</p>
              <p className="text-sm font-medium text-slate-900">{selected.service}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setRescheduling(true)}
            className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
          >
            Décaler le rendez-vous
          </button>
          <button
            onClick={() => setConfirmCancel(true)}
            className="flex-1 py-3 rounded-lg border border-slate-200 text-red-600 font-medium text-sm hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            Annuler le rendez-vous
          </button>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
    );
  }

  if (bookings.length > 0) {
    return (
      <div className="space-y-3">
        <button
          onClick={() => setBookings([])}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <p className="text-sm text-slate-500">Sélectionnez le rendez-vous à gérer :</p>
        {bookings.map(b => {
          const dateFormatted = new Date(b.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
          return (
            <button
              key={b.reference}
              onClick={() => setSelected(b)}
              className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all text-left flex items-center justify-between group"
            >
              <div>
                <p className="font-medium text-slate-900">{b.service}</p>
                <p className="text-sm text-slate-500">{dateFormatted} à {b.time}</p>
                <p className="text-xs text-slate-400 mt-0.5">Réf : {b.reference}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Retrouver mon rendez-vous</h2>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSearchType('ref')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            searchType === 'ref'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          Référence
        </button>
        <button
          type="button"
          onClick={() => setSearchType('phone')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            searchType === 'phone'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          Téléphone
        </button>
      </div>

      <input
        type="text"
        required
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder={searchType === 'ref' ? 'Ex: RDV-3F8K' : 'Ex: 06 12 34 56 78'}
        className={inputClass}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !searchValue}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        Rechercher
      </button>
    </form>
  );
};
