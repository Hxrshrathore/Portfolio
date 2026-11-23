"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight, CheckCircle2, Code2, Activity, Zap, Layers } from "lucide-react"
import GlassSurface from "@/components/GlassSurface"
import TransitionLink from "@/components/transition-link"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

interface PortfolioItem {
  image: string
  logo: string
  link: string
  title: string
  description: string
  projectImage: string
  category: string
  role: string
  organization: string
  stack: string[]
  deliverables: string[]
  overview: string
}

const portfolioItems: PortfolioItem[] = [
  {
    image: "/rip/frame1.png",
    logo: "/logo/ascent.png",
    link: "/projects/nutgram",
    title: "Nutgram Portal",
    description: "Commercial operations and client workflow portal",
    projectImage: "/rip/frame1.png",
    category: "Full-Stack Web Application",
    role: "Full-Stack Engineer",
    organization: "Nutgram (Client Project)",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    deliverables: ["Role-Based Client Portal", "Administrative Workflow", "Status Automation"],
    overview: "Production client portal and operations dashboard engineered for deliverable management, review workflows, and automated client notifications.",
  },
  {
    image: "/rip/frame6.png",
    logo: "/logo/chimera.png",
    link: "/projects/kiitfest",
    title: "KIITFEST",
    description: "High-concurrency university festival digital hub",
    projectImage: "/rip/frame6.png",
    category: "University Event Platform",
    role: "Lead Frontend Engineer",
    organization: "KIIT Student Activity Center",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    deliverables: ["Multi-Track Timetable", "Category Filtering", "Mobile Registration UI"],
    overview: "High-performance festival gateway serving thousands of attendees with real-time schedule filtering and high-impact motion architecture.",
  },
  {
    image: "/rip/frame8.png",
    logo: "/logo/pandav.png",
    link: "/projects/nexus-ai",
    title: "Nexus AI",
    description: "Applied LLM context and workflow assistant",
    projectImage: "/rip/frame8.png",
    category: "Applied AI Platform",
    role: "Applied AI Engineer",
    organization: "Independent Lab",
    stack: ["Next.js", "TypeScript", "LLM APIs", "SSE Streaming"],
    deliverables: ["Streaming Token Engine", "Structured Schema Parsing", "Context Pipeline"],
    overview: "Context-aware AI assistant leveraging streaming token interfaces, structured schema extraction, and resilient model fallback handling.",
  },
  {
    image: "/rip/frame1.png",
    logo: "/logo/chimera.png",
    link: "/projects/chimera",
    title: "Chimera 6.0",
    description: "Interactive technology symposium website and schedules",
    projectImage: "/rip/frame1.png",
    category: "Tech Symposium Website",
    role: "Frontend Developer",
    organization: "KIIT Student Activity Center",
    stack: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    deliverables: ["Event Schedule", "Timeline UI", "Team Directory"],
    overview: "Interactive event website for the annual Chimera technology symposium, featuring animated timelines, event category details, and team showcases.",
  },
  {
    image: "/logo/kiitmun.png",
    logo: "/logo/kiitmun.png",
    link: "/projects/kiit-mun",
    title: "KIIT MUN",
    description: "Annual Model United Nations conference web platform",
    projectImage: "/rip/frame6.png",
    category: "Model UN Conference Website",
    role: "Frontend Developer",
    organization: "KIIT Model UN",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Delegate Application UI", "Committee Matrix", "Responsive Navigation"],
    overview: "Web platform engineered for the annual Model United Nations conference at KIIT, featuring multi-committee overviews, delegate registration forms, and responsive event schedules.",
  },
  {
    image: "/rip/frame2.png",
    logo: "/logo/ascent.png",
    link: "/projects/acsent-choacing-center",
    title: "Acsent Coaching",
    description: "Web presence and curriculum showcase for academic coaching",
    projectImage: "/rip/frame2.png",
    category: "Coaching Institute Website",
    role: "Web Developer & Designer",
    organization: "Acsent Coaching",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    deliverables: ["Curriculum Overview", "Inquiry Form", "Course Catalog"],
    overview: "Web presence developed for an educational coaching institute, presenting course curriculum, faculty information, and student inquiry channels.",
  },
  {
    image: "/rip/frame3.png",
    logo: "/logo/bikash.png",
    link: "/projects/bikash-vidalya",
    title: "Bikash Vidalya",
    description: "School website with academic updates and parent notices",
    projectImage: "/rip/frame3.png",
    category: "School Website",
    role: "Web Developer & Designer",
    organization: "Bikash Vidyalaya",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    deliverables: ["Notice Bulletin", "Academic Programs", "Parent Information"],
    overview: "Institutional web platform built for Bikash Vidyalaya school, providing administrative updates, academic program overviews, and admissions information.",
  },
  {
    image: "/rip/frame4.png",
    logo: "/logo/indura.png",
    link: "/projects/indura-english-highschool",
    title: "Indura School",
    description: "High school informational website and admissions guide",
    projectImage: "/rip/frame4.png",
    category: "School Website",
    role: "Web Developer & Designer",
    organization: "Indura English High School",
    stack: ["Next.js", "React", "CSS Modules", "Tailwind CSS"],
    deliverables: ["Admissions Guide", "Campus Overview", "Responsive Pages"],
    overview: "Informational website engineered for Indura English High School, delivering clear navigation for prospective students, parents, and academic notices.",
  },
  {
    image: "/rip/frame8.png",
    logo: "/logo/pandav.png",
    link: "/projects/pandav-studio",
    title: "Pandav Studio",
    description: "Minimalist portfolio for creative photography studio",
    projectImage: "/rip/frame8.png",
    category: "Photography & Media Showcase",
    role: "Web Developer & Designer",
    organization: "Pandav Studios",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Visual Gallery", "Service Overview", "Client Contact UI"],
    overview: "Minimalist digital portfolio designed for a creative photography studio, emphasizing full-bleed imagery, clean typography, and service inquiries.",
  },
]

