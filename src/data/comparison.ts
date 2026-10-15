/**
 * Data voor /vergelijking: de oude site (2015, Adobe Muse) naast de nieuwe demo.
 * Alleen vaststellingen, geen gemeten cijfers. Elke null hieronder is een TODO; de pagina
 * toont dan "volgt" in plaats van een verzonnen cijfer of een lege plek.
 *
 * Een screenshot invullen: zet het bestand ergens onder src/assets/images/, importeer het
 * bovenaan zoals muralSeating en vul `{ src, alt }` in. De alt-tekst zegt in het Nederlands
 * wat er op de screenshot te zien is.
 */
import muralSeating from '../assets/images/interior/mural-seating.jpg';

export interface CompareImage {
  src: ImageMetadata;
  /** Wat staat er op de afbeelding, in het Nederlands. */
  alt: string;
}

export interface CompareSide {
  note: string;
  seconds: number | null;
  image: CompareImage | null;
}

export interface CompareTask {
  id: string;
  question: string;
  old: CompareSide;
  next: CompareSide;
}

export interface ScoreMetric {
  id: string;
  label: string;
  old: number | null;
  next: number | null;
  max: number;
}

export interface Finding {
  id: string;
  found: string;
  meaning: string;
}

export const intro: { headline: string; lead: string } = {
  headline: 'Je zaak ziet eruit als 2025. Je website als 2015.',
  lead:
    'De website is van 2015 en toont een huisstijl die niet meer bestaat. ' +
    'Het menu en de prijzen zijn verouderd en openingsuren staan er niet op.',
};

export const tasksTitle: string = 'Drie vragen van een hongerige klant';

export const tasks: CompareTask[] = [
  {
    id: 'open-nu',
    question: 'Is Paul\'s nu open?',
    old: {
      note: 'De oude site vermeldt geen openingsuren. De klant moet het elders opzoeken.',
      // TODO: meet hoelang deze taak op de oude site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de oude site bij deze vraag
      image: null,
    },
    next: {
      note: 'De status staat bovenaan de startpagina: nu open, sluit bijna of gesloten.',
      // TODO: meet hoelang deze taak op de nieuwe site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de nieuwe site bij deze vraag
      image: null,
    },
  },
  {
    id: 'bel-de-shop',
    question: 'Bel de shop',
    old: {
      note: 'Het nummer staat als tekst op de pagina en is niet aanklikbaar. Zelf overtypen dus.',
      // TODO: meet hoelang deze taak op de oude site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de oude site bij deze vraag
      image: null,
    },
    next: {
      note: 'Eén tik op "Bel" in de actiebalk start het gesprek.',
      // TODO: meet hoelang deze taak op de nieuwe site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de nieuwe site bij deze vraag
      image: null,
    },
  },
  {
    id: 'prijs-manifesto',
    question: 'Wat kost een Manifesto?',
    old: {
      note: 'De klant leest € 14 op de oude site en hoort in de zaak € 16,50. Hij moet het navragen.',
      // TODO: meet hoelang deze taak op de oude site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de oude site bij deze vraag
      image: null,
    },
    next: {
      note: 'De klant vindt € 16,50 in het menu op de site, dezelfde prijs als op de papieren kaart.',
      // TODO: meet hoelang deze taak op de nieuwe site duurt (seconden)
      seconds: null,
      // TODO: screenshot van de nieuwe site bij deze vraag
      image: null,
    },
  },
];

export const lighthouseTitle: string = 'Lighthouse (mobiel)';

