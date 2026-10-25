"use server"

import { db } from "@/lib/db"
import {
  pageViews,
  clickEvents,
  contactMessages,
  bugReports,
  projects,
  blogPosts,
  products,
} from "@/lib/db/schema"
import { eq, desc, gte, sql, and } from "drizzle-orm"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { verifyAdminAuth } from "@/lib/auth"

// Helper to secure all admin server actions with fail-closed timing-safe checks
async function verifyAuth() {
  await verifyAdminAuth()
}

// ----------------------------------------------------
// DASHBOARD STATS & OVERVIEWS
// ----------------------------------------------------

export async function getAdminStats() {
  await verifyAuth()

  try {
    const [viewsRes] = await db.select({ value: sql<number>`count(*)` }).from(pageViews)
    const [sessionsRes] = await db.select({ value: sql<number>`count(distinct ${pageViews.sessionId})` }).from(pageViews)
    const [contactRes] = await db.select({ value: sql<number>`count(*)` }).from(contactMessages)
    const [bugRes] = await db.select({ value: sql<number>`count(*)` }).from(bugReports)
    const [projectRes] = await db.select({ value: sql<number>`count(*)` }).from(projects)
    const [blogRes] = await db.select({ value: sql<number>`count(*)` }).from(blogPosts)
    const [productRes] = await db.select({ value: sql<number>`count(*)` }).from(products)

    const unreadContacts = await db
      .select({ value: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.read, false))

    const activeBugs = await db
      .select({ value: sql<number>`count(*)` })
      .from(bugReports)
      .where(eq(bugReports.resolved, false))

    return {
      pageViews: Number(viewsRes?.value || 0),
      sessions: Number(sessionsRes?.value || 0),
      contacts: Number(contactRes?.value || 0),
      unreadContacts: Number(unreadContacts[0]?.value || 0),
      bugs: Number(bugRes?.value || 0),
      activeBugs: Number(activeBugs[0]?.value || 0),
      projects: Number(projectRes?.value || 0),
      blogPosts: Number(blogRes?.value || 0),
      products: Number(productRes?.value || 0),
    }
  } catch (error) {
    console.error("Failed to get admin stats:", error)
    throw new Error("Failed to fetch statistics")
  }
}

export async function getRecentActivity() {
  await verifyAuth()

  try {
    const recentContacts = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(5)

    const recentBugs = await db
      .select()
      .from(bugReports)
      .orderBy(desc(bugReports.createdAt))
      .limit(3)

    return {
      contacts: recentContacts,
      bugs: recentBugs,
    }
  } catch (error) {
    console.error("Failed to get activity:", error)
    throw new Error("Failed to fetch activity")
  }
}

// ----------------------------------------------------
// ANALYTICS QUERIES (UTM, DEVICES, HEATMAP, GEOLOC)
// ----------------------------------------------------

export async function getDailyPageViews(days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Group by date in DB
    const res = await db
      .select({
        date: sql<string>`date_trunc('day', ${pageViews.createdAt})::date`,
        views: sql<number>`count(*)`,
        visitors: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(sql`date_trunc('day', ${pageViews.createdAt})::date`)
      .orderBy(sql`date_trunc('day', ${pageViews.createdAt})::date`)

    return res.map((r) => ({
      date: new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Number(r.views || 0),
      visitors: Number(r.visitors || 0),
    }))
  } catch (error) {
    console.error("Failed to get daily views:", error)
    return []
  }
}

export async function getUTMStats(days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const sources = await db
      .select({
        source: pageViews.utmSource,
        sessions: sql<number>`count(distinct ${pageViews.sessionId})`,
        views: sql<number>`count(*)`,
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, startDate), sql`${pageViews.utmSource} is not null`))
      .groupBy(pageViews.utmSource)
      .orderBy(desc(sql`count(distinct ${pageViews.sessionId})`))

    const campaigns = await db
      .select({
        campaign: pageViews.utmCampaign,
        sessions: sql<number>`count(distinct ${pageViews.sessionId})`,
        views: sql<number>`count(*)`,
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, startDate), sql`${pageViews.utmCampaign} is not null`))
      .groupBy(pageViews.utmCampaign)
      .orderBy(desc(sql`count(distinct ${pageViews.sessionId})`))

    return {
      sources: sources.map((s) => ({ ...s, sessions: Number(s.sessions), views: Number(s.views) })),
      campaigns: campaigns.map((c) => ({ ...c, sessions: Number(c.sessions), views: Number(c.views) })),
    }
  } catch (error) {
    console.error("Failed to get UTM stats:", error)
    return { sources: [], campaigns: [] }
  }
}