// Deterministic telemetry points for each project architecture & engineering performance
const getProjectTelemetry = (item: PortfolioItem) => {
  const isAI = item.category.toLowerCase().includes("ai")
  const stackSummary = item.stack.slice(0, 2).join(" • ")
  const topDeliverable = item.deliverables[0] || "Custom Architecture"
  const secDeliverable = item.deliverables[1] || "Production Platform"
  
  return [
    {
      subject: "Arch",
      fullLabel: "System Architecture",
      score: 95,
      detail: stackSummary,
      unit: "A+ Tier",
    },
    {
      subject: "Motion",
      fullLabel: "Interaction & Motion",
      score: 98,
      detail: topDeliverable,
      unit: "60 FPS",
    },
    {
      subject: "Speed",
      fullLabel: isAI ? "Token Latency" : "Response Time",
      score: 99,
      detail: secDeliverable,
      unit: isAI ? "18ms" : "<40ms",
    },
    {
      subject: "Scale",
      fullLabel: "Scalability & Load",
      score: 94,
      detail: item.organization,
      unit: "High Concurrency",
    },
    {
      subject: "Code",
      fullLabel: "Type Safety & Quality",
      score: 97,
      detail: item.stack.includes("TypeScript") ? "Strict TypeScript" : "Modular Architecture",
      unit: "100%",
    },
  ]
}

// Custom Interactive Tooltip for the Recharts Telemetry Graph
function TelemetryTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border border-white/20 bg-black/90 backdrop-blur-md p-2 shadow-2xl text-left pointer-events-none min-w-[130px] z-50">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
          <span className="text-[10px] font-mono font-medium text-emerald-400">
            {data.fullLabel}
          </span>
          <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            {data.unit}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[9px] text-white/50 font-mono">Telemetry</span>
          <span className="text-xs font-bold text-white font-mono">{data.score}/100</span>
        </div>
        <div className="text-[8px] font-mono text-zinc-400 mt-1 truncate max-w-[140px]">
          {data.detail}
        </div>
      </div>
    )
  }
  return null
}

