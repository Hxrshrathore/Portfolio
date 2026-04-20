"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import TextPressure from "./text-pressure"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-4 h-4" />, url: "https://github.com/hxrshrathore" },
    { name: "Twitter", icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com/hxrshrathore" },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/hxrshrathore" },
  ]

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <footer className="relative bg-black pt-32 pb-12 overflow-hidden border-t border-white/5">
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
        
        {/* ── @hxrshrathore Text Pressure Section (Kept exactly as it is) ── */}
        <div className="mb-12 md:mb-24">
          <div className="relative h-[100px] md:h-[250px] flex items-center justify-center mb-6">
            <TextPressure
              text="@hxrshrathore"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ffffff"
              minFontSize={28}
            />
          </div>
          <div className="text-center px-4">
            <p className="text-[9px] md:text-xs font-sans font-bold tracking-[0.4em] text-white/30 uppercase leading-relaxed">
              Crafted with precision • Powered by innovation
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16 md:mb-24" />

        {/* ── Main Footer Content ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 px-4 md:px-0">
          
          {/* Brand & Bio (Left Col) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-6 md:mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono">Available for Work</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-6 tracking-tight">
                Let's build something<br />extraordinary.
              </h3>
              
              <p className="text-base text-gray-400 font-light max-w-md leading-relaxed">
                A digital designer & developer passionately crafting elevated web experiences through motion and mathematics.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-2 hidden md:block" /> {/* Spacer */}

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
                <li>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-white/60 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    Contact
                    <span className="inline-block overflow-hidden w-0 group-hover:w-4 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 ml-1">
                       <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white" />
                    </span>
                  </Link>
                </li>
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
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
            © {currentYear} Harsh Kumar. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.1em] text-white/30">
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Impressum</span>
          </div>
        </motion.div>
        
      </div>
    </footer>
  )
}
