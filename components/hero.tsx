"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { usePageTransition } from "@/components/page-transition"
import { FileText, ArrowUpRight, Sparkles } from "lucide-react"

// Dynamic import of LiquidChrome canvas to preserve SSR for semantic HTML
const LiquidChrome = dynamic(() => import("@/components/liquid-chrome"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
})

export default function Hero() {
  const { navigateTo } = usePageTransition()
  const [hasResume, setHasResume] = useState(false)

  // Verify whether a real resume PDF exists at /resume.pdf
  useEffect(() => {
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-type")?.includes("pdf")) {
          setHasResume(true)
        }
      })
      .catch(() => {
        setHasResume(false)
      })
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="relative min-h-[92svh] md:min-h-[96vh] w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Dynamic WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <LiquidChrome
          baseColor={[0.015, 0.015, 0.015]}
          speed={0.16}
          amplitude={0.17}
          frequencyX={2.5}
          frequencyY={1.5}
          interactive={false}
        />
        {/* Bottom Blend Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />
      </div>

      {/* Main Semantic Content (Visible in SSR & crawlers) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 pt-20 md:pt-28 pb-16 text-center"
      >
        {/* Positioning Badge */}
        <motion.div variants={childVariants} className="mb-6 md:mb-8">
          <div className="inline-flex items-center space-x-2.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-[0_0_30px_rgba(255,255,255,0.03)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-[11px] md:text-xs font-mono tracking-[0.15em] uppercase">
              Harsh Kumar • Forward Deployed Engineer & Applied AI
            </span>
          </div>
        </motion.div>

        {/* Primary Semantic H1 */}
        <motion.h1
          variants={childVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent tracking-tight max-w-4xl leading-[1.08] mb-6"
        >
          Product-Minded Software Engineer & Applied AI Builder
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          variants={childVariants}
          className="text-base sm:text-lg md:text-xl text-zinc-300/90 mb-10 md:mb-12 max-w-2xl px-4 font-light leading-relaxed tracking-wide"
        >
          I design, engineer, and ship full-stack products, AI-powered applications, and integrations — from figuring out the problem to getting the solution running.
        </motion.p>

        {/* Primary Calls to Action */}
        <motion.div variants={childVariants} className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigateTo("/projects")}
            className="group relative overflow-hidden bg-white text-black hover:bg-white rounded-full px-8 md:px-10 py-6 text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-[0_0_40px_rgba(255,255,255,0.18)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Case Studies
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>

          {hasResume ? (
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.15em] uppercase text-white/80 border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>View Resume</span>
            </a>
          ) : (
            <button
              onClick={() => navigateTo("/contact")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.15em] uppercase text-white/60 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:text-white/90 hover:border-white/20 transition-all backdrop-blur-sm"
              title="Resume available upon direct request"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Resume on Request</span>
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
