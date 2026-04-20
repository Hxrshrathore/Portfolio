import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data"
import ProjectDetailPage from "@/components/project-detail-page"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [project.heroImage],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailPage project={project} />
}
