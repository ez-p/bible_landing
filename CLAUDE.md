# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static Next.js landing page for **Paul's Bible Study** (`paulpowell.cc`). It introduces a collection of study tools, highlights a featured verse, and links out to each tool (hosted in separate repos) in a new tab. No backend, auth, database, or API routes — all content lives in TypeScript data files and renders to static HTML at build time.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build (static prerender of "/")
npm start        # serve the production build locally
npm run lint     # ESLint (eslint-config-next, flat config)
```

There is no test suite configured.

## Documentation

Extensive LLM-oriented docs live in `docs/` and are authoritative over the README when they conflict. Read `docs/README.md` first — it's an index pointing to `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `CONTENT_MODEL.md`, `COMPONENTS.md`, `IMPLEMENTATION_GUIDE.md`, `CONVENTIONS.md`, and `DEPLOYMENT.md`. Consult the relevant doc before making non-trivial changes rather than inferring conventions from scratch.

When making a substantive change, update the matching doc in the same change:

| Change type | Update |
|-------------|--------|
| New component | `COMPONENTS.md`, possibly `ARCHITECTURE.md` |
| New data field | `CONTENT_MODEL.md` |
| New design token | `DESIGN_SYSTEM.md` |
| New workflow | `IMPLEMENTATION_GUIDE.md` |
| Scope change | `PROJECT_OVERVIEW.md` |

## Architecture

`app/page.tsx` composes five Server Components in a fixed order, each reading its content from `data/`:

```
app/layout.tsx (fonts, SEO metadata, HTML shell)
  → app/page.tsx
      → BrandBar      ← data/site.ts
      → Hero          ← data/site.ts
      → FeaturedVerse ← data/site.ts
      → StudyTools    ← data/site.ts, data/tools.ts
          → ToolCard (×N) ← StudyTool prop, next/image
      → SiteFooter    ← data/site.ts
```

- **`data/` is the primary edit surface.** `data/site.ts` holds site-wide copy (brand label, hero, featured verse, footer). `data/tools.ts` exports the `StudyTool` type and the `studyTools` array that drives the tool card grid — adding an entry there is sufficient to add a card, no component changes needed.
- All components are Server Components; there are **zero** `"use client"` components and no `useState`/`useEffect`/Context. Hover effects are CSS-only.
- Styling is hybrid: CSS custom properties in `app/globals.css` define the design token palette (colors, gradients), Tailwind v4 utilities handle layout/spacing/responsive/motion, and inline `style={{ color: "var(--token)" }}` is used where Tailwind arbitrary values would be repetitive.
- Fonts (Cormorant Garamond, EB Garamond) load via `next/font/google` in `app/layout.tsx` as CSS variables, referenced in components via `font-[family-name:var(--font-cormorant)]`.
- `tsconfig.json` maps `@/*` to the repo root — always import project files as `@/data/site`, `@/components/ToolCard`, etc., never relative `../../`.
- `bible_study_landing.html` at the repo root is a bundled design-mock export (Option 1a "Reverent Classic"), **not part of the runtime app** — use only as a visual reference.
- The linked study tools (`bible-xplr.vercel.app`, `bible-xref2.vercel.app`) are separate repos/deployments; editing `data/tools.ts` here only changes the link, not those apps.

## Conventions specific to this repo

- Never hardcode user-facing strings in components — they belong in `data/site.ts` or `data/tools.ts`.
- Don't add `"use client"`, client state, CMS/auth/database/API routes, i18n, dark mode, or a test framework unless explicitly requested — see `docs/CONVENTIONS.md#out-of-scope` for the full list and rationale.
- External tool links use `target="_blank" rel="noopener noreferrer"`; contact uses `mailto:`, not a form.
- KJV references are formatted `Book Chapter:Verse · KJV`; CTAs use the `→` unicode arrow, not `->`.
