"use client"

import dynamic from "next/dynamic"

export const CurvedLoopClient = dynamic(() => import("@/components/curved-loop-section"), {
  ssr: false,
  loading: () => <div className="h-32 w-full bg-black" />
})

export const FlowingMenuClient = dynamic(() => import("@/components/flowing-menu-section"), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-black" />
})

export const InfiniteMenuClient = dynamic(() => import("@/components/infinite-menu-section"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] w-full bg-black" />
})

export const MagicBentoClient = dynamic(() => import("@/components/magic-bento-section"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] w-full bg-black" />
})

export const WorldMapClient = dynamic(() => import("@/components/world-map-section"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] w-full bg-black" />
})

export const OrbClient = dynamic(() => import("@/components/orb-section"), {
  ssr: false,
  loading: () => <div className="min-h-[500px] w-full bg-black" />
})
