"use client"

import React, { useState } from "react"
import { createProductAdmin, updateProductAdmin, deleteProductAdmin } from "@/app/actions/admin"
import {
  ShoppingBag,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Check,
  Star,
  Coins,
  Upload,
} from "lucide-react"

interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number // stored as cents/paise
  category: string
  images: string[]
  features: string[]
  demoUrl: string | null
  downloadUrl: string | null
  tags: string[]
  featured: boolean
}

interface ProductsManagerProps {
  initialProducts: Product[]
}

const CATEGORIES = ["Templates", "Assets", "Components", "eBooks", "Other"]

const DEFAULT_PRODUCT: Partial<Product> = {
  slug: "",
  name: "",
  description: "",
  price: 0, // rupees
  category: "Templates",
  images: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600"],
  features: [],
  demoUrl: "",
  downloadUrl: "",
  tags: [],
  featured: false,
}

export default function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingField("images")
    setError(null)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success && data.url) {
        setEditingProduct((prev) => {
          if (!prev) return null
          const existingImages = prev.images || []
          return {
            ...prev,
            images: [data.url, ...existingImages],
          }
        })
      } else {
        setError(data.error || "Failed to upload image")
      }
    } catch (err) {
      console.error(err)
      setError("Error uploading image")
    }
    setUploadingField(null)
  }

  // Filtering
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = filterCategory === "ALL" || p.category === filterCategory

    return matchesSearch && matchesCategory
  })

  // Start Form Create
  const handleStartCreate = () => {
    setEditingProduct({ ...DEFAULT_PRODUCT })
    setIsEditMode(false)
    setError(null)
  }

  // Start Form Edit
  const handleStartEdit = (product: Product) => {
    // Convert price from paise to base rupee units (divide by 100)
    setEditingProduct({
      ...product,
      price: product.price / 100,
    })
    setIsEditMode(true)
    setError(null)
  }

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setLoading(true)
    const res = await deleteProductAdmin(id)
    if (res.success) {
      setProductsList((prev) => prev.filter((p) => p.id !== id))
    } else {
      alert(res.error || "Failed to delete product")
    }
    setLoading(false)
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    if (!editingProduct.slug || !editingProduct.name || !editingProduct.category) {
      setError("Slug, Name, and Category are required fields.")
      return
    }

    setLoading(true)
    setError(null)

    // Convert price to paise (multiply by 100) before saving
    const finalPayload = {
      ...editingProduct,
      price: Math.round((editingProduct.price || 0) * 100),
    }

    try {
      if (isEditMode) {
        // Update
        const res = await updateProductAdmin(editingProduct.id!, finalPayload)
        if (res.success) {
          setProductsList((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? (finalPayload as Product) : p))
          )
          setEditingProduct(null)
        } else {
          setError(res.error || "Failed to update product")
        }
      } else {
        // Create
        const res = await createProductAdmin(finalPayload)
        if (res.success) {
          // Add to list and close
          setProductsList((prev) => [finalPayload as Product, ...prev])
          setEditingProduct(null)
        } else {
          setError(res.error || "Failed to create product")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during submission.")
      console.error(err)
    }
    setLoading(false)
  }

  // Helpers to handle tags array (comma-separated string → string[])
  const handleArrayChange = (field: keyof Product, val: string) => {
    const arr = val.split(",").map((s) => s.trim()).filter(Boolean)
    setEditingProduct((prev) => (prev ? { ...prev, [field]: arr } : null))
  }

  return (
    <div className="space-y-6 select-none font-mono text-xs">
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-800 bg-[#121214]/40 p-4 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="w-full rounded-lg border border-neutral-800 bg-[#0e0e10]/60 py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/30 focus:bg-[#0e0e10]"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono font-medium outline-none focus:border-white/30 text-neutral-400 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Add Product button */}
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-mono font-bold text-black hover:bg-neutral-200 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            ADD ASSET
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#121214]/20 p-8 text-center">
            <ShoppingBag className="h-8 w-8 text-neutral-600 mb-3" />
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">No products found</p>
            <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">Store database has no matched items.</p>
          </div>
        ) : (
          filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="relative overflow-hidden rounded-xl border border-neutral-900 bg-[#121214]/10 transition-all duration-300 hover:border-neutral-850 hover:bg-[#121214]/30 p-4 space-y-3.5"
            >
              {/* Cover Image representation */}
              <div
                className="h-28 w-full rounded-lg bg-cover bg-center border border-neutral-900 filter grayscale contrast-[1.05] brightness-90 hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url(${prod.images?.[0] || "/og-image.png"})` }}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    {prod.category}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center gap-0.5">
                    <Coins className="h-3.5 w-3.5 text-neutral-450" />
                    ₹{(prod.price / 100).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1 font-sans">{prod.name}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">{prod.description}</p>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-1">
                {prod.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded border border-neutral-900 bg-neutral-950 px-1.5 py-0.5 text-[8px] font-mono text-neutral-450">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {prod.featured && (
                    <span className="flex items-center gap-1 text-[9px] text-white font-semibold">
                      <Star className="h-3.5 w-3.5 fill-white" />
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(prod)}
                    className="flex h-7.5 w-7.5 items-center justify-center rounded border border-neutral-800 bg-neutral-950 text-neutral-455 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="flex h-7.5 w-7.5 items-center justify-center rounded bg-neutral-950 border border-neutral-800 text-neutral-455 hover:text-red-400 hover:bg-neutral-900 transition-all cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Drawer */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            onClick={() => setEditingProduct(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Form Side Drawer */}
          <div className="relative w-full max-w-2xl bg-[#0e0e10] border-l border-neutral-855 shadow-2xl flex flex-col h-full z-10 text-xs font-mono">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4 bg-[#121214]">
              <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-white flex items-center gap-2">
                <ShoppingBag className="h-4.5 w-4.5 text-neutral-450" />
                {isEditMode ? `EDIT: ${editingProduct.name}` : "CREATE NEW ASSET"}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded p-1 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-text">
              {error && (
                <div className="rounded border border-red-900/20 bg-red-950/10 p-3 text-[11px] text-red-400">
                  {error}
                </div>
              )}

              {/* Inputs fields grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Product Name</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, name: e.target.value }))}
                    placeholder="e.g. Next.js SaaS Starter Template"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Slug (URL path)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.slug || ""}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, slug: e.target.value }))}
                    placeholder="e.g. saas-starter-template"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Asset Category</label>
                  <select
                    value={editingProduct.category || "Templates"}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, category: e.target.value }))}
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price (Rupees) */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Price (Rupees - ₹)</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min={0}
                      value={editingProduct.price ?? 0}
                      onChange={(e) => setEditingProduct((prev) => ({ ...prev!, price: Number(e.target.value) }))}
                      placeholder="e.g. 499"
                      className="w-full rounded border border-neutral-855 bg-neutral-950 py-2 pl-7 pr-4 outline-none focus:border-white/30 text-xs text-white"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">
                      ₹
                    </div>
                  </div>
                </div>

                {/* Demo URL */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Live Preview Demo URL</label>
                  <input
                    type="text"
                    value={editingProduct.demoUrl || ""}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, demoUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Download URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Download Link / Source Code (Gumroad)</label>
                  <input
                    type="text"
                    value={editingProduct.downloadUrl || ""}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, downloadUrl: e.target.value }))}
                    placeholder="e.g. https://gumroad.com/..."
                    className="w-full rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Image URLs list */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Image URLs (comma separated)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingProduct.images?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("images", e.target.value)}
                      placeholder="Provide image link(s) for cover thumbnails."
                      className="flex-1 rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                    <label className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-bold text-neutral-300 hover:bg-neutral-800 cursor-pointer shrink-0">
                      {uploadingField === "images" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingField !== null}
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Short Description</label>
                  <textarea
                    required
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct((prev) => ({ ...prev!, description: e.target.value }))}
                    placeholder="Details showing on shop lists."
                    rows={2}
                    className="w-full rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 font-sans"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-900" />

              {/* Lists arrays */}
              <div className="space-y-4">
                <h4 className="font-bold text-neutral-450 uppercase text-[9px] tracking-wider">
                  Feature Lists & Specifications
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Features */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Features checklist (comma separated)</label>
                    <input
                      type="text"
                      value={editingProduct.features?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("features", e.target.value)}
                      placeholder="e.g. Responsive, Dark Mode support, 60fps animations"
                      className="w-full rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Core Tags (comma separated)</label>
                    <input
                      type="text"
                      value={editingProduct.tags?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("tags", e.target.value)}
                      placeholder="e.g. React, Next.js, Framer Motion"
                      className="w-full rounded border border-neutral-855 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3 rounded border border-neutral-850 bg-neutral-950 p-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProduct.featured || false}
                  onChange={(e) => setEditingProduct((prev) => ({ ...prev!, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-805 bg-[#121214] text-white focus:ring-0 focus:ring-offset-0 accent-white cursor-pointer"
                />
                <label htmlFor="featured" className="font-semibold text-white select-none cursor-pointer">
                  Feature this product on top of the store directory
                </label>
              </div>

              {/* Form Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded border border-neutral-855 bg-neutral-950 px-4 py-2 font-bold text-neutral-450 hover:text-white hover:bg-neutral-900 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded bg-white px-5 py-2 font-bold text-black hover:bg-neutral-200 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      SAVING...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      SAVE ASSET
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
