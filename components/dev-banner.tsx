"use client"

import { motion } from "framer-motion"
import { Construction } from "lucide-react"

export default function DevBanner() {
  const scrollingText = "Development in process! A Creative developers Portfolio Never completes! "

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/10 h-8 overflow-hidden flex items-center">
      <motion.div
        animate={{ x: [0, -1500] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap flex items-center"
      >
        <div className="flex items-center gap-4 px-4 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>{scrollingText}</span>
              <img 
                src="https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/1f62d.png" 
                alt="Loudly Crying Face"
                className="w-4 h-4 md:w-5 md:h-5 inline-block"
              />
              <span className="mx-4 text-white/20">//</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
