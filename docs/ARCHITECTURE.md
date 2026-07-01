# Architecture

## Technology stack

| Layer | Technology | Version (package.json) | Notes |
|-------|------------|------------------------|-------|
| Framework | Next.js (App Router) | ^15.3.3 | Static page generation |
| UI library | React | ^19.1.0 | Server Components by default |
| Language | TypeScript | ^5.8.3 | `strict: true` |
| Styling | Tailwind CSS | ^4.1.8 | Via `@tailwindcss/postcss` |
| Fonts | `next/font/google` | built-in | Cormorant Garamond, EB Garamond |
| Images | `next/image` | built-in | Tool card icons only |
| Linting | ESLint + eslint-config-next | ^9.27.0 | Flat config in `eslint.config.mjs` |
| Hosting | Vercel | — | Recommended; no custom config required |

## Configuration files

| File | Purpose |
|------|---------|
| `next.config.ts` | Empty `NextConfig` — no custom rewrites, redirects, or `output: 'export'` |
| `tsconfig.json` | Path alias `@/*` → repository root |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `eslint.config.mjs` | Extends `next/core-web-vitals` and `next/typescript` |
| `package.json` | Scripts: `dev`, `build`, `start`, `lint` |

## Directory responsibilities

### `app/` — Next.js App Router

| File | Type | Responsibility |
|------|------|----------------|
| `layout.tsx` | Server Component | HTML shell, font loading, `metadata` export |
| `page.tsx` | Server Component | Composes section components in order |
| `globals.css` | CSS | Design tokens (`:root`), body styles, Tailwind import |

There are no route groups, no `loading.tsx`, no `error.tsx`, and no API routes under `app/`.

### `components/` — Presentational UI

All components are **Server Components** (no `"use client"` directive). They import data from `data/` and render static HTML.

| Component | Data source | Renders |
|-----------|-------------|---------|
| `BrandBar` | `site.brandLabel` | `<header>` with decorative gold rules |
| `Hero` | `site.hero` | `<section>` with `<h1>` and subtitle `<p>` |
| `FeaturedVerse` | `site.featuredVerse` | `<section>` with `<blockquote>` |
| `StudyTools` | `site.toolsSectionLabel`, `studyTools[]` | `<section>` with grid of `ToolCard` |
| `ToolCard` | `StudyTool` prop | `<a>` card with `next/image` |
| `SiteFooter` | `site.footer` | `<footer>` with verse and mailto link |

### `data/` — Content configuration

The **primary extension point** for content changes. Components should not hardcode user-facing strings.

| File | Exports | Consumed by |
|------|---------|-------------|
| `site.ts` | `site` (const object) | BrandBar, Hero, FeaturedVerse, StudyTools, SiteFooter |
| `tools.ts` | `StudyTool` type, `studyTools` array | StudyTools, ToolCard |

### `public/` — Static assets

Files are served at the URL path matching their location under `public/`.

```
public/images/Bible_Explorer.png  →  /images/Bible_Explorer.png
public/images/bible-xref2.png     →  /images/bible-xref2.png
```

Referenced in `data/tools.ts` as `icon: "/images/..."`.

## Render pipeline

```
next build
    │
    ▼
app/layout.tsx          ── loads fonts, sets <html>/<body>, metadata
    │
    ▼
app/page.tsx            ── imports 5 section components
    │
    ├── BrandBar        ── reads data/site.ts
    ├── Hero            ── reads data/site.ts
    ├── FeaturedVerse   ── reads data/site.ts
    ├── StudyTools      ── reads data/site.ts + data/tools.ts
    │       └── ToolCard (×N)  ── reads StudyTool prop, uses next/image
    └── SiteFooter      ── reads data/site.ts
    │
    ▼
Static HTML for route "/"  (○ Static in build output)
```

No data fetching (`fetch`, `getStaticProps`, etc.). No client hydration required for interactivity beyond native link behavior and CSS hover states.

## Import alias

`tsconfig.json` maps `@/*` to the repository root:

```ts
import { site } from "@/data/site";
import { BrandBar } from "@/components/BrandBar";
```

Always use `@/` imports for project files.

## Extension points

Ordered by likelihood of future changes:

1. **`data/tools.ts`** — Add/remove/reorder study tool cards
2. **`data/site.ts`** — Change copy, contact info, featured verse
3. **`app/layout.tsx`** — SEO metadata, fonts, site-wide head tags
4. **`app/globals.css`** — Global design tokens and body background
5. **`components/*.tsx`** — Layout or styling changes per section
6. **`public/images/`** — New icon assets

## Dependency graph

```
app/page.tsx
  → components/BrandBar.tsx      → data/site.ts
  → components/Hero.tsx          → data/site.ts
  → components/FeaturedVerse.tsx   → data/site.ts
  → components/StudyTools.tsx      → data/site.ts, data/tools.ts, components/ToolCard.tsx
  → components/SiteFooter.tsx      → data/site.ts

components/ToolCard.tsx            → data/tools.ts (type only), next/image

app/layout.tsx                     → app/globals.css, next/font/google
```

No circular dependencies. Components never import from `app/`.

## Styling architecture

Hybrid approach:

1. **CSS custom properties** in `app/globals.css` define the design token palette.
2. **Tailwind utility classes** handle layout, spacing, responsive breakpoints, and hover/motion utilities.
3. **Inline `style={{ }}`** applies token colors where Tailwind arbitrary values would be repetitive (e.g., `color: "var(--text-heading)"`).

Font families are loaded as CSS variables (`--font-cormorant`, `--font-eb-garamond`) by `next/font` on `<html>`, then referenced in components via `font-[family-name:var(--font-cormorant)]`.

## Build output

`npm run build` produces:

- Static prerender of `/`
- Default Next.js `/_not-found` (unstyled system 404)

Expected build characteristics:

- No server-side runtime data dependencies
- No environment variable requirements
- First Load JS ~108 kB for `/` (as of initial implementation)

## What not to introduce

Unless explicitly requested, avoid:

- `pages/` directory (App Router only)
- `"use client"` and client-side state
- `getServerSideProps` / server actions / route handlers
- CSS-in-JS libraries (styled-components, emotion)
- Component libraries (shadcn, MUI, Chakra)
- State management libraries
- Test frameworks (none configured)
