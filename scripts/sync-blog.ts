import * as dotenv from "dotenv"
import path from "path"

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import Parser from "rss-parser"
import { eq } from "drizzle-orm"

const parser = new Parser({
  customFields: {
    item: [
      ["content:encoded", "content"],
      ["dc:creator", "author"],
    ],
  },
})

const RSS_URL = "https://www.smashingmagazine.com/feed"

async function getDB() {
  const { db } = await import("../lib/db")
  const { blogPosts } = await import("../lib/db/schema")
  return { db, blogPosts }
}

function getSlugFromLink(link: string): string {
  try {
    const url = new URL(link)
    const path = url.pathname.replace(/\/$/, "")
    const parts = path.split("/")
    return parts[parts.length - 1] || "post"
  } catch (e) {
    return "post-" + Math.random().toString(36).substring(7)
  }
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

async function syncBlog() {
  console.log("Fetching RSS feed...")
  try {
    const { db, blogPosts } = await getDB()
    const feed = await parser.parseURL(RSS_URL)
    console.log(`Found ${feed.items.length} items in feed.`)

    for (const item of feed.items) {
      const slug = getSlugFromLink(item.link || "")
      const title = item.title || "No Title"
      const description = item.contentSnippet || item.description || ""
      const date = item.pubDate ? new Date(item.pubDate) : new Date()
      const author = (item as any).author || "Smashing Magazine"
      const image = item.enclosure?.url || ""
      const tags = item.categories || []
      const content = (item as any).content || item.contentSnippet || ""
      const readingTime = calculateReadingTime(content)

      console.log(`Syncing: ${title} (${slug})`)

      await db
        .insert(blogPosts)
        .values({
          slug,
          title,
          description,
          date,
          author,
          image,
          tags,
          content,
          readingTime,
          published: true,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: blogPosts.slug,
          set: {
            title,
            description,
            date,
            author,
            image,
            tags,
            content,
            readingTime,
            updatedAt: new Date(),
          },
        })
    }

    console.log("Sync complete!")
    process.exit(0)
  } catch (error) {
    console.error("Error syncing blog:", error)
    process.exit(1)
  }
}

syncBlog()
