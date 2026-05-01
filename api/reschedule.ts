import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db';
import { createCalendarEvent, deleteCalendarEvent } from './_calendar';
import { sendSms } from './_sms';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reference, new_date, new_time } = req.body;
  if (!reference || !new_date || !new_time) {
    return res.status(400).json({ error: 'reference, new_date, and new_time required' });
  }

  const sql = getDb();

  const bookings = await sql(
    'SELECT b.*, bus.name as business_name, bus.email as business_email, bus.twilio_phone, bus.phone as business_phone, bus.hours FROM bookings b JOIN businesses bus ON b.business_id = bus.id WHERE b.reference = $1 AND b.status = $2',
    [reference, 'confirmed']
  );
  if (bookings.length === 0) return res.status(404).json({ error: 'Booking not found' });

  const booking = bookings[0];
  const hours = booking.hours as { slot_duration: number };

  const conflict = await sql(
    'SELECT id FROM bookings WHERE business_id = $1 AND date = $2 AND time = $3 AND status = $4 AND id != $5',
    [booking.business_id, new_date, new_time, 'confirmed', booking.id]
  );
  if (conflict.length > 0) return res.status(409).json({ error: 'Slot already booked' });

  if (booking.calendar_event_id) {
    await deleteCalendarEvent(booking.calendar_event_id);
  }

  const newEventId = await createCalendarEvent(
    `${booking.service} — ${booking.client_first_name} ${booking.client_last_name}`,
    `Client : ${booking.client_first_name} ${booking.client_last_name}\nTéléphone : ${booking.client_phone}\nService : ${booking.service}\nRéférence : ${reference}`,
    new_date,
    new_time,
    hours.slot_duration || 60,
    booking.business_email
  );

  await sql(
    'UPDATE bookings SET date = $1, time = $2, calendar_event_id = $3, reminder_sent = false WHERE id = $4',
    [new_date, new_time, newEventId, booking.id]
  );

  // Notify the artisan
  if (booking.twilio_phone && booking.business_phone) {
    const dateFormatted = new Date(new_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    await sendSms(
      booking.business_phone,
      booking.twilio_phone,
      `Le RDV de ${booking.client_first_name} ${booking.client_last_name} a été déplacé au ${dateFormatted} à ${new_time}.\nService : ${booking.service}\nRéf : ${reference}`
    );
  }

  return res.json({ reference, new_date, new_time });
}
