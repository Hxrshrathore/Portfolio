"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { gsap } from "gsap"

export default function TrustedBySection() {
  const ref = useRef(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const controls = useAnimation()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const logos = [
    { name: "Google", logo: "/logo/kiitmun.png", square: true },
    { name: "Microsoft", logo: "/logo/pandav.png" },
    { name: "Apple", logo: "/logo/ascent.png", square: true },
    { name: "Amazon", logo: "/logo/bikash.png", square: true },
    { name: "Meta", logo: "/logo/hemsida.png" , square: true },
    { name: "Netflix", logo: "/logo/dmc.png" },
    { name: "Spotify", logo: "/logo/indura.png", square: true },
    { name: "Adobe", logo: "/logo/kiitmun.png", square: true },
    { name: "Sunshine", logo: "/logo/sunshine.png", square: true },
    { name: "Chimera", logo: "/logo/chimera.png", square: true },
  ]

  const loopLogos = [...logos, ...logos]

  // ✅ GSAP-BASED INFINITE MARQUEE - uses transform for compositor-friendly animation
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const halfWidth = track.scrollWidth / 2
    let ctx = gsap.context(() => {
      gsap.to(track, {
        x: -halfWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        paused: isPaused,
      })
    }, track)

    return () => ctx.revert()
  }, [isPaused])

  return (
    <section className="relative min-h-screen bg-black text-white py-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center">

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 uppercase tracking-tight"
          >
            Trusted by Visionaries
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl mx-auto tracking-wide">
            Partnering with forward-thinking companies who dare to push boundaries
          </motion.p>

          <motion.div variants={itemVariants} className="relative overflow-hidden mx-auto max-w-6xl">
            
            <div
              ref={trackRef}
              className="flex whitespace-nowrap will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {loopLogos.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="flex items-center justify-center px-6 py-6 cursor-pointer"
                  style={{ minWidth: 200 }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className={`
                      object-contain 
                      filter grayscale brightness-75 
                      transition-all duration-500 ease-out
                      hover:grayscale-0 hover:brightness-100 hover:scale-110 hover:drop-shadow-lg
                      ${company.square ? "h-20" : "h-12"}
                      w-auto max-w-[160px]
                    `}
                  />
                </div>
              ))}
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
