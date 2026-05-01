import { google } from 'googleapis';

async function getCalendarClient() {
  const credentials = process.env.GOOGLE_CALENDAR_CREDENTIALS;
  const subject = process.env.GOOGLE_CALENDAR_ID;
  if (!credentials || !subject) return null;

  const creds = JSON.parse(credentials);
  const key = creds.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT(
    creds.client_email,
    undefined,
    key,
    ['https://www.googleapis.com/auth/calendar'],
    subject
  );

  await auth.authorize();

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
  try {
    const calendar = await getCalendarClient();
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
        attendees: [{ email: attendeeEmail }],
      },
      sendUpdates: 'all',
    });

    return event.data.id || null;
  } catch (err) {
    console.error('Calendar create error:', err);
    return null;
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  try {
    const calendar = await getCalendarClient();
    if (!calendar || !eventId) return;

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId,
      sendUpdates: 'all',
    });
  } catch (err) {
    console.error('Calendar delete error:', err);
  }
}
