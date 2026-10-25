import Hero from "@/components/hero"
import FeaturedCaseStudies from "@/components/featured-case-studies"
import TrustedBySection from "@/components/trusted-by-section"
import {
  CurvedLoopClient,
  FlowingMenuClient,
  InfiniteMenuClient,
  MagicBentoClient,
  WorldMapClient,
  OrbClient,
} from "@/components/home-client-sections"

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      {/* 1. Hero: Semantic H1, FDE & Applied AI copy, verified CTAs */}
      <Hero />

      {/* 2. Curved Loop: Multilingual craft banner */}
      <CurvedLoopClient />

      {/* 3. Engineering Capabilities: Full-stack, AI, APIs, interfaces */}
      <FlowingMenuClient />

      {/* 4. Featured Case Studies: 4 verified, evidence-backed projects (Server-rendered HTML) */}
      <FeaturedCaseStudies />

      {/* 5. Interactive Project Archive: 3D Infinite Menu with distinct project links */}
      <InfiniteMenuClient />

      {/* 6. Engineering Approach: Magic Bento architecture, reliability & trade-offs */}
      <MagicBentoClient />

      {/* 7. Remote Collaboration: India timezone (UTC+5:30) and global sync windows */}
      <WorldMapClient />

      {/* 8. Selected Collaborations: Verified institutional and client partners (Server-rendered HTML) */}
      <TrustedBySection />

      {/* 9. Contact Conversion: Interactive Orb & modal inquiry pathway */}
      <OrbClient />
    </main>
  )
}
