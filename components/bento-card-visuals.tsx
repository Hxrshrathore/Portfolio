"use client"

import { useEffect, useState, useRef, useCallback } from "react"

/* ═══════════════════════════════════════════════
   SHARED UTILITIES — Performance primitives
   ═══════════════════════════════════════════════ */

/**
 * Custom hook: pauses animation loop when element is off-screen.
 * Uses IntersectionObserver for zero-cost visibility detection.
 * Defaults to true so animations start immediately — observer
 * only pauses when the element is scrolled well off-screen.
 */
function useIsVisible(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Small delay to let Lenis and the layout settle before observing
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.05, rootMargin: "100px" }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, 500)

    return () => clearTimeout(timeout)
  }, [ref])

  return isVisible
}

/**
 * Custom hook: tracks normalized cursor position within a container.
 * Returns values in [-1, 1] range from center, with (0,0) = center.
 * Uses passive listeners and avoids state updates on every frame.
 */
function useCursorPosition(ref: React.RefObject<HTMLElement | null>) {
  const pos = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      pos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pos.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      pos.current.active = true
    }

    const handleLeave = () => {
      pos.current.active = false
    }

    el.addEventListener("mousemove", handleMove, { passive: true })
    el.addEventListener("mouseleave", handleLeave, { passive: true })

    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [ref])

  return pos
}

/* ═══════════════════════════════════════════════════
   1. TECH STACK VISUAL — Cursor-reactive floating pills
   ═══════════════════════════════════════════════════ */

const techItems = [
  { name: "React",      x: 12, y: 18 },
  { name: "Next.js",    x: 55, y: 12 },
  { name: "TypeScript",  x: 28, y: 50 },
  { name: "Python",     x: 65, y: 44 },
  { name: "Figma",      x: 10, y: 74 },
  { name: "Node.js",    x: 72, y: 70 },
  { name: "GSAP",       x: 42, y: 32 },
  { name: "Tailwind",   x: 80, y: 25 },
]

