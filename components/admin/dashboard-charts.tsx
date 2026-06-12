"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface ViewsData {
  date: string
  views: number
  visitors: number
}

interface DeviceData {
  name: string
  value: number
}

interface DashboardChartsProps {
  viewsData: ViewsData[]
  deviceData: DeviceData[]
}

const COLORS = ["#ffffff", "#a3a3a3", "#525252", "#262626"]

export default function DashboardCharts({ viewsData, deviceData }: DashboardChartsProps) {
  // Fallbacks if data is empty
  const chartData = viewsData.length > 0 ? viewsData : [
    { date: "Day 1", views: 0, visitors: 0 }
  ]

  const pieData = deviceData.length > 0 ? deviceData : [
    { name: "desktop", value: 100 }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Views over time */}
      <div className="md:col-span-2 rounded-xl border border-neutral-900 bg-[#09090b] p-5">
        <div className="mb-6 flex items-center justify-between border-b border-neutral-900 pb-3">
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">TRAFFIC DENSITY</h3>
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">30 Days Activity Log</p>
          </div>
          <div className="flex gap-4 text-[9px] font-mono uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-neutral-400">Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
              <span className="text-neutral-400">Visitors</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.03} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#737373" stopOpacity={0.01} />
                  <stop offset="95%" stopColor="#737373" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.08} vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#404040"
                fontSize={8}
                fontFamily="monospace"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#404040"
                fontSize={8}
                fontFamily="monospace"
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#ffffff"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#737373"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 flex flex-col justify-between">
        <div className="border-b border-neutral-900 pb-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">DEVICES</h3>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Browser agent logs</p>
        </div>

        <div className="h-44 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-1.5 mt-2">
          {pieData.map((item, index) => {
            const total = pieData.reduce((acc, curr) => acc + curr.value, 0)
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={item.name} className="flex items-center justify-between text-[10px] font-mono uppercase">
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-neutral-400">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{percent}% <span className="text-neutral-600 font-normal">({item.value})</span></span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
