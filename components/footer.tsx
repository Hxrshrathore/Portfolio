"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from "lucide-react"
import TextPressure from "./text-pressure"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/hxrshrathore",
      color: "hover:text-white",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/hxrshrathore",
      color: "hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/hxrshrathore",
      color: "hover:text-white",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:hxrshrathore@gmail.com",
      color: "hover:text-white",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background Pattern - Strictly Monochromatic */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="relative h-[200px] md:h-[250px] flex items-center justify-center mb-12">
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
            minFontSize={36}
          />
        </div>
        <div className="text-center mb-16">
          <p className="text-xs font-sans font-bold tracking-[0.3em] text-white/20 uppercase">Crafted with precision • Powered by innovation</p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 uppercase tracking-tight">Harsh Kumar</h3>
              <p className="text-gray-400 font-sans mb-8 max-w-md leading-relaxed">
                Web <span className="italic font-light">designer</span> passionate about creating extraordinary web
                experiences. Where innovation meets perfection, one pixel at a time.
              </p>
              <div className="flex items-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xs font-sans font-bold text-white/40 mb-6 uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 font-sans hover:text-white transition-colors duration-300 flex items-center group text-sm"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xs font-sans font-bold text-white/40 mb-6 uppercase tracking-[0.2em]">Let's Create</h4>
              <div className="space-y-4">
                <a
                  href="mailto:hxrshrathore@gmail.com"
                  className="text-gray-400 font-sans hover:text-white transition-colors duration-300 flex items-center text-sm"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  hxrshrathore@gmail.com
                </a>
                <p className="text-gray-400 font-sans text-xs leading-relaxed tracking-wide">Ready to build something extraordinary together</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              className="text-white/20 font-sans text-xs uppercase tracking-widest flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © {currentYear} Harsh Kumar. Crafted with <Heart className="w-3 h-3 mx-2 text-white/20" /> and
              endless curiosity.
            </motion.p>
            <motion.div
              className="flex items-center gap-6 text-xs font-sans uppercase tracking-[0.1em] text-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
