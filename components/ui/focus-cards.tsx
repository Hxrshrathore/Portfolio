"use client"

import Image from "next/image"
import React, { useState } from "react"
import { cn } from "@/lib/utils"

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
    const getStatusColor = (status: string) => {
      switch (status) {
        case "ACTIVE":
          return "bg-green-500"
        case "BUILDING":
          return "bg-yellow-500"
        case "ARCHIVED":
          return "bg-slate-400"
        case "DOWN":
          return "bg-red-500"
        case "PROTOTYPE":
          return "bg-blue-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer group/card border border-white/5 hover:border-white/20",
          hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50",
        )}
        onClick={() => {
          if (card.onClick) {
            card.onClick()
          } else if (card.href) {
            window.location.href = card.href
          }
        }}
      >
        <Image src={card.src || "/placeholder.svg"} alt={card.title} fill className="object-cover absolute inset-0 transition-transform duration-500 group-hover/card:scale-105" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-white flex items-center gap-1.5 backdrop-blur-md border border-white/10",
            getStatusColor(card.status)
          )}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  )
}
