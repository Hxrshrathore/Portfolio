import { db } from "@/lib/db"
import { pageViews } from "@/lib/db/schema"
import {
  getDailyPageViews,
  getUTMStats,
  getDeviceStats,
  getTopContent,
  getGeoStats,
} from "@/app/actions/admin"
import AnalyticsDashboardClient from "@/components/admin/analytics-dashboard-client"

export const revalidate = 0 // dynamically rendered

export default async function AdminAnalyticsPage() {
  // Fetch initial 30 days data
  const views = await getDailyPageViews(30)
  const utm = await getUTMStats(30)
  const devices = await getDeviceStats(30)
  const content = await getTopContent(30)
  const geo = await getGeoStats(30)

  // Fetch unique pathnames for heatmap dropdown selection
  const rawPaths = await db
    .selectDistinct({ pathname: pageViews.pathname })
    .from(pageViews)
  
  const availablePaths = rawPaths.map((p) => p.pathname).filter(Boolean)
  if (!availablePaths.includes("/")) {
    availablePaths.unshift("/")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Analytics</h1>
        <p className="text-sm text-neutral-400">
          Heavy self-hosted tracking details showing UTM attribution, screen specifications, geolocations, and click mapping.
        </p>
      </div>

      <AnalyticsDashboardClient
        initialViews={views}
        initialUTM={utm}
        initialDevices={devices}
        initialContent={content}
        initialGeo={geo}
        availablePaths={availablePaths}
      />
    </div>
  )
}
