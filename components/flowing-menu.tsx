"use client"

import React from "react"
import { gsap } from "gsap"

interface MenuItemProps {
  link: string
  text: string
  image: string
}

interface FlowingMenuProps {
  items?: MenuItemProps[]
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null)
  const marqueeRef = React.useRef<HTMLDivElement>(null)
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null)
  const animationTlRef = React.useRef<gsap.core.Timeline | null>(null)

  const animationDefaults = { duration: 0.6, ease: "expo" }

  const animateIn = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
    animationTlRef.current?.kill()
    animationTlRef.current = gsap.timeline({ defaults: animationDefaults })
    animationTlRef.current
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" })
  }

  const animateOut = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
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

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0] whitespace-nowrap">{text}</span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ))
  }, [text, image])

  React.useEffect(() => {
    const isMobile = window.innerWidth <= 768
    let observer: IntersectionObserver | null = null

    if (isMobile && itemRef.current) {
      // Intersection Observer logic for mobile midway trigger
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateIn("bottom")
            } else {
              animateOut("top")
            }
          })
        },
        {
          // Root margin defines the active zone in the center of the viewport
          rootMargin: "-42% 0% -42% 0%",
          threshold: 0,
        }
      )

      observer.observe(itemRef.current)
    }

    return () => {
      animationTlRef.current?.kill()
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
      ref={itemRef}
      style={{ willChange: "transform" }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        href={link}
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
