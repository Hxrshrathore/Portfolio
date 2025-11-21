"use client"

import MagicBento from "./magic-bento"

export default function MagicBentoSection() {
  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,0,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Interactive Excellence</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the magic of thoughtful interaction design. Every hover, every click, every moment is crafted to
            delight.
          </p>
        </div>

        {/* Magic Bento Component */}
        <div className="flex justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
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
