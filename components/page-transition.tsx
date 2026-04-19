"use client"

import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { gsap } from "gsap"

// ── Context ──
interface TransitionContextValue {
  navigateTo: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  isTransitioning: false,
})

export const usePageTransition = () => useContext(TransitionContext)

// ── Provider ──
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const curtainRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Pending navigation target — used to detect when the route has actually changed
  const pendingHref = useRef<string | null>(null)
  const revealTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // ── When pathname changes, reveal the new page ──
  useEffect(() => {
    if (!pendingHref.current) return
    // Only proceed if we've actually arrived at (or near) the target route
    const target = pendingHref.current.split("?")[0] // strip query params
    if (pathname !== target) return

    pendingHref.current = null
    const curtain = curtainRef.current
    if (!curtain) {
      setIsTransitioning(false)
      return
    }

    // Small buffer for React to paint the new page
    const reveal = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    })

    reveal
      .to({}, { duration: 0.08 }) // tiny paint buffer
      .to(curtain, {
        yPercent: -100,
        duration: 0.55,
        ease: "power3.inOut",
      })
      .set(curtain, { display: "none" })

    revealTimelineRef.current = reveal
  }, [pathname])

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning) return
      if (typeof window !== "undefined" && window.location.pathname === href) return

      const curtain = curtainRef.current
      if (!curtain) {
        router.push(href)
        return
      }

      setIsTransitioning(true)

      // 1. Prefetch the target route so it's cached and instant
      router.prefetch(href)

      // 2. Store the target so the pathname effect can detect arrival
      pendingHref.current = href

      // 3. Phase 1: Cover old page with curtain
      const tl = gsap.timeline()

      tl.set(curtain, {
        display: "block",
        yPercent: 100,
      })
        .to(curtain, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.inOut",
        })
        // 4. Navigate while fully covered — the pathname useEffect handles the reveal
        .call(() => {
          window.scrollTo(0, 0)
          router.push(href)
        })
    },
    [router, isTransitioning]
  )

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}

      {/* ── The Curtain ── */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9998] pointer-events-none bg-black"
        style={{ display: "none", willChange: "transform" }}
      />
    </TransitionContext.Provider>
  )
}
