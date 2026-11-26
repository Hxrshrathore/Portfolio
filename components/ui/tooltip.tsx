"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CustomTooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

/**
 * Reusable Custom Pill Tooltip
 * Standardized across the portfolio matching the hero-portfolio-transition design.
 */
export function CustomTooltip({
  content,
  position = "top",
  children,
  className,
  contentClassName,
  ...props
}: CustomTooltipProps) {
  const positionClasses = {
    top: "-top-10 left-1/2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0",
    bottom: "-bottom-10 left-1/2 -translate-x-1/2 -translate-y-1 group-hover:translate-y-0",
    left: "right-[calc(100%+10px)] top-1/2 -translate-y-1/2 translate-x-1.5 group-hover:translate-x-0",
    right: "left-[calc(100%+10px)] top-1/2 -translate-y-1/2 -translate-x-1.5 group-hover:translate-x-0",
  }

  return (
    <div className={cn("group relative inline-flex items-center", className)} {...props}>
      <div
        className={cn(
          "absolute pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 z-50",
          positionClasses[position]
        )}
      >
        <div
          className={cn(
            "flex items-center px-3 py-1 rounded-full bg-zinc-950/95 text-white text-[11px] sm:text-xs font-medium tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md whitespace-nowrap",
            contentClassName
          )}
        >
          {content}
        </div>
      </div>
      {children}
    </div>
  )
}

/**
 * Direct Tooltip Pill for manual positioning inside existing group containers
 */
export function TooltipPill({
  children,
  className,
  position = "top",
}: {
  children: React.ReactNode
  className?: string
  position?: "top" | "bottom" | "left" | "right"
}) {
  const positionClasses = {
    top: "-top-10 left-1/2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0",
    bottom: "-bottom-10 left-1/2 -translate-x-1/2 -translate-y-1 group-hover:translate-y-0",
    left: "right-[calc(100%+10px)] top-1/2 -translate-y-1/2 translate-x-1.5 group-hover:translate-x-0",
    right: "left-[calc(100%+10px)] top-1/2 -translate-y-1/2 -translate-x-1.5 group-hover:translate-x-0",
  }

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 z-50",
        positionClasses[position],
        className
      )}
    >
      <div className="flex items-center px-3 py-1 rounded-full bg-zinc-950/95 text-white text-[11px] sm:text-xs font-medium tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md whitespace-nowrap">
        {children}
      </div>
    </div>
  )
}
