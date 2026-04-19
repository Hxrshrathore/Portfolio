"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const fullData = [
  { name: "Jan", before: 72, after: 92 },
  { name: "Feb", before: 65, after: 94 },
  { name: "Mar", before: 70, after: 96 },
  { name: "Apr", before: 62, after: 95 },
  { name: "May", before: 68, after: 97 },
  { name: "Jun", before: 60, after: 98 },
  { name: "Jul", before: 55, after: 99 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 11,
          color: "#fff",
          backdropFilter: "blur(8px)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>{label}</p>
        {payload.map((entry: any, i: number) => (
          <p
            key={i}
            style={{
              margin: 0,
              color: entry.color,
              fontSize: 10,
            }}
          >
            {entry.name === "after" ? "Optimized" : "Before"}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function BentoPerformanceChart() {
  const [data, setData] = useState<typeof fullData>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Animate data points in one by one
    const timers: NodeJS.Timeout[] = []
    fullData.forEach((point, i) => {
      const timer = setTimeout(() => {
        setData((prev) => [...prev, point])
      }, 300 + i * 200)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 4px 4px",
        pointerEvents: "auto",
        zIndex: 5,
      }}
    >
      {/* Metric badges */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 4,
          fontSize: 10,
        }}
      >
        <span
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 99,
            padding: "2px 10px",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          LCP <span style={{ color: "#4ade80", fontWeight: 700 }}>-62%</span>
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 99,
            padding: "2px 10px",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          FCP <span style={{ color: "#4ade80", fontWeight: 700 }}>-48%</span>
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 8, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="perfAfter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="perfBefore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666666" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#666666" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }}
          />
          <YAxis
            domain={[40, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 9, fill: "rgba(255,255,255,0.2)" }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Area
            type="monotone"
            dataKey="before"
            stroke="#555555"
            strokeWidth={1.5}
            fill="url(#perfBefore)"
            dot={false}
            animationDuration={1200}
            animationEasing="ease-in-out"
          />
          <Area
            type="monotone"
            dataKey="after"
            stroke="#ffffff"
            strokeWidth={2}
            fill="url(#perfAfter)"
            dot={false}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          fontSize: 9,
          color: "rgba(255,255,255,0.35)",
          marginTop: 2,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 8,
              height: 2,
              background: "#555",
              display: "inline-block",
              borderRadius: 1,
            }}
          />
          Before
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 8,
              height: 2,
              background: "#fff",
              display: "inline-block",
              borderRadius: 1,
            }}
          />
          Optimized
        </span>
      </div>
    </div>
  )
}
