"use client"

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import OptionWheel from "./OptionWheel"
import { useScroll } from "@/components/smooth-scroll"

const CHANNELS = [
  {
    label: "GitHub",
    value: "Hxrshrathore",
    url: "https://github.com/hxrshrathore",
  },
  {
    label: "Email",
    value: "hxrshrathore@gmail.com",
    url: "mailto:hxrshrathore@gmail.com",
    copy: "hxrshrathore@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "hxrshrathore",
    url: "https://linkedin.com/in/hxrshrathore",
  },
  {
    label: "Twitter / X",
    value: "@hxrshrathore",
    url: "https://x.com/hxrshrathore",
  },
  {
    label: "Location",
    value: "Bengaluru, IN",
    url: "https://maps.google.com/?q=Bengaluru,India",
  },
  {
    label: "Availability",
    value: "Open to Roles",
    url: "mailto:hxrshrathore@gmail.com?subject=Engineering%20Opportunity",
  },
]

export default function DualWheelSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(1200)
  const { lenis } = useScroll()

  // Responsive typography & dynamic insets to guarantee zero text cropping on any screen
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth || 1200)
    }
    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate dynamic font sizes and insets based on actual viewport width
  // Ensures long strings like "hxrshrathore@gmail.com" (22 chars) always fit completely without any cropping
  const { leftFontSize, rightFontSize, leftInset, rightInset } = useMemo(() => {
    if (windowWidth < 480) {
      return { leftFontSize: 1.4, rightFontSize: 1.1, leftInset: 16, rightInset: 16 }
    }
    if (windowWidth < 768) {
      return { leftFontSize: 1.7, rightFontSize: 1.35, leftInset: 24, rightInset: 24 }
    }
    if (windowWidth < 1024) {
      return { leftFontSize: 2.1, rightFontSize: 1.65, leftInset: 32, rightInset: 32 }
    }
    if (windowWidth < 1366) {
      return { leftFontSize: 2.5, rightFontSize: 2.0, leftInset: 48, rightInset: 48 }
    }
    return { leftFontSize: 2.9, rightFontSize: 2.35, leftInset: 64, rightInset: 64 }
  }, [windowWidth])

  // ── Scroll Hijacking Logic ──
  // Container has a dedicated scroll track height (260vh).
  // While inside this track, the section stays pinned full-screen (sticky top-0 h-screen).
  // Window scroll progress translates directly into the active index of both wheels.
  useEffect(() => {
    let rafId: number | null = null

    const updateScroll = () => {
      rafId = null
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || 800

      // Early boundaries when out of view
      if (rect.top > windowHeight) {
        setActiveIndex((prev) => (prev === 0 ? prev : 0))
        return
      }
      if (rect.bottom < 0) {
        const last = CHANNELS.length - 1
        setActiveIndex((prev) => (prev === last ? prev : last))
        return
      }

      const totalScrollable = rect.height - windowHeight
      if (totalScrollable <= 0) return

      // When the top of the container hits the top of the viewport
      const scrolled = -rect.top
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable))
      const count = CHANNELS.length
      const index = Math.min(count - 1, Math.floor(progress * count))
      setActiveIndex((prev) => (prev === index ? prev : index))
    }

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    if (lenis) {
      lenis.on("scroll", handleScroll)
    }
    updateScroll()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
      if (lenis) {
        lenis.off("scroll", handleScroll)
      }
    }
  }, [lenis])

  const leftItems = useMemo(() => CHANNELS.map((c) => c.label), [])
  const rightItems = useMemo(() => CHANNELS.map((c) => c.value), [])

  const handleItemClick = useCallback((index: number) => {
    const channel = CHANNELS[index]
    if (!channel) return
    if (channel.copy) {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(channel.copy)
      }
    }
    if (channel.url) {
      window.open(channel.url, channel.url.startsWith("http") ? "_blank" : "_self")
    }
  }, [])

  const isMobile = windowWidth < 768

  return (
    <section
      ref={containerRef}
      data-no-cursor="true"
      className="relative w-full bg-black text-white select-none min-h-[180vh] md:min-h-[260vh]"
      style={{ height: isMobile ? "180vh" : "260vh" }}
    >
      {/* ── Sticky Fullscreen Viewport Pinning ── */}
      <div 
        data-no-cursor="true"
        className="sticky top-0 h-screen h-[100dvh] pb-[env(safe-area-inset-bottom,0px)] w-full flex items-center justify-between overflow-hidden bg-black"
      >
        {/* Subtle Top & Bottom Gradient Dissolves */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/85 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-20" />

        {/* ── Full Width Dual Dial Layout (Edge-to-Edge) ── */}
        <div className="relative w-full h-full flex items-center justify-between overflow-visible">
          {/* Left Wheel (Channel Label) */}
          <div className="relative w-[28%] sm:w-[30%] h-full shrink-0 overflow-visible">
            <OptionWheel
              items={leftItems}
              defaultSelected={0}
              selectedIndex={activeIndex}
              textColor="#4b4b4b"
              activeColor="#ffffff"
              side="left"
              fontSize={leftFontSize}
              spacing={1.45}
              curve={0.3}
              tilt={5.5}
              blur={1.25}
              fade={0.25}
              smoothing={380}
              inset={leftInset}
              loop={false}
              draggable={!isMobile}
              disableWheel={true}
              soundUrl=""
              soundVolume={0.5}
              className="overflow-visible"
              onItemClick={handleItemClick}
            />
          </div>

          {/* Right Wheel (Verified Endpoint) */}
          <div className="relative w-[72%] sm:w-[70%] h-full shrink-0 overflow-visible">
            <OptionWheel
              items={rightItems}
              defaultSelected={0}
              selectedIndex={activeIndex}
              textColor="#4b4b4b"
              activeColor="#ffffff"
              side="right"
              fontSize={rightFontSize}
              spacing={1.45}
              curve={0.3}
              tilt={5.5}
              blur={1.25}
              fade={0.25}
              smoothing={380}
              inset={rightInset}
              loop={false}
              draggable={!isMobile}
              disableWheel={true}
              soundUrl=""
              soundVolume={0.5}
              className="overflow-visible"
              onItemClick={handleItemClick}
            />
          </div>
        </div>

        {/* Mobile 6-channel progress dots indicator */}
        <div className="absolute bottom-6 inset-x-0 flex md:hidden items-center justify-center gap-1.5 z-30 pointer-events-none">
          {CHANNELS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-4 bg-white/90"
                  : "w-1 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
