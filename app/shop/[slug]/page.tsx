"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, ShoppingCart, Check, ExternalLink, Tag, 
  ShieldCheck, Zap, Globe, Share2, Layers, Cpu 
} from "lucide-react"
import type { Product } from "@/lib/shop-data"
import { shopProducts } from "@/lib/shop-data"
import PlasmaWave from "@/components/PlasmaWave"
import { Button } from "@/components/ui/button"
import ProductFeatureGrid from "@/components/product-feature-grid"
import ProductCard from "@/components/product-card"
import ComponentPlayground from "@/components/component-playground"

import { useCart } from "@/lib/store/use-cart"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const addItem = useCart((state) => state.addItem)
  
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  const handleAddToCart = () => {
    if (product) {
      addItem(product)
      toast.success(`${product.name} added to cart`, {
        description: "Review your items in the bag.",
        position: "bottom-right",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const innerHeight = window.innerHeight
      
      // Show card after 250px but hide it 400px before the bottom
      const isNearBottom = scrollHeight - innerHeight - scrollY < 400
      setIsScrolled(scrollY > 250 && !isNearBottom)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const foundProduct = shopProducts.find((p) => p.slug === slug)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      router.push("/shop")
    }
  }, [slug, router])

  if (!product) return null

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100)

  // Get related products (different category or just random others)
  const relatedProducts = shopProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Atmosphere - Specialized for Product Detail */}
      <div className="fixed inset-0 z-0">
        <PlasmaWave
          colors={["#0c0c0e", "#1a1a1c"]}
          speed1={0.08}
          speed2={0.09}
          focalLength={1.8}
          bend1={0.2}
          bend2={0.4}
          dir2={0}
          rotationDeg={180}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        
        {/* Navigation & Hero Section */}
        <section className="flex flex-col pt-32 pb-20 px-4 md:px-8 focus:outline-none">
           <div className="container mx-auto">
             <Link href="/shop" className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold tracking-[0.3em] uppercase mb-12 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to marketplace
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Product Meta & Title */}
                <motion.div style={{ opacity, scale }}>
                  <div className="flex items-center gap-4 mb-6">
                     <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
                        {product.category}
                     </span>
                     <div className="w-8 h-[1px] bg-white/20" />
                     <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                        Version 2.4.0
                     </span>
                  </div>

                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-8 flex flex-wrap"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }}
                  >
                    {product.name.split(" ").map((word, i) => (
                      <span key={i} className="mr-[0.2em] flex">
                        {word.split("").map((char, j) => (
                          <motion.span
                            key={j}
                            variants={{
                              hidden: { y: 20, opacity: 0 },
                              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.h1>

                  <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed mb-10 max-w-lg italic">
                    "{product.description}"
                  </p>

                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="text-3xl md:text-4xl font-extrabold tracking-tighter">
                      {product.isFree ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        formattedPrice
                      )}
                    </div>
                    <Button 
                      onClick={handleAddToCart}
                      className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 transition-all text-[10px] font-bold tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
                    >
                      {product.isFree ? "Get for Free" : "Instant Purchase"}
                      {product.isFree ? (
                        <Check size={14} className="ml-3 group-hover:scale-110 transition-transform" />
                      ) : (
                        <ShoppingCart size={14} className="ml-3 group-hover:scale-110 transition-transform" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                {/* Hero Gallery OR Component Playground */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className={product.category === "Components" ? "w-full" : "relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 group bg-white/[0.02]"}
                >
                  {product.category === "Components" ? (
                    <ComponentPlayground 
                      title={product.name}
                      code={product.code}
                      sandboxId={product.sandboxId}
                      preview={product.slug === "plasma-wave-background" ? (
                        <PlasmaWave 
                          colors={["#A855F7", "#06B6D4"]}
                          speed1={0.12}
                          speed2={0.11}
                          focalLength={1.2}
                        />
                      ) : null}
                    />
                  ) : (
                    <>
                      <Image 
                        src={product.images[activeImage]} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Floating Action Badge */}
                      <div className="absolute bottom-8 right-8 flex gap-2">
                         <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <Share2 size={16} />
                         </button>
                         <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <Layers size={16} />
                         </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
           </div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-40 bg-white/[0.01] border-y border-white/5 px-4 md:px-8">
           <div className="container mx-auto">
              <div className="max-w-3xl mb-24">
                <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-white/30 mb-6 block">The Blueprint</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 italic">Architectural Excellence In Every Byte.</h2>
                <p className="text-lg text-white/40 font-light leading-relaxed">
                  Every asset we create is forged with performance first. We don't just build UI; we engineer digital environments that react, evolve, and survive the modern web.
                </p>
              </div>

              <ProductFeatureGrid features={product.features} />
           </div>
        </section>

        {/* Technical Specification Section */}
        <section className="py-40 px-4 md:px-8">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
             <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="space-y-12"
                >
                   <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
                         <Cpu size={24} className="text-white/40" />
                         Engineered Foundation
                      </h3>
                      <p className="text-white/40 font-light leading-relaxed">
                         Built on a stack of high-performance libraries including Framer Motion, OGL, and Three.js. This product ensures sub-millisecond response times and flawless 60FPS animations across all modern browsers.
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-12">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-2 block">Performance</span>
                        <p className="text-2xl font-extrabold tracking-tighter">99/100</p>
                        <p className="text-[10px] text-white/30 uppercase mt-1">Lighthouse Score</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-2 block">Scale</span>
                        <p className="text-2xl font-extrabold tracking-tighter">UNLIMITED</p>
                        <p className="text-[10px] text-white/30 uppercase mt-1">Component Reuse</p>
                      </div>
                   </div>
                </motion.div>
             </div>

             <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]">
                <Image 
                  src={product.images[1] || product.images[0]} 
                  alt="Technical Preview" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black">
                         <ExternalLink size={24} />
                      </div>
                      <span className="text-xs font-bold tracking-[0.4em] uppercase">Enter Blueprint View</span>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="pb-40 pt-20 px-4 md:px-8 border-t border-white/5">
           <div className="container mx-auto">
              <div className="flex justify-between items-end mb-16">
                 <h2 className="text-3xl font-bold tracking-tighter">Related Creations</h2>
                 <Link href="/shop" className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors">
                    Explore All
                 </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {relatedProducts.map(p => (
                   <ProductCard key={p.id} product={p} />
                 ))}
              </div>
           </div>
        </section>
      </div>

      {/* Sticky Action Footer */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 50, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 z-[60] w-[92%] max-w-4xl"
          >
            <div className="relative group">
              {/* Outer Glow / Gradient Border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity blur-[1px]" />
              
              <div className="relative bg-black/80 backdrop-blur-3xl p-2 md:p-4 rounded-full flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 md:gap-4 pl-3 md:pl-6">
                  <div className="hidden md:block">
                    <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/20 block mb-0.5">Acquiring</span>
                    <p className="text-[10px] md:text-sm font-semibold tracking-tight truncate max-w-[80px] md:max-w-[200px] text-white/80">{product.name}</p>
                  </div>
                  <div className="w-[1px] h-4 bg-white/10 hidden md:block mx-1" />
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/20 block md:hidden">Price</span>
                    <p className="text-sm md:text-xl font-bold tracking-tighter text-white whitespace-nowrap">{formattedPrice}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-4 pr-2 md:pr-4">
                  {product.demoUrl && (
                    <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
                      <Button variant="ghost" className="h-10 md:h-14 px-4 md:px-8 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase">
                        Preview
                      </Button>
                    </a>
                  )}
                  <Button 
                    onClick={handleAddToCart}
                    className="h-10 md:h-14 px-5 md:px-10 rounded-full bg-white text-black hover:bg-white/90 transition-all text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase group shadow-[0_0_20px_rgba(255,255,255,0.2)] whitespace-nowrap"
                  >
                    <span className="hidden xs:inline">Add to Bag</span>
                    <span className="xs:hidden">Add</span>
                    <ShoppingCart size={12} className="ml-1.5 md:ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
