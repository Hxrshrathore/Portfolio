"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Eye, Code, Maximize2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ComponentPlaygroundProps {
  code?: string
  sandboxId?: string
  title: string
  preview?: React.ReactNode
}

export default function ComponentPlayground({ code, sandboxId, title, preview }: ComponentPlaygroundProps) {
  const [view, setView] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Code copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sandboxUrl = sandboxId 
    ? `https://codesandbox.io/embed/${sandboxId}?fontsize=14&hidenavigation=1&theme=dark&view=preview`
    : null

  return (
    <div className="w-full">
      {/* ── View Toggle ── */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setView("preview")}
            className={`relative px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
              view === "preview" ? "text-black" : "text-white/40 hover:text-white"
            }`}
          >
            {view === "preview" && (
              <motion.div
                layoutId="active-view"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10"><Eye size={12} className="inline mr-1" /> Preview</span>
          </button>
          <button
            onClick={() => setView("code")}
            className={`relative px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
              view === "code" ? "text-black" : "text-white/40 hover:text-white"
            }`}
          >
            {view === "code" && (
              <motion.div
                layoutId="active-view"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10"><Code size={12} className="inline mr-1" /> Code</span>
          </button>
        </div>
      </div>

      {/* ── Main Display ── */}
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] group shadow-2xl">
        <AnimatePresence mode="wait">
          {view === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              {preview ? (
                <div className="w-full h-full">
                  {preview}
                </div>
              ) : sandboxUrl ? (
                <iframe
                  src={sandboxUrl}
                  className="w-full h-full border-0"
                  title={title}
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microfilm; midi; payment; usb; vr; xr-spatial-tracking"
                  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                  <Maximize2 size={48} className="mb-4 opacity-10" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Interactive Preview Unavailable</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col"
            >
              {/* Code Header */}
              <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-all group"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="group-hover:scale-110 transition-transform" /> }
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-auto p-8 font-mono text-sm leading-relaxed text-white/80 bg-black/40 custom-scrollbar">
                <pre className="whitespace-pre-wrap">
                  <code>{code || "// No source code available for this component."}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Action Floating Bar (Optional) */}
        {sandboxId && view === "preview" && (
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={`https://codesandbox.io/s/${sandboxId}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="h-10 rounded-full bg-black/40 backdrop-blur-xl border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white">
                        Open in Sandbox <ExternalLink size={12} className="ml-2" />
                    </Button>
                </a>
            </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
