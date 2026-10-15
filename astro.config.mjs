// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Canonical, og:image en de JSON-LD hebben een absoluut domein nodig. Netlify zet `URL`
  // tijdens elke build (https://<naam>.netlify.app of je eigen domein). Lokaal is hij leeg
  // en vallen die URL's terug op localhost: dat breekt niets.
  site: process.env.URL,
  output: 'static',
  integrations: [react()],
});
