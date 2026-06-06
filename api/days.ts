import type { VercelRequest, VercelResponse } from '@vercel/node';

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Current wall-clock time in Europe/Paris, independent of the server timezone.
function parisNow(): { ymd: string; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find(p => p.type === t)?.value || '0';
  return {
    ymd: `${get('year')}-${get('month')}-${get('day')}`,
    hour: parseInt(get('hour'), 10),
    minute: parseInt(get('minute'), 10),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const now = parisNow();
  const [y, m, d] = now.ymd.split('-').map(Number);
  const base = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));

  const today = `${DAYS_FR[base.getUTCDay()]} ${base.getUTCDate()} ${MONTHS_FR[base.getUTCMonth()]} ${base.getUTCFullYear()}`;
  const currentTime = `${now.hour}h${String(now.minute).padStart(2, '0')}`;

  const calendar: { day: string; date: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    const dd = new Date(base);
    dd.setUTCDate(base.getUTCDate() + i);
    calendar.push({
      day: `${DAYS_FR[dd.getUTCDay()]} ${dd.getUTCDate()} ${MONTHS_FR[dd.getUTCMonth()]}`,
      date: toYMD(dd),
    });
  }

  return res.json({
    today,
    today_date: now.ymd,
    current_time: currentTime,
    calendar,
  });
}

function toYMD(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}
