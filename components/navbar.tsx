"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import PixelBat from "./ui/pixel-bat"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pt-8 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative -top-5">
                <PixelBat />
              </div>
              <span className="text-white font-medium text-lg">hxrshrathore</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/projects" className="text-white hover:text-gray-300 transition-colors">
                Work
              </Link>
              <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">
                Blog
              </Link>
              <a href="#about" className="text-white hover:text-gray-300 transition-colors">
                About
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 z-50"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white block transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all"
              />
            </button>
          </div>
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
                <nav className="flex flex-col space-y-8">
                  <Link
                    href="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium hover:text-cyan-400 transition-colors"
                  >
                    Work
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium hover:text-cyan-400 transition-colors"
                  >
                    Blog
                  </Link>
                  <a
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-medium hover:text-cyan-400 transition-colors"
                  >
                    About
                  </a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
