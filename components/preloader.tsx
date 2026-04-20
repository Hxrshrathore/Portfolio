"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "@/components/ui/count-up"
import GradientText from "@/components/ui/gradient-text"

interface PreloaderProps {
  children: React.ReactNode
}

type Phase = "loading" | "exiting" | "done"

export default function Preloader({ children }: PreloaderProps) {
  // Always start with "loading" to match SSR. 
  // We'll check sessionStorage in useEffect to skip quickly on the client.
  const [phase, setPhase] = useState<Phase>("loading")
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if we already showed the preloader in this session
    if (sessionStorage.getItem("preloader_shown")) {
      setPhase("done")
      return
    }

    if (phase !== "loading") return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase("exiting")
            sessionStorage.setItem("preloader_shown", "true")
          }, 400)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [phase])

  // Immediately render children when phase is "done" (repeat visits)
  const showChildren = phase === "done" || phase === "exiting"

  return (
    <>
      <AnimatePresence
        onExitComplete={() => setPhase("done")}
      >
        {phase === "loading" && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.0,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-50 flex items-end justify-end bg-black"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
            </div>

            <motion.div
              className="relative z-10 p-6 md:p-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GradientText
                colors={["#ffffff", "#f3f4f6", "#e5e7eb", "#f3f4f6", "#ffffff"]}
                animationSpeed={3}
                showBorder={false}
                className="text-5xl md:text-8xl font-bold"
              >
                <CountUp from={0} to={progress} duration={0.5} direction="up" className="font-mono" />%
              </GradientText>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children: visible immediately on repeat visits, fade-in after preloader exit */}
      <div
        style={{
          opacity: showChildren ? 1 : 0,
          transition: phase === "done" ? "none" : "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  )
}
