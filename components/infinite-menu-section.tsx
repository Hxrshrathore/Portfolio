"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

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

// Project Architecture & Deliverables Card (Left Column)
function ProjectArchitectureCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3.5 space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Role</span>
        <span className="text-[10px] font-medium text-white/90">{item.role}</span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 block">Deliverables</span>
        <div className="flex flex-wrap gap-1.5">
          {item.deliverables.map((d, i) => (
            <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 pt-1 border-t border-white/5">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 block">Stack</span>
        <div className="flex flex-wrap gap-1">
          {item.stack.map((s, i) => (
            <span key={i} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5 text-white/60">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
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
        <span className="text-white/40 text-[10px] font-mono tracking-[0.25em] uppercase block mb-1">
          Interactive Archive
        </span>
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
                  <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={activeItem.logo}
                      alt={activeItem.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-50" />
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
                  <Link
                    href={activeItem.link}
                    className="w-full py-2 px-6 rounded-lg border border-white/15 bg-white/5
                             text-white text-xs font-medium tracking-wide text-center
                             hover:bg-white/10 hover:border-white/25 transition-all duration-300
                             backdrop-blur-sm block"
                  >
                    View Case Study →
                  </Link>
                ) : (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-6 rounded-lg border border-white/15 bg-white/5
                             text-white text-xs font-medium tracking-wide text-center
                             hover:bg-white/10 hover:border-white/25 transition-all duration-300
                             backdrop-blur-sm block"
                  >
                    View Project →
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
            <div className="flex gap-4 mt-2 z-20">
              <button
                onClick={() => handleNavigate("prev")}
                disabled={!canNavigate}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         flex items-center justify-center text-white/60 
                         hover:bg-white/10 hover:text-white hover:border-white/25 
                         transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {portfolioItems.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === displayIndex
                        ? "w-6 h-1.5 bg-white/60"
                        : "w-1.5 h-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNavigate("next")}
                disabled={!canNavigate}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         flex items-center justify-center text-white/60 
                         hover:bg-white/10 hover:text-white hover:border-white/25 
                         transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
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
                <div className="w-full rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Project Context</span>
                    <span className="text-[9px] font-mono text-emerald-400">Verified Case</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-3">
                    {activeItem.overview}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
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

                {/* Project Focus & Role Card */}
                <div className="w-full rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 flex flex-col items-center gap-2 text-center">
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium font-mono">
                    Project Scope
                  </span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-mono text-xs tracking-wide">{activeItem.role}</span>
                  </div>
                  <span className="text-white/30 text-[9px] font-mono">
                    Custom Web Implementation
                  </span>
                </div>
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
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img
                    src={activeItem.logo}
                    alt={activeItem.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                  <p className="text-gray-400 text-sm">{activeItem.description}</p>
                </div>
              </div>

              {/* Architecture & Deliverables (Mobile) */}
              <ProjectArchitectureCard item={activeItem} />

              {/* Context (Mobile) */}
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {activeItem.overview}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/60 text-xs font-mono">{activeItem.organization}</span>
                </div>
              </div>

              {/* CTA */}
              {activeItem.link.startsWith("/") ? (
                <Link
                  href={activeItem.link}
                  className="block w-full py-3 rounded-lg border border-white/15 bg-white/5 
                           text-white text-sm font-medium tracking-wide text-center
                           hover:bg-white/10 transition-all"
                >
                  View Case Study →
                </Link>
              ) : (
                <a
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-lg border border-white/15 bg-white/5 
                           text-white text-sm font-medium tracking-wide text-center
                           hover:bg-white/10 transition-all"
                >
                  View Project →
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
