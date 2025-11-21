"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || cards.length === 0) return

    // Set initial positions
    cards.forEach((card, index) => {
      gsap.set(card, {
        y: index * 30,
        scale: 1 - index * 0.05,
        transformOrigin: "center top",
      })
    })

    // Create stacking animation
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return // Skip last card

      ScrollTrigger.create({
        trigger: section,
        start: `top+=${index * 100} center`,
        end: `bottom-=${(cards.length - index) * 100} center`,
        scrub: 1,
        animation: gsap.to(card, {
          y: -100,
          scale: 0.8,
          opacity: 0.7,
          ease: "none",
        }),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const cardData = [
    {
      title: "Web Architecture",
      description:
        "Building digital foundations that scale beautifully. Every line of code is crafted with precision and purpose.",
      tags: ["React", "Next.js", "TypeScript", "Node.js"],
      gradient: "from-purple-900/80 to-blue-900/80",
    },
    {
      title: "Creative Development",
      description:
        "Where art meets technology. Pushing the boundaries of what's possible in the browser with cutting-edge techniques.",
      tags: ["WebGL", "Three.js", "GSAP", "Canvas"],
      gradient: "from-green-900/80 to-teal-900/80",
    },
    {
      title: "Experience Design",
      description:
        "Crafting interfaces that feel like magic. Every interaction is thoughtfully designed to delight and inspire.",
      tags: ["Figma", "Framer", "Prototyping", "User Research"],
      gradient: "from-orange-900/80 to-red-900/80",
    },
    {
      title: "Performance Mastery",
      description:
        "Speed isn't just a feature — it's the foundation. Optimizing every millisecond for experiences that feel instantaneous.",
      tags: ["Core Web Vitals", "Optimization", "Caching", "CDN"],
      gradient: "from-pink-900/80 to-purple-900/80",
    },
    {
      title: "Full-Stack Excellence",
      description: "From database to deployment, creating seamless experiences across the entire technology stack.",
      tags: ["PostgreSQL", "GraphQL", "AWS", "Docker"],
      gradient: "from-indigo-900/80 to-blue-900/80",
    },
  ]

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">My Expertise</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Watch my skills stack up as you scroll</p>
        </div>

        <div className="relative">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`sticky top-20 w-full h-80 p-12 rounded-[40px] backdrop-blur-sm border border-white/10 mb-8 bg-gradient-to-br ${card.gradient}`}
              style={{ zIndex: cardData.length - index }}
            >
              <div className="text-white h-full flex flex-col justify-center">
                <h3 className="text-4xl font-bold mb-4">{card.title}</h3>
                <p className="text-lg text-gray-300 mb-6">{card.description}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
