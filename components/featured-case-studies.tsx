"use client"

import React, { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CASE_STUDIES, FEATURED_SLUGS } from "@/lib/curation"
import GlassFolder from "@/components/ui/glass-folder"
import GlassSurface from "@/components/GlassSurface"
import TransitionLink from "@/components/transition-link"

// Project configuration with background mockups, custom client/project logos, and font-light tags
const CASE_STUDY_METAS: Record<string, {
  label: string
  tags: { text: string; color: string }[]
  bgImage: string
  logo: React.ReactNode
}> = {
  "nutgram": {
    label: "Nutgram",
    tags: [
      { text: "Full Stack", color: "text-blue-400" },
      { text: "Next.js", color: "text-zinc-400" },
      { text: "PostgreSQL", color: "text-zinc-400" },
    ],
    bgImage: "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects/Nutgram.png",
    logo: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/25 to-indigo-600/35 border border-blue-400/40 flex items-center justify-center shadow-lg">
        <span className="font-bold text-sm tracking-wider text-blue-300 font-mono">N</span>
      </div>
    ),
  },
  "kiitfest": {
    label: "KIITFEST",
    tags: [
      { text: "Web Platform", color: "text-emerald-400" },
      { text: "GSAP", color: "text-zinc-400" },
      { text: "Edge Cache", color: "text-zinc-400" },
    ],
    bgImage: "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects/KIITFEST.png",
    logo: (
      <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center overflow-hidden p-1 shadow-lg">
        <img src="/logo/kiitmun.png" alt="KIIT" className="w-full h-full object-contain filter brightness-110" />
      </div>
    ),
  },
  "nexus-ai": {
    label: "Nexus AI",
    tags: [
      { text: "AI Integration", color: "text-purple-400" },
      { text: "LLM Streaming", color: "text-zinc-400" },
      { text: "SSE", color: "text-zinc-400" },
    ],
    bgImage: "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects/Nexus%20AI.png",
    logo: (
      <div className="w-8 h-8 rounded-xl bg-purple-500/25 border border-purple-400/40 flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </div>
    ),
  },
  "rcoe-data-extraction": {
    label: "RCOE Rajasthan",
    tags: [
      { text: "Data Pipeline", color: "text-amber-400" },
      { text: "Python", color: "text-zinc-400" },
      { text: "SQL", color: "text-zinc-400" },
    ],
    bgImage: "/placeholder.jpg",
    logo: (
      <div className="w-8 h-8 rounded-xl bg-amber-500/25 border border-amber-400/40 flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
      </div>
    ),
  },
}

