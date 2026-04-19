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
    // Initialize Lenis natively. 
    // Higher duration = heavier/floaty feel. Lower = snappier/faster.
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenisInstance(lenis)
    
    // Sync Lenis scroll events to GSAP ScrollTrigger to keep pinned headers & animations working
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame directly into GSAP's global ticker master loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable lag smoothing in GSAP to prevent any jitter between ScrollTrigger & Lenis
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
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
