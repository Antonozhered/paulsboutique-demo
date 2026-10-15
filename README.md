# Paul's Boutique: pitch demo

A private concept website for Paul's Fresh Food Boutique (Kortrijk), made to show the owner on a phone. It is **not** the official site and must never be indexed (see [The site stays private](#the-site-stays-private)).

- `/`: the new site. Open status, student deal, menu, shops, events.
- `/vergelijking`: the old site next to the new one, for the conversation with the owner.

Astro (static output), TypeScript (strict), plain CSS and one React island (`src/components/OpenStatus.tsx`). The full brief is in `prompt.md`. The style tile and photos in `reference/` are pitch material; the site never imports them.

## Requirements

- Node.js 22.12 or newer (`engines` in `package.json`)
- npm

## Install

```sh
npm install
```

## Develop

```sh
npm run dev
```

The site runs at http://localhost:4321. To open it on your phone over the same Wi-Fi, run `npm run dev -- --host` and use the Network address it prints.

The dev server can also run in the background: `npx astro dev --background`, then `npx astro dev status`, `npx astro dev logs` and `npx astro dev stop`.

## Test

```sh
npm test
```

Vitest runs `src/lib/hours.test.ts`: the open/closed logic in `src/lib/hours.ts` (Europe/Brussels time, split shifts, closed days, ranges past midnight, a DST date).

## Build and preview

```sh
npm run build     # static site in dist/
npm run preview   # serves dist/ at http://localhost:4321
```

Canonical links, `og:image` and the JSON-LD need absolute URLs. `astro.config.mjs` takes the domain from the `URL` environment variable, which Netlify sets during every build. On your own machine `URL` is empty, so those links point to `http://localhost:4321`. That is fine for development, but don't upload a local build without setting `URL` (see Netlify Drop below).

## Deploy to Netlify

### From Git (recommended)

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, then pick the repository.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Under **Site configuration → Environment variables**, add `NODE_VERSION` = `22`, so Netlify builds with the same Node version as `engines`.
5. Deploy. Netlify sets `URL` on its own, so every absolute link uses the site's real address.

No adapter is needed: the site is fully static.

### Netlify Drop (no Git)

1. Build with the site's address:
   - PowerShell: `$env:URL = "https://<your-site>.netlify.app"; npm run build`
   - Git Bash, macOS, Linux: `URL=https://<your-site>.netlify.app npm run build`
2. Drag the `dist/` folder onto https://app.netlify.com/drop.

You only get the address after the first upload. Rename the site if you like, rebuild with that address, and drop `dist/` again on the site's **Deploys** page.

### The site stays private

- Every page has `<meta name="robots" content="noindex, nofollow">` (`src/components/BaseHead.astro`).
- `public/robots.txt` disallows all crawlers.
- The footer always shows "Concept door Anton · geen officiële website".

Lighthouse's SEO category fails its "Page is blocked from indexing" audit because of this. That is expected for a private demo, but keep it in mind when you fill in the new site's SEO score on `/vergelijking`.

## Remaining TODOs

Every `TODO` in the code, with file and line. Until one is filled in, the page shows a neutral placeholder ("volgt", "Voorwaarden volgen"), never the word TODO.

### From the owner

- [ ] `src/components/Events.astro:22`: photo of the food truck. It replaces the leaf and the outlined "ON THE MOVE".
- [ ] `src/data/deals.ts:32`: student deal conditions (validity, who it is for, proof). Until then the card says "Voorwaarden volgen".
- [ ] `src/data/shops.ts:231`: confirm that reservations are possible. `reservationsAvailable` also feeds `acceptsReservations` in the JSON-LD.

### Measurements for `/vergelijking` (`src/data/comparison.ts`)

"Is Paul's nu open?"

- [ ] `src/data/comparison.ts:60`: time on the old site (seconds)
- [ ] `src/data/comparison.ts:62`: screenshot of the old site
- [ ] `src/data/comparison.ts:67`: time on the new site (seconds)
- [ ] `src/data/comparison.ts:69`: screenshot of the new site

"Bel de shop"

- [ ] `src/data/comparison.ts:78`: time on the old site (seconds)
- [ ] `src/data/comparison.ts:80`: screenshot of the old site
- [ ] `src/data/comparison.ts:85`: time on the new site (seconds)
- [ ] `src/data/comparison.ts:87`: screenshot of the new site

"Wat kost een Manifesto?"

- [ ] `src/data/comparison.ts:96`: time on the old site (seconds)
- [ ] `src/data/comparison.ts:98`: screenshot of the old site
- [ ] `src/data/comparison.ts:103`: time on the new site (seconds)
- [ ] `src/data/comparison.ts:105`: screenshot of the new site

Lighthouse, mobile (old site / new site)

- [ ] `src/data/comparison.ts:117` / `:119`: Performance
- [ ] `src/data/comparison.ts:126` / `:128`: Toegankelijkheid (Accessibility)
- [ ] `src/data/comparison.ts:135` / `:137`: Best practices
- [ ] `src/data/comparison.ts:144` / `:146`: SEO

Huisstijl

- [ ] `src/data/comparison.ts:160`: screenshot of the old site

#### How to fill them in

- **Time**: replace `seconds: null` with a number, e.g. `seconds: 12`. Decimals are fine (`2.5` shows as "2,5 seconden").
- **Lighthouse score**: replace `old: null` / `next: null` with the score out of 100. Measure the live sites in Chrome DevTools (**Lighthouse → Mobile**) or on https://pagespeed.web.dev, never on `npm run dev`, which is unoptimised.
- **Screenshot**: put the file somewhere under `src/assets/images/`, import it at the top of `comparison.ts` (the same way `muralSeating` is imported) and replace `null` with the image and a Dutch alt text:

  ```ts
  import oudOpen from '../assets/images/vergelijking/oud-open.png';

  image: { src: oudOpen, alt: 'Oude site op een telefoon: nergens openingsuren te zien' },
  ```

  The slots are 3:4 and show the top of the image, which suits a cropped phone screenshot.

### Open, but not marked TODO in the code

- [ ] `src/assets/images/logo.png` is the old raster logo, a placeholder until there is a vector version.
- [ ] The hero photo (`src/components/Hero.astro`) is served as WebP only. The brief asks for AVIF + WebP, like the other photos.

## Where things live

| To change | Edit |
| --- | --- |
| Prices and burgers | `src/data/menu.ts` (and `menuUpdated` in `src/data/brand.ts`) |
| Opening hours, addresses, phone numbers, order links | `src/data/shops.ts` |
| Student deal | `src/data/deals.ts` |
| `/vergelijking` texts, times, scores, screenshots | `src/data/comparison.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Layout and components / animations | `src/styles/global.css` / `src/styles/motion.css` |

The opening hours feed the open status, the hours tables and the JSON-LD (`src/components/JsonLd.astro`), so they only need to change in one place.
