import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, ref, phone } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });
  if (!ref && !phone) return res.status(400).json({ error: 'ref or phone required' });

  const sql = getDb();

  const businesses = await sql('SELECT * FROM businesses WHERE slug = $1', [slug]);
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];

  let bookings;
  if (ref) {
    bookings = await sql(
      'SELECT * FROM bookings WHERE business_id = $1 AND reference = $2 AND status = $3',
      [business.id, ref, 'confirmed']
    );
  } else {
    bookings = await sql(
      'SELECT * FROM bookings WHERE business_id = $1 AND client_phone = $2 AND status = $3 ORDER BY date, time',
      [business.id, phone, 'confirmed']
    );
  }

  return res.json({
    bookings: bookings.map((b: any) => ({
      reference: b.reference,
      first_name: b.client_first_name,
      last_name: b.client_last_name,
      phone: b.client_phone,
      service: b.service,
      date: b.date,
      time: b.time,
    })),
    business_name: business.name,
  });
}
