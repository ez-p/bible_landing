# Design System

This document defines the visual language implemented in the landing page. The source of truth for **token values** is `app/globals.css`. The source of truth for **per-component sizing** is each file in `components/`.

Design lineage: **Option 1a — Reverent Classic** from `bible_study_landing.html`.

## Design principles

1. **Warm and reverent** — parchment backgrounds, olive and gold accents, traditional serifs.
2. **Centered and calm** — content is horizontally centered with generous whitespace.
3. **Readable hierarchy** — display font for headlines and scripture; body font for labels and descriptions.
4. **Subtle interactivity** — tool cards lift on hover; respect `prefers-reduced-motion`.
5. **Close enough, not pixel-perfect** — responsive tweaks are acceptable; mobile stacks cards vertically.

---

## Color palette

All colors are CSS custom properties in `app/globals.css` `:root`.

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-parchment-start` | `#f6eed7` | Page background gradient start |
| `--bg-parchment-mid` | `#efe5c9` | Page background gradient mid |
| `--bg-parchment-end` | `#e9ddbe` | Page background gradient end |
| `--text-primary` | `#2c2a20` | Default body text color on `<body>` |
| `--text-heading` | `#1c2b49` | H1, H3, primary headings (navy) |
| `--text-muted` | `#5c5843` | Subtitles, card descriptions |
| `--text-footer` | `#8a856d` | Footer verse text |
| `--olive` | `#4d5330` | Featured verse panel background |
| `--parchment-light` | `#f4ecd6` | Text on olive panel |
| `--gold` | `#bd9a5f` | Decorative rules, borders, accents |
| `--gold-muted` | `#c9b47e` | Verse reference label on olive panel |
| `--card-bg` | `#faf4e2` | Tool card background |
| `--eyebrow` | `#6b7144` | Brand bar label, card category labels |
| `--eyebrow-tools` | `#8a6b3f` | "The Study Tools" section heading |
| `--cta` | `#4d5330` | CTA text and contact link color |

### Additional colors (inline, not tokenized)

| Value | Usage |
|-------|-------|
| `rgba(28,43,73,0.18)` | Tool card default border |
| `rgba(28,43,73,0.4)` | Tool card hover border |
| `rgba(40,40,25,0.16)` | Tool card hover shadow |
| `rgba(40,40,25,0.18)` | Icon drop shadow |

To change the palette globally, edit tokens in `globals.css`. Components reference tokens via `style={{ color: "var(--token)" }}`.

---

## Typography

### Font families

Loaded in `app/layout.tsx` via `next/font/google`:

| Font | CSS variable | Weights / styles loaded | Role |
|------|--------------|-------------------------|------|
| Cormorant Garamond | `--font-cormorant` | 400, 500, 600; normal + italic | Display: hero H1, verse blockquote, card titles |
| EB Garamond | `--font-eb-garamond` | 400, 500 | Body: labels, descriptions, footer; default `<body>` font |

Fallback stack on body: `"Times New Roman", serif`.

### Type scale by element

| Element | Font | Size (mobile → desktop) | Weight | Other |
|---------|------|-------------------------|--------|-------|
| Brand bar label | EB Garamond | 13px | 500 | uppercase, `letter-spacing: 0.34em` |
| Hero H1 | Cormorant Garamond | 40px → 64px | 600 | `line-height: 1.04` |
| Hero subtitle | EB Garamond | 18px → 20px | 400 | `line-height: relaxed`, max-width 560px |
| Featured verse quote | Cormorant Garamond | 22px → 27px | 500 italic | blockquote |
| Featured verse ref | EB Garamond | 13px | 400 | uppercase, `letter-spacing: 0.28em`, gold-muted |
| Tools section H2 | EB Garamond | 13px | 500 | uppercase, `letter-spacing: 0.32em` |
| Card eyebrow | EB Garamond | 11px | 500 | uppercase, `letter-spacing: 0.26em` |
| Card title (H3) | Cormorant Garamond | 26px → 29px | 600 | — |
| Card description | EB Garamond | 17px | 400 | `line-height: 1.55` |
| Card CTA | EB Garamond | 15px | 500 | gold bottom border |
| Footer verse | EB Garamond | 15px | 400 | footer muted color |
| Contact link | EB Garamond | 15px | 500 | gold bottom border, CTA color |

### Applying fonts in components

```tsx
// Display font
className="font-[family-name:var(--font-cormorant)]"

// Body font is inherited from <body> — no class needed unless overriding
```

---

## Layout and spacing

### Page-level

| Property | Value |
|----------|-------|
| Page background | Radial gradient on `<body>`: `120% 90% at 50% 0%` |
| Main bottom padding | `pb-16` on `<main>` |
| Content alignment | Centered (`mx-auto`, `text-center` where noted) |

### Section max-widths

| Section | Max width | Horizontal padding |
|---------|-----------|-------------------|
| Hero | 720px | `px-6` → `md:px-10` |
| Featured verse | 760px | `px-8` → `md:px-12` |
| Tool grid container | 860px | `px-6` → `md:px-10` |
| Footer | 760px | `px-6` → `md:px-10` |