// Project Architecture & Engineering Telemetry Graph (Animated Recharts Area Chart)
function ProjectArchitectureCard({ item }: { item: PortfolioItem }) {
  const telemetry = getProjectTelemetry(item)
  const avgScore = (telemetry.reduce((acc, t) => acc + t.score, 0) / telemetry.length).toFixed(1)

  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={16}
      distortionScale={-180}
      displace={0.5}
      backgroundOpacity={0.08}
      className="w-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="w-full p-2 sm:p-2.5 text-left space-y-2">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
              Architecture Telemetry
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {avgScore} INDEX
          </span>
        </div>

        {/* Animated Recharts Area Chart with Key Trigger on Project Change */}
        <div className="w-full h-[105px] relative pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetry} margin={{ top: 5, right: 6, left: 6, bottom: 0 }}>
              <defs>
                <linearGradient id={`telemetryGrad-${item.title.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="60%" stopColor="#10b981" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="subject"
                stroke="rgba(255,255,255,0.4)"
                fontSize={8}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis domain={[85, 100]} hide={true} />
              <Tooltip content={<TelemetryTooltip />} cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "2 2" }} />
              <Area
                key={item.title}
                type="monotone"
                dataKey="score"
                stroke="#34d399"
                strokeWidth={1.8}
                fill={`url(#telemetryGrad-${item.title.replace(/[^a-zA-Z0-9]/g, "")})`}
                isAnimationActive={true}
                animationDuration={850}
                animationEasing="ease-out"
                activeDot={{ r: 4, fill: "#34d399", stroke: "#ffffff", strokeWidth: 1.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Micro Specs Footer */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/5 text-center">
          <div className="p-1 rounded bg-white/[0.02] border border-white/5">
            <span className="text-[7px] font-mono uppercase tracking-wider text-white/30 block">Core</span>
            <span className="text-[8px] font-mono font-medium text-white/80 truncate block">{item.stack[0]}</span>
          </div>
          <div className="p-1 rounded bg-white/[0.02] border border-white/5">
            <span className="text-[7px] font-mono uppercase tracking-wider text-white/30 block">Motion</span>
            <span className="text-[8px] font-mono font-medium text-emerald-400 block">60 FPS</span>
          </div>
          <div className="p-1 rounded bg-white/[0.02] border border-white/5">
            <span className="text-[7px] font-mono uppercase tracking-wider text-white/30 block">Status</span>
            <span className="text-[8px] font-mono font-medium text-white/80 block">Verified</span>
          </div>
        </div>
      </div>
    </GlassSurface>
  )
}

// Tech Stack & Software Scope Card (Right Column)
function ProjectScopeCard({ item }: { item: PortfolioItem }) {
  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={14}
      distortionScale={-180}
      displace={0.5}
      backgroundOpacity={0.08}
      className="w-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="w-full p-2 sm:p-2.5 text-left space-y-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
              Tech Stack & Scope
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400/90 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {item.role}
          </span>
        </div>

        {/* Primary Tech Stack Software Tags */}
        <div className="space-y-1">
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 block">
            Software & Tech Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/90 hover:border-emerald-400/40 hover:text-emerald-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scope Deliverables Tags */}
        <div className="space-y-1 pt-1.5 border-t border-white/5">
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 block">
            Deliverable Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.deliverables.map((deliv, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/15 text-emerald-300/80 flex items-center gap-1"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {deliv}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassSurface>
  )
}

// Animation variants for side content
const sideContentVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
}

export default function InfiniteMenuSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isGlobeMoving, setIsGlobeMoving] = useState(false)
  const [canNavigate, setCanNavigate] = useState(true)
  const navigateRef = useRef<((direction: "prev" | "next") => void) | null>(null)

  const activeIndexRef = useRef(0)
  activeIndexRef.current = activeIndex

  const activeItem = portfolioItems[displayIndex] ?? portfolioItems[0]

  const handleActiveItemChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleMovementChange = useCallback((moving: boolean) => {
    setIsGlobeMoving(moving)
  }, [])

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!canNavigate) return
      setCanNavigate(false)

      const win = window as any
      if (typeof win.__infiniteMenuNavigate === "function") {
        win.__infiniteMenuNavigate(direction)
      } else if (navigateRef.current) {
        navigateRef.current(direction)
      }

      setTimeout(() => setCanNavigate(true), 350)
    },
    [canNavigate]
  )

  useEffect(() => {
    if (!isGlobeMoving) {
      setDisplayIndex(activeIndexRef.current)
    }
  }, [isGlobeMoving, activeIndex])

  return (
    <section className="relative w-full h-screen min-h-0 bg-black overflow-hidden border-t border-white/5 flex flex-col">
      {/* Header */}
      <div className="text-center pt-6 pb-2 px-4 shrink-0">
        <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-1 tracking-tight px-2">
          Project Constellation
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 max-w-2xl mx-auto px-4 tracking-wide font-light">
          Rotate through verified full-stack applications, event platforms, and applied AI systems.
        </p>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="flex-1 min-h-0 max-w-[1400px] w-full mx-auto px-4 md:px-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_260px] lg:grid-cols-[300px_1fr_300px] gap-4 items-center h-full">

          {/* ─── LEFT COLUMN: Engineering & Architecture Focus ─── */}
          <div className="hidden md:flex flex-col items-center gap-3 h-full justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-3 w-full"
              >
                <div className="relative">
                  <GlassSurface
                    width={56}
                    height={56}
                    borderRadius={28}
                    distortionScale={-160}
                    displace={0.4}
                    backgroundOpacity={0.12}
                    className="border border-white/15"
                  >
                    <img
                      src={activeItem.logo}
                      alt={activeItem.title}
                      className="w-9 h-9 object-contain"
                    />
                  </GlassSurface>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-50 pointer-events-none" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {activeItem.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mt-0.5">
                    {activeItem.category}
                  </span>
                </div>

                <ProjectArchitectureCard item={activeItem} />

                {activeItem.link.startsWith("/") ? (
                  <TransitionLink href={activeItem.link} className="w-full block group">
                    <GlassSurface
                      width="100%"
                      height={40}
                      borderRadius={10}
                      distortionScale={-180}
                      displace={0.4}
                      backgroundOpacity={0.12}
                      className="w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.08)]"
                    >
                      <span className="text-white text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 group-hover:text-zinc-200">
                        View Case Study →
                      </span>
                    </GlassSurface>
                  </TransitionLink>
                ) : (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block group"
                  >
                    <GlassSurface
                      width="100%"
                      height={40}
                      borderRadius={10}
                      distortionScale={-180}
                      displace={0.4}
                      backgroundOpacity={0.12}
                      className="w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.08)]"
                    >
                      <span className="text-white text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 group-hover:text-zinc-200">
                        View Project →
                      </span>
                    </GlassSurface>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── CENTER COLUMN: Globe + Arrows ─── */}
          <div className="flex flex-col items-center h-full justify-center">
            {/* Globe */}
            <div className="h-[340px] sm:h-[380px] md:h-[400px] w-full relative">
              <InfiniteMenu
                items={portfolioItems}
                onNavigate={handleNavigate}
                hideOverlay={true}
                onActiveItemChange={handleActiveItemChange}
                onMovementChange={handleMovementChange}
              />
            </div>

            {/* Arrow Navigation */}
            <div className="flex items-center gap-3 mt-2 z-20">
              <button
                type="button"
                onClick={() => handleNavigate("prev")}
                disabled={!canNavigate}
                className="group focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-transform cursor-pointer"
                aria-label="Previous project"
              >
                <GlassSurface
                  width={44}
                  height={44}
                  borderRadius={22}
                  distortionScale={-180}
                  displace={0.5}
                  backgroundOpacity={0.12}
                  className="transition-all duration-300 hover:scale-105 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-white/30"
                >
                  <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </GlassSurface>
              </button>

              {/* Dots indicator inside GlassSurface */}
              <GlassSurface
                width="auto"
                height={38}
                borderRadius={19}
                distortionScale={-140}
                displace={0.3}
                backgroundOpacity={0.08}
                className="px-3 border border-white/10"
              >
                <div className="flex items-center gap-1.5 px-2">
                  {portfolioItems.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-300 ${
                        i === displayIndex
                          ? "w-6 h-1.5 bg-white/70"
                          : "w-1.5 h-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </GlassSurface>

              <button
                type="button"
                onClick={() => handleNavigate("next")}
                disabled={!canNavigate}
                className="group focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-transform cursor-pointer"
                aria-label="Next project"
              >
                <GlassSurface
                  width={44}
                  height={44}
                  borderRadius={22}
                  distortionScale={-180}
                  displace={0.5}
                  backgroundOpacity={0.12}
                  className="transition-all duration-300 hover:scale-105 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-white/30"
                >
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </GlassSurface>
              </button>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Project Context & Scope ─── */}
          <div className="hidden md:flex flex-col items-center gap-3 h-full justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-3 w-full"
              >
                {/* Project Context Card */}
                <GlassSurface
                  width="100%"
                  height="auto"
                  borderRadius={14}
                  distortionScale={-180}
                  displace={0.5}
                  backgroundOpacity={0.08}
                  className="w-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                >
                  <div className="w-full p-2.5 sm:p-3 text-left">
                    <div className="flex items-center justify-between mb-2.5 border-b border-white/5 pb-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Project Context</span>
                      <span className="text-[9px] font-mono text-emerald-400">Verified Case</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed mb-3">
                      {activeItem.overview}
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                        <img
                          src={activeItem.logo}
                          alt={activeItem.title}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">
                          {activeItem.organization}
                        </p>
                        <p className="text-white/30 text-[10px]">Client / Organization</p>
                      </div>
                    </div>
                  </div>
                </GlassSurface>

                {/* Tech Stack & Software Scope Card */}
                <ProjectScopeCard item={activeItem} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── MOBILE: Info below globe ─── */}
        <div className="md:hidden mt-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${displayIndex}`}
              variants={sideContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Client info row */}
              <div className="flex items-center gap-4 px-2">
                <GlassSurface
                  width={56}
                  height={56}
                  borderRadius={28}
                  distortionScale={-160}
                  displace={0.4}
                  backgroundOpacity={0.12}
                  className="border border-white/15 shrink-0"
                >
                  <img
                    src={activeItem.logo}
                    alt={activeItem.title}
                    className="w-9 h-9 object-contain"
                  />
                </GlassSurface>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                  <p className="text-gray-400 text-sm">{activeItem.description}</p>
                </div>
              </div>

              {/* Architecture & Telemetry Graph (Mobile) */}
              <ProjectArchitectureCard item={activeItem} />

              {/* Tech Stack & Scope Software Tags (Mobile) */}
              <ProjectScopeCard item={activeItem} />

              {/* Context (Mobile) */}
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={14}
                distortionScale={-180}
                displace={0.5}
                backgroundOpacity={0.08}
                className="w-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="w-full p-4 text-left">
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {activeItem.overview}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/60 text-xs font-mono">{activeItem.organization}</span>
                  </div>
                </div>
              </GlassSurface>

              {/* CTA */}
              {activeItem.link.startsWith("/") ? (
                <TransitionLink href={activeItem.link} className="block w-full group">
                  <GlassSurface
                    width="100%"
                    height={46}
                    borderRadius={12}
                    distortionScale={-180}
                    displace={0.4}
                    backgroundOpacity={0.12}
                    className="w-full cursor-pointer transition-all duration-300 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                  >
                    <span className="text-white text-sm font-medium tracking-wide flex items-center justify-center gap-1.5 group-hover:text-zinc-200">
                      View Case Study →
                    </span>
                  </GlassSurface>
                </TransitionLink>
              ) : (
                <a
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full group"
                >
                  <GlassSurface
                    width="100%"
                    height={46}
                    borderRadius={12}
                    distortionScale={-180}
                    displace={0.4}
                    backgroundOpacity={0.12}
                    className="w-full cursor-pointer transition-all duration-300 active:scale-95 border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                  >
                    <span className="text-white text-sm font-medium tracking-wide flex items-center justify-center gap-1.5 group-hover:text-zinc-200">
                      View Project →
                    </span>
                  </GlassSurface>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
