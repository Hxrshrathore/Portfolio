"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  ArrowDownToLine, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Mail, 
  Globe, 
  Github, 
  Linkedin,
  MapPin,
  Sparkles
} from "lucide-react"
import { getSavedPosition, savePosition } from "@/lib/cookies"

export default function ResumePage() {
  const router = useRouter()
  const [isRevealing, setIsRevealing] = useState(true)
  const [isWipingBack, setIsWipingBack] = useState(false)

  // ── Notch vertical position along left edge (15% to 85%, default 50%) ──
  const [notchYPercent, setNotchYPercent] = useState(50)
  const isDraggingNotchVRef = useRef(false)
  const dragStartYClientRef = useRef(0)
  const dragStartPercentYRef = useRef(50)
  const hasDraggedNotchRef = useRef(false)

  // Restore saved vertical position from cookie
  useEffect(() => {
    const saved = getSavedPosition("notch_resume_y", 50)
    setNotchYPercent(saved)
  }, [])

  // ── Pull right state (horizontal distance pulled from left edge towards right) ──
  const [isPullingBack, setIsPullingBack] = useState(false)
  const [pullBackX, setPullBackX] = useState(0)
  const dragStartXClientRef = useRef(0)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  // Handle initial entrance reveal (black curtain wipes off to the left)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Trigger smooth transition back to Home (PURE WHITE curtain)
  const triggerTransitionToHome = useCallback(() => {
    if (isWipingBack) return
    setIsWipingBack(true)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("h-transition", "from-resume")
    }
  }, [isWipingBack])

  // ── Pointer Handlers on Left Notch (2D drag: vertical slider + horizontal pull) ──
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragStartXClientRef.current = e.clientX
      dragStartYClientRef.current = e.clientY
      dragStartPercentYRef.current = notchYPercent
      isDraggingNotchVRef.current = false
      hasDraggedNotchRef.current = false
      setIsPullingBack(true)
      try {
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    },
    [notchYPercent]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStartXClientRef.current) return
      const dx = e.clientX - dragStartXClientRef.current // positive when pulling RIGHT (inward from left edge)
      const dy = e.clientY - dragStartYClientRef.current

      if (Math.hypot(dx, dy) > 6) {
        hasDraggedNotchRef.current = true
      }

      // Detect if user is sliding notch vertically up/down along the edge
      if (Math.abs(dy) > Math.abs(dx) * 1.2 && !isDraggingNotchVRef.current && dx < 20) {
        isDraggingNotchVRef.current = true
      }

      if (isDraggingNotchVRef.current) {
        // Sliding notch vertically along left edge: snappy and smooth clamp [15%, 85%]
        const vh = window.innerHeight || 800
        const deltaPercent = (dy / vh) * 100
        const nextY = Math.min(85, Math.max(15, dragStartPercentYRef.current + deltaPercent))
        setNotchYPercent(nextY)
        setPullBackX(0)
      } else {
        // Pulling notch right into the screen
        if (dx > 0) {
          const threshold = window.innerWidth * 0.30
          setPullBackX(dx)
          // 30% auto-snap threshold
          if (dx >= threshold) {
            dragStartXClientRef.current = 0
            setIsPullingBack(false)
            setPullBackX(window.innerWidth)
            triggerTransitionToHome()
          }
        } else {
          setPullBackX(0)
        }
      }
    },
    [triggerTransitionToHome]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartXClientRef.current) {
        const dx = e.clientX - dragStartXClientRef.current
        const threshold = window.innerWidth * 0.30

        if (isDraggingNotchVRef.current) {
          savePosition("notch_resume_y", notchYPercent)
        } else if (dx >= threshold) {
          triggerTransitionToHome()
        } else if (dx > 25) {
          // Quick flick trigger
          triggerTransitionToHome()
        }
      }
      dragStartXClientRef.current = 0
      isDraggingNotchVRef.current = false
      setIsPullingBack(false)
      setPullBackX(0)
      setTimeout(() => {
        hasDraggedNotchRef.current = false
      }, 100)
    },
    [notchYPercent, triggerTransitionToHome]
  )

  // ── Auto-switch to Home on left-to-right scroll / swipe on Resume page ──
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      // Only active near the top of the resume page
      if (scrollY > 20) return
      if (isWipingBack) return

      // deltaX < -8 indicates horizontal scroll from left to right (swiping right on trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.deltaX < -8) {
        const threshold = window.innerWidth * 0.30
        const pullAmount = Math.abs(e.deltaX) * 1.3
        setPullBackX((prev) => {
          const next = Math.min(window.innerWidth, prev + pullAmount)
          if (next >= threshold) {
            triggerTransitionToHome()
            return window.innerWidth
          }
          return next
        })

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
        wheelTimeoutRef.current = setTimeout(() => {
          setPullBackX((curr) => {
            const threshold = window.innerWidth * 0.30
            if (curr >= threshold) {
              triggerTransitionToHome()
              return window.innerWidth
            }
            return 0 // spring back smoothly!
          })
        }, 140)
      }
    }

    // Touch swipe horizontal detection on Resume
    const handleTouchStart = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 20) return
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 20) return
      if (isWipingBack) return

      const dx = e.touches[0].clientX - touchStartXRef.current // positive when swiping right
      const dy = touchStartYRef.current - e.touches[0].clientY

      // Horizontal swipe to the right
      if (dx > 10 && Math.abs(dx) > Math.abs(dy)) {
        const threshold = window.innerWidth * 0.30
        setPullBackX(dx)
        if (dx >= threshold) {
          triggerTransitionToHome()
        }
      }
    }

    const handleTouchEnd = () => {
      if (touchStartXRef.current === null) return
      const threshold = window.innerWidth * 0.30
      setPullBackX((curr) => {
        if (curr >= threshold) {
          triggerTransitionToHome()
          return window.innerWidth
        }
        return 0 // spring back smoothly
      })
      touchStartXRef.current = null
      touchStartYRef.current = null
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
    }
  }, [isWipingBack, triggerTransitionToHome])

  // Rubber band stretch factor (0 to 1) for the white portfolio bar
  const threshold = typeof window !== "undefined" ? window.innerWidth * 0.30 : 400
  const stretchFactor = Math.min(1, pullBackX / (threshold || 400))
  const arrowStemWidth = Math.round(20 + stretchFactor * 36)

  // Dummy Resume Data
  const experiences = [
    {
      role: "Lead Full-Stack Engineer",
      company: "Acme Innovation Labs",
      location: "San Francisco, CA (Remote)",
      period: "2024 — Present",
      description: "Spearheaded high-performance real-time architectures, distributed microservices, and AI-enabled developer platforms.",
      highlights: [
        "Architected Next.js and WebGL analytics dashboards reducing page latency by 42% across 120k MAU.",
        "Engineered serverless pipelines using Node.js, PostgreSQL, and Redis caching for sub-15ms response times.",
        "Mentored a cross-functional team of 6 engineers on TypeScript best practices and CI/CD automation.",
      ],
    },
    {
      role: "Forward Deployed Software Intern",
      company: "Nexus Systems & AI",
      location: "New York, NY",
      period: "2023 — 2024",
      description: "Designed and shipped client-facing integrations, automated workflow triggers, and custom LLM inference APIs.",
      highlights: [
        "Integrated RAG vector embeddings using LangChain and pgvector, achieving 94% query relevance.",
        "Developed custom WebGL shader micro-interactions improving user conversion rates by 28%.",
        "Containerized core microservices with Docker and deployed resilient staging environments on AWS.",
      ],
    },
    {
      role: "Frontend Developer & UI Specialist",
      company: "Creative Studio Morph",
      location: "London, UK (Remote)",
      period: "2022 — 2023",
      description: "Crafted interactive websites, 3D product visualizations, and fluid GSAP/Framer Motion animations.",
      highlights: [
        "Delivered 14 bespoke client web applications winning 3 Awwwards Site of the Day honors.",
        "Built responsive design systems with Tailwind CSS, ensuring 100/100 Google Lighthouse scores.",
      ],
    },
  ]

  const education = [
    {
      degree: "B.S. in Computer Science & Engineering",
      institution: "Institute of Technology & Advanced Science",
      period: "2021 — 2025",
      grade: "GPA: 3.9 / 4.0 (Dean's Honor Roll)",
      details: "Focus in Distributed Systems, Algorithms, Interactive Graphics, and Artificial Intelligence.",
    },
    {
      degree: "Higher Secondary Specialization (STEM)",
      institution: "National Science Academy",
      period: "2019 — 2021",
      grade: "Top 1% Percentile",
      details: "Advanced Mathematics, Physics, and Computer Science fundamentals.",
    },
  ]

  const skillGroups = [
    {
      category: "Languages & Core",
      skills: ["TypeScript", "JavaScript", "Python", "SQL", "Go", "HTML5/CSS3", "GraphQL"],
    },
    {
      category: "Frontend & Interfaces",
      skills: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "GSAP", "WebGL"],
    },
    {
      category: "Backend & Systems",
      skills: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs", "Drizzle ORM", "Prisma"],
    },
    {
      category: "Cloud, AI & DevOps",
      skills: ["Docker", "AWS", "Cloudflare", "OpenAI API", "Vector DBs", "Git", "CI/CD"],
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black font-sans overflow-x-hidden">
      {/* ── Background Ambient Glow ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[350px] bg-gradient-to-tr from-white/[0.03] to-transparent blur-[140px] rounded-full" />
      </div>

      {/* ── Sliding WHITE Portfolio Pull Bar (Opens from left edge when pulled or scrolled) ── */}
      <div
        style={{
          width: Math.max(0, pullBackX),
          transition: isPullingBack ? "none" : "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="fixed top-0 left-0 h-screen bg-white text-black z-30 overflow-hidden flex items-center justify-center border-r border-black/10 pointer-events-none select-none shadow-[8px_0_30px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col items-center justify-center text-center px-6 min-w-[280px]">
          {/* Stretchy rubber band arrow in black pointing right */}
          <div className="flex items-center justify-center mb-6">
            <svg
              width={arrowStemWidth + 14}
              height="36"
              viewBox={`0 0 ${arrowStemWidth + 14} 36`}
              className="h-7 w-auto text-black transition-all duration-150 ease-out"
            >
              {/* Left anchor circle */}
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              {/* Elastic stem */}
              <line
                x1={6}
                y1="18"
                x2={arrowStemWidth + 2}
                y2="18"
                stroke="currentColor"
                strokeWidth={Math.max(1, 3 - stretchFactor * 1.8)}
                strokeLinecap="round"
              />
              {/* Arrowhead pointing right */}
              <path
                d={`M ${arrowStemWidth - 2} 10 L ${arrowStemWidth + 6} 18 L ${arrowStemWidth - 2} 26`}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Clean "Portfolio" Typography (Snap text on white background) */}
          <button
            type="button"
            onClick={triggerTransitionToHome}
            className="group cursor-pointer px-6 sm:px-10 py-2 rounded-2xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center text-center focus:outline-none pointer-events-auto"
            title="Click to view Portfolio"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-black group-hover:text-zinc-800 transition-colors whitespace-nowrap">
              Portfolio
            </h2>
            <span className="text-xs sm:text-sm font-normal text-zinc-600 block mt-1 tracking-normal group-hover:text-zinc-700 transition-colors whitespace-nowrap">
              Selected Works & Case Studies
            </span>
          </button>
        </div>
      </div>

      {/* ── Left Half-Oval Pull Tab (White notch with black arrow, draggable Top-to-Bottom) ── */}
      <div
        style={{
          top: `${notchYPercent}%`,
          transform: `translateY(-50%) translateX(${pullBackX}px)`,
          transition: isPullingBack ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.2s ease-out",
        }}
        className="fixed left-0 z-40 flex items-center select-none pointer-events-auto"
      >
        <button
          type="button"
          onClick={(e) => {
            if (hasDraggedNotchRef.current) {
              e.preventDefault()
              e.stopPropagation()
              hasDraggedNotchRef.current = false
              return
            }
            triggerTransitionToHome()
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartXClientRef.current = 0
            isDraggingNotchVRef.current = false
            hasDraggedNotchRef.current = false
            setIsPullingBack(false)
            setPullBackX(0)
          }}
          className="group relative cursor-grab active:cursor-grabbing select-none focus:outline-none flex items-center touch-none"
          aria-label="Back to Portfolio Home"
          data-no-cursor="true"
        >
          {/* Seamless extension to the left off-screen */}
          <div className="w-8 h-full bg-white -ml-8" />

          {/* Half-oval shape SVG flaring inward from the left screen edge (WHITE) */}
          <div className="relative w-[34px] sm:w-[38px] h-28 sm:h-36">
            <svg
              viewBox="0 0 38 140"
              className="w-full h-full block filter drop-shadow-[3px_0_14px_rgba(255,255,255,0.15)]"
              preserveAspectRatio="none"
            >
              {/* Solid white fill */}
              <path
                d="M 0,0 C 0,28 38,38 38,70 C 38,102 0,112 0,140 Z"
                fill="#ffffff"
              />
              {/* Subtle contour curve stroke */}
              <path
                d="M 0,0 C 0,28 38,38 38,70 C 38,102 0,112 0,140"
                fill="none"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Bouncing black arrow slowly pointing right (back towards home) */}
            <div className="absolute inset-0 flex items-center justify-center pr-1 pointer-events-none">
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ArrowRight
                  className="w-4 h-4 text-black transition-colors"
                  strokeWidth={2.6}
                />
              </motion.div>
            </div>
          </div>

          {/* Tooltip on hover (appears to the right of the tab) */}
          <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 z-50">
            <div className="flex items-center px-3 py-1 rounded-full bg-white text-black text-[11px] sm:text-xs font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-black/10 backdrop-blur-md whitespace-nowrap">
              Back to Home
            </div>
          </div>
        </button>
      </div>

      {/* ── Main Résumé Content Container ── */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        {/* ── Header Section ── */}
        <header className="border-b border-white/10 pb-10 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase bg-white/10 text-white/90 border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </span>
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Remote / Global
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Harsh Kumar
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 font-light mt-2 max-w-xl">
                Forward Deployed Software Engineer & Applied AI Builder creating high-craft digital systems.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={triggerTransitionToHome}
                className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                Portfolio
              </button>
              <a
                href="/resume.pdf"
                download="Harsh_Kumar_Resume.pdf"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-white/5 text-xs text-zinc-400">
            <span className="flex items-center gap-2 text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              contact@harshkumar.dev
            </span>
            <a
              href="https://github.com/hxrshrathore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              github.com/hxrshrathore
            </a>
            <a
              href="https://linkedin.com/in/hxrshrathore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              linkedin.com/in/hxrshrathore
            </a>
          </div>
        </header>

        {/* ── Experience Section ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Work Experience
            </h2>
          </div>

          <div className="space-y-10 pl-2 sm:pl-4 border-l border-white/10 ml-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node */}
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 border border-black group-hover:bg-white group-hover:scale-125 transition-all" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <h3 className="text-lg font-semibold text-white group-hover:text-zinc-200 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm text-zinc-400 font-medium mb-3">
                  <span className="text-zinc-200">{exp.company}</span> • <span className="text-zinc-500">{exp.location}</span>
                </div>

                <p className="text-sm text-zinc-400 font-light mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills & Tech Stack ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Technical Proficiencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGroups.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-zinc-500" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-zinc-300 border border-white/5 hover:border-white/20 hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education Section ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-zinc-400 mt-0.5">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    {edu.details}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs font-mono text-zinc-400 block">
                    {edu.period}
                  </span>
                  <span className="text-xs font-medium text-emerald-400/90 mt-1 block">
                    {edu.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom Call To Action ── */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Harsh Kumar. All rights reserved.</span>
          <button
            type="button"
            onClick={triggerTransitionToHome}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Portfolio Homepage
          </button>
        </footer>
      </main>

      {/* ── Curtain Wipe Overlay when returning Home (Pure White) ── */}
      <AnimatePresence>
        {isWipingBack && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              window.scrollTo(0, 0)
              router.push("/")
            }}
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Entrance Reveal Curtain (Wipes off to the left) ── */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
