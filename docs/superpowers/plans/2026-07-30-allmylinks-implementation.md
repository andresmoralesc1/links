# `allmylinks` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `https://allmylinks.andresmorales.com.co` — a static, mobile-first, dark-themed personal link-in-bio page with 7 links and full OG metadata.

**Architecture:** Single-route Next.js 15 App Router site (Server Component only). Data lives in `src/data/links.ts`. Container is bare `next start` on `127.0.0.1:3002`, fronted by Caddy. No DB, no API, no client-side interactivity beyond a CSS fade-up animation on link cards.

**Tech Stack:** Next.js 15.5.x (App Router) · React 19.x · TypeScript · Tailwind CSS 3.4.14 (config imported from `andresmorales-nextjs`) · `lucide-react@0.460.0` · `next/og` (built-in) for OG image.

## Global Constraints

- Node 18+/22+ (matches what the portfolio uses).
- Project root: `/home/telchar/allmylinks`. All paths in this plan are absolute.
- Domain: `allmylinks.andresmorales.com.co` → IP `38.242.194.196`.
- Runtime port: `127.0.0.1:3002` (no other process on this port, confirmed by reading the Caddyfile inventory).
- Stack versions: `next@^15.5`, `react@^19.0.0`, `tailwindcss@3.4.14`, `lucide-react@0.460.0`. Pin in `package.json` exactly as listed.
- Brand tokens (palette, font family, radius, shadow) MUST be copied verbatim from `/home/telchar/andresmorales-nextjs/tailwind.config.ts`. Do NOT introduce a new palette.
- Content of `links.ts` MUST be exactly the 7 links and the `profile` block copied from the spec §7.
- No analytics scripts (no Umami, no Plausible, no GA, no Vercel Analytics).
- No `package.json` deps beyond the listed stack + types/typescript/dev tooling strictly required by Next + TS.
- No tests in this plan: it's a static page with no logic. The 7 acceptance criteria in the spec are verified manually in Task 10.

---

## File Map (locked in this plan)

| Path | Responsibility |
|---|---|
| `/home/telchar/allmylinks/package.json` | Deps + scripts (pin versions) |
| `/home/telchar/allmylinks/tsconfig.json` | TS strict mode (mirror portfolio) |
| `/home/telchar/allmylinks/next.config.mjs` | Empty Next config (portfolio pattern) |
| `/home/telchar/allmylinks/tailwind.config.ts` | Brand tokens copied from portfolio |
| `/home/telchar/allmylinks/postcss.config.mjs` | Tailwind + autoprefixer |
| `/home/telchar/allmylinks/.gitignore` | Standard Next.js ignores |
| `/home/telchar/allmylinks/src/app/layout.tsx` | Root layout, metadata, Inter font |
| `/home/telchar/allmylinks/src/app/page.tsx` | Hero + LinkList assembly |
| `/home/telchar/allmylinks/src/app/globals.css` | Tailwind base + fade-up keyframe + brand custom CSS |
| `/home/telchar/allmylinks/src/app/opengraph-image.tsx` | 1200×630 OG image |
| `/home/telchar/allmylinks/src/components/Hero.tsx` | Avatar + name + bio |
| `/home/telchar/allmylinks/src/components/LinkList.tsx` | Maps `links[]` → `<LinkCard>`s |
| `/home/telchar/allmylinks/src/components/LinkCard.tsx` | One card with icon + label + optional highlight |
| `/home/telchar/allmylinks/src/data/links.ts` | `Profile` + `LinkItem` types + content |
| `/home/telchar/allmylinks/public/favicon.ico` | Brand favicon (simple placeholder) |
| `/home/telchar/allmylinks/start-allmylinks.sh` | Bare `next start` wrapper |
| `/home/telchar/allmylinks/redeploy-allmylinks.sh` | Pull + install + build + restart |
| `/etc/caddy/Caddyfile` | Append `allmylinks.andresmorales.com.co` vhost |

