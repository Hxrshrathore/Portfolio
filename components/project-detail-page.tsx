"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import Iridescence from "@/components/ui/iridescence"
import BlurText from "@/components/ui/blur-text"
import type { Project } from "@/lib/projects-data"
import Hyperspeed, { hyperspeedPresets } from "@/components/hyperspeed"

interface ProjectDetailPageProps {
  project: Project
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [mounted, setMounted] = useState(false)

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hyperspeed effectOptions={hyperspeedPresets.two} className="absolute inset-0 z-0" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <BlurText
              text={project.title}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
              delay={0.2}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 px-2"
            >
              {project.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8 px-2"
            >
              {project.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 pointer-events-auto"
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              {project.demoUrl && (
                <Button asChild className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 text-sm sm:text-base">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm sm:text-base"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Project Overview</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {project.longDescription}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-3 sm:p-4">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Category</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{project.category}</p>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-3 sm:p-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mb-2" />
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Status</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{project.featured ? "Featured" : "Completed"}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={project.heroImage || project.image}
                alt={project.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Technologies Used</h2>
            <p className="text-gray-400 text-base sm:text-lg">The tech stack that powered this project</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center"
          >
            {project.technologies?.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 sm:px-6 py-2 sm:py-3 hover:border-gray-600 transition-colors"
              >
                <span className="text-white font-medium text-sm sm:text-base">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Development Process */}
      {processContent.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Development Process</h2>
              <p className="text-gray-400 text-base sm:text-lg">How this project came to life</p>
            </motion.div>
            <StickyScrollReveal content={processContent} />
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Challenges & Solutions</h2>
            <p className="text-gray-400 text-base sm:text-lg">Key obstacles overcome during development</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-red-400">Challenges</h3>
              <div className="space-y-3 sm:space-y-4">
                {project.challenges?.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 sm:p-4"
                  >
                    <p className="text-gray-300 text-sm sm:text-base">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400">Solutions</h3>
              <div className="space-y-3 sm:space-y-4">
                {project.solutions?.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 sm:p-4"
                  >
                    <p className="text-gray-300 text-sm sm:text-base">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Results & Impact</h2>
            <p className="text-gray-400 text-base sm:text-lg">The measurable outcomes of this project</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {project.results?.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-lg p-5 sm:p-6 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium text-sm sm:text-base">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
