import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, date } = req.query;
  if (!slug || !date) return res.status(400).json({ error: 'slug and date required' });

  const sql = getDb();

  const businesses = await sql('SELECT * FROM businesses WHERE slug = $1', [slug]);
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number };

  const dateObj = new Date(date as string);
  const dayOfWeek = dateObj.getDay() === 0 ? 7 : dateObj.getDay();

  if (!hours.days.includes(dayOfWeek)) {
    return res.json({ slots: [] });
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

  const bookings = await sql(
    'SELECT time FROM bookings WHERE business_id = $1 AND date = $2 AND status = $3',
    [business.id, date, 'confirmed']
  );
  const bookedTimes = new Set(bookings.map((b: any) => b.time));

  const available = slots.filter(s => !bookedTimes.has(s));

  return res.json({ slots: available });
}