export function BentoTechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRefs = useRef<(HTMLDivElement | null)[]>([])
  const isVisible = useIsVisible(containerRef)
  const cursor = useCursorPosition(containerRef)
  const rafId = useRef(0)
  const time = useRef(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || !isVisible) {
      cancelAnimationFrame(rafId.current)
      return
    }

    const animate = () => {
      time.current += 0.008
      const cx = cursor.current.x
      const cy = cursor.current.y
      const active = cursor.current.active

      pillRefs.current.forEach((pill, i) => {
        if (!pill) return
        // Base floating motion — unique per pill using index offset
        const phase = time.current + i * 0.7
        const baseX = Math.sin(phase * 1.1) * 4
        const baseY = Math.cos(phase * 0.9) * 5

        // Cursor repulsion: pills shift away from cursor position
        let cursorOffX = 0, cursorOffY = 0
        if (active) {
          const pillNormX = (techItems[i].x / 100) * 2 - 1
          const pillNormY = (techItems[i].y / 100) * 2 - 1
          const dx = pillNormX - cx
          const dy = pillNormY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const force = Math.max(0, 1 - dist / 0.8) * 12
          cursorOffX = (dx / (dist + 0.01)) * force
          cursorOffY = (dy / (dist + 0.01)) * force
        }

        pill.style.transform = `translate3d(${baseX + cursorOffX}px, ${baseY + cursorOffY}px, 0)`
        pill.style.opacity = active
          ? `${0.5 + Math.max(0, 1 - Math.hypot((techItems[i].x / 100) * 2 - 1 - cx, (techItems[i].y / 100) * 2 - 1 - cy) / 0.6) * 0.5}`
          : "0.6"
      })
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [mounted, isVisible, cursor])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        pointerEvents: "auto", zIndex: 5, overflow: "hidden",
      }}
    >
      {/* Connecting lines — static SVG, GPU composited */}
      <svg
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          opacity: 0.06, willChange: "auto",
        }}
      >
        {techItems.map((item, i) =>
          techItems.slice(i + 1).map((other, j) => {
            const dist = Math.hypot(item.x - other.x, item.y - other.y)
            if (dist > 45) return null
            return (
              <line
                key={`${i}-${j}`}
                x1={`${item.x + 5}%`} y1={`${item.y + 3}%`}
                x2={`${other.x + 5}%`} y2={`${other.y + 3}%`}
                stroke="white" strokeWidth="0.5"
              />
            )
          })
        )}
      </svg>

      {/* Tech pills */}
      {techItems.map((item, i) => (
        <div
          key={i}
          ref={(el) => { pillRefs.current[i] = el }}
          style={{
            position: "absolute",
            left: `${item.x}%`, top: `${item.y}%`,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 10,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "monospace",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   2. CODE SNIPPET VISUAL — Typing editor with cursor glow
   ═══════════════════════════════════════════════════ */

const codeLines = [
  { indent: 0, text: "const portfolio = {",  color: "#c9d1d9" },
  { indent: 1, text: "designer: true,",      color: "#79c0ff" },
  { indent: 1, text: "developer: true,",     color: "#79c0ff" },
  { indent: 1, text: "passion: '∞',",        color: "#a5d6ff" },
  { indent: 1, text: "coffee: 'essential',", color: "#a5d6ff" },
  { indent: 1, text: "build: () => '🚀',",   color: "#d2a8ff" },
  { indent: 0, text: "};",                   color: "#c9d1d9" },
]

export function BentoCodeSnippet() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(containerRef)
  const cursor = useCursorPosition(containerRef)
  const [visibleLines, setVisibleLines] = useState(0)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const rafId = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  // Typing animation — only runs when visible
  useEffect(() => {
    if (!mounted || !isVisible) return

    timerRef.current = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          setTimeout(() => setVisibleLines(0), 1500)
          return prev
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(timerRef.current)
  }, [mounted, isVisible])

  // Cursor-following glow — RAF loop
  useEffect(() => {
    if (!mounted || !isVisible) {
      cancelAnimationFrame(rafId.current)
      return
    }

    const animate = () => {
      if (glowRef.current && cursor.current.active) {
        const x = (cursor.current.x + 1) * 50
        const y = (cursor.current.y + 1) * 50
        glowRef.current.style.background =
          `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
        glowRef.current.style.opacity = "1"
      } else if (glowRef.current) {
        glowRef.current.style.opacity = "0"
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [mounted, isVisible, cursor])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "auto", zIndex: 5, overflow: "hidden",
        padding: "12px",
      }}
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          opacity: 0, transition: "opacity 0.3s ease",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <div
        style={{
          width: "92%", height: "85%",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
          fontFamily: "'Geist Mono', 'SF Mono', monospace",
          fontSize: 10,
          position: "relative", zIndex: 1,
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex", gap: 5,
            padding: "8px 10px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        </div>

        {/* Code content */}
        <div style={{ padding: "8px 12px", lineHeight: 1.8 }}>
          {codeLines.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: i < visibleLines ? 1 : 0,
                transform: i < visibleLines ? "translate3d(0,0,0)" : "translate3d(0,4px,0)",
                transition: "all 0.3s ease",
                paddingLeft: line.indent * 16,
                display: "flex", alignItems: "center", gap: 6,
                willChange: i < visibleLines ? "auto" : "transform, opacity",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 9, width: 16, textAlign: "right", flexShrink: 0 }}>
                {i + 1}
              </span>
              <span style={{ color: line.color, opacity: 0.7 }}>{line.text}</span>
            </div>
          ))}
          {/* Blinking cursor — pure CSS animation, zero JS cost */}
          <div
            style={{
              display: "inline-block", width: 6, height: 12,
              background: "rgba(255,255,255,0.5)",
              marginLeft: 22,
              animation: "bentoCodeCursor 1s step-end infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bentoCodeCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   3. STACK LAYERS VISUAL — Cursor-reactive 3D layers
   ═══════════════════════════════════════════════════ */

const layers = [
  { label: "Frontend",  tech: "React · Next.js",       y: 15 },
  { label: "API Layer", tech: "REST · GraphQL",         y: 38 },
  { label: "Backend",   tech: "Node · Python",          y: 58 },
  { label: "Database",  tech: "PostgreSQL · MongoDB",   y: 76 },
]

export function BentoStackLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRef = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(containerRef)
  const cursor = useCursorPosition(containerRef)
  const [mounted, setMounted] = useState(false)
  const rafId = useRef(0)
  const time = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || !isVisible) {
      cancelAnimationFrame(rafId.current)
      return
    }

    const animate = () => {
      time.current += 0.012
      const cx = cursor.current.x
      const cy = cursor.current.y
      const active = cursor.current.active

      // Determine which layer the cursor is closest to
      let closestLayer = -1
      if (active) {
        let minDist = Infinity
        layers.forEach((layer, i) => {
          const layerNormY = (layer.y / 100) * 2 - 1
          const dist = Math.abs(cy - layerNormY)
          if (dist < minDist) { minDist = dist; closestLayer = i }
        })
      }

      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const isActive = i === closestLayer
        const scale = [1, 0.92, 0.84, 0.76][i]

        // Cursor parallax: layers shift based on cursor position
        const parallaxX = active ? cx * (4 - i) * 2 : 0
        const parallaxY = active ? cy * (4 - i) * 1 : 0

        el.style.transform = `translate3d(${parallaxX}px, ${parallaxY + (isActive ? -3 : 0)}px, 0) scaleX(${scale})`
        el.style.borderColor = `rgba(255,255,255,${isActive ? 0.22 : 0.07})`
        el.style.background = `rgba(255,255,255,${isActive ? 0.07 : 0.02})`
        el.style.boxShadow = isActive
          ? "0 0 20px rgba(255,255,255,0.04), inset 0 0 12px rgba(255,255,255,0.02)"
          : "none"

        // Update text brightness
        const labelEl = el.firstElementChild as HTMLElement
        const techEl = el.lastElementChild as HTMLElement
        if (labelEl) labelEl.style.color = `rgba(255,255,255,${isActive ? 0.85 : 0.3})`
        if (techEl) techEl.style.color = `rgba(255,255,255,${isActive ? 0.5 : 0.18})`
      })

      // Data flow dot
      if (dotRef.current) {
        const t = (time.current * 0.35) % 1
        dotRef.current.style.top = `${t * 100}%`
        dotRef.current.style.opacity = `${Math.sin(t * Math.PI) * 0.6}`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [mounted, isVisible, cursor])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "auto", zIndex: 5, overflow: "hidden",
        perspective: 600,
      }}
    >
      <div
        style={{
          position: "relative", width: "82%", height: "88%",
          transformStyle: "preserve-3d",
          transform: "rotateX(22deg) rotateZ(-1.5deg)",
        }}
      >
        {layers.map((layer, i) => (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el }}
            style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${layer.y}%`,
              height: 40,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              willChange: "transform, border-color, background",
              backfaceVisibility: "hidden",
              transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em", transition: "color 0.25s" }}>
              {layer.label}
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", fontFamily: "monospace", transition: "color 0.25s" }}>
              {layer.tech}
            </span>
          </div>
        ))}

        {/* Data flow line + dot */}
        <div style={{ position: "absolute", left: "50%", top: "18%", width: 1, height: "72%", background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.01))", zIndex: -1 }}>
          <div
            ref={dotRef}
            style={{
              position: "absolute", left: -2,
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 8px rgba(255,255,255,0.3)",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   4. STATS COUNTER — IntersectionObserver triggered
   ═══════════════════════════════════════════════════ */

const stats = [
  { label: "Projects",  value: 25,   suffix: "+" },
  { label: "Clients",   value: 15,   suffix: "+" },
  { label: "Uptime",    value: 99.9, suffix: "%", decimal: true },
]

export function BentoStatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const glowRef = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(containerRef)
  const cursor = useCursorPosition(containerRef)
  const [mounted, setMounted] = useState(false)
  const hasAnimated = useRef(false)
  const rafId = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  // Count-up animation — fires once when first visible
  useEffect(() => {
    if (!mounted || !isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i]
        if (!el) return
        const val = stat.value * eased
        el.textContent = (stat.decimal ? (Math.round(val * 10) / 10).toFixed(1) : Math.round(val).toString()) + stat.suffix
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [mounted, isVisible])

  // Cursor glow — lightweight RAF
  useEffect(() => {
    if (!mounted || !isVisible) {
      cancelAnimationFrame(rafId.current)
      return
    }

    const animate = () => {
      if (glowRef.current) {
        if (cursor.current.active) {
          const x = (cursor.current.x + 1) * 50
          const y = (cursor.current.y + 1) * 50
          glowRef.current.style.background =
            `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.05) 0%, transparent 55%)`
          glowRef.current.style.opacity = "1"
        } else {
          glowRef.current.style.opacity = "0"
        }
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [mounted, isVisible, cursor])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "auto", zIndex: 5,
        gap: 6, padding: 16,
      }}
    >
      {/* Cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          opacity: 0, transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "center", gap: 6,
            width: "100%", padding: "8px 0",
            borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            position: "relative", zIndex: 1,
          }}
        >
          <span
            ref={(el) => { numberRefs.current[i] = el }}
            style={{
              fontSize: 28, fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Geist', sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums", // prevents layout shift during counting
            }}
          >
            0{stat.suffix}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 500,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
