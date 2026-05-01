import React, { useState } from 'react';
import { Search, Phone, Hash, Loader2, Calendar, Clock, Wrench, X, ArrowRight } from 'lucide-react';
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

export const ManageBooking: React.FC<{ slug: string }> = ({ slug }) => {
  const [searchType, setSearchType] = useState<'ref' | 'phone'>('ref');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [selected, setSelected] = useState<BookingData | null>(null);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setBookings([]);
    setSelected(null);

    const param = searchType === 'ref' ? `ref=${searchValue}` : `phone=${encodeURIComponent(searchValue)}`;

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
    } catch {
      setError('Erreur réseau');
      setCancelling(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-textMain placeholder:text-textMuted/50 focus:outline-none focus:border-fuchsia-500/50 transition-colors";

  if (cancelled) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <X className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-textMain mb-2">Rendez-vous annulé</h2>
        <p className="text-textMuted">Votre rendez-vous a été annulé avec succès.</p>
      </div>
    );
  }

  if (rescheduled) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-textMain mb-2">Rendez-vous décalé</h2>
        <p className="text-textMuted">Votre rendez-vous a été modifié avec succès.</p>
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
      />
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
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-surface/50 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Référence</p>
              <p className="text-lg font-bold text-textMain">{selected.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Date</p>
              <p className="font-medium text-textMain">{dateFormatted}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Heure</p>
              <p className="font-medium text-textMain">{selected.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-fuchsia-500" />
            <div>
              <p className="text-xs text-textMuted">Intervention</p>
              <p className="font-medium text-textMain">{selected.service}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setRescheduling(true)}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Décaler le rendez-vous
          </button>
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="flex-1 py-3 rounded-full border border-red-500/30 text-red-500 font-bold text-sm hover:bg-red-500/5 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Annuler
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    );
  }

  if (bookings.length > 0) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-textMuted">Plusieurs rendez-vous trouvés. Sélectionnez celui à gérer :</p>
        {bookings.map(b => {
          const dateFormatted = new Date(b.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
          return (
            <button
              key={b.reference}
              onClick={() => setSelected(b)}
              className="w-full p-4 rounded-xl border border-border bg-surface/50 hover:border-fuchsia-500/30 transition-all text-left flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-textMain">{b.service}</p>
                <p className="text-sm text-textMuted">{dateFormatted} à {b.time}</p>
                <p className="text-xs text-textMuted">Réf : {b.reference}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-textMuted" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSearchType('ref')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
            searchType === 'ref' ? 'bg-fuchsia-500 text-white' : 'border border-border text-textMuted'
          }`}
        >
          <Hash className="w-3 h-3 inline mr-1" />Référence
        </button>
        <button
          type="button"
          onClick={() => setSearchType('phone')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
            searchType === 'phone' ? 'bg-fuchsia-500 text-white' : 'border border-border text-textMuted'
          }`}
        >
          <Phone className="w-3 h-3 inline mr-1" />Téléphone
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !searchValue}
        className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        Rechercher
      </button>
    </form>
  );
};
