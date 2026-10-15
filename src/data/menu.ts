/**
 * Menu data — transcribed from the paper menu and the wall menu.
 * Current prices, October 2026. All five categories are verified.
 *
 * Prices are plain numbers in euro; formatting (€ 16,50) lives in src/lib/format.ts.
 */

export type MenuTag = 'beef' | 'chicken' | 'fish' | 'lamb' | 'veggie' | 'spicy' | 'cheese';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: MenuTag[];
  favorite?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
  verified: boolean;
}

export interface MenuFilter {
  id: string;
  label: string;
  /** null = "Alles" (geen filter) */
  tags: MenuTag[] | null;
}

const beefburgers: MenuCategory = {
  id: 'beef',
  title: 'Beefburgers',
  verified: true,
  items: [
    { id: 'pauls-boutique', name: "Paul's Boutique", description: 'natuur', price: 12, tags: ['beef'] },
    { id: 'paris-texas', name: 'Paris Texas', description: 'cheese', price: 13, tags: ['beef', 'cheese'] },
    { id: 'sticky-finger', name: 'Sticky Finger', description: 'potato chips', price: 13.5, tags: ['beef'] },
    { id: 'transformer', name: 'Transformer', description: "Paul's bicky", price: 13, tags: ['beef'] },
    { id: 'paris-bacon', name: 'Paris Bacon', description: 'cheese, bacon', price: 15.5, tags: ['beef', 'cheese'] },
    { id: 'mexican', name: 'Mexican', description: 'versgebakken spek, pikant', price: 16, tags: ['beef', 'spicy'] },
    { id: 'sex-pistol', name: 'Sex Pistol', description: 'jalapeño', price: 15, tags: ['beef', 'spicy'] },
    { id: 'hot-marley', name: 'Hot Marley', description: 'spicy homemade sauce', price: 15, tags: ['beef', 'spicy'] },
    { id: 'ecuador', name: 'Ecuador', description: 'pittig sausje met cacaonibs', price: 15.5, tags: ['beef', 'spicy'] },
    { id: 'st-germain', name: 'St. Germain', description: 'geitenkaas, spek', price: 16.5, tags: ['beef', 'cheese'] },
    { id: 'bhoom', name: 'Bhoom', description: 'pikant, chocolade', price: 15, tags: ['beef', 'spicy'] },
    { id: 'godfather', name: 'Godfather', description: 'homemade burger, cheddar', price: 15, tags: ['beef', 'cheese'] },
    { id: 'brazuca', name: 'Brazuca', description: 'zoete aardappel, pittig sausje', price: 16, tags: ['beef', 'spicy'] },
    { id: 'hollywood-with-love', name: 'Hollywood with Love', description: 'gekarameliseerd witloof', price: 15, tags: ['beef'] },
    { id: 'magic-mushroom', name: 'Magic Mushroom', description: 'gebakken champignons', price: 15, tags: ['beef'] },
    { id: 'manifesto', name: 'Manifesto', description: 'ei, bacon', price: 16.5, tags: ['beef'], favorite: true },
    { id: 'italian', name: 'Italian', description: 'parmezaan, pesto', price: 16, tags: ['beef'] },
    { id: 'super-cheese', name: 'Super Cheese', description: '4 kazen', price: 16.5, tags: ['beef', 'cheese'] },
    { id: 'black-angus-catalan', name: 'Black Angus Catalan', description: 'black angus beef', price: 17.5, tags: ['beef'] },
    { id: 'sortino', name: 'Sortino', description: 'mozzarella, basilicum', price: 16, tags: ['beef', 'cheese'] },
    { id: 'voltage', name: 'Voltage', description: 'verse pepersaus', price: 15, tags: ['beef', 'spicy'] },
    { id: 'london-calling', name: 'London Calling', description: 'ei, spek, stilton', price: 16.5, tags: ['beef', 'cheese'] },
  ],
};

const vegetarischeBurgers: MenuCategory = {
  id: 'veggie',
  title: 'Vegetarische burgers',
  verified: true,
  items: [
    { id: 'hazelnoot', name: 'Hazelnoot', price: 13, tags: ['veggie'] },
    { id: 'spinazie', name: 'Spinazie', price: 13, tags: ['veggie'] },
    { id: '4-seizoenen', name: '4-seizoenen', description: 'pesto, parmezaan', price: 14.5, tags: ['veggie', 'cheese'] },
    { id: 'feta', name: 'Feta', description: 'pesto, feta', price: 14.5, tags: ['veggie', 'cheese'] },
    { id: 'cajun', name: 'Cajun', description: 'paprika, spicy', price: 14.5, tags: ['veggie', 'spicy'] },
    { id: 'avocado', name: 'Avocado', price: 14.5, tags: ['veggie'] },
    { id: 'beetroot', name: 'Beetroot', description: 'rode biet', price: 14.5, tags: ['veggie'] },
    { id: 'beyond', name: 'Beyond', description: 'plant-based', price: 14.5, tags: ['veggie'] },
  ],
};

