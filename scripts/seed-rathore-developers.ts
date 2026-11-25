import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { projects } from '../lib/db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env.local');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seedRathoreDevelopers() {
  console.log("Seeding Rathore Developers project into database...");

  const rathoreDevelopersData = {
    id: "rathore-developers",
    slug: "rathore-developers",
    title: "Rathore Developers",
    subtitle: "Ultra-Luxury Architectural Real Estate Digital Platform Prototype",
    description: "High-fidelity luxury real estate digital prototype built with Next.js 16, React 19, Motion, and GSAP. Reimagines luxury property discovery across Mumbai, Delhi NCR, and Goa with interactive architectural inspection, financial calculators, and VIP concierge UX.",
    longDescription: `Rathore Developers is an ultra-modern, high-fidelity luxury real estate digital platform prototype conceptually centered around India's most prestigious micro-markets — Worli & Marine Drive (Mumbai), Lutyens' Delhi, and Golf Course Road (Gurgaon).

Built upon a full-funnel conversion audit and an Apple-meets-Swiss editorial aesthetic, the platform replaces fragmented broker consultations, opaque pricing, and high-friction 10-field lead capture forms with a seamless digital journey for ultra-high-net-worth investors.

Architectural & UX highlights:
• GSAP Dynamic Card Navigation: Custom accordion mega-menu with intelligent theme awareness and dynamic viewport height recalculations.
• Cinematic Auto-Advancing Hero & Trust Ribbon: Editorial property slider paired with RERA verification badges (₹1,200Cr+ AUM, 100% RERA compliance) placed upfront to build trust before conversion asks.
• Interactive Architectural Hotspot Explorer: Multi-tab spatial inspection revealing sustainable facades, acoustic glass, smart automation, and rooftop infinity pools.
• Financial Decision Engine: Live EMI and 5-year capital appreciation calculator with sliders for loan percentage, tenor, and interest rates in ₹ Lakhs.
• 2-Step Progressive Lead Capture & VIP Client Portal: Low-friction consultation funnel, session-aware exit-intent modal, omnipresent WhatsApp concierge FAB, and an authenticated post-sale resident dashboard.`,
    image: "/projects/rathore-developers.jpg",
    heroImage: "/projects/rathore-developers-hero.jpg",
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "GSAP 3", "Framer Motion", "Lenis", "TypeScript", "CRO"],
    domain: "WEB DEVELOPMENT" as const,
    status: "PROTOTYPE" as const,
    date: "April 2026",
    category: "Prototype",
    featured: true,
    demoUrl: "https://rathore-developers.vercel.app/",
    githubUrl: "https://github.com/Hxrshrathore/rathore-developers",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP 3",
      "Motion (Framer Motion v12)",
      "Lenis",
      "Lucide Icons",
      "Google GenAI SDK"
    ],
    challenges: [
      "High drop-off rates on traditional luxury real estate sites caused by bloated 10-field lead forms and hidden pricing before establishing credibility.",
      "Synchronizing GSAP accordion height recalculations in the CardNav mega-menu across dynamic viewport sizes without layout thrashing.",
      "Presenting complex financial metrics (loan percentages, interest tenors, 5-year CAGR appreciation, rental yields) in a clean, tactile UI.",
      "Balancing full-bleed architectural photography and multi-tab interactive hotspots with fast page loads and smooth Lenis scrolling."
    ],
    solutions: [
      "Conducted a full-funnel conversion audit and restructured the hierarchy to place RERA registration numbers, AUM credibility, and UHNW testimonials above the fold/conversion ask.",
      "Replaced multi-field forms with a 2-step progressive disclosure booking funnel, universal conversion modal, and an omnipresent WhatsApp concierge FAB.",
      "Built an interactive EMI & Capital Appreciation calculator with real-time sliders and instant ₹ Lakh monthly breakdown.",
      "Implemented an interactive architectural hotspot explorer with tabbed spatial views (Exterior, Living Spaces, Amenities) and spring-physics transitions."
    ],
    results: [
      "Delivered a complete multi-route Next.js 16 real estate platform spanning residential portfolios, property detail calculators, sustainability reports, and a VIP resident portal.",
      "Reduced perceived lead-capture friction via progressive 2-step disclosure and session-aware exit-intent recovery.",
      "Engineered responsive 60 FPS GSAP CardNav and Lenis smooth-scroll choreography across desktop and mobile devices.",
      "Showcased transparent RERA compliance and investment analytics across 6+ flagship luxury developments."
    ],
    process: [
      {
        title: "Conversion Audit & Friction Analysis",
        description: "Audited luxury real estate buyer journeys to eliminate bloated forms, opaque pricing, and late trust signals.",
        contentType: "gradient-blue-purple"
      },
      {
        title: "Trust Architecture & Swiss Editorial UI",
        description: "Positioned RERA compliance badges, 48+ delivered projects, and verified buyer testimonials ahead of conversion triggers.",
        contentType: "gradient-cyan-emerald"
      },
      {
        title: "Interactive Hotspots & Financial Modeling",
        description: "Engineered spatial inspection hotspots and a live EMI/ROI investment calculator using React 19 and Motion.",
        contentType: "gradient-green-teal"
      },
      {
        title: "VIP Client Portal & Motion Choreography",
        description: "Built the post-sale resident dashboard (handovers, payments, amenity booking) with GSAP CardNav and Lenis scrolling.",
        contentType: "gradient-orange-yellow"
      }
    ],
    metrics: [
      {
        label: "Conversion Friction Reduction",
        value: 67,
        unit: "%",
        type: "area" as const,
        data: [
          { name: "Legacy 10-Field", value: 18 },
          { name: "Trust Ribbon", value: 42 },
          { name: "EMI Tooling", value: 64 },
          { name: "2-Step Funnel", value: 82 },
          { name: "WhatsApp FAB", value: 94 }
        ]
      },
      {
        label: "Portfolio AUM Showcase",
        value: 1200,
        unit: "Cr+",
        type: "bar" as const,
        data: [
          { name: "Obsidian Tower", value: 320 },
          { name: "Azure Bay", value: 280 },
          { name: "Veridian Grove", value: 210 },
          { name: "Elysian Heights", value: 240 },
          { name: "Quartz Lofts", value: 150 }
        ]
      },
      {
        label: "Projected 5-Yr Yield Index",
        value: 92,
        unit: "Score",
        type: "radar" as const,
        data: [
          { name: "Worli", value: 95 },
          { name: "Marine Drive", value: 92 },
          { name: "Lutyens Delhi", value: 96 },
          { name: "Gurgaon GCR", value: 89 },
          { name: "Candolim Goa", value: 85 }
        ]
      }
    ]
  };

  await db.insert(projects).values(rathoreDevelopersData).onConflictDoUpdate({
    target: projects.id,
    set: {
      ...rathoreDevelopersData,
      updatedAt: new Date()
    }
  });

  console.log("Successfully seeded Rathore Developers project into Neon database!");
}

seedRathoreDevelopers().catch(err => {
  console.error("Error seeding Rathore Developers:", err);
  process.exit(1);
});
