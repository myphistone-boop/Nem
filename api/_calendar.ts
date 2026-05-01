import { google } from 'googleapis';

function getCalendarClient() {
  const credentials = process.env.GOOGLE_CALENDAR_CREDENTIALS;
  if (!credentials) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

export async function createCalendarEvent(
  summary: string,
  description: string,
  date: string,
  time: string,
  durationMinutes: number,
  _attendeeEmail: string
): Promise<string | null> {
  const calendar = getCalendarClient();
  if (!calendar) return null;

  const startDateTime = `${date}T${time}:00`;
  const [h, m] = time.split(':').map(Number);
  const endTotalMin = h * 60 + m + durationMinutes;
  const endH = Math.floor(endTotalMin / 60).toString().padStart(2, '0');
  const endM = (endTotalMin % 60).toString().padStart(2, '0');
  const endDateTime = `${date}T${endH}:${endM}:00`;

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    requestBody: {
      summary,
      description,
      start: { dateTime: startDateTime, timeZone: 'Europe/Paris' },
      end: { dateTime: endDateTime, timeZone: 'Europe/Paris' },
    },
  });

  return event.data.id || null;
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  if (!calendar || !eventId) return;

  try {
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId,
      sendUpdates: 'all',
    });
  } catch (_) {
    // Event may already be deleted
  }
}