const kipburgers: MenuCategory = {
  id: 'chicken',
  title: 'Kipburgers',
  verified: true,
  items: [
    { id: 'tutu', name: 'Tutu', description: 'verse tartaarsaus, honing, mosterd', price: 12, tags: ['chicken'] },
    { id: 'definitivo', name: 'Definitivo', description: 'Luciano curry', price: 13, tags: ['chicken'] },
    { id: 'tutu-marley', name: 'Tutu Marley', description: 'spicy', price: 15, tags: ['chicken', 'spicy'] },
    { id: 'yantos', name: "Yanto's", description: 'crispy bacon', price: 15.5, tags: ['chicken'] },
    { id: 'normandie', name: 'Normandie', description: 'crispy chicken, camembert', price: 15, tags: ['chicken', 'cheese'] },
    { id: 'tutu-bacon', name: 'Tutu Bacon', description: 'cheese, spek', price: 15.5, tags: ['chicken', 'cheese'] },
    { id: 'mukmuk', name: 'Mukmuk', description: 'gemarineerde kipreepjes, cheddar', price: 15.5, tags: ['chicken', 'cheese'] },
    { id: 'smokey-mukmuk', name: 'Smokey Mukmuk', price: 15.5, tags: ['chicken'] },
    { id: 'manray', name: 'ManRay', description: 'cheese, ei, bacon', price: 16.5, tags: ['chicken', 'cheese'] },
  ],
};

const visburgers: MenuCategory = {
  id: 'fish',
  title: 'Visburgers',
  verified: true,
  items: [
    { id: 'gepaneerde-vis', name: 'Gepaneerde vis met verse tartaar', price: 13, tags: ['fish'] },
    { id: 'moby-dick', name: 'Moby Dick', description: 'spicy, thai', price: 14, tags: ['fish', 'spicy'] },
    { id: 'shrimp', name: 'Shrimp', price: 15, tags: ['fish'] },
  ],
};

const lamsburgers: MenuCategory = {
  id: 'lamb',
  title: 'Lamsburgers',
  verified: true,
  items: [
    { id: 'silence-of-the-superlambs', name: 'Silence of the Superlambs', description: 'muntsaus', price: 15, tags: ['lamb'] },
    { id: 'lam-gods', name: 'Lam Gods', description: 'spicy, koriander', price: 15, tags: ['lamb', 'spicy'] },
  ],
};

export const menu: MenuCategory[] = [
  beefburgers,
  vegetarischeBurgers,
  kipburgers,
  visburgers,
  lamsburgers,
];

export const menuFilters: MenuFilter[] = [
  { id: 'all', label: 'Alles', tags: null },
  { id: 'beef', label: 'Rund', tags: ['beef'] },
  { id: 'chicken', label: 'Kip', tags: ['chicken'] },
  { id: 'fishlamb', label: 'Vis & lam', tags: ['fish', 'lamb'] },
  { id: 'veggie', label: 'Veggie', tags: ['veggie'] },
  { id: 'spicy', label: 'Pikant', tags: ['spicy'] },
  { id: 'cheese', label: 'Kaas', tags: ['cheese'] },
];

/**
 * Upgrade box: belongs under the category with this id in the UI (Beefburgers).
 * The options are rendered as a list; the euro sign and amount are joined by a
 * non-breaking space so a price never wraps apart.
 */
export const upgrade: { category: string; title: string; options: string[] } = {
  category: 'beef',
  title: 'Elke beefburger ook als',
  options: [
    '100% Black Angus +€ 5',
    'Clash: dubbele burger op ciabatta +€ 5',
    'Extra beef of spek € 2,50',
  ],
};

/** The same box as one sentence: 'Elke beefburger ook als: 100% Black Angus +€ 5 · …'. */
export const upgradeNote: string = `${upgrade.title}: ${upgrade.options.join(' · ')}`;

export const menuFootnote: string =
  "Ciabatta's, verse friet, hapjes en drankjes: bekijk alles bij het bestellen.";

export const allergyNote: string = 'Allergie? Vraag het ons, we helpen je graag.';
