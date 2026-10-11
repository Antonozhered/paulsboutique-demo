import type { WeekHours } from '../lib/hours';
import { mapsUrl } from '../lib/format';
import kortrijkCentrumImage from '../assets/images/shops/kortrijk-centrum.jpg';

export interface Shop {
  id: string;
  name: string;
  street: string;
  postal: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  email?: string;
  hours?: WeekHours;
  order?: { takeaway?: string; deliveroo?: string };
  mapsUrl: string;
  externalUrl?: string;
  primary: boolean;
  image?: ImageMetadata;
}

/** Een adres staat precies een keer in dit bestand en voedt zowel de velden als de routeknop. */
export interface Adres {
  name: string;
  street: string;
  postal: string;
  city: string;
}

export interface OtherShop {
  id: string;
  name: string;
  street: string;
  postal: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  externalUrl?: string;
  mapsUrl: string;
}

const centrumAdres: Adres = {
  name: "Paul's Kortrijk Centrum",
  street: 'Kleine Sint-Jansstraat 15',
  postal: '8500',
  city: 'Kortrijk',
};

const expoAdres: Adres = {
  name: "Paul's Kortrijk Expo",
  street: 'Doorniksesteenweg 117',
  postal: '8500',
  city: 'Kortrijk',
};

const gentOverpoortAdres: Adres = {
  name: "Paul's Gent Overpoort",
  street: 'Sint-Amandstraat 48',
  postal: '9000',
  city: 'Gent',
};

const gentSintPietersAdres: Adres = {
  name: "Paul's Gent St.-Pieters",
  street: 'Koningin Astridlaan 209',
  postal: '9000',
  city: 'Gent',
};

const antwerpenAdres: Adres = {
  name: "Paul's Antwerpen",
  street: 'Nationalestraat 100',
  postal: '2000',
  city: 'Antwerpen',
};

const ieperAdres: Adres = {
  name: "Paul's Ieper",
  street: 'Boterstraat 21',
  postal: '8000',
  city: 'Ieper',
};

const namurAdres: Adres = {
  name: "Paul's Namur",
  street: 'Rue Notre Dame 118',
  postal: '5000',
  city: 'Namur',
};

const centrumHours: WeekHours = {
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

const expoHours: WeekHours = {
  mon: [],
  tue: [
    ['11:30', '13:30'],
    ['17:30', '21:00'],
  ],
  wed: [
    ['11:30', '13:30'],
    ['17:30', '21:00'],
  ],
  thu: [
    ['11:30', '13:30'],
    ['17:30', '21:00'],
  ],
  fri: [
    ['11:30', '13:30'],
    ['17:30', '21:00'],
  ],
  sat: [],
  sun: [],
};

export const shops: Shop[] = [
  {
    id: 'kortrijk-centrum',
    ...centrumAdres,
    phone: '+3256290031',
    phoneDisplay: '056 29 00 31',
    email: 'paulsboutiquekortrijk@gmail.com',
    hours: centrumHours,
    order: {
      takeaway:
        'https://www.takeaway.com/be/menu/pauls-boutique-1?serviceType=delivery&utm_source=google&utm_medium=organic&utm_campaign=foodorder',
      deliveroo:
        'https://deliveroo.be/nl-be/menu/ghent/kortrijk-centrum/pauls-boutique-kortrijk/?utm_medium=affiliate&utm_source=google_maps_link&fulfillment_type=DELIVERY&utm_campaign=delivery',
    },
    mapsUrl: mapsUrl(centrumAdres),
    primary: true,
    image: kortrijkCentrumImage,
  },
  {
    id: 'kortrijk-expo',
    ...expoAdres,
    phone: '+32496878914',
    phoneDisplay: '0496 87 89 14',
    hours: expoHours,
    order: {
      takeaway:
        'https://www.takeaway.com/be/menu/pauls-boutique-by-yanto?serviceType=delivery&utm_source=google&utm_medium=organic&utm_campaign=foodorder',
      deliveroo:
        'https://deliveroo.be/nl-be/menu/ghent/pottelberg/pauls-boutique-by-yanto/?utm_medium=affiliate&utm_source=google_maps_link&fulfillment_type=DELIVERY&utm_campaign=delivery',
    },
    mapsUrl: mapsUrl(expoAdres),
    primary: true,
  },
];

export const primaryShops: Shop[] = shops.filter((shop) => shop.primary);

export const otherShops: OtherShop[] = [
  {
    id: 'gent-overpoort',
    ...gentOverpoortAdres,
    phone: '+32477823262',
    phoneDisplay: '0477 82 32 62',
    mapsUrl: mapsUrl(gentOverpoortAdres),
  },
  {
    id: 'gent-sint-pieters',
    ...gentSintPietersAdres,
    phone: '+3293350947',
    phoneDisplay: '09 335 09 47',
    externalUrl: 'https://www.paulsboutiquegent.be',
    mapsUrl: mapsUrl(gentSintPietersAdres),
  },
  {
    id: 'antwerpen',
    ...antwerpenAdres,
    phone: '+3235029454',
    phoneDisplay: '03 502 94 54',
    mapsUrl: mapsUrl(antwerpenAdres),
  },
  {
    id: 'ieper',
    ...ieperAdres,
    phone: '+3257445270',
    phoneDisplay: '057 44 52 70',
    mapsUrl: mapsUrl(ieperAdres),
  },
  {
    id: 'namur',
    ...namurAdres,
    phone: '+3281222944',
    phoneDisplay: '081 22 29 44',
    externalUrl: 'https://www.facebook.com/paulsboutiquenamur/',
    mapsUrl: mapsUrl(namurAdres),
  },
];

export function getShop(id: string): Shop | undefined {
  return shops.find((shop) => shop.id === id);
}

export const events: {
  phone: string;
  phoneDisplay: string;
  email: string;
  tacoTruckPhone: string;
  tacoTruckPhoneDisplay: string;
} = {
  phone: '+3256290031',
  phoneDisplay: '056 29 00 31',
  email: 'paulsboutiquekortrijk@gmail.com',
  // zusterbedrijf: de tacotruck van Manuel Kartel
  tacoTruckPhone: '+32475497175',
  tacoTruckPhoneDisplay: '0475 49 71 75',
};

export const reservationsAvailable: boolean = true; // TODO: laten bevestigen door de eigenaar
