"use client"

import { useCart } from "@/lib/store/use-cart"
import { useEffect, useState } from "react"
import TransitionLink from "./transition-link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ShoppingCart, X } from "lucide-react"
import GlassSurface from "./GlassSurface"
import dynamic from "next/dynamic"

const MetallicPaint = dynamic(() => import("./MetallicPaint"), {
  ssr: false,
})

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cartItems = useCart((state) => state.totalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="fixed top-[max(1rem,env(safe-area-inset-top,1rem))] left-0 right-0 z-50 pt-1 md:pt-2 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <GlassSurface
            width="100%"
            height={64}
            borderRadius={32}
            distortionScale={-180}
            displace={0.5}
            backgroundOpacity={0.1}
            className="w-full"
          >
            <div className="relative flex items-center justify-between w-full px-4 sm:px-6">
              {/* Left Brand: Hersh Design Logo with MetallicPaint Effect */}
              <TransitionLink href="/" aria-label="Hersh Design" className="flex items-center relative z-10 group">
                <div className="relative w-[112px] sm:w-[128px] h-[40px] sm:h-[46px] overflow-hidden pointer-events-auto">
                  <MetallicPaint
                    imageSrc="/logo/hersh-design-logo.svg"
                    color="#ffffff"
                    density={2}
                    softness={0.19}
                    dispersion={0.34}
                    distortion={0.07}
                    edgeBend={0.16}
                    angle={70}
                    scale={0.95}
                    speed={0.55}
                    rotation={1}
                    mouseTilt={0.5}
                    intro={false}
                    paused={!mounted}
                  />
                </div>
              </TransitionLink>

              <div className="hidden md:flex items-center space-x-6">
                <TransitionLink
                  href="/projects"
                  className="text-sm font-medium tracking-tight text-white/85 hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                >
                  Work
                </TransitionLink>
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-medium tracking-tight transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(255,255,255,0.12)] group"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </TransitionLink>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 z-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white block transition-all shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-white block transition-all shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white block transition-all shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                />
              </button>
            </div>
          </GlassSurface>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] md:hidden"
            />

            {/* Mobile menu drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[70] md:hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header with Close Cross Button */}
                <div className="flex items-center justify-between px-6 pt-[max(1.25rem,env(safe-area-inset-top,1.25rem))] pb-5 border-b border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">Menu</span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col space-y-6 px-6 pt-8">
                  <TransitionLink
                    href="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium tracking-tight hover:text-gray-300 transition-colors"
                  >
                    Work
                  </TransitionLink>

                  <TransitionLink
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-base font-medium tracking-tight transition-all w-fit"
                  >
                    <span>Contact</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </TransitionLink>
                </nav>
              </div>

              {/* Bottom Quick Info */}
              <div className="px-6 pb-8 border-t border-white/5 pt-4 text-xs font-mono text-white/30">
                <p>UTC+5:30 • Bhubaneswar, IN</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
