"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { TooltipPill } from "@/components/ui/tooltip"
import { useScroll } from "@/components/smooth-scroll"
import RightResumeNotch from "./right-resume-notch"
import { getSavedPosition, savePosition } from "@/lib/cookies"

interface HeroPortfolioTransitionProps {
  hero: React.ReactNode
  children: React.ReactNode
}

const updateBrowserTheme = (isDark: boolean) => {
  if (typeof document === "undefined") return
  const color = isDark ? "#000000" : "#ffffff"

  let metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
  if (!metaTheme) {
    metaTheme = document.createElement("meta")
    metaTheme.name = "theme-color"
    document.head.appendChild(metaTheme)
  }
  if (metaTheme.content !== color) {
    metaTheme.content = color
  }

  let metaApple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement
  if (!metaApple) {
    metaApple = document.createElement("meta")
    metaApple.name = "apple-mobile-web-app-status-bar-style"
    document.head.appendChild(metaApple)
  }
  metaApple.content = isDark ? "black-translucent" : "default"

  document.documentElement.style.backgroundColor = color
  if (document.body) {
    document.body.style.backgroundColor = color
  }
}

export default function HeroPortfolioTransition({
  hero,
  children,
}: HeroPortfolioTransitionProps) {
  const { lenis } = useScroll()
  const gateRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const heroStickyRef = useRef<HTMLDivElement>(null)
  const isSnappingRef = useRef(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const [isHeroCovered, setIsHeroCovered] = useState(false)
  const lastIsBelowHeroRef = useRef<boolean | null>(null)
  const targetYRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const scrollProgressRef = useRef(0)
  const arrowSvgRef = useRef<SVGSVGElement>(null)
  const arrowTailPathRef = useRef<SVGPathElement>(null)
  const arrowHeadPathRef = useRef<SVGPathElement>(null)

  const updateArrowGeometry = useCallback((stretch: number) => {
    const svg = arrowSvgRef.current
    const tail = arrowTailPathRef.current
    const head = arrowHeadPathRef.current
    if (!svg || !tail || !head) return

    const stemHeight = Math.round(54 + stretch * 26)
    const arrowTotalHeight = stemHeight + 8
    const topW = 1.6
    const botW = 0.75
    const midW = Math.max(0.45, 1.35 - stretch * 0.85)
    const midY = (4 + stemHeight) / 2

    svg.setAttribute("height", String(arrowTotalHeight))
    svg.setAttribute("viewBox", `0 0 36 ${arrowTotalHeight}`)
    tail.setAttribute(
      "d",
      `M ${18 - topW},4 Q ${18 - midW},${midY} ${18 - botW},${stemHeight} L ${18 + botW},${stemHeight} Q ${18 + midW},${midY} ${18 + topW},4 Z`
    )
    head.setAttribute("d", "M 10,11 L 18,3 L 26,11")
  }, [])

  // ── Drag & Pull Handle State for Bottom Hero Notch ──
  const [isPulling, setIsPulling] = useState(false)
  const dragStartYRef = useRef(0)
  const [pullY, setPullY] = useState(0)
  const [notchXPercent, setNotchXPercent] = useState(50)
  const dragStartXRef = useRef(0)
  const dragStartPercentXRef = useRef(50)
  const isDraggingNotchHRef = useRef(false)
  const hasDraggedNotchRef = useRef(false)

  // Restore saved bottom notch horizontal position from cookie
  useEffect(() => {
    const saved = getSavedPosition("notch_bottom_x", 50)
    setNotchXPercent(saved)
  }, [])

  // Fluid quintic-out ease for silky transition settle
  const springEase = useCallback((t: number) => {
    return 1 - Math.pow(1 - t, 3.6)
  }, [])

  // Sync scroll position immediately before animated snapping
  const syncScroll = useCallback((y: number) => {
    if (lenis) {
      lenis.scrollTo(y, { immediate: true })
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: y })
    }
  }, [lenis])

  // Calculate and cache the absolute target scroll offset of the curved line section
  const updateTargetY = useCallback(() => {
    if (typeof window === "undefined") return
    const vh = window.innerHeight || 800
    if (portfolioRef.current) {
      const rect = portfolioRef.current.getBoundingClientRect()
      targetYRef.current = Math.round(rect.top + (window.scrollY || window.pageYOffset || 0))
    } else {
      targetYRef.current = Math.round(vh + (gateRef.current?.offsetHeight || vh * 0.3))
    }
  }, [])

  useEffect(() => {
    updateTargetY()
    window.addEventListener("resize", updateTargetY, { passive: true })
    return () => window.removeEventListener("resize", updateTargetY)
  }, [updateTargetY])

  // Snap forward to Portfolio (curved line section) without locking wheel override
  const triggerSnapToPortfolio = useCallback(() => {
    if (isSnappingRef.current) return
    isSnappingRef.current = true
    setIsSnapping(true)
    updateArrowGeometry(0)

    updateTargetY()
    const targetY = targetYRef.current
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768

    if (lenis) {
      lenis.scrollTo(targetY, {
        lock: false,
        duration: isMobile ? 0.58 : 0.78,
        easing: springEase,
        onComplete: () => {
          isSnappingRef.current = false
          setIsSnapping(false)
        },
      })
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" })
      setTimeout(() => {
        isSnappingRef.current = false
        setIsSnapping(false)
      }, isMobile ? 580 : 780)
    }
  }, [lenis, springEase, updateArrowGeometry, updateTargetY])

  // External trigger (e.g. from Hero Portfolio button)
  const handleSnapFromHero = useCallback(() => {
    setIsPulling(false)
    setPullY(36)
    setTimeout(() => {
      setPullY(0)
      triggerSnapToPortfolio()
    }, 140)
  }, [triggerSnapToPortfolio])

  useEffect(() => {
    window.addEventListener("snap-to-portfolio", handleSnapFromHero)
    return () => window.removeEventListener("snap-to-portfolio", handleSnapFromHero)
  }, [handleSnapFromHero])

  // ── Pull-up & Horizontal Slide Gestures on Bottom Half-Oval Tab ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX
    dragStartYRef.current = e.clientY
    dragStartPercentXRef.current = notchXPercent
    isDraggingNotchHRef.current = false
    hasDraggedNotchRef.current = false
    setIsPulling(true)
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }, [notchXPercent])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStartYRef.current) return
    const dx = e.clientX - dragStartXRef.current
    const dy = dragStartYRef.current - e.clientY // positive when pulling UP

    if (Math.hypot(dx, dy) > 6) {
      hasDraggedNotchRef.current = true
    }

    // Detect if user is sliding notch horizontally along bottom edge
    if (Math.abs(dx) > Math.abs(dy) * 1.2 && !isDraggingNotchHRef.current && dy < 20) {
      isDraggingNotchHRef.current = true
    }

    if (isDraggingNotchHRef.current) {
      // Horizontal sliding across bottom edge: snappy & smooth clamp [10%, 90%]
      const vw = window.innerWidth || 1200
      const deltaPercent = (dx / vw) * 100
      const nextX = Math.min(90, Math.max(10, dragStartPercentXRef.current + deltaPercent))
      setNotchXPercent(nextX)
      setPullY(0)
    } else {
      // Pulling notch UP into the screen (exact match to side notch pull physics)
      if (dy > 0) {
        const threshold = (window.innerHeight || 800) * 0.30
        setPullY(dy)
        // 30% auto-snap threshold
        if (dy >= threshold) {
          dragStartYRef.current = 0
          dragStartXRef.current = 0
          isDraggingNotchHRef.current = false
          setIsPulling(false)
          setPullY(0)
          syncScroll(dy)
          triggerSnapToPortfolio()
        }
      } else {
        setPullY(0)
      }
    }
  }, [syncScroll, triggerSnapToPortfolio])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStartYRef.current) {
      const dy = dragStartYRef.current - e.clientY
      const threshold = (window.innerHeight || 800) * 0.30

      if (isDraggingNotchHRef.current) {
        savePosition("notch_bottom_x", notchXPercent)
      } else if (dy >= threshold) {
        syncScroll(dy)
        triggerSnapToPortfolio()
      } else if (dy > 25) {
        // Quick flick trigger
        syncScroll(dy)
        triggerSnapToPortfolio()
      }
    }
    dragStartYRef.current = 0
    dragStartXRef.current = 0
    isDraggingNotchHRef.current = false
    setIsPulling(false)
    setPullY(0)
    setTimeout(() => {
      hasDraggedNotchRef.current = false
    }, 100)
  }, [notchXPercent, syncScroll, triggerSnapToPortfolio])

  // Natural 1:1 Scroll Tracking (Zero premature blackout near header and zero forced auto-snap)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const vh = window.innerHeight || 800
      const targetY = targetYRef.current || (vh + vh * 0.3)

      // Update browser theme color once the black curtain reaches the top edge (never prematurely)
      const isBelowHero = scrollY >= vh
      if (lastIsBelowHeroRef.current !== isBelowHero) {
        lastIsBelowHeroRef.current = isBelowHero
        updateBrowserTheme(isBelowHero)
      }

      // Only hide sticky hero AFTER the opaque black portfolio curtain + notch completely cover 100% of the viewport
      const isCovered = scrollY >= vh + 48
      if (heroStickyRef.current) {
        heroStickyRef.current.style.visibility = isCovered ? "hidden" : "visible"
        heroStickyRef.current.style.pointerEvents = isCovered ? "none" : "auto"
        heroStickyRef.current.style.opacity = isCovered ? "0" : "1"
      }
      setIsHeroCovered((prev) => (prev === isCovered ? prev : isCovered))

      // Update rubber band stretch 1:1 directly in DOM via rAF
      if (scrollY <= targetY) {
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null
            const p = Math.min(1, Math.max(0, scrollY / (vh * 0.30)))
            if (Math.abs(scrollProgressRef.current - p) >= 0.005) {
              scrollProgressRef.current = p
              if (!isSnappingRef.current) {
                updateArrowGeometry(p)
              }
            }
          })
        }
      } else if (scrollProgressRef.current !== 1) {
        scrollProgressRef.current = 1
        updateArrowGeometry(1)
      }
    }

    if (lenis) {
      lenis.on("scroll", handleScroll)
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true })
    }

    handleScroll()

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll)
      } else {
        window.removeEventListener("scroll", handleScroll)
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      updateBrowserTheme(true)
    }
  }, [lenis, updateArrowGeometry])

  // Update rubber-band arrow geometry when user drags notch directly
  useEffect(() => {
    if (isSnapping) {
      updateArrowGeometry(0)
      return
    }
    const bottomThreshold = typeof window !== "undefined" ? window.innerHeight * 0.30 : 250
    const pullFactor = Math.min(1, pullY / (bottomThreshold || 250))
    const stretch = Math.max(scrollProgressRef.current, pullFactor)
    updateArrowGeometry(stretch)
  }, [isSnapping, pullY, updateArrowGeometry])

  return (
    <div className="relative w-full bg-black">
      {/* ── 1. Sticky Hero Viewport (White background) ── */}
      <div 
        ref={heroStickyRef}
        className="sticky top-0 h-screen h-[100dvh] min-h-[100dvh] w-full z-0 overflow-hidden bg-white"
        style={{
          visibility: isHeroCovered ? "hidden" : "visible",
          pointerEvents: isHeroCovered ? "none" : "auto",
          opacity: isHeroCovered ? 0 : 1,
        }}
      >
        {hero}
        {/* Right Half-Oval Pull Notch (Opens Résumé Page with right-to-left wipe) */}
        <RightResumeNotch />
      </div>

      {/* ── 2. Black Portfolio Section (NO shadow, flush seam) ── */}
      <div
        id="hero-black-curtain"
        style={{
          transform: pullY > 0 ? `translateY(${-pullY}px)` : "none",
          transition: isPulling ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10 w-full bg-black"
      >
        {/* ── Half-Oval Pull Tab connecting Hero and Black Bar (Draggable horizontally across bottom edge) ── */}
        <div
          style={{
            left: `${notchXPercent}%`,
            transform: "translateX(-50%)",
            transition: isPulling ? "none" : "left 0.2s ease-out",
          }}
          className="absolute -top-[34px] sm:-top-[38px] z-30 flex flex-col items-center pointer-events-auto"
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
              triggerSnapToPortfolio()
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStartYRef.current = 0
              dragStartXRef.current = 0
              isDraggingNotchHRef.current = false
              hasDraggedNotchRef.current = false
              setIsPulling(false)
              setPullY(0)
            }}
            className="group relative cursor-grab active:cursor-grabbing select-none focus:outline-none flex flex-col items-center touch-none"
            aria-label="Explore Portfolio"
            data-no-cursor="true"
          >
            {/* Tooltip on hover */}
            <TooltipPill position="top">
              Explore Portfolio
            </TooltipPill>

            {/* Half-oval shape SVG with seamless curved flare into black bar */}
            <div className="relative w-32 sm:w-40 h-[34px] sm:h-[38px]">
              <svg
                viewBox="0 0 160 38"
                className="w-full h-full block filter drop-shadow-[0_-3px_10px_rgba(0,0,0,0.25)]"
                preserveAspectRatio="none"
              >
                {/* Black fill matching the portfolio section */}
                <path
                  d="M 0,38 C 28,38 38,0 80,0 C 122,0 132,38 160,38 Z"
                  fill="#000000"
                />
                {/* Refined subtle upper border curve */}
                <path
                  d="M 0,38 C 28,38 38,0 80,0 C 122,0 132,38 160,38"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Seamless extension below SVG to prevent any gap when user pulls up */}
            <div className="w-full h-8 bg-black -mt-[1px]" />

            {/* Single Unified Upward Arrow with Long Tapered Tail */}
            <div className="absolute top-[16px] sm:top-[18px] inset-x-0 z-20 pointer-events-none flex justify-center">
              <motion.div
                animate={isPulling || isSnapping ? { y: 0 } : { y: [0, -2.5, 0] }}
                transition={{
                  duration: 2.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex justify-center"
              >
                <svg
                  ref={arrowSvgRef}
                  width="36"
                  height="62"
                  viewBox="0 0 36 62"
                  className="w-7 sm:w-8 h-auto text-white overflow-visible drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                  style={{
                    transitionTimingFunction: isSnapping
                      ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                      : "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <defs>
                    <linearGradient id="portfolioUpArrowTail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                      <stop offset="55%" stopColor="currentColor" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Long Tapered Tail descending smoothly from the upward arrowhead */}
                  <path
                    ref={arrowTailPathRef}
                    d="M 16.4,4 Q 16.65,29 17.25,54 L 18.75,54 Q 19.35,29 19.6,4 Z"
                    fill="url(#portfolioUpArrowTail)"
                  />

                  {/* Upward Arrowhead positioned cleanly inside the half-oval pull tab */}
                  <path
                    ref={arrowHeadPathRef}
                    d="M 10,11 L 18,3 L 26,11"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </motion.div>
            </div>
          </button>
        </div>

        {/* ── Transition Gate Section: Compact height keeping Portfolio text close to curved line ── */}
        <section
          ref={gateRef}
          data-no-cursor="true"
          className="relative w-full h-[24vh] min-h-[172px] max-h-[220px] bg-black flex flex-col items-center justify-end pt-14 sm:pt-16 pb-1 px-4 select-none overflow-hidden"
        >
          {/* ── Center: Clean "Portfolio" Typography (Exact Match to Hero Section Title Font) ── */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            <button
              type="button"
              onClick={triggerSnapToPortfolio}
              className="group cursor-pointer px-6 sm:px-10 py-1.5 sm:py-2 rounded-2xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center text-center focus:outline-none"
              title="Click to view Portfolio"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                Portfolio
              </h2>
              <span className="text-xs sm:text-sm font-normal text-zinc-400 block mt-1 tracking-normal group-hover:text-zinc-300 transition-colors">
                Selected Works & Case Studies
              </span>
            </button>
          </div>

          {/* ── Bottom Area: Compact Line Connector leading directly to the curved line section ── */}
          <div className="w-full flex flex-col items-center z-20 pb-0.5 pointer-events-none">
            <div className="w-[1.5px] h-3 sm:h-4 bg-gradient-to-b from-white/10 via-white/50 to-white/90" />
          </div>
        </section>

        {/* ── 3. Portfolio Sections (Curved Loop, Flowing Menu, Case Studies, etc.) ── */}
        <div ref={portfolioRef} id="portfolio-section" className="relative w-full bg-black">
          {children}
        </div>
      </div>
    </div>
  )
}