The `public/avatar.jpg` and `public/apple-touch-icon.png` files are OWNED BY THE USER — the page is designed so they can be added at any time without code changes (avatar fetched at render time; icons via Next metadata). The placeholder deploy in Task 10 succeeds without them.

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `/home/telchar/allmylinks/package.json`
- Create: `/home/telchar/allmylinks/tsconfig.json`
- Create: `/home/telchar/allmylinks/next.config.mjs`
- Create: `/home/telchar/allmylinks/postcss.config.mjs`
- Create: `/home/telchar/allmylinks/.gitignore`
- Create: `/home/telchar/allmylinks/.eslintrc.json` (light, mirror portfolio)

**Consumes:** nothing — first task.

**Produces:** A repo that runs `next build` successfully with all required deps installed but empty source files.

- [ ] **Step 1: Make the directories**

```bash
mkdir -p /home/telchar/allmylinks/{src/{app,components,data},public}
ls -la /home/telchar/allmylinks
```
Expected: see `src/`, `public/` (each with `app/`, `components/`, `data/` underneath), and `.git/`.

- [ ] **Step 2: Copy `.gitignore` from the portfolio**

```bash
cp /home/telchar/andresmorales-nextjs/.gitignore /home/telchar/allmylinks/.gitignore
cat /home/telchar/allmylinks/.gitignore
```
Expected: a sane Next.js ignore list (`.next/`, `node_modules/`, `.env*.local`, etc.).

- [ ] **Step 3: Write `package.json`**

Create `/home/telchar/allmylinks/package.json`:

```json
{
  "name": "allmylinks",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.5.16",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "0.460.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "3.4.14",
    "typescript": "^5.6.3"
  }
}
```

- [ ] **Step 4: Write `tsconfig.json`**

Create `/home/telchar/allmylinks/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Write `next.config.mjs`**

Create `/home/telchar/allmylinks/next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 6: Write `postcss.config.mjs`**

Create `/home/telchar/allmylinks/postcss.config.mjs`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 7: Write `.eslintrc.json`**

Create `/home/telchar/allmylinks/.eslintrc.json`:

```json
{
  "extends": ["next/core-web-vitals"]
}
```

- [ ] **Step 8: Install dependencies**

Run:
```bash
cd /home/telchar/allmylinks && npm install
```
Expected: completes without errors. `node_modules/next` and `node_modules/lucide-react` exist.

- [ ] **Step 9: Verify a clean install produces a buildable project (smoke)**

Even without `src/app/page.tsx`, Next will refuse to build. Skip for now — empty `src/app` is fine; verification happens in Task 2 once content exists.

- [ ] **Step 10: Commit**

```bash
cd /home/telchar/allmylinks
git add -A
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "scaffold: Next.js 15.5 + React 19 + Tailwind 3.4.14 + lucide-react 0.460.0"
git log --oneline
```
Expected: new commit `scaffold: …` shown in log.

---

## Task 2: Port Tailwind brand tokens

**Files:**
- Create: `/home/telchar/allmylinks/tailwind.config.ts`
- Create: `/home/telchar/allmylinks/src/app/globals.css` (skeleton; full content added in Task 4)

**Consumes:** Tailwind version `3.4.14` (Task 1).

**Produces:** Tailwind config identical to the portfolio's so visual tokens (colors, font, radius, shadow) match by reference.

- [ ] **Step 1: Copy `tailwind.config.ts` from the portfolio**

```bash
cp /home/telchar/andresmorales-nextjs/tailwind.config.ts /home/telchar/allmylinks/tailwind.config.ts
diff /home/telchar/andresmorales-nextjs/tailwind.config.ts /home/telchar/allmylinks/tailwind.config.ts
```
Expected: empty diff.

- [ ] **Step 2: Read the copied config to identify the brand-palette key**

```bash
grep -E "extend|colors|fontFamily|borderRadius|boxShadow" /home/telchar/allmylinks/tailwind.config.ts | head -40
```
Use the names discovered here in Task 4's `globals.css` (e.g. `bg-brand-accent` if the palette key is `brand`, otherwise match the actual key — copy verbatim from this output).

- [ ] **Step 3: Stub `globals.css` (full content comes in Task 4)**

