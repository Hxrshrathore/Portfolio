"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePreloaderStore } from "@/lib/store/use-preloader-store"
import Counter from "./Counter"

interface PreloaderProps {
  children: React.ReactNode
}

type Phase = "loading" | "exiting" | "done"

const CRITICAL_CDN = "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects"

// Critical assets required for above-the-fold experience (Hero 3D cylinder, Flowing Menu, Case Studies)
const CRITICAL_ASSETS = [
  `${CRITICAL_CDN}/Nutgram.png`,
  `${CRITICAL_CDN}/KIITFEST.png`,
  `${CRITICAL_CDN}/Kritarth.png`,
  `${CRITICAL_CDN}/Hermes%20Racing.png`,
  `${CRITICAL_CDN}/Viral%20ARC.png`,
  `${CRITICAL_CDN}/Chimera.png`,
  `${CRITICAL_CDN}/Udghosh.png`,
  `${CRITICAL_CDN}/TEDxKIIT%20University.png`,
  `${CRITICAL_CDN}/KIIT%20MUN.png`,
  `${CRITICAL_CDN}/Nexus%20AI.png`,
  `${CRITICAL_CDN}/Verinews.png`,
  `${CRITICAL_CDN}/Estate.png`,
  `${CRITICAL_CDN}/Blunt%20E-commerce.png`,
  `${CRITICAL_CDN}/Pandav%20Studio.png`,
  `${CRITICAL_CDN}/Acsent%20Choacing%20Center.png`,
  `${CRITICAL_CDN}/Bikash%20Vidalya.png`,
  "/logo/kiitmun.png",
  "/logo/ascent.png",
  "/logo/chimera.png",
  "/logo/pandav.png",
  "/placeholder.jpg",
]

const CACHE_NAME = "portfolio-assets-v1"

// Preloads and decodes into browser GPU bitmap cache + local Cache API
async function preloadAndCacheAsset(url: string): Promise<void> {
  // 1. Warm Cache API for persistent offline/local storage across visits
  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await window.caches.open(CACHE_NAME)
      const match = await cache.match(url)
      if (!match) {
        fetch(url, { mode: "cors", cache: "force-cache" })
          .then((res) => {
            if (res.ok) cache.put(url, res.clone())
          })
          .catch(() => {})
      }
    } catch {
      // Graceful fallback if caches is restricted (e.g. private mode)
    }
  }

  // 2. Decode into browser bitmap memory for instantaneous zero-jank render
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = "async"
    img.onload = () => {
      if ("decode" in img) {
        img.decode().then(() => resolve()).catch(() => resolve())
      } else {
        resolve()
      }
    }
    img.onerror = () => resolve() // Don't block loading if an image fails
    img.src = url
  })
}

export default function Preloader({ children }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const setDone = usePreloaderStore((state) => state.setDone)
  const finishedRef = useRef(false)

  const finishLoading = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setPhase("exiting")
    setDone()
    sessionStorage.setItem("preloader_shown", "true")
    localStorage.setItem("portfolio_assets_cached_v1", "true")
    localStorage.setItem("portfolio_last_visit", Date.now().toString())
  }, [setDone])

  useEffect(() => {
    setIsMounted(true)

    const isAssetsCached = typeof window !== "undefined" && localStorage.getItem("portfolio_assets_cached_v1") === "true"
    const lastVisit = typeof window !== "undefined" ? localStorage.getItem("portfolio_last_visit") : null
    const isRecentVisit = !!lastVisit && Date.now() - parseInt(lastVisit) < 1000 * 60 * 60 * 24 // <24h

    // Fast-path duration for returning visits with warm cache vs cold load
    const minDuration = isAssetsCached && isRecentVisit ? 450 : 950
    const maxDuration = 3600 // Maximum fail-safe so user is never trapped
    const startTime = performance.now()

    let completedTargets = 0
    const totalTargets = CRITICAL_ASSETS.length + 2 // +1 fonts, +1 document ready
    let targetProgress = isAssetsCached ? 30 : 10

    const markTargetDone = () => {
      completedTargets++
      const calculated = Math.min(100, Math.round((completedTargets / totalTargets) * 100))
      if (calculated > targetProgress) {
        targetProgress = calculated
      }
    }

    // 1. Parallel asset preloading & caching
    CRITICAL_ASSETS.forEach((url) => {
      preloadAndCacheAsset(url).then(markTargetDone)
    })

    // 2. Font readiness
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(markTargetDone).catch(markTargetDone)
    } else {
      markTargetDone()
    }

    // 3. Document readiness
    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        markTargetDone()
      } else {
        window.addEventListener("load", markTargetDone, { once: true })
      }
    }

    // 4. Smooth progression tick
    let currentDisplay = isAssetsCached ? 20 : 0
    let rafId: number | null = null

    const tick = (now: number) => {
      const elapsed = now - startTime
      const timeRatio = Math.min(1, elapsed / minDuration)
      const allowedByTime = Math.round(timeRatio * 100)

      // Fail safe check
      const timedOut = elapsed >= maxDuration

      // Progress cannot race ahead of real loaded assets, but smoothly follows them
      const effectiveCap = timedOut ? 100 : Math.min(targetProgress, allowedByTime)

      if (currentDisplay < effectiveCap) {
        const step = Math.max(1, Math.ceil((effectiveCap - currentDisplay) * 0.2))
        currentDisplay = Math.min(effectiveCap, currentDisplay + step)
        setProgress(currentDisplay)
      }

      const allLoaded = completedTargets >= totalTargets
      const minTimeElapsed = elapsed >= minDuration

      if ((currentDisplay >= 100 && (allLoaded || timedOut)) || (timedOut && minTimeElapsed)) {
        setProgress(100)
        setTimeout(finishLoading, 160)
      } else {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [finishLoading])

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

      {/* Content wrapper with clean reveal (no transform/willChange so sticky/fixed positioning on iOS never breaks) */}
      <div
        className="w-full flex-grow flex flex-col"
        style={
          phase === "done" 
            ? undefined
            : {
                opacity: showChildren ? 1 : 0,
                transition: "opacity 0.4s ease-out",
              }
        }
      >
        {children}
      </div>
    </>
  )
}
