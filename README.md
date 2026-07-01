# Paul's Bible Study

A single-page landing site for **Paul's Bible Study** — a hub that links to focused web tools for personal Scripture study. The design follows the **Reverent Classic** direction (Option 1a) from the original design mock: warm parchment tones, centered layout, and traditional typography.

**Live site:** [paulpowell.cc](https://paulpowell.cc)

---

## Overview

This repository contains a static Next.js landing page. It introduces the study tools collection, highlights a featured verse, and links out to each tool in a new tab. There is no backend, authentication, or database — all content is defined in TypeScript data files and rendered at build time.

### Linked study tools

| Tool | Description | URL |
|------|-------------|-----|
| **Scripture Word Study** | Expound the meaning of a passage through its original Greek and Hebrew words. | [bible-xplr.vercel.app](https://bible-xplr.vercel.app/) |
| **Cross-Reference Guide** | Generate contextual study guides that connect scripture to scripture. | [bible-xref2.vercel.app](https://bible-xref2.vercel.app/) |

---

## Features

- **Single-page layout** — brand bar, hero, featured verse, tool cards, and footer on one scrollable page
- **Content-driven** — copy and tool cards live in `data/` for easy updates without touching components
- **Responsive** — two-column tool grid on desktop; cards stack vertically on mobile
- **Accessible defaults** — semantic HTML, descriptive `alt` text on icons, visible focus styles, and reduced-motion support for hover animations
- **SEO-ready** — page title, meta description, and Open Graph metadata configured in `app/layout.tsx`
- **Optimized assets** — tool icons served via `next/image`; fonts loaded through `next/font/google`

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties |
| Fonts | Cormorant Garamond & EB Garamond via `next/font/google` |
| Hosting | [Vercel](https://vercel.com/) (recommended) |

---

## Project structure

```
bible_landing/
├── app/
│   ├── globals.css          # Design tokens and base styles
│   ├── layout.tsx           # Root layout, fonts, site metadata
│   └── page.tsx             # Landing page composition
├── components/
│   ├── BrandBar.tsx         # Top brand label with gold rules
│   ├── Hero.tsx             # Main headline and subtitle
│   ├── FeaturedVerse.tsx    # 2 Timothy 2:15 (KJV) panel
│   ├── StudyTools.tsx       # Tool section wrapper and grid
│   ├── ToolCard.tsx         # Individual linked tool card
│   └── SiteFooter.tsx       # Closing verse and message
├── data/
│   ├── site.ts              # Site-wide copy (hero, verse, footer)
│   └── tools.ts             # Study tool cards (href, icon, copy)
├── public/
│   └── images/
│       ├── Bible_Explorer.png   # Scripture Word Study icon
│       └── bible-xref2.png      # Cross-Reference Guide icon
├── bible_study_landing.html     # Original design mock (reference)
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later (Node 20+ recommended)
- npm (included with Node.js)

### Install dependencies

```bash
git clone <your-repo-url>
cd bible_landing
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads when you edit files.

### Production build

```bash
npm run build
npm start
```

`npm run build` generates an optimized production build. `npm start` serves it locally on port 3000.

### Lint

```bash
npm run lint
```

---

## Deployment

This project is designed for deployment on **Vercel**.

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Use the default settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Output:** handled automatically by Next.js
4. Deploy.

### Custom domain

To serve the site at **paulpowell.cc**:

1. In your Vercel project, go to **Settings → Domains**.
2. Add `paulpowell.cc` (and optionally `www.paulpowell.cc`).
3. Configure the DNS records Vercel provides at your domain registrar.
4. Wait for DNS propagation; Vercel will issue an SSL certificate automatically.

No environment variables are required for the current static landing page.

---

## Customizing content

### Site copy

Edit `data/site.ts` to change the brand label, hero headline, featured verse, section heading, or footer text.

```ts
export const site = {
  brandLabel: "My Bible Study Tools & Resources",
  hero: {
    title: ["Study to Show", "Yourself Approved"],
    subtitle: "…",
  },
  // …
};
```

### Metadata and SEO

Update `app/layout.tsx` to change the page `<title>`, meta description, or Open Graph fields. The `metadataBase` is set to `https://paulpowell.cc`.

### Design tokens

Colors and background gradients are defined as CSS variables in `app/globals.css`. Adjust `--bg-parchment-*`, `--olive`, `--gold`, and related tokens to tweak the palette globally.

---

## Adding a new study tool

1. **Add an icon** to `public/images/` (PNG recommended; roughly square works best).

2. **Append an entry** to the `studyTools` array in `data/tools.ts`:

```ts
{
  href: "https://your-new-tool.example.com/",
  icon: "/images/your-icon.png",
  iconAlt: "Short description for screen readers",
  eyebrow: "Category Label",
  title: "Tool Name",
  description: "One or two sentences describing what the tool does.",
  cta: "Open the study →",
},
```

3. Save the file. The new card appears automatically in the grid — no component changes needed.

External links open in a new tab with `rel="noopener noreferrer"`.

---

## Design reference

The visual direction is **Option 1a — Reverent Classic** from `bible_study_landing.html`:

- Centered, parchment-style background with radial gradient
- Navy headings (`#1c2b49`) and olive accent panel (`#4d5330`)
- Gold decorative rules and card borders (`#bd9a5f`)
- Cormorant Garamond for display text; EB Garamond for labels and body

Tool card icons are displayed at 88×88 pixels with `object-fit: contain` and a subtle drop shadow, matching the mock.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Future enhancements

Possible additions that fit the current architecture without major changes:

- Favicon and Open Graph image (`app/icon.png` or `public/og-image.png`)
- [Vercel Analytics](https://vercel.com/docs/analytics) for lightweight traffic insights
- Additional study tools via `data/tools.ts`
- Custom 404 page

---

## License

Private project. All rights reserved unless otherwise specified by the repository owner.
