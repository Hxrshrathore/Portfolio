"use client"

import React from "react"
import { gsap } from "gsap"

interface MenuItemProps {
  link: string
  text: string
  image?: string
  images?: string[]
  index?: number
  isActiveOnMobile?: boolean
  onSelectMobile?: () => void
}

interface FlowingMenuProps {
  items?: MenuItemProps[]
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null)
  const menuContainerRef = React.useRef<HTMLDivElement>(null)

  // Mobile: ensure strictly ONE menu item is active at a time based on viewport center proximity
  React.useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
    if (!isMobile) return

    const handleScroll = () => {
      if (!menuContainerRef.current) return
      const containerRect = menuContainerRef.current.getBoundingClientRect()
      const vh = window.innerHeight || 800

      // Out of view: deactivate all
      if (containerRect.bottom < 0 || containerRect.top > vh) {
        setActiveIdx(null)
        return
      }

      const itemElements = Array.from(
        menuContainerRef.current.querySelectorAll<HTMLElement>("[data-menu-item]")
      )
      if (!itemElements.length) return

      const viewportCenter = vh / 2
      let closestIdx = -1
      let minDistance = Infinity

      itemElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2
        const dist = Math.abs(itemCenter - viewportCenter)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = idx
        }
      })

      // Only activate if the single closest item is within the focal focus band
      if (closestIdx !== -1 && minDistance < vh * 0.25) {
        setActiveIdx(closestIdx)
      } else {
        setActiveIdx(null)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items.length])

  return (
    <div ref={menuContainerRef} className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            index={idx}
            isActiveOnMobile={activeIdx === idx}
            onSelectMobile={() => setActiveIdx(idx)}
            {...item}
          />
        ))}
      </nav>
    </div>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  images,
  isActiveOnMobile = false,
  onSelectMobile,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null)
  const marqueeRef = React.useRef<HTMLDivElement>(null)
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null)
  const animationTlRef = React.useRef<gsap.core.Timeline | null>(null)
  const isCurrentlyActiveRef = React.useRef(false)

  const animationDefaults = { duration: 0.5, ease: "expo" }

  const animateIn = (edge: "top" | "bottom" = "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
    isCurrentlyActiveRef.current = true
    animationTlRef.current?.kill()
    animationTlRef.current = gsap.timeline({ defaults: animationDefaults })
    animationTlRef.current
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" })
  }

  const animateOut = (edge: "top" | "bottom" = "top") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
    isCurrentlyActiveRef.current = false
    animationTlRef.current?.kill()
    animationTlRef.current = gsap.timeline({ defaults: animationDefaults })
    animationTlRef.current
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
  }

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2)
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2)
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom"
  }

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 768) return // Ignore hover on mobile
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    animateIn(edge)
  }

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 768) return // Ignore hover on mobile
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    animateOut(edge)
  }

  // Handle single-active highlight on mobile
  React.useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
    if (!isMobile) return

    if (isActiveOnMobile) {
      if (!isCurrentlyActiveRef.current) {
        animateIn("bottom")
      }
    } else {
      if (isCurrentlyActiveRef.current) {
        animateOut("top")
      }
    }
  }, [isActiveOnMobile])

  React.useEffect(() => {
    return () => {
      animationTlRef.current?.kill()
    }
  }, [])

  const imageList = React.useMemo(() => {
    if (images && images.length > 0) return images
    if (image) return [image]
    return []
  }, [image, images])

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, idx) => {
      const currentImage = imageList.length > 0 ? imageList[idx % imageList.length] : ""
      return (
        <React.Fragment key={idx}>
          <span className="text-[#060010] uppercase font-normal text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl leading-[1.2] p-[1vh_1vw_0] whitespace-nowrap self-center tracking-tight">
            {text}
          </span>
          <div
            className="w-[180px] md:w-[240px] h-[calc(100%-12px)] md:h-[calc(100%-16px)] my-auto mx-[1.5vw] rounded-lg bg-cover bg-center shrink-0 border border-black/10 shadow-sm overflow-hidden"
            style={{ backgroundImage: currentImage ? `url(${currentImage})` : undefined }}
          />
        </React.Fragment>
      )
    })
  }, [text, imageList])

  return (
    <div
      data-menu-item="true"
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
      ref={itemRef}
      style={{ willChange: "transform" }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl whitespace-nowrap px-3 sm:px-4 hover:text-[#060010] focus:text-white focus-visible:text-[#060010] tracking-tight"
        href={link}
        onClick={(e) => {
          if (typeof window !== "undefined" && window.innerWidth <= 768) {
            onSelectMobile?.()
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-no-cursor="true"
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
        style={{ willChange: "transform" }}
      >
        <div className="h-full w-full flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-max will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowingMenu
