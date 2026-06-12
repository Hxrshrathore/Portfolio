"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Safe helper to get session storage or generate a session ID
function getOrCreateSessionId() {
  if (typeof window === "undefined") return ""
  let id = sessionStorage.getItem("portfolio_session_id")
  if (!id) {
    id = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    sessionStorage.setItem("portfolio_session_id", id)
  }
  return id
}

// Simple browser and OS detection helpers
function getDeviceInfo() {
  if (typeof window === "undefined") return { device: "desktop", os: "unknown", browser: "unknown" }
  const ua = navigator.userAgent
  let device = "desktop"
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = "tablet"
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
    device = "mobile"
  }

  let os = "unknown"
  if (/Windows/i.test(ua)) os = "Windows"
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS"
  else if (/Android/i.test(ua)) os = "Android"
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS"
  else if (/Linux/i.test(ua)) os = "Linux"

  let browser = "unknown"
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr|opera/i.test(ua)) browser = "Chrome"
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari"
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox"
  else if (/edge|edg/i.test(ua)) browser = "Edge"
  else if (/opr|opera/i.test(ua)) browser = "Opera"

  return { device, os, browser }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentViewId = useRef<string | null>(null)
  const viewStartTime = useRef<number>(Date.now())
  const clickBuffer = useRef<{ xPercent: number; yPercent: number; element: string; pathname: string }[]>([])

  // Tracking page view on mount and pathname change
  useEffect(() => {
    // Skip tracking for admin paths to avoid inflating stats from the admin panel itself
    if (pathname.startsWith("/admin")) {
      return
    }

    const sessionId = getOrCreateSessionId()
    const { device, os, browser } = getDeviceInfo()
    const referrer = document.referrer || null

    const utmSource = searchParams.get("utm_source")
    const utmMedium = searchParams.get("utm_medium")
    const utmCampaign = searchParams.get("utm_campaign")
    const utmContent = searchParams.get("utm_content")
    const utmTerm = searchParams.get("utm_term")

    viewStartTime.current = Date.now()

    // Post page view to API
    const data = {
      sessionId,
      url: window.location.href,
      pathname,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      device,
      os,
      browser,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    }

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.id) {
          currentViewId.current = resData.id
        }
      })
      .catch((err) => console.error("Analytics track error:", err))

    // Duration update function on unmount
    return () => {
      if (currentViewId.current) {
        const duration = Math.round((Date.now() - viewStartTime.current) / 1000)
        // Send duration report via keepalive fetch
        fetch("/api/analytics/track", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: currentViewId.current, duration }),
          keepalive: true,
        }).catch(() => {})
      }
    }
  }, [pathname, searchParams])

  // Tracking heatmap clicks
  useEffect(() => {
    if (pathname.startsWith("/admin")) return

    const handleGlobalClick = (e: MouseEvent) => {
      const sessionId = getOrCreateSessionId()
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1
      const scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth || 1

      // Calculate coordinates relative to total document dimensions
      const xPercent = Math.round((e.pageX / scrollWidth) * 100)
      const yPercent = Math.round((e.pageY / scrollHeight) * 100)

      // Get short element selector representation
      const target = e.target as HTMLElement
      let elementSelector = target.tagName.toLowerCase()
      if (target.id) {
        elementSelector += `#${target.id}`
      } else if (target.className && typeof target.className === "string") {
        const firstClass = target.className.split(" ")[0]
        if (firstClass && !firstClass.includes(":")) {
          elementSelector += `.${firstClass}`
        }
      }

      clickBuffer.current.push({
        xPercent,
        yPercent,
        element: elementSelector.substring(0, 150),
        pathname,
      })
    }

    window.addEventListener("click", handleGlobalClick)

    // Flush clicks buffer to API every 5 seconds
    const intervalId = setInterval(() => {
      if (clickBuffer.current.length === 0) return

      const sessionId = getOrCreateSessionId()
      const payload = {
        sessionId,
        clicks: [...clickBuffer.current],
      }

      clickBuffer.current = []

      fetch("/api/analytics/heatmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("Heatmap send error:", err))
    }, 5000)

    return () => {
      window.removeEventListener("click", handleGlobalClick)
      clearInterval(intervalId)

      // Flush remaining clicks on page change
      if (clickBuffer.current.length > 0) {
        const sessionId = getOrCreateSessionId()
        fetch("/api/analytics/heatmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            clicks: clickBuffer.current,
          }),
          keepalive: true,
        }).catch(() => {})
        clickBuffer.current = []
      }
    }
  }, [pathname])

  return null
}
