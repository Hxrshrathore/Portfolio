"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { WorldMap } from "@/components/ui/world-map"
import { MapPin } from "lucide-react"

interface ClientInfo {
  country: string
  flag: string
  lat: number
  lng: number
  projects: number
  label: string
}

const CLIENTS: ClientInfo[] = [
  { country: "United States", flag: "🇺🇸", lat: 37.0902, lng: -95.7129, projects: 12, label: "NY · LA · Chicago" },
  { country: "Germany", flag: "🇩🇪", lat: 51.1657, lng: 10.4515, projects: 3, label: "Berlin · Munich" },
  { country: "Italy", flag: "🇮🇹", lat: 41.8719, lng: 12.5674, projects: 2, label: "Rome · Milan" },
  { country: "Austria", flag: "🇦🇹", lat: 48.2082, lng: 16.3738, projects: 1, label: "Vienna" },
  { country: "Australia", flag: "🇦🇺", lat: -33.8688, lng: 151.2093, projects: 2, label: "Sydney" },
  { country: "Vietnam", flag: "🇻🇳", lat: 14.0583, lng: 108.2772, projects: 1, label: "Ho Chi Minh City" },
]

const INDIA = { lat: 20.5937, lng: 78.9629 }

const mapDots = CLIENTS.map((c) => ({
  start: INDIA,
  end: { lat: c.lat, lng: c.lng },
}))

export default function WorldMapSection() {
  const [activeClient, setActiveClient] = useState<number | null>(null)
  const totalProjects = useMemo(() => CLIENTS.reduce((s, c) => s + c.projects, 0), [])

  return (
    <section className="relative w-full bg-black overflow-hidden border-t border-white/5 h-screen min-h-[680px] max-h-[1000px]">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.015] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col" style={{ paddingTop: "clamp(100px, 14vh, 140px)" }}>

        {/* ── Top: Title Row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8 shrink-0">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-3"
            >
              <MapPin className="w-3 h-3 text-white/20" />
              <span className="text-white/25 text-[10px] font-bold tracking-[0.3em] uppercase">Global Reach</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-transparent">Based in India,</span>
              <br />
              <span className="italic font-light text-white/40">shipping worldwide</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-6 md:gap-10"
          >
            {[
              { value: `${CLIENTS.length}`, suffix: "+", label: "Countries" },
              { value: `${totalProjects}`, suffix: "+", label: "Projects" },
              { value: "24", suffix: "/7", label: "Availability" },
            ].map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums leading-none">
                  {stat.value}<span className="text-white/25 font-light">{stat.suffix}</span>
                </div>
                <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/25 mt-1 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Main Content: Map + Country Cards ── */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 md:gap-5 pb-6">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] flex-1 min-h-0 overflow-hidden"
            data-no-cursor="true"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none rounded-2xl" />
            <div className="relative w-full h-full">
              <WorldMap dots={mapDots} lineColor="#ffffff" />
            </div>
          </motion.div>

          {/* Country Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[280px] xl:w-[320px] shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto"
            data-no-cursor="true"
          >
            {CLIENTS.map((client, i) => {
              const isActive = activeClient === i
              return (
                <motion.div
                  key={client.country}
                  onMouseEnter={() => setActiveClient(i)}
                  onMouseLeave={() => setActiveClient(null)}
                  onClick={() => setActiveClient(isActive ? null : i)}
                  className={`
                    relative group cursor-default select-none rounded-xl
                    border transition-all duration-300 overflow-hidden
                    min-w-[140px] lg:min-w-0 flex-1 lg:flex-initial
                    ${isActive
                      ? "bg-white/[0.08] border-white/15"
                      : "bg-white/[0.02] border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05]"
                    }
                  `}
                >
                  <div className="relative flex items-center gap-3 px-4 py-3 lg:py-2.5">
                    {/* Flag */}
                    <span className={`text-xl md:text-2xl leading-none transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                      {client.flag}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] md:text-xs font-semibold tracking-wide truncate transition-colors duration-300 ${isActive ? "text-white" : "text-white/60"}`}>
                          {client.country}
                        </span>
                        <span className={`text-[10px] font-mono tabular-nums shrink-0 transition-colors duration-300 ${isActive ? "text-white/50" : "text-white/20"}`}>
                          ×{client.projects}
                        </span>
                      </div>
                      <span className={`text-[8px] md:text-[9px] font-mono tracking-wider transition-colors duration-300 block truncate ${isActive ? "text-white/40" : "text-white/20"}`}>
                        {client.label}
                      </span>
                    </div>

                    {/* Active indicator dot */}
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${isActive ? "bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "bg-white/10"}`} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
