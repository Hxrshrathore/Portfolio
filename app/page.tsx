"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import CurvedLoopSection from "@/components/curved-loop-section"
import FlowingMenuSection from "@/components/flowing-menu-section"
import InfiniteMenuSection from "@/components/infinite-menu-section"
import WorldMapSection from "@/components/world-map-section"
import MagicBentoSection from "@/components/magic-bento-section"
import OrbSection from "@/components/orb-section"
import TrustedBySection from "@/components/trusted-by-section"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <CurvedLoopSection />
      <FlowingMenuSection />
      <MagicBentoSection />
      <InfiniteMenuSection />
      <WorldMapSection />
      <TrustedBySection />
      <OrbSection />
    </main>
  )
}
