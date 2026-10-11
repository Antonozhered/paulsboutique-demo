import { describe, it, expect } from 'vitest';
import {
  DAYS,
  DAY_LABELS_NL,
  DAY_SHORT_NL,
  formatDayRanges,
  getBrusselsParts,
  getStatus,
} from './hours';
import type { WeekHours } from './hours';

/**
 * Alle momenten komen uit expliciete UTC-ISO-strings (…Z), zodat de test
 * onafhankelijk is van de tijdzone van de machine die hem draait.
 */
const at = (iso: string): Date => new Date(iso);

/** De echte week van Paul's Kortrijk Centrum. */
const centrum: WeekHours = {
  mon: [],
  tue: [
    ['11:30', '14:30'],
    ['17:30', '21:00'],
  ],
  wed: [
    ['11:30', '14:30'],
    ['17:30', '21:00'],
  ],
  thu: [
    ['11:30', '14:30'],
    ['17:30', '21:00'],
  ],
  fri: [['11:30', '21:00']],
  sat: [['11:30', '21:00']],
  sun: [],
};

/** Zelfde week, maar vrijdag loopt door tot na middernacht. */
const lateNight: WeekHours = { ...centrum, fri: [['17:30', '01:00']] };

const closedWeek: WeekHours = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};

describe('constanten', () => {
  it('heeft maandag eerst en zeven dagen', () => {
    expect(DAYS).toEqual(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
  });

  it('heeft Nederlandse labels in kleine letters', () => {
    expect(DAY_LABELS_NL.tue).toBe('dinsdag');
    expect(DAY_LABELS_NL.sun).toBe('zondag');
    expect(DAY_SHORT_NL.mon).toBe('ma');
    expect(DAY_SHORT_NL.sat).toBe('za');
  });
});

describe('getBrusselsParts', () => {
  it('leest de Brusselse weekdag en wandklok in de zomertijd (CEST, UTC+2)', () => {
    expect(getBrusselsParts(at('2026-07-10T09:45:00Z'))).toEqual({
      day: 'fri',
      minutes: 11 * 60 + 45,
    });
  });

  it('leest de Brusselse weekdag en wandklok in de wintertijd (CET, UTC+1)', () => {
    expect(getBrusselsParts(at('2026-01-09T20:45:00Z'))).toEqual({
      day: 'fri',
      minutes: 21 * 60 + 45,
    });
  });

  it('leest middernacht als 0 minuten op de dag die dan begint', () => {
    // 2026-10-16T22:00Z is zaterdag 00:00 in Brussel (CEST). Let op: dit dekt NIET
    // de "uur 24"-normalisatie in hours.ts, want 0 % 24 en 24 % 24 geven allebei 0.
    // Node's ICU geeft hier '00'; een engine die '24' geeft zou dezelfde uitkomst
    // opleveren, dus de assertie zegt alleen iets over de dag- en minuutberekening.
    expect(getBrusselsParts(at('2026-10-16T22:00:00Z'))).toEqual({ day: 'sat', minutes: 0 });
  });
});

describe('getStatus', () => {
  it('maandag: gesloten, opent dinsdag', () => {
    // 12:00 Brussel op maandag 12 oktober 2026.
    expect(getStatus(centrum, at('2026-10-12T10:00:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent dinsdag om 11:30',
    });
  });

  it('dinsdag 15:00: gesloten tussen de twee shifts, opent dezelfde dag', () => {
    expect(getStatus(centrum, at('2026-10-13T13:00:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent om 17:30',
    });
  });

  it('dinsdag 13:00: open tijdens de eerste shift', () => {
    expect(getStatus(centrum, at('2026-10-13T11:00:00Z'))).toEqual({
      state: 'open',
      label: 'Nu open · sluit om 14:30',
    });
  });

  it('vrijdag 20:45: sluit bijna', () => {
    expect(getStatus(centrum, at('2026-10-16T18:45:00Z'))).toEqual({
      state: 'closing-soon',
      label: 'Sluit bijna · om 21:00',
    });
  });

  it('zaterdag 22:00: gesloten, de volgende opening is dinsdag', () => {
    expect(getStatus(centrum, at('2026-10-17T20:00:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent dinsdag om 11:30',
    });
  });

  it('een volledig gesloten week geeft alleen "Gesloten"', () => {
    expect(getStatus(closedWeek, at('2026-10-16T18:45:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten',
    });
  });
});

describe('getStatus met een shift over middernacht', () => {
  it('is open net voor middernacht', () => {
    // Vrijdag 23:45 Brussel, shift 17:30–01:00.
    expect(getStatus(lateNight, at('2026-10-16T21:45:00Z'))).toEqual({
      state: 'open',
      label: 'Nu open · sluit om 01:00',
    });
  });

  it('is zaterdag 00:15 nog open op de shift van vrijdag', () => {
    expect(getStatus(lateNight, at('2026-10-16T22:15:00Z'))).toEqual({
      state: 'open',
      label: 'Nu open · sluit om 01:00',
    });
  });

  it('sluit bijna om 00:30, exact 30 minuten voor het einde', () => {
    expect(getStatus(lateNight, at('2026-10-16T22:30:00Z'))).toEqual({
      state: 'closing-soon',
      label: 'Sluit bijna · om 01:00',
    });
  });

  it('is zaterdag 01:30 gesloten en opent dezelfde dag', () => {
    expect(getStatus(lateNight, at('2026-10-16T23:30:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent om 11:30',
    });
  });
});

describe('getStatus en zomer-/wintertijd', () => {
  /**
   * Dezelfde wandklokvraag in twee seizoenen. Een naïeve implementatie die de
   * UTC-uren leest, krijgt beide fout: ze ziet 09:45 (nog gesloten) in de zomer
   * en 20:45 (nog open) in de winter, precies omgekeerd aan de werkelijkheid.
   */
  it('zomertijd: 11:45 CEST is open', () => {
    expect(getStatus(centrum, at('2026-07-10T09:45:00Z'))).toEqual({
      state: 'open',
      label: 'Nu open · sluit om 21:00',
    });
  });

  it('wintertijd: 21:45 CET is gesloten', () => {
    expect(getStatus(centrum, at('2026-01-09T20:45:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent zaterdag om 11:30',
    });
  });
});

describe('getStatus op de grenzen van een shift', () => {
  it('is open op de openingsminuut (start inclusief)', () => {
    // Dinsdag 11:30 Brussel.
    expect(getStatus(centrum, at('2026-10-13T09:30:00Z'))).toEqual({
      state: 'open',
      label: 'Nu open · sluit om 14:30',
    });
  });

  it('sluit bijna exact 30 minuten voor sluitingstijd', () => {
    // Dinsdag 14:00 Brussel.
    expect(getStatus(centrum, at('2026-10-13T12:00:00Z'))).toEqual({
      state: 'closing-soon',
      label: 'Sluit bijna · om 14:30',
    });
  });

  it('is gesloten op de sluitingsminuut (einde exclusief)', () => {
    // Dinsdag 14:30 Brussel.
    expect(getStatus(centrum, at('2026-10-13T12:30:00Z'))).toEqual({
      state: 'closed',
      label: 'Gesloten · opent om 17:30',
    });
  });
});

describe('formatDayRanges', () => {
  it('geeft "Gesloten" voor een dag zonder shifts', () => {
    expect(formatDayRanges([])).toBe('Gesloten');
  });

  it('formatteert één shift', () => {
    expect(formatDayRanges(centrum.fri)).toBe('11:30 – 21:00');
  });

  it('formatteert een gesplitste shift met een middelpunt', () => {
    expect(formatDayRanges(centrum.tue)).toBe('11:30 – 14:30 · 17:30 – 21:00');
  });

  it('vult uren aan tot twee cijfers', () => {
    expect(formatDayRanges([['9:00', '1:30']])).toBe('09:00 – 01:30');
  });
});
