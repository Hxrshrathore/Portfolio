"use client"

import { useState } from "react"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight } from "lucide-react"

const portfolioItems = [
  {
    image: "https://picsum.photos/600/600?random=1",
    link: "https://github.com",
    title: "Code Poetry",
    description: "Where elegant algorithms meet beautiful interfaces",
  },
  {
    image: "https://picsum.photos/600/600?random=2",
    link: "https://dribbble.com",
    title: "Visual Harmony",
    description: "Crafting experiences that feel effortlessly intuitive",
  },
  {
    image: "https://picsum.photos/600/600?random=3",
    link: "https://behance.net",
    title: "User Delight",
    description: "Designing moments that users never forget",
  },
  {
    image: "https://picsum.photos/600/600?random=4",
    link: "https://linkedin.com",
    title: "Speed of Light",
    description: "Performance so fast, it feels like magic",
  },
  {
    image: "https://picsum.photos/600/600?random=5",
    link: "https://twitter.com",
    title: "Full Spectrum",
    description: "End-to-end solutions that just work",
  },
  {
    image: "https://picsum.photos/600/600?random=6",
    link: "https://instagram.com",
    title: "Tomorrow's Web",
    description: "Building the future, one line of code at a time",
  },
]

export default function InfiniteMenuSection() {
  const [canNavigate, setCanNavigate] = useState(true)

  const handleNavigate = (direction: "prev" | "next") => {
    if (!canNavigate) return

    setCanNavigate(false)
    if ((window as any).__infiniteMenuNavigate) {
      ;(window as any).__infiniteMenuNavigate(direction)
    }

    // Re-enable navigation after animation
    setTimeout(() => setCanNavigate(true), 600)
  }

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Header */}
      <div className="text-center py-12 sm:py-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Explore My Universe
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Navigate through a constellation of creativity. Each project tells a story of innovation and craftsmanship.
        </p>
        {/* Instructions */}
        <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
          <span className="hidden md:inline">Drag to explore • Click to discover • Experience the extraordinary</span>
          <span className="md:hidden">Swipe or use arrows • Tap to discover • Experience the extraordinary</span>
        </p>
      </div>

      {/* Infinite Menu */}
      <div className="h-[600px] sm:h-[700px] md:h-[800px] relative">
        <InfiniteMenu items={portfolioItems} onNavigate={handleNavigate} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 md:hidden z-20">
          <button
            onClick={() => handleNavigate("prev")}
            disabled={!canNavigate}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                     flex items-center justify-center text-white hover:bg-white/20 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={() => handleNavigate("next")}
            disabled={!canNavigate}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                     flex items-center justify-center text-white hover:bg-white/20 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>
    </section>
  )
}
