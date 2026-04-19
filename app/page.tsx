"use client"

import dynamic from "next/dynamic"

// Code splitting: Automatically breaks down the giant >1MB Javascript chunk into tiny manageable pieces.
// ssr: false prevents "window is not defined" server crashing since these are heavily WebGL/DOM based.

const Hero = dynamic(() => import("@/components/hero"), { 
  ssr: false,
})

// Below-the-fold sections are lazy-loaded. Client only evaluates their JS when necessary.
const CurvedLoopSection = dynamic(() => import("@/components/curved-loop-section"), { ssr: false })
const FlowingMenuSection = dynamic(() => import("@/components/flowing-menu-section"), { ssr: false })
const MagicBentoSection = dynamic(() => import("@/components/magic-bento-section"), { ssr: false })
const InfiniteMenuSection = dynamic(() => import("@/components/infinite-menu-section"), { ssr: false })
const WorldMapSection = dynamic(() => import("@/components/world-map-section"), { ssr: false })
const TrustedBySection = dynamic(() => import("@/components/trusted-by-section"), { ssr: false })
const OrbSection = dynamic(() => import("@/components/orb-section"), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
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
