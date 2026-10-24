<div align="center">

# FastPress Start

**A free, zero-build launch page template for people who ship.**

[![Live demo](https://img.shields.io/badge/demo-live-C6FF4A?labelColor=08080A)](https://fastpresspages.github.io/fastpress-start/)
[![LaunchGrade](https://img.shields.io/badge/LaunchGrade-A%2B%20100%2F100-3DDC84?labelColor=08080A)](https://fastpresspages.github.io/fastpress-start/samples/fastpress-start/report.html)
[![Zero build](https://img.shields.io/badge/build-none-A78BFA?labelColor=08080A)](#)
[![Dependencies](https://img.shields.io/badge/dependencies-0-A78BFA?labelColor=08080A)](package.json)
[![License](https://img.shields.io/badge/license-Apache--2.0-C6FF4A?labelColor=08080A)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-FF6B35?labelColor=08080A)](https://github.com/fastpresspages/.github/blob/main/CONTRIBUTING.md)

[Live demo](https://fastpresspages.github.io/fastpress-start/) · [Use this template](https://github.com/fastpresspages/fastpress-start/generate) · [Audit report](https://fastpresspages.github.io/fastpress-start/samples/fastpress-start/report.html) · [FastPress Labs](https://github.com/fastpresspages)

</div>

---

Most launch pages do not fail because the idea is bad. They fail because the form silently breaks, the share card is blank, there is no privacy page, and the copy promises something nobody can check.

FastPress Start is one small page that already handles the boring parts. It is not a framework. There is no build step, no package to install, and no hidden dashboard. You get readable HTML, CSS and JavaScript that you can edit in an afternoon.

## What you get

| | |
| --- | --- |
| **One clear page** | Hero, offer, proof slot, FAQ, one next step. No popup, carousel or cookie banner. |
| **A working form** | Email capture with validation, honeypot, timeout and an honest error state. FormSubmit by default. |
| **SEO + social** | Title, description, canonical, Open Graph, Twitter card, JSON-LD, sitemap, robots. |
| **Privacy + terms** | Plain-language starting pages, not legal advice. |
| **Agent-readable** | `llms.txt`, `AGENTS.md`, semantic HTML and copy that works without JavaScript. |
| **Accessible** | Skip link, landmarks, labelled fields, visible focus, reduced-motion support, no pinch-zoom block. |
| **Audited in public** | The live demo is scanned by [LaunchGrade](https://fastpresspages.github.io/launchgrade/). The dated report is public. |

## The 15-minute setup

1. **Fork it.** Click [Use this template](https://github.com/fastpresspages/fastpress-start/generate) and name your repo.
2. **Change the words.** Edit `index.html`: the `<title>`, meta description, hero headline, offer, FAQ and footer.
3. **Point the form at you.** Open `config.js` and replace `formEndpoint`, `contactEmail`, `siteUrl` and `githubUrl`.
4. **Replace the legal pages.** Edit `privacy.html` and `terms.html` for your own data practices. They are starting points, not legal advice.
5. **Replace the proof.** Use a real link, a real report or a real quote. If you do not have proof, delete the proof section. Do not invent one.
6. **Check it.** Run `node scripts/serve.js`, open `http://127.0.0.1:4173`, then run the free audit:
   ```bash
   npx -p github:fastpresspages/launchgrade launchgrade http://127.0.0.1:4173
   ```
7. **Deploy.** Push to GitHub, then set **Settings → Pages → Source: GitHub Actions**. The included workflow deploys the site.

That is the whole process. If you want the longer version, read the comments in `config.js` and `app.js`.

## The form

The demo uses [FormSubmit](https://formsubmit.co/) because it is free and needs no server. The first submission triggers a confirmation email to the address in `config.js`.

Before you publish:

- Replace `formEndpoint` with your own FormSubmit address, or point it at your own form backend.
- Update the form `action` in `index.html` to match, so it still works without JavaScript.
- Rewrite `privacy.html` to name your processor.
- Never put a secret key in client-side code.

If you do not want a form, delete it. A page with one honest CTA is better than a broken email capture.

## What to delete

- **No proof?** Delete the audit/proof section. Do not replace it with a fake logo wall.
- **No FAQ?** Delete it. Do not fill it with keyword stuffing.
- **No analytics?** Keep the “no analytics” warning. It is honest. Do not add a pixel just to chase a 100.
- **No legal review?** Keep the pages, but have someone qualified review them before you rely on them.

## Audit

```bash
npx -p github:fastpresspages/launchgrade launchgrade https://your.site
```

The live demo report: [samples/fastpress-start/report.html](https://fastpresspages.github.io/fastpress-start/samples/fastpress-start/report.html)

The score is a heuristic, not a guarantee. The checks and weights are public in the [LaunchGrade repo](https://github.com/fastpresspages/launchgrade).

## Local development

No install, no build:

```bash
node scripts/serve.js
# http://127.0.0.1:4173
```

Or use any static server. Opening `index.html` directly works for reading, but the form needs HTTP.

Check local links and assets:

```bash
node scripts/check-links.js
```

## Structure

```
.
├── index.html            # the page
├── styles.css            # all styles, no framework
├── app.js                # nav, form, year
├── config.js             # form endpoint + site URLs
├── about.html            # why this exists
├── privacy.html          # starting privacy page
├── terms.html            # starting terms page
├── og.png                # 1200×630 share image
├── favicon.svg
├── llms.txt              # agent-readable summary
├── AGENTS.md             # instructions for coding agents
├── robots.txt
├── sitemap.xml
├── .well-known/security.txt
├── samples/              # dated LaunchGrade report
├── scripts/              # zero-dependency local server + link check
└── .github/workflows/    # Pages deploy + CI
```

## Design notes

- Cream paper, ink, electric blue and lime. No external fonts, so no font CDN request.
- One breakpoint at 980 px for layout, one at 760 px for the mobile nav, one at 440 px for small phones.
- All motion is optional and disabled under `prefers-reduced-motion`.
- The page works without JavaScript. The form falls back to a normal POST.

## Honesty rules

- No invented testimonials, logos, user counts or revenue.
- No “guaranteed conversion” or “rank #1” claims.
- No tracking in a template that says “no tracking”.
- If a number is on the page, it has a source or it is labelled as a target.

## Contributing

Small, useful changes are welcome. Read the [contributing guide](https://github.com/fastpresspages/.github/blob/main/CONTRIBUTING.md) and the [code of conduct](https://github.com/fastpresspages/.github/blob/main/CODE_OF_CONDUCT.md). For a new section, open an issue first with the smallest version.

## License

Apache-2.0. See [LICENSE](LICENSE).

---

Built by [Meet Shah](https://fastpresspages.github.io/hire-me/) at [FastPress Labs](https://github.com/fastpresspages). No fake metrics.
