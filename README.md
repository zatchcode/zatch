# Zatch Landing (Next.js)

Single-page marketing site for Zatch with a waitlist funnel, high-impact hero motion, and neon-on-black brand treatment.

## Tech Stack
- Next.js 15 (App Router) with TypeScript (strict)
- Tailwind CSS with custom design tokens
- Framer Motion for orchestrated hero, parallax, and reveal animations
- shadcn/ui primitives (button, input, select, toast)
- next/font (Inter), next/image, and Next metadata utilities

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   The site runs at http://localhost:3000.

## Scripts
- `npm run dev` – start the Next.js dev server with Turbopack
- `npm run build` – create a production build
- `npm run start` – run the production build locally
- `npm run lint` – lint the project with ESLint

## Project Structure Highlights
```
app/
  layout.tsx            # Global metadata, shared UI chrome, toasts
  page.tsx              # Landing page assembly
  api/subscribe/route.ts# Mock waitlist endpoint
  robots.txt/route.ts   # Robots policy
  sitemap/route.ts      # Simple sitemap
components/
  BetaForm.tsx          # Waitlist form with validation + toasts
  Header.tsx, Hero.tsx, NeonWave.tsx, Particles.tsx, Section.tsx, Logo.tsx
  Toaster.tsx           # Toast context + renderer wrapper
  ui/…                  # shadcn/ui primitives
lib/
  motion.ts             # Framer Motion helpers + reduced-motion utilities
  utils.ts              # Class helper + email/phone validators
public/
  og.png                # Open Graph card
```

## Deployment (Vercel)
1. Push the project to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the repository into Vercel and select the Next.js framework preset.
3. Vercel automatically installs dependencies, runs `npm run build`, and provisions the production deployment.
4. Configure the production domain (e.g., `zatch.in`) inside Vercel's dashboard.

## Accessibility & Optimisation Notes
- Prefers-reduced-motion is respected for hero reveals, parallax, and particles.
- Focus rings are clearly visible on all interactive controls.
- Waitlist form validates email and Indian mobile numbers client-side and provides toast feedback.
- Metadata, Open Graph, robots, and sitemap endpoints are configured for SEO and shareability.

Happy launching!

## Social Launch Assets

### Post 1 – “Something Real Is Coming”
- **Visual**: Black screen with a subtle neon green pulse (heartbeat monitor blip) and the word “real” slowly fading in and out.
- **Caption**:
  ```
  Shopping feels fake lately, doesn’t it?

  Something real is coming.

  #Zatch #ComingSoon #NotAnotherShoppingApp
  ```
