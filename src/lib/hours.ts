/**
 * Openingsuren: pure functies, geen dependencies, geen side effects.
 * Alles wordt berekend in 'Europe/Brussels' via Intl, nooit in de tijdzone
 * van de bezoeker en nooit met handmatige UTC-offsets (dat breekt op DST).
 */

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

/** ['HH:MM', 'HH:MM'] — een eindtijd <= starttijd loopt over middernacht. */
export type TimeRange = [string, string];

/** Een lege lijst betekent: die dag gesloten. */
export type WeekHours = Record<Day, TimeRange[]>;

export type OpenState = 'open' | 'closing-soon' | 'closed';

export interface OpenStatusResult {
  state: OpenState;
  label: string;
}

export const DAYS: readonly Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const DAY_LABELS_NL: Record<Day, string> = {
  mon: 'maandag',
  tue: 'dinsdag',
  wed: 'woensdag',
  thu: 'donderdag',
  fri: 'vrijdag',
  sat: 'zaterdag',
  sun: 'zondag',
};

export const DAY_SHORT_NL: Record<Day, string> = {
  mon: 'ma',
  tue: 'di',
  wed: 'wo',
  thu: 'do',
  fri: 'vr',
  sat: 'za',
  sun: 'zo',
};

const MINUTES_PER_DAY = 1440;
const CLOSING_SOON_MINUTES = 30;
const SEPARATOR = ' \u00B7 ';
const EN_DASH = '\u2013';

const WEEKDAY_TO_DAY: Readonly<Record<string, Day>> = {
  Mon: 'mon',
  Tue: 'tue',
  Wed: 'wed',
  Thu: 'thu',
  Fri: 'fri',
  Sat: 'sat',
  Sun: 'sun',
};

const brusselsFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Brussels',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * 'HH:MM' -> minuten na middernacht.
 *
 * Gooit bij alles wat geen HH:MM is. Dat is bewust: de openingsuren worden met de
 * hand getypt in src/data/shops.ts en zijn statisch ingebakken bij de build. Stil
 * terugvallen op 0 maakte van een typefout als '1130' een shift van 00:00 tot
 * 24:00 - de zaak leek dan permanent open. Nu valt de build om.
 *
 * @throws {Error} als hhmm niet de vorm H:MM of HH:MM heeft
 */
function toMinutes(hhmm: string): number {
  const match = /^([0-9]{1,2}):([0-9]{2})$/.exec(hhmm);
  if (match === null) {
    throw new Error(`Ongeldige tijd in openingsuren: "${hhmm}" (verwacht HH:MM)`);
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 24 || minutes > 59) {
    throw new Error(`Ongeldige tijd in openingsuren: "${hhmm}" (buiten bereik)`);
  }
  return hours * 60 + minutes;
}

/** 'H:MM' -> 'HH:MM', zonder te wrappen: '24:00' blijft '24:00'. */
function padTime(hhmm: string): string {
  const [hours = '', minutes = ''] = hhmm.split(':');
  return `${hours.padStart(2, '0')}:${minutes}`;
}

