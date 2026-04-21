import { z } from "zod"

export const bugReportSchema = z.object({
  pageUrl: z.string().url(),
  issueType: z.enum(["ui", "performance", "logical", "suggestion", "other"]),
  description: z.string().min(10, "Please provide a bit more detail about the issue."),
  userAgent: z.string().optional(),
})

export type BugReportValues = z.infer<typeof bugReportSchema>
