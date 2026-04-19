import { getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"
import { BlogClient } from "@/components/blog-client"

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

  return <BlogClient posts={posts} />
}


