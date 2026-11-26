"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const MetallicPaint = dynamic(() => import("./MetallicPaint"), {
  ssr: false,
})

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [logoScale, setLogoScale] = useState(0.7)

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth || 1200
      if (w < 640) setLogoScale(0.95)
      else if (w < 1024) setLogoScale(0.85)
      else setLogoScale(0.7)
    }
    updateScale()
    window.addEventListener("resize", updateScale, { passive: true })
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-4 h-4" />, url: "https://github.com/hxrshrathore" },
    { name: "Twitter", icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com/hxrshrathore" },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/hxrshrathore" },
  ]

  const navLinks = [
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-black pt-10 md:pt-14 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] overflow-hidden border-t border-white/5">
      {/* ── Bottom-most Background Metallic Logo ── */}
      <div className="absolute inset-x-0 bottom-0 h-[360px] sm:h-[460px] md:h-[480px] lg:h-[520px] pointer-events-none z-0 overflow-hidden opacity-85">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent z-10" />
        <MetallicPaint
          imageSrc="/logo/hersh-design-logo.svg"
          color="#ffffff"
          density={2}
          softness={0.19}
          dispersion={0.34}
          distortion={0.07}
          edgeBend={0.16}
          angle={70}
          scale={logoScale}
          speed={0.55}
          rotation={1}
          mouseTilt={0.5}
          intro={false}
          paused={!isVisible}
        />
      </div>

      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.015] blur-[100px] rounded-full" />
        {/* Noise overlay (Inline SVG for zero-network overhead) */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ── Tagline ── */}
        <div className="text-center px-4 mb-6 md:mb-8">
          <p className="text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] text-white/60 uppercase leading-relaxed">
            DESIGN × ENGINEERING × PRODUCT
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10 md:mb-16" />

        {/* ── Main Footer Content ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 px-4 md:px-0">
          
          {/* Brand & Bio (Left Col) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                <span className="block md:inline whitespace-nowrap">READY TO START YOUR</span>
                <br />
                <span>NEXT <span className="italic font-light text-white/50">BIG THING?</span></span>
              </h3>
              
              <p className="text-base text-zinc-400 font-light max-w-md leading-relaxed">
                Product-Minded Software Engineer & Applied AI Builder engineering high-leverage products, data pipelines, and interfaces from problem discovery to production.
              </p>
            </motion.div>
          </div>


          {/* Navigation (Mid Col) */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[10px] font-sans font-bold text-white/30 mb-6 uppercase tracking-[0.2em]">Sitemap</h4>
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-white/60 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      {link.name}
                      <span className="inline-block overflow-hidden w-0 group-hover:w-4 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 ml-1">
                         <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Connect (Right Col) */}
          <div className="md:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[10px] font-sans font-bold text-white/30 mb-6 uppercase tracking-[0.2em]">Connect</h4>
              
              <a
                href="mailto:hxrshrathore@gmail.com"
                className="group relative inline-flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 w-full mb-6"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-white/60 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-0.5">Send me an email</div>
                  <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">hxrshrathore@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-white/50 hover:text-white transition-all duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Strip ── */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 font-sans font-light text-xs tracking-wide">
            © {currentYear} Harsh Kumar. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 text-xs font-sans font-light tracking-wide text-white/50">
            <span className="inline-flex items-center gap-2 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Select Projects</span>
            </span>
            <span className="text-white/20">•</span>
            <span>Bhubaneswar, IN (UTC+5:30)</span>
            <span className="text-white/20">•</span>
            <Link href="/contact" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
              Get in Touch →
            </Link>
          </div>
        </motion.div>
        
      </div>
    </footer>
  )
}
