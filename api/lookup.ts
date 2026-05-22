import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, ref, phone, first_name, last_name, date, time } = req.query as Record<string, string | undefined>;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const hasCriteria = ref || phone || first_name || last_name || date || time;
  if (!hasCriteria) return res.status(400).json({ error: 'at least one criterion required (ref, phone, first_name, last_name, date, time)' });

  const sql = getDb();
  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const confirmedStatus = 'confirmed';

  let bookings: any[];

  if (ref) {
    bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND reference = ${ref} AND status = ${confirmedStatus}`;
  } else if (phone) {
    bookings = await sql`SELECT * FROM bookings WHERE business_id = ${business.id} AND client_phone = ${phone} AND status = ${confirmedStatus} ORDER BY date, time`;
  } else {
    const firstNamePattern = first_name ? `${first_name}%` : null;
    const lastNamePattern = last_name ? `${last_name}%` : null;

    bookings = await sql`
      SELECT * FROM bookings
      WHERE business_id = ${business.id}
        AND status = ${confirmedStatus}
        AND (${firstNamePattern}::text IS NULL OR client_first_name ILIKE ${firstNamePattern})
        AND (${lastNamePattern}::text IS NULL OR client_last_name ILIKE ${lastNamePattern})
        AND (${date ?? null}::text IS NULL OR date = ${date ?? null}::date)
        AND (${time ?? null}::text IS NULL OR time = ${time ?? null})
      ORDER BY date, time
    `;
  }

  const formatted = bookings.map((b: any) => ({
    reference: b.reference,
    first_name: b.client_first_name,
    last_name: b.client_last_name,
    phone: b.client_phone,
    service: b.service,
    date: typeof b.date === 'string' ? b.date : new Date(b.date).toISOString().split('T')[0],
    time: b.time,
  }));

  const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const fmtDate = (d: string) => {
    const dt = new Date(d);
    return `${DAY_NAMES[dt.getDay()]} ${dt.getDate()} ${MONTH_NAMES[dt.getMonth()]}`;
  };
  const fmtTime = (t: string) => t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');

  let summary: string;
  if (formatted.length === 0) {
    summary = 'Aucun rendez-vous trouvé avec ces informations.';
  } else if (formatted.length === 1) {
    const b = formatted[0];
    summary = `1 rendez-vous trouvé : ${b.first_name} ${b.last_name}, ${b.service}, ${fmtDate(b.date)} à ${fmtTime(b.time)}. Référence ${b.reference}.`;
  } else {
    const lines = formatted.map((b, i) => `${i + 1}. ${b.first_name} ${b.last_name}, ${b.service}, ${fmtDate(b.date)} à ${fmtTime(b.time)} (réf ${b.reference})`);
    summary = `${formatted.length} rendez-vous trouvés : ${lines.join(' ; ')}.`;
  }

  return res.json({
    summary,
    bookings: formatted,
    count: formatted.length,
    business_name: business.name,
  });
}
