# Project Overview

## Purpose

**Paul's Bible Study** is a single-page marketing landing site that serves as a hub for personal Scripture study web tools. It does not host the tools themselves — it links out to separate applications deployed on Vercel.

| Property | Value |
|----------|-------|
| **Public name** | Paul's Bible Study |
| **Production domain** | [paulpowell.cc](https://paulpowell.cc) |
| **Repository package name** | `pauls-bible-study` |
| **Vercel project name** | TBD by owner |

## What the site does

1. Presents a warm, reverent, traditional visual identity.
2. Introduces the collection with a hero headline and subtitle.
3. Displays a featured ESV scripture (2 Timothy 3:16).
4. Lists study tools as clickable cards that open external apps in a new tab.
5. Shows a closing KJV verse (Psalm 119:105) and a **Contact Me** mailto link.

## Linked external applications

These are **separate codebases** — not part of this repository:

| Tool | URL | Icon asset |
|------|-----|------------|
| Scripture Word Study | `https://bible-xplr.vercel.app/` | `public/images/Bible_Explorer.png` |
| Cross-Reference Study | `https://bible-xref2.vercel.app/` | `public/images/bible-xref2.png` |

## Architectural constraints

The project is intentionally minimal:

- **One route:** `/` only (`app/page.tsx`)
- **Static content:** No database, CMS, API routes, or server actions
- **No authentication:** Public read-only page
- **No environment variables:** Required for current feature set
- **No client-side state management:** No Redux, Zustand, or React Context for data
- **Build-time rendering:** Page is statically generated at `next build`

## Design direction

**Option 1a — Reverent Classic** from the original design mock:

- Centered layout on parchment-toned background
- Traditional serif typography (Cormorant Garamond + EB Garamond)
- Olive scripture panel with gold accents
- Tool cards in a responsive grid

Alternative mock directions (1b Illuminated Manuscript, 1c Modern Calm) exist in `bible_study_landing.html` but were **not** implemented.

## Page structure (top to bottom)

```
┌─────────────────────────────────────┐
│  BrandBar                           │  "Bible Study Tools & Resources"
├─────────────────────────────────────┤
│  Hero                               │  "Paul's Bible Tools" + subtitle
├─────────────────────────────────────┤
│  FeaturedVerse                      │  2 Timothy 3:16 (ESV), olive panel
├─────────────────────────────────────┤
│  StudyTools                         │  Section label + ToolCard grid
│    ┌──────────┐  ┌──────────┐       │
│    │ ToolCard │  │ ToolCard │       │  2 cols desktop, 1 col mobile
│    └──────────┘  └──────────┘       │
├─────────────────────────────────────┤
│  SiteFooter                         │  Psalm 119:105 + Contact Me link
└─────────────────────────────────────┘
```

## In scope

- Visual landing page matching Option 1a aesthetic
- Content driven by `data/` TypeScript files
- Responsive layout (mobile-first stacking)
- SEO metadata and Open Graph tags
- Accessible HTML semantics
- `mailto:` contact link
- External tool links with `target="_blank"`

## Out of scope (do not add without explicit request)

- User accounts or login
- Backend APIs or databases
- Email forms (use `mailto:` only)
- Blog, docs site, or multi-page navigation
- Analytics (not configured; may be added later)
- Favicon / OG image (not present; may be added later)
- Internationalization (i18n)
- Dark mode toggle

## Key files for LLM agents

| Task | Primary file(s) |
|------|-----------------|
| Change any visible text | `data/site.ts`, `data/tools.ts` |
| Change page title / SEO | `app/layout.tsx` |
| Change colors globally | `app/globals.css` |
| Change layout/structure | `app/page.tsx`, `components/*` |
| Add a tool | `data/tools.ts`, `public/images/` |
| Change contact email | `data/site.ts` → `footer.contactEmail` |

## Version history notes

Content has evolved from the original mock:

| Element | Original mock | Current implementation |
|---------|---------------|------------------------|
| Brand bar | "My Bible Study Tools & Resources" | "Bible Study Tools & Resources" |
| Hero title | "Study to Show / Yourself Approved" (two lines) | "Paul's Bible Tools" (one line) |
| Hero subtitle | "A growing collection of simple…" | "A collection of simple…" |
| Footer | "More studies are on the way. …" + verse | Verse only + Contact Me link |
| Contact | Not in mock | `mailto:paul.powell@gmail.com` |

Always treat **source code** (`data/site.ts`, etc.) as the source of truth over the HTML mock or older README examples.
