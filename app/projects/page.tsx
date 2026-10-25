import ProjectsPage from "@/components/projects-page"
import { getPublicProjects } from "@/lib/projects-data"

export const metadata = {
  title: "Engineering Projects & Case Studies | Harsh Kumar",
  description: "Explore engineering case studies, full-stack applications, applied AI integrations, and workflow automation pipelines by Harsh Kumar.",
  openGraph: {
    title: "Engineering Projects & Case Studies | Harsh Kumar",
    description: "Explore engineering case studies, full-stack applications, applied AI integrations, and workflow automation pipelines by Harsh Kumar.",
    url: "https://hxrshrathore.vercel.app/projects",
  },
}

export default async function Projects() {
  const projects = await getPublicProjects()
  return <ProjectsPage initialProjects={projects} />
}
