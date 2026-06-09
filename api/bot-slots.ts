import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, date } = req.query;
  if (!slug || !date) return res.status(400).json({ error: 'slug and date required' });

  const sql = getDb();

  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number };

  const dateObj = new Date(date as string);
  const dayOfWeek = dateObj.getDay() === 0 ? 7 : dateObj.getDay();

  if (!hours.days.includes(dayOfWeek)) {
    return res.json({ summary: "Ce jour est fermé. Aucun créneau disponible." });
  }

  const start = hours.start;
  const end = dayOfWeek === 6 && hours.saturday_end ? hours.saturday_end : hours.end;
  const duration = hours.slot_duration;

  const slots: string[] = [];
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  let current = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (current + duration <= endMinutes) {
    const h = Math.floor(current / 60).toString().padStart(2, '0');
    const m = (current % 60).toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    current += duration;
  }

  const confirmedStatus = 'confirmed';
  const bookings = await sql`SELECT time FROM bookings WHERE business_id = ${business.id} AND date = ${date} AND status = ${confirmedStatus}`;
  const bookedTimes = new Set(bookings.map((b: any) => b.time));

  const available = slots.filter(s => !bookedTimes.has(s));
  const booked = slots.filter(s => bookedTimes.has(s));

  const fmt = (t: string) => t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');
  const availableText = available.length > 0 ? available.map(fmt).join(', ') : 'aucun';
  const bookedText = booked.length > 0 ? booked.map(fmt).join(', ') : 'aucun';

  function toMinutes(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
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

  const periodOrder = ["le matin", "l'après-midi", "en fin d'après-midi"];
  const periodSet = new Set(available.map(getPeriod));
  const periods = periodOrder.filter(p => periodSet.has(p));
  const periodsSummary = periods.length > 0
    ? `Plages disponibles : ${frenchList(periods)}.`
    : 'Aucune plage disponible.';

  return res.json({
    summary: `Créneaux disponibles : ${availableText}. Créneaux déjà pris : ${bookedText}.`,
    periods_summary: periodsSummary,
  });
}
