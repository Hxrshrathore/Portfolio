"use client"

import Image from "next/image"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { usePageTransition } from "@/components/page-transition"

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => {
    const { navigateTo } = usePageTransition()

    const getStatusStyle = (status: string) => {
      switch (status) {
        case "ACTIVE":
          return { container: "bg-green-500/10 border-green-500/20 text-green-400", dot: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" }
        case "BUILDING":
          return { container: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500", dot: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" }
        case "ARCHIVED":
          return { container: "bg-slate-400/10 border-slate-400/20 text-slate-400", dot: "bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.4)]" }
        case "DOWN":
          return { container: "bg-red-500/10 border-red-500/20 text-red-400", dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" }
        case "PROTOTYPE":
          return { container: "bg-blue-500/10 border-blue-500/20 text-blue-400", dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" }
        default:
          return { container: "bg-gray-500/10 border-gray-500/20 text-gray-500", dot: "bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.4)]" }
      }
    }

    const styles = getStatusStyle(card.status)

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-neutral-900 overflow-hidden aspect-video w-full transition-all duration-300 ease-out cursor-pointer group/card border border-white/5 hover:border-white/20",
          hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50",
        )}
        onClick={() => {
          if (card.onClick) {
            card.onClick()
          } else if (card.href) {
            if (card.href.startsWith('/')) {
              navigateTo(card.href)
            } else {
              window.location.href = card.href
            }
          }
        }}
      >
        <Image src="/projects/test.png" alt={card.title} fill className="object-cover absolute inset-0 transition-transform duration-500 group-hover/card:scale-105" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 backdrop-blur-xl border uppercase",
            styles.container
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", styles.dot)} />
            {card.status}
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1 font-mono">
            {card.date}
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-2">
            {card.title}
          </div>
          <p className="text-xs text-white/70 line-clamp-2 max-w-[90%] font-light leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    )
  },
)

Card.displayName = "Card"

export function FocusCards({ cards }: { cards: any[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  )
}
