"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import LiquidChrome from "@/components/liquid-chrome"

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

        {/* Main Heading scaled and styled as per /work hero */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent max-w-5xl tracking-tight"
        >
          I'm Harsh
        </motion.h1>

        {/* Paragraph styled as per /work hero */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl px-4"
        >
          Ready to dive in?
          <br />
          Where Design & Code meets.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/projects")}
            className="bg-white text-black hover:bg-gray-100 rounded-full px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Explore Projects
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
