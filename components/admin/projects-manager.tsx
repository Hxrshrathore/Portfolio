"use client"

import React, { useState } from "react"
import { createProjectAdmin, updateProjectAdmin, deleteProjectAdmin } from "@/app/actions/admin"
import {
  FolderKanban,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Check,
  Star,
  ExternalLink,
  Github,
  Upload,
} from "lucide-react"

interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  heroImage: string
  tags: string[]
  domain: string
  status: string
  date: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string | null
  technologies: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  process: any[]
  metrics: any[]
}

interface ProjectsManagerProps {
  initialProjects: Project[]
}

const DOMAINS = ["WEB DEVELOPMENT", "DATA ANALYST", "WEB DESIGN", "AI/ML", "GD"]
const STATUSES = ["ACTIVE", "BUILDING", "ARCHIVED", "DOWN", "PROTOTYPE"]

const DEFAULT_PROJECT: Partial<Project> = {
  id: "",
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  longDescription: "",
  image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600",
  heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200",
  tags: [],
  domain: "WEB DEVELOPMENT",
  status: "ACTIVE",
  date: "",
  featured: false,
  demoUrl: "",
  githubUrl: "",
  technologies: [],
  challenges: [],
  solutions: [],
  results: [],
  process: [],
  metrics: [],
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects)
  const [search, setSearch] = useState("")
  const [filterDomain, setFilterDomain] = useState("ALL")
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [isEditMode, setIsEditMode] = useState(false) // false = Create, true = Edit
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "heroImage") => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingField(field)
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
        setEditingProject((prev) => (prev ? { ...prev, [field]: data.url } : null))
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
  const filteredProjects = projectsList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())

    const matchesDomain = filterDomain === "ALL" || p.domain === filterDomain

    return matchesSearch && matchesDomain
  })

  // Start Create Form
  const handleStartCreate = () => {
    setEditingProject({ ...DEFAULT_PROJECT })
    setIsEditMode(false)
    setError(null)
  }

  // Start Edit Form
  const handleStartEdit = (project: Project) => {
    setEditingProject({ ...project })
    setIsEditMode(true)
    setError(null)
  }

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    setLoading(true)
    const res = await deleteProjectAdmin(id)
    if (res.success) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id))
    } else {
      alert(res.error || "Failed to delete project")
    }
    setLoading(false)
  }

  // Submit Form Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    if (!editingProject.id || !editingProject.slug || !editingProject.title) {
      setError("Project ID, Slug, and Title are required fields.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (isEditMode) {
        // Update
        const res = await updateProjectAdmin(editingProject.id, editingProject)
        if (res.success) {
          setProjectsList((prev) =>
            prev.map((p) => (p.id === editingProject.id ? (editingProject as Project) : p))
          )
          setEditingProject(null)
        } else {
          setError(res.error || "Failed to update project")
        }
      } else {
        // Create
        const res = await createProjectAdmin(editingProject)
        if (res.success) {
          setProjectsList((prev) => [editingProject as Project, ...prev])
          setEditingProject(null)
        } else {
          setError(res.error || "Failed to create project")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during submission.")
      console.error(err)
    }
    setLoading(false)
  }

  // Helpers to handle array fields inputs (comma-separated string → string[])
  const handleArrayChange = (field: keyof Project, val: string) => {
    const arr = val.split(",").map((s) => s.trim()).filter(Boolean)
    setEditingProject((prev) => (prev ? { ...prev, [field]: arr } : null))
  }

  // Helper to handle JSON textarea updates (metrics / process)
  const handleJSONChange = (field: "process" | "metrics", jsonVal: string) => {
    try {
      const parsed = JSON.parse(jsonVal)
      setEditingProject((prev) => (prev ? { ...prev, [field]: parsed } : null))
    } catch (e) {
      // Allow user to write raw text, we parse on submit or let validation happen.
    }
  }

  return (
    <div className="space-y-6 select-none">
      {/* Top Search & Create Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-800 bg-[#121214]/40 p-4 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-neutral-800 bg-[#0e0e10]/60 py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/30 focus:bg-[#0e0e10]"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Domain Filter */}
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono font-medium outline-none focus:border-white/30 text-neutral-400 cursor-pointer"
          >
            <option value="ALL">All Domains</option>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Add Project Button */}
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-mono font-bold text-black hover:bg-neutral-200 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            ADD PROJECT
          </button>
        </div>
      </div>

      {/* Projects Table / Cards List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#121214]/20 p-8 text-center">
            <FolderKanban className="h-8 w-8 text-neutral-600 mb-3" />
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">No projects found</p>
            <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">Database is empty or query matched nothing.</p>
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div
              key={p.id}
              className="relative overflow-hidden rounded-xl border border-neutral-900 bg-[#121214]/10 transition-all duration-300 hover:border-neutral-850 hover:bg-[#121214]/30 p-4 space-y-3.5"
            >
              {/* Cover Image representation */}
              <div
                className="h-28 w-full rounded-lg bg-cover bg-center border border-neutral-900 filter grayscale contrast-[1.05] brightness-90 hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url(${p.image || "/og-image.png"})` }}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-bold text-neutral-400 font-mono uppercase tracking-wider">
                    {p.domain}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[8px] font-mono font-semibold ${
                    p.status === "ACTIVE"
                      ? "bg-neutral-950 border border-neutral-800 text-neutral-400"
                      : "bg-neutral-900 border border-neutral-700 text-white"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{p.title}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">{p.description}</p>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-1">
                {p.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded border border-neutral-900 bg-neutral-950 px-1.5 py-0.5 text-[8px] font-mono text-neutral-400">
                    {tech}
                  </span>
                ))}
                {p.technologies.length > 3 && (
                  <span className="rounded border border-neutral-900 bg-neutral-950 px-1.5 py-0.5 text-[8px] font-mono text-neutral-600">
                    +{p.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="flex items-center gap-1 text-[9px] text-white font-semibold">
                      <Star className="h-3.5 w-3.5 fill-white" />
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(p)}
                    className="flex h-7.5 w-7.5 items-center justify-center rounded border border-neutral-800 bg-neutral-950 text-neutral-450 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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

      {/* Editor Drawer Shell */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay background */}
          <div
            onClick={() => setEditingProject(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Form Side Drawer */}
          <div className="relative w-full max-w-2xl bg-[#0e0e10] border-l border-neutral-850 shadow-2xl flex flex-col h-full z-10 text-xs">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4 bg-[#121214]">
              <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-white flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-neutral-400" />
                {isEditMode ? `EDIT: ${editingProject.title}` : "CREATE NEW PROJECT"}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="rounded p-1 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-text font-mono">
              {error && (
                <div className="rounded border border-red-900/20 bg-red-950/10 p-3 text-[11px] text-red-400">
                  {error}
                </div>
              )}

              {/* Standard inputs grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* ID input - disabled in Edit mode */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Project ID (Unique key)</label>
                  <input
                    type="text"
                    required
                    disabled={isEditMode}
                    value={editingProject.id || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, id: e.target.value }))}
                    placeholder="e.g. dynamic-dashboard"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Slug input */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Project Slug (URL path)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, slug: e.target.value }))}
                    placeholder="e.g. dynamic-dashboard"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, title: e.target.value }))}
                    placeholder="e.g. AI Storage Cleaner Panel"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={editingProject.subtitle || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, subtitle: e.target.value }))}
                    placeholder="e.g. Real-time storage cleanup visualization tool"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Domain Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Domain Category</label>
                  <select
                    value={editingProject.domain || "WEB DEVELOPMENT"}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, domain: e.target.value }))}
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Project Status</label>
                  <select
                    value={editingProject.status || "ACTIVE"}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, status: e.target.value }))}
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 cursor-pointer"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Date String</label>
                  <input
                    type="text"
                    required
                    value={editingProject.date || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, date: e.target.value }))}
                    placeholder="e.g. June 2026"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Demo Url */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, demoUrl: e.target.value }))}
                    placeholder="e.g. https://myproject.com"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Github Url */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, githubUrl: e.target.value }))}
                    placeholder="e.g. https://github.com/hxrshrathore/myproject"
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>

                {/* Cover Image URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Cover Thumbnail Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingProject.image || ""}
                      onChange={(e) => setEditingProject((prev) => ({ ...prev!, image: e.target.value }))}
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
                        onChange={(e) => handleImageUpload(e, "image")}
                      />
                    </label>
                  </div>
                </div>

                {/* Hero Image URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Hero Section Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingProject.heroImage || ""}
                      onChange={(e) => setEditingProject((prev) => ({ ...prev!, heroImage: e.target.value }))}
                      placeholder="https://..."
                      className="flex-1 rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                    <label className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-bold text-neutral-300 hover:bg-neutral-800 cursor-pointer shrink-0">
                      {uploadingField === "heroImage" ? (
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
                        onChange={(e) => handleImageUpload(e, "heroImage")}
                      />
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Short Description</label>
                  <textarea
                    required
                    value={editingProject.description || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, description: e.target.value }))}
                    placeholder="Provide a 2-sentence summary of the case study."
                    rows={2}
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30 font-sans"
                  />
                </div>

                {/* Long Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400">Long Description (Markdown content)</label>
                  <textarea
                    required
                    value={editingProject.longDescription || ""}
                    onChange={(e) => setEditingProject((prev) => ({ ...prev!, longDescription: e.target.value }))}
                    placeholder="Provide the fully-detailed documentation."
                    rows={6}
                    className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-900" />

              {/* Comma separated lists */}
              <div className="space-y-4">
                <h4 className="font-bold text-neutral-400 uppercase text-[9px] tracking-wider">
                  Tags & Metadata Lists
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Core Tags (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.tags?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("tags", e.target.value)}
                      placeholder="e.g. Next.js, WebGL, Design"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Technologies */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.technologies?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("technologies", e.target.value)}
                      placeholder="e.g. React 19, Recharts, Drizzle ORM"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Challenges */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Challenges (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.challenges?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("challenges", e.target.value)}
                      placeholder="e.g. High memory leaks on Canvas, Nested state updates"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Solutions */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Solutions (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.solutions?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("solutions", e.target.value)}
                      placeholder="e.g. Batch updating clicks, Unmounting events handler"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Results */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Results achieved (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.results?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("results", e.target.value)}
                      placeholder="e.g. 40% performance boost, 100% test coverage"
                      className="w-full rounded border border-neutral-850 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* JSON areas (Process & Metrics) */}
              <div className="space-y-4">
                <h4 className="font-bold text-neutral-400 uppercase text-[9px] tracking-wider">
                  Advanced Data Arrays (JSON)
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Process JSON */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Process Steps JSON</label>
                      <span className="text-[8px] text-neutral-500">[{`{title: string, description: string}`}...]</span>
                    </div>
                    <textarea
                      value={JSON.stringify(editingProject.process, null, 2)}
                      onChange={(e) => handleJSONChange("process", e.target.value)}
                      placeholder="e.g. []"
                      rows={4}
                      className="w-full rounded border border-neutral-850 bg-[#070709] p-3 outline-none focus:border-white/30 font-mono text-[10px]"
                    />
                  </div>

                  {/* Metrics JSON */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Metrics Array JSON</label>
                      <span className="text-[8px] text-neutral-500">[{`{label: string, value: number, unit?: string}`}...]</span>
                    </div>
                    <textarea
                      value={JSON.stringify(editingProject.metrics, null, 2)}
                      onChange={(e) => handleJSONChange("metrics", e.target.value)}
                      placeholder="e.g. []"
                      rows={4}
                      className="w-full rounded border border-neutral-850 bg-[#070709] p-3 outline-none focus:border-white/30 font-mono text-[10px]"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3 rounded border border-neutral-850 bg-neutral-950 p-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject((prev) => ({ ...prev!, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-800 bg-[#121214] text-white focus:ring-0 focus:ring-offset-0 accent-white cursor-pointer"
                />
                <label htmlFor="featured" className="font-semibold text-white select-none cursor-pointer">
                  Feature this project on the homepage slider
                </label>
              </div>

              {/* Form Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
                      SAVE PROJECT
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
