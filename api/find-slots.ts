import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

const TIME_RANGES: Record<string, [number, number]> = {
  morning:         [0,        12 * 60],
  late_morning:    [10 * 60,  13 * 60],
  early_afternoon: [12 * 60,  15 * 60],
  afternoon:       [12 * 60,  17 * 60],
  late_afternoon:  [16 * 60,  24 * 60],
  evening:         [19 * 60,  24 * 60],
  any:             [0,        24 * 60],
};

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function fmt(t: string): string {
  return t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');
}

function getPeriod(t: string): string {
  const mins = toMinutes(t);
  if (mins < 12 * 60) return 'le matin';
  if (mins < 17 * 60) return "l'après-midi";
  return "en fin d'après-midi";
}

function frenchList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' et ' + items[items.length - 1];
}

function getDatesInRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const current = new Date(from + 'T00:00:00');
  const end = new Date(to + 'T00:00:00');
  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function formatDayFr(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`;
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function dateInDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, from, to, date, time_of_day = 'any', limit = '20' } = req.query;

  if (!slug) return res.status(400).json({ error: 'slug required' });

  // Support ancien format ?date= et nouveau format ?from=&to=
  const fromDate = ((from || date) as string) || todayStr();
  const toDate = ((to || date) as string) || (from ? fromDate : dateInDays(30));

  const sql = getDb();
  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number };

  const timeRange = TIME_RANGES[time_of_day as string] ?? TIME_RANGES.any;
  const isSingleDay = fromDate === toDate;
  const maxLimit = isSingleDay ? Infinity : Math.min(parseInt(limit as string, 10) || 20, 100);

  const todayParis = new Date().toLocaleDateString('fr-CA', { timeZone: 'Europe/Paris' });
  const currentTimeParis = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
  const currentMinutes = toMinutes(currentTimeParis);

  const dates = getDatesInRange(fromDate, toDate);

  type DayResult = { date: string; day: string; periods_summary: string; slots: string[] };
  const dayResults: DayResult[] = [];
  let totalSlots = 0;

  for (const dateStr of dates) {
    if (totalSlots >= maxLimit) break;

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = dateObj.getDay() === 0 ? 7 : dateObj.getDay();

    if (!hours.days.includes(dayOfWeek)) continue;

    const start = hours.start;
    const end = dayOfWeek === 6 && hours.saturday_end ? hours.saturday_end : hours.end;
    const duration = hours.slot_duration;

    const allSlots: string[] = [];
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    let current = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    while (current + duration <= endMinutes) {
      const h = Math.floor(current / 60).toString().padStart(2, '0');
      const m = (current % 60).toString().padStart(2, '0');
      allSlots.push(`${h}:${m}`);
      current += duration;
    }

    const confirmedStatus = 'confirmed';
    const bookings = await sql`SELECT time FROM bookings WHERE business_id = ${business.id} AND date = ${dateStr} AND status = ${confirmedStatus}`;
    const bookedTimes = new Set(bookings.map((b: any) => b.time));

    const available = allSlots
      .filter(s => !bookedTimes.has(s))
      .filter(s => !(dateStr === todayParis && toMinutes(s) <= currentMinutes))
      .filter(s => {
        const mins = toMinutes(s);
        return mins >= timeRange[0] && mins < timeRange[1];
      })
      .slice(0, maxLimit - totalSlots);

    if (available.length === 0) continue;

    const periodOrder = ["le matin", "l'après-midi", "en fin d'après-midi"];
    const periodSet = new Set(available.map(getPeriod));
    const periods = periodOrder.filter(p => periodSet.has(p));

    dayResults.push({
      date: dateStr,
      day: formatDayFr(dateStr),
      periods_summary: frenchList(periods),
      slots: available,
    });

    totalSlots += available.length;
  }

  if (dayResults.length === 0) {
    return res.json({
      summary: isSingleDay ? 'Aucun créneau disponible ce jour.' : 'Aucun créneau disponible sur cette période.',
      periods_summary: 'Aucune plage disponible.',
      days: [],
    });
  }

  if (isSingleDay) {
    const day = dayResults[0];
    const bookedRaw = await sql`SELECT time FROM bookings WHERE business_id = ${business.id} AND date = ${fromDate} AND status = ${'confirmed'}`;
    const bookedList = (bookedRaw as any[]).map((b: any) => fmt(b.time));
    return res.json({
      summary: `Créneaux disponibles : ${day.slots.map(fmt).join(', ')}. Créneaux déjà pris : ${bookedList.length ? bookedList.join(', ') : 'aucun'}.`,
      periods_summary: `Plages disponibles : ${day.periods_summary}.`,
      days: dayResults,
    });
  }

  const summaryParts = dayResults.map(d => `${d.day} : ${d.slots.map(fmt).join(', ')}`);
  return res.json({
    summary: summaryParts.join(' — '),
    periods_summary: dayResults.map(d => `${d.day} : ${d.periods_summary}`).join(' — '),
    days: dayResults,
  });
}
