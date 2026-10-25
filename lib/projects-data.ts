import { db } from "./db"
import { projects as projectsSchema } from "./db/schema"
import { eq, and, not } from "drizzle-orm"

export type ProjectDomain = "DATA ANALYST" | "WEB DESIGN" | "WEB DEVELOPMENT" | "AI/ML" | "GD"
export type ProjectStatus = "ACTIVE" | "BUILDING" | "ARCHIVED" | "DOWN" | "PROTOTYPE"

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  domain: ProjectDomain
  status: ProjectStatus
  date: string // Month Year
  category: string
  featured: boolean
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  process: {
    title: string
    description: string
    contentType?: string
  }[]
  metrics: {
    label: string
    value: number
    unit?: string
    data?: { name: string; value: number }[]
    type?: 'area' | 'bar' | 'pie' | 'radar'
  }[]
  slug: string
  subtitle: string
  heroImage: string
}

// Map database row to Project interface
function mapProject(p: any): Project {
  return {
    ...p,
    domain: p.domain as ProjectDomain,
    status: p.status as ProjectStatus,
    demoUrl: p.demoUrl || undefined,
    githubUrl: p.githubUrl || undefined,
    category: p.category || "",
    metrics: p.metrics && p.metrics.length > 0 ? p.metrics : []
  }
}

export const getAllProjects = async (): Promise<Project[]> => {
  const result = await db.select().from(projectsSchema)
  return result.map(mapProject)
}

export const getPublicProjects = async (): Promise<Project[]> => {
  const { isPublicProject } = await import("./curation")
  const all = await getAllProjects()
  return all.filter(isPublicProject)
}

export const getFeaturedCaseStudies = async (): Promise<Project[]> => {
  const { FEATURED_SLUGS } = await import("./curation")
  const all = await getAllProjects()
  const featured = FEATURED_SLUGS
    .map(slug => all.find(p => p.slug.toLowerCase() === slug.toLowerCase()))
    .filter((p): p is Project => Boolean(p))
  return featured
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const result = await db.select().from(projectsSchema).where(eq(projectsSchema.featured, true))
  return result.map(mapProject)
}

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const [project] = await db.select().from(projectsSchema).where(eq(projectsSchema.slug, slug)).limit(1)
  return project ? mapProject(project) : undefined
}

export const getRelatedProjects = async (currentProjectId: string, limit = 3): Promise<Project[]> => {
  const result = await db
    .select()
    .from(projectsSchema)
    .where(not(eq(projectsSchema.id, currentProjectId)))
    .limit(limit)
  return result.map(mapProject)
}

export const getProjectsByDomain = async (domain: ProjectDomain): Promise<Project[]> => {
  const result = await db.select().from(projectsSchema).where(eq(projectsSchema.domain, domain))
  return result.map(mapProject)
}

export const getProjectsByStatus = async (status: ProjectStatus): Promise<Project[]> => {
  const result = await db.select().from(projectsSchema).where(eq(projectsSchema.status, status))
  return result.map(mapProject)
}
