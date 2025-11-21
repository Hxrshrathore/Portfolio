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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-[400px] h-[400px] mb-8"
        >
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-full transition-all hover:scale-105"
            aria-label="Open contact form"
          >
            <Orb />
          </button>

          {/* Circular Text Navigation - larger radius, on top of orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <Link href="/projects">
              <CircularText
                text="EXPLORE*WORK*DISCOVER*MAGIC*"
                spinDuration={20}
                onHover="speedUp"
                className="w-[380px] h-[380px]"
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-white/60 text-lg max-w-md text-center"
        >
          Click the text to explore my work • Click the orb to get in touch
        </motion.p>
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  )
}
