"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import InfiniteMenu from "./infinite-menu"
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

interface MetricDataPoint {
  month: string
  value: number
}

interface PortfolioItem {
  image: string
  logo: string
  link: string
  title: string
  description: string
  projectImage: string
  testimonial: string
  rating: number
  metrics: {
    conversionRate: string
    userGrowth: string
    label: string
    chartData: MetricDataPoint[]
  }
}

const portfolioItems: PortfolioItem[] = [
  {
    image: "/logo/kiitmun.png",
    logo: "/logo/kiitmun.png",
    link: "https://nutgram.vercel.app",
    title: "KIIT MUN",
    description: "Where elegant algorithms meet beautiful interfaces",
    projectImage: "/rip/frame6.png",
    testimonial: "Harsh delivered an outstanding website that perfectly captured the spirit of our Model UN conference. The design was both professional and engaging.",
    rating: 5,
    metrics: {
      conversionRate: "+18%",
      userGrowth: "3.2x",
      label: "Registrations",
      chartData: [
        { month: "Jan", value: 120 },
        { month: "Feb", value: 210 },
        { month: "Mar", value: 380 },
        { month: "Apr", value: 520 },
        { month: "May", value: 780 },
        { month: "Jun", value: 1100 },
      ],
    },
  },
  {
    image: "/rip/frame1.png",
    logo: "/logo/chimera.png",
    link: "https://nutgram.vercel.app",
    title: "Chimera 6.0",
    description: "Crafting experiences that feel effortlessly intuitive",
    projectImage: "/rip/frame1.png",
    testimonial: "The event website exceeded all expectations. Fast, responsive, and absolutely beautiful — our team couldn't be happier with the result.",
    rating: 5,
    metrics: {
      conversionRate: "+22%",
      userGrowth: "4x",
      label: "Attendees",
      chartData: [
        { month: "Jan", value: 80 },
        { month: "Feb", value: 160 },
        { month: "Mar", value: 290 },
        { month: "Apr", value: 480 },
        { month: "May", value: 700 },
        { month: "Jun", value: 1050 },
      ],
    },
  },
  {
    image: "/rip/frame2.png",
    logo: "/logo/ascent.png",
    link: "https://nutgram.vercel.app",
    title: "Acsent Coaching",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame2.png",
    testimonial: "Our student enrollment increased significantly after the website redesign. Clean interface, easy navigation — exactly what we needed.",
    rating: 4,
    metrics: {
      conversionRate: "+15%",
      userGrowth: "2.8x",
      label: "Enrollments",
      chartData: [
        { month: "Jan", value: 60 },
        { month: "Feb", value: 120 },
        { month: "Mar", value: 200 },
        { month: "Apr", value: 310 },
        { month: "May", value: 420 },
        { month: "Jun", value: 560 },
      ],
    },
  },
  {
    image: "/rip/frame3.png",
    logo: "/logo/bikash.png",
    link: "https://nutgram.vercel.app",
    title: "Bikash Vidalya",
    description: "Performance so fast, it feels like magic",
    projectImage: "/rip/frame3.png",
    testimonial: "Working with Harsh was a seamless experience. He understood our vision for an educational platform and brought it to life beautifully.",
    rating: 5,
    metrics: {
      conversionRate: "+19%",
      userGrowth: "3.5x",
      label: "Page Views",
      chartData: [
        { month: "Jan", value: 200 },
        { month: "Feb", value: 350 },
        { month: "Mar", value: 540 },
        { month: "Apr", value: 720 },
        { month: "May", value: 940 },
        { month: "Jun", value: 1300 },
      ],
    },
  },
  {
    image: "/rip/frame4.png",
    logo: "/logo/indura.png",
    link: "https://nutgram.vercel.app",
    title: "Indura School",
    description: "End-to-end solutions that just work",
    projectImage: "/rip/frame4.png",
    testimonial: "From initial concept to final deployment, the quality was consistent and impressive. Parents and students love the new digital presence.",
    rating: 5,
    metrics: {
      conversionRate: "+27%",
      userGrowth: "4.5x",
      label: "Enquiries",
      chartData: [
        { month: "Jan", value: 50 },
        { month: "Feb", value: 110 },
        { month: "Mar", value: 230 },
        { month: "Apr", value: 390 },
        { month: "May", value: 580 },
        { month: "Jun", value: 820 },
      ],
    },
  },
  {
    image: "/rip/frame5.png",
    logo: "/logo/hemsida.png",
    link: "https://nutgram.vercel.app",
    title: "Hemsida",
    description: "Building the future, one line of code at a time",
    projectImage: "/rip/frame5.png",
    testimonial: "Exceptional attention to detail and creative problem-solving. The website perfectly represents our brand identity.",
    rating: 5,
    metrics: {
      conversionRate: "+31%",
      userGrowth: "5x",
      label: "Conversions",
      chartData: [
        { month: "Jan", value: 90 },
        { month: "Feb", value: 180 },
        { month: "Mar", value: 330 },
        { month: "Apr", value: 500 },
        { month: "May", value: 750 },
        { month: "Jun", value: 1080 },
      ],
    },
  },
  {
    image: "/rip/frame7.png",
    logo: "/logo/dmc.png",
    link: "https://nutgram.vercel.app",
    title: "DMC School",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame7.png",
    testimonial: "Professional, reliable, and incredibly talented. Harsh transformed our outdated website into a modern digital experience.",
    rating: 4,
    metrics: {
      conversionRate: "+14%",
      userGrowth: "2.4x",
      label: "Sessions",
      chartData: [
        { month: "Jan", value: 180 },
        { month: "Feb", value: 260 },
        { month: "Mar", value: 370 },
        { month: "Apr", value: 490 },
        { month: "May", value: 620 },
        { month: "Jun", value: 820 },
      ],
    },
  },
  {
    image: "/rip/frame8.png",
    logo: "/logo/pandav.png",
    link: "https://nutgram.vercel.app",
    title: "Pandav Studio",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame8.png",
    testimonial: "The creative direction and technical execution were both outstanding. Our studio's online presence has never looked better.",
    rating: 5,
    metrics: {
      conversionRate: "+24%",
      userGrowth: "3.8x",
      label: "Bookings",
      chartData: [
        { month: "Jan", value: 30 },
        { month: "Feb", value: 75 },
        { month: "Mar", value: 140 },
        { month: "Apr", value: 230 },
        { month: "May", value: 370 },
        { month: "Jun", value: 540 },
      ],
    },
  },
  {
    image: "/rip/frame9.png",
    logo: "/logo/sunshine.png",
    link: "https://nutgram.vercel.app",
    title: "Sunshine School",
    description: "Designing moments that users never forget",
    projectImage: "/rip/frame9.png",
    testimonial: "A truly collaborative process. Harsh listened to our needs and delivered a website that is both functional and visually stunning.",
    rating: 5,
    metrics: {
      conversionRate: "+20%",
      userGrowth: "3.1x",
      label: "Applications",
      chartData: [
        { month: "Jan", value: 100 },
        { month: "Feb", value: 190 },
        { month: "Mar", value: 310 },
        { month: "Apr", value: 450 },
        { month: "May", value: 620 },
        { month: "Jun", value: 860 },
      ],
    },
  },
]

