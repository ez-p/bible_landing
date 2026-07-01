# Implementation Guide

Step-by-step recipes for common changes. Follow these before improvising new patterns.

---

## Local development

### First-time setup

```bash
cd bible_landing
npm install
npm run dev
```

Open http://localhost:3000

### Verify before committing

```bash
npm run lint
npm run build
```

Both must pass.

---

## Change site copy

### Edit hero, brand bar, verses, footer, or contact

1. Open `data/site.ts`
2. Edit the relevant field (see `CONTENT_MODEL.md` for field names)
3. Save — dev server hot-reloads
4. If subtitle meaningfully changed, consider syncing `app/layout.tsx` `description` and `openGraph.description`

**Do not** edit copy inside `components/*.tsx`.

### Example: change contact email

```ts
// data/site.ts
footer: {
  // ...
  contactEmail: "new.email@example.com",
},
```

---

## Change SEO / page title

1. Open `app/layout.tsx`
2. Edit the `metadata` export object
3. Keep `metadataBase` as `https://paulpowell.cc` unless domain changes

```ts
export const metadata: Metadata = {
  title: "New Title",
  description: "New description…",
  // ...
};
```

---

## Add a study tool card

### Steps

1. **Add icon image** to `public/images/`
   - PNG recommended, roughly square
   - Example: `public/images/my-new-tool.png`

2. **Append entry** to `studyTools` in `data/tools.ts`:

```ts
{
  href: "https://my-tool.example.com/",
  icon: "/images/my-new-tool.png",
  iconAlt: "Descriptive alt text",
  eyebrow: "Category Label",
  title: "Tool Display Name",
  description: "One or two sentences about the tool.",
  cta: "Open the study →",
},
```

3. **Verify** `href` is unique (used as React `key`)
4. Run `npm run build`

### Grid behavior

| Tool count | Desktop layout |
|------------|----------------|
| 1 | Single card, half-width column (left cell) |
| 2 | Two columns (current) |
| 3 | Two columns — third wraps to second row |
| 4 | 2×2 grid |

No component changes needed for 1–N tools.

### Remove a tool

Delete its object from `studyTools` array. Optionally remove unused image from `public/images/`.

---

## Change colors or background

1. Open `app/globals.css`
2. Edit CSS custom properties in `:root`
3. Preview in browser — components reference tokens via `var(--token-name)`

To change only one component's color, prefer editing that component's `style={{ }}` only if it's a one-off. Global palette changes belong in `globals.css`.

---

## Change typography

### Global font change

1. Edit `app/layout.tsx` — swap `next/font/google` imports
2. Update CSS variable names on `<html className>`
3. Update `font-[family-name:var(--font-*)]` references in components

### Size change for one element

Edit the Tailwind classes in the relevant `components/*.tsx` file.

---

## Change page section order

1. Open `app/page.tsx`
2. Reorder component JSX
3. Verify visual result — no other files need changes for pure reordering

---

## Add a new page section

Example: add a "About" section between Hero and FeaturedVerse.

1. Create `components/About.tsx` following existing patterns:
   - Import data from `data/site.ts` (add fields there first)
   - Use semantic HTML (`<section>`)
   - Use design tokens from `globals.css`

2. Add fields to `data/site.ts` if needed

3. Import and place in `app/page.tsx`:

```tsx
import { About } from "@/components/About";

// ...
<Hero />
<About />
<FeaturedVerse />
```

4. Document in `docs/COMPONENTS.md`

---

## Add favicon

1. Add `app/icon.png` (or `app/favicon.ico`) per [Next.js metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
2. Next.js auto-includes in `<head>` — no `layout.tsx` change required

---

## Add Open Graph image

1. Add image to `public/og-image.png` (recommended 1200×630)
2. Update `app/layout.tsx`:

```ts
openGraph: {
  // ...
  images: [{ url: "/og-image.png", width: 1200, height: 630 }],
},
```

---

## Add Vercel Analytics

1. `npm install @vercel/analytics`
2. Add to `app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";

// inside <body>
{children}
<Analytics />
```

Requires `"use client"` wrapper or use the React import as documented by Vercel.

Only add if explicitly requested.

---

## Change responsive breakpoint for tool grid

Current: `md:grid-cols-2` (768px).

To use a different breakpoint, edit `components/StudyTools.tsx`:

```tsx
// Example: 2 columns from large screens only
className="... grid-cols-1 lg:grid-cols-2 ..."
```

---

## Change tool card hover behavior

Edit `components/ToolCard.tsx` Tailwind classes on the `<a>` element.

Always retain `motion-reduce:*` variants when modifying hover transforms.

---

## Troubleshooting

### Build fails on `next/image`

- Verify `tool.icon` path exists under `public/`
- Path must start with `/` (e.g., `/images/foo.png`)

### Font not applying

- Check `<html>` has font variable classes from `layout.tsx`
- Check component uses `font-[family-name:var(--font-cormorant)]` for display text

### Copy change not visible

- Confirm you edited `data/site.ts` not a component
- Hard refresh browser (Ctrl+Shift+R)

### TypeScript error after editing `site` shape

- If you add fields to `site`, ensure components reference them
- `as const` on `site` makes values readonly — that's intentional

### `studyTools` duplicate key warning

- Each `href` must be unique

---

## Pre-merge checklist

- [ ] `npm run lint` — no errors
- [ ] `npm run build` — succeeds
- [ ] Visual check at mobile (~375px) and desktop (~1200px) widths
- [ ] External tool links open in new tab
- [ ] Contact mailto link correct
- [ ] Docs updated if schema or architecture changed
