import { getProjectsAdmin } from "@/app/actions/admin"
import ProjectsManager from "@/components/admin/projects-manager"

export const revalidate = 0 // dynamically rendered

export default async function AdminProjectsPage() {
  const projects = await getProjectsAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Projects</h1>
        <p className="text-sm text-neutral-400">
          Publish, edit, or archive case studies for your design and development portfolios.
        </p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  )
}
