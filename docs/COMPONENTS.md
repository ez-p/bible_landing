# Components Reference

All components live in `components/`. Each is a **Server Component** (no `"use client"`). They are presentational — data comes from `data/` files or props.

Import convention: `@/components/ComponentName`

---

## Page composition (`app/page.tsx`)

```tsx
<main className="pb-16">
  <BrandBar />
  <Hero />
  <FeaturedVerse />
  <StudyTools />
  <SiteFooter />
</main>
```

Order is fixed. Reordering here changes the visual page structure.

---

## BrandBar

**File:** `components/BrandBar.tsx`

### Purpose

Top-of-page brand identification with symmetrical gold decorative rules.

### Data

- `site.brandLabel` from `@/data/site`

### DOM structure

```
<header>
  <span />  <!-- gold rule, aria-hidden -->
  <span>    <!-- brand label -->
  <span />  <!-- gold rule, aria-hidden -->
</header>
```

### Key styles

| Property | Value |
|----------|-------|
| Layout | `flex items-center justify-center gap-3` |
| Padding | `pt-[26px] pb-1 px-6` |
| Label font | 13px, medium, uppercase, `tracking-[0.34em]` |
| Label color | `var(--eyebrow)` |
| Rules | 30×2px, `var(--gold)` |

### Props

None.

---

## Hero

**File:** `components/Hero.tsx`

### Purpose

Primary headline and supporting subtitle.

### Data

- `site.hero.title` — single string (rendered as one `<h1>`)
- `site.hero.subtitle`

### DOM structure

```
<section>
  <h1>{title}</h1>
  <p>{subtitle}</p>
</section>
```

### Key styles

| Element | Classes / tokens |
|---------|------------------|
| Section | `max-w-[720px] mx-auto text-center px-6 md:px-10 pt-10 pb-2` |
| H1 | Cormorant, 40px/64px, semibold, `var(--text-heading)` |
| Subtitle | `max-w-[560px] mx-auto mt-6`, 18px/20px, `var(--text-muted)` |

### Props

None.

### Historical note

Originally supported a two-line title via `title: string[]` with `<br />`. Now a single string. Do not re-split without user request.

---

## FeaturedVerse

**File:** `components/FeaturedVerse.tsx`

### Purpose

Highlighted scripture in an olive panel with diamond accent.

### Data

- `site.featuredVerse.text`
- `site.featuredVerse.reference`

### DOM structure

```
<section aria-label="Featured scripture">
  <div>           <!-- absolute diamond container, aria-hidden -->
    <span />      <!-- rotated square -->
  </div>
  <blockquote>{text}</blockquote>
  <p>{reference}</p>
</section>
```

### Key styles

| Element | Value |
|---------|-------|
| Panel bg | `var(--olive)` |
| Panel text | `var(--parchment-light)` |
| Max width | 760px |
| Padding | 34px vertical, 32px/48px horizontal |
| Quote | Cormorant italic, 22px/27px |
| Reference | 13px uppercase, `var(--gold-muted)` |

### Props

None.

---

## StudyTools

**File:** `components/StudyTools.tsx`

### Purpose

Section wrapper for the tool card grid. Maps `studyTools` array to `ToolCard` components.

### Data

- `site.toolsSectionLabel`
- `studyTools` from `@/data/tools`

### DOM structure

```
<section aria-labelledby="study-tools-heading">
  <div>
    <h2 id="study-tools-heading">{label}</h2>
  </div>
  <div>  <!-- grid -->
    <ToolCard tool={...} /> × N
  </div>
</section>
```

### Key styles

| Element | Value |
|---------|-------|
| Section heading margin | `mt-14 mb-[26px]` |
| Grid | `grid-cols-1 md:grid-cols-2 gap-7` |
| Container | `max-w-[860px] mx-auto px-6 md:px-10` |

### Props

None.

### Extension

Adding tools requires only `data/tools.ts` changes — this component auto-renders all entries.

---

## ToolCard

**File:** `components/ToolCard.tsx`

### Purpose

Clickable card linking to an external study tool.

### Props

```ts
type ToolCardProps = {
  tool: StudyTool;  // from @/data/tools
};
```

### DOM structure

```
<a href target="_blank" rel="noopener noreferrer">
  <Image />     <!-- next/image -->
  <span>        <!-- eyebrow -->
  <h3>          <!-- title -->
  <p>           <!-- description -->
  <span>        <!-- CTA -->
</a>
```

### Dependencies

- `next/image` for optimized icon loading
- `StudyTool` type from `@/data/tools`

### Key styles

See `DESIGN_SYSTEM.md` → Tool cards section.

### Behavior

- Entire card is one `<a>` — single tab stop per card
- Hover lift animation (CSS only)
- Opens external URL in new tab

### Image

```tsx
<Image
  src={tool.icon}
  alt={tool.iconAlt}
  width={88}
  height={88}
  className="h-[88px] w-[88px] object-contain drop-shadow-[...]"
/>
```

`tool.icon` must be a path under `public/`.

---

## SiteFooter

**File:** `components/SiteFooter.tsx`

### Purpose

Closing scripture verse and contact mailto link.

### Data

- `site.footer.text`
- `site.footer.contactLabel`
- `site.footer.contactEmail`

### DOM structure

```
<footer>
  <span />   <!-- gold rule, aria-hidden -->
  <p>{verse}</p>
  <a href="mailto:...">{contactLabel}</a>
</footer>
```

### Key styles

| Element | Value |
|---------|-------|
| Container | `max-w-[760px] mx-auto mt-14 px-6 md:px-10 text-center` |
| Verse | 15px, `var(--text-footer)` |
| Contact link | Gold underline style (matches ToolCard CTA) |
| Contact hover | `hover:opacity-80` |

### Props

None.

---

## Root layout (not in `components/` but related)

**File:** `app/layout.tsx`

### Responsibilities

1. Load Google fonts as CSS variables on `<html>`
2. Export `metadata` for SEO
3. Import `globals.css`
4. Render `{children}` in `<body>`

### Font CSS variables

Applied to `<html className>`:

- `--font-cormorant`
- `--font-eb-garamond`

---

## Component dependency table

| Component | Imports |
|-----------|---------|
| `BrandBar` | `@/data/site` |
| `Hero` | `@/data/site` |
| `FeaturedVerse` | `@/data/site` |
| `StudyTools` | `@/data/site`, `@/data/tools`, `@/components/ToolCard` |
| `ToolCard` | `next/image`, `@/data/tools` (type) |
| `SiteFooter` | `@/data/site` |

No component imports another section component except `StudyTools` → `ToolCard`.

---

## When to create a new component

Create a new component when:

- Adding a distinct page section with its own layout concerns
- The same UI pattern is reused 2+ times

Do **not** create components for:

- One-off text changes (edit `data/site.ts`)
- Single new tool card (edit `data/tools.ts`)
