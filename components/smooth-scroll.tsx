"use client"

import type React from "react"
import { useEffect, useState, createContext, useContext } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollContextType {
  lenis: Lenis | null
  setWeight: (weight: number) => void
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  setWeight: () => {},
})

// Custom hook allowing any component to get the Lenis instance and alter global scroll weight
export const useScroll = () => useContext(ScrollContext)

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    
    // Initialize Lenis natively. 
    // Higher duration = heavier/floaty feel. Lower = snappier/faster.
    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.0, // Match natural finger swipe velocity on mobile/touch
    })

    setLenisInstance(lenis)
    
    // Sync Lenis scroll events to GSAP ScrollTrigger to keep pinned headers & animations working
    lenis.on('scroll', ScrollTrigger.update)

    // Assign the callback to a stable reference so it can be cleanly removed on unmount
    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    // Add Lenis's requestAnimationFrame directly into GSAP's global ticker master loop
    gsap.ticker.add(update)

    // Smooth out lag spikes rather than hard-jumping (500ms threshold, 33ms max step)
    gsap.ticker.lagSmoothing(500, 33)

    return () => {
      // Must pass the exact same function reference to remove it!
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  const setWeight = (weight: number) => {
    if (lenisInstance) {
      // Dynamic alteration of scroll weight/duration for different components/pages
      lenisInstance.options.duration = weight
    }
  }

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance, setWeight }}>
      {/* Lenis doesn't need wrapping structure divs like GSAP ScrollSmoother does. */}
      {children}
    </ScrollContext.Provider>
  )
}