// Metrics Chart Card
function MetricsChart({ item, index }: { item: PortfolioItem; index: number }) {
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setAnimKey(prev => prev + 1)
  }, [index])

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">{item.metrics.label} Growth</span>
        </div>
        <span className="text-[8px] font-mono text-white/20">6-Month Impact</span>
      </div>

      {/* Stat Pills */}
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-1.5 text-center">
          <p className="text-emerald-400 text-base font-bold tracking-tight leading-none">{item.metrics.conversionRate}</p>
          <p className="text-white/30 text-[8px] font-mono uppercase tracking-widest mt-0.5">Conversion</p>
        </div>
        <div className="flex-1 rounded-lg bg-blue-500/10 border border-blue-500/20 px-2 py-1.5 text-center">
          <p className="text-blue-400 text-base font-bold tracking-tight leading-none">{item.metrics.userGrowth}</p>
          <p className="text-white/30 text-[8px] font-mono uppercase tracking-widest mt-0.5">User Growth</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[72px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart key={animKey} data={item.metrics.chartData} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id={`metricGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                fontSize: 11,
                color: "#fff",
              }}
              itemStyle={{ color: "#10b981" }}
              labelStyle={{ color: "rgba(255,255,255,0.4)" }}
              cursor={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={1.5}
              fill={`url(#metricGrad-${index})`}
              dot={false}
              activeDot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

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
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" as const },
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
  }, [])

  // Sync displayIndex reactively: commit only when globe is stopped
  // This avoids the race condition where onMovementChange(false) fires
  // before onActiveItemChange has updated activeIndexRef in the same frame
  useEffect(() => {
    if (!isGlobeMoving) {
      setDisplayIndex(activeIndexRef.current)
    }
  }, [isGlobeMoving, activeIndex])

  return (
    <section className="relative w-full h-screen min-h-0 bg-black overflow-hidden border-t border-white/5 flex flex-col">
      {/* Header */}
      <div className="text-center pt-6 pb-2 px-4 shrink-0">
        <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-1 tracking-tight px-2">
          Explore My Universe
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto px-4 tracking-wide">
          Navigate through a constellation of creativity.
        </p>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="flex-1 min-h-0 max-w-[1400px] w-full mx-auto px-4 md:px-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_260px] lg:grid-cols-[300px_1fr_300px] gap-4 items-center h-full">

          {/* ─── LEFT COLUMN: Client Info ─── */}
          <div className="hidden md:flex flex-col items-center gap-3 h-full justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-3 w-full"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={activeItem.logo}
                      alt={activeItem.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-50" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight text-center">
                  {activeItem.title}
                </h3>
                <MetricsChart item={activeItem} index={displayIndex} />
                <a
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-6 rounded-lg border border-white/15 bg-white/5
                           text-white text-xs font-medium tracking-wide text-center
                           hover:bg-white/10 hover:border-white/25 transition-all duration-300
                           backdrop-blur-sm"
                >
                  View Case Study →
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── CENTER COLUMN: Globe + Arrows ─── */}
          <div className="flex flex-col items-center h-full justify-center">
            {/* Globe */}
            <div className="h-[340px] sm:h-[380px] md:h-[400px] w-full relative">
              <InfiniteMenu
                items={portfolioItems}
                onNavigate={handleNavigate}
                hideOverlay={true}
                onActiveItemChange={handleActiveItemChange}
                onMovementChange={handleMovementChange}
              />
            </div>

            {/* Arrow Navigation */}
            <div className="flex gap-4 mt-2 z-20">
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
          <div className="hidden md:flex flex-col items-center gap-3 h-full justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${displayIndex}`}
                variants={sideContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-3 w-full"
              >
                {/* Testimonial Card */}
                <div className="w-full rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4">
                  <div className="text-white/10 text-3xl font-serif leading-none mb-2">"</div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-3">
                    {activeItem.testimonial}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
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

              {/* Metrics Chart (Mobile) */}
              <MetricsChart item={activeItem} index={displayIndex} />

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
