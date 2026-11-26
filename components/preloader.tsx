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

const CORE_LOCAL_ASSETS = [
  "/logo/hersh-design-logo.svg",
  "/logo/aerolux.png",
  "/projects/aerolux.jpg",
  "/logo/rathore-developers.svg",
  "/projects/rathore-developers.jpg",
  "/logo/kiitmun.png",
  "/logo/ascent.png",
  "/logo/chimera.png",
  "/logo/pandav.png",
  "/placeholder.jpg",
]

// Additional CDN assets warmed in parallel in background
const BACKGROUND_CDN_ASSETS = [
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
]

// Preloads and decodes into browser bitmap cache
function preloadImageAsset(url: string): Promise<void> {
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
    img.onerror = () => resolve() // Never block preloader if an image fails
    img.src = url
  })
}

// Smooth easeInOutQuad so 0-35 accelerates naturally and 35-100 glides cleanly
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
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
    const isRecentVisit = !!lastVisit && Date.now() - parseInt(lastVisit, 10) < 1000 * 60 * 60 * 24 // <24h

    // Smooth non-jumping duration even on warm cache
    const minDuration = isAssetsCached && isRecentVisit ? 750 : 1250
    const maxDuration = 2800
    const startTime = performance.now()

    let coreCompleted = 0
    const totalCore = CORE_LOCAL_ASSETS.length + 2 // +1 fonts, +1 document load
    let coreReady = false

    const markCoreDone = () => {
      coreCompleted++
      if (coreCompleted >= totalCore) {
        coreReady = true
      }
    }

    // 1. Preload core local assets (gates completion cleanly without hanging on remote CDN)
    CORE_LOCAL_ASSETS.forEach((url) => {
      preloadImageAsset(url).then(markCoreDone)
    })

    // 2. Warm background CDN assets in parallel without stalling mid-way
    BACKGROUND_CDN_ASSETS.forEach((url) => {
      preloadImageAsset(url)
    })

    // 3. Font readiness
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(markCoreDone).catch(markCoreDone)
    } else {
      markCoreDone()
    }

    // 4. Document readiness
    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        markCoreDone()
      } else {
        window.addEventListener("load", markCoreDone, { once: true })
      }
    }

    // 5. Continuous delta-time smoothed progression starting from 0
    let currentFloat = 0
    let lastEmitted = 0
    let lastFrameTime = startTime
    let rafId: number | null = null
    let finishTimerId: number | null = null

    const tick = (now: number) => {
      const elapsed = now - startTime
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000))
      lastFrameTime = now

      const rawTimeRatio = Math.min(1, elapsed / minDuration)
      // Blend linear + easeInOutQuad so early 0-35% is smooth and rhythmic rather than instant
      const smoothCurve = 0.3 * rawTimeRatio + 0.7 * easeInOutQuad(rawTimeRatio)
      const timedOut = elapsed >= maxDuration

      let desiredProgress: number
      if (coreReady || timedOut) {
        desiredProgress = smoothCurve * 100
      } else {
        // Never freeze mid-way (e.g. 35%); glide smoothly up to 94% max while waiting for core readiness
        const waitCeiling = 94
        const timeTarget = smoothCurve * 92
        const crawlExtra = Math.min(2, Math.max(0, (elapsed - minDuration) / 600) * 2)
        desiredProgress = Math.min(waitCeiling, timeTarget + crawlExtra)
      }

      // Exponential smoothing toward target, frame-rate independent
      const followSpeed = coreReady || timedOut ? 14 : 10
      currentFloat += (desiredProgress - currentFloat) * Math.min(1, dt * followSpeed)

      // Snap cleanly to 100 only once close enough and ready
      if ((coreReady || timedOut) && rawTimeRatio >= 1 && currentFloat >= 99.4) {
        currentFloat = 100
      }

      // Strictly monotonic integer [0..100] so numbers never drop backward or exceed 100
      const nextInt = Math.max(lastEmitted, Math.min(100, Math.round(currentFloat)))
      if (nextInt !== lastEmitted) {
        lastEmitted = nextInt
        setProgress(nextInt)
      }

      if (nextInt >= 100 && rawTimeRatio >= 1 && (coreReady || timedOut)) {
        // Give Counter's overdamped spring time to settle on 100 cleanly before exit slide
        finishTimerId = window.setTimeout(finishLoading, 260)
      } else {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (finishTimerId !== null) clearTimeout(finishTimerId)
      window.removeEventListener("load", markCoreDone)
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
