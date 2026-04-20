"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
}

interface Metric {
  label: string;
  value: number;
  unit?: string;
  data?: ChartData[];
  type?: 'area' | 'bar' | 'pie' | 'radar';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{label}</p>
        <p className="text-sm font-bold text-white">
          {payload[0].value}
          <span className="text-[10px] ml-1 text-white/60">{payload[0].unit || ""}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function CaseStudyCharts({ metrics }: { metrics: Metric[] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="relative group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden min-h-[350px] flex flex-col"
        >
          {/* Header */}
          <div className="mb-8">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">{metric.label}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">{metric.value}</span>
              <span className="text-sm font-light text-white/40">{metric.unit}</span>
            </div>
          </div>

          {/* Chart Rendering */}
          <div className="flex-1 w-full min-h-[200px]">
            {metric.type === 'radar' && metric.data ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metric.data}>
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                  <Radar
                    name={metric.label}
                    dataKey="value"
                    stroke="#ffffff"
                    fill="#ffffff"
                    fillOpacity={0.1}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            ) : metric.type === 'bar' && metric.data ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metric.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#ffffff20", fontSize: 10 }} 
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'white', opacity: 0.05 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {metric.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#ffffff80" : "#ffffff20"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : metric.data ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metric.data}>
                  <defs>
                    <linearGradient id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#ffffff20", fontSize: 10 }} 
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${idx})`}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-white/10 italic text-sm">
                    No visualization data provided
                </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
