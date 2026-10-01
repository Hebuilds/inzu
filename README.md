# Inzu Connect — landing page

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · framer-motion · lucide-react · shadcn-style UI primitives.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `app/globals.css` | Design tokens as a Tailwind `@theme`, plus the `display` / `headline` / `shell` utilities |
| `lib/content.ts` | All copy, links and sample listings. `APP_URL` points at the live app |
| `components/sections/*` | One file per page section, in the order used by `app/page.tsx` |
| `components/hero/*` | The pinned opening scene: floating cards (`flyer.tsx`) that dock into `dashboard.tsx` |
| `components/platform/illustrations.tsx` | The animated line illustrations in the audience cards |
| `components/product/*` | Product screens used in the feature tour |
| `components/motion/*` | Scroll-text primitives: `FallingLines`, `ScrubWords`, `Reveal`, `CountUp` |

## Before going live

- **Fonts** — Newsreader and Inter stand in for Signifier and Söhne (licensed). Swap them in `app/layout.tsx`.
- **Listings** — `properties` and `lodges` in `lib/content.ts` are sample data with Unsplash photos. Wire them to the listings API.
- **Logo** — `components/site/logo.tsx` is an SVG redraw; drop in the real asset if preferred.
- **Links** — set `APP_URL` in `lib/content.ts` to `""` when this page moves inside the main app.