export const lighthouse: ScoreMetric[] = [
  {
    id: 'performance',
    label: 'Performance',
    // TODO: Lighthouse-score (mobiel) van de oude site invullen
    old: null,
    // TODO: Lighthouse-score (mobiel) van de nieuwe site invullen
    next: null,
    max: 100,
  },
  {
    id: 'accessibility',
    label: 'Toegankelijkheid',
    // TODO: Lighthouse-score (mobiel) van de oude site invullen
    old: null,
    // TODO: Lighthouse-score (mobiel) van de nieuwe site invullen
    next: null,
    max: 100,
  },
  {
    id: 'best-practices',
    label: 'Best practices',
    // TODO: Lighthouse-score (mobiel) van de oude site invullen
    old: null,
    // TODO: Lighthouse-score (mobiel) van de nieuwe site invullen
    next: null,
    max: 100,
  },
  {
    id: 'seo',
    label: 'SEO',
    // TODO: Lighthouse-score (mobiel) van de oude site invullen
    old: null,
    // TODO: Lighthouse-score (mobiel) van de nieuwe site invullen
    next: null,
    max: 100,
  },
];

export const identity: {
  title: string;
  caption: string;
  oldImage: CompareImage | null;
  newImage: CompareImage;
} = {
  title: 'Huisstijl',
  caption: 'Wat klanten online zien vs. wat ze in de zaak zien.',
  // TODO: screenshot van de oude site
  oldImage: null,
  newImage: {
    src: muralSeating,
    alt: 'De zaak vandaag: crèmekleurige monsterabladeren op een donkergroene junglemuur, mosterdgele kussens, een groene tegeltafel met kaarsjes en houten krukken',
  },
};

export const findingsTitle: string = 'Wat we vonden → Wat het voor jou betekent';

export const findings: Finding[] = [
  {
    id: 'oude-huisstijl',
    found: 'Website toont een oude huisstijl (toekan, felle kleuren)',
    meaning: 'Je zaak ziet er anders uit dan je website.',
  },
  {
    id: 'verouderde-prijzen',
    found: 'Menu en prijzen zijn verouderd (een Manifesto kost online € 14, in de zaak € 16,50)',
    meaning: 'Klanten zien prijzen die niet kloppen.',
  },
  {
    id: 'studentdeal-ontbreekt',
    found: 'Studentdeal staat nergens online',
    meaning: 'Studenten in Kortrijk weten niet dat hij bestaat.',
  },
  {
    id: 'geen-openingsuren',
    found: 'Geen openingsuren',
    meaning: 'Klanten kiezen de zaak die wél toont dat ze open is.',
  },
  {
    id: 'naam-verschilt',
    found: 'Naam verschilt: website "Paul\'s Boutique", Google "Paul\'s Fresh Food Boutique"',
    meaning: 'Google vertrouwt je gegevens minder.',
  },
  {
    id: 'adobe-muse',
    found: 'Gebouwd in Adobe Muse (stopgezet sinds 2020)',
    meaning: 'Prijzen of uren aanpassen is bijna onmogelijk; de site zegt nog © 2015.',
  },
  {
    id: 'titels-zijn-afbeeldingen',
    found: 'Titels zijn afbeeldingen',
    meaning: 'Google kan niet lezen wat je verkoopt.',
  },
  {
    id: 'niet-responsive',
    found: 'Niet responsive',
    meaning: 'Op veel telefoons is de site klein of kapot.',
  },
  {
    id: 'geen-klikbare-acties',
    found: 'Telefoonnummers niet klikbaar, geen bestelknoppen',
    meaning: 'Klanten moeten moeite doen om te bestellen.',
  },
  {
    id: 'dode-links',
    found: 'Links naar andere shops werken niet',
    meaning: 'Je stuurt klanten naar lege pagina\'s.',
  },
];

export const technicalTitle: string = 'Technische details';

export const technicalDetails: string[] = [
  'jQuery 1.8.3 (2012, bekende beveiligingslekken)',
  'onnodig Gumroad-script',
  'geen viewport meta tag',
  'telefoon-redirect via device sniffing',
  'leesvolgorde klopt niet voor schermlezers (WCAG 1.3.2 / 2.4.3)',
  'anchors uit een template (#portfolio, #services)',
];

export const benefitsTitle: string = 'Wat je krijgt';

export const benefits: string[] = [
  'gevonden worden',
  'meer telefoontjes en bestellingen',
  'studenten over de vloer',
  'een site die eruitziet als je zaak',
  'menu en uren die kloppen',
];
