"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { logoutAdmin } from "@/app/actions/auth"
import {
  LayoutDashboard,
  BarChart3,
  Mail,
  Bug,
  FolderKanban,
  FileText,
  ShoppingBag,
  Radio,
  LogOut,
  Menu,
  X,
  User,
  Clock,
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Keep digital clock updated
  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      setCurrentTime(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // If we are on the login page, bypass layout shell
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Contacts", href: "/admin/contacts", icon: Mail },
    { label: "Bug Reports", href: "/admin/bug-reports", icon: Bug },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "API Bridge", href: "/admin/api-bridge", icon: Radio },
  ]

  const handleLogout = async () => {
    await logoutAdmin()
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050507] font-sans text-neutral-200">
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-900 bg-[#09090b] transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-neutral-900 px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center font-mono text-[10px] font-bold text-white">H</div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">Harsh Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-neutral-500 hover:text-white md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-[#121214] border border-neutral-800 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-[#121214]/20"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-neutral-900 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500 transition-colors hover:bg-neutral-900 hover:text-white cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-900 bg-[#09090b]/40 px-6 backdrop-blur-md">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-neutral-500 hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="hidden text-[10px] font-mono uppercase tracking-widest text-neutral-400 md:block">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>

          {/* Right widgets */}
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 text-[10px] font-mono text-neutral-500 sm:flex">
              <Clock className="h-3.5 w-3.5 text-neutral-700" />
              <span>{currentTime || "00:00:00 AM"}</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-neutral-900 pl-6">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-neutral-800 bg-[#121214] text-neutral-400">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline-block text-neutral-500">Harsh Kumar</span>
            </div>
          </div>
        </header>

        {/* Dynamic page container */}
        <main className="flex-1 overflow-y-auto bg-[#070709] p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
