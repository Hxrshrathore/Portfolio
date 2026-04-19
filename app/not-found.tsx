"use client"

import { motion } from "framer-motion"
import TransitionLink from "@/components/transition-link"
import TextPressure from "@/components/text-pressure"
import LiquidChrome from "@/components/liquid-chrome"

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background: Cinematic Distortion ── */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={[0.05, 0.05, 0.05]}
          speed={0.15}
          amplitude={0.6}
          interactive={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <div className="w-full h-[200px] md:h-[300px] mb-8">
          <TextPressure
            text="404"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            minFontSize={80}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-6 text-white/80">
            Lost in the Void
          </h2>
          <p className="text-gray-400 font-light max-w-md mx-auto mb-12 leading-relaxed tracking-wide">
            The coordinates you provided led to a non-existent state. 
            The reality you are looking for has drifted beyond the horizon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <TransitionLink
              href="/"
              className="group relative px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Return to Reality</span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </TransitionLink>

            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 border border-white/10 hover:border-white/30 text-white/60 hover:text-white font-medium text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Decorative Elements ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-t from-white/20 to-transparent" />
        <span className="text-[10px] font-mono text-white/10 tracking-[0.5em] uppercase">VOID_COORDINATES_0x404</span>
      </div>
    </main>
  )
}
