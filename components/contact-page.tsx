"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"
import { submitContactForm } from "@/app/actions/contact"
import LiquidChrome from "./liquid-chrome"
import TextPressure from "./text-pressure"

const socialLinks = [
  { icon: Github, href: "https://github.com/hxrshrathore", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/hxrshrathore", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/hxrshrathore", label: "Twitter" },
]

export default function ContactPage() {
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

  const onFormSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(data)
      if (result.success) {
        toast({
          title: "TRANSMISSION SUCCESSFUL",
          description: result.message,
        })
        reset()
      } else {
        toast({
          title: "TRANSMISSION ERROR",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden pt-20">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <LiquidChrome 
          baseColor={[0.02, 0.02, 0.02]} 
          speed={0.15} 
          amplitude={0.4} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12 md:py-24">
        {/* Architectural Header */}
        <div className="mb-20 md:mb-32 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">Initiate Connection</span>
            </div>
            
            <div className="relative h-[150px] md:h-[320px] w-full max-w-6xl mx-auto flex items-center justify-center">
              <TextPressure
                text="CONTACT"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={60}
              />
            </div>
            
            <p className="text-xl md:text-3xl font-light text-white/40 tracking-tight mt-6 italic">
              Let's build something <span className="text-white font-normal underline decoration-white/10 underline-offset-8">extraordinary</span> together.
            </p>
          </motion.div>
        </div>

        {/* Main Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Panel: Info (4 Col) */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Profile Card */}
              <div className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] bg-white/[0.02] backdrop-blur-sm shadow-2xl">
                <Image 
                  src="/harsh.png" 
                  alt="Harsh Kumar" 
                  fill 
                  className="object-cover object-center grayscale hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-12 w-full mb-1 opacity-80 hover:opacity-100 transition-opacity">
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
                      minFontSize={20}
                    />
                  </div>
                  <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Creative Developer</p>
                </div>
              </div>

              {/* Contact Details Bento */}
              <div className="grid grid-cols-1 gap-4">
                <a 
                  href="mailto:hxrshrathore@gmail.com"
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Mail size={18} className="text-white/40 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Email</p>
                      <p className="text-sm font-medium">hxrshrathore@gmail.com</p>
                    </div>
                  </div>
                </a>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin size={18} className="text-white/40" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Location</p>
                      <p className="text-sm font-medium">Bhubaneswar, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials Grid */}
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group"
                  >
                    <social.icon size={20} className="text-white/40 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Form (8 Col) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-14 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-12">
                  <h4 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 italic font-light opacity-90">Start Your Journey.</h4>
                  <p className="text-white/40 text-lg md:text-xl font-light">Have a vision? Describe it, and I'll handle the architecture.</p>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <Input
                        {...register("name")}
                        placeholder="YOUR NAME"
                        className={`h-16 bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-xl font-sans text-white focus:bg-transparent placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500/60 uppercase tracking-widest mt-2">{errors.name.message}</p>}
                    </div>
                    <div className="group relative">
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className={`h-16 bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-xl font-sans text-white focus:bg-transparent placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500/60 uppercase tracking-widest mt-2">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="relative">
                    <Select
                      onValueChange={(value) => setValue("projectType", value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`h-16 bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-xl font-sans text-white focus:bg-transparent focus:border-white/40 focus:ring-0 transition-all placeholder:text-white/10 ${errors.projectType ? 'border-red-500/50' : ''}`}>
                        <SelectValue placeholder="PROJECT INQUIRY" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0a] border-white/10 text-white rounded-xl overflow-hidden backdrop-blur-3xl z-[120]">
                        <SelectItem value="web" className="py-4 hover:bg-white/5 transition-colors cursor-pointer">Web Experience</SelectItem>
                        <SelectItem value="design" className="py-4 hover:bg-white/5 transition-colors cursor-pointer">UI/UX Design</SelectItem>
                        <SelectItem value="fullstack" className="py-4 hover:bg-white/5 transition-colors cursor-pointer">Full Stack Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="text-[10px] text-red-500/60 uppercase tracking-widest mt-2">{errors.projectType.message}</p>}
                  </div>

                  <div className="relative">
                    <Textarea
                      {...register("message")}
                      placeholder="TELL ME ABOUT YOUR VISION"
                      className={`min-h-[200px] bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-xl font-sans text-white focus:bg-transparent placeholder:text-white/10 focus:border-white/40 focus:ring-0 transition-all resize-none py-6 ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-[10px] text-red-500/60 uppercase tracking-widest mt-2">{errors.message.message}</p>}
                  </div>

                  <div className="pt-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full h-20 bg-white text-black hover:bg-white/95 text-sm font-bold tracking-[0.3em] uppercase transition-all rounded-2xl overflow-hidden overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        {isSubmitting ? "TRANSMITTING DATA..." : (
                          <>
                            Initiate Connection
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