/** Minuten na middernacht -> 'HH:MM' (wrapt netjes over middernacht). */
function toLabel(total: number): string {
  const normalized = ((total % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

interface Shift {
  /** De dag waarop de shift begint. */
  readonly day: Day;
  /** Minuten sinds middernacht vandaag (Brussel); kan negatief zijn. */
  readonly startAbs: number;
  readonly endAbs: number;
  readonly startLabel: string;
  readonly endLabel: string;
}

/**
 * Alle shifts van `fromOffset` t.e.m. `toOffset` dagen rond vandaag, op tijd
 * gesorteerd. Offset -1 is nodig omdat een shift van gisteren over middernacht
 * kan lopen en dus vandaag nog open kan zijn.
 */
function collectShifts(
  hours: WeekHours,
  today: Day,
  fromOffset: number,
  toOffset: number,
): Shift[] {
  const todayIndex = DAYS.indexOf(today);
  const shifts: Shift[] = [];
  for (let offset = fromOffset; offset <= toOffset; offset += 1) {
    const index = (((todayIndex + offset) % 7) + 7) % 7;
    const day = DAYS[index] as Day; // index is altijd 0..6 en DAYS heeft 7 entries
    const ranges = hours[day] ?? [];
    for (const [start, end] of ranges) {
      const startMinutes = toMinutes(start);
      const endMinutes = toMinutes(end);
      // Eindtijd <= starttijd: de shift loopt door na middernacht.
      const endSpan = endMinutes <= startMinutes ? endMinutes + MINUTES_PER_DAY : endMinutes;
      shifts.push({
        day,
        startAbs: offset * MINUTES_PER_DAY + startMinutes,
        endAbs: offset * MINUTES_PER_DAY + endSpan,
        startLabel: toLabel(startMinutes),
        endLabel: toLabel(endMinutes),
      });
    }
  }
  return shifts.sort((a, b) => a.startAbs - b.startAbs);
}

/**
 * Brusselse weekdag en wandklok-minuten van een willekeurig moment.
 *
 * @throws {Error} als Intl een onbekende weekdagnaam teruggeeft. In de praktijk
 * onbereikbaar ('Mon'..'Sun' is stabiel in elke ICU-build), maar OpenStatus.tsx
 * rekent dit elke 60 s opnieuw uit: vang het daar af als je het island hard wilt
 * maken tegen een exotische runtime.
 */
export function getBrusselsParts(now: Date): { day: Day; minutes: number } {
  const parts = brusselsFormatter.formatToParts(now);
  let weekday = '';
  let hour = 0;
  let minute = 0;
  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    else if (part.type === 'hour') hour = Number.parseInt(part.value, 10);
    else if (part.type === 'minute') minute = Number.parseInt(part.value, 10);
  }
  const day: Day | undefined = WEEKDAY_TO_DAY[weekday];
  if (day === undefined) {
    throw new Error(`Onbekende weekdag uit Intl: "${weekday}"`);
  }
  // Sommige engines geven middernacht als uur 24 bij hour12: false.
  const safeHour = Number.isFinite(hour) ? hour % 24 : 0;
  const safeMinute = Number.isFinite(minute) ? minute : 0;
  return { day, minutes: safeHour * 60 + safeMinute };
}

export function getStatus(hours: WeekHours, now: Date): OpenStatusResult {
  const { day, minutes } = getBrusselsParts(now);
  // Offset -1 vangt een shift van gisteren die over middernacht loopt. Offset 7 is
  // bewust inclusief: een zaak die maar een dag per week open is, krijgt zo nog een
  // dagnaam ("opent maandag om 11:30") in plaats van een kaal "Gesloten".
  const shifts = collectShifts(hours, day, -1, 7);

  // Start inclusief, einde exclusief.
  const current = shifts.find((shift) => shift.startAbs <= minutes && minutes < shift.endAbs);
  if (current) {
    const remaining = current.endAbs - minutes;
    if (remaining > CLOSING_SOON_MINUTES) {
      return { state: 'open', label: `Nu open${SEPARATOR}sluit om ${current.endLabel}` };
    }
    return { state: 'closing-soon', label: `Sluit bijna${SEPARATOR}om ${current.endLabel}` };
  }

  const next = shifts.find((shift) => shift.startAbs > minutes);
  if (!next) {
    return { state: 'closed', label: 'Gesloten' };
  }
  if (next.startAbs < MINUTES_PER_DAY) {
    return { state: 'closed', label: `Gesloten${SEPARATOR}opent om ${next.startLabel}` };
  }
  return {
    state: 'closed',
    label: `Gesloten${SEPARATOR}opent ${DAY_LABELS_NL[next.day]} om ${next.startLabel}`,
  };
}

/**
 * '11:30 – 14:30 · 17:30 – 21:00', of 'Gesloten' voor een lege dag.
 *
 * Pad alleen, geen modulo: toLabel wrapt op 1440 en zou een eindtijd '24:00'
 * tonen als '00:00'. toMinutes valideert nog wel de vorm.
 */
export function formatDayRanges(ranges: TimeRange[]): string {
  if (ranges.length === 0) return 'Gesloten';
  return ranges
    .map(([start, end]) => {
      toMinutes(start);
      toMinutes(end);
      return `${padTime(start)} ${EN_DASH} ${padTime(end)}`;
    })
    .join(SEPARATOR);
}
