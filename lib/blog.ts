import { db } from "./db"
import { blogPosts } from "./db/schema"
import { desc, eq, not, and, isNotNull } from "drizzle-orm"

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image?: string
  tags: string[]
  content: string
  readingTime: string
  published: boolean
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image?: string
  tags: string[]
  readingTime: string
  published: boolean
}

export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  const posts = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      description: blogPosts.description,
      date: blogPosts.date,
      author: blogPosts.author,
      image: blogPosts.image,
      tags: blogPosts.tags,
      readingTime: blogPosts.readingTime,
      published: blogPosts.published,
    })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.date))

  return posts.map((post) => ({
    ...post,
    date: post.date.toISOString(),
    readingTime: post.readingTime || "5 min read",
    image: post.image || undefined,
  }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)

  if (!post || !post.published) return null

  return {
    ...post,
    date: post.date.toISOString(),
    readingTime: post.readingTime || "5 min read",
    image: post.image || undefined,
  }
}

export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Promise<BlogPostMetadata[]> {
  // Simple algorithm: fetch recent posts excluding current, in a real app you'd match tags
  const posts = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      description: blogPosts.description,
      date: blogPosts.date,
      author: blogPosts.author,
      image: blogPosts.image,
      tags: blogPosts.tags,
      readingTime: blogPosts.readingTime,
      published: blogPosts.published,
    })
    .from(blogPosts)
    .where(and(eq(blogPosts.published, true), not(eq(blogPosts.slug, currentSlug))))
    .limit(limit)

  return posts.map((post) => ({
    ...post,
    date: post.date.toISOString(),
    readingTime: post.readingTime || "5 min read",
    image: post.image || undefined,
  }))
}
