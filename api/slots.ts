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
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number; lunch_start?: string; lunch_end?: string };

  const dateObj = new Date(date as string);
  const dayOfWeek = dateObj.getDay() === 0 ? 7 : dateObj.getDay();

  if (!hours.days.includes(dayOfWeek)) {
    return res.json({ slots: [], business_name: business.name, services: business.services || [] });
  }

  const start = hours.start;
  const end = dayOfWeek === 6 && hours.saturday_end ? hours.saturday_end : hours.end;
  const duration = hours.slot_duration;

  const slots: string[] = [];
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  let current = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  const lunchStartM = hours.lunch_start ? hours.lunch_start.split(':').map(Number).reduce((h, m) => h * 60 + m) : null;
  const lunchEndM = hours.lunch_end ? hours.lunch_end.split(':').map(Number).reduce((h, m) => h * 60 + m) : null;

  while (current + duration <= endMinutes) {
    const overlapsLunch = lunchStartM !== null && lunchEndM !== null && current + duration > lunchStartM && current < lunchEndM;
    if (!overlapsLunch) {
      const h = Math.floor(current / 60).toString().padStart(2, '0');
      const m = (current % 60).toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
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
  const summary = `Créneaux disponibles : ${availableText}. Créneaux déjà pris : ${bookedText}.`;

  return res.json({ summary, slots: available, booked, business_name: business.name, services: business.services || [] });
}
