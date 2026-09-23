# BeautiLuxe Nail Spa — Landing Page

Vite + React 18 + Tailwind CSS v4, built on the BeautiLuxe design system (Deep Jade / Milk Foam / Sea Glass, self-hosted Playfair Display + Inter, soft rounded-rect photo frame motif). Entrance and hover motion, plus the two infinite-loop carousels, via `motion` (Framer Motion).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Before launch

1. **Booking link** — every "Book Now" control (Header, Hero's button, Hero's rotating badge) reads `VITE_BOOKING_URL`. Add it in Vercel → Project → Settings → Environment Variables (or `.env.local` locally). Until it's set, they open the "online booking is almost here, call us" popup (`BookingModal`) instead of navigating anywhere — see `components/core/BookNowButton.jsx` and `context/BookingModalContext.jsx`.
2. **Deploy** — import the repo in Vercel (framework preset: Vite). No other config needed.

## Where things live

| Change | File |
| --- | --- |
| Address, phone, hours, socials, Google rating, drinks | `src/data/business.js` |
| Service menu + signature services | `src/data/services.js` |
| Google reviews (verbatim, with reviewer photos where we have one) | `src/data/reviews.js` + `src/assets/reviewers/` |
| Gallery photos (Our Work carousel + reused by a few Signature cards) | `src/data/gallery.js` + `src/assets/photos/` |
| Hero photos (auto-crossfading) | `data/gallery.js`'s `HERO_INTERIOR_PHOTOS` + `src/assets/photos/hero-salon-interior*.webp` |
| Visit section map background | `src/assets/photos/map-location-1.webp` (a map screenshot centered on the salon, shown blurred + faded behind the Hours/Find-us cards) |
| Colors, fonts, radius, sheen | `src/index.css` |
| SEO meta + NailSalon JSON-LD | `index.html` |

## Components

- `components/core` — `Button` (primary / secondary / ghost / coral / light / outlineLight), `Badge`
- `components/media` — `PhotoFrame` (signature rounded-rect crop + 1.5px jade/gold hairline), `CoralDrop`, `InitialAvatar` (monogram fallback for reviewers we don't have a photo on file for), `RotatingBadge` (slow-spinning circular "Book Now" stamp on the Hero photo — SVG `textPath` so the label stays legible at any rotation angle, paused under `prefers-reduced-motion`)
- `components/carousel` — `SignatureShowcase` (5-slot 3D coverflow for the Signatures section — mouse-parallax tilt, contained cinematic blur backdrop, staggered badge/title/tagline reveal; the long description sits below the dark showcase in the page's own light theme, not overlaid on the photo. Hardcoded for exactly 5 signature services — see the file-level comment in `SignatureShowcase.jsx` before adding/removing one. See `SignatureShowcase.css`); `GalleryCarousel` (hover/tap-to-expand filmstrip for Our Work — every gallery photo stays on screen, width and color driven by each item's distance from the active one, gradient title/caption reveal on the active card, auto-advances every 3.2s. Works for any item count. Below the `sm` breakpoint it switches to a 4-slot window (previous/current/next/next2, the rest `display:none`) with the active photo scrolled into view on every change — the full graduated filmstrip doesn't fit a phone width without the active photo running off screen. See `GalleryCarousel.css`)
- `sections/MarqueeStrip` — continuous auto-scrolling ribbon of the salon's real service categories (from `SERVICE_MENU`), directly under the Hero. Disabled under `prefers-reduced-motion` (see `.marquee-track` in `index.css`)
- `components/carousel/HeroPhotoCarousel` — quiet auto-crossfade for the Hero photo (no manual controls, just a small dot indicator), 5s per slide, pauses on hover/focus, holds on the first photo under `prefers-reduced-motion`. Works for any number of photos in `HERO_INTERIOR_PHOTOS`
- `components/feedback` — `RatingStars` (Foil Gold, dark surfaces only); `BookingModal` ("online booking is almost here, call us" popup — see Booking link above), driven by `context/BookingModalContext` (`BookingModalProvider` wraps the app in `App.jsx`, `useBookingModal()` exposes `open()`)
- `components/core/BookNowButton` — drop-in for any "Book Now" control: a normal external-link `Button` once `VITE_BOOKING_URL` is set, otherwise a button that opens `BookingModal`
- `components/navigation` — `Header`, `StickyBookBar` (mobile only — one inline row: Call Us + Instagram/Facebook/TikTok. No Book Now here by design; it's still in the Header and throughout the page), `FloatingSocialBar` (desktop-only, `lg:` up — a liquid-glass pill (Instagram, Facebook, TikTok, Call) fixed bottom-right, pulled well up from the bottom edge. See `FloatingSocialBar.css`)
- `components/media/TikTokIcon` — the official TikTok mark (Simple Icons); lucide has no TikTok glyph
- `hooks/useOpenStatus` — live "Open now / Opens at" in salon time (America/New_York)
- `hooks/useLoopCarousel` — shared infinite-loop scroll-snap engine (data rendered 3×, silently re-centers into the middle copy once a swipe settles); powers the auto-advancing Reviews strip
- `hooks/useTilt` — mouse-parallax "postcard tilt" (rAF + lerp, writes CSS custom properties directly, never React state); powers the Signatures 3D showcase, disabled under `prefers-reduced-motion`

## Content notes

- Photos are the salon's real client work, pulled from the current website gallery. The Signatures carousel reuses gallery photos by mood (no dedicated pedicure/paraffin/lash/ombre close-ups exist yet) — swap in literal shots in `Signatures.jsx`'s `PHOTO_BY_TITLE` map when available.
- The two newest signatures (Eyelash Extensions, Ombre Full Set) were added from services already on the salon's own menu/reviews, with draft tagline + description copy — review and edit that copy in `data/services.js`'s `SIGNATURES` array before launch.
- Reviews are real 5-star Google reviews quoted verbatim (trimmed excerpts marked with …), sourced from the salon's own Google Business Profile. The four most recent don't have a photo on file, so they show an initials monogram instead of scraping a reviewer's personal photo. Rating 4.8 / 1,085 reviews as of Sep 2026 — update `BUSINESS.google` periodically. The Reviews strip auto-advances every 4.5s (pauses on hover/focus, disabled under `prefers-reduced-motion`).
- No prices are published (matches current site). Swap in real prices in `services.js` when available.
- Each gallery photo's `title`/`subtitle` (in `data/gallery.js`) is a short caption derived from its own `alt` text, not separate copy — edit both together if a photo's description changes.
- The Hero photo is now the salon's own real interior (two shots so far: the manicure-station aisle, and reception — both show the actual BeautiLuxe signage/branding on the wall), auto-crossfading via `HeroPhotoCarousel`. This replaced an earlier placeholder Unsplash stock photo that was only ever meant to be temporary; every image on the page is the salon's own now. Add a third (and beyond) by pushing another `{ src, alt }` onto `HERO_INTERIOR_PHOTOS` — no other code changes needed. Source PNGs (3-4MB each, not committed) were converted to ~1100px-wide webp at q82 (~160-220KB) before adding.
- The Hero is a light 2-column layout (headline/CTA left, photo right with floating "4.8 rated" / "Walk-ins welcome" badges and a spinning "Book Now" stamp) — the page's dark "moments" are Signatures and Reviews.
- "Book Now" was trimmed from the Menu, Drinks, and Visit sections (it's already in the Header, Hero, StickyBookBar, and Signatures) — those three now end on their own supporting content/CTA (a helper line, nothing, and "Get Directions" respectively) instead of repeating the same button a sixth/seventh/eighth time down the page.
