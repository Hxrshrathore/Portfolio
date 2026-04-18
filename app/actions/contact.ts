"use server"

import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"

export async function submitContactForm(data: ContactFormValues) {
  // Validate data on the server
  const validatedFields = contactSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields. Failed to send message.",
    }
  }

  // Simulate database interaction / delay
  // In the future, this is where NeonDB integration will happen
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log("Contact Form Submission:", validatedFields.data)

  return {
    success: true,
    message: "Message sent! I'll be in touch soon.",
  }
}
