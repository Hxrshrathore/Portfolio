"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import ScrollReveal from "./scroll-reveal"

export default function ScrollRevealSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
          >
            Every Detail Matters
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meticulously crafted interactions that reveal themselves at just the right moment
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Seamless Transitions</h3>
            <p className="text-gray-400 mb-4">Smooth animations that guide users naturally through your content</p>
            <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <ScrollReveal>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Elegant Reveal</p>
                </div>
              </ScrollReveal>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Purposeful Motion</h3>
            <p className="text-gray-400 mb-4">Every animation serves a purpose, enhancing user understanding</p>
            <div className="h-32 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Intentional Design</p>
                </div>
              </ScrollReveal>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Delightful Moments</h3>
            <p className="text-gray-400 mb-4">Micro-interactions that create memorable user experiences</p>
            <div className="h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
              <ScrollReveal direction="scale" delay={0.4}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Magical Touch</p>
                </div>
              </ScrollReveal>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-semibold mb-8 text-white">Orchestrated Experiences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 h-24 flex items-center justify-center">
                  <span className="text-sm font-medium">Element {i + 1}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