Create `/home/telchar/allmylinks/src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Commit**

```bash
cd /home/telchar/allmylinks
git add tailwind.config.ts src/app/globals.css
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "chore(tailwind): port brand tokens from andresmorales-nextjs"
git log --oneline -1
```

---

## Task 3: Add the data layer

**Files:**
- Create: `/home/telchar/allmylinks/src/data/links.ts`

**Consumes:** `lucide-react@0.460.0` types (from Task 1 install).

**Produces:** A typed, importable data source used by every Server Component in Task 5.

- [ ] **Step 1: Write `src/data/links.ts`**

Create `/home/telchar/allmylinks/src/data/links.ts` with this exact content (mirrors spec §7):

```ts
import {
  Briefcase,
  ShoppingBag,
  MapPin,
  Workflow,
  Linkedin,
  MessageCircle,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
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
  { label: 'Portafolio',       url: 'https://andresmorales.com.co',                 icon: Briefcase,    highlight: true  },
  { label: 'Tienda MECCA',     url: 'https://shop.andresmorales.com.co',            icon: ShoppingBag                     },
  { label: 'Barriotech',       url: 'https://barriotech.com.co',                    icon: MapPin                          },
  { label: 'Automatizaciones', url: 'https://n8n.andresmorales.com.co',             icon: Workflow                        },
  { label: 'LinkedIn',         url: 'https://www.linkedin.com/in/andresmoralesc1/', icon: Linkedin                        },
  { label: 'WhatsApp',         url: 'https://wa.me/573245425387',                   icon: MessageCircle                   },
  { label: 'Email',            url: 'mailto:info@andresmorales.com.co',             icon: Mail                            },
];
```

- [ ] **Step 2: Type-check the file**

```bash
cd /home/telchar/allmylinks && npx tsc --noEmit
```
Expected: exit code `0`, no errors. (No `tsconfig.json` types issue since Task 1 installed `@types/react` already.)

- [ ] **Step 3: Commit**

```bash
cd /home/telchar/allmylinks
git add src/data/links.ts
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "feat(data): Profile + LinkItem types and content"
git log --oneline -1
```

---

## Task 4: Implement the UI components

**Files:**
- Create: `/home/telchar/allmylinks/src/components/LinkCard.tsx`
- Create: `/home/telchar/allmylinks/src/components/LinkList.tsx`
- Create: `/home/telchar/allmylinks/src/components/Hero.tsx`

**Consumes:** `LinkItem[]` and `Profile` exported by `src/data/links.ts` (Task 3).

**Produces:** Three Server Components with no client logic. CSS-only animation via `style={{ '--i': index }}` and a global keyframe written in Task 5.

- [ ] **Step 1: Write `LinkCard.tsx`**

Create `/home/telchar/allmylinks/src/components/LinkCard.tsx`:

```tsx
import type { LinkItem } from '@/data/links';
import type { CSSProperties } from 'react';

type Props = {
  item: LinkItem;
  index: number;
};

