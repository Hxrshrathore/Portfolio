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
    <section className="relative min-h-screen bg-black text-white py-24 border-t border-white/5 flex flex-col justify-center">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center">

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 tracking-tight"
          >
            Trusted by Visionaries
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 mb-20 max-w-2xl mx-auto font-light tracking-wide">
            Partnering with forward-thinking companies who dare to push boundaries.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="relative overflow-hidden mx-auto max-w-6xl w-full"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
          >
            
            {/* CSS-driven marquee avoiding GSAP load race conditions */}
            <style>
              {`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .css-marquee-track {
                  animation: marquee 30s linear infinite;
                  width: max-content;
                }
                .css-marquee-track:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            
            <div
              className="flex css-marquee-track will-change-transform items-center py-4"
              data-no-cursor="true"
            >
              {loopLogos.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="flex items-center justify-center px-10 md:px-16"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className={`
                      object-contain
                      filter grayscale opacity-60
                      transition-all duration-500 ease-out
                      hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]
                      ${company.square ? "h-16 md:h-20" : "h-10 md:h-12"}
                      w-auto max-w-[180px]
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
