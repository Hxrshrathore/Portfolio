"use client"

import React, { useState } from "react"
import { createBlogPostAdmin, updateBlogPostAdmin, deleteBlogPostAdmin } from "@/app/actions/admin"
import ReactMarkdown from "react-markdown"
import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Check,
  Eye,
  Edit,
  Calendar,
  Upload,
} from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  date: Date
  author: string
  image: string | null
  tags: string[]
  content: string
  readingTime: string | null
  published: boolean
}

interface BlogManagerProps {
  initialPosts: BlogPost[]
}

const DEFAULT_POST: Partial<BlogPost> = {
  slug: "",
  title: "",
  description: "",
  author: "hxrshrathore",
  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600",
  tags: [],
  content: "",
  readingTime: "5 min read",
  published: true,
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [postsList, setPostsList] = useState<BlogPost[]>(initialPosts)
  const [search, setSearch] = useState("")
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formTab, setFormTab] = useState<"edit" | "preview">("edit")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingField("image")
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
        setEditingPost((prev) => (prev ? { ...prev, image: data.url } : null))
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
  const filteredPosts = postsList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())

    return matchesSearch
  })

  // Start Form Create
  const handleStartCreate = () => {
    setEditingPost({ ...DEFAULT_POST })
    setIsEditMode(false)
    setFormTab("edit")
    setError(null)
  }

  // Start Form Edit
  const handleStartEdit = (post: BlogPost) => {
    setEditingPost({ ...post })
    setIsEditMode(true)
    setFormTab("edit")
    setError(null)
  }

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    setLoading(true)
    const res = await deleteBlogPostAdmin(id)
    if (res.success) {
      setPostsList((prev) => prev.filter((p) => p.id !== id))
    } else {
      alert(res.error || "Failed to delete post")
    }
    setLoading(false)
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    if (!editingPost.slug || !editingPost.title || !editingPost.content) {
      setError("Slug, Title, and Content are required fields.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (isEditMode) {
        // Update
        const res = await updateBlogPostAdmin(editingPost.id!, editingPost)
        if (res.success) {
          setPostsList((prev) =>
            prev.map((p) => (p.id === editingPost.id ? (editingPost as BlogPost) : p))
          )
          setEditingPost(null)
        } else {
          setError(res.error || "Failed to update blog post")
        }
      } else {
        // Create
        const res = await createBlogPostAdmin(editingPost)
        if (res.success) {
          // Reloader posts list by adding new
          setPostsList((prev) => [editingPost as BlogPost, ...prev])
          setEditingPost(null)
        } else {
          setError(res.error || "Failed to create blog post")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during submission.")
      console.error(err)
    }
    setLoading(false)
  }

  // Helpers to handle tags array (comma-separated string → string[])
  const handleTagsChange = (val: string) => {
    const arr = val.split(",").map((s) => s.trim()).filter(Boolean)
    setEditingPost((prev) => (prev ? { ...prev, tags: arr } : null))
  }

  return (
    <div className="space-y-6 select-none font-mono text-xs">
      {/* Top Search & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-800 bg-[#121214]/40 p-4 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border border-neutral-800 bg-[#0e0e10]/60 py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/30 focus:bg-[#0e0e10]"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" />
        </div>

        {/* Create Button */}
        <button
          onClick={handleStartCreate}
          className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-mono font-bold text-black hover:bg-neutral-200 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          NEW POST
        </button>
      </div>

      {/* Blogs List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#121214]/20 p-8 text-center">
            <FileText className="h-8 w-8 text-neutral-600 mb-3" />
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">No blog posts found</p>
            <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">Database log is empty.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative overflow-hidden rounded-xl border border-neutral-900 bg-[#121214]/10 transition-all duration-300 hover:border-neutral-850 hover:bg-[#121214]/30 p-4 space-y-3.5"
            >
              {/* Cover Image representation */}
              <div
                className="h-28 w-full rounded-lg bg-cover bg-center border border-neutral-900 filter grayscale contrast-[1.05] brightness-90 hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url(${post.image || "/og-image.png"})` }}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] text-neutral-500 font-mono">
                    {post.readingTime || "5 min read"}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[8px] font-mono font-semibold ${
                    post.published
                      ? "bg-neutral-950 border border-neutral-800 text-neutral-450"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-500"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1 font-sans">{post.title}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">{post.description}</p>
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded border border-neutral-900 bg-neutral-950 px-1.5 py-0.5 text-[8px] font-mono text-neutral-400">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="rounded border border-neutral-900 bg-neutral-950 px-1.5 py-0.5 text-[8px] font-mono text-neutral-600">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs font-mono">
                <span className="flex items-center gap-1 text-[9px] text-neutral-500 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(post)}
                    className="flex h-7.5 w-7.5 items-center justify-center rounded border border-neutral-800 bg-neutral-950 text-neutral-450 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex h-7.5 w-7.5 items-center justify-center rounded bg-neutral-950 border border-neutral-800 text-neutral-450 hover:text-red-400 hover:bg-neutral-900 transition-all cursor-pointer"
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
      {editingPost && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            onClick={() => setEditingPost(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Form container */}
          <div className="relative w-full max-w-2xl bg-[#0e0e10] border-l border-neutral-850 shadow-2xl flex flex-col h-full z-10 text-xs font-mono">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4 bg-[#121214]">
              <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-white flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-neutral-450" />
                {isEditMode ? `EDIT: ${editingPost.title}` : "CREATE NEW POST"}
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="rounded p-1 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Editor Tabs switcher */}
            <div className="flex border-b border-neutral-900 px-6 py-2 bg-[#0e0e10]">
              <button
                type="button"
                onClick={() => setFormTab("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded transition-all cursor-pointer ${
                  formTab === "edit"
                    ? "bg-white text-black font-semibold"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-450 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <Edit className="h-3.5 w-3.5" />
                EDIT FIELDS
              </button>
              <button
                type="button"
                onClick={() => setFormTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded transition-all cursor-pointer ml-2 ${
                  formTab === "preview"
                    ? "bg-white text-black font-semibold"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-450 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                MARKDOWN PREVIEW
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-text">
              {error && (
                <div className="rounded border border-red-900/20 bg-red-950/10 p-3 text-[11px] text-red-400">
                  {error}
                </div>
              )}

              {formTab === "edit" ? (
                /* Edit panel fields */
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Title */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Title</label>
                    <input
                      type="text"
                      required
                      value={editingPost.title || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, title: e.target.value }))}
                      placeholder="e.g. Optimizing SSD Storage and Cache Systems"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Post Slug (URL path)</label>
                    <input
                      type="text"
                      required
                      value={editingPost.slug || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, slug: e.target.value }))}
                      placeholder="e.g. optimizing-ssd-storage"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Author */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Author Name</label>
                    <input
                      type="text"
                      value={editingPost.author || "hxrshrathore"}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, author: e.target.value }))}
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Reading Time */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Reading Time Metric</label>
                    <input
                      type="text"
                      value={editingPost.readingTime || "5 min read"}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, readingTime: e.target.value }))}
                      placeholder="e.g. 5 min read"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={editingPost.tags?.join(", ") || ""}
                      onChange={(e) => handleTagsChange(e.target.value)}
                      placeholder="e.g. Optimization, DevOps, Hardware"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Image Cover URL */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Cover image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingPost.image || ""}
                        onChange={(e) => setEditingPost((prev) => ({ ...prev!, image: e.target.value }))}
                        placeholder="https://..."
                        className="flex-1 rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                      />
                      <label className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-bold text-neutral-300 hover:bg-neutral-800 cursor-pointer shrink-0">
                        {uploadingField === "image" ? (
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
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Excerpt / Short Description</label>
                    <textarea
                      required
                      value={editingPost.description || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, description: e.target.value }))}
                      placeholder="Summary snippet showing in blog list view cards."
                      rows={2}
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 font-sans"
                    />
                  </div>

                  {/* Content body Markdown area */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Markdown Content Body</label>
                    <textarea
                      required
                      value={editingPost.content || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev!, content: e.target.value }))}
                      placeholder="Write your article body content in standard GitHub markdown format."
                      rows={12}
                      className="w-full rounded border border-neutral-850 bg-neutral-950 p-3.5 outline-none focus:border-white/30 text-xs text-white font-mono leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                /* Preview panel */
                <div className="space-y-4 rounded border border-neutral-850 bg-neutral-950 p-5 max-h-[600px] overflow-y-auto select-text font-sans">
                  <div className="border-b border-neutral-900 pb-4 space-y-2">
                    <h1 className="text-xl font-bold text-white">{editingPost.title || "Untitled Article"}</h1>
                    <p className="text-xs text-neutral-450 italic">{editingPost.description || "No description provided."}</p>
                    <div className="flex gap-4 text-[10px] text-neutral-500 font-mono uppercase">
                      <span>Author: {editingPost.author}</span>
                      <span>•</span>
                      <span>Reading Time: {editingPost.readingTime}</span>
                    </div>
                  </div>

                  {editingPost.image && (
                    <img
                      src={editingPost.image}
                      alt="Preview cover"
                      className="w-full h-40 object-cover rounded border border-neutral-900 filter grayscale contrast-[1.05]"
                    />
                  )}

                  <div className="prose prose-invert prose-xs text-neutral-300 leading-relaxed space-y-3 text-xs">
                    {editingPost.content ? (
                      <ReactMarkdown>{editingPost.content}</ReactMarkdown>
                    ) : (
                      <p className="text-neutral-500 italic font-mono uppercase text-[10px]">No article body written yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Toggles */}
              <div className="flex items-center gap-3 rounded border border-neutral-850 bg-neutral-950 p-4">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingPost.published ?? true}
                  onChange={(e) => setEditingPost((prev) => ({ ...prev!, published: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-805 bg-[#121214] text-white focus:ring-0 focus:ring-offset-0 accent-white cursor-pointer"
                />
                <label htmlFor="published" className="font-semibold text-white select-none cursor-pointer">
                  Publish article immediately (will be visible on public blog)
                </label>
              </div>

              {/* Form Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="rounded border border-neutral-855 bg-neutral-950 px-4 py-2 font-bold text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer"
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
                      SAVE ARTICLE
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
