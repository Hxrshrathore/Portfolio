import { getBugReportsAdmin } from "@/app/actions/admin"
import BugReportsManager from "@/components/admin/bug-reports-manager"

export const revalidate = 0 // dynamically rendered

export default async function AdminBugReportsPage() {
  const bugs = await getBugReportsAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Bug Reports</h1>
        <p className="text-sm text-neutral-400">
          Monitor interface, usability, and technical glitches reported by visitors.
        </p>
      </div>

      <BugReportsManager initialBugs={bugs} />
    </div>
  )
}
