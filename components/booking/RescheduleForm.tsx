import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Loader2, ArrowLeft } from 'lucide-react';

interface Props {
  slug: string;
  reference: string;
  onRescheduled: () => void;
  onBack: () => void;
}

const DAYS_FR = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export const RescheduleForm: React.FC<Props> = ({ slug, reference, onRescheduled, onBack }) => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setTime('');
    fetch(`/api/slots?slug=${slug}&date=${selectedDate}`)
      .then(r => r.json())
      .then(data => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => setLoadingSlots(false));
  }, [selectedDate, slug]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };

  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const isDateSelectable = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (d < tomorrow) return false;
    const dow = d.getDay();
    if (dow === 0) return false;
    return true;
  };

  const formatDateStr = (day: number) => {
    const m = (calMonth + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${calYear}-${m}-${d}`;
  };

  const handleDayClick = (day: number) => {
    if (!isDateSelectable(day)) return;
    setSelectedDate(formatDateStr(day));
  };

  const canGoPrev = calYear > now.getFullYear() || (calYear === now.getFullYear() && calMonth > now.getMonth());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const selectedDay = selectedDate ? parseInt(selectedDate.split('-')[2]) : -1;
  const selectedMonth = selectedDate ? parseInt(selectedDate.split('-')[1]) - 1 : -1;
  const selectedYear = selectedDate ? parseInt(selectedDate.split('-')[0]) : -1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, new_date: selectedDate, new_time: time }),
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

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-fuchsia-500 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Retour
      </button>

      <h2 className="text-lg font-bold text-textMain mb-4">Choisir un nouveau créneau</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Calendrier */}
        <div className="rounded-2xl border border-border bg-surface/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} disabled={!canGoPrev} className="p-2 rounded-lg hover:bg-surface-highlight text-textMuted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-textMain">
              {MONTHS_FR[calMonth]} {calYear}
            </h3>
            <button type="button" onClick={nextMonth} className="p-2 rounded-lg hover:bg-surface-highlight text-textMuted transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_FR.map(d => (
              <div key={d} className="text-center text-xs font-medium text-textMuted py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selectable = isDateSelectable(day);
              const isSelected = day === selectedDay && calMonth === selectedMonth && calYear === selectedYear;
              const isToday = day === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear();

              return (
                <button
                  key={day}
                  type="button"
                  disabled={!selectable}
                  onClick={() => handleDayClick(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30'
                      : selectable
                        ? 'text-textMain hover:bg-fuchsia-500/10 hover:text-fuchsia-500 cursor-pointer'
                        : 'text-textMuted/30 cursor-not-allowed'
                    }
                    ${isToday && !isSelected ? 'ring-2 ring-fuchsia-500/30' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Créneaux */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              <Clock className="w-3 h-3 inline mr-1" />
              Créneaux disponibles — {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
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
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      time === s
                        ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30'
                        : 'border border-border bg-surface/50 text-textMain hover:border-fuchsia-500/30 hover:text-fuchsia-500'
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
          disabled={submitting || !selectedDate || !time}
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
