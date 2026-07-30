# `allmylinks.andresmorales.com.co` — Personal Link-in-Bio

**Status:** Design approved by user (2026-07-30). Awaiting implementation plan.
**Author:** Andrés Morales (via Claude).
**Hosting:** VPS `38.242.194.196` (existing Caddy + Namecheap setup).

---

## 1. Purpose

A single, mobile-first, dark-themed personal hub page for Andrés Morales. Replaces the limitation of Instagram's single bio link by surfacing portfolio, e-commerce store, side-project landings, automation tools, and contact channels in one place. Designed to be the canonical "link in bio" destination for Instagram and other social platforms.

## 2. Non-Goals

- No analytics of any kind (pageviews or click tracking). Pure static page.
- No CMS / admin UI for editing links. The list lives in `src/data/links.ts`; edit → git push → redeploy.
- No multi-theme toggle, no dark/light switcher. Dark theme only.
- No client interactivity beyond the page entrance animation (CSS-only).
- No backend API endpoints.
- No database.

## 3. URL & Domain

- Production URL: `https://allmylinks.andresmorales.com.co`
- DNS: A record `allmylinks.andresmorales.com.co` → `38.242.194.196`. Verify whether the existing wildcard `*.andresmorales.com.co` A record already covers the subdomain; if not, create an explicit A record via the Namecheap API.
- TLS: provided by existing Caddy on the VPS via the wildcard certificate already issued for `*.andresmorales.com.co`.

## 4. Stack

- **Next.js 15 App Router** (TypeScript, React Server Components).
- **Tailwind CSS** — config and design tokens (palette, font family, radius) imported from `andresmorales-nextjs/tailwind.config.ts` for visual consistency with the main portfolio.
- **`lucide-react`** for link icons (tree-shakeable, ~16 kB per icon).
- No additional runtime dependencies.

## 5. Architecture

```
Browser
   │
   ▼ HTTPS (443)
Caddy (allmylinks.andresmorales.com.co vhost, TLS via wildcard cert)
   │
   ▼ reverse_proxy
Next.js process, listening on 127.0.0.1:3002
   │
   ▼ Server Component renders
src/data/links.ts (imported directly, no I/O at request time)
   │
   ▼ Returns static HTML + CSS
Browser
```

Single route: `/`. No API routes, no middleware, no dynamic segments, no ISR (fully static at build time).

## 6. Components

All components live under `src/app/` (App Router convention):

- `src/app/layout.tsx` — root layout, imports global Tailwind, sets `<html lang="es">`, injects `<head>` meta via `metadata` export.
- `src/app/page.tsx` — `default export` Server Component. Reads `links` + `profile` from `src/data/links.ts`, renders `<Hero>` + `<LinkList>`.
- `src/components/Hero.tsx` — avatar (gradient ring), name, one-line bio. Server Component.
- `src/components/LinkList.tsx` — maps `links[]` to `<LinkCard>`s with staggered fade-up animation via CSS `animation-delay`.
- `src/components/LinkCard.tsx` — server-rendered `<a>` with icon, label, optional `highlight` accent. Opens external links in new tab with `rel="noopener noreferrer"`.
- `src/components/og-image.tsx` (or `opengraph-image.tsx`) — Next.js dynamic OG image route (1200×630). Renders avatar + name over a gradient using the brand palette and `@vercel/og` or an inline SVG.
- `src/data/links.ts` — typed `links` array + `profile` object (data only, see §7).
- `public/avatar.jpg` — square profile photo, ≤256 kB. Reused in the hero and inside the OG image.
- `public/favicon.ico`, `public/apple-touch-icon.png` — small set of brand-consistent icons.

## 7. Data Shape (`src/data/links.ts`)

```ts
import type { LucideIcon } from 'lucide-react';
import {
  Briefcase, ShoppingBag, MapPin, Workflow, Linkedin, MessageCircle, Mail,
} from 'lucide-react';

export type Profile = {
  name: string;
  bio: string;
  avatar: string; // path under /public, e.g. '/avatar.jpg'
};

export type LinkItem = {
  label: string;
  url: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export const profile: Profile = {
  name: 'Andrés Morales',
  bio: 'Desarrollador & emprendedor digital',
  avatar: '/avatar.jpg',
};

export const links: LinkItem[] = [
  { label: 'Portafolio',       url: 'https://andresmorales.com.co',         icon: Briefcase,   highlight: true  },
  { label: 'Tienda MECCA',     url: 'https://shop.andresmorales.com.co',    icon: ShoppingBag                     },
  { label: 'Barriotech',       url: 'https://barriotech.com.co',            icon: MapPin                          },
  { label: 'Automatizaciones', url: 'https://n8n.andresmorales.com.co',     icon: Workflow                        },
  { label: 'LinkedIn',         url: 'https://www.linkedin.com/in/andresmoralesc1/', icon: Linkedin                  },
  { label: 'WhatsApp',         url: 'https://wa.me/573245425387',           icon: MessageCircle                   },
  { label: 'Email',            url: 'mailto:info@andresmorales.com.co',     icon: Mail                            },
];
```

