"use client"

import { useCart } from "@/lib/store/use-cart"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TransitionLink from "./transition-link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import PixelBat from "./ui/pixel-bat"
import GlassSurface from "./GlassSurface"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isOnHero, setIsOnHero] = useState(false)
  const pathname = usePathname()
  const cartItems = useCart((state) => state.totalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      setIsOnHero(false)
      return
    }

    const updateLogoTone = () => {
      const vh = window.innerHeight || 800
      const scrollY = window.scrollY || window.pageYOffset || 0
      setIsOnHero(scrollY < vh * 0.85)
    }

    updateLogoTone()
    window.addEventListener("scroll", updateLogoTone, { passive: true })
    window.addEventListener("resize", updateLogoTone, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateLogoTone)
      window.removeEventListener("resize", updateLogoTone)
    }
  }, [pathname])

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
              <TransitionLink href="/" className="flex items-center space-x-2 relative z-10">
                <div className="relative -top-5">
                  <PixelBat />
                </div>
                <span className="text-white font-medium text-lg tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">HxrshRathore</span>
              </TransitionLink>

              {/* Centered Hersh Design Logo (solid black on Hero, solid white after Hero) */}
              <TransitionLink
                href="/"
                aria-label="Hersh Design"
                className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10"
              >
                <img
                  src="/logo/hersh-design-logo.svg"
                  alt="Hersh Design"
                  className={`h-12 md:h-14 w-auto object-contain transition-[filter] duration-300 ${
                    isOnHero ? "brightness-0" : "brightness-0 invert"
                  }`}
                />
              </TransitionLink>

              <div className="hidden md:flex items-center space-x-8">
                <TransitionLink href="/projects" className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Work
                </TransitionLink>
                <TransitionLink href="/bio" className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Bio
                </TransitionLink>
                <TransitionLink href="/blog" className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Insights
                </TransitionLink>
                <TransitionLink href="/contact" className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Contact
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile menu drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-32 px-8">
                <nav className="flex flex-col space-y-6">
                  <TransitionLink
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium tracking-tight hover:text-gray-300 transition-colors"
                  >
                    Home
                  </TransitionLink>

                  <TransitionLink
                    href="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium tracking-tight hover:text-gray-300 transition-colors"
                  >
                    Work
                  </TransitionLink>

                  <TransitionLink
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium tracking-tight hover:text-gray-300 transition-colors"
                  >
                    Blog
                  </TransitionLink>

                  <TransitionLink
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium tracking-tight hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </TransitionLink>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
