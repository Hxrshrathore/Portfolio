"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"
import { submitContactForm } from "@/app/actions/contact"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
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

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <p className="text-gray-400">hxrshrathore@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Phone</h3>
                  <p className="text-gray-400">+91 123-456-7890</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Location</h3>
                  <p className="text-gray-400">Bhubaneswar, India</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className={`bg-white/5 border-white/10 focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-red-500/60 mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={`bg-white/5 border-white/10 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-red-500/60 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-sm font-medium">
                      Project Inquiry
                    </label>
                    <Select
                      onValueChange={(value) => setValue("projectType", value, { shouldValidate: true })}
                    >
                      <SelectTrigger className={`bg-white/5 border-white/10 focus:border-blue-500 transition-colors ${errors.projectType ? 'border-red-500/50' : ''}`}>
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="web">Web Experience</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="fullstack">Full Stack Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="text-xs text-red-500/60 mt-1">{errors.projectType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={`bg-white/5 border-white/10 focus:border-blue-500 transition-colors resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-red-500/60 mt-1">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors h-12 text-sm font-bold uppercase tracking-widest"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
