import Hero from "@/components/hero"
import FeaturedCaseStudies from "@/components/featured-case-studies"
import TrustedBySection from "@/components/trusted-by-section"
import BorderedClientsGrid from "@/components/ruixen/bordered-clients-grid"
import {
  CurvedLoopClient,
  FlowingMenuClient,
  InfiniteMenuClient,
  // MagicBentoClient,
  // WorldMapClient,
  TestimonialGlobeClient,
  DualWheelSectionClient,
  OrbClient,
} from "@/components/home-client-sections"
import HeroPortfolioTransition from "@/components/hero-portfolio-transition"

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-clip relative">
      <HeroPortfolioTransition hero={<Hero />}>
        {/* 2. Curved Loop: Multilingual craft banner */}
        <CurvedLoopClient />

        {/* 3. Engineering Capabilities: Full-stack, AI, APIs, interfaces */}
        <FlowingMenuClient />

        {/* 4. Featured Case Studies: 4 verified, evidence-backed projects (Server-rendered HTML) */}
        <FeaturedCaseStudies />

        {/* 5. Interactive Project Archive: 3D Infinite Menu with distinct project links */}
        <InfiniteMenuClient />

        {/* 6. Engineering Approach: Magic Bento architecture, reliability & trade-offs (Hidden) */}
        {/* <MagicBentoClient /> */}

        {/* 7. Remote Collaboration: India timezone (UTC+5:30) and global sync windows (Hidden) */}
        {/* <WorldMapClient /> */}

        {/* 7b. Interactive 3D Collaboration Globe: Regional collaboration hubs & reviews */}
        <TestimonialGlobeClient />

        {/* 8. Selected Collaborations: Verified institutional and client partners (Server-rendered HTML) */}
        <TrustedBySection />

        {/* 8b. Bordered Clients Grid: 5-column wordmark grid with subtle dividers & corner cross markers */}
        <BorderedClientsGrid className="border-t border-white/5" />

        {/* 9. Direct Channels: Twin OptionWheel interface (GitHub, Email, LinkedIn, etc.) */}
        <DualWheelSectionClient />

        {/* 10. Contact Conversion: Interactive Orb & modal inquiry pathway */}
        <OrbClient />
      </HeroPortfolioTransition>
    </main>
  )
}
