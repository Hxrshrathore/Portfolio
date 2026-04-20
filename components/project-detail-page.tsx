"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import Iridescence from "@/components/ui/iridescence"
import BlurText from "@/components/ui/blur-text"
import type { Project } from "@/lib/projects-data"
import Hyperspeed, { hyperspeedPresets } from "@/components/hyperspeed"
import { FocusCards } from "@/components/ui/focus-cards"
import { CaseStudyCharts } from "@/components/case-study-charts"
import CountUp from "@/components/ui/count-up"
import { usePageTransition } from "@/components/page-transition"
import { cn } from "@/lib/utils"

interface ProjectDetailPageProps {
  project: Project
  relatedProjects?: Project[]
}

export default function ProjectDetailPage({ project, relatedProjects = [] }: ProjectDetailPageProps) {
  const [mounted, setMounted] = useState(false)
  const { navigateTo } = usePageTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const renderProcessContent = (contentType?: string) => {
    if (!contentType) return null

    switch (contentType) {
      case "gradient-cyan-emerald":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Research & Planning</span>
          </div>
        )
      case "gradient-orange-yellow":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Performance Optimization</span>
          </div>
        )
      case "gradient-purple-pink":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Testing & Deployment</span>
          </div>
        )
      case "gradient-blue-purple":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Requirements Analysis</span>
          </div>
        )
      case "gradient-green-teal":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Frontend Implementation</span>
          </div>
        )
      case "gradient-red-orange":
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg">
            <span className="text-lg font-semibold">Launch & Scaling</span>
          </div>
        )
      case "image":
        return (
          <div className="flex h-full w-full items-center justify-center text-white">
            <img
              src="/placeholder.svg?height=300&width=300"
              width={300}
              height={300}
              className="h-full w-full object-cover rounded-lg"
              alt="Project implementation"
            />
          </div>
        )
      default:
        return (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-lg">
            <span className="text-lg font-semibold">Process Step</span>
          </div>
        )
    }
  }

  const processContent =
    project.process?.map((step) => ({
      title: step.title,
      description: step.description,
      content: renderProcessContent(step.contentType),
    })) || []

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Hyperspeed Background */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <Hyperspeed effectOptions={hyperspeedPresets.two} className="absolute inset-0 z-0" />
        
        {/* Bottom Blend Overlay to match homepage */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-[1]" />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status Badge */}
            <div className="mb-6 md:mb-8 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
              >
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  project.status === "ACTIVE" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                )}></div>
                <span className="text-white/70 text-xs md:text-sm font-bold tracking-widest uppercase">
                  {project.status} <span className="mx-2 text-white/20">•</span> {project.category}
                </span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tighter bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent px-2"
            >
              {project.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant="outline"
                onClick={() => navigateTo("/projects")}
                className="w-full sm:w-auto bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-white/10 rounded-full px-8 py-6 text-xs md:text-sm font-bold tracking-widest uppercase transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
              
              {project.demoUrl && (
                <Button 
                  asChild 
                  className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-10 py-6 text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95"
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Launch Experience
                  </a>
                </Button>
              )}
              
              {project.githubUrl && (
                <Button
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 rounded-full px-8 py-6 text-xs md:text-sm font-bold tracking-widest uppercase tracking-widest transition-all"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Project Overview */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-white/20" />
                <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-white/30">The Challenge</h2>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight leading-tight">
                Solving complex <span className="italic font-light text-white/40">digital problems</span> through research & design.
              </h3>
              
              <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed max-w-4xl">
                {project.longDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-1/3 w-full grid grid-cols-1 gap-6"
            >
              {/* Info Cards */}
              {[
                { label: "Category", value: project.category, icon: <Calendar className="w-4 h-4 text-white/40" /> },
                { label: "Status", value: project.status, icon: <Award className="w-4 h-4 text-white/40" /> },
                { label: "Year", value: project.date.split(' ')[1], icon: <div className="w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white/40 border border-white/20 rounded">YR</div> },
              ].map((info, i) => (
                <div 
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      {info.icon}
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">{info.label}</span>
                    </div>
                    <p className="text-lg font-medium text-white/90">{info.value}</p>
                  </div>
                </div>
              ))}
              
              {/* Tags Cloud */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-4 block">Focus Areas</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold tracking-wider text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Large Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-24 relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-white/10 to-transparent blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={project.heroImage || project.image}
                alt={project.title}
                className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Stack</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical <span className="text-white/30 font-light italic">Foundations</span></h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-sm font-mono max-w-xs text-right hidden md:block"
            >
              A curated selection of tools and frameworks used to bring this vision to life.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {project.technologies?.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className="relative z-10">
                  <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{tech}</span>
                </div>
                {/* Micro-glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      {processContent.length > 0 && (
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Execution</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Development <span className="italic font-light text-white/40">Journey</span></h2>
              <p className="text-gray-500 text-sm md:text-base max-w-2xl font-light">From initial research to final deployment—how we built it.</p>
            </motion.div>
            
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 md:p-8 overflow-hidden backdrop-blur-sm">
              <StickyScrollReveal content={processContent} />
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Crucial <span className="text-red-400/60 font-light italic">Obstacles</span></h3>
              </div>
              <div className="space-y-4">
                {project.challenges?.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative p-6 rounded-2xl bg-red-950/5 border border-red-900/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed font-light">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Technical <span className="text-green-400/60 font-light italic">Resolutions</span></h3>
              </div>
              <div className="space-y-4">
                {project.solutions?.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative p-6 rounded-2xl bg-green-950/5 border border-green-900/10 hover:border-green-500/20 transition-all duration-300"
                  >
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed font-light">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Award className="w-4 h-4 text-white/60" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Outcomes & Impact</span>
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-white/90 underline-offset-8 decoration-white/10">The <span className="italic font-light text-white/40">Impact</span> & Results</h2>
          </div>

          <CaseStudyCharts metrics={project.metrics || []} />
          
          {/* Legacy Results (Optional fallback/text) */}
          {(!project.metrics || project.metrics.length === 0) && project.results && project.results.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 opacity-50">
              {project.results?.map((result, index) => (
                <div key={index} className="text-center group">
                  <p className="text-sm font-mono text-white/40 uppercase tracking-widest">{result}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
 
      {/* Call to Action Section */}
      <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-black overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
              READY TO START YOUR<br />NEXT <span className="italic font-light text-white/50">BIG THING?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're looking for a partner in design or technical depth, I'm here to bring your vision to life.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => navigateTo("/contact")}
                className="group relative overflow-hidden bg-white text-black rounded-full px-10 py-8 md:px-12 md:py-10 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  WORK WITH ME
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Projects - Infinite Loop Section */}
      {relatedProjects.length > 0 && (
        <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
          {/* Silk background overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }} 
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex justify-between items-end mb-16 px-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-white/40" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Discovery</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic font-light opacity-80">Keep Exploring</h2>
              </motion.div>
              
              <Button
                variant="outline"
                onClick={() => navigateTo("/projects")}
                className="hidden md:flex bg-white/5 border-white/10 rounded-full px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
              >
                View Archive
              </Button>
            </div>
            
            <FocusCards 
              cards={relatedProjects.map(p => ({
                ...p,
                src: p.image,
                href: `/projects/${p.slug}`
              }))} 
            />
          </div>
        </section>
      )}
    </div>
  )
}