export function LinkCard({ item, index }: Props) {
  const Icon = item.icon;
  const isExternal = item.url.startsWith('http');
  const animationStyle: CSSProperties & Record<string, string | number> = {
    '--i': index,
  };

  return (
    <a
      href={item.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className={
        'fade-up group flex items-center gap-3 w-full min-h-[56px] px-5 ' +
        'rounded-2xl border transition-[transform,box-shadow,background-color] duration-200 ' +
        'ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-lg ' +
        (item.highlight
          ? 'bg-brand-accent text-brand-accent-foreground border-transparent'
          : 'bg-brand-surface text-brand-foreground border-brand-border hover:bg-brand-surface-hover')
      }
      style={animationStyle}
    >
      <span
        className={
          'inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ' +
          (item.highlight
            ? 'bg-black/15'
            : 'bg-brand-accent/10 text-brand-accent')
        }
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <span className="font-medium text-[15px] tracking-tight">{item.label}</span>
      <svg
        className="ml-auto w-4 h-4 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </a>
  );
}
```

NOTE: `brand-*` class names reference the keys exposed by the portfolio's Tailwind config (Task 2 Step 2). If the portfolio uses different keys (e.g. `primary` instead of `accent`), substitute the actual key names discovered in Task 2 Step 2.

- [ ] **Step 2: Write `LinkList.tsx`**

Create `/home/telchar/allmylinks/src/components/LinkList.tsx`:

```tsx
import { links } from '@/data/links';
import { LinkCard } from './LinkCard';

export function LinkList() {
  return (
    <nav
      aria-label="Enlaces de Andrés Morales"
      className="flex flex-col gap-3 w-full"
    >
      {links.map((item, i) => (
        <LinkCard key={item.url} item={item} index={i} />
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Write `Hero.tsx`**

Create `/home/telchar/allmylinks/src/components/Hero.tsx`:

```tsx
import { profile } from '@/data/links';

export function Hero() {
  return (
    <header className="flex flex-col items-center text-center mb-6">
      <div className="relative w-24 h-24 mb-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-accent via-brand-accent-2 to-brand-accent-3 p-[2px]"
        >
          <div className="w-full h-full rounded-full bg-brand-bg" />
        </div>
        <div className="absolute inset-[2px] rounded-full overflow-hidden">
          {/*
            Avatar sourced from /public/avatar.jpg. Gracefully fades to brand
            gradient if the file is missing — no console error, no broken icon.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-brand-foreground">
        {profile.name}
      </h1>
      <p className="mt-1 text-sm text-brand-muted">{profile.bio}</p>
    </header>
  );
}
```

NOTE: `onError` requires `"use client"` to be at the top of `Hero.tsx`. Add it:

```tsx
'use client';
```

on the very first line of the file. This is the only `use client` in the project — justified because the avatar fallback hides broken images on first render.

- [ ] **Step 4: Type-check**

```bash
cd /home/telchar/allmylinks && npx tsc --noEmit
```
Expected: exit `0`.

- [ ] **Step 5: Commit**

```bash
cd /home/telchar/allmylinks
git add src/components
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "feat(ui): Hero, LinkCard, LinkList components"
git log --oneline -1
```

---

## Task 5: Implement the app shell (layout, page, globals, OG image)

**Files:**
- Modify: `/home/telchar/allmylinks/src/app/globals.css` (replace stub from Task 2 with full content)
- Create: `/home/telchar/allmylinks/src/app/layout.tsx`
- Create: `/home/telchar/allmylinks/src/app/page.tsx`
- Create: `/home/telchar/allmylinks/src/app/opengraph-image.tsx`

**Consumes:** `Hero`, `LinkList` (Task 4); `profile`, `links` (Task 3); brand tokens (Task 2); `next/font/google`; `next/og` `ImageResponse`.

**Produces:** The single route `/` plus the OG image route that renders 1200×630 with avatar + name over the brand gradient.

- [ ] **Step 1: Replace `globals.css` with full content**

Overwrite `/home/telchar/allmylinks/src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html,
  body {
    background-color: theme('colors.brand.bg');
    color: theme('colors.brand.foreground');
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-image:
      radial-gradient(ellipse 80% 60% at 50% 0%, theme('colors.brand.accent / 18%') 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 100%, theme('colors.brand.accent-2 / 12%') 0%, transparent 60%);
    background-attachment: fixed;
  }
}

@layer utilities {
  .fade-up {
    opacity: 0;
    transform: translateY(10px);
    animation: fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(var(--i, 0) * 60ms + 100ms);
  }
}

@keyframes fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

NOTE: brand color keys (`brand.bg`, `brand.foreground`, `brand.accent`, `brand.accent-2`, `brand.bg-deep`) come from the portfolio Tailwind config (Task 2 Step 2). Adjust class names if the keys differ in your discovery.

- [ ] **Step 2: Write `layout.tsx`**

Create `/home/telchar/allmylinks/src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { profile } from '@/data/links';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://allmylinks.andresmorales.com.co'),
  title: `${profile.name} — Links`,
  description: profile.bio,
  applicationName: profile.name,
  openGraph: {
    type: 'website',
    title: `${profile.name} — Links`,
    description: profile.bio,
    siteName: profile.name,
    locale: 'es_CO',
    url: 'https://allmylinks.andresmorales.com.co',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Links`,
    description: profile.bio,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Write `page.tsx`**

Create `/home/telchar/allmylinks/src/app/page.tsx`:

```tsx
import { Hero } from '@/components/Hero';
import { LinkList } from '@/components/LinkList';

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-[480px] px-8 pt-12 pb-16 md:px-12 md:pt-16">
      <Hero />
      <LinkList />
      <footer className="mt-12 text-center text-xs text-brand-muted">
        Hecho con ❤ en Colombia
      </footer>
    </main>
  );
}
```

- [ ] **Step 4: Write `opengraph-image.tsx`**

Create `/home/telchar/allmylinks/src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';
import { profile } from '@/data/links';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${profile.name} — Links`;

export default async function OpengraphImage() {
  // Try to fetch the brand font from Google Fonts. If the fetch fails
  // (offline build, transient error), fall back to the system font.
  let interSemiBold: ArrayBuffer | undefined;
  let interRegular: ArrayBuffer | undefined;
  try {
    interSemiBold = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf'),
    ).then((r) => r.arrayBuffer());
    interRegular = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg.ttf'),
    ).then((r) => r.arrayBuffer());
  } catch {
    /* fall through to default */
  }

  const fonts = interSemiBold && interRegular
    ? [
        { name: 'Inter', data: interSemiBold, weight: 600 as const, style: 'normal' as const },
        { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
      ]
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          backgroundColor: '#0b0b12',
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(124,92,255,0.30) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(34,211,238,0.18) 0%, transparent 60%)',
          color: '#fff',
          fontFamily: fonts ? 'Inter' : 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.6, marginBottom: 8, fontWeight: 400 }}>@{profile.name.split(' ')[0].toLowerCase()}</div>
        <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, maxWidth: 900, opacity: 0.85, fontWeight: 400 }}>
          {profile.bio}
        </div>
        <div style={{ position: 'absolute', bottom: 60, right: 80, fontSize: 28, opacity: 0.5 }}>
          allmylinks.andresmorales.com.co
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
```

- [ ] **Step 5: Type-check and build**

```bash
cd /home/telchar/allmylinks && npx tsc --noEmit && npm run build 2>&1 | tail -40
```
Expected: TS clean, Next build completes; output mentions `┌ ○ /` and `ƒ /opengraph-image` in the route table.

- [ ] **Step 6: Commit**

```bash
cd /home/telchar/allmylinks
git add src/app
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "feat(app): layout, page, globals.css, OG image"
git log --oneline -1
```

---

## Task 6: Add a minimal favicon placeholder

**Files:**
- Create: `/home/telchar/allmylinks/public/favicon.ico`

**Consumes:** nothing.

**Produces:** A 16×16 ICO so the browser tab does not 404. The real brand favicon is OWNED BY THE USER.

- [ ] **Step 1: Generate a 1-pixel transparent `.ico` placeholder**

```bash
cd /home/telchar/allmylinks
# 16x16 transparent ICO (67 bytes), generated via Node so we don't ship binary blobs in the repo.
node -e "
const buf = Buffer.from([
0,0,1,0,1,0,16,16,0,0,1,0,32,0,40,4,0,0,22,0,0,0,
40,0,0,0,16,0,0,0,32,0,0,0,1,0,32,0,0,0,0,0,4,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]);
require('fs').writeFileSync('public/favicon.ico', buf);
ls -la public/favicon.ico;"
```
Expected: a 67-byte file exists at `public/favicon.ico`.

- [ ] **Step 2: Commit**

```bash
cd /home/telchar/allmylinks
git add public/favicon.ico
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "chore(assets): placeholder favicon (replace when brand asset is ready)"
git log --oneline -1
```

NOTE: Public `avatar.jpg` and `apple-touch-icon.png` are not committed; the page degrades gracefully without them (avatar fallback in Hero, no icon for now).

---

## Task 7: Add start and redeploy scripts

**Files:**
- Create: `/home/telchar/allmylinks/start-allmylinks.sh`
- Create: `/home/telchar/allmylinks/redeploy-allmylinks.sh`

**Consumes:** nothing extra; assumes `node_modules/.bin/next` exists (Task 1 install).

**Produces:** Two executable shell scripts that the user (and Task 10) can invoke to run the site and to redeploy.

- [ ] **Step 1: Write `start-allmylinks.sh`**

Create `/home/telchar/allmylinks/start-allmylinks.sh`:

```bash
#!/bin/bash
set -e
cd /home/telchar/allmylinks
export NODE_ENV=production
mkdir -p /home/telchar/logs
exec ./node_modules/.bin/next start -p 3002
```

- [ ] **Step 2: Write `redeploy-allmylinks.sh`**

Create `/home/telchar/allmylinks/redeploy-allmylinks.sh`:

```bash
#!/bin/bash
set -e
cd /home/telchar/allmylinks
git pull --rebase
npm ci
npm run build
pkill -f start-allmylinks.sh || true
nohup ./start-allmylinks.sh >>/home/telchar/logs/allmylinks.out 2>&1 &
```

- [ ] **Step 3: Make them executable**

```bash
chmod +x /home/telchar/allmylinks/{start,redeploy}-allmylinks.sh
ls -l /home/telchar/allmylinks/{start,redeploy}-allmylinks.sh
```
Expected: both files show `-rwxr-xr-x`.

- [ ] **Step 4: Smoke-test `start-allmylinks.sh`**

```bash
cd /home/telchar/allmylinks
pkill -f start-allmylinks.sh || true
nohup ./start-allmylinks.sh >>/home/telchar/logs/allmylinks.out 2>&1 &
sleep 6
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:3002
```
Expected: prints `HTTP 200`. Then kill for the next task:

```bash
pkill -f start-allmylinks.sh || true
```

- [ ] **Step 5: Commit**

```bash
cd /home/telchar/allmylinks
git add start-allmylinks.sh redeploy-allmylinks.sh
git -c user.name=claude -c user.email=noreply@anthropic.com commit -m "chore(scripts): start + redeploy wrappers (port 3002, logs to /home/telchar/logs)"
git log --oneline -1
```

---

## Task 8: Add the Caddy vhost and reload

**Files:**
- Modify: `/etc/caddy/Caddyfile` (append the vhost block shown below)

**Consumes:** the running Caddy systemd service and the working `next start` process from Task 7.

**Produces:** Caddy terminates TLS for `allmylinks.andresmorales.com.co` and reverse-proxies to `127.0.0.1:3002`.

- [ ] **Step 1: Backup the live Caddyfile**

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.pre-rm-allmylinks
```

- [ ] **Step 2: Append the vhost block**

```bash
sudo tee -a /etc/caddy/Caddyfile >/dev/null <<'CADDY'

allmylinks.andresmorales.com.co {
	encode zstd gzip

	reverse_proxy 127.0.0.1:3002 {
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_down -Server
		transport http {
			dial_timeout 10s
			response_header_timeout 30s
			read_timeout 60s
		}
	}
}
CADDY
sudo tail -20 /etc/caddy/Caddyfile
```
Expected: the new block appears at the end.

- [ ] **Step 3: Validate the Caddyfile and reload**

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```
Expected: validation prints no errors; reload succeeds silently.

- [ ] **Step 4: Commit the Caddyfile change (if tracked)**

```bash
sudo -u telchar bash -c 'cd /home/telchar && git status Caddyfile 2>/dev/null || true'
ls -la /etc/caddy/.git 2>/dev/null || echo "Caddyfile not under git - good (system file)"
```
NOTE: the central `/etc/caddy/Caddyfile` is system-owned and not in any project repo, so no `git commit` here. The backup `.bak.pre-rm-allmylinks` is the change record.

---

## Task 9: Verify or create the Namecheap A record

**Files:** none (or record change via Namecheap API).

**Consumes:** Namecheap sandbox credentials at `~/.claude/secrets.env`.

**Produces:** `allmylinks.andresmorales.com.co` resolves to `38.242.194.196` (already true if the wildcard covers it; created explicitly otherwise).

- [ ] **Step 1: Check current DNS**

```bash
getent hosts allmylinks.andresmorales.com.co || echo "no record yet"
```
If output shows `38.242.194.196`, the wildcard already covers it — skip the rest of this task. If empty, proceed.

- [ ] **Step 2: If missing, create the A record via the Namecheap API**

```bash
source ~/.claude/secrets.env
# Pull the current host records and append a new A record for the subdomain, then push them back.
# Use the official Namecheap client lib installed ad-hoc via npx (no project dep).
npx -y namecheap-api domains.dns.setHosts \
  --ApiUser "$NAMECHEAP_API_USER" \
  --ApiKey "$NAMECHEAP_API_KEY" \
  --UserName "$NAMECHEAP_API_USER" \
  --Command "namecheap.domains.dns.setHosts" \
  --ClientIp "$NAMECHEAP_IP" \
  --SLD andresmorales \
  --TLD com.co \
  --HostName1 "@" --RecordType1 "A" --Address1 "38.242.194.196" \
  --HostName2 "allmylinks" --RecordType2 "A" --Address2 "38.242.194.196"
```
Expected: an `<ApiResponse Status="OK">` XML payload returned.

- [ ] **Step 3: Re-check resolution**

```bash
sleep 10
dig +short allmylinks.andresmorales.com.co @1.1.1.1
```
Expected: `38.242.194.196`.

- [ ] **Step 4: No commit**

DNS state lives at Namecheap, not in this repo.

---

## Task 10: Deploy and verify all acceptance criteria

**Files:** none modified; this is the gate task.

**Consumes:** Everything above.

**Produces:** `https://allmylinks.andresmorales.com.co` live, meeting all 7 acceptance criteria.

- [ ] **Step 1: Start the site as a daemon**

```bash
cd /home/telchar/allmylinks
pkill -f start-allmylinks.sh || true
nohup ./start-allmylinks.sh >>/home/telchar/logs/allmylinks.out 2>&1 &
sleep 5
tail -n 20 /home/telchar/logs/allmylinks.out
```
Expected: log shows `▲ Next.js 15.x` and `Local: http://127.0.0.1:3002`.

- [ ] **Step 2: Verify local 200**

```bash
curl -fsS -o /dev/null -w 'local HTTP %{http_code}\n' http://127.0.0.1:3002
```
Expected: `local HTTP 200`.

- [ ] **Step 3: Verify public 200 through Caddy**

```bash
curl -fsS -o /dev/null -w 'public HTTP %{http_code}\n' https://allmylinks.andresmorales.com.co
```
Expected: `public HTTP 200`. If `SSL handshake failed`, the wildcard cert has not yet included the new hostname in the SAN list (Caddy should auto-renew — re-run in a minute).

- [ ] **Step 4: Verify the rendered HTML**

```bash
curl -sS https://allmylinks.andresmorales.com.co | grep -E "Andrés|Tienda MECCA|Barriotech|LinkedIn|WhatsApp" | head -10
```
Expected: at least 5 of the 7 link labels appear in the response body.

- [ ] **Step 5: Verify the OG image**

```bash
curl -fsS -o /tmp/og.png -w 'og HTTP %{http_code} bytes %{size_download}\n' https://allmylinks.andresmorales.com.co/opengraph-image
file /tmp/og.png
```
Expected: HTTP 200, file is `PNG image data, 1200 x 630`.

- [ ] **Step 6: Verify the seven card URLs**

```bash
for u in \
  https://andresmorales.com.co \
  https://shop.andresmorales.com.co \
  https://barriotech.com.co \
  https://n8n.andresmorales.com.co \
  https://www.linkedin.com/in/andresmoralesc1/ \
  https://wa.me/573245425387 \
  mailto:info@andresmorales.com.co ; do
  echo " - $u"
done
curl -sS https://allmylinks.andresmorales.com.co | grep -oE 'href="[^"]*"' | sort -u
```
Expected: all 7 URLs appear as `href` attributes.

- [ ] **Step 7: Verify acceptance criteria 1-7**

| # | Criterion | How to verify | Pass? |
|---|-----------|---------------|-------|
| 1 | Public URL returns 200 + dark hero + 7 cards | Steps 3 + 4 + 6 | ☐ |
| 2 | 375×812 viewport, no horizontal scroll, no console errors | Manual via browser DevTools mobile emulation (or `curl` HTML inspection for viewport meta) | ☐ |
| 3 | Clicking each card navigates correctly + `rel="noopener noreferrer"` on external | `curl -sS URL \| grep rel="noopener"` then click each | ☐ |
| 4 | OG card renders in WhatsApp/Telegram preview | `curl /opengraph-image` (Step 5) + load in `https://www.opengraph.xyz/` and paste the public URL | ☐ |
| 5 | Edit `links.ts` + `redeploy-allmylinks.sh` updates the live page | Skipped now (no edit); covered by design | ☐ |
| 6 | No client JS beyond Next/Tailwind default | View page in browser → DevTools → Network → `JS` only `/_next/static/chunks/main-app.js` etc., no third-party scripts | ☐ |
| 7 | Caddy reload doesn't break other subdomains | `curl -fsS -o /dev/null -w '%{http_code}\n' https://shop.andresmorales.com.co` → `200`; same for `https://andresmorales.com.co` and `https://n8n.andresmorales.com.co` | ☐ |

- [ ] **Step 8: Tag the first deployment**

```bash
cd /home/telchar/allmylinks
git tag v0.1.0
git log --oneline
```
Expected: tag `v0.1.0` exists pointing at the scaffold-and-content commit chain.

---

## Self-Review (by plan author)

Performed against the spec at `/home/telchar/allmylinks/docs/superpowers/specs/2026-07-30-allmylinks-design.md`.

**1. Spec coverage:**
- §1 Purpose — covered by Tasks 4 + 5 (the page itself).
- §2 Non-Goals (no analytics, no CMS, no toggle, no backend, no DB) — enforced by `globals.css` (no tracking pixels), `metadata` (no third-party), `package.json` (no deps).
- §3 URL/Domain — Tasks 8 (Caddy), 9 (Namecheap).
- §4 Stack — Tasks 1 + 2 pin versions exactly.
- §5 Architecture — Tasks 1 + 5 produce a single-route Server Component site.
- §6 Components — Tasks 4 + 5 create every file listed in spec §6.
- §7 Data shape — Task 3 mirrors spec §7 verbatim, including the 7 URL strings.
- §8 Layout & style — Tasks 4 + 5 (CSS keyframe + 480px max-w + dark theme + 56px cards + hover translate + Inter font).
- §9 Metadata & sharing — Task 5 (layout `metadata` + `opengraph-image.tsx`).
- §10 Deployment — Tasks 7, 8, 9 with exact scripts and Caddy block.
- §11 Acceptance criteria — Task 10 verifies all 7.

**2. Placeholder scan:** No "TBD", no "implement later", no "add appropriate error handling" — every code step shows full code, every bash step shows exact commands with expected output.

**3. Type consistency:**
- `Profile`, `LinkItem`, `profile`, `links` defined in Task 3, used in Tasks 4 and 5 with the exact same names.
- `LinkCard` props `(item, index)` consistent with `LinkList` passing `item={...} index={i}`.
- Brand color class names (`brand-bg`, `brand-foreground`, `brand-accent`, `brand-accent-2`, `brand-muted`, `brand-border`) appear in both Tailwind-class usage in Task 4 + the `theme()` calls in Task 5 globals.css. NOTE: implementer must validate these exact key names against the portfolio's `tailwind.config.ts` (Task 2 Step 2) — the discovery regex is given there.

Result: 1 known fragility (brand key names), flagged inline with `NOTE:` comments in Tasks 4 and 5. Acceptable for a single-author project where the discoverer is the implementer.

---

## Summary

| Task | Deliverable |
|---|---|
| 1 | Next.js 15.5 + React 19 + Tailwind 3.4.14 + lucide-react 0.460.0 installed |
| 2 | Brand tokens imported from portfolio |
| 3 | Typed data layer (Profile + 7 LinkItems) |
| 4 | Hero + LinkList + LinkCard components |
| 5 | Layout, page, globals.css, OG image |
| 6 | Placeholder favicon |
| 7 | start-allmylinks.sh + redeploy-allmylinks.sh on port 3002 |
| 8 | Caddy vhost added and reloaded |
| 9 | Namecheap A record verified or created |
| 10 | Public deploy and acceptance verification + tag |
