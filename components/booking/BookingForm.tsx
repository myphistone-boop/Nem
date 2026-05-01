import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, User, Wrench, Loader2 } from 'lucide-react';

interface Props {
  slug: string;
  onConfirmed: (data: any) => void;
}

const SERVICES = [
  "Fuite d'eau",
  "Eau chaude / Ballon",
  "Débouchage",
  "Installation sanitaire",
  "Réparation robinetterie",
  "Détection de fuite",
];

export const BookingForm: React.FC<Props> = ({ slug, onConfirmed }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    setTime('');
    fetch(`/api/slots?slug=${slug}&date=${date}`)
      .then(r => r.json())
      .then(data => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => setLoadingSlots(false));
  }, [date, slug]);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_slug: slug,
          first_name: firstName,
          last_name: lastName,
          phone,
          service,
          date,
          time,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur lors de la réservation');
        setSubmitting(false);
        return;
      }

      onConfirmed(data);
    } catch {
      setError('Erreur réseau, veuillez réessayer');
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-textMain placeholder:text-textMuted/50 focus:outline-none focus:border-fuchsia-500/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">
            <User className="w-3 h-3 inline mr-1" />Prénom
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Jean"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Nom</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Dupont"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">
          <Phone className="w-3 h-3 inline mr-1" />Téléphone
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="06 12 34 56 78"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">
          <Wrench className="w-3 h-3 inline mr-1" />Type d'intervention
        </label>
        <select
          required
          value={service}
          onChange={e => setService(e.target.value)}
          className={inputClass}
        >
          <option value="">Choisir une intervention</option>
          {SERVICES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">
          <Calendar className="w-3 h-3 inline mr-1" />Date
        </label>
        <input
          type="date"
          required
          min={getMinDate()}
          value={date}
          onChange={e => setDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {date && (
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">
            <Clock className="w-3 h-3 inline mr-1" />Créneau horaire
          </label>
          {loadingSlots ? (
            <div className="flex items-center gap-2 text-textMuted text-sm py-3">
              <Loader2 className="w-4 h-4 animate-spin" /> Chargement des créneaux...
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-orange-500 py-2">Aucun créneau disponible pour cette date</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTime(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    time === s
                      ? 'bg-fuchsia-500 text-white'
                      : 'border border-border bg-surface/50 text-textMain hover:border-fuchsia-500/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !firstName || !lastName || !phone || !service || !date || !time}
        className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Réservation en cours...</>
        ) : (
          'Confirmer mon rendez-vous'
        )}
      </button>
    </form>
  );
};
