"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart, Tag } from "lucide-react"
import type { Product } from "@/lib/shop-data"
import { Button } from "./ui/button"

import { useCart } from "@/lib/store/use-cart"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      description: "You can view your cart in the marketplace.",
      position: "bottom-right",
    })
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      group="true"
      className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
          {product.category}
        </div>
      </div>

      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-extrabold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Featured
          </div>
        </div>
      )}

      {/* Image Gallery Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-xl font-bold tracking-tighter text-white/90">
            {product.isFree ? (
              <span className="text-green-400 text-[10px] uppercase tracking-[0.3em] bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">Free</span>
            ) : (
              formattedPrice
            )}
          </div>
        </div>

        <p className="text-sm text-white/40 line-clamp-2 font-light leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          <Link href={`/shop/${product.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 rounded-2xl py-6 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              Details
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Button
            className="w-14 h-14 rounded-2xl bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center shadow-lg hover:shadow-white/5"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