Editing flow: change this file, `git commit && git push`, run `redeploy-allmylinks.sh`. No redeploy needed for visual changes that don't touch this file (the rest is fully static).

## 8. Layout & Style

- **Max-width:** 480 px on all viewports. Centered horizontally.
- **Spacing:** generous — 32 px outer padding on mobile, 48 px on tablet+, 24 px vertical gap between hero and list, 12 px between link cards.
- **Color theme:** dark by default. Background near-black with a subtle radial gradient using the brand accent. Cards: slightly lighter than background, 1 px hairline border in accent-low opacity, rounded-2xl.
- **Typography:**
  - `Inter` (loaded via `next/font/google`) for the link labels.
  - `Inter` weight 700 for the display name; 400 / 16 px for the bio.
- **Avatar:** circular, 96 × 96 px, wrapped in a 2 px gradient ring using the brand palette.
- **Link cards:** 56 px tall, full-width, rounded-2xl, hover lifts the card by 2 px and increases shadow. Transition: `transform 200ms ease, box-shadow 200ms ease`.
- **Animation:** `fade-up` keyframe applied to each card with `animation-delay: calc(var(--i) * 60ms)` where `--i` is set inline per card. Pure CSS, no JS.
- **No** loading spinner, no theme toggle, no page transitions.

## 9. Metadata & Sharing

`generateMetadata` (or the static `metadata` export) on `app/layout.tsx`:

- `title`: `Andrés Morales — Links` (template-style).
- `description`: 1-line summary derived from `profile.bio`.
- `openGraph`: `title`, `description`, `url`, `siteName: 'Andrés Morales'`, `images: [{ url: '/og.png', width: 1200, height: 630 }]`.
- `twitter`: `card: 'summary_large_image'`, `images: ['/og.png']`.
- `icons`: `icon: '/favicon.ico'`, `apple: '/apple-touch-icon.png'`.
- `metadataBase`: `https://allmylinks.andresmorales.com.co`.

OG image (`opengraph-image.tsx`) is generated at build time using the brand palette + avatar + name. Static-asset route, no runtime cost.

## 10. Deployment

- **Repo path:** `/home/telchar/allmylinks` (initialized via `git init` during spec phase).
- **Runtime port:** `127.0.0.1:3002`.
- **Run pattern:** bare `next start`, matching the existing portfolio pattern (`start-portfolio.sh`). No Docker, no DB. Process supervised via the existing tmux/pm2 setup the user runs for the portfolio.
- **`start-allmylinks.sh`:** `npm ci && npm run build && PORT=3002 HOST=127.0.0.1 next start`. Idempotent; safe to re-run.
- **`redeploy-allmylinks.sh`:** `git pull --rebase && bash start-allmylinks.sh`. Bumps the running process.
- **Caddy vhost** appended to `/etc/caddy/Caddyfile`:
  ```
  allmylinks.andresmorales.com.co {
      reverse_proxy 127.0.0.1:3002
  }
  ```
  Then reload: `sudo systemctl reload caddy` (or `caddy reload` if running as a service).
- **Namecheap:** verify wildcard covers the subdomain (likely yes). If not, call `namecheap.domains.dns.setHosts` via the API (credentials in `~/.claude/secrets.env`, IP whitelisted) to add an A record. Idempotent.
- **Post-deploy verification:** `curl -fsS -o /dev/null -w '%{http_code}\n' https://allmylinks.andresmorales.com.co` must return `200`. Then load the URL in a browser (mobile emulation) and confirm all 7 cards render, OG image renders in `https://www.opengraph.xyz/` preview, and a click on each card opens the right URL.

## 11. Acceptance Criteria

1. `https://allmylinks.andresmorales.com.co` returns 200 and serves the dark-themed hero + 7 link cards.
2. On a 375 × 812 viewport (iPhone 13/14 size, the dominant IG-traffic viewport), the page renders with no horizontal scroll, no console errors, no network requests after initial paint.
3. Clicking each card navigates to the correct URL and opens external links in a new tab.
4. Sharing the URL into WhatsApp / Telegram / iMessage renders the OG card with avatar + name + dark gradient background.
5. Editing `src/data/links.ts` and running `redeploy-allmylinks.sh` updates the live page without manual intervention.
6. No client-side JS is loaded beyond what Next.js + Tailwind ship by default (Lighthouse performance ≥ 95 on mobile).
7. Caddy reload picks up the new vhost without breaking any other subdomain.

## 12. Out-of-Scope (Future, If Requested)

- Click-per-link analytics.
- Light theme / theme toggle.
- PWA manifest + installability.
- An admin URL for editing links without redeploying.
- Multi-language support.

## 13. Open Items (Resolved)

- ~~Link GPS~~ → Resolved: GPS links to `barriotech.com.co`.
- ~~LinkedIn~~ → Resolved: `https://www.linkedin.com/in/andresmoralesc1/`.
- ~~WhatsApp~~ → Resolved: `https://wa.me/573245425387`.
- ~~Email~~ → Resolved: `mailto:info@andresmorales.com.co`.
- ~~Umami analytics~~ → Resolved: dropped — none.
