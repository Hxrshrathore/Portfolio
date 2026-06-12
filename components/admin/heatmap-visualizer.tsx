"use client"

import { useEffect, useRef, useState } from "react"
import { getHeatmapClicks } from "@/app/actions/admin"
import { Loader2, RefreshCw, Layers, ZoomIn } from "lucide-react"

interface ClickPoint {
  xPercent: number
  yPercent: number
}

interface HeatmapVisualizerProps {
  availablePaths: string[]
}

export default function HeatmapVisualizer({ availablePaths }: HeatmapVisualizerProps) {
  const [selectedPath, setSelectedPath] = useState(availablePaths[0] || "/")
  const [clicks, setClicks] = useState<ClickPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [radius, setRadius] = useState(25)
  const [intensity, setIntensity] = useState(0.4)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const fetchClicks = async () => {
    setLoading(true)
    try {
      const data = await getHeatmapClicks(selectedPath, 30)
      setClicks(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchClicks()
  }, [selectedPath])

  // Redraw canvas whenever clicks list or radius/intensity changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (clicks.length === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("No clicks recorded on this page yet", canvas.width / 2, canvas.height / 2)
      return
    }

    // Set blend mode for heat glow overlay
    ctx.globalCompositeOperation = "screen"

    clicks.forEach((point) => {
      const x = (point.xPercent / 100) * canvas.width
      const y = (point.yPercent / 100) * canvas.height

      // Radial gradient for glow effect
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
      grad.addColorStop(0, `rgba(255, 255, 255, ${intensity})`) // monochrome white heat
      grad.addColorStop(0.3, `rgba(180, 180, 180, ${intensity * 0.4})`) // silver glow
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [clicks, radius, intensity])

  return (
    <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-5 font-mono select-none">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-neutral-500" />
            Click Heatmap Overlay
          </h3>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Visualization of click density zones across page templates</p>
        </div>

        {/* Path Selection */}
        <div className="flex items-center gap-3">
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-mono font-medium outline-none focus:border-white/30 text-neutral-400 cursor-pointer"
          >
            {availablePaths.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button
            onClick={fetchClicks}
            disabled={loading}
            className="rounded-lg border border-neutral-800 bg-neutral-950 p-1.5 hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-neutral-450 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Adjusters Row */}
      <div className="grid gap-4 rounded-lg border border-neutral-900 bg-neutral-950/60 p-4 sm:grid-cols-2 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
        {/* Glow Radius */}
        <div className="space-y-1.5">
          <span className="font-mono">Glow Spot Radius: {radius}px</span>
          <input
            type="range"
            min={10}
            max={80}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Spot Intensity */}
        <div className="space-y-1.5">
          <span className="font-mono">Intensity Overlay: {Math.round(intensity * 100)}%</span>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.05}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>
      </div>

      {/* Canvas Viewport Representation */}
      <div className="relative flex justify-center">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}

        <div className="relative w-full aspect-video max-w-4xl border border-neutral-900 bg-neutral-950 rounded-lg overflow-hidden shadow-inner shadow-black">
          {/* Mock background representing your site sections */}
          <div className="absolute inset-0 p-4 opacity-[0.03] select-none flex flex-col justify-between pointer-events-none text-[8px] font-mono leading-relaxed text-white">
            <div className="flex justify-between items-center border-b border-white pb-2">
              <span>NAVBAR BRAND</span>
              <div className="flex gap-2">
                <span>PROJECTS</span>
                <span>BLOG</span>
                <span>CONTACT</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <span className="text-lg font-bold">HERO SECTION TITLE</span>
              <span>CALL TO ACTION BUTTONS</span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white pt-2">
              <span>BENTO BOX 1</span>
              <span>BENTO BOX 2</span>
              <span>BENTO BOX 3</span>
            </div>
          </div>

          {/* Actual Canvas */}
          <canvas
            ref={canvasRef}
            width={900}
            height={500}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      <div className="text-center text-[9px] text-neutral-600 uppercase tracking-wider">
        Heatmap matches coordinates recorded relative to viewport dimensions. Active points: {clicks.length} nodes.
      </div>
    </div>
  )
}
