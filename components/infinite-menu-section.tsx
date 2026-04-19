"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface PortfolioItem {
  image: string
  logo: string
  link: string
  title: string
  description: string
  projectImage: string
  testimonial: string
  rating: number
}

const portfolioItems: PortfolioItem[] = [
  {
    image: "/logo/kiitmun.png",
    logo: "/logo/kiitmun.png",
    link: "https://github.com",
    title: "KIIT MUN",
    description: "Where elegant algorithms meet beautiful interfaces",
    projectImage: "/rip/frame6.png",
    testimonial: "Harsh delivered an outstanding website that perfectly captured the spirit of our Model UN conference. The design was both professional and engaging.",
    rating: 5,
  },
  {
    image: "/rip/frame1.png",
    logo: "/logo/chimera.png",
    link: "https://dribbble.com",
    title: "Chimera 6.0",
    description: "Crafting experiences that feel effortlessly intuitive",
    projectImage: "/rip/frame1.png",
    testimonial: "The event website exceeded all expectations. Fast, responsive, and absolutely beautiful — our team couldn't be happier with the result.",
    rating: 5,
  },
  {
    image: "/rip/frame2.png",
    logo: "/logo/ascent.png",
    link: "https://behance.net",
    title: "Acsent Coaching",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame2.png",
    testimonial: "Our student enrollment increased significantly after the website redesign. Clean interface, easy navigation — exactly what we needed.",
    rating: 4,
  },
  {
    image: "/rip/frame3.png",
    logo: "/logo/bikash.png",
    link: "https://linkedin.com",
    title: "Bikash Vidalya",
    description: "Performance so fast, it feels like magic",
    projectImage: "/rip/frame3.png",
    testimonial: "Working with Harsh was a seamless experience. He understood our vision for an educational platform and brought it to life beautifully.",
    rating: 5,
  },
  {
    image: "/rip/frame4.png",
    logo: "/logo/indura.png",
    link: "https://twitter.com",
    title: "Indura School",
    description: "End-to-end solutions that just work",
    projectImage: "/rip/frame4.png",
    testimonial: "From initial concept to final deployment, the quality was consistent and impressive. Parents and students love the new digital presence.",
    rating: 5,
  },
  {
    image: "/rip/frame5.png",
    logo: "/logo/hemsida.png",
    link: "https://instagram.com",
    title: "Hemsida",
    description: "Building the future, one line of code at a time",
    projectImage: "/rip/frame5.png",
    testimonial: "Exceptional attention to detail and creative problem-solving. The website perfectly represents our brand identity.",
    rating: 5,
  },
  {
    image: "/rip/frame7.png",
    logo: "/logo/dmc.png",
    link: "https://behance.net",
    title: "DMC School",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame7.png",
    testimonial: "Professional, reliable, and incredibly talented. Harsh transformed our outdated website into a modern digital experience.",
    rating: 4,
  },
  {
    image: "/rip/frame8.png",
    logo: "/logo/pandav.png",
    link: "https://behance.net",
    title: "Pandav Studio",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame8.png",
    testimonial: "The creative direction and technical execution were both outstanding. Our studio's online presence has never looked better.",
    rating: 5,
  },
  {
    image: "/rip/frame9.png",
    logo: "/logo/sunshine.png",
    link: "https://behance.net",
    title: "Sunshine School",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame9.png",
    testimonial: "A truly collaborative process. Harsh listened to our needs and delivered a website that is both functional and visually stunning.",
    rating: 5,
  },
]

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-white text-white"
              : "fill-transparent text-white/20"
          }`}
        />
      ))}
      <span className="text-white/40 text-xs ml-2 font-mono">
        {rating}.0
      </span>
    </div>
  )
}

// Animation variants
const sideContentVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export default function InfiniteMenuSection() {
  const [canNavigate, setCanNavigate] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isGlobeMoving, setIsGlobeMoving] = useState(false)

  // Ref always holds the latest activeIndex — avoids stale closure in callbacks
  const activeIndexRef = useRef(0)

  const activeItem = portfolioItems[displayIndex]

  const handleNavigate = (direction: "prev" | "next") => {
    if (!canNavigate) return
    setCanNavigate(false)
    if ((window as any).__infiniteMenuNavigate) {
      ;(window as any).__infiniteMenuNavigate(direction)
    }
    setTimeout(() => setCanNavigate(true), 800)
  }

  const handleActiveItemChange = useCallback((index: number) => {
    const mapped = index % portfolioItems.length
    setActiveIndex(mapped)
    activeIndexRef.current = mapped // keep ref in sync every frame
  }, [])

  const handleMovementChange = useCallback((moving: boolean) => {
    setIsGlobeMoving(moving)
    // Read from ref — not stale closure — so we get the real settled index
    if (!moving) {
      setDisplayIndex(activeIndexRef.current)
    }
  }, []) // empty deps: stable callback, reads latest via ref

  return (
    <section className="relative w-full bg-black overflow-hidden border-t border-white/5">
      {/* Header — closer to the content */}
      <div className="text-center pt-16 pb-6 px-4">
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4 tracking-tight">
          Explore My Universe
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 tracking-wide">
          Navigate through a constellation of creativity.
        </p>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] lg:grid-cols-[320px_1fr_320px] gap-6 items-center">

          {/* ─── LEFT COLUMN: Client Info ─── */}
          <div className="hidden md:flex flex-col items-center gap-6 min-h-[500px] justify-center">
            <motion.div
              animate={{ opacity: isGlobeMoving ? 0.3 : 1, filter: isGlobeMoving ? "blur(4px)" : "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full flex flex-col items-center"
            >
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-5 w-full"
              >
                {/* Client Logo Circle */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={activeItem.logo}
                      alt={activeItem.title}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  {/* Subtle glow ring */}
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-50" />
                </div>

                {/* Client Name */}
                <h3 className="text-xl font-bold text-white tracking-tight text-center">
                  {activeItem.title}
                </h3>

                {/* Project Preview Image */}
                <div className="w-full aspect-[4/3] rounded-lg border border-white/10 overflow-hidden bg-white/5">
                  <img
                    src={activeItem.projectImage}
                    alt={`${activeItem.title} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* View Case Study Button */}
                <a
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-lg border border-white/15 bg-white/5 
                           text-white text-sm font-medium tracking-wide text-center
                           hover:bg-white/10 hover:border-white/25 transition-all duration-300
                           backdrop-blur-sm"
                >
                  View Case Study →
                </a>
              </motion.div>
            </AnimatePresence>
            </motion.div>
          </div>

          {/* ─── CENTER COLUMN: Globe + Arrows ─── */}
          <div className="flex flex-col items-center">
            {/* Globe */}
            <div className="h-[400px] sm:h-[500px] md:h-[520px] w-full relative">
              <InfiniteMenu
                items={portfolioItems}
                onNavigate={handleNavigate}
                hideOverlay={true}
                onActiveItemChange={handleActiveItemChange}
                onMovementChange={handleMovementChange}
              />
            </div>

            {/* Arrow Navigation */}
            <div className="flex gap-4 mt-4 z-20">
              <button
                onClick={() => handleNavigate("prev")}
                disabled={!canNavigate}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         flex items-center justify-center text-white/60 
                         hover:bg-white/10 hover:text-white hover:border-white/25 
                         transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {portfolioItems.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === displayIndex
                        ? "w-6 h-1.5 bg-white/60"
                        : "w-1.5 h-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNavigate("next")}
                disabled={!canNavigate}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         flex items-center justify-center text-white/60 
                         hover:bg-white/10 hover:text-white hover:border-white/25 
                         transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Testimonial + Rating ─── */}
          <div className="hidden md:flex flex-col items-center gap-6 min-h-[500px] justify-center">
            <motion.div
              animate={{ opacity: isGlobeMoving ? 0.3 : 1, filter: isGlobeMoving ? "blur(4px)" : "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full flex flex-col"
            >
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5 w-full"
              >
                {/* Testimonial Card */}
                <div className="w-full rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
                  {/* Quote mark */}
                  <div className="text-white/10 text-5xl font-serif leading-none mb-3">"</div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {activeItem.testimonial}
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                      <img
                        src={activeItem.logo}
                        alt={activeItem.title}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {activeItem.title}
                      </p>
                      <p className="text-white/30 text-[10px]">Client</p>
                    </div>
                  </div>
                </div>

                {/* Star Rating Card */}
                <div className="w-full rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 flex flex-col items-center gap-3">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
                    Client Satisfaction
                  </p>
                  <StarRating rating={activeItem.rating} />
                </div>
              </motion.div>
            </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ─── MOBILE: Info below globe ─── */}
        <div className="md:hidden mt-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${displayIndex}`}
              variants={sideContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Client info row */}
              <div className="flex items-center gap-4 px-2">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img
                    src={activeItem.logo}
                    alt={activeItem.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                  <p className="text-gray-400 text-sm">{activeItem.description}</p>
                </div>
              </div>

              {/* Project image */}
              <div className="w-full aspect-video rounded-lg border border-white/10 overflow-hidden">
                <img
                  src={activeItem.projectImage}
                  alt={`${activeItem.title} preview`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Testimonial */}
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  "{activeItem.testimonial}"
                </p>
                <StarRating rating={activeItem.rating} />
              </div>

              {/* CTA */}
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg border border-white/15 bg-white/5 
                         text-white text-sm font-medium tracking-wide text-center
                         hover:bg-white/10 transition-all"
              >
                View Case Study →
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
