"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import LiquidChrome from "@/components/liquid-chrome"
import { usePageTransition } from "@/components/page-transition"

export default function Hero() {
  const { navigateTo } = usePageTransition()

  return (
    <div className="relative h-[100svh] md:h-[95vh] w-full overflow-hidden bg-black">
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
        {/* Background Badge */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white text-xs md:text-sm font-medium">
              Web <span className="italic font-light">Designer</span>
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-6 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent max-w-5xl tracking-tight"
        >
          I'm Harsh
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl px-4"
        >
          Ready to dive in?
          <br />
          Where Design & Code meets.
        </motion.p>

        {/* Button */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigateTo("/projects")}
            className="bg-white text-black hover:bg-gray-100 rounded-full px-8 md:px-12 py-5 md:py-6 text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Explore Projects
          </Button>
        </div>
      </div>
    </div>
  )
}
