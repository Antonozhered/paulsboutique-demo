/**
 * reveal.ts — de enige IntersectionObserver voor alle reveals op de pagina.
 *
 * Alle verborgen startstates staan in motion.css onder `html.js`. Dit bestand doet
 * maar twee dingen: `.is-visible` toevoegen zodra een element in beeld komt, en het
 * element daarna loslaten. Een reveal gebeurt dus exact een keer; terugscrollen
 * verbergt niets opnieuw.
 *
 * Zonder JavaScript wordt `.js` nooit gezet, gelden de startstates niet en staat de
 * pagina gewoon volledig zichtbaar. Zonder IntersectionObserver (oude browser) wordt
 * alles in een keer onthuld. In beide gevallen is er geen onzichtbare content.
 *
 * `prefers-reduced-motion` wordt hier niet afgevangen: motion.css zet elke reveal in
 * dat geval met !important op zijn eindstate, dus de klasse mag gerust gezet worden.
 *
 * Een reveal binnen een andere reveal (de sticker en de bladeren op de dealkaart, het blad
 * op een shopkaart) wordt niet apart geobserveerd: hij gaat mee met zijn ouder en volgt via
 * zijn eigen `--delay`. Apart geobserveerd zou hij kunnen onthullen terwijl de kaart nog
 * onzichtbaar is, zodat de bezoeker de animatie mist. Of nooit, als zijn verkleinde
 * startstate volledig buiten de `overflow: clip` van de kaart valt.
 */

const SELECTOR = '[data-reveal]';
const VISIBLE_CLASS = 'is-visible';

/** Zelfde waarden als in de spec: iets vroeger dan de onderrand, 15% van het element. */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15,
};

/** Onthult een element samen met alle reveals die erin genest zitten. */
function reveal(target: Element): void {
  target.classList.add(VISIBLE_CLASS);
  for (const nested of target.querySelectorAll(SELECTOR)) {
    nested.classList.add(VISIBLE_CLASS);
  }
}

/**
 * Observeert elk `[data-reveal]` binnen `root` en onthult het eenmalig.
 *
 * @param root Zoekwortel, standaard het hele document. Handig om later een
 * dynamisch toegevoegd stuk DOM (bv. een gefilterde menulijst) na te laten reveal'en.
 */
export function initReveal(root: ParentNode = document): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
  if (targets.length === 0) return;

  // Fallback: geen IO -> alles meteen zichtbaar. Nooit content achterlaten.
  if (typeof IntersectionObserver === 'undefined') {
    for (const target of targets) target.classList.add(VISIBLE_CLASS);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target);
      observer.unobserve(entry.target);
    }
  }, OBSERVER_OPTIONS);

  for (const target of targets) {
    // Al zichtbaar aan .is-visible toegevoegd (bv. na een her-init): niet opnieuw observeren.
    if (target.classList.contains(VISIBLE_CLASS)) continue;

    // Genest: de ouder neemt hem mee. Staat die ouder al zichtbaar (bv. bij een her-init
    // op nieuw toegevoegde DOM), dan meteen tonen in plaats van eeuwig te wachten.
    const host = target.parentElement?.closest(SELECTOR);
    if (host) {
      if (host.classList.contains(VISIBLE_CLASS)) target.classList.add(VISIBLE_CLASS);
      continue;
    }

    observer.observe(target);
  }
}
