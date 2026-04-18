"use client"

import { WorldMap } from "@/components/ui/world-map"
import { motion } from "framer-motion"

export default function WorldMapSection() {
  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-bold text-4xl md:text-6xl text-white mb-4">
            Working around the{" "}
            <span className="text-neutral-400">
              {"Globe".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
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

            lineColor="#06b6d4"
          />
        </div>

        {/* Call to Action */}
        {/* Call to action content can be added here */}
      </div>
    </section>
  )
}
