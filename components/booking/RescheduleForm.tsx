import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, ArrowLeft, X } from 'lucide-react';

interface Props {
  slug: string;
  reference: string;
  onRescheduled: () => void;
  onBack: () => void;
  onCancel: () => void;
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

export const RescheduleForm: React.FC<Props> = ({ slug, reference, onRescheduled, onBack, onCancel }) => {
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
        setError(data.error || 'Erreur lors de la modification');
      }
      setSubmitting(false);
    } catch {
      setError('Erreur réseau');
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button onClick={onCancel} className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors">
          <X className="w-3.5 h-3.5" /> Annuler le rendez-vous
        </button>
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mb-5">Choisir un nouveau créneau</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {MONTHS_FR[calMonth]} {calYear}
            </h3>
            <div className="flex items-center gap-1">
              <button type="button" onClick={prevMonth} disabled={!canGoPrev} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0 mb-1">
            {DAYS_FR.map(d => (
              <div key={d} className="text-center text-xs font-medium text-slate-400 py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
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
                    aspect-square flex items-center justify-center rounded-full text-sm transition-all m-0.5
                    ${isSelected
                      ? 'bg-blue-600 text-white font-semibold'
                      : selectable
                        ? 'text-slate-900 font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                        : 'text-slate-300 cursor-not-allowed'
                    }
                    ${isToday && !isSelected ? 'ring-1 ring-blue-300' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3">
              {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            {loadingSlots ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm py-4 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" /> Chargement...
              </div>
            ) : slots.length === 0 ? (
              <p className="text-sm text-slate-500 py-3 text-center">Aucun créneau disponible</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {slots.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTime(s)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      time === s
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !selectedDate || !time}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
