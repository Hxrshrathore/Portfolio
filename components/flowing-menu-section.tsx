"use client"

import FlowingMenu from "./flowing-menu"

const CDN = "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects"

const capabilityItems = [
  {
    link: "/projects",
    text: "Full-Stack Web Applications",
    image: `${CDN}/Nutgram.png`,
    images: [
      `${CDN}/Nutgram.png`,
      `${CDN}/KIITFEST.png`,
      `${CDN}/Kritarth.png`,
      `${CDN}/Blunt%20E-commerce.png`,
    ],
  },
  {
    link: "/projects",
    text: "Applied AI & LLM Systems",
    image: `${CDN}/Nexus%20AI.png`,
    images: [
      `${CDN}/Nexus%20AI.png`,
      `${CDN}/Verinews.png`,
      `${CDN}/Viral%20ARC.png`,
      `${CDN}/Nutgram.png`,
    ],
  },
  {
    link: "/projects",
    text: "API Integrations & Pipelines",
    image: `${CDN}/Verinews.png`,
    images: [
      `${CDN}/Verinews.png`,
      `${CDN}/Nutgram.png`,
      `${CDN}/KIITFEST.png`,
      `${CDN}/Hermes%20Racing.png`,
    ],
  },
  {
    link: "/projects",
    text: "Product Interfaces & Systems",
    image: `${CDN}/Chimera.png`,
    images: [
      `${CDN}/Chimera.png`,
      `${CDN}/Estate.png`,
      `${CDN}/TEDxKIIT%20University.png`,
      `${CDN}/Pandav%20Studio.png`,
    ],
  },
]

export default function FlowingMenuSection() {
  return (
    <section id="capabilities" className="relative w-full bg-black overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="text-center py-16 md:py-24 px-4">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight px-2">
          From Problem Discovery to Production
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto tracking-wide px-4 leading-relaxed font-light">
          Delivering robust web products, contextual AI integrations, automated workflows, and high-performance interfaces designed to solve real user friction.
        </p>
      </div>

      {/* Flowing Menu */}
      <div className="h-[420px] md:h-[540px] relative">
        <FlowingMenu items={capabilityItems} />
      </div>
    </section>
  )
}
