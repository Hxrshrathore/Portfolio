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
      color: "hover:text-gray-300",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/hxrshrathore",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/hxrshrathore",
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:hxrshrathore@gmail.com",
      color: "hover:text-green-400",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="relative h-[200px] md:h-[250px] flex items-center justify-center mb-8">
          <TextPressure
            text="@hxrshrathore"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500">Crafted with precision. Powered by innovation.</p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Harsh Kumar</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Web <span className="italic font-light">designer</span> passionate about creating extraordinary web
                experiences. Where innovation meets perfection, one pixel at a time.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors duration-300 ${link.color}`}
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
              <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <h4 className="text-lg font-semibold text-white mb-4">Let's Create</h4>
              <div className="space-y-3">
                <a
                  href="mailto:hello@hxrshrathore.dev"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Hxrshrathore@gmail.com
                </a>
                <p className="text-gray-400 text-sm">Ready to build something extraordinary together</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-gray-400 text-sm flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © {currentYear} Harsh Kumar. Crafted with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> and
              endless curiosity.
            </motion.p>
            <motion.div
              className="flex items-center gap-4 text-sm text-gray-400"
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

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-50"></div>
    </footer>
  )
}
