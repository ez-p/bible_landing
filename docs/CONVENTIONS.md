# Conventions

Coding standards and constraints for this repository. LLM agents should follow these unless the user explicitly requests otherwise.

---

## General principles

1. **Minimize scope** — smallest change that solves the task
2. **Content in `data/`** — never hardcode user-facing strings in components
3. **Match existing patterns** — read neighboring files before adding code
4. **No over-engineering** — no abstractions for one-time operations
5. **Static first** — no backend unless explicitly requested

---

## File and naming conventions

| Item | Convention |
|------|------------|
| Components | PascalCase filenames: `ToolCard.tsx` |
| Data files | camelCase exports: `site`, `studyTools` |
| CSS tokens | kebab-case with semantic prefixes: `--text-heading`, `--bg-parchment-start` |
| Imports | Use `@/` alias, not relative `../../` |
| Routes | App Router only under `app/` |

---

## React / Next.js conventions

### Server Components default

- Do **not** add `"use client"` unless client interactivity is required (forms, hooks, browser APIs)
- Current project has **zero** client components

### No unnecessary state

- No `useState`, `useEffect`, or Context for static content
- Hover effects are CSS-only

### Page structure

- `app/page.tsx` composes sections — minimal logic
- One export default per page/layout file

### Images

- Use `next/image` for tool icons
- Always provide `width`, `height`, and meaningful `alt`

### Links

External tool links:

```tsx
<a href={url} target="_blank" rel="noopener noreferrer">
```

Internal links (if ever added):

```tsx
import Link from "next/link";
<Link href="/path">...</Link>
```

---

## Styling conventions

### Token-first colors

Prefer CSS variables from `globals.css`:

```tsx
style={{ color: "var(--text-heading)" }}
```

Not hardcoded hex in components (except rgba borders/shadows already established in ToolCard).

### Tailwind for layout

Use Tailwind utilities for:

- Flexbox / grid
- Spacing (`mt-`, `px-`, `gap-`)
- Responsive prefixes (`md:`)
- Motion utilities (`motion-reduce:`)

### Do not introduce

- CSS Modules (unless refactoring entire project)
- styled-components / emotion
- UI component libraries (shadcn, MUI, etc.)
- Sass/Less

---

## TypeScript conventions

- `strict: true` — no implicit any
- Export types alongside data: `StudyTool` in `tools.ts`
- Use `as const` on `site` for readonly content object
- Prefer explicit prop types on components with props

```ts
type ToolCardProps = {
  tool: StudyTool;
};
```

---

## Content conventions

- Scripture quotations use curly quotes in source strings
- Reference format: `Book Chapter:Verse · TRANSLATION` (e.g. `2 Timothy 3:16 · ESV`)
- CTA arrow: `→` (unicode arrow, not `->`)
- Contact uses `mailto:` protocol, not forms

---

## Git / commit conventions

- Do not commit unless user requests
- Do not commit `node_modules/`, `.next/`
- Do not commit secrets or `.env` files

---

## Out of scope

Do **not** add without explicit user request:

| Feature | Reason |
|---------|--------|
| Authentication | Static landing page |
| Database / ORM | No persistent data |
| API routes | No server logic needed |
| CMS integration | Content in `data/` files |
| i18n | English only |
| Dark mode | Single design direction |
| Blog / multi-page nav | Single page scope |
| Email contact forms | `mailto:` suffices |
| Test suite | None configured |
| CI/CD config | Use Vercel defaults |

---

## Anti-patterns to avoid

### Hardcoding copy

```tsx
// BAD
<h1>Paul's Bible Tools</h1>

// GOOD
<h1>{site.hero.title}</h1>
```

### Adding client components for static UI

```tsx
// BAD — unnecessary
"use client";
export function Hero() { ... }

// GOOD — server component
export function Hero() { ... }
```

### Duplicating metadata strings

When changing hero subtitle, also check `app/layout.tsx` description — but don't create a complex shared module for just two strings unless the project grows.

### Breaking the data-driven tool pattern

```tsx
// BAD — hardcoded second card in JSX
<ToolCard tool={studyTools[0]} />
<div>Another tool...</div>

// GOOD — map over array
{studyTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
```

### Using `output: 'export'` without reason

Standard Vercel Next.js deployment works without static export. Don't add unless user needs offline static hosting elsewhere.

---

## Documentation maintenance

When making architectural or content schema changes, update the corresponding `docs/` file in the same change set:

| Change type | Update |
|-------------|--------|
| New component | `COMPONENTS.md`, possibly `ARCHITECTURE.md` |
| New data field | `CONTENT_MODEL.md` |
| New design token | `DESIGN_SYSTEM.md` |
| New workflow | `IMPLEMENTATION_GUIDE.md` |
| Scope change | `PROJECT_OVERVIEW.md` |

Keep "Current values" tables accurate.

---

## README vs docs/

| File | Audience | Content |
|------|----------|---------|
| `README.md` (root) | GitHub visitors | Quick start, deploy, overview |
| `docs/` | LLMs and maintainers | Exhaustive design + implementation reference |

Root README may lag behind `docs/` — **`docs/` and source code are authoritative**.
