"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { TooltipPill } from "@/components/ui/tooltip"
import { getSavedPosition, savePosition } from "@/lib/cookies"

export default function RightResumeNotch() {
  const router = useRouter()

  // ── Notch vertical position along right edge (15% to 85%, default 50%) ──
  const [notchYPercent, setNotchYPercent] = useState(50)
  const isDraggingNotchVRef = useRef(false)
  const dragStartYClientRef = useRef(0)
  const dragStartPercentYRef = useRef(50)
  const hasDraggedNotchRef = useRef(false)

  // ── Pull left state (horizontal distance pulled from right edge) ──
  const [isPulling, setIsPulling] = useState(false)
  const [pullX, setPullX] = useState(0)
  const dragStartXClientRef = useRef(0)
  const [isWiping, setIsWiping] = useState(false)
  const [isRevealingFromResume, setIsRevealingFromResume] = useState(false)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  // Restore saved vertical position from cookie
  useEffect(() => {
    const saved = getSavedPosition("notch_right_y", 50)
    setNotchYPercent(saved)
  }, [])

  // Detect arrival back from Resume page (reveal white curtain off to the right)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const from = sessionStorage.getItem("h-transition")
      if (from === "from-resume") {
        sessionStorage.removeItem("h-transition")
        setIsRevealingFromResume(true)
      }
    }
  }, [])

  // Snap forward to Resume page (smooth right-to-left transition)
  const triggerTransitionToResume = useCallback(() => {
    if (isWiping) return
    setIsWiping(true)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("h-transition", "from-right")
    }
  }, [isWiping])

  // Handle external trigger (e.g. from Hero Résumé button)
  const handleTriggerPull = useCallback(() => {
    if (isWiping) return
    setIsPulling(false)
    const pullDistance = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.35, 340) : 260
    setPullX(pullDistance)
    setTimeout(() => {
      triggerTransitionToResume()
    }, 280)
  }, [isWiping, triggerTransitionToResume])

  useEffect(() => {
    window.addEventListener("trigger-resume-pull", handleTriggerPull)
    return () => window.removeEventListener("trigger-resume-pull", handleTriggerPull)
  }, [handleTriggerPull])

  // ── Pointer Handlers on Right Notch (2D drag: vertical slider + horizontal pull) ──
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragStartXClientRef.current = e.clientX
      dragStartYClientRef.current = e.clientY
      dragStartPercentYRef.current = notchYPercent
      isDraggingNotchVRef.current = false
      hasDraggedNotchRef.current = false
      setIsPulling(true)
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
      const dx = dragStartXClientRef.current - e.clientX // positive when pulling LEFT
      const dy = e.clientY - dragStartYClientRef.current // vertical movement

      if (Math.hypot(dx, dy) > 6) {
        hasDraggedNotchRef.current = true
      }

      // Detect if user is sliding notch vertically up/down along the edge
      if (Math.abs(dy) > Math.abs(dx) * 1.2 && !isDraggingNotchVRef.current && dx < 20) {
        isDraggingNotchVRef.current = true
      }

      if (isDraggingNotchVRef.current) {
        // Sliding notch vertically along right edge: snappy and smooth clamp [15%, 85%]
        const vh = window.innerHeight || 800
        const deltaPercent = (dy / vh) * 100
        const nextY = Math.min(85, Math.max(15, dragStartPercentYRef.current + deltaPercent))
        setNotchYPercent(nextY)
        setPullX(0)
      } else {
        // Pulling notch left into the screen
        if (dx > 0) {
          const threshold = window.innerWidth * 0.30
          setPullX(dx)
          // 30% auto-snap threshold
          if (dx >= threshold) {
            dragStartXClientRef.current = 0
            setIsPulling(false)
            setPullX(window.innerWidth)
            triggerTransitionToResume()
          }
        } else {
          setPullX(0)
        }
      }
    },
    [triggerTransitionToResume]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartXClientRef.current) {
        const dx = dragStartXClientRef.current - e.clientX
        const threshold = window.innerWidth * 0.30

        if (isDraggingNotchVRef.current) {
          savePosition("notch_right_y", notchYPercent)
        } else if (dx >= threshold) {
          triggerTransitionToResume()
        } else if (dx > 25) {
          // Quick flick trigger
          triggerTransitionToResume()
        }
      }
      dragStartXClientRef.current = 0
      isDraggingNotchVRef.current = false
      setIsPulling(false)
      setPullX(0)
      setTimeout(() => {
        hasDraggedNotchRef.current = false
      }, 100)
    },
    [notchYPercent, triggerTransitionToResume]
  )

  // ── Auto-switch to Resume on right-to-left scroll on Hero section ──
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      // Only active on the Hero section (scrollY === 0)
      if (scrollY > 15) return
      if (isWiping) return

      // deltaX > 8 indicates horizontal scroll from right to left (swiping left on trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.deltaX > 8) {
        const threshold = window.innerWidth * 0.30
        setPullX((prev) => {
          const next = Math.min(window.innerWidth, prev + e.deltaX * 1.3)
          if (next >= threshold) {
            triggerTransitionToResume()
            return window.innerWidth
          }
          return next
        })

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
        wheelTimeoutRef.current = setTimeout(() => {
          setPullX((curr) => {
            const threshold = window.innerWidth * 0.30
            if (curr >= threshold) {
              triggerTransitionToResume()
              return window.innerWidth
            }
            return 0 // spring back smoothly!
          })
        }, 140)
      }
    }

    // Touch swipe horizontal detection on Hero
    const handleTouchStart = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 15) return
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 15) return
      if (isWiping) return

      const dx = touchStartXRef.current - e.touches[0].clientX
      const dy = touchStartYRef.current - e.touches[0].clientY

      // Horizontal swipe to the left
      if (dx > 10 && Math.abs(dx) > Math.abs(dy)) {
        const threshold = window.innerWidth * 0.30
        setPullX(dx)
        if (dx >= threshold) {
          triggerTransitionToResume()
        }
      }
    }

    const handleTouchEnd = () => {
      if (touchStartXRef.current === null) return
      const threshold = window.innerWidth * 0.30
      setPullX((curr) => {
        if (curr >= threshold) {
          triggerTransitionToResume()
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
  }, [isWiping, triggerTransitionToResume])

  // Rubber band stretch factor (0 to 1) for the right resume bar
  const threshold = typeof window !== "undefined" ? window.innerWidth * 0.30 : 400
  const stretchFactor = Math.min(1, pullX / (threshold || 400))
  const arrowStemWidth = Math.round(20 + stretchFactor * 36)

  return (
    <>
      {/* ── Sliding Black Résumé Pull Bar (Opens from right edge when pulled or scrolled) ── */}
      <div
        style={{
          width: Math.max(0, pullX),
          transition: isPulling ? "none" : "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="fixed top-0 right-0 h-screen bg-black z-30 overflow-hidden flex items-center justify-center border-l border-white/10 pointer-events-none select-none shadow-[-8px_0_30px_rgba(0,0,0,0.7)]"
      >
        <div className="flex flex-col items-center justify-center text-center px-6 min-w-[280px]">
          {/* Stretchy rubber band arrow pointing left */}
          <div className="flex items-center justify-center mb-6">
            <svg
              width={arrowStemWidth + 14}
              height="36"
              viewBox={`0 0 ${arrowStemWidth + 14} 36`}
              className="h-7 w-auto text-white transition-all duration-150 ease-out"
            >
              {/* Right anchor circle */}
              <circle cx={arrowStemWidth + 8} cy="18" r="3" fill="currentColor" />
              {/* Elastic stem */}
              <line
                x1={12}
                y1="18"
                x2={arrowStemWidth + 8}
                y2="18"
                stroke="currentColor"
                strokeWidth={Math.max(1, 3 - stretchFactor * 1.8)}
                strokeLinecap="round"
              />
              {/* Arrowhead pointing left */}
              <path
                d="M 12 10 L 4 18 L 12 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Clean "Résumé" Typography (Mirroring bottom Portfolio gate) */}
          <button
            type="button"
            onClick={triggerTransitionToResume}
            className="group cursor-pointer px-6 sm:px-10 py-2 rounded-2xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center text-center focus:outline-none pointer-events-auto"
            title="Click to view Résumé"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white group-hover:text-zinc-200 transition-colors whitespace-nowrap">
              Résumé
            </h2>
            <span className="text-xs sm:text-sm font-normal text-zinc-400 block mt-1 tracking-normal group-hover:text-zinc-300 transition-colors whitespace-nowrap">
              Selected Works & Experience
            </span>
          </button>
        </div>
      </div>

      {/* ── Right Half-Oval Pull Notch (Draggable Top-to-Bottom along Right Edge) ── */}
      <div
        style={{
          top: `${notchYPercent}%`,
          transform: `translateY(-50%) translateX(${-pullX}px)`,
          transition: isPulling ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.2s ease-out",
        }}
        className="absolute right-0 z-40 flex items-center select-none pointer-events-auto"
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
            triggerTransitionToResume()
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartXClientRef.current = 0
            isDraggingNotchVRef.current = false
            hasDraggedNotchRef.current = false
            setIsPulling(false)
            setPullX(0)
          }}
          className="group relative cursor-grab active:cursor-grabbing select-none focus:outline-none flex items-center touch-none"
          aria-label="View Résumé"
          data-no-cursor="true"
        >
          {/* Tooltip on hover (appears to the left of the tab) */}
          <TooltipPill position="left">
            View Résumé
          </TooltipPill>

          {/* Half-oval shape SVG flaring inward from the right screen edge */}
          <div className="relative w-[34px] sm:w-[38px] h-28 sm:h-36">
            <svg
              viewBox="0 0 38 140"
              className="w-full h-full block filter drop-shadow-[-3px_0_10px_rgba(0,0,0,0.3)]"
              preserveAspectRatio="none"
            >
              {/* Solid black fill */}
              <path
                d="M 38,0 C 38,28 0,38 0,70 C 0,102 38,112 38,140 Z"
                fill="#000000"
              />
              {/* Crisp top/contour border curve */}
              <path
                d="M 38,0 C 38,28 0,38 0,70 C 0,102 38,112 38,140"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Bouncing arrow slowly pointing left (inward towards the swipe direction) */}
            <div className="absolute inset-0 flex items-center justify-center pl-1 pointer-events-none">
              <motion.div
                animate={{ x: [0, -4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ArrowLeft
                  className="w-4 h-4 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white"
                  strokeWidth={2.4}
                />
              </motion.div>
            </div>
          </div>

          {/* Seamless extension to the right off-screen to prevent any gap when pulled */}
          <div className="w-8 h-full bg-black -mr-8" />
        </button>
      </div>

      {/* ── Fullscreen Right-to-Left Wipe Curtain to Resume (BLACK) ── */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              window.scrollTo(0, 0)
              router.push("/resume")
            }}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Entrance Reveal Curtain from Resume (WHITE curtain wipes off to the right) ── */}
      <AnimatePresence>
        {isRevealingFromResume && (
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setIsRevealingFromResume(false)}
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  )
}
