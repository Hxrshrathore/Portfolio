"use client"

import { useEffect } from "react"

export default function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // These are the actual box-shadow values from globals.css bat animation
    // Format: each frame is an array of [x, y, color] pixel positions
    const frames = [
      // Frame 0% - extracted from CSS
      parseBoxShadow(
        "33px 6px, 34px 6px, 35px 6px, 36px 6px, 20px 7px, 21px 7px, 22px 7px, 23px 7px, 33px 7px, 34px 7px, 37px 7px, 38px 7px, 39px 7px, 43px 7px, 20px 8px, 21px 8px, 22px 8px, 23px 8px, 33px 8px, 34px 8px, 37px 8px, 38px 8px, 39px 8px, 43px 8px, 17px 9px, 18px 9px, 19px 9px, 20px 9px, 35px 9px, 40px 9px, 41px 9px, 42px 9px, 44px 9px, 45px 9px, 16px 10px, 20px 10px, 36px 10px, 44px 10px, 45px 10px, 16px 11px, 20px 11px, 36px 11px, 44px 11px, 45px 11px, 13px 12px, 14px 12px, 15px 12px, 18px 12px, 19px 12px, 20px 12px, 36px 12px, 37px 12px, 38px 12px, 44px 12px, 45px 12px",
      ),
      // Frame 14.3%
      parseBoxShadow(
        "17px 7px, 37px 7px, 38px 7px, 17px 8px, 37px 8px, 38px 8px, 16px 9px, 18px 9px, 19px 9px, 36px 9px, 39px 9px, 43px 9px, 44px 9px, 45px 9px, 14px 10px, 15px 10px, 37px 10px, 38px 10px, 43px 10px, 46px 10px, 14px 11px, 15px 11px, 37px 11px, 38px 11px, 43px 11px, 46px 11px, 10px 12px, 11px 12px, 13px 12px, 37px 12px, 38px 12px, 41px 12px, 42px 12px, 43px 12px, 47px 12px",
      ),
      // Frame 28.6%
      parseBoxShadow(
        "16px 14px, 17px 14px, 43px 14px, 44px 14px, 45px 14px, 16px 15px, 17px 15px, 43px 15px, 44px 15px, 45px 15px, 12px 16px, 13px 16px, 43px 16px, 44px 16px, 45px 16px, 12px 17px, 13px 17px, 40px 18px, 44px 18px, 45px 18px, 47px 18px, 40px 19px, 44px 19px, 45px 19px, 47px 19px, 12px 20px, 40px 20px, 47px 20px, 48px 20px, 49px 20px",
      ),
      // Frame 42.9%
      parseBoxShadow(
        "47px 14px, 47px 15px, 14px 16px, 15px 16px, 28px 20px, 29px 20px, 30px 20px, 48px 20px, 49px 20px, 18px 21px, 19px 21px, 20px 21px, 21px 21px, 22px 21px, 23px 21px, 27px 21px, 29px 21px, 30px 21px, 20px 22px, 24px 22px, 25px 22px, 26px 22px, 27px 22px, 31px 22px",
      ),
      // Frame 57.2%
      parseBoxShadow(
        "31px 16px, 32px 16px, 31px 17px, 32px 17px, 20px 18px, 21px 18px, 28px 18px, 29px 18px, 30px 18px, 33px 18px, 34px 18px, 20px 19px, 21px 19px, 28px 19px, 29px 19px, 30px 19px, 33px 19px, 34px 19px, 20px 20px, 22px 20px, 23px 20px, 27px 20px, 30px 20px, 33px 20px, 34px 20px",
      ),
      // Frame 71.5%
      parseBoxShadow(
        "32px 15px, 33px 15px, 34px 15px, 32px 16px, 33px 16px, 34px 16px, 31px 17px, 35px 17px, 21px 18px, 28px 18px, 29px 18px, 30px 18px, 36px 18px, 21px 19px, 28px 19px, 29px 19px, 30px 19px, 36px 19px, 20px 20px, 22px 20px, 23px 20px, 27px 20px, 30px 20px, 36px 20px",
      ),
      // Frame 85.8%
      parseBoxShadow(
        "35px 14px, 35px 15px, 33px 16px, 34px 16px, 37px 16px, 38px 16px, 33px 17px, 34px 17px, 37px 17px, 38px 17px, 32px 18px, 35px 18px, 36px 18px, 32px 19px, 35px 19px, 36px 19px",
      ),
    ]

    function parseBoxShadow(shadowStr: string): Array<[number, number]> {
      const pixels: Array<[number, number]> = []
      const parts = shadowStr.split(",")
      parts.forEach((part) => {
        const match = part.trim().match(/(\d+)px\s+(\d+)px/)
        if (match) {
          pixels.push([Number.parseInt(match[1]), Number.parseInt(match[2])])
        }
      })
      return pixels
    }

    let currentFrame = 0

    const drawBat = (pixels: Array<[number, number]>) => {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 32, 32)

      ctx.fillStyle = "#000000"

      // Scale and offset to fit in 32x32 canvas
      // Original bat is roughly 60x40px, scale to fit
      const scale = 0.5
      const offsetX = -8
      const offsetY = -2

      pixels.forEach(([x, y]) => {
        const scaledX = Math.floor((x + offsetX) * scale)
        const scaledY = Math.floor((y + offsetY) * scale)
        if (scaledX >= 0 && scaledX < 32 && scaledY >= 0 && scaledY < 32) {
          ctx.fillRect(scaledX, scaledY, 1, 1)
        }
      })
    }

    const updateFavicon = () => {
      drawBat(frames[currentFrame])
      const dataUrl = canvas.toDataURL("image/png")

      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
      if (!link) {
        link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)
      }
      link.href = dataUrl

      currentFrame = (currentFrame + 1) % frames.length
    }

    // Skip animation entirely on mobile — just show a static frame
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768

    const interval = setInterval(updateFavicon, isMobile ? 500 : 150)

    updateFavicon()

    return () => clearInterval(interval)
  }, [])

  return null
}
