"use client"

import type React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { useGSAP } from "@gsap/react"

// No need to manually register ScrollSmoother if using latest gsap, 
// but it's safe to do so.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useGSAP(() => {
    /**
     * [SMOOTH_SCROLL_SENSITIVITY]
     * Tuning the 'glide' feel.
     * Scale: 1 (Native-like) to 5 (Very floaty/heavy)
     * Current Setting: 3 (Balanced)
     * 
     * Mathematical Note: 'smooth' represents the time (in seconds) it takes 
     * for the visual position to catch up to the actual scroll position.
     * Higher = smoother but more 'lag'.
     */
    const smoothValue = 0.8 // Lower value = faster response, less perceived "lag".

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: smoothValue,
      effects: true,
      normalizeScroll: false, // Disabling this often fixes choppiness/jitter.
      smoothTouch: 0.1, // Smoothness on touch devices.
      ignoreMobileResize: true,
    })

    // PERFORMANCE: Disable lagSmoothing to prevent GSAP from "jumping" to catch up.
    gsap.ticker.lagSmoothing(0)
  }, [])

  return (
    <div id="smooth-wrapper" className="overflow-hidden w-full h-full">
      <div 
        id="smooth-content" 
        className="relative w-full overflow-hidden flex flex-col"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  )
}
