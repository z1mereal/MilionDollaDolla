# PRD — MINIFIG // ARCHIVE

## Original problem statement
"Build a landing page: make me a minimalist modern shop page no rounded borders etc white and black theme with dark and light mode the shop will sell minifigures"
Plus: award-worthy (Awwwards-level) art direction — kinetic hero with masked line-by-line reveal, deliberate product photography (spotlight, clipped frames), numbered manifesto chapters, slow editorial marquee, framer-motion + lenis, subtle parallax/3D hero moment.

## User personas
- Collectors of limited-edition minifigures who value design-led presentation
- Design-conscious shoppers browsing in light or dark mode

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, lenis smooth scroll, sonner toasts. Components in `/app/frontend/src/components/shop/`.
- Backend: FastAPI, MongoDB (motor). `GET /api/products` (seeded catalog), `POST /api/newsletter` (idempotent subscribe).
- Theme: `dark` class on `<html>`, persisted in localStorage (`mfa-theme`). Pure monochrome CSS vars, zero border-radius enforced globally.

## Core requirements (static)
- Strict black/white palette with dark/light mode toggle
- Zero rounded corners anywhere
- Minifigure product catalog showcase
- Landing page sections: hero, marquee, product grid, manifesto, newsletter/footer

## Implemented (2026-07 — current session)
- Kinetic hero: masked line-by-line headline reveal, mouse-tilt 3D + scroll parallax on clipped hero photo, stats bar
- 8-product catalog served from MongoDB (seeded on startup), categories: VANGUARD / OPERATIVE / ARTIFACT
- Product grid: category filters, spotlight cursor-tracked hover, status + edition badges, quick-view modal
- Cart drawer: quantities, removal, subtotal, free-shipping progress bar (client-side; checkout is a demo toast)
- Manifesto: 3 numbered chapters + editorial image band ("The Vault")
- Two slow editorial marquees (one reversed), newsletter signup wired to backend with toasts
- All interactive elements carry data-testid attributes

## Backlog
- P0: Real checkout (Stripe), order persistence
- P1: Product detail pages, search, Series 02 countdown, cart persistence (localStorage)
- P2: 360° product spins, wishlist, admin panel for drops, email sending for newsletter (Resend)

## Next tasks
1. Stripe checkout integration for the cart
2. Persist cart across reloads
3. Individual product pages with full specs
4. Series 02 drop countdown module
