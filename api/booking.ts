import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';
import { createCalendarEvent } from './_calendar.js';
import { sendSms, normalizePhone } from './_sms.js';
import crypto from 'crypto';

function generateReference(): string {
  return 'RDV-' + crypto.randomBytes(2).toString('hex').toUpperCase();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { business_slug, first_name, last_name, phone: rawPhone, service, date, time } = req.body;

  if (!business_slug || !first_name || !last_name || !rawPhone || !service || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const phone = normalizePhone(rawPhone);

  const sql = getDb();

  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${business_slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];

  const confirmedStatus = 'confirmed';
  const existing = await sql`SELECT id FROM bookings WHERE business_id = ${business.id} AND date = ${date} AND time = ${time} AND status = ${confirmedStatus}`;
  if (existing.length > 0) return res.status(409).json({ error: 'Slot already booked' });

  const reference = generateReference();
  const hours = business.hours as { slot_duration: number };

  const calendarEventId = await createCalendarEvent(
    `${service} — ${first_name} ${last_name}`,
    `Client : ${first_name} ${last_name}\nTéléphone : ${phone}\nService : ${service}\nRéférence : ${reference}`,
    date,
    time,
    hours.slot_duration || 60,
    business.email
  );

  await sql`INSERT INTO bookings (business_id, reference, client_first_name, client_last_name, client_phone, service, date, time, calendar_event_id)
     VALUES (${business.id}, ${reference}, ${first_name}, ${last_name}, ${phone}, ${service}, ${date}, ${time}, ${calendarEventId})`;

  if (business.twilio_phone) {
    const dateFormatted = new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    await sendSms(
      phone,
      business.twilio_phone,
      `Votre RDV avec ${business.name} est confirmé !\n📅 ${dateFormatted} à ${time}\n🔧 ${service}\n📋 Réf : ${reference}\n\nGérer votre RDV : nemphisia.com/?booking=${business.slug}&ref=${reference}`
    );
  }

  return res.json({
    reference,
    date,
    time,
    service,
    business_name: business.name,
  });
}
