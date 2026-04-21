"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Bug, Send, Loader2, MessageSquareWarning, CheckCircle2, Terminal } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { bugReportSchema, type BugReportValues } from "@/lib/schemas/bug-report-schema"
import { submitBugReport } from "@/app/actions/bug-report"

export default function BugReportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const pathname = usePathname()
  const [userAgent, setUserAgent] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BugReportValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      issueType: "ui",
      description: "",
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setValue("pageUrl", typeof window !== "undefined" ? window.location.href : "")
      setValue("userAgent", userAgent)
    } else {
      // Reset success state when closing
      setTimeout(() => setIsSuccess(false), 300)
    }
  }, [isOpen, pathname, userAgent, setValue])

  const onSubmit = async (data: BugReportValues) => {
    setIsSubmitting(true)
    try {
      const result = await submitBugReport(data)
      if (result.success) {
        setIsSuccess(true)
        reset()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bug className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="sr-only">Report Bug</span>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/90 backdrop-blur-xl border-white/10 text-white overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquareWarning className="h-5 w-5 text-white" />
                  Report an Issue
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Found something broken? Let me know anonymously. I'll collect the page URL and browser info automatically.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="issueType" className="text-zinc-300">Issue Type</Label>
                  <Select
                    onValueChange={(value) => setValue("issueType", value as any)}
                    defaultValue="ui"
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-white/20">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="ui">UI/Layout Bug</SelectItem>
                      <SelectItem value="performance">Speed/Lag</SelectItem>
                      <SelectItem value="logical">Broken Feature</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.issueType && (
                    <p className="text-xs text-red-400">{errors.issueType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-zinc-300">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What happened? and how can I reproduce it?"
                    className="min-h-[120px] bg-white/5 border-white/10 focus:ring-white/20 placeholder:text-zinc-600"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1 px-1 opacity-50">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-white/40" /> Auto-filled Data
                  </span>
                  <p className="text-[10px] text-zinc-400 truncate font-mono">
                    <span className="text-zinc-500 italic">sysRoot://</span>{pathname}
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors font-mono uppercase text-xs tracking-widest"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Uplink Report
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-28 h-28 border border-zinc-800 rounded-full flex items-center justify-center"
                >
                  <div className="w-24 h-24 border border-zinc-700/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-[-10%] right-[-10%] h-[1px] bg-white/20 z-10 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
              </div>

              <h3 className="text-2xl font-bold tracking-tighter mb-2 uppercase font-mono">Report Uplinked</h3>
              <p className="text-zinc-500 text-xs font-mono mb-8 max-w-[280px] leading-relaxed">
                Your findings have been successfully transmitted to the developer core.
              </p>

              <div className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-lg font-mono text-[10px] text-left mb-8 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span>STATUS</span>
                  <span className="text-white px-2 bg-white/10 rounded">ACKNOWLEDGED</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>ENCRYPTION</span>
                  <span className="text-zinc-300">MODERN-RSA-4096</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>GATEWAY</span>
                  <span className="text-zinc-300">AS-SOUTH-1</span>
                </div>
                <div className="flex justify-between text-zinc-500 pt-2 border-t border-white/5">
                  <span>TIMESTAMP</span>
                  <span className="text-zinc-400">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="w-full border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all font-mono uppercase text-[10px] tracking-[0.3em] h-12"
              >
                Terminate Session
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
