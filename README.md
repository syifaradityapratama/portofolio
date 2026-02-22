# SRP — Developer Portfolio

A high-performance personal portfolio built with **Next.js 16**, **React 19**, and **Sanity CMS**. Designed with a focus on architectural clarity, responsive design, and measurable performance optimization.

> **Live:** [radityaportofolio.is-a.dev](https://radityaportofolio.is-a.dev) · **CMS:** Sanity Studio (embedded at `/studio`)

---

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| **Framework**  | Next.js 16.1.6 (App Router, Turbopack)  |
| **UI**         | React 19 RC, TypeScript 5               |
| **Styling**    | Tailwind CSS v4                         |
| **CMS**        | Sanity.io v3 (Content Lake)             |
| **Animation**  | Framer Motion 12, Lenis (smooth scroll) |
| **Email**      | Resend API                              |
| **Analytics**  | Google Analytics 4, Vercel Analytics    |
| **Deployment** | Vercel (Edge Network, ISR)              |

---

## Key Technical Implementations

### Performance Optimization

The hero section originally used a JS-animated aurora effect — four `motion.div` layers with `blur(40–50px)` filters running in an infinite loop via Framer Motion. This contributed approximately 3–5 seconds of main-thread work in Lighthouse audits.

**Solution:** Replaced with two CSS-only `radial-gradient` layers animated via `@keyframes` using `transform: translate() scale()` — properties handled entirely by the GPU compositor without triggering layout or paint.

| Metric         | Before | After |
| -------------- | ------ | ----- |
| Style & Layout | ~8.9s  | ~5–6s |
| Rendering      | ~5.5s  | ~3–4s |
| JS cost        | ~3–5s  | 0ms   |

Additional optimizations include dynamic imports (`next/dynamic`) for heavy client components (`ParticleField`, `FloatingElements`), font self-hosting via `next/font`, and `priority` loading for LCP images.

### Hybrid Component Architecture

The application separates data-fetching from interactivity using Next.js Server and Client Components:

- **Server Components** (`Hero.tsx`, `About.tsx`) handle GROQ queries and initial rendering.
- **Client Components** (`HeroClient.tsx`, `AboutClient.tsx`) manage animations and user interactions.
- **Dynamic Imports** defer heavy animation bundles from the critical path.

### Smart Logo Resolution (4-Stage Fallback)

The Tech Stack section renders skill icons through a multi-stage fallback chain, mirroring the preview logic used in Sanity Studio:

```
1. Custom Upload  →  iconUrl from Sanity asset
2. SimpleIcons CDN  →  cdn.simpleicons.org/{slug}
3. Google Favicon API  →  google.com/s2/favicons?domain={host}
4. Letter Fallback  →  First character of skill name
```

Slug normalization handles edge cases (e.g., `Next.js` → `nextdotjs`, `C++` → `cplusplus`) via a `SLUG_OVERRIDES` map in `utils.ts`. The `BrandIcon` component manages stage transitions through a React state machine with `onError` handlers.

### Tech Stack Display (Marquee & Bento Grid)

- **Marquee ("All" view):** Infinite scroll using Framer Motion with 8× item duplication and alternating row directions. Uses `margin-right` instead of `flex gap` for pixel-perfect `-50%` loop alignment.
- **Bento Grid (Category view):** Dynamic grid with a featured card (`col-span-2 row-span-2`), per-category color coding, and floating animations with randomized durations.

### Contact System

Serverless API route (`/api/contact`) persists messages to Sanity and sends HTML email notifications via Resend. Recipient address is fetched from the CMS at runtime — never exposed in client-side code. Includes WhatsApp deep-link integration.

### Dynamic SEO & Professional Branding (2026 Update)

To achieve a "wow" factor during link sharing, the social metadata system was upgraded from static assets to dynamic profiles.

- **Dynamic OG Image**: The social sharing preview (`og:image`) now dynamically pulls the **Hero Section photo** from Sanity.
- **SVG Transition**: Switched from PNG/Text branding to `icon.svg` for infinite scalability across the Navbar, Preloader, and favicon bundle.
- **Search Verification**: Integrated `google-site-verification` and synchronized Indonesian locale (`id_ID`) for local SEO dominance.
- **DX Upgrade**: Local development environment enhanced with **PowerShell 7** for modern command chainining (`&&`).

### Sanity Studio Extensions

A custom Studio Tool provides batch deletion of contact messages using `client.transaction()` with confirmation dialogs and toast feedback. The Studio is embedded at `/studio` with Basic Auth protection in production.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages, API routes, metadata)
│   ├── api/contact/        # Serverless contact form endpoint
│   ├── projects/[slug]/    # Dynamic project detail pages
│   └── studio/             # Embedded Sanity Studio
├── components/             # React components (Server + Client)
│   ├── HeroClient.tsx      # Hero section with parallax, particles
│   ├── SkillsClient.tsx    # Marquee + Bento Grid display
│   ├── BrandIcon.tsx       # 4-stage logo fallback system
│   └── ...
├── context/                # React contexts (ScrollReveal)
├── lib/                    # Utilities (getLogoUrl, slug normalization)
└── sanity/                 # CMS schemas, client config, Studio tools
```

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/portofolio.git
cd portofolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Fill in the values (see table below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following keys:

| Variable                         | Description                                       | Required |
| -------------------------------- | ------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity project identifier                         | ✅       |
| `NEXT_PUBLIC_SANITY_DATASET`     | Sanity dataset name (e.g., `production`)          | ✅       |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version (e.g., `2024-02-05`)           | ✅       |
| `SANITY_API_TOKEN`               | Sanity write token (for contact form persistence) | ✅       |
| `RESEND_API_KEY`                 | Resend API key (for email notifications)          | ✅       |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Google Analytics 4 measurement ID                 | Optional |
| `STUDIO_AUTH_USER`               | Basic Auth username for `/studio` in production   | Optional |
| `STUDIO_AUTH_PASS`               | Basic Auth password for `/studio` in production   | Optional |

---

## License

This project is for personal use. Feel free to reference the architecture and implementation patterns for your own portfolio.
