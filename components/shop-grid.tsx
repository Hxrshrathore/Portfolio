"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Grid2X2, Package, Layout, Box } from "lucide-react"
import type { Product } from "@/lib/shop-data"
import ProductCard from "./product-card"

interface ShopGridProps {
  products: Product[]
}

const categories = [
  { id: "all", name: "All", icon: Grid2X2 },
  { id: "Templates", name: "Templates", icon: Layout },
  { id: "Components", name: "Components", icon: Box },
  { id: "Assets", name: "Assets", icon: Package },
]

export default function ShopGrid({ products }: ShopGridProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="space-y-16">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                group relative flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-500
                ${isActive 
                  ? "bg-white border-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                  : "bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/[0.05] hover:border-white/20 hover:text-white"}
              `}
            >
              <Icon size={16} className={isActive ? "text-black" : "text-white/20 group-hover:text-white/60"} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 border border-dashed border-white/10 rounded-3xl"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.02] mb-6">
            <Filter className="w-8 h-8 text-white/10" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">No products found</h3>
          <p className="text-white/40 font-light">Try selecting a different category or check back later.</p>
        </motion.div>
      )}
    </div>
  )
}
