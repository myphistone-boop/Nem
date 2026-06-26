import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

function slugToToolName(slug: string): string {
  return slug.replace(/-/g, '_');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const sql = getDb();
  const businesses = await sql`SELECT slug, name FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const bookToolName = `book_slot_${slugToToolName(business.slug as string)}`;

  const catalogue = [
    `get_days() → today (str FR), today_date (YYYY-MM-DD), current_time (HH:MM Europe/Paris), calendar [{day,date}×30].`,
    `find_available_slots(slug, from? YYYY-MM-DD, to? YYYY-MM-DD, time_of_day? any|morning|late_morning|early_afternoon|afternoon|late_afternoon|evening, limit? int) → summary (str), periods_summary (str), days [{date,day,periods_summary,slots[]}]. Créneaux passés exclus automatiquement. Jour unique si from==to, ignore limit.`,
    `${bookToolName}(business_slug, first_name, phone, service, date YYYY-MM-DD, time HH:MM, last_name?) → {reference, date, time, service, business_name}. Crée RDV + Calendar + SMS client.`,
    `lookup_appointment(slug, ref?, phone?, first_name?) → {bookings[{reference,first_name,phone,service,date,time}], business_name}. Priorité : ref > phone > first_name (insensible casse).`,
    `cancel_appointment(reference) → {success:true}. Annule RDV + supprime Calendar + SMS client.`,
    `reschedule_appointment(reference, new_date YYYY-MM-DD, new_time HH:MM) → {reference, new_date, new_time}. Décale RDV + nouveau Calendar + SMS artisan.`,
  ].join('\n');

  const tools_registry = {
    get_days: {
      url: '/api/days',
      method: 'GET',
      constant_params: {},
    },
    find_available_slots: {
      url: '/api/find-slots',
      method: 'GET',
      constant_params: { slug: business.slug },
    },
    [bookToolName]: {
      url: '/api/booking',
      method: 'POST',
      constant_params: { business_slug: business.slug },
    },
    lookup_appointment: {
      url: '/api/lookup',
      method: 'GET',
      constant_params: { slug: business.slug },
    },
    cancel_appointment: {
      url: '/api/cancel',
      method: 'POST',
      constant_params: {},
    },
    reschedule_appointment: {
      url: '/api/reschedule',
      method: 'POST',
      constant_params: {},
    },
  };

  return res.json({ slug: business.slug, catalogue, tools_registry });
}
