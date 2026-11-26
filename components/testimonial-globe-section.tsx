"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { TooltipPill } from "@/components/ui/tooltip";
import { TestimonialGlobe } from "@/components/ui/testimonial-globe";
import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";

// Mapped directly to the 6 Regional Collaboration Hubs from world-map-section.tsx
// Ordered east to west, so autoplay keeps turning the globe the way it spins.
export const COLLABORATION_GLOBE_REVIEWS: GlobeTestimonial[] = [
  {
    id: "australia",
    quote: "Early morning sync window (UTC+10) matches Indian late evening. Standups and release handoffs happen seamlessly without latency or communication drag.",
    name: "Lachlan Vance",
    role: "Lead Systems Architect",
    company: "Pacific Edge Studio",
    city: "Sydney",
    country: "AU",
    lat: -33.8688,
    lng: 151.2093,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 5,
  },
  {
    id: "southeast-asia",
    quote: "Near full-day timezone alignment with UTC+5:30 (only 2.5 hr delta). Real-time debugging, shared sprint planning, and high-cadence deployment cycles.",
    name: "Sophie Chen",
    role: "Engineering Director",
    company: "Tidewell Tech",
    city: "Singapore",
    country: "SG",
    lat: 1.3521,
    lng: 103.8198,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 2,
  },
  {
    id: "india-hq",
    quote: "Core engineering base (IST / UTC+5:30). High-throughput web platforms, database persistence, and rapid full-stack turnaround engineered under real constraints.",
    name: "Aarav Mohapatra",
    role: "Platform Lead",
    company: "KIITMUN & Nutgram",
    city: "Bhubaneswar",
    country: "IN",
    lat: 20.2961,
    lng: 85.8245,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 1,
  },
  {
    id: "uk-eu",
    quote: "Afternoon overlap window for sprint planning and architectural reviews. Async PR reviews and loom walkthroughs keep engineering velocity at its peak.",
    name: "Oliver Sterling",
    role: "Head of Product",
    company: "Acsent Digital UK",
    city: "London",
    country: "GB",
    lat: 51.5074,
    lng: -0.1278,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 3,
  },
  {
    id: "na-east",
    quote: "Morning sync window perfectly pairs with Indian evening hours. Daily handoffs are clean, and our features ship overnight with verified test suites.",
    name: "Marcus Vance",
    role: "VP of Engineering",
    company: "Nexus Labs East",
    city: "New York",
    country: "US",
    lat: 40.7128,
    lng: -74.006,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 4,
  },
  {
    id: "na-west",
    quote: "Evening collaboration overlap with high async precision. Well-documented architecture, clean API contracts, and dependable production delivery.",
    name: "Elena Rostova",
    role: "Technical Co-Founder",
    company: "Fogline AI",
    city: "San Francisco",
    country: "US",
    lat: 37.7749,
    lng: -122.4194,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tone: 1,
  },
];

function seededStars(count: number, seedInit = 42) {
  let seed = seedInit;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const stars: { id: number; left: number; top: number; size: number; delay: number; duration: number; opacity: number }[] = [];
  while (stars.length < count) {
    const x = 0.01 + rand() * 0.98;
    const y = 0.01 + rand() * 0.98;
    stars.push({
      id: stars.length,
      left: Number((x * 100).toFixed(2)),
      top: Number((y * 100).toFixed(2)),
      size: rand() < 0.7 ? 1 : rand() < 0.9 ? 1.5 : 2,
      delay: Number((rand() * 4).toFixed(2)),
      duration: Number((2.5 + rand() * 3).toFixed(2)),
      opacity: Number((0.25 + rand() * 0.5).toFixed(2)),
    });
  }
  return stars;
}

const SECTION_STARS = seededStars(85);

export default function TestimonialGlobeSection({ autoplay = true }: { autoplay?: boolean }) {
  const [time, setTime] = React.useState({ hh: "", mm: "", ss: "" });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        const parts = formatter.formatToParts(now);
        const hh = parts.find((p) => p.type === "hour")?.value || "";
        const mm = parts.find((p) => p.type === "minute")?.value || "";
        const ss = parts.find((p) => p.type === "second")?.value || "";
        setTime({ hh, mm, ss });
      } catch {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istDate = new Date(utc + 3600000 * 5.5);
        setTime({
          hh: String(istDate.getHours()).padStart(2, "0"),
          mm: String(istDate.getMinutes()).padStart(2, "0"),
          ss: String(istDate.getSeconds()).padStart(2, "0"),
        });
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section
      id="global-collaboration-globe"
      data-no-cursor="true"
      className="relative w-full bg-black border-t border-white/5 py-14 md:py-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.015] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Full-section starry background field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {SECTION_STARS.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse motion-reduce:animate-none"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col">
        {/* ── Top: Title Row (Adapted from World Map Header) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-start gap-8 md:gap-14 lg:gap-24 mb-8 md:mb-12 shrink-0">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-transparent">
                Based in{" "}
              </span>
              <span
                className="bg-clip-text text-transparent font-bold inline-block"
                style={{
                  backgroundImage: "url('/images/indian-flag2.jpg')",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                India
              </span>
              <span className="bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-transparent">
                ,
              </span>
              <br />
              <span className="font-light text-zinc-400">open to remote collaboration</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-8 md:gap-12 lg:gap-14"
          >
            {/* UTC+5:30 with live 24-hour time suffix, thin clock icon, and custom tooltip */}
            <div className="text-left group relative cursor-default">
              <TooltipPill position="top">
                India Standard Time (IST)
              </TooltipPill>

              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums leading-none flex items-baseline">
                <span>UTC+5:30</span>
                <span className="text-zinc-400 font-light text-base md:text-lg ml-2.5 tabular-nums inline-flex items-center w-[5.4rem] shrink-0">
                  <Clock className="w-3.5 h-3.5 text-zinc-400 stroke-[1.25] mr-1 shrink-0 self-center" />
                  <span>{mounted && time.hh ? `${time.hh}:${time.mm}` : "19:30"}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-300">
                    :{mounted && time.ss ? time.ss : "00"}
                  </span>
                </span>
              </div>
            </div>

            {/* Async Friendly */}
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums leading-none flex items-baseline">
                <span>Async</span>
                <span className="text-zinc-400 font-light text-base md:text-lg ml-2.5">Friendly</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Main Content: 3D White Globe + Regional Collaboration Reviews ── */}
        <div className="w-full flex justify-center">
          <TestimonialGlobe
            items={COLLABORATION_GLOBE_REVIEWS}
            autoplay={autoplay}
            interval={3500}
            size={460}
          />
        </div>
      </div>
    </section>
  );
}

