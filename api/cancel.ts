import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db';
import { deleteCalendarEvent } from './_calendar';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reference } = req.body;
  if (!reference) return res.status(400).json({ error: 'reference required' });

  const sql = getDb();
  const confirmedStatus = 'confirmed';
  const cancelledStatus = 'cancelled';

  const bookings = await sql`SELECT * FROM bookings WHERE reference = ${reference} AND status = ${confirmedStatus}`;
  if (bookings.length === 0) return res.status(404).json({ error: 'Booking not found' });

  const booking = bookings[0];

  if (booking.calendar_event_id) {
    await deleteCalendarEvent(booking.calendar_event_id);
  }

  await sql`UPDATE bookings SET status = ${cancelledStatus} WHERE id = ${booking.id}`;

  return res.json({ success: true });
}
