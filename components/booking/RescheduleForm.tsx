import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Loader2, ArrowLeft } from 'lucide-react';

interface Props {
  slug: string;
  reference: string;
  onRescheduled: () => void;
  onBack: () => void;
}

export const RescheduleForm: React.FC<Props> = ({ slug, reference, onRescheduled, onBack }) => {
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
      const res = await fetch('/api/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, new_date: date, new_time: time }),
      });

      if (res.ok) {
        onRescheduled();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors du décalage');
      }
      setSubmitting(false);
    } catch {
      setError('Erreur réseau');
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-textMain placeholder:text-textMuted/50 focus:outline-none focus:border-fuchsia-500/50 transition-colors";

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-fuchsia-500 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Retour
      </button>

      <h2 className="text-lg font-bold text-textMain mb-4">Choisir un nouveau créneau</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">
            <Calendar className="w-3 h-3 inline mr-1" />Nouvelle date
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
              <Clock className="w-3 h-3 inline mr-1" />Nouveau créneau
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !date || !time}
          className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Modification en cours...</>
          ) : (
            'Confirmer le nouveau créneau'
          )}
        </button>
      </form>
    </div>
  );
};
