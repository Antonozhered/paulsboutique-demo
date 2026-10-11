# Prompt: Paul's Boutique pitch demo (v3, based on the in-store photos)

# Role
You are a senior front-end developer and UI designer. Build a pitch demo website in one pass. The attached style tile (`REFERENCE-style-tile.png`) is the visual direction: follow its palette, typography, components and mood closely. The rules below win over the image where they disagree. Output every file you create or replace, in full. No explanations between files. No placeholders except the TODOs I marked.

# Context
Paul's Boutique (on Google: "Paul's Fresh Food Boutique") is a burger restaurant in Kortrijk, Belgium, with two shops (Centrum and Expo). Its website dates from 2015 (Adobe Muse) and shows a brand that no longer exists: a toucan, neon colors, 3D headlines, an old menu with old prices, no opening hours.

The real shop today (see the style tile, which was made from my own photos):
- dark bottle-green painted walls and an almost black jungle mural with flat leaves in cream, peach and olive, plus a big gold sun badge with the chef logo
- mustard velvet cushions, blue-green glazed tile tables, burnt wooden stools, candles, gold round mirrors, pampas grass
- a dark botanical wallpaper wall, plants and green picnic tables on the terrace outside
- a cream wood-grain paper menu with typewriter-style item names and condensed bold labels
- the window says: "Dagverse hamburgers · ciabatta's · fruitsappen · Groot aanbod vegetarisch!"
- a hand-written whiteboard with a **student deal** next to the counter
- a bit of street/rock & roll edge and humor in the details

Mood in one line: **eating in a warm, candle-lit jungle, with a wink.** Dark and warm, never neon, never childish.

I'm a design & development student. This demo is a private concept to show the owner on my phone. NOT production, never indexed.

Goals the demo must make visible:
1. Get found: semantic HTML, structured data, speed.
2. Convert: one tap to order, call or get directions.
3. Real-time: is the shop open right now?
4. The website finally looks like the real shop.
5. Students in Kortrijk see the student deal immediately.
6. It feels premium: smooth, restrained motion.

# Stack
**The project is already scaffolded** (Astro minimal template, TypeScript strict, `@astrojs/react`, fonts and Vitest installed). Do not output `package.json`, `tsconfig.json` or lockfiles. Only output the files you create or replace, plus the exact `astro.config.mjs` and the `"test": "vitest run"` script line.

