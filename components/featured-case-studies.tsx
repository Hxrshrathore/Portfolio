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
  bgImage?: string
  art?: "aurora" | "ember" | "dusk" | "glacier" | "verdant"
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
    art: "ember",
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

  // Silky damped spring on desktop for buttery-smooth card staging without sudden linear stops
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.16,
    restDelta: 0.0005,
  })

  // Responsive, lightly damped spring on mobile for smooth wheel + touch continuity
  const mobileSmooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.14,
    restDelta: 0.0005,
  })

  // ── Desktop 2x2 Transitions: continuous flow across [0..1] (eliminates dead 0.5-1.0 freeze) ──
  const pair1Y = useTransform(smoothProgress, [0, 0.12, 0.56], ["0vh", "0vh", "-95vh"])
  const pair1Scale = useTransform(smoothProgress, [0, 0.12, 0.56], [1, 1, 0.94])
  const pair1Opacity = useTransform(smoothProgress, [0, 0.36, 0.54], [1, 1, 0])
  const pair1PointerEvents = useTransform(smoothProgress, (v) => (v < 0.40 ? "auto" : "none"))

  const pair2Y = useTransform(smoothProgress, [0.22, 0.62, 0.88, 1], ["95vh", "0vh", "0vh", "-8vh"])
  const pair2Scale = useTransform(smoothProgress, [0.22, 0.62, 0.88, 1], [0.94, 1, 1, 0.97])
  const pair2Opacity = useTransform(smoothProgress, [0.22, 0.40, 0.90, 1], [0, 1, 1, 0.85])
  const pair2PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.40 ? "auto" : "none"))

  // ── Mobile 1-by-1 Transforms (Sequential 4-card staging with silky overlap & eased scales) ──
  // Card 0 (Nutgram): dwell 0.00-0.19, dissolve 0.19-0.27
  const mCard0Y = useTransform(mobileSmooth, [0, 0.19, 0.27], ["0vh", "0vh", "-14vh"])
  const mCard0Opacity = useTransform(mobileSmooth, [0, 0.19, 0.26], [1, 1, 0])
  const mCard0Scale = useTransform(mobileSmooth, [0, 0.19, 0.27], [1, 1, 0.93])
  const mCard0Pointer = useTransform(mobileSmooth, (v) => (v < 0.23 ? "auto" : "none"))

  // Card 1 (KIITFEST): enter 0.20-0.28, dwell 0.28-0.44, dissolve 0.44-0.52
  const mCard1Y = useTransform(mobileSmooth, [0.20, 0.28, 0.44, 0.52], ["14vh", "0vh", "0vh", "-14vh"])
  const mCard1Opacity = useTransform(mobileSmooth, [0.20, 0.27, 0.44, 0.51], [0, 1, 1, 0])
  const mCard1Scale = useTransform(mobileSmooth, [0.20, 0.28, 0.44, 0.52], [0.93, 1, 1, 0.93])
  const mCard1Pointer = useTransform(mobileSmooth, (v) => (v >= 0.23 && v < 0.48 ? "auto" : "none"))

  // Card 2 (Nexus AI): enter 0.45-0.53, dwell 0.53-0.69, dissolve 0.69-0.77
  const mCard2Y = useTransform(mobileSmooth, [0.45, 0.53, 0.69, 0.77], ["14vh", "0vh", "0vh", "-14vh"])
  const mCard2Opacity = useTransform(mobileSmooth, [0.45, 0.52, 0.69, 0.76], [0, 1, 1, 0])
  const mCard2Scale = useTransform(mobileSmooth, [0.45, 0.53, 0.69, 0.77], [0.93, 1, 1, 0.93])
  const mCard2Pointer = useTransform(mobileSmooth, (v) => (v >= 0.48 && v < 0.73 ? "auto" : "none"))

  // Card 3 (RCOE Rajasthan): enter 0.70-0.78, dwell 0.78-0.94, gentle unpin drift 0.94-1.0
  const mCard3Y = useTransform(mobileSmooth, [0.70, 0.78, 0.94, 1], ["14vh", "0vh", "0vh", "-6vh"])
  const mCard3Opacity = useTransform(mobileSmooth, [0.70, 0.77, 0.94, 1], [0, 1, 1, 0.45])
  const mCard3Scale = useTransform(mobileSmooth, [0.70, 0.78, 0.94, 1], [0.93, 1, 1, 0.96])
  const mCard3Pointer = useTransform(mobileSmooth, (v) => (v >= 0.73 ? "auto" : "none"))

  // Mobile dot indicators
  const dot0Width = useTransform(mobileSmooth, [0, 0.19, 0.26], ["22px", "22px", "6px"])
  const dot0Color = useTransform(mobileSmooth, [0, 0.19, 0.26], ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.2)"])

  const dot1Width = useTransform(mobileSmooth, [0.20, 0.28, 0.44, 0.52], ["6px", "22px", "22px", "6px"])
  const dot1Color = useTransform(mobileSmooth, [0.20, 0.28, 0.44, 0.52], ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.2)"])

  const dot2Width = useTransform(mobileSmooth, [0.45, 0.53, 0.69, 0.77], ["6px", "22px", "22px", "6px"])
  const dot2Color = useTransform(mobileSmooth, [0.45, 0.53, 0.69, 0.77], ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.2)"])

  const dot3Width = useTransform(mobileSmooth, [0.70, 0.78, 1.0], ["6px", "22px", "22px"])
  const dot3Color = useTransform(mobileSmooth, [0.70, 0.78, 1.0], ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.85)", "rgba(255,255,255,0.85)"])

  const renderCard = (study: typeof caseStudies[0], idx: number) => {
    const metaConfig = CASE_STUDY_METAS[study.slug] || {
      label: study.clientOrOrg || study.headline,
      tags: [{ text: study.category, color: "text-zinc-300" }],
      art: "aurora" as const,
      logo: (
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="font-bold text-xs text-white">#</span>
        </div>
      ),
    }

    return (
      <div
        key={study.slug}
        className="flex flex-col items-center group w-full max-w-[340px] sm:max-w-[360px] scale-[0.84] sm:scale-100 origin-center"
        data-no-cursor="true"
      >
        {/* Interactive Glass Folder Component */}
        <div className="relative w-full flex justify-center py-1 sm:py-2 overflow-visible" data-no-cursor="true">
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
            image={metaConfig.bgImage || undefined}
            art={metaConfig.art || "aurora"}
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
          className="inline-block group mt-2.5 sm:mt-3"
        >
          <GlassSurface
            width={160}
            height={42}
            borderRadius={21}
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
      className="relative w-full bg-black min-h-[460vh] md:min-h-[190vh] border-t border-white/5"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Sticky Full Viewport Frame with optical padding */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-black px-4 md:px-8 pt-14 sm:pt-20 md:pt-36 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:pb-16">
        <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full">
          {/* Section Header: Title and subtext aligned to top with optical correction */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 sm:mb-4 md:mb-10 gap-2 sm:gap-4 md:gap-6 shrink-0 relative z-20">
            <div className="absolute -inset-x-8 -top-36 bottom-[-20px] bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none -z-10" />
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight -mt-1 sm:-mt-1.5 md:-mt-2.5 leading-[1.08]">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  Case{" "}
                </span>
                <span className="font-light text-zinc-400">
                  folders
                </span>
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-md font-light leading-relaxed md:text-right pt-0.5 sm:pt-1">
              Real software systems engineered under real constraints — exploring architecture, trade-offs, debugging, and production delivery.
            </p>
          </div>

          {/* Desktop 2x2 Staged Sticky Scroll Folders Area (hidden md:flex) */}
          <div className="hidden md:flex relative w-full flex-1 items-center justify-center min-h-[380px] my-auto">
            {/* Pair 1: First 2 Folders (Nutgram & KIITFEST) */}
            <motion.div
              style={{
                opacity: pair1Opacity,
                y: pair1Y,
                scale: pair1Scale,
                pointerEvents: pair1PointerEvents,
              }}
              className="w-full grid grid-cols-2 gap-8 lg:gap-14 place-items-center absolute inset-0 my-auto"
            >
              {pair1.map((study, idx) => renderCard(study, idx))}
            </motion.div>

            {/* Pair 2: Second 2 Folders (Nexus AI & RCOE Rajasthan) */}
            <motion.div
              style={{
                opacity: pair2Opacity,
                y: pair2Y,
                scale: pair2Scale,
                pointerEvents: pair2PointerEvents,
              }}
              className="w-full grid grid-cols-2 gap-8 lg:gap-14 place-items-center absolute inset-0 my-auto"
            >
              {pair2.map((study, idx) => renderCard(study, idx + 2))}
            </motion.div>
          </div>

          {/* Mobile 1-by-1 Sequential Staged Folders Area (md:hidden) */}
          <div className="md:hidden relative w-full flex-1 flex flex-col items-center justify-center min-h-[300px] my-auto">
            {/* Card 0: Nutgram */}
            <motion.div
              style={{
                opacity: mCard0Opacity,
                y: mCard0Y,
                scale: mCard0Scale,
                pointerEvents: mCard0Pointer,
              }}
              className="w-full flex items-center justify-center absolute inset-0 my-auto"
            >
              {caseStudies[0] && renderCard(caseStudies[0], 0)}
            </motion.div>

            {/* Card 1: KIITFEST */}
            <motion.div
              style={{
                opacity: mCard1Opacity,
                y: mCard1Y,
                scale: mCard1Scale,
                pointerEvents: mCard1Pointer,
              }}
              className="w-full flex items-center justify-center absolute inset-0 my-auto"
            >
              {caseStudies[1] && renderCard(caseStudies[1], 1)}
            </motion.div>

            {/* Card 2: Nexus AI */}
            <motion.div
              style={{
                opacity: mCard2Opacity,
                y: mCard2Y,
                scale: mCard2Scale,
                pointerEvents: mCard2Pointer,
              }}
              className="w-full flex items-center justify-center absolute inset-0 my-auto"
            >
              {caseStudies[2] && renderCard(caseStudies[2], 2)}
            </motion.div>

            {/* Card 3: RCOE Rajasthan */}
            <motion.div
              style={{
                opacity: mCard3Opacity,
                y: mCard3Y,
                scale: mCard3Scale,
                pointerEvents: mCard3Pointer,
              }}
              className="w-full flex items-center justify-center absolute inset-0 my-auto"
            >
              {caseStudies[3] && renderCard(caseStudies[3], 3)}
            </motion.div>
          </div>

          {/* Mobile 4-step progress dots indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 pb-2 shrink-0 z-20">
            <motion.div
              style={{ width: dot0Width, backgroundColor: dot0Color }}
              className="h-1.5 rounded-full"
            />
            <motion.div
              style={{ width: dot1Width, backgroundColor: dot1Color }}
              className="h-1.5 rounded-full"
            />
            <motion.div
              style={{ width: dot2Width, backgroundColor: dot2Color }}
              className="h-1.5 rounded-full"
            />
            <motion.div
              style={{ width: dot3Width, backgroundColor: dot3Color }}
              className="h-1.5 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
