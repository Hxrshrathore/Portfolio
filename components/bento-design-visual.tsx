"use client"

import { useEffect, useState } from "react"

export default function BentoDesignVisual() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      {/* Layered UI Frames */}
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "70%",
        }}
      >
        {/* Back layer - large wireframe */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "65%",
            height: "70%",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            background: "rgba(255,255,255,0.02)",
            animation: "designFloat1 6s ease-in-out infinite",
          }}
        >
          {/* Header bar */}
          <div
            style={{
              height: 6,
              margin: "8px 8px 0",
              borderRadius: 3,
              background: "rgba(255,255,255,0.06)",
            }}
          />
          {/* Content lines */}
          <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ height: 3, width: "80%", borderRadius: 2, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ height: 3, width: "60%", borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
            <div style={{ height: 3, width: "70%", borderRadius: 2, background: "rgba(255,255,255,0.03)" }} />
          </div>
          {/* Placeholder blocks */}
          <div style={{ display: "flex", gap: 4, padding: "0 8px" }}>
            <div
              style={{
                width: "45%",
                height: 20,
                borderRadius: 4,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
            <div
              style={{
                width: "45%",
                height: 20,
                borderRadius: 4,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          </div>
        </div>

        {/* Mid layer - component card */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: "8%",
            width: "50%",
            height: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(4px)",
            animation: "designFloat2 5s ease-in-out infinite",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Circle avatar */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              margin: "10px auto 6px",
            }}
          />
          {/* Text lines */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ height: 3, width: "50%", borderRadius: 2, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ height: 3, width: "35%", borderRadius: 2, background: "rgba(255,255,255,0.05)" }} />
          </div>
          {/* Button */}
          <div
            style={{
              width: "40%",
              height: 8,
              borderRadius: 4,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              margin: "8px auto 0",
            }}
          />
        </div>

        {/* Front layer - floating element */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "15%",
            width: "35%",
            height: "22%",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            animation: "designFloat3 7s ease-in-out infinite",
            boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 8px",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            <div style={{ height: 3, width: "80%", borderRadius: 2, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ height: 3, width: "55%", borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>

        {/* Decorative cursor */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "25%",
            width: 0,
            height: 0,
            borderLeft: "6px solid rgba(255,255,255,0.25)",
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
            animation: "designCursor 4s ease-in-out infinite",
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.15))",
          }}
        />
      </div>

      <style>{`
        @keyframes designFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3px, -5px) rotate(-0.5deg); }
        }
        @keyframes designFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-4px, 3px) rotate(0.8deg); }
          66% { transform: translate(2px, -3px) rotate(-0.3deg); }
        }
        @keyframes designFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5px, -4px) scale(1.02); }
        }
        @keyframes designCursor {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          25% { transform: translate(-15px, 10px); opacity: 1; }
          50% { transform: translate(-8px, 20px); opacity: 0.8; }
          75% { transform: translate(5px, 5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
