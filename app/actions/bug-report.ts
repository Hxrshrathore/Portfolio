"use server"

import { bugReportSchema, type BugReportValues } from "@/lib/schemas/bug-report-schema"
import { db } from "@/lib/db"
import { bugReports } from "@/lib/db/schema"

export async function submitBugReport(data: BugReportValues) {
  const validatedFields = bugReportSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid data. Please check your inputs.",
    }
  }

  try {
    await db.insert(bugReports).values({
      pageUrl: validatedFields.data.pageUrl,
      issueType: validatedFields.data.issueType,
      description: validatedFields.data.description,
      userAgent: validatedFields.data.userAgent,
    })

    console.log("Bug Report Submitted:", validatedFields.data)

    return {
      success: true,
      message: "Thanks! Your report has been submitted anonymously. We'll look into it.",
    }
  } catch (error) {
    console.error("Database Error (Bug Report):", error)
    return {
      success: false,
      error: "Failed to submit report. Please try again later.",
    }
  }
}
