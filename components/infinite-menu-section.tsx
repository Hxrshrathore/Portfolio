"use client"

import { useState } from "react"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight } from "lucide-react"

const portfolioItems = [
  {
    image: "/logo/kiitmun.png",
    link: "https://github.com",
    title: "KIIT MUN",
    description: "Where elegant algorithms meet beautiful interfaces",
  },
  {
    image: "/rip/frame1.png",
    link: "https://dribbble.com",
    title: "Chimera 6.0",
    description: "Crafting experiences that feel effortlessly intuitive",
  },
  {
    image: "/rip/frame2.png",
    link: "https://behance.net",
    title: "Acsent Coaching Center",
    description: "Designing moments that users never forget",
  },
  {
    image: "/rip/frame3.png",
    link: "https://linkedin.com",
    title: "Bikash Vidalya",
    description: "Performance so fast, it feels like magic",
  },
  {
    image: "/rip/frame4.png",
    link: "https://twitter.com",
    title: "Indura School",
    description: "End-to-end solutions that just work",
  },
  {
    image: "/rip/frame5.png",
    link: "https://instagram.com",
    title: "Hemsida",
    description: "Building the future, one line of code at a time",
  },
  {
    image: "/rip/frame6.png",
    link: "https://behance.net",
    title: "KIIT MUN",
    description: "Designing moments that users never forget",
  },
  {
    image: "/rip/frame7.png",
    link: "https://behance.net",
    title: "DMC School",
    description: "Designing moments that users never forget",
  },
  {
    image: "/rip/frame8.png",
    link: "https://behance.net",
    title: "Pandav Studio",
    description: "Designing moments that users never forget",
  },
  {
    image: "/rip/frame9.png",
    link: "https://behance.net",
    title: "Sunshine School",
    description: "Designing moments that users never forget",
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
