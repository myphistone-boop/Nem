import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Phone, User, Wrench, Loader2 } from 'lucide-react';

interface Props {
  slug: string;
  services: string[];
  onConfirmed: (data: any) => void;
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

export const BookingForm: React.FC<Props> = ({ slug, services, onConfirmed }) => {
  const now = new Date();
  const [step, setStep] = useState<'info' | 'date'>('info');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
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

  const canGoToDate = firstName && lastName && phone && service;

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
          date: selectedDate,
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

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";

  if (step === 'info') {
    return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-900">Vos informations</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Prénom</label>
            <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jean" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom</label>
            <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Dupont" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 12 34 56 78" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Type d'intervention</label>
          <select required value={service} onChange={e => setService(e.target.value)} className={inputClass}>
            <option value="">Sélectionner</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button
          type="button"
          disabled={!canGoToDate}
          onClick={() => setStep('date')}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Choisir une date
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Sélectionner un créneau</h2>
        <button type="button" onClick={() => setStep('info')} className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" /> Modifier mes infos
        </button>
      </div>

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
          <><Loader2 className="w-4 h-4 animate-spin" /> Réservation en cours...</>
        ) : (
          'Confirmer le rendez-vous'
        )}
      </button>
    </form>
  );
};
