# BeautiLuxe Nail Spa — Landing Page

Vite + React 18 + Tailwind CSS v4, built on the BeautiLuxe design system (Deep Jade / Milk Foam / Sea Glass, self-hosted Playfair Display + Inter, soft rounded-rect photo frame motif). Entrance and hover motion, plus the two infinite-loop carousels, via `motion` (Framer Motion).

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
| Google reviews (verbatim, with reviewer photos where we have one) | `src/data/reviews.js` + `src/assets/reviewers/` |
| Gallery + hero photos | `src/data/gallery.js` + `src/assets/photos/` |
| Colors, fonts, radius, sheen | `src/index.css` |
| SEO meta + NailSalon JSON-LD | `index.html` |

## Components

- `components/core` — `Button` (primary / secondary / ghost / coral / light / outlineLight), `Badge`
- `components/media` — `PhotoFrame` (signature rounded-rect crop + 1.5px jade/gold hairline), `CoralDrop`, `InitialAvatar` (monogram fallback for reviewers we don't have a photo on file for)
- `components/carousel` — `SignatureShowcase` (5-slot 3D coverflow for the Signatures section — mouse-parallax tilt, contained cinematic blur backdrop, staggered badge/title/tagline reveal; the long description sits below the dark showcase in the page's own light theme, not overlaid on the photo. Hardcoded for exactly 5 signature services — see the file-level comment in `SignatureShowcase.jsx` before adding/removing one. See `SignatureShowcase.css`)
- `components/feedback` — `RatingStars` (Foil Gold, dark surfaces only)
- `components/navigation` — `Header`, `StickyBookBar` (mobile only)
- `hooks/useOpenStatus` — live "Open now / Opens at" in salon time (America/New_York)
- `hooks/useLoopCarousel` — shared infinite-loop scroll-snap engine (data rendered 3×, silently re-centers into the middle copy once a swipe settles); powers the auto-advancing Reviews strip
- `hooks/useTilt` — mouse-parallax "postcard tilt" (rAF + lerp, writes CSS custom properties directly, never React state); powers the Signatures 3D showcase, disabled under `prefers-reduced-motion`

## Content notes

- Photos are the salon's real client work, pulled from the current website gallery. The Signatures carousel reuses gallery photos by mood (no dedicated pedicure/paraffin/lash/ombre close-ups exist yet) — swap in literal shots in `Signatures.jsx`'s `PHOTO_BY_TITLE` map when available.
- The two newest signatures (Eyelash Extensions, Ombre Full Set) were added from services already on the salon's own menu/reviews, with draft tagline + description copy — review and edit that copy in `data/services.js`'s `SIGNATURES` array before launch.
- Reviews are real 5-star Google reviews quoted verbatim (trimmed excerpts marked with …), sourced from the salon's own Google Business Profile. The four most recent don't have a photo on file, so they show an initials monogram instead of scraping a reviewer's personal photo. Rating 4.8 / 1,085 reviews as of Sep 2026 — update `BUSINESS.google` periodically. The Reviews strip auto-advances every 4.5s (pauses on hover/focus, disabled under `prefers-reduced-motion`).
- No prices are published (matches current site). Swap in real prices in `services.js` when available.
