# WeForest Partnership Finder

A Next.js app that uses the Anthropic API to recommend a tailored WeForest business partnership.

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Deploying to Netlify

1. Push this repo to GitHub/GitLab.
2. In Netlify: **New site → Import from Git → select the repo**.
3. Build settings are picked up from `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish: `.next`
   - Plugin: `@netlify/plugin-nextjs` (handles SSR API routes)
4. In **Site settings → Environment variables**, add:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key (server-only, never exposed to browser) |
| `RATE_LIMIT_RPM` | No | Max requests/minute per IP (default: 10) |

## Project structure

```
app/
  page.tsx              — Entry point (renders App component)
  layout.tsx            — HTML shell + metadata
  globals.css           — WeForest design tokens + base styles
  api/recommend/
    route.ts            — POST /api/recommend (Anthropic call + website fetching)
components/
  App.tsx               — State machine (intro → loading → result)
  Hero.tsx              — Full-bleed hero with nav
  Pillars.tsx           — Three business pillars
  HowItWorks.tsx        — Three-step explainer
  FinderForm.tsx        — URL + objective picker
  Loading.tsx           — Spinner + status messages
  ResultCard.tsx        — AI recommendation card
  ContactForm.tsx       — Lead capture form
  WFNav.tsx / WFFooter.tsx / Eyebrow.tsx / PillButton.tsx / WFIcon.tsx — UI primitives
lib/
  data.ts               — Constants, types, fallback logic
public/
  assets/               — WeForest photography + logos
  fonts/                — Helvetica Neue family
```

## Contact form

The contact form currently only sets local "sent" state (matching the prototype). Wire it to WeForest's CRM by submitting `form` data to the appropriate endpoint in `ContactForm.tsx`.
