import { useEffect, useState } from 'react';
import { getStatus, type OpenStatusResult, type WeekHours } from '../lib/hours';

/**
 * OpenStatus.tsx — het enige React-island op de site: "is Paul's nu open?".
 *
 * Waarom client-side en niet op de server: een statische build zou het antwoord
 * vastzetten op het moment van bouwen. Dan staat er morgen "Nu open" terwijl de zaak
 * dicht is, en dat is precies de fout die deze site moet oplossen.
 *
 * Server-render is daarom bewust neutraal: "Bekijk openingsuren", zonder data-state,
 * dus met een cream stip (global.css). Nooit per ongeluk een groene stip op een
 * gesloten zaak. Bij het mounten wordt de echte status berekend en daarna elke 60 s
 * opnieuw, zodat de pill ook klopt als iemand de pagina laat openstaan.
 *
 * De tijd komt altijd uit Europe/Brussels (zie lib/hours.ts), niet uit de tijdzone van
 * de bezoeker: een klant in Londen moet zien dat de zaak in Kortrijk om 21:00 sluit.
 *
 * De kleur van de stip staat nooit alleen: het label zegt in woorden wat de staat is.
 */

interface OpenStatusProps {
  /** De weekuren van deze shop. Geen uren = niets tonen, nooit iets verzinnen. */
  hours?: WeekHours;
  /** Extra klassen, bv. "pill" in de hero. */
  className?: string;
}

/** Zolang de echte status niet berekend is, staat hier een neutrale uitnodiging. */
const FALLBACK_LABEL = 'Bekijk openingsuren';
const REFRESH_MS = 60_000;

export default function OpenStatus({ hours, className }: OpenStatusProps) {
  const [status, setStatus] = useState<OpenStatusResult | null>(null);

  useEffect(() => {
    if (!hours) return;

    const update = () => {
      try {
        setStatus(getStatus(hours, new Date()));
      } catch {
        // Een exotische Intl-build kan een onbekende weekdagnaam teruggeven. Dan blijft
        // de neutrale tekst staan: liever geen status dan een verkeerde status.
        setStatus(null);
      }
    };

    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [hours]);

  if (!hours) return null;

  const classes = ['open-status', className].filter(Boolean).join(' ');

  return (
    <span className={classes} data-state={status?.state} aria-live="polite">
      <span className="open-status__dot" aria-hidden="true" />
      <span>{status ? status.label : FALLBACK_LABEL}</span>
    </span>
  );
}
