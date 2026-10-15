/**
 * Kleine, pure formatteer-helpers. Geen imports, geen Date, geen side effects:
 * alles is deterministisch en veilig om tijdens de statische build te draaien.
 */

/** Euro-teken + non-breaking space, zodat '€' en het bedrag nooit afbreken. */
const EURO_PREFIX = '\u20AC\u00A0';

/**
 * Belgische getalnotatie met vaste twee decimalen; de '€ ' zetten we er zelf
 * voor, want `style: 'currency'` geeft per Node/ICU-versie een andere spatie
 * of zet het teken achteraan.
 */
const amountFormatter = new Intl.NumberFormat('nl-BE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Dezelfde notatie zonder decimalen, voor hele bedragen ("€ 15" in plaats van "€ 15,00"). */
const wholeAmountFormatter = new Intl.NumberFormat('nl-BE', {
  maximumFractionDigits: 0,
});

/** Staat er voor een bedrag dat niet klopt. Nooit een verzonnen prijs tonen. */
const NO_AMOUNT = '—';

/**
 * Prijs met euroteken en vaste komma-decimalen.
 * De spatie na het euroteken is een non-breaking space (U+00A0), geen gewone spatie.
 * @example formatPrice(16.5) // '€ ' + '16,50'
 */
export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return NO_AMOUNT;
  return `${EURO_PREFIX}${formatAmount(value)}`;
}

/** Hetzelfde bedrag zonder euroteken. @example formatAmount(16.5) // '16,50' */
export function formatAmount(value: number): string {
  if (!Number.isFinite(value)) return NO_AMOUNT;
  return amountFormatter.format(value);
}

/**
 * Bedrag zonder overbodige nullen: hele euro's zonder decimalen, de rest zoals formatAmount.
 * Voor de studentdeal en zijn sticker. Op de menukaart blijft formatPrice de norm: daar
 * lijnen de prijzen op de komma uit.
 * @example formatAmountCompact(15) // '15'
 * @example formatAmountCompact(15.5) // '15,50'
 */
export function formatAmountCompact(value: number): string {
  if (!Number.isFinite(value)) return NO_AMOUNT;
  return Number.isInteger(value) ? wholeAmountFormatter.format(value) : formatAmount(value);
}

/** Prijs met euroteken, zonder overbodige nullen. @example formatPriceCompact(15) // '€ 15' */
export function formatPriceCompact(value: number): string {
  if (!Number.isFinite(value)) return NO_AMOUNT;
  return `${EURO_PREFIX}${formatAmountCompact(value)}`;
}

/**
 * Telefoonnummer naar een `tel:`-href, Belgische nationale nummers naar +32.
 * @example telHref('056 29 00 31') // 'tel:+3256290031'
 */
export function telHref(phone: string): string {
  // Alles weg behalve cijfers; een '+' mag alleen vooraan blijven staan.
  const digits = phone.replace(/[^0-9]/g, '');
  const international = phone.trim().startsWith('+');
  if (digits.length === 0) return 'tel:';
  if (international) return `tel:+${digits}`;
  // '0032…' is dezelfde internationale notatie met '00' in plaats van '+'.
  if (digits.startsWith('00')) return `tel:+${digits.slice(2)}`;
  // Eén leidende nul = nationaal nummer: 056… -> +3256…
  if (digits.startsWith('0')) return `tel:+32${digits.slice(1)}`;
  // Geen landcode en geen leidende nul: nummer ongewijzigd doorgeven.
  return `tel:${digits}`;
}

/**
 * `mailto:`-href met optioneel onderwerp en body.
 * @example mailtoHref('a@b.c', 'Offerte foodtruck') // 'mailto:a@b.c?subject=Offerte%20foodtruck'
 */
export function mailtoHref(email: string, subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject !== undefined && subject !== '') {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body !== undefined && body !== '') {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${email.trim()}${query}`;
}

/**
 * Google Maps routelink achter elke "Route"-knop.
 * @example mapsUrl({ street: 'Boterstraat 21', postal: '8000', city: 'Ieper' })
 * // 'https://www.google.com/maps/dir/?api=1&destination=Boterstraat%2021%2C%208000%20Ieper%2C%20Belgi%C3%AB'
 */
export function mapsUrl(address: {
  street: string;
  postal: string;
  city: string;
  name?: string;
}): string {
  const parts: string[] = [];
  if (address.name !== undefined && address.name !== '') parts.push(address.name);
  parts.push(address.street, `${address.postal} ${address.city}`, 'Belgi\u00EB');
  const destination = encodeURIComponent(parts.join(', '));
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

/** Zet 'H:MM' om naar 'HH:MM'; onbekende input komt ongewijzigd terug. @example formatTime('9:00') // '09:00' */
export function formatTime(hhmm: string): string {
  const match = /^([0-9]{1,2}):([0-9]{2})$/.exec(hhmm);
  if (match === null) return hhmm;
  const [, hours, minutes] = match; // RegExpExecArray is string[]; beide groepen matchen altijd
  if (Number(minutes) > 59) return hhmm;
  return `${hours.padStart(2, '0')}:${minutes}`;
}

/** URL- en id-veilige slug, zonder accenten en zonder apostrofs. @example slugify("Paul's Boutique") // 'pauls-boutique' */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/['\u2019\u02BC\u02BB]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
