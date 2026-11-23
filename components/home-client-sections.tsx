"use client"

import React, { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

interface ProximityWrapperProps {
  children: React.ReactNode
  fallback: React.ReactNode
  rootMargin?: string
  className?: string
}

function ProximityWrapper({
  children,
  fallback,
  rootMargin = "800px 0px",
  className = "w-full",
}: ProximityWrapperProps) {
  const [shouldMount, setShouldMount] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldMount(true)
      return
    }

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Build and warm the section in background on idle thread before user arrives
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => setShouldMount(true), { timeout: 1200 })
          } else {
            setTimeout(() => setShouldMount(true), 40)
          }
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? children : fallback}
    </div>
  )
}

// ── 1. Near-fold sections (mounted immediately on page entry) ──
export const CurvedLoopClient = dynamic(() => import("@/components/curved-loop-section"), {
  ssr: false,
  loading: () => <div className="h-32 w-full bg-black" />
})

export const FlowingMenuClient = dynamic(() => import("@/components/flowing-menu-section"), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-black" />
})

// ── 2. Mid-fold sections (staged in background when scrolling within 800px) ──
const DynamicInfiniteMenu = dynamic(() => import("@/components/infinite-menu-section"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] md:h-screen w-full bg-black" />
})

export const InfiniteMenuClient = () => (
  <ProximityWrapper
    rootMargin="800px 0px"
    className="w-full min-h-[600px] md:h-screen"
    fallback={<div className="min-h-[600px] md:h-screen w-full bg-black" />}
  >
    <DynamicInfiniteMenu />
  </ProximityWrapper>
)

const DynamicMagicBento = dynamic(() => import("@/components/magic-bento-section"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] md:h-screen w-full bg-black" />
})

export const MagicBentoClient = () => (
  <ProximityWrapper
    rootMargin="800px 0px"
    className="w-full min-h-[500px] md:h-screen"
    fallback={<div className="min-h-[500px] md:h-screen w-full bg-black" />}
  >
    <DynamicMagicBento />
  </ProximityWrapper>
)

const DynamicWorldMap = dynamic(() => import("@/components/world-map-section"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] md:h-screen w-full bg-black" />
})

export const WorldMapClient = () => (
  <ProximityWrapper
    rootMargin="800px 0px"
    className="w-full min-h-[600px] md:h-screen"
    fallback={<div className="min-h-[600px] md:h-screen w-full bg-black" />}
  >
    <DynamicWorldMap />
  </ProximityWrapper>
)

// ── 3. Far-fold sections (staged in background when scrolling within 1000px) ──
const DynamicTestimonialGlobe = dynamic(() => import("@/components/testimonial-globe-section"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] md:h-screen w-full bg-black" />
})

export const TestimonialGlobeClient = () => (
  <ProximityWrapper
    rootMargin="1000px 0px"
    className="w-full min-h-[500px] md:h-screen"
    fallback={<div className="min-h-[500px] md:h-screen w-full bg-black" />}
  >
    <DynamicTestimonialGlobe />
  </ProximityWrapper>
)

const DynamicDualWheel = dynamic(() => import("@/components/dual-wheel-section"), {
  ssr: false,
  loading: () => <div className="h-[260vh] w-full bg-black" />
})

export const DualWheelSectionClient = () => (
  <ProximityWrapper
    rootMargin="1000px 0px"
    className="w-full h-[260vh]"
    fallback={<div className="h-[260vh] w-full bg-black" />}
  >
    <DynamicDualWheel />
  </ProximityWrapper>
)

const DynamicOrb = dynamic(() => import("@/components/orb-section"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] md:min-h-screen w-full bg-black" />
})

export const OrbClient = () => (
  <ProximityWrapper
    rootMargin="1000px 0px"
    className="w-full min-h-[500px] md:min-h-screen"
    fallback={<div className="min-h-[500px] md:min-h-screen w-full bg-black" />}
  >
    <DynamicOrb />
  </ProximityWrapper>
)
