"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CreditCard, ShieldCheck, Zap } from "lucide-react"
import { useCart } from "@/lib/store/use-cart"
import LiquidChrome from "@/components/liquid-chrome"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const [mounted, setMounted] = useState(false)

  // Hydration fix for persisted stores
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100)
  }

  return (
    <div className="relative min-h-screen bg-black text-white pt-28 pb-20 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <LiquidChrome 
          baseColor={[0.02, 0.02, 0.04]} 
          speed={0.1} 
          amplitude={0.2} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Link href="/shop" className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold tracking-[0.3em] uppercase mb-8 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Your Bag</h1>
            </div>
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">
              <ShoppingBag size={14} />
              <span>{totalItems()} Items in cart</span>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-32 text-center rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                <ShoppingBag size={32} className="text-white/20" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Your cart is empty</h2>
              <p className="text-white/40 mb-10 max-w-md mx-auto font-light">
                Looks like you haven't added any premium assets to your bag yet.
              </p>
              <Link href="/shop">
                <Button className="px-10 h-14 rounded-full bg-white text-black hover:bg-white/90 transition-all text-xs font-bold tracking-[0.3em] uppercase">
                  Discover Products
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
              {/* Cart List */}
              <div className="lg:col-span-8 space-y-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row gap-8 hover:bg-white/[0.04] transition-all"
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-40 aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden border border-white/10 shrink-0">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2 block">{item.category}</span>
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{item.name}</h3>
                          </div>
                          <div className="text-xl font-extrabold tracking-tighter">
                            {formatPrice(item.price)}
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-6">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/40 border border-white/5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-bold font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  <h2 className="text-2xl font-bold tracking-tight mb-8">Summary</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/40 font-light">Subtotal</span>
                      <span className="font-mono">{formatPrice(totalPrice())}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/40 font-light">Taxes (Estimated)</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/40 font-light">Cloud Processing Fee</span>
                      <span className="text-green-500 text-[10px] font-bold tracking-[0.2em] uppercase">WAVIED</span>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-extrabold tracking-tighter">{formatPrice(totalPrice())}</span>
                    </div>
                  </div>

                  <Button className="w-full h-16 rounded-full bg-white text-black hover:bg-white/90 transition-all text-xs font-bold tracking-[0.3em] uppercase group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Secure Checkout
                    <CreditCard size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
