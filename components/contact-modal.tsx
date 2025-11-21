"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent successfully!",
      description: "I'll get back to you as soon as possible.",
    })

    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/90 backdrop-blur-xl border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Fill out the form below and I'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/50"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/50"
            />
          </div>

          {/* Project Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-sm font-medium text-white/80">
              Project Type
            </label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              required
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/50">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
                <SelectItem value="website" className="focus:bg-white/10 focus:text-white">
                  Website Design & Development
                </SelectItem>
                <SelectItem value="webapp" className="focus:bg-white/10 focus:text-white">
                  Web Application
                </SelectItem>
                <SelectItem value="ecommerce" className="focus:bg-white/10 focus:text-white">
                  E-commerce Platform
                </SelectItem>
                <SelectItem value="landing" className="focus:bg-white/10 focus:text-white">
                  Landing Page
                </SelectItem>
                <SelectItem value="redesign" className="focus:bg-white/10 focus:text-white">
                  Website Redesign
                </SelectItem>
                <SelectItem value="other" className="focus:bg-white/10 focus:text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Dropdown */}
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium text-white/80">
              Budget Range
            </label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
              required
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/50">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
                <SelectItem value="small" className="focus:bg-white/10 focus:text-white">
                  $1,000 - $5,000
                </SelectItem>
                <SelectItem value="medium" className="focus:bg-white/10 focus:text-white">
                  $5,000 - $10,000
                </SelectItem>
                <SelectItem value="large" className="focus:bg-white/10 focus:text-white">
                  $10,000 - $25,000
                </SelectItem>
                <SelectItem value="enterprise" className="focus:bg-white/10 focus:text-white">
                  $25,000+
                </SelectItem>
                <SelectItem value="discuss" className="focus:bg-white/10 focus:text-white">
                  Let's Discuss
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-white/80">
              Project Details
            </label>
            <Textarea
              id="message"
              placeholder="Tell me about your project, goals, and any specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
