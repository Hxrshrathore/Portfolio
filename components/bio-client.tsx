"use client"

import { motion } from "framer-motion"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Globe, 
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { type Project } from "@/lib/projects-data"
import dynamic from "next/dynamic"

const Silk = dynamic(() => import("@/components/ui/silk"), { ssr: false })

export default function BioClient({ featuredProjects }: { featuredProjects: Project[] }) {
  const socialLinks = [
    { name: "Portfolio", icon: <Globe className="w-5 h-5" />, href: "/", color: "bg-white/10" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/hxrshrathore", color: "bg-[#0077B5]/20" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/hxrshrathore", color: "bg-white/10" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/hxrshrathore", color: "bg-[#1DA1F2]/20" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/hxrsh.rathore", color: "bg-[#E4405F]/20" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="min-h-[100svh] bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden relative flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Silk speed={3.5} scale={1.2} color="#ffffff" noiseIntensity={0.8} rotation={0} />
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6 pt-16 pb-24 flex flex-col items-center">
        {/* Profile Section */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-white/20 to-transparent blur-2xl rounded-full opacity-50" />
          <div className="relative w-32 h-32 rounded-full border-2 border-white/20 p-1.5 overflow-hidden backdrop-blur-sm bg-white/5 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden">
               <Image 
                src="/harsh.png" 
                alt="Harsh Kumar" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 -right-2 bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg border border-white/40"
          >
            AVAILABLE
          </motion.div>
        </motion.div>

        {/* Identity Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Harsh Kumar
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm font-light text-white/40 tracking-[0.2em] uppercase mb-4">
            Creative Developer & UI/UX Designer
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm text-gray-400 font-light leading-relaxed max-w-[280px] mx-auto italic">
            "Crafting high-end digital experiences at the intersection of design and code."
          </motion.p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-3 mb-12"
        >
          {socialLinks.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <Link 
                href={link.href}
                target={link.href === "/" ? "_self" : "_blank"}
                className={`group flex items-center justify-between w-full p-4 rounded-2xl border border-white/10 ${link.color} backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium tracking-wide">{link.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="w-full flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">Work Spotlight</span>
          <div className="flex-1 h-px bg-white/20" />
        </motion.div>

        {/* Projects Grid */}
        <div className="w-full space-y-6 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block group relative overflow-hidden rounded-2xl border border-white/10 aspect-video">
                <Image 
                  src={project.heroImage || project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <p className="text-[8px] font-bold tracking-widest text-white/40 uppercase mb-1">{project.domain}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold tracking-tight">{project.title}</h3>
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Secondary Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-4"
        >
          <Link 
            href="/contact"
            className="flex flex-col items-center justify-center w-full py-8 rounded-3xl bg-white text-black font-bold tracking-[0.3em] uppercase text-xs transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            LET'S WORK TOGETHER
          </Link>
          
          <div className="flex justify-center gap-8 py-4">
            <Link href="/blog" className="text-[10px] font-bold tracking-widest text-white/30 uppercase hover:text-white transition-colors">Blog</Link>
            <Link href="/shop" className="text-[10px] font-bold tracking-widest text-white/30 uppercase hover:text-white transition-colors">Shop</Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="mb-4 flex justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            HXRSHRATHORE &copy; 2025
          </p>
        </motion.footer>
      </div>
    </div>
  )
}
