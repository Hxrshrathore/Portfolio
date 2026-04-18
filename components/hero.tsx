"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import LiquidChrome from "@/components/liquid-chrome"
import BlurText from "@/components/ui/blur-text"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAnimationComplete = () => {
    console.log("Hero title animation completed!")
  }

  if (!mounted) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 w-full h-full">
        <LiquidChrome
          baseColor={[0.015, 0.015, 0.015]}
          speed={0.16}
          amplitude={0.17}
          frequencyX={2.5}
          frequencyY={1.5}
          interactive={false}
        />
        {/* Bottom Blend Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* New Background Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white text-sm font-medium">
              Web <span className="italic font-light">Designer</span>
            </span>
          </div>
        </div>

        {/* Main Heading with BlurText Effect */}
        <BlurText
          text="Think different. Build extraordinary."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="mb-12 text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl"
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/projects")}
            className="bg-white text-black hover:bg-gray-100 rounded-full px-10 py-4 text-lg font-medium transition-all hover:scale-105"
          >
            View My Work
          </Button>
        </div>
      </div>

      {/* Demo Content Toggle */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="flex items-center space-x-3"></div>
      </div>
    </div>
  )
}
