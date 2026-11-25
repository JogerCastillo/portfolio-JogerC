# Portfolio — Joger Castillo

[![CI](https://github.com/JogerCastillo/portfolio-JogerC/actions/workflows/ci.yml/badge.svg)](https://github.com/JogerCastillo/portfolio-JogerC/actions/workflows/ci.yml)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7?logo=netlify&logoColor=white)](https://portfolio-jogerc.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> Personal portfolio of a Full Stack Developer. Bilingual (ES/EN), dark mode,
> accessible, with a secure serverless contact form.

🔗 **Live:** https://portfolio-jogerc.netlify.app/

## About

A single-page portfolio built with React 19, Vite and Tailwind CSS 4. It presents
an introduction, a project carousel, a featured case study, the tech stack, and a
contact form — in Spanish and English.

The portfolio itself is treated as an engineering deliverable: real i18n instead
of hardcoded strings, deliberate accessibility work, a hardened serverless
contact form, a strict Content Security Policy, and CI on every push.

- [LinkedIn](https://www.linkedin.com/in/joger-gabriel-castillo-quitian-91b0451a5/)
- [GitHub](https://github.com/JogerCastillo)

## Features

- **Real i18n (ES/EN)** — React context + JSON dictionaries. Every visible string,
  including ARIA labels and screen-reader-only announcements, lives in
  `src/i18n/es.json` and `src/i18n/en.json`.
- **Dark / light theme** — follows `prefers-color-scheme` on first visit,
  persists in `localStorage`, and is resolved by a CSP-hashed inline script
  before first paint (no flash of the wrong theme).
- **Accessible** — semantic landmarks and heading order, ARIA labels on icon-only
  buttons, `aria-expanded` / `aria-controls` on the mobile menu, an `sr-only`
  live region announcing carousel changes, autoplay paused on hover and focus,
  `<html lang>` synced with the active language, and visible focus states.
  Target: WCAG 2.1 AA. CSS transitions, smooth scrolling and the Hero /
  Projects / Featured animations are disabled under
  `prefers-reduced-motion: reduce`; the remaining scroll reveals in About,
  Skills and Contact are a known gap.
- **Secure contact form** — Cloudflare Turnstile (fail-closed), honeypot field,
  CRLF/header-injection sanitization, production origin allowlist, field length
  caps, and nodemailer v10.
- **Featured project section** — links to the Mesa de Ayuda helpdesk case study
  (25 automated tests, green CI, technical README).
- **SEO** — Open Graph and Twitter Card metadata, canonical URL, `sitemap.xml`,
  `robots.txt`, and a generated `og-image.png`.
- **Security headers** — strict CSP without `unsafe-inline` in `script-src`,
  plus `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and
  `Permissions-Policy`, all declared in `netlify.toml`.
- **Lighthouse (mobile, incognito)** — 93 Performance · 94 Accessibility ·
  92 Best Practices · 92 SEO.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | framer-motion |
| Icons | react-icons |
| Navigation | react-scroll (single-page, no router) |
| i18n | Custom React context + JSON dictionaries (ES/EN) |
| Backend | Netlify Functions + nodemailer v10 |
| Captcha | Cloudflare Turnstile |
| CI/CD | GitHub Actions (lint + build) + Netlify auto-deploy |

## Architecture

A single-page application served as static files by Netlify. The contact form
posts to a Netlify Function that verifies Turnstile, sanitizes the input, and
sends the email through nodemailer.

```text
Browser (React SPA)
  ↓ POST /.netlify/functions/send-email
Netlify Function (Node.js)
  ↓ verify Turnstile → sanitize → nodemailer
Gmail SMTP
```

The function (`netlify/functions/send-email.js`) is ES Module code that:

- rejects anything that is not `POST`, and rejects requests without an
  `Origin`/`Referer` matching the allowlist in production (`SITE_URL`, `URL`);
- verifies the Turnstile token server-side and fails closed;
- applies per-field length caps, an email format check, a honeypot check, and an
  in-memory rate limit;
- strips CR/LF from values interpolated into mail headers and escapes the HTML
  body before handing the message to nodemailer.

The frontend reads its endpoint from `VITE_CONTACT_ENDPOINT`, falling back to
`/.netlify/functions/send-email`.

## Local development

```bash
git clone https://github.com/JogerCastillo/portfolio-JogerC.git
cd portfolio-JogerC
npm install
npm run dev        # Vite on http://localhost:5173
```

The contact form needs Netlify Functions, which plain Vite does not serve:

```bash
npm install -g netlify-cli
cp .env.example .env   # fill GMAIL_*, TURNSTILE_*
netlify dev            # serves Vite and the function on :8888
```

`.env` is git-ignored; never commit real credentials.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `GMAIL_USER` | Netlify (secret) | Gmail account used by the function |
| `GMAIL_APP_PASSWORD` | Netlify (secret) | Gmail App Password (2FA required) |
| `TURNSTILE_SECRET_KEY` | Netlify (secret) | Cloudflare Turnstile secret |
| `VITE_TURNSTILE_SITE_KEY` | Netlify (public) | Turnstile site key (visible in the bundle) |
| `SITE_URL` | Netlify | Production URL used for the origin allowlist |
| `VITE_CONTACT_ENDPOINT` | Local (optional) | Override the form endpoint |

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production (outputs `dist/`) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## CI/CD

[![CI](https://github.com/JogerCastillo/portfolio-JogerC/actions/workflows/ci.yml/badge.svg)](https://github.com/JogerCastillo/portfolio-JogerC/actions/workflows/ci.yml)

Every push and pull request targeting `main` runs `npm ci`, `npm run lint` and
`npm run build` via GitHub Actions (`.github/workflows/ci.yml`, Node 20).
Deployments are handled by Netlify auto-deploy from `main`.

## Featured project

This portfolio features [**Mesa de Ayuda**](https://github.com/JogerCastillo/mesa-ayuda),
a full-stack helpdesk system with RBAC, JWT auth, Zod validation, 25 automated
tests and green CI. See the [case study](https://github.com/JogerCastillo/mesa-ayuda#readme)
or the [live demo](https://mesa-ayuda-web.netlify.app/).

## License

MIT — see [LICENSE](./LICENSE).

## Contact

- [LinkedIn](https://www.linkedin.com/in/joger-gabriel-castillo-quitian-91b0451a5/)
- [GitHub](https://github.com/JogerCastillo)
- Or use the [contact form](https://portfolio-jogerc.netlify.app/#contact) on the live site
