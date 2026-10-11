// Studentdeal data.
// The word "TODO" must NEVER reach the UI: components render `conditionsLabel`,
// which falls back to neutral wording while the conditions are unconfirmed.
// Do not invent a validity period, an audience or any claim the owner has not confirmed.

export interface DealChoice {
  name: string;
  short: string;
  veggie?: boolean;
}

export interface StudentDeal {
  title: string;
  includes: string;
  price: number;
  choices: DealChoice[];
  conditions: string;
  shops: string[];
}

export const studentDeal: StudentDeal = {
  title: 'Studentdeal',
  includes: 'burger + friet + frisdrank',
  price: 15,
  choices: [
    { name: "Paul's Boutique", short: "Paul's" },
    { name: 'Paris Texas', short: 'Paris Texas' },
    { name: 'Tutu', short: 'Tutu' },
    { name: 'Gepaneerde vis', short: 'Vis' },
    { name: 'Hazelnoot', short: 'Hazelnoot', veggie: true },
  ],
  conditions: 'TODO: voorwaarden bevestigen met de eigenaar', // TODO: geldigheidsperiode en doelgroep/bewijs onbekend
  shops: ['kortrijk-centrum', 'kortrijk-expo'],
};

export const hasConditions: boolean = !studentDeal.conditions.trimStart().startsWith('TODO');

export const conditionsLabel: string = hasConditions
  ? studentDeal.conditions
  : 'Voorwaarden volgen';
