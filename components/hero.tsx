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
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
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
            className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 bg-transparent rounded-full px-8 py-3 text-lg font-medium"
          >
            Let's Connect
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
