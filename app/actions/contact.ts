"use server"

import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact-schema"
import { db } from "@/lib/db"
import { contactMessages } from "@/lib/db/schema"
import { Resend } from "resend"

export async function submitContactForm(data: ContactFormValues) {
  // Validate data on the server
  const validatedFields = contactSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields. Failed to send message.",
    }
  }

  const { name, email, projectType, message } = validatedFields.data

  try {
    // 1. Insert into Neon database (primary persistent record)
    await db.insert(contactMessages).values({
      name,
      email,
      projectType,
      message,
    })

    console.log("Contact Form Submission Stored:", { name, email, projectType })
  } catch (error) {
    console.error("Database Error:", error)
    return {
      success: false,
      error: "System error. Failed to store your message. Please try again later.",
    }
  }

  // 2. Optional: Dispatch email notification via Resend (isolated from DB persistence)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "hxrshrathore@gmail.com"
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"

      const emailResult = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: email,
        subject: `New Portfolio Inquiry from ${name} [${projectType}]`,
        text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0c0c0e; color: #ffffff; border-radius: 12px; border: 1px solid #27272a;">
            <div style="margin-bottom: 20px;">
              <span style="display: inline-block; padding: 4px 10px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #00ffff; background-color: rgba(0, 255, 255, 0.1); border-radius: 9999px;">
                New Portfolio Inquiry
              </span>
            </div>
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #ffffff;">
              ${name} sent a message
            </h2>
            <div style="background-color: #18181b; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #27272a;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #a1a1aa;"><strong style="color: #ffffff;">Email:</strong> <a href="mailto:${email}" style="color: #00ffff; text-decoration: none;">${email}</a></p>
              <p style="margin: 0; font-size: 14px; color: #a1a1aa;"><strong style="color: #ffffff;">Project Type:</strong> ${projectType}</p>
            </div>
            <div style="background-color: #121214; padding: 16px; border-radius: 8px; border-left: 3px solid #00ffff; margin-bottom: 24px;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a;">Message</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #e4e4e7;">${message}</p>
            </div>
            <div style="border-top: 1px solid #27272a; padding-top: 16px;">
              <p style="margin: 0; font-size: 11px; color: #71717a;">
                Stored in Neon PostgreSQL database. Reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `,
      })

      if (emailResult.error) {
        console.error("Resend delivery failed (non-fatal, DB record saved):", emailResult.error)
      } else {
        console.log("Resend notification dispatched successfully, id:", emailResult.data?.id)
      }
    } catch (emailError) {
      console.error("Resend unexpected error (non-fatal, DB record saved):", emailError)
    }
  } else {
    console.warn("RESEND_API_KEY is not set. Contact message saved to database only.")
  }

  return {
    success: true,
    message: "Message sent! I'll be in touch soon.",
  }
}

