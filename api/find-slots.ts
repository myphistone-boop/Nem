import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_db.js';

const TIME_WINDOWS: Record<string, [number, number]> = {
  any: [0, 24 * 60],
  morning: [0, 12 * 60],
  late_morning: [10 * 60, 12 * 60],
  early_afternoon: [12 * 60, 15 * 60],
  afternoon: [12 * 60, 18 * 60],
  late_afternoon: [15 * 60, 18 * 60],
  evening: [17 * 60, 24 * 60],
};

const TIME_OF_DAY_FR: Record<string, string> = {
  'matin': 'morning',
  'matinée': 'morning',
  'matinee': 'morning',
  'fin de matinée': 'late_morning',
  'fin de matinee': 'late_morning',
  "debut d'apres-midi": 'early_afternoon',
  "début d'après-midi": 'early_afternoon',
  "debut apres midi": 'early_afternoon',
  'après-midi': 'afternoon',
  'apres-midi': 'afternoon',
  'apres midi': 'afternoon',
  'aprem': 'afternoon',
  "fin d'après-midi": 'late_afternoon',
  "fin d'apres-midi": 'late_afternoon',
  'fin journée': 'late_afternoon',
  'fin journee': 'late_afternoon',
  'fin de journée': 'late_afternoon',
  'fin de journee': 'late_afternoon',
  'soir': 'evening',
  'soirée': 'evening',
  'soiree': 'evening',
};

