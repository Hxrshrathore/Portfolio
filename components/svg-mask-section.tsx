"use client"

import { MaskContainer } from "@/components/ui/svg-mask-effect"

export default function SVGMaskSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-16 px-4"></div>

        {/* SVG Mask Effect */}
        <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden px-4">
          <MaskContainer
            revealText={
              <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
                The magic isn't in what you see — it's in what you discover. Every pixel tells a story, every
                interaction reveals possibility.
              </p>
            }
            className="h-[40rem] rounded-md border border-white/20 text-white dark:text-black"
            size={20}
            revealSize={400}
          >
            Discover the extraordinary in the <span className="text-blue-500">seemingly simple</span>. Where innovation
            meets <span className="text-blue-500">intuitive design</span>.
          </MaskContainer>
        </div>

        {/* Description */}
        <div className="text-center py-16 px-4">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Progressive disclosure isn't just a design principle — it's an art form. Revealing information at precisely
            the right moment creates experiences that feel almost magical.
          </p>
        </div>
      </div>
    </section>
  )
}
