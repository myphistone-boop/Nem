import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';
import { sendSms } from './_sms.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const secret = req.headers['authorization'];
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = getDb();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const confirmedStatus = 'confirmed';

  const bookings = await sql`SELECT b.*, bus.name as business_name, bus.twilio_phone, bus.slug
     FROM bookings b
     JOIN businesses bus ON b.business_id = bus.id
     WHERE b.date = ${tomorrowStr} AND b.status = ${confirmedStatus} AND b.reminder_sent = false`;

  let sent = 0;
  for (const booking of bookings) {
    if (booking.twilio_phone) {
      const success = await sendSms(
        booking.client_phone,
        booking.twilio_phone,
        `Rappel : votre RDV avec ${booking.business_name} est demain à ${booking.time}.\n🔧 ${booking.service}\n📋 Réf : ${booking.reference}\n\nGérer votre RDV : nemphisia.com/?booking=${booking.slug}`
      );
      if (success) {
        await sql`UPDATE bookings SET reminder_sent = true WHERE id = ${booking.id}`;
        sent++;
      }
    }
  }

  return res.json({ reminders_sent: sent });
}
