# Documentation Index

This `docs/` folder contains design and implementation documentation for **Paul's Bible Study** (`paulpowell.cc`). The docs are written for human maintainers and for **LLM agents** that need to understand, modify, or extend the project without prior context.

## How to use these docs (LLM ingest guide)

When working on this repository, read documents in this order:

1. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** — What the project is, constraints, scope, and current live state.
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Stack, directory layout, render pipeline, and extension points.
3. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — Visual design tokens, typography, layout, responsive rules, and motion.
4. **[CONTENT_MODEL.md](./CONTENT_MODEL.md)** — All user-facing copy, data schemas, and metadata fields with current values.
5. **[COMPONENTS.md](./COMPONENTS.md)** — Per-component reference: responsibilities, imports, styling, and accessibility.
6. **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** — Step-by-step recipes for common changes.
7. **[CONVENTIONS.md](./CONVENTIONS.md)** — Coding patterns, naming, and anti-patterns to avoid.
8. **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Build, Vercel deploy, and domain configuration.

## Quick reference

| Question | Read |
|----------|------|
| What is this site? | [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) |
| Where does copy live? | `data/site.ts`, `data/tools.ts` — see [CONTENT_MODEL.md](./CONTENT_MODEL.md) |
| How do I add a tool card? | [IMPLEMENTATION_GUIDE.md#add-a-study-tool-card](./IMPLEMENTATION_GUIDE.md) |
| What colors/fonts to use? | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) |
| Which file owns the hero/footer? | [COMPONENTS.md](./COMPONENTS.md) |
| How is it deployed? | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| What should I NOT add? | [CONVENTIONS.md#out-of-scope](./CONVENTIONS.md) |

## Repository map (source files only)

```
bible_landing/
├── app/
│   ├── globals.css       # CSS design tokens, body background
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   └── page.tsx            # Single page — composes all sections
├── components/             # Presentational React components
├── data/                   # Content configuration (primary edit surface)
├── public/images/          # Static tool icons
├── docs/                   # This documentation
├── bible_study_landing.html  # Original design mock (Option 1a reference)
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## Design lineage

The implemented UI follows **Option 1a — Reverent Classic** from `bible_study_landing.html` at the repository root. That file is a bundled Cursor design canvas export and is **not** part of the runtime application. Use it only as a visual reference when matching the original mock.

## Document maintenance

When making substantive code changes, update the relevant doc(s) in the same PR/commit:

- Copy changes → `CONTENT_MODEL.md`
- New components → `COMPONENTS.md`, `ARCHITECTURE.md`
- New design tokens → `DESIGN_SYSTEM.md`
- New workflows → `IMPLEMENTATION_GUIDE.md`

Keep **current values** in docs aligned with `data/site.ts`, `data/tools.ts`, and `app/layout.tsx`.
