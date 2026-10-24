# AGENTS.md — FastPress Start

This is a zero-build static launch page template. Read this before changing the page.

## What this repo is

- A free, Apache-2.0 HTML/CSS/JS launch page.
- A live demo at https://fastpresspages.github.io/fastpress-start/.
- An honest example: no fake proof, no tracking, no paid API.

## Non-negotiables

1. **No invented proof.** No fake testimonials, logos, user counts, revenue or partnerships.
2. **No tracking.** Do not add analytics, pixels, session replay or localStorage.
3. **Zero build.** No bundler, framework, CSS preprocessor or npm runtime dependency. `package.json` is only for local scripts.
4. **The form must fail honestly.** Treat HTTP 200 with `{"success":"false"}` as an error. Keep the mailto fallback.
5. **The page must work without JavaScript.** The form has a normal `action`/`method` fallback; keep it.
6. **Do not commit secrets.** The form endpoint is public; a secret key is not.
7. **Keep the legal pages honest.** If you change data collection, update `privacy.html` and `terms.html`.

## Files

- `index.html` — page content, metadata, JSON-LD.
- `styles.css` — all styles. CSS variables at the top.
- `app.js` — nav, form, year. No dependencies.
- `config.js` — form endpoint, contact email, site URLs.
- `about.html`, `privacy.html`, `terms.html` — supporting pages.
- `llms.txt` — agent-readable summary.
- `scripts/serve.js` — local static server.
- `scripts/check-links.js` — local link and asset check.
- `.github/workflows/pages.yml` — deploy the repo root to GitHub Pages.
- `.github/workflows/ci.yml` — syntax and link checks.

## When changing the URL or name

Update all of these together:

- `<link rel="canonical">` and OG/Twitter URLs in every HTML page.
- `config.js` (`siteUrl`, `githubUrl`).
- `sitemap.xml`.
- `robots.txt` (sitemap line).
- `llms.txt` and `AGENTS.md` if they mention the URL.
- `README.md` links.
- `og.png` if it shows the URL.

## When changing the form

- Update `config.js` and the form `action` in `index.html`.
- Keep the honeypot (`_honey`) hidden and excluded from the payload.
- Keep email validation and the 20-second timeout.
- Test success, `success:false`, HTTP 500 and timeout.
- Update the privacy page if the processor changes.

## Verification

```bash
node --check app.js
node --check config.js
node --check scripts/serve.js
node --check scripts/check-links.js
node scripts/check-links.js
node scripts/serve.js
```

Then audit:

```bash
npx -p github:fastpresspages/launchgrade launchgrade http://127.0.0.1:4173 --ignore tech.https
```

Expected local warnings: compression/cache (local server) and analytics (intentional). Do not add analytics to remove the warning.

## Style

- Sentence case for headings and buttons.
- Short paragraphs. No hype.
- Use the existing CSS variables; do not add a new color without a reason.
- Keep the page under ~100 KB of local assets.

## License

Apache-2.0. Contributions are accepted under the same license.
