"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import LiquidChrome from "@/components/liquid-chrome"
import { usePageTransition } from "@/components/page-transition"
import { usePreloaderStore } from "@/lib/store/use-preloader-store"

export default function Hero() {
  const { navigateTo } = usePageTransition()
  const isDone = usePreloaderStore((state) => state.isDone)

  const name = "I'm Harsh"
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

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
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isDone ? "visible" : "hidden"}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 md:pt-24 text-center"
      >
        {/* Background Badge */}
        <motion.div variants={childVariants} className="mb-6 md:mb-8">
          <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <span className="text-white text-xs md:text-sm font-medium tracking-[0.1em] uppercase">
              <span className="italic font-light">Creative</span> Developer
            </span>
          </div>
        </motion.div>

        {/* Main Heading with staggered characters */}
        <div className="mb-4 md:mb-6 flex flex-wrap justify-center overflow-hidden">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent tracking-tighter inline-block"
              style={{ minWidth: char === " " ? "0.3em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Paragraph */}
        <motion.p
          variants={childVariants}
          className="text-base sm:text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-2xl px-4 font-light tracking-wide italic"
        >
          Building high-end digital experiences.
          <br />
          <span className="text-white/60">Where Design & Code meets.</span>
        </motion.p>

        {/* Button */}
        <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigateTo("/projects")}
            className="group relative overflow-hidden bg-white text-black hover:bg-white rounded-full px-10 md:px-14 py-6 md:py-8 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <span className="relative z-10">Explore Projects</span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