export default function FeaturedCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null)
  const caseStudies = FEATURED_SLUGS.map(slug => FEATURED_CASE_STUDIES[slug]).filter(Boolean)

  const pair1 = caseStudies.slice(0, 2)
  const pair2 = caseStudies.slice(2, 4)

  // Track raw scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Damped spring creates light, responsive, liquid-smooth scroll hijacking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.1,
    restDelta: 0.0005,
  })

  // Pair 1 transitions: scrolls naturally up and out of the viewport (-110vh)
  const pair1Y = useTransform(smoothProgress, [0, 0.15, 0.50], ["0vh", "0vh", "-110vh"])
  const pair1Opacity = useTransform(smoothProgress, [0, 0.40, 0.50], [1, 1, 0])
  const pair1PointerEvents = useTransform(smoothProgress, (v) => (v < 0.35 ? "auto" : "none"))

  // Pair 2 transitions: scrolls in naturally from below (110vh -> 0vh)
  const pair2Y = useTransform(smoothProgress, [0.15, 0.50, 1], ["110vh", "0vh", "0vh"])
  const pair2Opacity = useTransform(smoothProgress, [0.15, 0.25, 1], [0, 1, 1])
  const pair2PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.35 ? "auto" : "none"))

  const renderCard = (study: typeof caseStudies[0], idx: number) => {
    const metaConfig = CASE_STUDY_METAS[study.slug] || {
      label: study.clientOrOrg || study.headline,
      tags: [{ text: study.category, color: "text-zinc-300" }],
      bgImage: "/placeholder.jpg",
      logo: (
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="font-bold text-xs text-white">#</span>
        </div>
      ),
    }

    return (
      <div
        key={study.slug}
        className="flex flex-col items-center group w-full max-w-[360px]"
        data-no-cursor="true"
      >
        {/* Interactive Glass Folder Component */}
        <div className="relative w-full flex justify-center py-2 overflow-visible" data-no-cursor="true">
          <GlassFolder
            label={metaConfig.label}
            meta={
              <div className="flex items-center gap-1.5 flex-wrap">
                {metaConfig.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={`text-xs font-light tracking-wide ${tag.color}`}>
                    {tag.text}
                    {tIdx < metaConfig.tags.length - 1 && <span className="text-zinc-600 font-light ml-1.5">·</span>}
                  </span>
                ))}
              </div>
            }
            image={metaConfig.bgImage}
            logo={metaConfig.logo}
            tone="dark"
            action="more"
            appearDelay={idx * 80}
            width={320}
            files={[
              {
                name: `${metaConfig.label} — Architecture`,
                meta: study.timeline,
                href: `/projects/${study.slug}`,
              },
              {
                name: "Verified Deliverables",
                meta: `${study.verifiedDeliverables.length} verified modules`,
                href: `/projects/${study.slug}`,
              },
              {
                name: "Engineering Case Study",
                meta: "Read full deep-dive ↗",
                href: `/projects/${study.slug}`,
              },
            ]}
          />
        </div>

        {/* Case Study GlassSurface Button (Same Button as Hero Portfolio / Resume) */}
        <TransitionLink
          href={`/projects/${study.slug}`}
          className="inline-block group mt-3"
        >
          <GlassSurface
            width={164}
            height={44}
            borderRadius={22}
            distortionScale={-180}
            displace={0.5}
            backgroundOpacity={0.12}
            className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] border border-white/10"
          >
            <span className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white group-hover:text-zinc-200">
              Case Study
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </GlassSurface>
        </TransitionLink>
      </div>
    )
  }

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="relative w-full bg-black min-h-[190vh] border-t border-white/5 pt-12 md:pt-16"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Sticky Full Viewport Frame with generous top padding to clear floating navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 md:px-8 pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full">
          {/* Section Header: Title and subtext aligned to top with optical correction */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-10 gap-6 shrink-0 relative z-20">
            <div className="absolute -inset-x-8 -top-36 bottom-[-20px] bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none -z-10" />
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent tracking-tight -mt-1 sm:-mt-1.5 md:-mt-2.5 leading-[1.08]">
                Featured Case Studies
              </h2>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-md font-light leading-relaxed md:text-right pt-0.5 sm:pt-1">
              Real software systems engineered under real constraints — exploring architecture, trade-offs, debugging, and production delivery.
            </p>
          </div>

          {/* 2x2 Staged Sticky Scroll Folders Area (Centered in Viewport) */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] my-auto">
            {/* Pair 1: First 2 Folders (Nutgram & KIITFEST) */}
            <motion.div
              style={{
                opacity: pair1Opacity,
                y: pair1Y,
                pointerEvents: pair1PointerEvents,
              }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 place-items-center absolute inset-0 my-auto"
            >
              {pair1.map((study, idx) => renderCard(study, idx))}
            </motion.div>

            {/* Pair 2: Second 2 Folders (Nexus AI & RCOE Rajasthan) */}
            <motion.div
              style={{
                opacity: pair2Opacity,
                y: pair2Y,
                pointerEvents: pair2PointerEvents,
              }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 place-items-center absolute inset-0 my-auto"
            >
              {pair2.map((study, idx) => renderCard(study, idx + 2))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
