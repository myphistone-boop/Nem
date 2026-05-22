import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

const TIME_WINDOWS: Record<string, [number, number]> = {
  any: [0, 24 * 60],
  morning: [0, 12 * 60],
  late_morning: [10 * 60, 12 * 60],
  early_afternoon: [12 * 60, 15 * 60],
  afternoon: [12 * 60, 18 * 60],
  late_afternoon: [15 * 60, 18 * 60],
  evening: [17 * 60, 24 * 60],
};

const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(min: number): string {
  const h = Math.floor(min / 60).toString().padStart(2, '0');
  const m = (min % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatDateFR(d: Date): string {
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

function formatTimeFR(t: string): string {
  return t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');
}

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const timeOfDay = (req.query.time_of_day as string) || 'any';
  const window = TIME_WINDOWS[timeOfDay];
  if (!window) return res.status(400).json({ error: `invalid time_of_day. Allowed: ${Object.keys(TIME_WINDOWS).join(', ')}` });

  const limit = Math.min(parseInt((req.query.limit as string) || '5', 10), 50);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fromDate = req.query.from ? new Date(req.query.from as string) : today;
  const toDate = req.query.to ? new Date(req.query.to as string) : new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const sql = getDb();
  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number };

  const fromYMD = toYMD(fromDate);
  const toYMD_str = toYMD(toDate);
  const confirmedStatus = 'confirmed';
  const bookings = await sql`SELECT date, time FROM bookings WHERE business_id = ${business.id} AND date >= ${fromYMD} AND date <= ${toYMD_str} AND status = ${confirmedStatus}`;

  const bookedByDate = new Map<string, Set<string>>();
  for (const b of bookings as any[]) {
    const dateKey = typeof b.date === 'string' ? b.date : toYMD(new Date(b.date));
    if (!bookedByDate.has(dateKey)) bookedByDate.set(dateKey, new Set());
    bookedByDate.get(dateKey)!.add(b.time);
  }

  const matches: { date: string; day: string; time: string }[] = [];
  const cursor = new Date(fromDate);
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const todayYMD = toYMD(new Date());

  while (cursor <= toDate && matches.length < limit) {
    const dayOfWeek = cursor.getDay() === 0 ? 7 : cursor.getDay();
    if (hours.days.includes(dayOfWeek)) {
      const dateStr = toYMD(cursor);
      const startM = toMinutes(hours.start);
      const endM = toMinutes(dayOfWeek === 6 && hours.saturday_end ? hours.saturday_end : hours.end);
      const duration = hours.slot_duration;
      const booked = bookedByDate.get(dateStr) || new Set<string>();

      for (let m = startM; m + duration <= endM && matches.length < limit; m += duration) {
        if (m < window[0] || m >= window[1]) continue;
        if (dateStr === todayYMD && m <= nowMinutes) continue;
        const t = toHHMM(m);
        if (booked.has(t)) continue;
        matches.push({ date: dateStr, day: formatDateFR(cursor), time: t });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  let summary: string;
  if (matches.length === 0) {
    summary = 'Aucun créneau disponible sur la période demandée.';
  } else {
    const parts = matches.map(m => `${m.day} à ${formatTimeFR(m.time)}`);
    summary = `Prochains créneaux : ${parts.join(', ')}.`;
  }

  return res.json({ summary, matches, business_name: business.name, services: business.services || [] });
}
