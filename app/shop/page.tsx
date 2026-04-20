"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PlasmaWave from "@/components/PlasmaWave"
import ShopGrid from "@/components/shop-grid"
import { shopProducts } from "@/lib/shop-data"
import { Package, Sparkles } from "lucide-react"

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <PlasmaWave
          colors={["#2a2a2a", "#94a3b8"]}
          speed1={0.14}
          speed2={0.145}
          focalLength={1.4}
          bend1={0.5}
          bend2={1.8}
          dir2={0}
          rotationDeg={162}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Architectural Shop Header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
              <Sparkles size={12} className="text-white/60 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">Digital Marketplace</span>
            </div>

            <div className="flex flex-col items-center justify-center mb-16 px-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[10px] md:text-sm font-bold tracking-[0.6em] uppercase text-white/30 mb-4 block"
              >
                The Curated
              </motion.span>
              
              <div className="relative">
                <motion.h1 
                  className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-[0.85] text-white flex flex-col items-center"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.2,
                      }
                    }
                  }}
                >
                  <span className="flex">
                    {["M", "A", "R", "K", "E", "T"].map((char, i) => (
                      <motion.span
                        key={i}
                        variants={{
                          hidden: { y: 40, opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </motion.h1>
                
                {/* Decorative Geometric Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6"
                />
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="mt-6 text-[10px] md:text-sm font-light tracking-[0.4em] uppercase text-white/20 italic"
              >
                Architectural Assets & Components
              </motion.span>
            </div>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-light tracking-tight leading-relaxed">
              Premium templates and performance-driven building blocks for <span className="text-white font-normal">extraordinary</span> digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Global Shop Stats / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          {[
            { label: "CURATED ASSETS", value: "50+", icon: Package },
            { label: "INSTANT ACCESSS", value: "FREE", icon: Sparkles },
            { label: "PREMIUM SUPPORT", value: "24/7", icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/30 group-hover:text-white transition-colors">
                <stat.icon size={20} />
              </div>
              <p className="text-3xl font-extrabold tracking-tighter mb-2">{stat.value}</p>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* The Product Grid */}
        <ShopGrid products={shopProducts} />

        {/* Bottom CTA */}
        <div className="mt-32 text-center py-24 md:py-40 border-t border-white/5">
           <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic font-light">
                Have a Custom Request?
              </h2>
              <p className="text-white/40 mb-12 text-lg md:text-xl font-light">
                Need a specific component or a tailored version of a template? Let's talk.
              </p>
              <a href="/contact">
                <button className="px-12 py-6 rounded-full bg-white text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all shadow-2xl">
                  Get in Touch
                </button>
              </a>
           </motion.div>
        </div>
      </div>
    </div>
  )
}
