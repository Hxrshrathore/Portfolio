"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "@/components/ui/count-up"
import GradientText from "@/components/ui/gradient-text"

interface PreloaderProps {
  children: React.ReactNode
}

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if we've already loaded in this session
    const hasLoaded = sessionStorage.getItem("preloader_shown")
    
    if (hasLoaded) {
      setIsLoading(false)
      setShowContent(true)
      return
    }

    setIsLoading(true) // Start loading if not shown before

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            sessionStorage.setItem("preloader_shown", "true")
            setTimeout(() => setShowContent(true), 800)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AnimatePresence>
        {mounted && isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-50 flex items-end justify-end bg-black"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            </div>

            <motion.div
              className="relative z-10 p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GradientText
                colors={["#ffffff", "#f3f4f6", "#e5e7eb", "#f3f4f6", "#ffffff"]}
                animationSpeed={3}
                showBorder={false}
                className="text-6xl md:text-8xl font-bold"
              >
                <CountUp from={0} to={progress} duration={0.5} direction="up" className="font-mono" />%
              </GradientText>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </>
  )
}