export async function getDeviceStats(days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const devices = await db
      .select({
        name: pageViews.device,
        value: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.device)

    const browsers = await db
      .select({
        name: pageViews.browser,
        value: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.browser)

    const os = await db
      .select({
        name: pageViews.os,
        value: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.os)

    return {
      devices: devices.map((d) => ({ name: d.name || "Unknown", value: Number(d.value) })),
      browsers: browsers.map((b) => ({ name: b.name || "Unknown", value: Number(b.value) })),
      os: os.map((o) => ({ name: o.name || "Unknown", value: Number(o.value) })),
    }
  } catch (error) {
    console.error("Failed to get device stats:", error)
    return { devices: [], browsers: [], os: [] }
  }
}

export async function getTopContent(days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const res = await db
      .select({
        pathname: pageViews.pathname,
        views: sql<number>`count(*)`,
        visitors: sql<number>`count(distinct ${pageViews.sessionId})`,
        avgDuration: sql<number>`avg(case when ${pageViews.duration} > 0 then ${pageViews.duration} else null end)`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.pathname)
      .orderBy(desc(sql`count(*)`))

    return res.map((r) => ({
      pathname: r.pathname,
      views: Number(r.views),
      visitors: Number(r.visitors),
      avgDuration: Math.round(Number(r.avgDuration || 0)),
    }))
  } catch (error) {
    console.error("Failed to get top content:", error)
    return []
  }
}

export async function getGeoStats(days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const countries = await db
      .select({
        country: pageViews.country,
        value: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.country)
      .orderBy(desc(sql`count(distinct ${pageViews.sessionId})`))

    const cities = await db
      .select({
        city: pageViews.city,
        country: pageViews.country,
        value: sql<number>`count(distinct ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.city, pageViews.country)
      .orderBy(desc(sql`count(distinct ${pageViews.sessionId})`))
      .limit(10)

    return {
      countries: countries.map((c) => ({ name: c.country || "Localhost/Unknown", value: Number(c.value) })),
      cities: cities.map((c) => ({
        name: c.city ? `${c.city}, ${c.country}` : "Unknown",
        value: Number(c.value),
      })),
    }
  } catch (error) {
    console.error("Failed to get geo stats:", error)
    return { countries: [], cities: [] }
  }
}

export async function getHeatmapClicks(pathname: string, days = 30) {
  await verifyAuth()

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const clicks = await db
      .select({
        xPercent: clickEvents.xPercent,
        yPercent: clickEvents.yPercent,
      })
      .from(clickEvents)
      .where(and(eq(clickEvents.pathname, pathname), gte(clickEvents.createdAt, startDate)))
      .orderBy(desc(clickEvents.createdAt))
      .limit(1500) // cap heatmap render markers

    return clicks
  } catch (error) {
    console.error("Failed to get heatmap clicks:", error)
    return []
  }
}

// ----------------------------------------------------
// CONTACTS INBOX MANAGEMENT
// ----------------------------------------------------

export async function getContactMessagesAdmin() {
  await verifyAuth()

  try {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
  } catch (error) {
    console.error("Failed to get contact messages:", error)
    return []
  }
}

export async function markContactMessageRead(id: string, read: boolean) {
  await verifyAuth()

  try {
    await db.update(contactMessages).set({ read }).where(eq(contactMessages.id, id))
    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error) {
    console.error("Failed to update read status:", error)
    return { success: false, error: "Failed to update read status" }
  }
}

export async function deleteContactMessage(id: string) {
  await verifyAuth()

  try {
    await db.delete(contactMessages).where(eq(contactMessages.id, id))
    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete contact message:", error)
    return { success: false, error: "Failed to delete" }
  }
}

// ----------------------------------------------------
// BUG REPORT MANAGEMENT
// ----------------------------------------------------

export async function getBugReportsAdmin() {
  await verifyAuth()

  try {
    return await db.select().from(bugReports).orderBy(desc(bugReports.createdAt))
  } catch (error) {
    console.error("Failed to get bug reports:", error)
    return []
  }
}

export async function toggleBugReportResolved(id: string, resolved: boolean) {
  await verifyAuth()

  try {
    await db.update(bugReports).set({ resolved }).where(eq(bugReports.id, id))
    revalidatePath("/admin/bug-reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to resolve bug:", error)
    return { success: false, error: "Failed to resolve bug" }
  }
}

export async function deleteBugReport(id: string) {
  await verifyAuth()

  try {
    await db.delete(bugReports).where(eq(bugReports.id, id))
    revalidatePath("/admin/bug-reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete bug report:", error)
    return { success: false, error: "Failed to delete" }
  }
}

// ----------------------------------------------------
// PROJECTS CRUD MANAGEMENT
// ----------------------------------------------------

export async function getProjectsAdmin() {
  await verifyAuth()

  try {
    return await db.select().from(projects).orderBy(desc(projects.createdAt))
  } catch (error) {
    console.error("Failed to get projects:", error)
    return []
  }
}

export async function createProjectAdmin(data: any) {
  await verifyAuth()

  try {
    await db.insert(projects).values({
      id: data.id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      longDescription: data.longDescription,
      image: data.image,
      heroImage: data.heroImage,
      tags: data.tags || [],
      domain: data.domain,
      status: data.status,
      date: data.date,
      featured: data.featured || false,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      technologies: data.technologies || [],
      challenges: data.challenges || [],
      solutions: data.solutions || [],
      results: data.results || [],
      process: data.process || [],
      metrics: data.metrics || [],
    })
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    return { success: true }
  } catch (error) {
    console.error("Failed to create project:", error)
    return { success: false, error: "Failed to create project. Please verify slug uniqueness." }
  }
}

export async function updateProjectAdmin(id: string, data: any) {
  await verifyAuth()

  try {
    await db
      .update(projects)
      .set({
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        longDescription: data.longDescription,
        image: data.image,
        heroImage: data.heroImage,
        tags: data.tags || [],
        domain: data.domain,
        status: data.status,
        date: data.date,
        featured: data.featured || false,
        demoUrl: data.demoUrl || null,
        githubUrl: data.githubUrl || null,
        technologies: data.technologies || [],
        challenges: data.challenges || [],
        solutions: data.solutions || [],
        results: data.results || [],
        process: data.process || [],
        metrics: data.metrics || [],
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
    revalidatePath("/projects")
    revalidatePath(`/projects/${data.slug}`)
    revalidatePath("/admin/projects")
    return { success: true }
  } catch (error) {
    console.error("Failed to update project:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProjectAdmin(id: string) {
  await verifyAuth()

  try {
    await db.delete(projects).where(eq(projects.id, id))
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}

// ----------------------------------------------------
// BLOG CRUD MANAGEMENT
// ----------------------------------------------------

export async function getBlogPostsAdmin() {
  await verifyAuth()

  try {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
  } catch (error) {
    console.error("Failed to get blog posts:", error)
    return []
  }
}

export async function createBlogPostAdmin(data: any) {
  await verifyAuth()

  try {
    await db.insert(blogPosts).values({
      slug: data.slug,
      title: data.title,
      description: data.description,
      author: data.author || "hxrshrathore",
      image: data.image || null,
      tags: data.tags || [],
      content: data.content,
      readingTime: data.readingTime || "5 min read",
      published: data.published ?? true,
    })
    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error) {
    console.error("Failed to create blog post:", error)
    return { success: false, error: "Failed to create blog post. Please verify slug uniqueness." }
  }
}

export async function updateBlogPostAdmin(id: string, data: any) {
  await verifyAuth()

  try {
    await db
      .update(blogPosts)
      .set({
        slug: data.slug,
        title: data.title,
        description: data.description,
        author: data.author || "hxrshrathore",
        image: data.image || null,
        tags: data.tags || [],
        content: data.content,
        readingTime: data.readingTime || "5 min read",
        published: data.published ?? true,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
    revalidatePath("/blog")
    revalidatePath(`/blog/${data.slug}`)
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error) {
    console.error("Failed to update blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPostAdmin(id: string) {
  await verifyAuth()

  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id))
    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

// ----------------------------------------------------
// PRODUCTS CRUD MANAGEMENT
// ----------------------------------------------------

export async function getProductsAdmin() {
  await verifyAuth()

  try {
    return await db.select().from(products).orderBy(desc(products.createdAt))
  } catch (error) {
    console.error("Failed to get products:", error)
    return []
  }
}

export async function createProductAdmin(data: any) {
  await verifyAuth()

  try {
    await db.insert(products).values({
      slug: data.slug,
      name: data.name,
      description: data.description,
      price: Math.round(Number(data.price)), // paise or cents
      category: data.category,
      images: data.images || [],
      features: data.features || [],
      demoUrl: data.demoUrl || null,
      downloadUrl: data.downloadUrl || null,
      tags: data.tags || [],
      featured: data.featured || false,
    })
    revalidatePath("/shop")
    revalidatePath("/admin/products")
    return { success: true }
  } catch (error) {
    console.error("Failed to create product:", error)
    return { success: false, error: "Failed to create product. Please verify slug uniqueness." }
  }
}

export async function updateProductAdmin(id: string, data: any) {
  await verifyAuth()

  try {
    await db
      .update(products)
      .set({
        slug: data.slug,
        name: data.name,
        description: data.description,
        price: Math.round(Number(data.price)),
        category: data.category,
        images: data.images || [],
        features: data.features || [],
        demoUrl: data.demoUrl || null,
        downloadUrl: data.downloadUrl || null,
        tags: data.tags || [],
        featured: data.featured || false,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
    revalidatePath("/shop")
    revalidatePath(`/shop/${data.slug}`)
    revalidatePath("/admin/products")
    return { success: true }
  } catch (error) {
    console.error("Failed to update product:", error)
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProductAdmin(id: string) {
  await verifyAuth()

  try {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath("/shop")
    revalidatePath("/admin/products")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete product:", error)
    return { success: false, error: "Failed to delete product" }
  }
}
