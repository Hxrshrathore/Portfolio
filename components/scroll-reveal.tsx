"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "fade",
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const getVariants = () => {
    const baseVariants = {
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      },
    }

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          ...baseVariants,
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          ...baseVariants,
        }
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          ...baseVariants,
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          ...baseVariants,
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          ...baseVariants,
        }
      default:
        return {
          hidden: { opacity: 0 },
          ...baseVariants,
        }
    }
  }

  return (
    <motion.div ref={ref} variants={getVariants()} initial="hidden" animate={controls} className={className}>
      {children}
    </motion.div>
  )
}
