import { getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import LiquidEther from "@/components/ui/liquid-ether"

export const metadata: Metadata = {
  title: "Blog | hxrshrathore - Web Designer & Developer",
  description:
    "Insights on web design, development, performance optimization, and modern web technologies. Learn from real-world projects and industry best practices.",
  keywords: [
    "web design blog",
    "web development",
    "performance optimization",
    "Next.js",
    "React",
    "TypeScript",
    "frontend development",
    "UI/UX design",
  ],
  authors: [{ name: "hxrshrathore" }],
  openGraph: {
    title: "Blog | hxrshrathore",
    description: "Insights on web design, development, and modern web technologies",
    type: "website",
    url: "https://hxrshrathore.com/blog",
    siteName: "hxrshrathore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | hxrshrathore",
    description: "Insights on web design, development, and modern web technologies",
    creator: "@hxrshrathore",
  },
  alternates: {
    canonical: "https://hxrshrathore.com/blog",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={["#06b6d4", "#3b82f6", "#8b5cf6"]}
            mouseForce={25}
            cursorSize={120}
            isViscous={false}
            resolution={0.6}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2.5}
            takeoverDuration={0.3}
            autoResumeDelay={2000}
            autoRampDuration={0.8}
          />
        </div>

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Thoughts on web design, development, and everything in between
          </p>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="container mx-auto px-4 max-w-6xl py-20">
        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image */}
                {post.image && (
                  <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-purple-900/20 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
