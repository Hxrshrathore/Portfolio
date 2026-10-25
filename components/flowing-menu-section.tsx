"use client"

import FlowingMenu from "./flowing-menu"

const capabilityItems = [
  {
    link: "/projects",
    text: "Full-Stack Web Applications",
    image: "/rip/frame1.png",
  },
  {
    link: "/projects",
    text: "Applied AI & LLM Systems",
    image: "/rip/frame8.png",
  },
  {
    link: "/projects",
    text: "API Integrations & Pipelines",
    image: "/rip/frame6.png",
  },
  {
    link: "/projects",
    text: "Product Interfaces & Systems",
    image: "/rip/frame4.png",
  },
]

export default function FlowingMenuSection() {
  return (
    <section id="capabilities" className="relative w-full bg-black overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="text-center py-16 md:py-24 px-4">
        <span className="text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase block mb-3">
          Engineering Capabilities
        </span>
        <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight px-2">
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