const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(min: number): string {
  const h = Math.floor(min / 60).toString().padStart(2, '0');
  const m = (min % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatDateFR(d: Date): string {
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

function formatTimeFR(t: string): string {
  return t.replace(/^0/, '').replace(':00', 'h').replace(':', 'h');
}

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

function normalizeTimeOfDay(raw: string): string {
  const lower = raw.toLowerCase().trim();
  if (TIME_WINDOWS[lower]) return lower;
  if (TIME_OF_DAY_FR[lower]) return TIME_OF_DAY_FR[lower];
  for (const [fr, en] of Object.entries(TIME_OF_DAY_FR)) {
    if (lower.includes(fr)) return en;
  }
  return 'any';
}

function applyWeekZone(fromDate: Date, toDate: Date, zone: string): { from: Date; to: Date } | null {
  const start = new Date(fromDate);
  const dayOfWeek = start.getDay() === 0 ? 7 : start.getDay();
  const monday = addDays(start, 1 - dayOfWeek);

  switch (zone.toLowerCase()) {
    case 'start':
    case 'debut':
    case 'début':
      return { from: monday, to: addDays(monday, 1) };
    case 'mid':
    case 'milieu':
      return { from: addDays(monday, 2), to: addDays(monday, 2) };
    case 'end':
    case 'fin':
      return { from: addDays(monday, 3), to: addDays(monday, 5) };
    default:
      return null;
  }
}

function periodLabel(en: string): string {
  switch (en) {
    case 'morning': return 'le matin';
    case 'late_morning': return 'en fin de matinée';
    case 'early_afternoon': return "en début d'après-midi";
    case 'afternoon': return "l'après-midi";
    case 'late_afternoon': return "en fin de journée";
    case 'evening': return 'en soirée';
    default: return '';
  }
}

function getDayPeriods(slotTimes: string[]): string[] {
  let hasMorning = false;
  let hasAfternoon = false;
  let hasEvening = false;
  for (const t of slotTimes) {
    const min = toMinutes(t);
    if (min < 12 * 60) hasMorning = true;
    if (min >= 12 * 60 && min < 17 * 60) hasAfternoon = true;
    if (min >= 17 * 60) hasEvening = true;
  }
  const periods: string[] = [];
  if (hasMorning) periods.push('le matin');
  if (hasAfternoon) periods.push("l'après-midi");
  if (hasEvening) periods.push('en soirée');
  return periods;
}

function buildAdaptiveSummary(
  matches: { date: string; day: string; time: string }[],
  fromDate: Date,
  toDate: Date,
  timeOfDay: string,
  hadDateRange: boolean,
  rangeHasOpenDays: boolean,
): { summary: string; level: string } {
  if (matches.length === 0) {
    if (!rangeHasOpenDays) {
      return {
        summary: "On est fermé ce jour-là. On peut planifier pour un autre jour [breath]?",
        level: 'closed',
      };
    }
    return {
      summary: "Désolé, c'est complet sur cette plage. On peut essayer une autre date [breath]?",
      level: 'full',
    };
  }

  const daySpan = daysBetween(fromDate, toDate) + 1;
  const distinctDays = [...new Set(matches.map(m => m.date))];
  const hasTimeFilter = timeOfDay !== 'any';

  // No specific date range → propose next 3 slots
  if (!hadDateRange && daySpan > 7) {
    const next3 = matches.slice(0, 3).map(m => `${m.day} à ${formatTimeFR(m.time)}`);
    if (next3.length === 1) {
      return { summary: `Le prochain créneau c'est ${next3[0]}. C'est ok [breath]?`, level: 'next_slots' };
    }
    return {
      summary: `Le prochain créneau c'est ${next3.join(', puis ')} [breath]`,
      level: 'next_slots',
    };
  }

  // Single day
  if (daySpan === 1) {
    const dayName = matches[0].day;

    if (matches.length === 1) {
      return {
        summary: `${capitalize(dayName)} j'ai uniquement ${formatTimeFR(matches[0].time)}, c'est ok [breath]?`,
        level: 'single_slot',
      };
    }

    if (matches.length <= 3) {
      const heures = matches.map(m => formatTimeFR(m.time)).join(', ');
      const prefix = hasTimeFilter ? `${capitalize(dayName)} ${periodLabel(timeOfDay)}` : capitalize(dayName);
      return {
        summary: `${prefix} j'ai ${heures} [breath].`,
        level: 'hour_list',
      };
    }

    if (hasTimeFilter) {
      const top3 = matches.slice(0, 3).map(m => formatTimeFR(m.time)).join(', ');
      return {
        summary: `${capitalize(dayName)} ${periodLabel(timeOfDay)} j'ai ${top3} [breath].`,
        level: 'hour_list_period',
      };
    }

    const periods = getDayPeriods(matches.map(m => m.time));
    if (periods.length === 1) {
      const top3 = matches.slice(0, 3).map(m => formatTimeFR(m.time)).join(', ');
      return {
        summary: `${capitalize(dayName)} j'ai ${matches.length} créneaux ${periods[0]} : ${top3} [breath].`,
        level: 'hour_list_period',
      };
    }
    return {
      summary: `${capitalize(dayName)} j'ai de la dispo ${periods.join(' et ')} [breath].`,
      level: 'period_choice',
    };
  }

  // 2 days span
  if (daySpan === 2) {
    if (distinctDays.length === 2) {
      const day1 = matches.find(m => m.date === distinctDays[0])!.day;
      const day2 = matches.find(m => m.date === distinctDays[1])!.day;
      return {
        summary: `J'ai de la dispo ${day1} et ${day2} [breath].`,
        level: 'day_choice',
      };
    }
    if (distinctDays.length === 1) {
      const dayMatches = matches.filter(m => m.date === distinctDays[0]);
      if (dayMatches.length <= 3) {
        const heures = dayMatches.map(m => formatTimeFR(m.time)).join(', ');
        return {
          summary: `${capitalize(dayMatches[0].day)} j'ai ${heures} [breath].`,
          level: 'hour_list',
        };
      }
      const periods = getDayPeriods(dayMatches.map(m => m.time));
      return {
        summary: `${capitalize(dayMatches[0].day)} j'ai de la dispo ${periods.join(' et ')} [breath].`,
        level: 'period_choice',
      };
    }
  }

  // 3-7 days span → week zone choice
  if (daySpan >= 3 && daySpan <= 7) {
    return {
      summary: 'Vous préférez début, milieu ou fin de semaine [breath] ?',
      level: 'week_zone_choice',
    };
  }

  // Fallback: list distinct days
  if (distinctDays.length <= 3) {
    const dayNames = distinctDays.map(d => matches.find(m => m.date === d)!.day);
    return {
      summary: `J'ai de la dispo ${dayNames.join(', ')} [breath].`,
      level: 'day_choice',
    };
  }

  return {
    summary: 'Vous préférez début, milieu ou fin de semaine [breath] ?',
    level: 'week_zone_choice',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const timeOfDay = normalizeTimeOfDay((req.query.time_of_day as string) || 'any');
  const window = TIME_WINDOWS[timeOfDay];
  if (!window) return res.status(400).json({ error: `invalid time_of_day. Allowed: ${Object.keys(TIME_WINDOWS).join(', ')}` });

  const limit = Math.min(parseInt((req.query.limit as string) || '5', 10), 50);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const hadDateRange = !!(req.query.from || req.query.to);
  let fromDate = req.query.from ? new Date(req.query.from as string) : today;
  let toDate = req.query.to ? new Date(req.query.to as string) : new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const weekZoneRaw = req.query.week_zone as string | undefined;
  if (weekZoneRaw) {
    const narrowed = applyWeekZone(fromDate, toDate, weekZoneRaw);
    if (narrowed) {
      fromDate = narrowed.from;
      toDate = narrowed.to;
    }
  }

  const sql = getDb();
  const businesses = await sql`SELECT * FROM businesses WHERE slug = ${slug}`;
  if (businesses.length === 0) return res.status(404).json({ error: 'Business not found' });

  const business = businesses[0];
  const hours = business.hours as { days: number[]; start: string; end: string; saturday_end?: string; slot_duration: number; lunch_start?: string; lunch_end?: string };

  const fromYMD = toYMD(fromDate);
  const toYMD_str = toYMD(toDate);
  const confirmedStatus = 'confirmed';
  const bookings = await sql`SELECT date, time FROM bookings WHERE business_id = ${business.id} AND date >= ${fromYMD} AND date <= ${toYMD_str} AND status = ${confirmedStatus}`;

  const bookedByDate = new Map<string, Set<string>>();
  for (const b of bookings as any[]) {
    const dateKey = typeof b.date === 'string' ? b.date : toYMD(new Date(b.date));
    if (!bookedByDate.has(dateKey)) bookedByDate.set(dateKey, new Set());
    bookedByDate.get(dateKey)!.add(b.time);
  }

  const allMatches: { date: string; day: string; time: string }[] = [];
  const cursor = new Date(fromDate);
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const todayYMD = toYMD(new Date());
  let rangeHasOpenDays = false;

  while (cursor <= toDate) {
    const dayOfWeek = cursor.getDay() === 0 ? 7 : cursor.getDay();
    if (hours.days.includes(dayOfWeek)) {
      rangeHasOpenDays = true;
      const dateStr = toYMD(cursor);
      const startM = toMinutes(hours.start);
      const endM = toMinutes(dayOfWeek === 6 && hours.saturday_end ? hours.saturday_end : hours.end);
      const duration = hours.slot_duration;
      const lunchStartM = hours.lunch_start ? toMinutes(hours.lunch_start) : null;
      const lunchEndM = hours.lunch_end ? toMinutes(hours.lunch_end) : null;
      const booked = bookedByDate.get(dateStr) || new Set<string>();

      for (let m = startM; m + duration <= endM; m += duration) {
        if (m < window[0] || m >= window[1]) continue;
        if (dateStr === todayYMD && m <= nowMinutes) continue;
        if (lunchStartM !== null && lunchEndM !== null && m + duration > lunchStartM && m < lunchEndM) continue;
        const t = toHHMM(m);
        if (booked.has(t)) continue;
        allMatches.push({ date: dateStr, day: formatDateFR(cursor), time: t });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  const { summary, level } = buildAdaptiveSummary(allMatches, fromDate, toDate, timeOfDay, hadDateRange, rangeHasOpenDays);
  const limitedMatches = allMatches.slice(0, limit);

  return res.json({
    summary,
    level,
    matches: limitedMatches,
    total: allMatches.length,
    business_name: business.name,
    services: business.services || [],
  });
}
