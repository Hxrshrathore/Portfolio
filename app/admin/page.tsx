import { getAdminStats, getRecentActivity, getDailyPageViews, getDeviceStats } from "@/app/actions/admin"
import DashboardCharts from "@/components/admin/dashboard-charts"
import Link from "next/link"
import {
  Mail,
  Bug,
  FolderKanban,
  ArrowUpRight,
  Plus,
} from "lucide-react"

export const revalidate = 0 // dynamically rendered

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()
  const activity = await getRecentActivity()
  const dailyViews = await getDailyPageViews(30)
  const deviceStats = await getDeviceStats(30)

  const cards = [
    {
      title: "Unique Sessions",
      value: stats.sessions,
      subtitle: "Unique Visitors",
      href: "/admin/analytics",
    },
    {
      title: "Page Views",
      value: stats.pageViews,
      subtitle: "Impressions logged",
      href: "/admin/analytics",
    },
    {
      title: "Contact Messages",
      value: stats.contacts,
      subtitle: `${stats.unreadContacts} Unread Messages`,
      href: "/admin/contacts",
      alert: stats.unreadContacts > 0,
    },
    {
      title: "Bug Reports",
      value: stats.bugs,
      subtitle: `${stats.activeBugs} Open Reports`,
      href: "/admin/bug-reports",
      alert: stats.activeBugs > 0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-900 pb-5">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tight font-mono text-white uppercase">SYSTEM STATUS</h1>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Workstation Console Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-[#0c0c0e] px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-white transition-all hover:bg-neutral-900"
          >
            <FolderKanban className="h-3.5 w-3.5 text-neutral-400" />
            Projects
          </Link>
          <Link
            href="/admin/blog"
            className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
          >
            <Plus className="h-3.5 w-3.5 text-black" />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          return (
            <Link
              key={card.title}
              href={card.href}
              className="relative overflow-hidden rounded-xl border border-neutral-900 bg-[#09090b] p-5 transition-all duration-150 hover:border-neutral-800 hover:bg-[#0e0e11] group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  {card.title}
                </span>
                {card.alert && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-mono tracking-tight text-white">
                  {card.value.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-[9px] font-mono uppercase tracking-wider text-neutral-600">{card.subtitle}</p>
            </Link>
          )
        })}
      </div>

      {/* Analytics Charts */}
      <DashboardCharts viewsData={dailyViews} deviceData={deviceStats.devices} />

      {/* Row: Recent Inquiries & Bugs */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Inquiries */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">RECENT INQUIRIES</h3>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Contact Form Submissions</p>
            </div>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-0.5 text-[9px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white"
            >
              INBOX
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {activity.contacts.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-center">
                <Mail className="h-6 w-6 text-neutral-800 mb-2" />
                <p className="text-[10px] font-mono text-neutral-600 uppercase">No messages recorded</p>
              </div>
            ) : (
              activity.contacts.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start justify-between rounded-lg border border-neutral-950 bg-[#0c0c0e]/60 p-3.5 transition-all hover:border-neutral-800"
                >
                  <div className="space-y-1.5 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-200">{msg.name}</span>
                        <span className="rounded border border-neutral-800 bg-[#121214] px-1.5 py-0.5 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          {msg.projectType}
                        </span>
                      </div>
                      {!msg.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 leading-relaxed">{msg.message}</p>
                    <div className="text-[9px] font-mono text-neutral-600 uppercase">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bugs */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">SYSTEM GLITCHES</h3>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Active Widget Bug Reports</p>
            </div>
            <Link
              href="/admin/bug-reports"
              className="flex items-center gap-0.5 text-[9px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white"
            >
              ALL LOGS
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {activity.bugs.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-center">
                <Bug className="h-6 w-6 text-neutral-800 mb-2" />
                <p className="text-[10px] font-mono text-neutral-600 uppercase">No issues reported</p>
              </div>
            ) : (
              activity.bugs.map((bug) => (
                <div
                  key={bug.id}
                  className="flex items-start justify-between rounded-lg border border-neutral-950 bg-[#0c0c0e]/60 p-3.5 transition-all hover:border-neutral-800"
                >
                  <div className="space-y-1.5 w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-semibold text-neutral-200 uppercase">{bug.issueType}</span>
                      <span className={`rounded border px-1.5 py-0.5 text-[9px] font-mono ${
                        bug.resolved
                          ? "border-green-950/20 bg-green-950/10 text-green-400"
                          : "border-red-950/20 bg-red-950/10 text-red-400"
                      }`}>
                        {bug.resolved ? "RESOLVED" : "OPEN"}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 leading-relaxed">{bug.description}</p>
                    <div className="flex items-center justify-between text-[9px] font-mono text-neutral-600 uppercase">
                      <span>Path: {new URL(bug.pageUrl || "http://localhost").pathname}</span>
                      <span>
                        {new Date(bug.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