- Astro (latest stable), TypeScript (strict), static output.
- `@astrojs/react` for one island only (`OpenStatus.tsx`).
- Plain CSS with custom properties. No Tailwind, no UI libraries, no animation libraries (no GSAP, no Framer Motion, no Lenis).
- Fonts via @fontsource, only the weights used:
  - `@fontsource/alfa-slab-one` → display headings (echoes the logo and the window lettering)
  - `@fontsource-variable/oswald` → labels, eyebrows, chips, marquee (echoes the menu board)
  - `@fontsource/courier-prime` 700 → menu item names (echoes the paper menu)
  - `@fontsource-variable/dm-sans` → body text
  - `@fontsource-variable/caveat` → ONLY the "The Original" sticker (echoes the script on the paper menu's round sticker). NOT in the student deal.
- Vitest for `src/lib/hours.ts` only.
- Zero client JS by default. Allowed JS: `OpenStatus.tsx`, `src/lib/reveal.ts`, and small inline `<script>`s for: mobile nav, active section indicator, menu filter, order sheet, marquee pause button.

# Project tree (use exactly)
```
paulsboutique-demo/
├─ public/
│  ├─ favicon.svg
│  └─ robots.txt                      # User-agent: * / Disallow: /
├─ reference/                         # pitch material, NOT imported by the site
├─ src/
│  ├─ assets/
│  │  ├─ images/
│  │  │  ├─ logo.png                  # 263×307, old vertical logo (placeholder until vector)
│  │  │  ├─ hero-burger.jpg           # 2000×875, real burger on orange plates
│  │  │  ├─ shops/kortrijk-centrum.jpg
│  │  │  ├─ textures/wood-cream.jpg    # cream wood-grain, same as the paper menu (1024×1536)
│  │  │  └─ interior/
│  │  │     ├─ mural-logo.jpg         # mural with the gold sun badge
│  │  │     ├─ mural-seating.jpg      # cream monstera, mustard cushions, tile table
│  │  │     ├─ mirror-room.jpg
│  │  │     ├─ botanical-wall.jpg
│  │  │     ├─ corridor.jpg
│  │  │     ├─ terras.jpg             # plants + green picnic tables outside
│  │  │     ├─ signage.jpg
│  │  │     └─ window-lettering.jpg
│  │  └─ svg/                         # my own flat leaf illustrations, colors already correct
│  │     ├─ leaves-monstera-palm.svg  # peach monstera + palm, 445×270
│  │     ├─ leaves-palm-monstera.svg  # palm + peach monstera
│  │     ├─ leaves-philodendron.svg   # cream ribbed leaf + palm
│  │     └─ leaves-banana-outline.svg # banana leaf + cream outline leaf
│  ├─ components/
│  │  ├─ BaseHead.astro
│  │  ├─ Header.astro
│  │  ├─ Hero.astro
│  │  ├─ OriginalSticker.astro
│  │  ├─ OpenStatus.tsx
│  │  ├─ OrderSheet.astro
│  │  ├─ StudentDeal.astro
│  │  ├─ Sticker.astro                # round orange sticker, used for € 15 and "The Original"
│  │  ├─ MenuSection.astro
│  │  ├─ MenuItem.astro
│  │  ├─ Atmosphere.astro             # interior photo strip + Google reviews link
│  │  ├─ ShopCard.astro
│  │  ├─ HoursTable.astro
│  │  ├─ OtherShops.astro
│  │  ├─ Events.astro
│  │  ├─ Footer.astro
│  │  ├─ ActionBar.astro
│  │  ├─ ConceptBadge.astro
│  │  ├─ JsonLd.astro
│  │  ├─ Leaves.astro                 # positions one leaf SVG as decoration
│  │  ├─ SplitText.astro
│  │  ├─ Marquee.astro
│  │  └─ comparison/
│  │     ├─ TaskCompare.astro
│  │     ├─ ScoreBars.astro
│  │     └─ FindingsTable.astro
│  ├─ data/
│  │  ├─ brand.ts
│  │  ├─ shops.ts
│  │  ├─ menu.ts
│  │  ├─ deals.ts
│  │  └─ comparison.ts
│  ├─ lib/
│  │  ├─ hours.ts
│  │  ├─ hours.test.ts
│  │  ├─ format.ts
│  │  └─ reveal.ts
│  ├─ layouts/BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ vergelijking.astro
│  └─ styles/
│     ├─ tokens.css
│     ├─ global.css
│     └─ motion.css
├─ astro.config.mjs
└─ README.md
```

# Design tokens (`src/styles/tokens.css`), copy exactly
Colors are sampled from the shop and from my leaf illustrations.
```css
:root {
  /* surfaces */
  --c-jungle: #14221A;   /* darkest: mural background. Default page background */
  --c-bottle: #24432F;   /* painted walls. Secondary dark sections */
  --c-cream:  #FBE8CD;   /* mural leaves + paper menu. Light sections, text on dark */
  --c-paper:  #FFF8EC;   /* student deal whiteboard card only */
  /* leaves (decoration, badges) */
  --c-olive:  #3C5332;
  --c-moss:   #576A3E;
  --c-sage:   #A2A868;   /* eyebrows on dark, open-status dot */
  --c-peach:  #EEBF96;   /* monstera. Second headline color on dark */
  /* accents */
  --c-mustard:#C9A23A;   /* velvet cushions. Labels on dark, tape on the deal card */
  --c-tile:   #4F7D78;   /* tile tables. Small accents only, never text background */
  --c-orange: #EB7A3A;   /* orange plates. Primary actions + sticker ONLY */
  --c-ink:    #1B1B18;   /* text on paper */

  --font-display: 'Alfa Slab One', Rockwell, serif;
  --font-label: 'Oswald Variable', 'Arial Narrow', sans-serif;
  --font-menu: 'Courier Prime', 'Courier New', monospace;
  --font-body: 'DM Sans Variable', system-ui, sans-serif;
  --font-hand: 'Caveat Variable', cursive;

  --step--1: clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem);
  --step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --step-2: clamp(1.6rem, 1.4rem + 1vw, 2.2rem);
  --step-3: clamp(2.4rem, 1.9rem + 2.4vw, 3.8rem);
  --step-4: clamp(3.4rem, 2.4rem + 5vw, 6.5rem);

  --space-xs: 0.5rem; --space-s: 1rem; --space-m: 1.5rem;
  --space-l: 2.5rem; --space-xl: 4rem; --space-2xl: 6rem;
  --radius-s: 6px; --radius-m: 14px; --radius-l: 22px; --radius-pill: 999px;
  --tap: 48px;
  --container: 72rem;
  --gutter: 16px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Verified contrast pairs (use these, they pass WCAG AA):
cream on jungle 13.8 · cream on bottle 9.1 · peach on jungle 9.8 · sage on jungle 6.6 · mustard on jungle 6.8 · jungle on cream 13.8 · jungle on orange 5.8 · olive on cream 7.1.
**Never put white or cream text on orange** (fails). Buttons on orange use jungle text.

Rules:
- Dark-first site: jungle is the default background, bottle for alternating dark sections, cream for the menu section only (it's the paper menu). Max these 3 section backgrounds on the homepage, plus the orange marquee bands.
- Headlines: Alfa Slab One, sentence case, tight leading (0.95). Second line or key word may be peach. No 3D, no text-shadow extrusions, no all-caps slab.
- Labels/eyebrows/chips/marquee: Oswald, uppercase, letter-spacing 0.08–0.14em.
- Menu item names: Courier Prime 700. Descriptions and prices: DM Sans. Prices `tabular-nums`, right-aligned with a dotted leader on ≥ 360px.
- Caveat ONLY in `OriginalSticker`.
- Leaves: use MY four SVGs from `src/assets/svg/` (do not draw new ones, do not recolor them). Render them through `Leaves.astro` as `<img src={…} alt="" aria-hidden="true" loading="lazy" decoding="async">` (except in the hero: `loading="eager"`). Do not inline them (they are ~45 KB each). Place them at section edges and corners, rotated and partly cropped by the section (`overflow: clip` on the section), behind content (`z-index`), never behind body text or prices. Max 2 leaf groups per section, max 6 on the homepage.
- Photos: rounded `--radius-l`, `object-fit: cover`. Use `astro:assets` `<Image>`/`<Picture>` with avif + webp and real Dutch alt text.
- Body text min 16px. Touch targets ≥ 48px. Visible `:focus-visible` (2px mustard outline, 3px offset). Works at 320px, no horizontal page scroll, 16px gutters.

# Copy
Dutch (`lang="nl-BE"`). Warm, short, a bit cheeky. Use the shop's own words where possible ("Dagverse burgers", "Groot aanbod vegetarisch", "Bel & bestel"). Don't invent claims: no "beste burgers", no founding year, no review quotes, no ingredient or allergen claims beyond the menu text.

# `src/data/brand.ts`
```ts
export const brand = {
  name: "Paul's Fresh Food Boutique",
  tagline: 'Dagvers · groot aanbod vegetarisch · rock & roll',
  menuUpdated: 'oktober 2026',
  googleReviewsUrl: `https://www.google.com/maps/place/Paul's+Fresh+Food+Boutique/@50.8265022,3.2708378,262m/data=!3m1!1e3!4m8!3m7!1s0x47c33b1c1442815f:0x8e481ffa2239969e!8m2!3d50.8267479!4d3.2716573!9m1!1b1!16s%2Fg%2F1pp2vjp6x?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D`,
  conceptBy: 'Anton',
};
```

# `src/data/shops.ts`
```ts
type Range = [string, string]; // "HH:MM"
type Day = 'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun';
interface Shop {
  id: string; name: string; street: string; postal: string; city: string;
  phone: string; phoneDisplay: string; email?: string;
  hours?: Record<Day, Range[]>;            // [] = closed
  order?: { takeaway?: string; deliveroo?: string };
  mapsUrl: string;                         // build from address
  externalUrl?: string;
  primary: boolean;
  image?: ImageMetadata;
}
```
Primary:
- `kortrijk-centrum` · Paul's Kortrijk Centrum · Kleine Sint-Jansstraat 15, 8500 Kortrijk · +3256290031 / 056 29 00 31 · paulsboutiquekortrijk@gmail.com · image `shops/kortrijk-centrum.jpg`
  hours: mon [] · tue/wed/thu [["11:30","14:30"],["17:30","21:00"]] · fri/sat [["11:30","21:00"]] · sun []
  order: takeaway https://www.takeaway.com/be/menu/pauls-boutique-1?serviceType=delivery&utm_source=google&utm_medium=organic&utm_campaign=foodorder, deliveroo https://deliveroo.be/nl-be/menu/ghent/kortrijk-centrum/pauls-boutique-kortrijk/?utm_medium=affiliate&utm_source=google_maps_link&fulfillment_type=DELIVERY&utm_campaign=delivery
- `kortrijk-expo` · Paul's Kortrijk Expo · Doorniksesteenweg 117, 8500 Kortrijk · +32496878914 / 0496 87 89 14 · no image (render the card without photo, with a leaf instead)
  hours: mon [] · tue/wed/thu/fri [["11:30","13:30"],["17:30","21:00"]] · sat [] · sun [], · order: takeaway https://www.takeaway.com/be/menu/pauls-boutique-by-yanto?serviceType=delivery&utm_source=google&utm_medium=organic&utm_campaign=foodorder, deliveroo (https://deliveroo.be/nl-be/menu/ghent/pottelberg/pauls-boutique-by-yanto/?utm_medium=affiliate&utm_source=google_maps_link&fulfillment_type=DELIVERY&utm_campaign=delivery)

Other Paul's (list only):
- Gent Overpoort · Sint-Amandstraat 48, 9000 Gent · +32477823262
- Gent St.-Pieters · Koningin Astridlaan 209, 9000 Gent · +3293350947 · https://www.paulsboutiquegent.be
- Antwerpen · Nationalestraat 100, 2000 Antwerpen · +3235029454
- Ieper · Boterstraat 21, 8000 Ieper · +3257445270
- Namur · Rue Notre Dame 118, 5000 Namur · +3281222944 · https://www.facebook.com/paulsboutiquenamur/

Events: tel +3256290031 · paulsboutiquekortrijk@gmail.com. Sister brand Manuel Kartel's taco truck: +32475497175.
Reservations: yes, for the demo, the owner will later confirm if true

# `src/data/menu.ts` (current prices, October 2026)
Type: `{ id, name, description?, price, tags: ('beef'|'chicken'|'fish'|'lamb'|'veggie'|'spicy'|'cheese')[], favorite?: boolean }`, grouped in categories `{ id, title, items, verified: boolean }`.

**Beefburgers** (verified, paper menu):
Paul's Boutique (natuur) 12,00 · Paris Texas (cheese) 13,00 · Sticky Finger (potato chips) 13,50 · Transformer (Paul's bicky) 13,00 · Paris Bacon (cheese, bacon) 15,50 · Mexican (versgebakken spek, pikant) 16,00 · Sex Pistol (jalapeño) 15,00 · Hot Marley (spicy homemade sauce) 15,00 · Ecuador (pittig sausje met cacaonibs) 15,50 · St. Germain (geitenkaas, spek) 16,50 · Bhoom (pikant, chocolade) 15,00 · Godfather (homemade burger, cheddar) 15,00 · Brazuca (zoete aardappel, pittig sausje) 16,00 · Hollywood with Love (gekarameliseerd witloof) 15,00 · Magic Mushroom (gebakken champignons) 15,00 · Manifesto (ei, bacon) 16,50 [favorite] · Italian (parmezaan, pesto) 16,00 · Super Cheese (4 kazen) 16,50 · Black Angus Catalan (black angus beef) 17,50 · Sortino (mozzarella, basilicum) 16,00 · Voltage (verse pepersaus) 15,00 · London Calling (ei, spek, stilton) 16,50

Upgrade box under Beefburgers: "Elke beefburger ook als: 100% Black Angus +€ 5 · Clash: dubbele burger op ciabatta +€ 5 · Extra beef of spek € 2,50"

**Vegetarische burgers** (verified, paper menu):
Hazelnoot 13,00 · Spinazie 13,00 · 4-seizoenen (pesto, parmezaan) 14,50 · Feta (pesto, feta) 14,50 · Cajun (paprika, spicy) 14,50 · Avocado 14,50 · Beetroot (rode biet) 14,50 · Beyond (plant-based) 14,50

**Kipburgers** (verified, read from a wall photo):
Tutu (verse tartaarsaus, honing, mosterd) 12,00 · Definitivo (Luciano curry) 13,00 · Tutu Marley (spicy) 15,00 · Yanto's (crispy bacon) 15,50 · Normandie (crispy chicken, camembert) 15,00 · Tutu Bacon (cheese, spek) 15,50 · Mukmuk (gemarineerde kipreepjes, cheddar) 15,50 · Smokey Mukmuk 15,50 · ManRay (cheese, ei, bacon) 16,50

**Visburgers** (verified): Gepaneerde vis met verse tartaar 13,00 · Moby Dick (spicy, thai) 14,00 · Shrimp 15,00

**Lamsburgers** (verified): Silence of the Superlambs (muntsaus) 15,00 · Lam Gods (spicy, koriander) 15,00

Tag spicy: Mexican, Sex Pistol, Hot Marley, Ecuador, Bhoom, Brazuca, Voltage, Cajun, Tutu Marley, Moby Dick, Lam Gods. Tag cheese: Paris Texas, Paris Bacon, Godfather, Super Cheese, Sortino, St. Germain, London Calling, 4-seizoenen, Feta, Normandie, Tutu Bacon, Mukmuk, ManRay.

Below the menu: "Ciabatta's, verse friet, hapjes en drankjes: bekijk alles bij het bestellen." + a "Bestel" button (opens OrderSheet). And: "Allergie? Vraag het ons, we helpen je graag." with a tel: link.
Show "Menu bijgewerkt: {brand.menuUpdated}". "Favoriet" and "Veggie" are visible text badges (orange/jungle and moss/cream as in the tile), never color alone.

# `src/data/deals.ts`
```ts
export const studentDeal = {
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
  conditions: '"Op vertoon van je studentenkaart · enkel ter plaatse/afhalen · beide Kortrijkse shops" make it up',
  shops: ['kortrijk-centrum'], ['kortirijk-expo']
};
```

# `StudentDeal.astro` (section `#studentdeal`, bottle background)
The second section, right after the hero. The real shop announces the deal on a hand-written whiteboard (`REFERENCE-studentdeal-board.jpg`, facts only). Online it gets a **designed promo card in the brand's own language**, exactly like the paper menu: cream wood-grain, leaves at the edges, an orange round sticker, real typography. Follow `REFERENCE-studentdeal-design.png` closely (mobile 390px and desktop).
- Section: eyebrow "Voor studenten" (Oswald, sage) above the card.
- Card: `--radius-l`, background = `textures/wood-cream.jpg` (`background-size: cover`, fallback color `#EBDECA`), soft shadow, a 1.5px inner outline inset 8px in jungle at 20% opacity (like a printed menu border), `overflow: clip`.
- Leaves via `Leaves.astro`, inside the card, cropped by its edges: `leaves-monstera-palm` top-right, `leaves-banana-outline` bottom-left (smaller on mobile). They sit behind all content and must never overlap the title, the pills or the small print (shift or shrink them if needed).
- Content, left to right / top to bottom: `logo.png` (64px high), H2 "Studentdeal" (Alfa Slab One, jungle, 50px on mobile, 76px desktop on two lines via a soft hyphen: Student-deal), line "Burger • Friet • Frisdrank" (Oswald uppercase 600, letter-spacing .08em, the bullets are small orange leaf shapes), then "Kies je burger" (Oswald uppercase heading with a 2px jungle underline) and the choices from `deals.ts` as pill chips (Courier Prime 700, 1.5px jungle border, cream 80% fill; Hazelnoot gets the "Veggie" badge), then `conditions` (DM Sans 14px), then buttons "Route naar Paul's" (primary orange, jungle text) and "Bel" (ghost with jungle border).
- `Sticker.astro` (reused for `OriginalSticker`): round, orange, jungle text, dashed inner ring (1.5px, jungle 40%), rotated 10deg, small drop shadow. In the deal: "€15" (Alfa Slab One) over "ALLES SAMEN" (Oswald uppercase, tiny). Mobile: top-right of the card, 98px, overlapping the monstera. Desktop: 150px, placed in the free space to the right of the logo, never touching the title. Never use Caveat here.
- Desktop ≥ 900px: two columns inside the card (title block left, choices + buttons right).
- If `conditions` still starts with "TODO", render "Voorwaarden volgen". Never show the word TODO. Do NOT write claims like "elke dag", "alleen voor", or any period/validity, I don't know them yet.
- Do not add an online order button: the deal is shown as it works in the shop.
- Accessibility: the card is `<section aria-labelledby>`; the H2 is real text; the sticker is decorative text that duplicates the price, so give the visually complete sentence in `.sr-only`: "Studentdeal: burger, friet en frisdrank voor 15 euro".
- Contrast: jungle text on the cream wood is 12+:1. Keep text out of the darker wood stripes' busiest areas only by using the texture at its natural contrast (do not darken it).
- Also add a small "Studentdeal € 15" pill in the hero under the status that links to `#studentdeal`.
- Motion: the card does a `scale` reveal; the sticker does a `pop` reveal 400ms later and settles at its 10deg rest rotation (`--rest-rotate: 10deg`); the leaves `grow` from their corners. Hover: sticker wiggles once.

# `src/lib/hours.ts`
Pure functions, tested in `hours.test.ts`:
- Compute in `Europe/Brussels` via `Intl.DateTimeFormat` (never the visitor's timezone).
- Split shifts, closed days, ranges past midnight.
- `getStatus(hours, now)` → `{ state: 'open'|'closing-soon'|'closed', label }`:
  "Nu open · sluit om 21:00" · "Sluit bijna · om 21:00" (≤ 30 min) · "Gesloten · opent om 17:30" · "Gesloten · opent dinsdag om 11:30".
- Tests: Monday, Tuesday 15:00, Friday 20:45, Saturday 22:00, a past-midnight range, a DST date.

# `OpenStatus.tsx`
Server-renders "Bekijk openingsuren", computes on mount, updates every 60 s, `aria-live="polite"`, dot + text (sage dot = open, mustard = closing soon, peach = closed), never color alone. No `hours` → render nothing.

# Homepage `/` (section order)
1. **Header** (jungle, sticky, becomes `--c-jungle` at 92% with `backdrop-filter: blur(8px)` after scrolling): logo (accessible name "{brand.name} – home"), nav Menu · Studentdeal · Shops · Events · Contact. Mobile: round 48px toggle with `aria-expanded`/`aria-controls`, full-screen jungle overlay menu with large Alfa Slab links and one leaf group, closes on link click and Escape, focus returns to the toggle. Active section via IntersectionObserver (`aria-current="true"`).
2. **Hero** (jungle): OpenStatus pill, student deal pill, H1 "Honger? Wij ook." (`SplitText`, "Wij ook." in peach), tagline (Oswald, sage), `hero-burger.jpg` in a rounded frame, `OriginalSticker` (orange circle, Caveat "The Original", rotated 12deg, overlapping the photo's top-right corner), buttons "Bestel" (primary, opens OrderSheet) and "Bekijk het menu" (ghost). Leaves: `leaves-monstera-palm` top-right, `leaves-banana-outline` bottom-left. Desktop ≥ 1024px: two columns (text left, photo right).
3. **Marquee** (orange): Manifesto · Hot Marley · London Calling · Moby Dick · Bhoom · Magic Mushroom · Beyond.
4. **StudentDeal** `#studentdeal` (bottle).
5. **Menu** `#menu` (cream, paper feel): H2 "Onze burgers", chips Alles · Rund · Kip · Vis & lam · Veggie · Pikant · Kaas (horizontally scrollable row on mobile, no visible scrollbar, `scroll-snap`). Progressive enhancement: without JS all categories show and chips are hidden; with JS, chips are `<button aria-pressed>` filtering by tag, with a short fade between states. Category headings are `<h3>` (Oswald, olive, underline rule). Max 2 columns on ≥ 900px.
6. **Atmosphere** (jungle): H2 "Eten in de jungle", one sentence of copy (candles, mural, green picnic tables on the terrace), then a photo strip: `mural-logo`, `mural-seating`, `mirror-room`, `terras` (horizontal scroll-snap row on mobile with the next photo peeking, 4-column grid on desktop, alternating slight rotations ±1.5deg). Button "Lees de reviews op Google". No review quotes.
7. **Shops** `#shops` (bottle): `ShopCard` per primary shop (photo or leaf, address, OpenStatus, `HoursTable` real `<table>` with today's row highlighted + "vandaag", buttons Bel · Route · Bestel). Below: `OtherShops` simple list.
8. **Marquee** (orange, reversed direction): Bel & bestel · 056 29 00 31 · Dagvers · Groot aanbod vegetarisch · The Original.
9. **Events** `#events` (jungle): H2 "Burgers on the move", copy about the food truck at parties and company events, CTA "Vraag een offerte" (mailto, subject "Offerte foodtruck") + phone. No image for now (TODO: van photo from the owner): use `leaves-philodendron` and a large outlined Oswald "ON THE MOVE" as decoration. One small line about Manuel Kartel's taco truck with tel link.
10. **Footer** `#contact` (jungle, top border sage 1px): logo, address, tel/mailto, Google reviews link, "© {current year} {brand.name}", `ConceptBadge` "Concept door Anton · geen officiële website".

# OrderSheet
Native `<dialog>` + `showModal()`, title "Hoe wil je bestellen?", options in order: "Bel & haal af" (tel:, subtitle "Snelst. Rechtstreeks bij ons."), "Takeaway.com", "Deliveroo" (external, `rel="noopener"`). Hide options without URL. Closes on Escape, backdrop click and a close button; focus returns to the trigger. On mobile it slides up as a bottom sheet (transform, 300ms, `--ease-out`); on desktop a centered card.

# ActionBar (mobile < 768px)
Fixed bottom bar on bottle: Bestel (orange) · Bel · Route, icon + label, min 56px high, `env(safe-area-inset-bottom)`, body bottom padding so nothing hides. Slides in after the hero CTA leaves the viewport (IntersectionObserver), always visible under reduced motion. Hidden on `/vergelijking`.

# Motion (`src/styles/motion.css` + `src/lib/reveal.ts`)
Premium, calm, matching a relaxed candle-lit place. Soft ease-out, no bounces, no parallax scroll-jacking.
- In `BaseHead`: `<script is:inline>document.documentElement.classList.add('js')</script>` as early as possible. Hidden start states only apply under `.js`, so content is visible without JS.
- `[data-reveal]` variants: `up` (opacity 0, translateY(32px)), `scale` (opacity 0, scale(.92)), `pop` (opacity 0, scale(.6) rotate(-20deg)), `grow` (scale(.4) rotate(-12deg), no opacity, for leaves growing from their `transform-origin` corner). Transition 0.7s opacity / 0.9s transform `--ease-out`, `transition-delay: var(--delay, 0ms)`. `.is-visible` resets to the element's rest state (for rotated cards, use a `--rest-rotate` variable).
- `reveal.ts`: one IntersectionObserver (`rootMargin: '0px 0px -10% 0px'`, threshold .15), adds `.is-visible` once and unobserves. Fallback: no IO → reveal all.
- `SplitText.astro`: props `text`, `as` (h1/h2/h3/p), `class`, `delay`, `highlight` (words to wrap in a peach span). Renders the full text in `.sr-only` and an `aria-hidden` copy split into words, each word in an `overflow: hidden` mask, word slides up from `translateY(110%) rotate(4deg)` with 60ms stagger. Use on the H1 and every section H2.
- Hero: H1 split reveal, sticker `pop` at 500ms delay, leaves `grow`, hero photo starts at `scale(1.06)` → 1 **transform only, no opacity** (it's the LCP element).
- Lists: menu items, shop cards, atmosphere photos `up` with `--delay: calc(var(--i) * 80ms)`, stagger capped at 6.
- Leaves sway with scroll as progressive enhancement: `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference` → `rotate` from -6deg to 6deg over `view()`. Use the individual `rotate` property so it combines with the reveal transform.
- Hover (only `@media (hover: hover)`): buttons scale 1.03, sticker wiggles once, photos scale 1.04 inside their frame.
- `Marquee.astro`: props `items`, `duration` (default 40s), `reverse`. Two identical `<ul>` groups in a `max-content` track animating `translateX(-50%)` linear infinite; a small Oswald dot/leaf separator; pauses on `:hover` AND via a visible 48px pause/play button (`aria-pressed`, `aria-label="Pauzeer animatie"`), WCAG 2.2.2. Visual track `aria-hidden`; one `.sr-only` sentence lists the items. Each group must be wider than 1440px (repeat items if needed).
- `prefers-reduced-motion: reduce`: everything visible immediately, no transitions, marquee static, pause button hidden, no leaf sway.
- Never animate: OpenStatus, prices, ActionBar contents, OrderSheet options, HoursTable.

# `/vergelijking` (comparison page)
Calm layout on cream, Dutch. Data from `comparison.ts`.
1. Intro: "Je zaak ziet eruit als 2025. Je website als 2015."
2. "Drie vragen van een hongerige klant": "Is Paul's nu open?", "Bel de shop", "Wat kost een Manifesto?". Two columns "Oude site" / "Nieuwe site" with an image slot (TODO) and seconds (TODO).
3. "Lighthouse (mobiel)": four metrics, old vs new bars with numbers as text (TODO).
4. "Huisstijl": side by side, an image slot for the old site screenshot (TODO) and `mural-seating.jpg`; caption "Wat klanten online zien vs. wat ze in de zaak zien."
5. FindingsTable "Wat we vonden → Wat het voor jou betekent":
   - Website toont een oude huisstijl (toekan, felle kleuren) → Je zaak ziet er anders uit dan je website.
   - Menu en prijzen zijn verouderd (een Manifesto kost online € 14, in de zaak € 16,50) → Klanten zien prijzen die niet kloppen.
   - Studentdeal staat nergens online → Studenten in Kortrijk weten niet dat hij bestaat.
   - Geen openingsuren → Klanten kiezen de zaak die wél toont dat ze open is.
   - Naam verschilt: website "Paul's Boutique", Google "Paul's Fresh Food Boutique" → Google vertrouwt je gegevens minder.
   - Gebouwd in Adobe Muse (stopgezet sinds 2020) → Prijzen of uren aanpassen is bijna onmogelijk; de site zegt nog © 2015.
   - Titels zijn afbeeldingen → Google kan niet lezen wat je verkoopt.
   - Niet responsive → Op veel telefoons is de site klein of kapot.
   - Telefoonnummers niet klikbaar, geen bestelknoppen → Klanten moeten moeite doen om te bestellen.
   - Links naar andere shops werken niet → Je stuurt klanten naar lege pagina's.
6. `<details>` "Technische details": jQuery 1.8.3 (2012, bekende beveiligingslekken), onnodig Gumroad-script, geen viewport meta tag, telefoon-redirect via device sniffing, leesvolgorde klopt niet voor schermlezers (WCAG 1.3.2 / 2.4.3), anchors uit een template (#portfolio, #services).
7. "Wat je krijgt": gevonden worden · meer telefoontjes en bestellingen · studenten over de vloer · een site die eruitziet als je zaak · menu en uren die kloppen.

# SEO & meta
- One `<h1>` per page, logical heading order, landmarks.
- JSON-LD `Restaurant` per primary shop (address, telephone, `openingHoursSpecification` from shops.ts, servesCuisine ["Burgers","Vegetarisch"], priceRange "€€", `hasMenu` → `/#menu`), plus an `Offer` for the student deal on Centrum.
- Dutch title + meta description, Open Graph tags (og:image = hero-burger).
- `<meta name="robots" content="noindex, nofollow">` on every page AND `public/robots.txt` disallowing everything.

# Quality bar
- Lighthouse mobile ≥ 95 in all four categories (motion must not hurt LCP or CLS: reserve image sizes, no opacity on LCP).
- Keyboard-only usable, no console errors, `npm run build` and `npm test` pass.

# Deliverables
1. The file tree.
2. Every file you create or replace, in full (don't output binary images or my leaf SVGs, they exist).
3. `README.md`: install, dev, test, build, Netlify deploy, and a checklist of every remaining TODO with file + line.

Do not add: a CMS, i18n, a backend, analytics, cookie banners, a blog, 3D/WebGL, scroll-jacking, or any feature not listed here. Never use the toucan or any image from the old website except `logo.png`.