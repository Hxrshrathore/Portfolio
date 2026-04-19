"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { WorldMap } from "@/components/ui/world-map"

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

const project = (lat: number, lng: number) => ({
  xPct: ((lng + 180) / 360) * 100,
  yPct: ((90 - lat) / 180) * 100,
})

const mapDots = CLIENTS.map((c) => ({
  start: INDIA,
  end: { lat: c.lat, lng: c.lng },
}))

export default function WorldMapSection() {
  const [activeClient, setActiveClient] = useState<number | null>(null)
  const totalProjects = useMemo(() => CLIENTS.reduce((s, c) => s + c.projects, 0), [])
  const projected = useMemo(() => CLIENTS.map((c) => project(c.lat, c.lng)), [])

  return (
    <section className="relative w-full bg-black py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.012] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ── Header ── */}
        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white/20 text-xs font-sans font-bold tracking-[0.3em] uppercase mb-4"
          >
            Global Reach
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 tracking-tight"
          >
            Based in India,{" "}
            <span className="italic font-light text-gray-400" style={{ WebkitTextFillColor: "rgba(156, 163, 175, 0.8)" }}>
              shipping worldwide
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Collaborating with teams and founders across continents — from concept to launch, timezone-proof.
          </motion.p>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center gap-10 md:gap-16 mb-16"
        >
          {[
            { value: `${CLIENTS.length}`, suffix: "+", label: "Countries" },
            { value: `${totalProjects}`, suffix: "+", label: "Projects Delivered" },
            { value: "24", suffix: "/7", label: "Availability" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                {stat.value}<span className="text-white/30">{stat.suffix}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Map ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-50 rounded-2xl border border-white/5 bg-white/[0.01]"
          data-no-cursor="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          
          <div className="relative w-full h-full">
            <WorldMap dots={mapDots} lineColor="#ffffff" />
            
            {/* Extremely lightweight CSS-only target dots */}
            <div className="absolute inset-0 pointer-events-none">
              {CLIENTS.map((client, i) => {
                const isActive = activeClient === i
                return (
                  <div
                    key={client.country}
                    className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full transition-all duration-300 pointer-events-none"
                    style={{
                      left: `${projected[i].xPct}%`,
                      top: `${projected[i].yPct}%`,
                      backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.0)",
                      boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.8)" : "none",
                      transform: isActive ? "scale(1.5)" : "scale(1)",
                      zIndex: isActive ? 20 : 0
                    }}
                  >
                    {isActive && (
                      <div className="absolute -inset-2 rounded-full bg-white/20 animate-ping" />
                    )}
                    
                    {/* CSS-only Tooltip */}
                    <div
                      className={`absolute transition-all duration-300 z-[999] ${projected[i].yPct < 45 ? "top-full mt-4" : "bottom-full mb-4"}`}
                      style={{
                        // Dynamically shift anchor to prevent edge overflow
                        left: projected[i].xPct > 80 ? "auto" : projected[i].xPct < 20 ? "0" : "50%",
                        right: projected[i].xPct > 80 ? "0" : "auto",
                        transform: `translateX(${projected[i].xPct > 80 ? "0%" : projected[i].xPct < 20 ? "0%" : "-50%"}) scale(${isActive ? 1 : 0.8})`,
                        opacity: isActive ? 1 : 0,
                        transformOrigin: `${projected[i].yPct < 45 ? "top" : "bottom"} ${projected[i].xPct > 80 ? "right" : projected[i].xPct < 20 ? "left" : "center"}`,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Bright glow behind the active card */}
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-xl -z-10" />
                      
                      <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-2xl whitespace-nowrap relative">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">{client.flag}</span>
                          <span className="text-white font-bold text-sm tracking-wide">{client.country}</span>
                        </div>
                        <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-mono">
                          {client.label}
                        </div>
                        <div className="text-white/80 text-xs mt-2 flex items-center gap-1.5 font-medium">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
                          {client.projects} {client.projects === 1 ? "project" : "projects"} delivered
                        </div>
                      </div>
                      
                      {/* Dynamic tooltip arrow - flips top/bottom based on yPct */}
                      <div 
                        className={`absolute w-3 h-3 bg-black/90 border-white/20 rotate-45 ${
                          projected[i].yPct < 45 
                            ? "bottom-full border-l border-t -mb-1.5" 
                            : "top-full border-r border-b -mt-1.5"
                        }`}
                        style={{
                           left: projected[i].xPct > 80 ? "auto" : projected[i].xPct < 20 ? "16px" : "50%",
                           right: projected[i].xPct > 80 ? "16px" : "auto",
                           transform: projected[i].xPct > 80 || projected[i].xPct < 20 ? "none" : "translateX(-50%)"
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Interactive Country Pills ── */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5" data-no-cursor="true">
          {CLIENTS.map((client, i) => {
            // Use simple math: active = 1.0, inactive = 0.4 base opacity
            const o = activeClient === null ? 0.5 : (activeClient === i ? 1 : 0.3)
            return (
              <div
                key={client.country}
                onMouseEnter={() => setActiveClient(i)}
                onMouseLeave={() => setActiveClient(null)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/5 bg-white/[0.02] cursor-default select-none"
                style={{
                  opacity: o,
                  transition: "opacity 0.2s ease",
                }}
              >
                <span className="text-base">{client.flag}</span>
                <span className="text-xs font-medium text-white/70 tracking-wide">
                  {client.country}
                </span>
                <span className="text-[9px] text-white/30 font-mono">
                  {client.label}
                </span>
                <span className="text-[10px] font-mono text-white/20 tabular-nums ml-1">
                  ×{client.projects}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
