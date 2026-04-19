"use client"

import { WorldMap } from "@/components/ui/world-map"
import { motion } from "framer-motion"

export default function WorldMapSection() {
  return (
    <section className="relative w-full bg-black py-24 overflow-hidden border-t border-white/5">
      {/* Background Pattern - Strictly Monochromatic */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-bold text-5xl md:text-7xl bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 uppercase tracking-tight">
            Working around the{" "}
            <span className="opacity-40">
              {"Globe".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-wide">
            Based in INDIA but working around the Globe.
          </p>
        </div>

        {/* World Map */}
        <div className="mb-16" data-lag="0.2">
          <WorldMap
           dots={[
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 14.0583, lng: 108.2772 }, // Vietnam
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 51.1657, lng: 10.4515 }, // Germany
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 41.8719, lng: 12.5674 }, // Italy
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 48.2082, lng: 16.3738 }, // Austria (Vienna)
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: -33.8688, lng: 151.2093 }, // Australia (Sydney)
  },

  // USA Multiple Locations
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 40.7128, lng: -74.0060 }, // USA - New York
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 34.0522, lng: -118.2437 }, // USA - Los Angeles
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 41.8781, lng: -87.6298 }, // USA - Chicago
  },
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 29.7604, lng: -95.3698 }, // USA - Houston
  },
]}

            lineColor="#ffffff"
          />
        </div>

        {/* Call to Action */}
        {/* Call to action content can be added here */}
      </div>
    </section>
  )
}
