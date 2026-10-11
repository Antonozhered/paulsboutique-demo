## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Paul's Boutique demo (project rules)
The full spec is in PROMPT.md; design references are in reference/.
- Never edit src/assets/ (my files).
- Write files to disk, don't print them in chat.
- Run `npm test` and `npm run build` after each phase and fix errors.
- Don't commit unless I ask.
- UI copy is Dutch (nl-BE) only.
- This project uses plain CSS, not Tailwind. Ignore the Tailwind mention in the docs list above.
- This project has no i18n. Ignore the internationalization guide.
