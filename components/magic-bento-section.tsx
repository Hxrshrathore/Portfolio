"use client"

import MagicBento from "./magic-bento"

export default function MagicBentoSection() {
  return (
    <section className="relative w-full bg-black pt-40 pb-24 overflow-hidden border-t border-white/5">
      {/* Background Pattern - Strictly Monochromatic */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6  tracking-tight">But, why me?</h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto tracking-wide">
            Because I'm Cool, just kidding ;)
            <br />
            Experience the magic of thoughtful interaction design. Every hover, every click, every moment is crafted to
            delight.
          </p>
        </div>

        {/* Magic Bento Component */}
        <div className="flex justify-center" data-speed="1.05">
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

        {/* Instructions */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            <br />
          </p>
        </div>
      </div>
    </section>
  )
}
