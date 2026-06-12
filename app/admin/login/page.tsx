"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/app/actions/auth"
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setLoading(true)
    setError(null)

    try {
      const res = await loginAdmin(password)
      if (res.success) {
        router.push("/admin")
      } else {
        setError(res.error || "Authentication failed")
        setLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] text-white px-4">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm z-10 space-y-6"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-neutral-800 bg-[#121214] text-neutral-400">
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight font-mono text-white">
              ADMINISTRATOR AUTH
            </h1>
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
              Secure Workspace
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-neutral-800 bg-[#121214]/40 p-6 backdrop-blur-md shadow-2xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full rounded-xl border border-neutral-800 bg-[#0e0e10]/60 px-4 py-3 pl-11 pr-11 text-xs font-mono outline-none transition-all duration-200 placeholder:text-neutral-700 focus:border-white/30 focus:bg-[#0e0e10]"
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
                  <Lock className="h-4 w-4" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-900/20 bg-red-950/10 p-3 text-[11px] font-mono text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-mono font-bold text-black transition-all duration-200 hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  VERIFYING...
                </>
              ) : (
                <>
                  AUTHORIZE CONNECTION
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
          SYSTEM ACCESS SECURED
        </div>
      </motion.div>
    </div>
  )
}
