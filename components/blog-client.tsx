"use client"

import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { BackgroundPaths } from "@/components/ui/background-paths"
import type { BlogPostMetadata } from "@/lib/blog"

interface BlogClientProps {
  posts: BlogPostMetadata[]
}

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
}

export function BlogClient({ posts }: BlogClientProps) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section using BackgroundPaths */}
      <section className="relative w-full">
        <BackgroundPaths title="Architecting Digital Stories" showButton={false} />
      </section>

      {/* Blog Posts Section */}
      <div id="posts" className="container mx-auto px-4 max-w-6xl py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-white/20 text-xs font-sans font-bold tracking-[0.3em] uppercase mb-4">
              Latest Insights
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight">
              Thoughts on Design & Code
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
            Exploring the intersection of architectural discipline and creative digital craftsmanship.
          </p>
        </div>

        {/* Blog Posts Grid with Framer Motion */}
        {posts.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 text-lg italic tracking-wide">No insights shared yet. Check back soon.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block relative h-full bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-white/25 transition-all duration-500 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {post.image && (
                    <div className="aspect-[16/10] bg-zinc-900 border-b border-white/10 overflow-hidden relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  )}

                  <div className="p-8 pb-10 flex flex-col h-full">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-[0.15em] font-bold px-2.5 py-1 bg-white/5 text-white/40 border border-white/10 rounded-full group-hover:text-white/60 group-hover:border-white/20 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h4 className="text-xl font-bold mb-4 leading-tight group-hover:text-white transition-colors duration-300">
                      {post.title}
                    </h4>

                    <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-mono text-white/30">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{format(new Date(post.date), "dd.MM.yy")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 border border-white/10 rounded">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readingTime.split(" ")[0]} MIN</span>
                        </div>
                      </div>
                      
                      <span className="text-white/0 group-hover:text-white/60 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
