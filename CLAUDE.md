# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern portfolio website built with Next.js 16, React 19, and TypeScript. Features advanced WebGL animations (LiquidChrome, LiquidEther), interactive UI components, a blog system powered by MDX, and project showcases with detailed case studies.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Start production server
npm start
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion, GSAP, custom WebGL (Three.js, OGL)
- **Content**: MDX for blog posts with gray-matter frontmatter
- **Components**: Radix UI primitives + custom components

### Project Structure

```
Portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (ThemeProvider, Preloader, Navbar, Footer)
│   ├── page.tsx              # Homepage (Hero, CurvedLoop, FlowingMenu, MagicBento, etc.)
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual blog posts (MDX rendered)
│   └── projects/
│       ├── page.tsx          # Projects listing
│       └── [slug]/page.tsx   # Project detail pages
├── components/
│   ├── ui/                   # Reusable UI components (BlurText, LiquidEther, WorldMap, etc.)
│   ├── hero.tsx              # Hero section with LiquidChrome background
│   ├── navbar.tsx            # Fixed navigation with mobile menu
│   ├── about.tsx             # About section
│   ├── contact.tsx           # Contact form section
│   └── [section]-section.tsx # Page sections (CurvedLoop, FlowingMenu, InfiniteMenu, etc.)
├── lib/
│   ├── blog.ts               # Blog utilities (getAllPosts, getPostBySlug)
│   ├── projects-data.ts      # Project data and utilities
│   └── utils.ts              # General utilities (cn helper)
├── content/
│   └── blog/                 # MDX blog posts with frontmatter
└── public/                   # Static assets
```

### Key Patterns

**Blog System**: Posts are MDX files in `content/blog/` with frontmatter (title, description, date, author, tags, image, published). The `lib/blog.ts` utilities parse frontmatter, calculate reading time, and handle slug-based retrieval.

**Project Data**: All projects are defined in `lib/projects-data.ts` as a structured array with fields for title, description, longDescription, heroImage, tags, category, featured, demoUrl, githubUrl, technologies, challenges, solutions, results, and process steps.

**Animation Components**: 
- `LiquidEther` - Fluid simulation using custom WebGL shaders (advection, divergence, poisson solvers)
- `LiquidChrome` - Chrome-like reflective animation
- `BlurText` - Staggered blur-in text animation with IntersectionObserver
- `WorldMap` - Dotted map with animated curved paths using `dotted-map` package

**Theming**: Dark mode via `next-themes` with CSS custom properties for colors. Tailwind configured with `darkMode: "class"`.

**SEO**: Comprehensive metadata in layout.tsx including OpenGraph, Twitter cards, structured data (JSON-LD), and robots configuration.

### Configuration Notes

**Next.js 16**: Uses `next.config.mjs` with ESM exports. MDX configured via `@next/mdx` with `remark-gfm`. Images set to `unoptimized: true`.

**TypeScript**: Path alias `@/*` maps to root directory. Strict mode enabled.

**Build**: Blog directory (`content/blog/`) is created programmatically if missing.

### GSAP Performance Optimizations Applied

**TrustedBySection**: Replaced manual `requestAnimationFrame` loop with GSAP timeline for marquee animation - uses compositor-friendly `transform: translateX`.

**MagicBento**: Mouse tracking now uses `gsap.quickTo()` instead of creating new `gsap.to()` tweens on every mousemove - reuses tweens for `rotateX`, `rotateY`, `x`, and `y` properties.

**FlowingMenu**: Timelines are now killed before creating new ones to prevent conflicts; added `will-change: transform` hints for marquee elements.

**OrbSection**: Reduced background particles from 50 to 20; added `will-change: transform` CSS hints.

**Best practices followed**:
- Animate `transform` and `opacity` only (avoid `top`, `left`, `width`, `height`)
- Use `gsap.quickTo()` for frequently updated properties (mouse followers)
- Kill timelines/tweens on cleanup to prevent memory leaks
- Add `will-change: transform` for animated elements
