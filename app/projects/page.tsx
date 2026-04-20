import ProjectsPage from "@/components/projects-page"
import { getAllProjects } from "@/lib/projects-data"

export const metadata = {
  title: "Projects - React Bits",
  description: "Explore my portfolio of web designs, UI/UX projects, AI/ML applications, and graphics work",
}

export default async function Projects() {
  const projects = await getAllProjects()
  return <ProjectsPage initialProjects={projects} />
}
