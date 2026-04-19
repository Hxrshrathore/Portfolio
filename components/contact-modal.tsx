"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useForm } from "react-hook-form"
import TextPressure from "./text-pressure"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { X, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"
import { submitContactForm } from "@/app/actions/contact"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  })

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  const onFormSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(data)
      if (result.success) {
        toast({
          title: "Message Sent",
          description: result.message,
        })
        reset()
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Deep Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 z-0 bg-black/80 backdrop-blur-[40px]"
          />

          {/* Modal Container - Landscape Glass Portal */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.99 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 150,
              mass: 0.5
            }}
            className="relative z-10 w-full max-w-5xl bg-[#050505]/60 border border-white/5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[550px] max-h-[90vh] md:max-h-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-6 right-6 z-50 text-white/20 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>

            {/* Left Panel: Architectural Side Bar (30%) */}
            <div className="w-full md:w-1/3 p-10 bg-white/[0.02] flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
              <div className="w-full space-y-10 z-10 relative">
                <div className="space-y-3">
                  <div className="w-8 h-[2px] bg-white/20" />
                  <p className="text-white/20 text-xs font-bold tracking-[0.2em] uppercase">Connect</p>
                </div>
                
                {/* Image Placeholder */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group shadow-2xl"
                >
                  <Image 
                    src="/harsh.png" 
                    alt="Harsh Kumar" 
                    fill 
                    className="object-cover object-center grayscale hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Branding Text Clone */}
                <div className="relative h-16 w-full opacity-60 hover:opacity-100 transition-opacity duration-500">
                  <TextPressure
                    text="@hxrshrathore"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ff0000"
                    minFontSize={18}
                  />
                </div>
                
                {/* Horizontal Social Links */}
                <div className="flex flex-row justify-between gap-4">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group flex-1 flex items-center justify-center py-3 text-white/40 hover:text-white transition-all duration-500 border border-white/5 hover:border-white/20 rounded-xl bg-white/[0.01] hover:bg-white/[0.05]"
                    >
                      <social.icon size={18} className="group-hover:scale-110 transition-transform duration-500" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Clean Form (70%) */}
            <div className="w-full md:w-2/3 p-10 lg:p-14 flex flex-col justify-center">
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Input
                        {...register("name")}
                        placeholder="NAME"
                        className={`font-sans h-14 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all rounded-none px-0 text-lg ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="font-sans text-[10px] text-red-500/60 uppercase tracking-tighter">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input
                        {...register("email")}
                        placeholder="EMAIL"
                        type="email"
                        className={`font-sans h-14 bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all rounded-none px-0 text-lg ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="font-sans text-[10px] text-red-500/60 uppercase tracking-tighter">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Select
                      value={watch("projectType") || undefined}
                      onValueChange={(value) => setValue("projectType", value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`font-sans h-14 bg-transparent border-0 border-b border-white/10 text-white focus:border-white/40 focus:ring-0 rounded-none px-0 text-lg placeholder:text-white/10 ${errors.projectType ? 'border-red-500/50' : ''}`}>
                        <SelectValue placeholder="PROJECT INQUIRY" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0a] border-white/10 text-white rounded-none overflow-hidden backdrop-blur-3xl border-0 z-[110]">
                        <SelectItem value="web" className="font-sans focus:bg-white/5 transition-colors cursor-pointer">Web Experience</SelectItem>
                        <SelectItem value="design" className="font-sans focus:bg-white/5 transition-colors cursor-pointer">UI/UX Design</SelectItem>
                        <SelectItem value="fullstack" className="font-sans focus:bg-white/5 transition-colors cursor-pointer">Full Stack Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="font-sans text-[10px] text-red-500/60 uppercase tracking-tighter">{errors.projectType.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <Textarea
                      {...register("message")}
                      placeholder="MESSAGE"
                      className={`font-sans min-h-[120px] bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all rounded-none px-0 text-lg resize-none py-4 ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="font-sans text-[10px] text-red-500/60 uppercase tracking-tighter">{errors.message.message}</p>}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-16 bg-white text-black hover:bg-white/90 font-sans font-bold text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "TRANSMITTING..." : (
                        <>
                          Initiate Connection
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
