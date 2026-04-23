# Web Studio Oleh Kalchenko

Personal portfolio site with a lightweight, GitHub-backed CMS.

Live: **https://webstudiook.vercel.app**
Source: https://github.com/Tor2024/WebStudioOK

---

## What it is

A single-page React Router app (SSR via Vercel Node runtime) with a small REST
API for the contact form and content management:

* `/` — home with a hand-drawn slideshow, tech stack, testimonials, FAQ
* `/portfolio` — project cards fetched from `content_data/portfolio/*.json`
* `/news` — news feed fetched from `content_data/news/*.json`
* `/about`, `/contact`
* `/impressum`, `/datenschutz` — legal pages (DSGVO-compliant, with placeholder
  personal data that you fill in before publishing commercially)
* `/admin` — password-protected CMS: create / edit / delete news + portfolio
  items, upload slideshow images. Every change is committed directly to this
  GitHub repo via the Contents API → Vercel auto-redeploys.

Content (news / portfolio JSON + default slideshow images) is stored **in git**
so a fresh clone always renders the site without any extra setup.

---

## Local development

```bash
cd apps/web
cp .env.example .env            # fill in any secrets you need
npm install --legacy-peer-deps
npm run dev
```

Then open http://localhost:4000 (port defined in `package.json`).

When `GITHUB_TOKEN` is **not** set the CMS falls back to the local filesystem —
so you can edit/add content offline and commit changes manually with git.

Build & preview the production bundle:

```bash
cd apps/web
npm run build
npm run preview
```

---

## Deploying to Vercel

1. Go to https://vercel.com/new → import the `Tor2024/WebStudioOK` repo.
2. Framework preset: **Other**.
3. Root directory: `apps/web`.
4. Install command: `npm install --legacy-peer-deps`.
5. Build command: `npm run build`.
6. Output: leave the default (the preset picks up `build/client`).
7. Add the environment variables from `.env.example` — at minimum:
   * `ADMIN_PASSWORD`
   * `GITHUB_TOKEN` (fine-grained PAT with `Contents: read/write` scoped to
     this repo)
   * `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_REPO_BRANCH`
   * `NPM_CONFIG_LEGACY_PEER_DEPS=true`
   * `TELEGRAMM_TOKEN`, `TELEGRAMM_ID`, `RESEND_API_KEY` (if you want the
     contact form to actually send)
8. Deploy.

Once the GitHub integration is connected, **every push to
`devin/initial-import` (or whichever branch you configured) auto-deploys the
whole site** — including content commits made by the admin panel. Cloning the
repo and pushing it elsewhere keeps everything self-contained: images and
content live alongside the code.

---

## Repo layout

```
apps/web/
├── api/                  # Vercel Node functions (REST endpoints)
├── content_data/         # News + portfolio JSON (edited via /admin)
├── public/
│   ├── slideshow/        # Home-page slides (managed via /admin)
│   └── uploads/          # User-uploaded images (editor pictures, etc.)
├── src/
│   ├── app/              # React Router routes (file-based)
│   ├── components/       # Reusable UI — HandDrawnSlideshow, Footer, etc.
│   ├── context/          # Language/i18n provider
│   └── utils/            # storage facade, admin auth, i18n strings, ...
├── package.json
└── vercel.json
```

---

## Legal

This website is a personal portfolio, **not** a binding commercial offer
(§ 145 BGB). `Impressum` and `Datenschutz` are provided with placeholder
personal data — fill in `[Vor- und Nachname]`, `[Straße und Hausnummer]`, etc.
in `apps/web/src/app/impressum/page.jsx` and
`apps/web/src/app/datenschutz/page.jsx` **before** using the site commercially.
