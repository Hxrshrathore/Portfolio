"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Orb from "./orb"
import CircularText from "./ui/circular-text"
import ContactModal from "./contact-modal"

export default function OrbSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient - Removed for solid black background */}

      {/* Background is solid black */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 py-20">
        {/* Left Column: Big Title */}
        <div className="w-full md:w-1/2 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none flex items-baseline gap-3 sm:gap-4 uppercase select-none cursor-default">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">LET&apos;S</span>
              <span className="font-light text-zinc-400 transition-colors duration-300 hover:text-zinc-300">TALK</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <p className="text-zinc-400 text-base md:text-lg font-light tracking-wide">
              Have a project in mind?
            </p>
          </motion.div>
        </div>

        {/* Right Column: The Contact Orb */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", damping: 20 }}
            viewport={{ once: true }}
            className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px]"
          >
            {/* Unified Contact Trigger Container */}
            <div
              onClick={() => setIsContactModalOpen(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none group p-0 m-0 bg-transparent select-none cursor-default"
              aria-label="Open contact form"
            >
              {/* Main Orb Trigger */}
              <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110 z-20 flex items-center justify-center">
                <Orb />
                {/* Invisible surrounding circle acting as the anchor for BlendedCursor fill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsContactModalOpen(true)
                  }}
                  className="absolute inset-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-transparent bg-transparent flex items-center justify-center z-30 cursor-pointer focus:outline-none transition-transform duration-300 group-hover:scale-110"
                  aria-label="Contact Harsh"
                >
                  <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
                </button>
              </div>

              {/* Rotating "CONTACT ME" Circular Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                <CircularText
                  text="LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * "
                  spinDuration={25}
                  onHover="slowDown"
                  className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  )
}
