# Content Model

All user-facing text is defined in TypeScript data files or Next.js metadata. **Do not hardcode copy in components.**

Source of truth files:

- `data/site.ts` — site-wide copy
- `data/tools.ts` — study tool cards
- `app/layout.tsx` — HTML `<title>`, meta description, Open Graph

---

## `data/site.ts`

Exported constant: `site` (read-only via `as const`).

### Schema

```ts
export const site = {
  brandLabel: string;
  hero: {
    title: string;
    subtitle: string;
  };
  featuredVerse: {
    text: string;
    reference: string;
  };
  toolsSectionLabel: string;
  footer: {
    text: string;
    contactLabel: string;
    contactEmail: string;
  };
} as const;
```

### Current values

| Field | Current value |
|-------|---------------|
| `brandLabel` | `Bible Study Tools & Resources` |
| `hero.title` | `Paul's Bible Tools` |
| `hero.subtitle` | `A collection of simple, focused web tools to help you slow down, dig deep, and rightly handle the Word of Truth.` |
| `featuredVerse.text` | `"All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness."` |
| `featuredVerse.reference` | `2 Timothy 3:16 · ESV` |
| `toolsSectionLabel` | `The Study Tools` |
| `footer.text` | `"Thy word is a lamp unto my feet, and a light unto my path."` |
| `footer.contactLabel` | `Contact Me` |
| `footer.contactEmail` | `paul.powell@gmail.com` |

### Consumption map

| Field | Component | HTML element |
|-------|-----------|----------------|
| `brandLabel` | `BrandBar` | `<span>` in `<header>` |
| `hero.title` | `Hero` | `<h1>` |
| `hero.subtitle` | `Hero` | `<p>` |
| `featuredVerse.text` | `FeaturedVerse` | `<blockquote>` |
| `featuredVerse.reference` | `FeaturedVerse` | `<p>` |
| `toolsSectionLabel` | `StudyTools` | `<h2 id="study-tools-heading">` |
| `footer.text` | `SiteFooter` | `<p>` |
| `footer.contactLabel` | `SiteFooter` | `<a>` text |
| `footer.contactEmail` | `SiteFooter` | `href={`mailto:${...}`}` |

### Contact link behavior

```tsx
href={`mailto:${site.footer.contactEmail}`}
```

Opens the user's default email client. No form, no backend.

---

## `data/tools.ts`

### `StudyTool` type

```ts
export type StudyTool = {
  href: string;        // External URL — opens in new tab
  icon: string;        // Path under public/, e.g. "/images/foo.png"
  iconAlt: string;     // Image alt text for accessibility
  eyebrow: string;     // Small uppercase category above title
  title: string;       // Card heading (rendered as H3)
  description: string; // Card body copy
  cta: string;         // Call-to-action label (decorative underline)
};
```

### `studyTools` array

Order in the array = display order left-to-right (desktop), top-to-bottom (mobile).

#### Tool 1: Scripture Word Study

| Field | Value |
|-------|-------|
| `href` | `https://bible-xplr.vercel.app/` |
| `icon` | `/images/Bible_Explorer.png` |
| `iconAlt` | `Word Study` |
| `eyebrow` | `Original Languages` |
| `title` | `Scripture Word Study` |
| `description` | `Expound the meaning of Bible passages through their original Greek and Hebrew words.` |
| `cta` | `Open the study →` |

#### Tool 2: Cross-Reference Study

| Field | Value |
|-------|-------|
| `href` | `https://bible-xref2.vercel.app/` |
| `icon` | `/images/bible-xref2.png` |
| `iconAlt` | `Cross-Reference` |
| `eyebrow` | `Context & Connections` |
| `title` | `Cross-Reference Study` |
| `description` | `Generate contextual study guides that connect scripture to scripture.` |
| `cta` | `Open the study →` |

### React key

`StudyTools` uses `key={tool.href}` when mapping. **URLs must be unique** across tools.

### Link attributes (in `ToolCard`)

```tsx
<a
  href={tool.href}
  target="_blank"
  rel="noopener noreferrer"
>
```

---

## SEO metadata (`app/layout.tsx`)

Separate from `data/site.ts` — must be updated manually when marketing copy changes.

### Current metadata

| Field | Value |
|-------|-------|
| `title` | `Paul's Bible Study` |
| `description` | `A collection of simple, focused web tools to help you slow down, dig deeper, and rightly handle the Word of truth.` |
| `metadataBase` | `https://paulpowell.cc` |
| `openGraph.title` | `Paul's Bible Study` |
| `openGraph.description` | (same as `description`) |
| `openGraph.url` | `https://paulpowell.cc` |
| `openGraph.siteName` | `Paul's Bible Study` |
| `openGraph.type` | `website` |

### Naming inconsistency (intentional note for LLMs)

| Context | Name used |
|---------|-----------|
| HTML `<title>` / Open Graph | Paul's Bible Study |
| Hero H1 on page | Paul's Bible Tools |
| Brand bar | Bible Study Tools & Resources |

These differ by design/history. Do not assume one string replaces all without explicit user request.

### Not configured

- `openGraph.images` — no OG image
- `icons` / favicon — not set
- `twitter` card — not set
- `robots` — default (indexable)

---

## Scripture text conventions

- Featured verse uses **ESV** phrasing; footer verse uses **KJV** phrasing. Both use curly quotation marks in the source strings.
- Reference format: `Book Chapter:Verse · TRANSLATION` (middle dot separator), e.g. `2 Timothy 3:16 · ESV`.
- Preserve typographic quotes `""` when editing — do not replace with straight ASCII quotes unless requested.

---

## Content change checklist

When editing copy, verify:

- [ ] `data/site.ts` updated
- [ ] If hero subtitle changed, consider updating `app/layout.tsx` description
- [ ] If tool added/removed, `data/tools.ts` + `public/images/` updated
- [ ] `npm run build` passes
- [ ] Update this document's "Current values" tables if docs are maintained alongside code
