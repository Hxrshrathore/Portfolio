"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { WorldMap } from "@/components/ui/world-map"
import { MapPin } from "lucide-react"

interface HubInfo {
  region: string
  flag: string
  lat: number
  lng: number
  timezone: string
  label: string
  status: string
}

const COLLABORATION_HUBS: HubInfo[] = [
  { region: "India (HQ)", flag: "🇮🇳", lat: 20.2961, lng: 85.8245, timezone: "UTC+5:30", label: "Bhubaneswar · Base Timezone", status: "Base" },
  { region: "North America (East)", flag: "🇺🇸", lat: 40.7128, lng: -74.006, timezone: "UTC-5", label: "EST · Potential Morning Sync", status: "Overlap Window" },
  { region: "North America (West)", flag: "🇺🇸", lat: 37.7749, lng: -122.4194, timezone: "UTC-8", label: "PST · Evening Collaboration", status: "Overlap Window" },
  { region: "United Kingdom & EU", flag: "🇪🇺", lat: 51.5074, lng: -0.1278, timezone: "UTC+0/+1", label: "GMT / CET · Afternoon Overlap", status: "Overlap Window" },
  { region: "Southeast Asia", flag: "🇸🇬", lat: 1.3521, lng: 103.8198, timezone: "UTC+8", label: "SGT · Daytime Overlap", status: "Overlap Window" },
  { region: "Australia", flag: "🇦🇺", lat: -33.8688, lng: 151.2093, timezone: "UTC+10", label: "AEST · Early Morning Sync", status: "Overlap Window" },
]

const BHUBANESWAR = { lat: 20.2961, lng: 85.8245 }

const mapDots = COLLABORATION_HUBS.filter(h => h.region !== "India (HQ)").map((h) => ({
  start: BHUBANESWAR,
  end: { lat: h.lat, lng: h.lng },
}))

export default function WorldMapSection() {
  const [activeHub, setActiveHub] = useState<number | null>(null)

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
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase">Timezone Compatibility</span>
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
              <span className="italic font-light text-zinc-400">open to remote collaboration</span>
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
              { value: "Remote", suffix: "", label: "Capability" },
              { value: "UTC+5:30", suffix: "", label: "Base Timezone" },
              { value: "Async", suffix: " Friendly", label: "Communication" },
            ].map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums leading-none">
                  {stat.value}<span className="text-zinc-400 font-light text-base md:text-lg">{stat.suffix}</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mt-1 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Main Content: Map + Regional Hub Cards ── */}
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

          {/* Regional Hub Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[280px] xl:w-[320px] shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto"
            data-no-cursor="true"
          >
            {COLLABORATION_HUBS.map((hub, i) => {
              const isActive = activeHub === i
              return (
                <motion.div
                  key={hub.region}
                  onMouseEnter={() => setActiveHub(i)}
                  onMouseLeave={() => setActiveHub(null)}
                  onClick={() => setActiveHub(isActive ? null : i)}
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
                      {hub.flag}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] md:text-xs font-semibold tracking-wide truncate transition-colors duration-300 ${isActive ? "text-white" : "text-white/60"}`}>
                          {hub.region}
                        </span>
                        <span className={`text-[10px] font-mono tabular-nums shrink-0 transition-colors duration-300 ${isActive ? "text-white/70" : "text-white/30"}`}>
                          {hub.timezone}
                        </span>
                      </div>
                      <span className={`text-[8px] md:text-[9px] font-mono tracking-wider transition-colors duration-300 block truncate ${isActive ? "text-white/40" : "text-white/20"}`}>
                        {hub.label}
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
