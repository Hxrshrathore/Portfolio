"use server"

import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"
import { db } from "@/lib/db"
import { contactMessages } from "@/lib/db/schema"

export async function submitContactForm(data: ContactFormValues) {
  // Validate data on the server
  const validatedFields = contactSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields. Failed to send message.",
    }
  }

  try {
    // Insert into Neon database
    await db.insert(contactMessages).values({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      projectType: validatedFields.data.projectType,
      message: validatedFields.data.message,
    })

    console.log("Contact Form Submission Stored:", validatedFields.data)

    return {
      success: true,
      message: "Message sent! I'll be in touch soon.",
    }
  } catch (error) {
    console.error("Database Error:", error)
    return {
      success: false,
      error: "System error. Failed to store your message. Please try again later.",
    }
  }
}
