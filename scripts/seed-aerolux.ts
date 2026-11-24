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

async function seedAeroLux() {
  console.log("Seeding AeroLux project into database...");

  const aeroluxData = {
    id: "aerolux",
    slug: "aerolux",
    title: "AeroLux",
    subtitle: "Luxury Private Aviation Digital Platform & Flight Dispatch Prototype",
    description: "Ultra-modern, high-fidelity luxury private aviation digital platform and flight dispatch prototype featuring 3D fluid glass navbar, empty leg charter deals, scenic joyrides, and emergency aeromedical evacuation.",
    longDescription: `AeroLux is an ultra-modern, high-fidelity luxury private aviation digital platform and engineering prototype conceptually centered around Juhu Airport, Mumbai.

Traditionally, booking private aviation in India involves fragmented phone calls, opaque broker markups, and zero digital transparency. AeroLux reimagines this entire experience by combining a simulated fleet of 30+ DGCA-standard aircraft with an Apple-meets-Swiss editorial aesthetic.

Visitors can explore real-time aircraft specifications, discover deeply discounted "empty leg" return flights (up to 70% off), simulate emergency aeromedical requests, test interactive 3D cabin exploration, or connect directly with flight dispatch simulation via instant WhatsApp concierge.

Architectural highlights:
• 3D Fluid Glass Navigation: Three.js WebGL shader refraction simulating physical crystal-glass light bending.
• Private Jet Charters & Empty Leg Deals: Real-time search engine with discount calculations (60-70% off) for empty ferry return legs across Mumbai, Delhi, Goa, Dubai, and Maldives.
• Scenic Joyrides & Spiritual Charters: Tailored coastal sightseeing experiences over Mumbai (Marine Drive, Sea Link) and turnkey Ek Dham Kedarnath helicopter pilgrimage itineraries.
• Critical Care Aeromedical Simulation: ICU air ambulance dispatch with bed-to-bed care specifications, ventilator/defibrillator setups, and 45-minute rapid launch protocol.
• Performance & Motion Choreography: Next.js 16 App Router, React 19, Tailwind CSS v4, Motion (Framer Motion v12), GSAP 3, and Lenis smooth scrolling maintaining solid 60 FPS.`,
    image: "/projects/aerolux.jpg",
    heroImage: "/projects/aerolux-hero.jpg",
    tags: ["Next.js 16", "React 19", "Three.js", "Tailwind CSS v4", "GSAP 3", "TypeScript", "Lenis", "Framer Motion"],
    domain: "WEB DEVELOPMENT" as const,
    status: "PROTOTYPE" as const,
    date: "April 2026",
    category: "Prototype",
    featured: true,
    demoUrl: "https://private-jet-pi.vercel.app/",
    githubUrl: "https://github.com/Hxrshrathore/aerolux",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Three.js",
      "React Three Fiber",
      "GSAP 3",
      "Framer Motion",
      "Lenis",
      "WebGL"
    ],
    challenges: [
      "Reconciling complex WebGL Three.js shaders with React 19 concurrent rendering and strict unmount lifecycles to prevent GPU memory leaks.",
      "Balancing cinematic full-screen video and real-time 3D refraction with smooth 60 FPS mobile rendering and zero layout jank.",
      "Designing an intuitive, luxury-tier search interface for multi-leg charters, empty leg savings, and aeromedical dispatch without overwhelming the user.",
      "Architecting responsive layout systems in Tailwind CSS v4 that scale elegantly from high-DPI desktop viewports down to iPhone displays."
    ],
    solutions: [
      "Engineered an automated IntersectionObserver manager that pauses WebGL rendering loops and HTML5 background videos when scrolled out of view.",
      "Implemented custom GLSL refraction shaders with dynamic chromatic aberration for the 3D fluid glass floating navigation bar.",
      "Created interactive cabin hotspot visualizers with progressive asset loading, ensuring rapid initial paint under 1.2s.",
      "Integrated direct WhatsApp concierge dispatch links for high-intent customer inquiries alongside real-time aircraft specification matrices."
    ],
    results: [
      "Achieved rock-solid 60 FPS animation performance across desktop and mobile devices despite heavy 3D and video integration.",
      "Crafted 30+ simulated aircraft models with authentic cruise speeds, flight ceilings, ranges, and VIP cabin configurations.",
      "Received praise for innovative luxury UI/UX blending Swiss typography with Apple-grade interactive micro-interactions.",
      "Engineered 100% responsive, accessible mobile-first experience with zero horizontal scroll bleed or UI clipping."
    ],
    process: [
      {
        title: "Aviation Domain Research & Information Architecture",
        description: "Analyzed DGCA private charter operations, air ambulance ICU protocols, and empty leg market dynamics to structure accurate passenger workflows.",
        contentType: "gradient-blue-purple"
      },
      {
        title: "Design System & Luxury Visual Direction",
        description: "Established high-contrast Swiss typography using Switzer and Geist, dark-mode glassmorphic aesthetics, and editorial aviation imagery.",
        contentType: "gradient-cyan-emerald"
      },
      {
        title: "WebGL 3D Shaders & Interaction Engineering",
        description: "Developed the 3D fluid glass navbar in Three.js/R3F with dynamic light refraction and choreographed GSAP cursor-wave button effects.",
        contentType: "gradient-green-teal"
      },
      {
        title: "Performance Optimization & Mobile Hardening",
        description: "Implemented viewport-based video throttling, WebGL canvas virtualization, and Lenis smooth scroll calibration.",
        contentType: "gradient-orange-yellow"
      }
    ],
    metrics: [
      {
        label: "Frame Rate Stability",
        value: 60,
        unit: "FPS",
        type: "area" as const,
        data: [
          { name: "Initial Paint", value: 58 },
          { name: "3D Canvas Mount", value: 60 },
          { name: "Hero Video Scrub", value: 59 },
          { name: "Empty Leg Radar", value: 60 },
          { name: "Cabin Explorer", value: 60 }
        ]
      },
      {
        label: "Simulated Fleet Range",
        value: 7500,
        unit: "NM",
        type: "bar" as const,
        data: [
          { name: "Cirrus SR22", value: 1100 },
          { name: "Hawker 800XP", value: 2600 },
          { name: "Pilatus PC-24", value: 2000 },
          { name: "Challenger 650", value: 4000 },
          { name: "Gulfstream G700", value: 7500 }
        ]
      },
      {
        label: "Empty Leg Cost Savings",
        value: 70,
        unit: "%",
        type: "radar" as const,
        data: [
          { name: "BOM-GOI", value: 65 },
          { name: "DEL-BOM", value: 70 },
          { name: "BOM-DXB", value: 60 },
          { name: "BLR-MLE", value: 68 },
          { name: "HYD-DEL", value: 62 }
        ]
      }
    ]
  };

  await db.insert(projects).values(aeroluxData).onConflictDoUpdate({
    target: projects.id,
    set: {
      ...aeroluxData,
      updatedAt: new Date()
    }
  });

  console.log("Successfully seeded AeroLux project into Neon database!");
}

seedAeroLux().catch(err => {
  console.error("Error seeding AeroLux:", err);
  process.exit(1);
});
