# BeautiLuxe Nail Spa — Landing Page

Vite + React 18 + Tailwind CSS v4, built on the BeautiLuxe design system (Deep Jade / Milk Foam / Sea Glass, Poppins + Inter, Almond Frame motif).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Before launch

1. **Booking link** — every "Book Now" button reads `VITE_BOOKING_URL`. Add it in Vercel → Project → Settings → Environment Variables (or `.env.local` locally). Until it's set, buttons point to `#`.
2. **Deploy** — import the repo in Vercel (framework preset: Vite). No other config needed.

## Where things live

| Change | File |
| --- | --- |
| Address, phone, hours, socials, Google rating, drinks | `src/data/business.js` |
| Service menu + signature services | `src/data/services.js` |
| Google reviews (verbatim, with reviewer photos) | `src/data/reviews.js` + `src/assets/reviewers/` |
| Gallery + hero photos | `src/data/gallery.js` + `src/assets/photos/` |
| Colors, fonts, radius, sheen, almond mask | `src/index.css` |
| SEO meta + NailSalon JSON-LD | `index.html` |

## Components

- `components/core` — `Button` (primary / secondary / ghost / coral / light / outlineLight), `Badge`, `ServiceCard`
- `components/media` — `AlmondFrame` (signature crop + 1.5px jade hairline), `CoralDrop`
- `components/feedback` — `RatingStars` (Foil Gold, dark surfaces only)
- `components/navigation` — `Header`, `StickyBookBar` (mobile only)
- `hooks/useOpenStatus` — live "Open now / Opens at" in salon time (America/New_York)

## Content notes

- Photos are the salon's real client work, pulled from the current website gallery.
- Reviews are real 5-star Google reviews quoted verbatim (trimmed excerpts marked with …). Rating 4.8 / 1,085 reviews as of Sep 2026 — update `BUSINESS.google` periodically.
- No prices are published (matches current site). Swap in real prices in `services.js` when available.
