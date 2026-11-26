"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import Orb from "./orb"
import CircularText from "./ui/circular-text"
import ContactModal from "./contact-modal"

export default function OrbSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isOrbHovered, setIsOrbHovered] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const quickToRotateX = useRef<gsap.QuickToFunc | null>(null)
  const quickToRotateY = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    gsap.set(stage, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    })

    quickToRotateX.current = gsap.quickTo(stage, "rotationX", {
      duration: 0.25,
      ease: "power2.out",
    })
    quickToRotateY.current = gsap.quickTo(stage, "rotationY", {
      duration: 0.25,
      ease: "power2.out",
    })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Smooth cursor tilt angles matching the Project Locker card physics
      const maxTilt = 18
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      quickToRotateX.current?.(rotateX)
      quickToRotateY.current?.(rotateY)
    }

    const handleMouseLeave = () => {
      gsap.to(stage, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power3.out",
      })
    }

    stage.addEventListener("mousemove", handleMouseMove)
    stage.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      stage.removeEventListener("mousemove", handleMouseMove)
      stage.removeEventListener("mouseleave", handleMouseLeave)
      quickToRotateX.current = null
      quickToRotateY.current = null
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 py-20">
        {/* Left Column: Big Title */}
        <div className="w-full md:w-1/2 text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none flex items-baseline gap-3 sm:gap-4 uppercase select-none cursor-default">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">LET&apos;S</span>
              <span className="font-light text-zinc-400 transition-colors duration-300 hover:text-zinc-300">TALK</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-zinc-400 text-base md:text-lg font-light tracking-wide">
              Have a project in mind?
            </p>
          </motion.div>
        </div>

        {/* Right Column: The Contact Orb Stage with 3D Depth & Cursor Tilt */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end [perspective:1000px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", damping: 20 }}
            viewport={{ once: true }}
            className="flex items-center justify-center [perspective:1000px]"
          >
            {/* 3D Tilt Stage with Layered Parallax */}
            <div
              ref={stageRef}
              className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] will-change-transform flex items-center justify-center select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ─── Layer 1: The 3D Orb (Base Z = 0px) ─── */}
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  transform: "translate3d(-50%, -50%, 0px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] rounded-full transition-transform duration-700 ease-out flex items-center justify-center ${
                    isOrbHovered ? "scale-110" : "scale-100"
                  }`}
                >
                  <Orb forceHoverState={isOrbHovered} />
                </div>
              </div>

              {/* ─── Layer 2: Circular Rotating Text (Middle Z = 40px) ─── */}
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  transform: "translate3d(-50%, -50%, 40px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <CircularText
                  text="LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * LET'S CONNECT * "
                  spinDuration={25}
                  onHover="slowDown"
                  className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]"
                />
              </div>

              {/* ─── Layer 3 & Unified Activation Area: Center Arrow at Z = 80px inside Orb Hitbox ─── */}
              <div
                onClick={() => setIsContactModalOpen(true)}
                onMouseEnter={() => setIsOrbHovered(true)}
                onMouseLeave={() => setIsOrbHovered(false)}
                className="absolute top-1/2 left-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] rounded-full z-30 flex items-center justify-center focus:outline-none"
                style={{
                  cursor: "pointer",
                  transform: "translate3d(-50%, -50%, 80px)",
                  transformStyle: "preserve-3d",
                }}
                aria-label="Open contact form"
              >
                {/* Center Arrow Circle: sole anchor for BlendedCursor highlight */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsContactModalOpen(true)
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-transparent bg-transparent flex items-center justify-center cursor-pointer focus:outline-none transition-transform duration-300 ${
                    isOrbHovered ? "scale-110" : "scale-100"
                  }`}
                  aria-label="Contact Harsh"
                >
                  <ArrowUpRight
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none transition-transform duration-300 ${
                      isOrbHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  )
}
