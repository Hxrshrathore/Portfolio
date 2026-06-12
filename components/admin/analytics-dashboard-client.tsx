"use client"

import { useState } from "react"
import {
  getDailyPageViews,
  getUTMStats,
  getDeviceStats,
  getTopContent,
  getGeoStats,
} from "@/app/actions/admin"
import DashboardCharts from "@/components/admin/dashboard-charts"
import HeatmapVisualizer from "@/components/admin/heatmap-visualizer"
import {
  BarChart3,
  Globe,
  DevicePlayPic,
  Search,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react"

interface AnalyticsDashboardClientProps {
  initialViews: any[]
  initialUTM: { sources: any[]; campaigns: any[] }
  initialDevices: { devices: any[]; browsers: any[]; os: any[] }
  initialContent: any[]
  initialGeo: { countries: any[]; cities: any[] }
  availablePaths: string[]
}

export default function AnalyticsDashboardClient({
  initialViews,
  initialUTM,
  initialDevices,
  initialContent,
  initialGeo,
  availablePaths,
}: AnalyticsDashboardClientProps) {
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(false)

  // Local state for refetching
  const [views, setViews] = useState(initialViews)
  const [utm, setUtm] = useState(initialUTM)
  const [devices, setDevices] = useState(initialDevices)
  const [content, setContent] = useState(initialContent)
  const [geo, setGeo] = useState(initialGeo)

  const handleTimeframeChange = async (val: number) => {
    setDays(val)
    setLoading(true)
    try {
      const freshViews = await getDailyPageViews(val)
      const freshUtm = await getUTMStats(val)
      const freshDevices = await getDeviceStats(val)
      const freshContent = await getTopContent(val)
      const freshGeo = await getGeoStats(val)

      setViews(freshViews)
      setUtm(freshUtm)
      setDevices(freshDevices)
      setContent(freshContent)
      setGeo(freshGeo)
    } catch (err) {
      console.error("Refetch error:", err)
    }
    setLoading(false)
  }

  // Aggregate high-level stats from view list
  const totalViews = views.reduce((acc, curr) => acc + curr.views, 0)
  const totalVisitors = views.reduce((acc, curr) => acc + curr.visitors, 0)
  const topPage = content[0]?.pathname || "/"

  return (
    <div className="space-y-8 select-none font-mono">
      {/* Filters Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-900 bg-[#09090b] p-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
          <Clock className="h-4 w-4 text-neutral-500" />
          <span>Active filter: Last {days} days traffic logs</span>
        </div>

        <div className="flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-white mr-2" />}
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              disabled={loading}
              onClick={() => handleTimeframeChange(d)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold cursor-pointer transition-all ${
                days === d
                  ? "bg-white text-black"
                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* Mini overview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5">
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Total Views</span>
          <h2 className="text-2xl font-bold text-white mt-1.5">{totalViews.toLocaleString()}</h2>
          <span className="text-[9px] text-neutral-600 uppercase tracking-wider mt-1 block">Summed impressions</span>
        </div>
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5">
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Unique Visitors</span>
          <h2 className="text-2xl font-bold text-white mt-1.5">{totalVisitors.toLocaleString()}</h2>
          <span className="text-[9px] text-neutral-600 uppercase tracking-wider mt-1 block">Distinct user profiles</span>
        </div>
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5">
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Top Active Page</span>
          <h2 className="text-sm font-bold text-white mt-2 truncate pl-1 border-l border-white">{topPage}</h2>
          <span className="text-[9px] text-neutral-600 uppercase tracking-wider mt-1 block">Highest click rate</span>
        </div>
      </div>

      {/* Charts Panel */}
      <DashboardCharts viewsData={views} deviceData={devices.devices} />

      {/* Grid of details: Top Content & UTM Campaign stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Content View */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-neutral-500" />
              Most Visited Pages
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Site sections ranked by total views</p>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-500 uppercase text-[9px] tracking-wider">
                  <th className="py-2 font-semibold">Pathname</th>
                  <th className="py-2 font-semibold text-right">Views</th>
                  <th className="py-2 font-semibold text-right">Visitors</th>
                  <th className="py-2 font-semibold text-right">Avg Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/50 text-neutral-400">
                {content.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-neutral-600 uppercase tracking-wider text-[10px]">No records found</td>
                  </tr>
                ) : (
                  content.map((c) => (
                    <tr key={c.pathname} className="hover:bg-neutral-900/10">
                      <td className="py-2.5 font-mono text-neutral-400 truncate max-w-[200px]" title={c.pathname}>
                        {c.pathname}
                      </td>
                      <td className="py-2.5 text-right font-bold text-white">{c.views.toLocaleString()}</td>
                      <td className="py-2.5 text-right">{c.visitors.toLocaleString()}</td>
                      <td className="py-2.5 text-right text-neutral-300 font-semibold">{c.avgDuration}s</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* UTM Attribution view */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <Compass className="h-4 w-4 text-neutral-500" />
              UTM Attribution
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Performance logs by marketing attributes</p>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto max-h-[300px]">
            {/* Sources Table */}
            <div>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Top Sources</span>
              <table className="w-full text-left text-xs mt-2 border-collapse">
                <thead>
                  <tr className="border-b border-neutral-900 text-neutral-500 uppercase text-[8px] tracking-wider">
                    <th className="py-1.5 font-semibold">Source</th>
                    <th className="py-1.5 font-semibold text-right">Sessions</th>
                    <th className="py-1.5 font-semibold text-right">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/50 text-neutral-400">
                  {utm.sources.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-neutral-600 uppercase text-[9px]">No UTM parameters tracked</td>
                    </tr>
                  ) : (
                    utm.sources.map((s) => (
                      <tr key={s.source} className="hover:bg-neutral-900/10">
                        <td className="py-2 capitalize text-neutral-400">{s.source}</td>
                        <td className="py-2 text-right font-bold text-white">{s.sessions.toLocaleString()}</td>
                        <td className="py-2 text-right">{s.views.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Campaign Table */}
            <div>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Top Campaigns</span>
              <table className="w-full text-left text-xs mt-2 border-collapse">
                <thead>
                  <tr className="border-b border-neutral-900 text-neutral-500 uppercase text-[8px] tracking-wider">
                    <th className="py-1.5 font-semibold">Campaign</th>
                    <th className="py-1.5 font-semibold text-right">Sessions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/50 text-neutral-400">
                  {utm.campaigns.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center py-4 text-neutral-600 uppercase text-[9px]">No campaigns logged</td>
                    </tr>
                  ) : (
                    utm.campaigns.map((c) => (
                      <tr key={c.campaign} className="hover:bg-neutral-900/10">
                        <td className="py-2 text-neutral-400 truncate max-w-[200px]" title={c.campaign}>{c.campaign}</td>
                        <td className="py-2 text-right font-bold text-white">{c.sessions.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Breakdown & Operating Systems */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Geo Stats */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5">
          <div className="mb-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <Globe className="h-4 w-4 text-neutral-500" />
              Geographic Traffic
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Demographic splits from edge router headers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider border-b border-neutral-900 pb-1.5 block">Top Countries</span>
              <div className="space-y-2 mt-2">
                {geo.countries.length === 0 ? (
                  <p className="text-xs text-neutral-600 py-4 text-center uppercase tracking-wider">No country stats</p>
                ) : (
                  geo.countries.map((c) => (
                    <div key={c.name} className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-medium">{c.name}</span>
                      <span className="font-bold text-white">{c.value} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider border-b border-neutral-900 pb-1.5 block">Top Cities</span>
              <div className="space-y-2 mt-2">
                {geo.cities.length === 0 ? (
                  <p className="text-xs text-neutral-600 py-4 text-center uppercase tracking-wider">No city stats</p>
                ) : (
                  geo.cities.map((c) => (
                    <div key={c.name} className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-medium truncate max-w-[120px]" title={c.name}>
                        {c.name}
                      </span>
                      <span className="font-bold text-white">{c.value} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Systems */}
        <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5">
          <div className="mb-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-neutral-500" />
              Operating System
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Client platform profile trends</p>
          </div>

          <div className="space-y-3 mt-2">
            {devices.os.length === 0 ? (
              <p className="text-xs text-neutral-600 py-4 text-center uppercase tracking-wider">No OS details logged</p>
            ) : (
              devices.os.map((item) => {
                const total = devices.os.reduce((acc: number, curr: any) => acc + curr.value, 0)
                const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-medium">{item.name}</span>
                      <span className="text-white font-semibold">
                        {percent}% <span className="text-neutral-600">({item.value})</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Heatmap Overlay Visualizer */}
      <HeatmapVisualizer availablePaths={availablePaths} />
    </div>
  )
}
