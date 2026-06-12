"use client"

import { useState } from "react"
import { toggleBugReportResolved, deleteBugReport } from "@/app/actions/admin"
import Link from "next/link"
import {
  Bug,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calendar,
  X,
  Smartphone,
  Chrome,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react"

interface BugReport {
  id: string
  pageUrl: string
  issueType: string
  description: string
  userAgent: string | null
  resolved: boolean
  createdAt: Date
}

interface BugReportsManagerProps {
  initialBugs: BugReport[]
}

export default function BugReportsManager({ initialBugs }: BugReportsManagerProps) {
  const [bugs, setBugs] = useState<BugReport[]>(initialBugs)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open")
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Filtering
  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch =
      bug.pageUrl.toLowerCase().includes(search.toLowerCase()) ||
      bug.issueType.toLowerCase().includes(search.toLowerCase()) ||
      bug.description.toLowerCase().includes(search.toLowerCase())

    if (filter === "open") return matchesSearch && !bug.resolved
    if (filter === "resolved") return matchesSearch && bug.resolved
    return matchesSearch
  })

  // Mark resolved toggle
  const handleToggleResolve = async (bug: BugReport) => {
    setLoadingId(bug.id)
    const newStatus = !bug.resolved
    const res = await toggleBugReportResolved(bug.id, newStatus)
    if (res.success) {
      setBugs((prev) =>
        prev.map((b) => (b.id === bug.id ? { ...b, resolved: newStatus } : b))
      )
      if (selectedBug && selectedBug.id === bug.id) {
        setSelectedBug((prev) => (prev ? { ...prev, resolved: newStatus } : null))
      }
    }
    setLoadingId(null)
  }

  // Delete bug
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bug report?")) return
    setLoadingId(id)
    const res = await deleteBugReport(id)
    if (res.success) {
      setBugs((prev) => prev.filter((b) => b.id !== id))
      if (selectedBug && selectedBug.id === id) {
        setSelectedBug(null)
      }
    }
    setLoadingId(null)
  }

  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start select-none">
      {/* Bug Reports Inbox List */}
      <div className="flex-1 space-y-4">
        {/* Search & Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-800 bg-[#121214]/40 p-4 backdrop-blur-md">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full rounded-lg border border-neutral-800 bg-[#0e0e10]/60 py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/30 focus:bg-[#0e0e10]"
            />
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(["all", "open", "resolved"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium capitalize transition-all cursor-pointer ${
                  filter === t
                    ? "bg-white text-black font-semibold"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Bug Reports List */}
        <div className="space-y-3">
          {filteredBugs.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#121214]/20 p-8 text-center">
              <Bug className="h-8 w-8 text-neutral-600 mb-3" />
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">No bugs reported</p>
              <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">Database is clean. No bugs logged matching filters.</p>
            </div>
          ) : (
            filteredBugs.map((bug) => {
              const isSelected = selectedBug?.id === bug.id
              const path = new URL(bug.pageUrl || "http://localhost").pathname
              return (
                <div
                  key={bug.id}
                  onClick={() => setSelectedBug(bug)}
                  className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-neutral-400 bg-neutral-900/30"
                      : "border-neutral-900 bg-[#121214]/10 hover:border-neutral-800 hover:bg-[#121214]/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-bold transition-colors ${isSelected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                          {bug.issueType}
                        </span>
                        <span className={`rounded border px-1.5 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider ${
                          bug.resolved
                            ? "bg-neutral-950 border border-neutral-800 text-neutral-500"
                            : "bg-neutral-900 border border-neutral-700 text-white"
                        }`}>
                          {bug.resolved ? "Resolved" : "Open"}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">Path: {path}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-neutral-500 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleResolve(bug)}
                        disabled={loadingId === bug.id}
                        className="rounded p-1 hover:bg-neutral-800 hover:text-white transition-colors"
                        title={bug.resolved ? "Mark Open" : "Mark Resolved"}
                      >
                        {bug.resolved ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </button>
                      <button
                        onClick={() => handleDelete(bug.id)}
                        disabled={loadingId === bug.id}
                        className="rounded p-1 hover:bg-neutral-800 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">{bug.description}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900 text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(bug.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Selected Bug Sidebar Detail */}
      {selectedBug && (
        <div className="w-full lg:w-[420px] rounded-xl border border-neutral-800 bg-[#121214]/90 backdrop-blur-xl p-5 space-y-5 sticky top-6 z-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Bug className="h-4 w-4 text-neutral-400" />
              Bug Details
            </h3>
            <button
              onClick={() => setSelectedBug(null)}
              className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Stats Panel */}
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Category
              </span>
              <p className="text-xs font-bold text-white pl-4.5">{selectedBug.issueType}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Reported Page URL
              </span>
              <a
                href={selectedBug.pageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-white hover:underline pl-4.5 flex items-center gap-1.5 break-all"
              >
                {selectedBug.pageUrl}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Resolution State
              </span>
              <span className={`inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold mt-1 ml-4.5 ${
                selectedBug.resolved ? "bg-neutral-950 border border-neutral-800 text-neutral-500" : "bg-neutral-900 border border-neutral-700 text-white"
              }`}>
                {selectedBug.resolved ? "Resolved" : "Open"}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Description & Snippet
              </span>
              <div className="rounded-lg border border-neutral-900 bg-neutral-950 p-4 text-neutral-300 font-sans text-xs leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap select-text">
                {selectedBug.description}
              </div>
            </div>

            {selectedBug.userAgent && (
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                  <Smartphone className="h-3 w-3" /> Client Environment
                </span>
                <div className="rounded-lg border border-neutral-900 bg-neutral-950 p-3 text-[10px] text-neutral-500 break-all select-text leading-relaxed">
                  {selectedBug.userAgent}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-neutral-900 font-mono">
            <button
              onClick={() => handleToggleResolve(selectedBug)}
              disabled={loadingId === selectedBug.id}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selectedBug.resolved
                  ? "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {selectedBug.resolved ? "REOPEN BUG" : "RESOLVE & CLOSE"}
            </button>
            <button
              onClick={() => handleDelete(selectedBug.id)}
              disabled={loadingId === selectedBug.id}
              className="flex items-center justify-center rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-all cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
