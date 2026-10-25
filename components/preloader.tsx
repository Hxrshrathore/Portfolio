"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePreloaderStore } from "@/lib/store/use-preloader-store"
import Counter from "./Counter"

interface PreloaderProps {
  children: React.ReactNode
}

type Phase = "loading" | "exiting" | "done"

export default function Preloader({ children }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const setDone = usePreloaderStore((state) => state.setDone)

  const finishLoading = useCallback(() => {
    setPhase("exiting")
    setDone()
    sessionStorage.setItem("preloader_shown", "true")
    localStorage.setItem("portfolio_last_visit", Date.now().toString())
  }, [])

  useEffect(() => {
    setIsMounted(true)
    
    const isSessionShown = sessionStorage.getItem("preloader_shown")
    const lastVisit = localStorage.getItem("portfolio_last_visit")
    const isReturningUser = !!lastVisit && (Date.now() - parseInt(lastVisit) < 1000 * 60 * 60 * 24) // Returns within 24h

    // Fast-path: Skip immediately if shown in this session
    if (isSessionShown) {
      setPhase("done")
      setDone()
      return
    }

    // Perceived progress starting point
    setProgress(isReturningUser ? 40 : 20)

    // Dynamic Interval Logic
    const startTime = Date.now()
    const targetDuration = 350 // Fast, responsive load transition
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculatedProgress = Math.min(99, Math.floor((elapsed / targetDuration) * 100) + (isReturningUser ? 40 : 20))
      
      setProgress(calculatedProgress)

      if (elapsed >= targetDuration) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(finishLoading, 200)
      }
    }, 16) // ~60fps check

    // Fail-safe: Maximum 5 seconds for preloader
    const failSafe = setTimeout(() => {
      if (phase === "loading") {
        clearInterval(interval)
        setProgress(100)
        finishLoading()
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(failSafe)
    }
  }, [phase, finishLoading])

  // Optimization: Don't render the preloader container at all on the server 
  // to avoid large HTML payload for the preloader, but we need it for the initial state.
  // Instead, we use a CSS transition for the children reveal.
  const showChildren = phase === "done" || phase === "exiting"

  // If not mounted yet (SSR), we render the preloader with 0 opacity to hide flicker
  // and only show it after the mount effect determines if it's needed.
  return (
    <>
      <AnimatePresence onExitComplete={() => setPhase("done")}>
        {isMounted && phase === "loading" && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              y: "-100%",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
            </div>

            <motion.div
              className="relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Counter
                value={progress}
                places={[100, 10, 1]}
                fontSize={80}
                padding={5}
                gap={10}
                textColor="white"
                fontWeight={900}
                digitPlaceHolders={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper with smoother reveal */}
      <main
        style={
          phase === "done" 
            ? {} // Remove transform and will-change to prevent breaking position:fixed children
            : {
                opacity: showChildren ? 1 : 0,
                transform: showChildren ? "none" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "opacity, transform"
              }
        }
      >
        {children}
      </main>
    </>
  )
}
