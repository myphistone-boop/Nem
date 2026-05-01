import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';
import { deleteCalendarEvent } from './_calendar.js';
import { sendSms } from './_sms.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reference } = req.body;
  if (!reference) return res.status(400).json({ error: 'reference required' });

  const sql = getDb();
  const confirmedStatus = 'confirmed';
  const cancelledStatus = 'cancelled';

  const bookings = await sql`SELECT b.*, bus.name as business_name, bus.twilio_phone FROM bookings b JOIN businesses bus ON b.business_id = bus.id WHERE b.reference = ${reference} AND b.status = ${confirmedStatus}`;
  if (bookings.length === 0) return res.status(404).json({ error: 'Booking not found' });

  const booking = bookings[0];

  if (booking.calendar_event_id) {
    await deleteCalendarEvent(booking.calendar_event_id);
  }

  await sql`UPDATE bookings SET status = ${cancelledStatus} WHERE id = ${booking.id}`;

  if (booking.twilio_phone) {
    const dateFormatted = new Date(booking.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    await sendSms(
      booking.client_phone,
      booking.twilio_phone,
      `Votre RDV avec ${booking.business_name} du ${dateFormatted} à ${booking.time} a bien été annulé.\nRéf : ${reference}`
    );
  }

  return res.json({ success: true });
}
