"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Calendar, Zap, LayoutGrid, Clock, ChevronDown } from "lucide-react"
import SilkLoader from "@/components/ui/silk"
// We'll replace Silk and CircularGallery with dynamic versions below
import { FocusCards } from "@/components/ui/focus-cards"
import Footer from "@/components/footer"
import { getAllProjects, type Project, type ProjectDomain, type ProjectStatus } from "@/lib/projects-data"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
// Import our custom scroll context instead of ScrollSmoother
import { useScroll } from "@/components/smooth-scroll"
import CircularGalleryLoader from "@/components/CircularGallery"
import dynamic from "next/dynamic"

const Silk = dynamic(() => import("@/components/ui/silk"), { ssr: false })
const CircularGallery = dynamic(() => import("@/components/CircularGallery"), { ssr: false })
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const DOMAINS: ProjectDomain[] = ["DATA ANALYST", "WEB DESIGN", "WEB DEVELOPMENT", "AI/ML", "GD"]
const STATUSES: ProjectStatus[] = ["ACTIVE", "BUILDING", "ARCHIVED", "DOWN", "PROTOTYPE"]

export default function ProjectsPage({ initialProjects }: { initialProjects: Project[] }) {
  const [mounted, setMounted] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomains, setSelectedDomains] = useState<ProjectDomain[]>([])
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "All">("All")
  const [selectedTime, setSelectedTime] = useState<string>("All")
  
  const { lenis } = useScroll()
  
  const filterRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const isFiltered = searchQuery !== "" || selectedDomains.length > 0 || selectedStatus !== "All" || selectedTime !== "All"

  const availableYears = useMemo(() => {
    if (!projects.length) return ["All"]
    const years = Array.from(new Set(projects.map(p => p.date.split(" ")[1])))
    return ["All", ...years.sort((a, b) => Number(b) - Number(a))]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(project.domain)
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
      const matchesTime = selectedTime === "All" || project.date.includes(selectedTime)

      return matchesSearch && matchesDomain && matchesStatus && matchesTime
    })
  }, [projects, searchQuery, selectedDomains, selectedStatus, selectedTime])

  useGSAP(() => {
    if (!mounted || isFiltered) return
    
    // Use ScrollTrigger to "pin" the header because native sticky 
    // doesn't work inside ScrollSmoother's content div.
    ScrollTrigger.create({
      trigger: filterRef.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [mounted, isFiltered])

  const scrollToSection = (domain: string) => {
    const section = sectionRefs.current[domain]
    if (section) {
      if (typeof window !== "undefined") {
        if (lenis) {
          // Lenis scrollTo natively handles offsets for headers nicely
          lenis.scrollTo(section, { offset: -120, duration: 1.2 })
        } else {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }
  }

  const toggleDomain = (domain: ProjectDomain) => {
    setSelectedDomains(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    )
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-40">
          <Silk speed={4.2} scale={1} color="#ffffff" noiseIntensity={0.9} rotation={0} />
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-32">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent"
          >
            Selected Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.25 }}
            className="text-base md:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed mb-4"
          >
            A curated showcase of architectural digital experiences, building the future of web design and AI technology.
          </motion.p>
          <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-12" style={{ height: '350px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.4 }}
              className="w-full h-full"
            >
              <CircularGallery 
                items={Array(12).fill({ image: "/projects/test.png", text: "ARCHITECTURAL DESIGN" })}
                bend={3} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollSpeed={2}
                scrollEase={0.06}
                font="bold 20px 'Geist', sans-serif"
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Filter System */}
      <section 
        ref={filterRef}
        className="relative z-50 bg-black/80 backdrop-blur-xl border-y border-white/5 py-6"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col gap-8">
            {/* Search & Main Selection */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by title, tech, or insight..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
                />
              </div>

              {/* Status & Time Dropdowns */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="flex-1 lg:flex-none relative group">
                  <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                    <Zap className="w-4 h-4 text-white/40" />
                    <select 
                      value={selectedStatus} 
                      onChange={(e) => setSelectedStatus(e.target.value as any)}
                      className="bg-transparent text-sm focus:outline-none appearance-none cursor-pointer pr-4"
                    >
                      <option value="All">All Status</option>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex-1 lg:flex-none relative group">
                  <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                    <Clock className="w-4 h-4 text-white/40" />
                    <select 
                      value={selectedTime} 
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="bg-transparent text-sm focus:outline-none appearance-none cursor-pointer pr-4"
                    >
                      <option value="All">All Time</option>
                      {availableYears.filter(y => y !== "All").map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Mutli-Select Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30 mr-2 font-bold">Domain:</span>
              {DOMAINS.map(domain => (
                <button
                  key={domain}
                  onClick={() => toggleDomain(domain)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all border backdrop-blur-md",
                    selectedDomains.includes(domain) 
                      ? "bg-white/10 text-white border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                  )}
                >
                  {domain}
                </button>
              ))}
              {selectedDomains.length > 0 && (
                <button 
                  onClick={() => setSelectedDomains([])}
                  className="text-[10px] text-white/20 hover:text-white underline underline-offset-4 ml-2"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Display */}
      <main className="container mx-auto px-6 max-w-7xl py-24">
        {isFiltered ? (
          /* Filtered Unified Grid */
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-white/40" />
                Filtered Results
                <span className="text-sm font-light text-white/20 font-mono tracking-tighter">
                  ({filteredProjects.length})
                </span>
              </h2>
            </div>
            
            {filteredProjects.length > 0 ? (
              <FocusCards 
                cards={filteredProjects.map(p => ({
                  ...p,
                  src: p.image,
                  href: `/projects/${p.slug}`
                }))} 
              />
            ) : (
              <div className="py-40 text-center">
                <p className="text-white/20 text-xl font-light italic">No projects matches your criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Domain Showcase View (Default) */
          <div className="space-y-32">
            {/* Quick Jump Bar */}
            <div className="flex items-center justify-center gap-6 pb-20 border-b border-white/5">
              {DOMAINS.map(domain => {
                const count = projects.filter(p => p.domain === domain).length
                if (count === 0) return null
                return (
                  <button
                    key={domain}
                    onClick={() => scrollToSection(domain)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 group-hover:text-white transition-colors">
                      {domain}
                    </span>
                    <span className="text-[8px] font-mono text-white/10 group-hover:text-white/40">
                      {count.toString().padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>

            {DOMAINS.map((domain) => {
              const domainProjects = projects.filter(p => p.domain === domain)
              if (domainProjects.length === 0) return null

              const featured = domainProjects.filter(p => p.featured).slice(0, 3)
              const rest = domainProjects.filter(p => !featured.find(f => f.id === p.id))

              return (
                <div 
                  key={domain} 
                  ref={(el) => { sectionRefs.current[domain] = el; }}
                  className="space-y-12 scroll-mt-40"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
                    <div className="space-y-1">
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        {domain}
                      </h2>
                      <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/20">
                        {domainProjects.length} Total Projects
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-[10px] font-bold tracking-widest text-white/30 uppercase group-hover:bg-white/10 transition-colors">
                      Editor&apos;s Choice Featured Area
                    </div>
                  </div>

                  {/* Featured Grid (Top 3) */}
                  <FocusCards 
                    cards={featured.map(p => ({
                      ...p,
                      src: p.image,
                      href: `/projects/${p.slug}`
                    }))} 
                  />

                  {/* Archive Section (The Rest) */}
                  {rest.length > 0 && (
                    <div className="pt-12 space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">
                          Project Archive
                        </span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rest.map((project, idx) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <CardListItem project={project} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function CardListItem({ project }: { project: Project }) {
  return (
    <a 
      href={`/projects/${project.slug}`}
      className="group block p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">
            {project.title}
          </h4>
          <p className="text-[10px] text-white/40 font-mono tracking-tight">
            {project.date}
          </p>
        </div>
        <div className={cn(
          "w-2 h-2 rounded-full",
          project.status === "ACTIVE" ? "bg-green-500" :
          project.status === "BUILDING" ? "bg-yellow-500" :
          project.status === "ARCHIVED" ? "bg-slate-500" :
          project.status === "DOWN" ? "bg-red-500" : "bg-blue-500"
        )} />
      </div>
      <p className="text-[10px] leading-relaxed text-white/30 line-clamp-2 italic font-light group-hover:text-white/50 transition-colors">
        {project.description}
      </p>
    </a>
  )
}
