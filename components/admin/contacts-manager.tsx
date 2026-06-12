"use client"

import { useState } from "react"
import { markContactMessageRead, deleteContactMessage } from "@/app/actions/admin"
import {
  Mail,
  Search,
  Trash2,
  CheckCircle,
  Circle,
  Download,
  Calendar,
  X,
  User,
  Tag,
  MessageSquare,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  projectType: string
  message: string
  read: boolean
  createdAt: Date
}

interface ContactsManagerProps {
  initialMessages: Message[]
}

export default function ContactsManager({ initialMessages }: ContactsManagerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Filtering
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())

    if (filter === "unread") return matchesSearch && !msg.read
    if (filter === "read") return matchesSearch && msg.read
    return matchesSearch
  })

  // Mark Read/Unread
  const handleToggleRead = async (msg: Message) => {
    setLoadingId(msg.id)
    const newStatus = !msg.read
    const res = await markContactMessageRead(msg.id, newStatus)
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: newStatus } : m))
      )
      if (selectedMsg && selectedMsg.id === msg.id) {
        setSelectedMsg((prev) => (prev ? { ...prev, read: newStatus } : null))
      }
    }
    setLoadingId(null)
  }

  // Delete message
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    setLoadingId(id)
    const res = await deleteContactMessage(id)
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg(null)
      }
    }
    setLoadingId(null)
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Project Type", "Message", "Read Status", "Submitted At"]
    const rows = messages.map((m) => [
      m.name,
      m.email,
      m.projectType,
      m.message.replace(/"/g, '""'), // escape quotes
      m.read ? "Read" : "Unread",
      new Date(m.createdAt).toISOString(),
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `contacts_export_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start select-none">
      {/* Messages Inbox Column */}
      <div className="flex-1 space-y-4">
        {/* Search & Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-800 bg-[#121214]/40 p-4 backdrop-blur-md">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full rounded-lg border border-neutral-800 bg-[#0e0e10]/60 py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/30 focus:bg-[#0e0e10]"
            />
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(["all", "unread", "read"] as const).map((t) => (
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

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-mono font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white cursor-pointer ml-auto sm:ml-0"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#121214]/20 p-8 text-center">
              <Mail className="h-8 w-8 text-neutral-600 mb-3" />
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">No messages found</p>
              <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">Log database is empty or filtered out.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMsg?.id === msg.id
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-neutral-400 bg-neutral-900/30"
                      : "border-neutral-900 bg-[#121214]/10 hover:border-neutral-800 hover:bg-[#121214]/30"
                  } ${!msg.read ? "border-l-2 border-l-white" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-bold transition-colors ${isSelected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                          {msg.name}
                        </span>
                        <span className="rounded border border-neutral-800 bg-neutral-950 px-1.5 py-0.5 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          {msg.projectType}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{msg.email}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-neutral-500 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleRead(msg)}
                        disabled={loadingId === msg.id}
                        className="rounded p-1 hover:bg-neutral-800 hover:text-white transition-colors"
                        title={msg.read ? "Mark Unread" : "Mark Read"}
                      >
                        {msg.read ? <CheckCircle className="h-3.5 w-3.5 text-white" /> : <Circle className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={loadingId === msg.id}
                        className="rounded p-1 hover:bg-neutral-800 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">{msg.message}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900 text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
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

      {/* Selected Message Sidebar Detail */}
      {selectedMsg && (
        <div className="w-full lg:w-[420px] rounded-xl border border-neutral-800 bg-[#121214]/90 backdrop-blur-xl p-5 space-y-5 sticky top-6 z-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="h-4 w-4 text-neutral-400" />
              Inquiry Details
            </h3>
            <button
              onClick={() => setSelectedMsg(null)}
              className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Stats Panel */}
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <User className="h-3 w-3" /> Sender Name
              </span>
              <p className="text-xs font-bold text-white pl-4.5">{selectedMsg.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <Mail className="h-3 w-3" /> Email Address
              </span>
              <a
                href={`mailto:${selectedMsg.email}`}
                className="text-xs font-bold text-white hover:underline pl-4.5 flex items-center gap-1.5"
              >
                {selectedMsg.email}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <Tag className="h-3 w-3" /> Project Category
              </span>
              <p className="text-xs font-bold text-white pl-4.5">{selectedMsg.projectType}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" /> Message Body
              </span>
              <div className="rounded-lg border border-neutral-900 bg-neutral-950 p-4 text-neutral-300 font-sans text-xs leading-relaxed max-h-60 overflow-y-auto select-text whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-neutral-900 font-mono">
            <button
              onClick={() => handleToggleRead(selectedMsg)}
              disabled={loadingId === selectedMsg.id}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selectedMsg.read
                  ? "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {selectedMsg.read ? "MARK UNREAD" : "MARK AS READ"}
            </button>
            <button
              onClick={() => handleDelete(selectedMsg.id)}
              disabled={loadingId === selectedMsg.id}
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
