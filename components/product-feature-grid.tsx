"use client"

import { motion } from "framer-motion"
import { Check, Cpu, Zap, Layout, Shield, Code, Layers, Smartphone } from "lucide-react"

const icons = {
  Performance: Zap,
  Architecture: Layers,
  Responsive: Smartphone,
  Design: Layout,
  Security: Shield,
  Code: Code,
  Optimization: Cpu,
  Reliability: Check,
}

interface ProductFeatureGridProps {
  features: string[]
}

export default function ProductFeatureGrid({ features }: ProductFeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => {
        // Pick an icon based on keywords or index
        const IconComponent = Object.values(icons)[i % Object.values(icons).length]
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:border-white/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/30 group-hover:text-white group-hover:scale-110 transition-all">
              <IconComponent size={20} />
            </div>
            <h4 className="text-lg font-bold tracking-tight mb-2 text-white/80 group-hover:text-white transition-colors">
              {feature.split(":")[0] || feature}
            </h4>
            <p className="text-xs text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors">
              {feature.split(":")[1] || "High-performance asset with premium architectural consistency."}
            </p>
            
            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/30 transition-colors" />
          </motion.div>
        )
      })}
    </div>
  )
}
