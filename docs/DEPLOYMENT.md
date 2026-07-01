# Deployment

## Overview

| Property | Value |
|----------|-------|
| **Target platform** | [Vercel](https://vercel.com/) |
| **Production domain** | `paulpowell.cc` |
| **Framework** | Next.js (auto-detected) |
| **Build command** | `npm run build` |
| **Output directory** | `.next` (automatic) |
| **Install command** | `npm install` |
| **Node version** | 18.18+ (20+ recommended) |
| **Environment variables** | None required |

---

## Build process

### Local production build

```bash
npm run build
npm start   # serves on http://localhost:3000
```

### Expected build output

```
Route (app)                Size     First Load JS
┌ ○ /                      ~5 kB    ~108 kB
└ ○ /_not-found            ~1 kB    ~103 kB

○  (Static)  prerendered as static content
```

The `/` route is fully static — no server-side data fetching at request time.

### Build requirements

- `public/images/` icons must exist for `next/image` paths in `data/tools.ts`
- No `.env` files needed
- `next.config.ts` is empty — no special Vercel config required

---

## Vercel deployment (first time)

### 1. Push to Git remote

```bash
git add .
git commit -m "Your message"
git push origin main
```

### 2. Import project in Vercel

1. Go to https://vercel.com/new
2. Import the Git repository
3. Vercel auto-detects Next.js
4. Confirm settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `.` (repository root)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** (leave default)
5. Deploy

### 3. Verify deployment

- Vercel provides a `*.vercel.app` preview URL
- Confirm all sections render
- Click each tool card — opens correct external URL in new tab
- Click Contact Me — opens mail client with `paul.powell@gmail.com`

---

## Custom domain: paulpowell.cc

### Vercel configuration

1. Project → **Settings** → **Domains**
2. Add `paulpowell.cc`
3. Optionally add `www.paulpowell.cc` with redirect to apex

### DNS configuration

At your domain registrar, add records Vercel provides. Typical setup:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` (verify current Vercel IP in dashboard) |
| CNAME | `www` | `cname.vercel-dns.com` |

DNS propagation may take minutes to 48 hours. Vercel auto-provisions SSL via Let's Encrypt.

### Metadata alignment

`app/layout.tsx` already sets:

```ts
metadataBase: new URL("https://paulpowell.cc"),
openGraph: { url: "https://paulpowell.cc", ... },
```

If domain changes, update these URLs.

---

## Continuous deployment

Default Vercel behavior:

| Event | Result |
|-------|--------|
| Push to `main` | Production deployment |
| Push to other branch | Preview deployment |
| Pull request | Preview deployment with unique URL |

No `vercel.json` required for standard behavior.

---

## Optional: `vercel.json`

Not currently used. Add only if needed:

### www → apex redirect

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.paulpowell.cc" }],
      "destination": "https://paulpowell.cc/:path*",
      "permanent": true
    }
  ]
}
```

### Security headers (if requested)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

---

## Environment variables

None required for current features.

If added in future:

| Variable | Purpose |
|----------|---------|
| — | — |

Configure in Vercel: Project → Settings → Environment Variables.

---

## Monitoring and analytics

Not configured in v1.

To add Vercel Analytics:

1. Enable in Vercel project dashboard, or
2. Install `@vercel/analytics` per `IMPLEMENTATION_GUIDE.md`

---

## Rollback

In Vercel dashboard:

1. **Deployments** tab
2. Find previous successful deployment
3. **⋯** menu → **Promote to Production**

---

## Related deployments (external)

These apps are linked from the landing page but deployed separately:

| App | URL | This repo? |
|-----|-----|------------|
| Scripture Word Study | `bible-xplr.vercel.app` | No |
| Cross-Reference Study | `bible-xref2.vercel.app` | No |

Updating this landing page does not deploy those apps. URL changes require editing `data/tools.ts`.

---

## Pre-deploy checklist

- [ ] `npm run build` passes locally
- [ ] `npm run lint` passes
- [ ] Tool icons present in `public/images/`
- [ ] External URLs in `data/tools.ts` are correct
- [ ] `metadataBase` matches production domain
- [ ] Contact email correct in `data/site.ts`

---

## Troubleshooting deployment

### Build fails on Vercel but works locally

- Check Node version in Vercel project settings (match local: `node -v`)
- Review build logs for missing files (often image paths)

### Images 404 in production

- Files must be in `public/`, not repository root
- Paths in `data/tools.ts` start with `/images/...`

### Wrong domain in OG tags

- Update `metadataBase` in `app/layout.tsx`
- Redeploy

### Fonts not loading

- `next/font/google` fetches at build time — Vercel build environment needs network access (default)
