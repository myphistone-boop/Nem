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
  attendeeEmail: string
): Promise<string | null> {
  const calendar = getCalendarClient();
  if (!calendar) return null;

  const startDateTime = `${date}T${time}:00`;
  const endDate = new Date(`${startDateTime}+02:00`);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    requestBody: {
      summary,
      description,
      start: { dateTime: startDateTime, timeZone: 'Europe/Paris' },
      end: { dateTime: endDate.toISOString(), timeZone: 'Europe/Paris' },
      attendees: [{ email: attendeeEmail }],
    },
    sendUpdates: 'all',
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