### Vertical rhythm (approximate)

| Gap | Value |
|-----|-------|
| Brand bar top padding | 26px |
| Hero top padding | 40px (`pt-10`) |
| Hero subtitle top margin | 24px (`mt-6`) |
| Featured verse top margin | 44px (`mt-11`) |
| Tools section top margin | 56px (`mt-14`) |
| Tools heading bottom margin | 26px |
| Tool grid gap | 28px (`gap-7`) |
| Footer top margin | 56px (`mt-14`) |
| Contact link top margin | 24px (`mt-6`) |

---

## Decorative elements

### Gold horizontal rules

Used in BrandBar (flanking label) and SiteFooter (above verse).

| Location | Width | Height | Color |
|----------|-------|--------|-------|
| BrandBar sides | 30px | 2px (`h-0.5`) | `--gold` |
| Footer | 44px (`w-11`) | 2px | `--gold` |

### Diamond accent (FeaturedVerse)

- 8×8px square, rotated 45°, `--gold` background
- Positioned absolute at top center of olive panel
- `aria-hidden="true"` — decorative only

### CTA underline style

Shared by ToolCard CTA and Contact Me link:

- `border-b-[1.5px]` with `borderColor: var(--gold)`
- `pb-1` padding below text
- Text color: `var(--cta)`

---

## Tool cards

### Structure (top to bottom)

1. Icon (88×88, `object-contain`, drop shadow)
2. Eyebrow category label
3. Title (H3)
4. Description paragraph
5. CTA text with gold underline

### Card container

| Property | Value |
|----------|-------|
| Background | `--card-bg` |
| Border | 1.5px solid `rgba(28,43,73,0.18)` |
| Border radius | 8px (`rounded-lg`) |
| Padding | 34px top, 28px sides, 30px bottom |
| Layout | Flex column, centered |

### Hover state

| Property | Default | Hover |
|----------|---------|-------|
| Transform | none | `translateY(-5px)` |
| Box shadow | none | `0 14px 30px rgba(40,40,25,0.16)` |
| Border color | 18% navy alpha | 40% navy alpha |
| Transition | — | 180ms ease on transform, shadow, border |

### Reduced motion

```tsx
motion-reduce:transition-none
motion-reduce:hover:translate-y-0
motion-reduce:hover:shadow-none
```

---

## Responsive behavior

Single breakpoint strategy using Tailwind `md:` (768px).

| Element | Mobile (<768px) | Desktop (≥768px) |
|---------|-----------------|------------------|
| Tool grid | 1 column | 2 columns |
| Hero H1 | 40px | 64px |
| Hero horizontal padding | 24px (`px-6`) | 40px (`px-10`) |
| Card title | 26px | 29px |
| Featured verse quote | 22px | 27px |

No navigation bar, hamburger menu, or collapsible sections.

---

## Imagery

### Tool icons

| File | Intrinsic size | Display size | Notes |
|------|----------------|--------------|-------|
| `Bible_Explorer.png` | 459×437 | 88×88 | Scripture Word Study |
| `bible-xref2.png` | 410×412 | 88×88 | Cross-Reference Study |

Rendered via `next/image` with explicit `width={88}` `height={88}`.

```tsx
className="h-[88px] w-[88px] object-contain drop-shadow-[0_4px_8px_rgba(40,40,25,0.18)]"
```

New icons: PNG recommended, roughly square aspect ratio, place in `public/images/`.

---

## Motion

| Interaction | Behavior |
|-------------|----------|
| Tool card hover | Lift + shadow + border darken (180ms) |
| Contact link hover | `opacity-80` |
| Page scroll | `scroll-behavior: smooth` on `<html>` (disabled under `prefers-reduced-motion`) |

No page transitions, parallax, or JavaScript animations.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Language | `<html lang="en">` |
| Landmarks | `<main>`, `<header>`, `<footer>`, `<section>` |
| Featured verse | `aria-label="Featured scripture"` on section |
| Tools section | `aria-labelledby="study-tools-heading"` |
| Decorative elements | `aria-hidden="true"` on gold rules and diamond |
| Images | Descriptive `alt` from `tool.iconAlt` |
| External links | `rel="noopener noreferrer"` |
| Motion | Respects `prefers-reduced-motion` |

Focus styles inherit from browser defaults. Consider enhancing with visible `focus-visible` rings if auditing.

---

## Mock-to-implementation mapping

| Mock element (Option 1a) | Implementation |
|--------------------------|----------------|
| Parchment radial background | `body` in `globals.css` |
| Brand bar with gold rules | `BrandBar.tsx` |
| Two-line hero title | Changed to single line — `Hero.tsx` |
| Olive verse panel | `FeaturedVerse.tsx` |
| 2-column tool grid | `StudyTools.tsx` + `ToolCard.tsx` |
| Footer verse | `SiteFooter.tsx` |
| Contact link | Added — not in original mock |

When matching the mock, refer to `bible_study_landing.html` for visual reference only — implemented copy may differ (see `PROJECT_OVERVIEW.md` version history).
