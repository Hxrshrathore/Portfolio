"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Orb from "./orb"
import CircularText from "./ui/circular-text"
import Link from "next/link"
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
            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              LET&apos;S <br />
              <span className="text-white/20">TALK</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col space-y-2"
          >
            <p className="text-white/40 text-lg md:text-xl font-medium tracking-wide">
              HAVE A PROJECT IN MIND?
            </p>
            <div className="h-px w-24 bg-white/20" />
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
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus:outline-none group p-0 m-0 border-none bg-transparent"
              aria-label="Open contact form"
            >
              {/* Main Orb Trigger */}
              <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110 z-20 flex items-center justify-center">
                <Orb />
              </div>

              {/* Rotating "CONTACT ME" Circular Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                <CircularText
                  text="LET'S CONNECT • LET'S CONNECT • LET'S CONNECT • LET'S CONNECT • LET'S CONNECT • "
                  spinDuration={25}
                  onHover="slowDown"
                  className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]"
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  )
}
