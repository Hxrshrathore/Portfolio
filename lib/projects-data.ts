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
  // Sample metrics for Case Study demonstration during development
  const sampleMetrics = [
    {
      label: "Performance Boost",
      value: 40,
      unit: "%",
      type: "area",
      data: [
        { name: "Research", value: 10 },
        { name: "Design", value: 25 },
        { name: "Dev", value: 35 },
        { name: "Post-Launch", value: 40 }
      ]
    },
    {
      label: "User Satisfaction",
      value: 94,
      unit: "%",
      type: "bar",
      data: [
        { name: "Alpha", value: 40 },
        { name: "Beta", value: 72 },
        { name: "V1", value: 94 }
      ]
    }
  ];

  return {
    ...p,
    domain: p.domain as ProjectDomain,
    status: p.status as ProjectStatus,
    demoUrl: p.demoUrl || undefined,
    githubUrl: p.githubUrl || undefined,
    category: p.category || "",
    metrics: p.metrics && p.metrics.length > 0 ? p.metrics : sampleMetrics
  }
}

export const getAllProjects = async (): Promise<Project[]> => {
  const result = await db.select().from(projectsSchema)
  return result.map(mapProject)
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
