"use client"

import MagicBento from "./magic-bento"

export default function MagicBentoSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto w-full px-4">
        {/* Header */}
        <div className="text-center pt-6 pb-2 shrink-0">
          <span className="text-white/40 text-[10px] font-mono tracking-[0.25em] uppercase block mb-1">
            Engineering Craft
          </span>
          <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-1 tracking-tight px-2">
            Engineering Approach & Systems
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-2xl mx-auto tracking-wide px-4 font-light">
            Turning ambiguous requirements into dependable, production-ready software systems.
          </p>
        </div>

        {/* Magic Bento Component */}
        <div className="flex-1 min-h-0 flex items-center justify-center pb-4" data-speed="1.05">
          <MagicBento
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="255, 255, 255"
          />
        </div>
      </div>
    </section>
  )
}
