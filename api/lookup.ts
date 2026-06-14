import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';
import { normalizePhone } from './_sms.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, ref, phone, first_name } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });
  if (!ref && !phone && !first_name) return res.status(400).json({ error: 'ref, phone or first_name required' });

  const sql = getDb();

  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const confirmedStatus = 'confirmed';

  let bookings;
  if (ref) {
    bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND reference = ${ref} AND status = ${confirmedStatus}`;
  } else if (phone) {
    const normalizedPhone = normalizePhone(phone as string);
    bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND (client_phone = ${normalizedPhone} OR client_phone = ${phone}) AND status = ${confirmedStatus} ORDER BY date, time`;
    if (bookings.length === 0 && first_name) {
      bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND LOWER(client_first_name) = LOWER(${first_name}) AND status = ${confirmedStatus} ORDER BY date, time`;
    }
  } else {
    bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND LOWER(client_first_name) = LOWER(${first_name}) AND status = ${confirmedStatus} ORDER BY date, time`;
  }

  return res.json({
    bookings: bookings.map((b: any) => ({
      reference: b.reference,
      first_name: b.client_first_name,
      phone: b.client_phone,
      service: b.service,
      date: b.date,
      time: b.time,
    })),
    business_name: business.name,
  });
}
