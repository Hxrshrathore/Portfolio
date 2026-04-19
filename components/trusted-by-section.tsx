"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export default function TrustedBySection() {
  const ref = useRef(null)
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
    { name: "KIIT MUN", logo: "/logo/kiitmun.png", square: true },
    { name: "Pandav Studio", logo: "/logo/pandav.png" },
    { name: "Acsent", logo: "/logo/ascent.png", square: true },
    { name: "Bikash Vidalya", logo: "/logo/bikash.png", square: true },
    { name: "Hemsida", logo: "/logo/hemsida.png", square: true },
    { name: "DMC School", logo: "/logo/dmc.png" },
    { name: "Indura School", logo: "/logo/indura.png", square: true },
    { name: "Sunshine School", logo: "/logo/sunshine.png", square: true },
    { name: "Chimera", logo: "/logo/chimera.png", square: true },
  ]

  const loopLogos = [...logos, ...logos]

  return (
    <section className="relative bg-black text-white py-20 md:py-24 border-t border-white/5 flex flex-col justify-center">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center">

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight px-2"
          >
            Trusted by Visionaries
          </motion.h2>

          <motion.p variants={itemVariants} className="text-sm md:text-lg text-gray-400 mb-12 md:mb-20 max-w-2xl mx-auto font-light tracking-wide px-4">
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
            
            {/* Pure CSS marquee — no GSAP, no JS, zero overhead */}
            <style>
              {`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .css-marquee-track {
                  animation: marquee 30s linear infinite;
                  width: max-content;
                  will-change: transform;
                }
                @media (prefers-reduced-motion: reduce) {
                  .css-marquee-track {
                    animation: none;
                  }
                }
              `}
            </style>
            
            <div
              className="flex css-marquee-track items-center py-4"
              data-no-cursor="true"
            >
              {loopLogos.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="flex items-center justify-center px-6 md:px-16"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                    className={`
                      object-contain
                      filter grayscale opacity-60
                      transition-opacity duration-500
                      ${company.square ? "h-12 md:h-20" : "h-8 md:h-12"}
                      w-auto max-w-[120px] md:max-w-[180px]
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
