import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { uploadToR2 } from "@/lib/r2"
import { isValidAdminToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    // 1. Verify Authentication with fail-closed timing-safe check
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin_token")?.value

    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized access: admin privileges required" }, { status: 401 })
    }

    // 2. Parse Form Data
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // 3. Process File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 4. Upload to Cloudflare R2
    const fileUrl = await uploadToR2(buffer, file.name, file.type)

    return NextResponse.json({ success: true, url: fileUrl })
  } catch (error) {
    console.error("Upload handler error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal upload error" },
      { status: 500 }
    )
  }
}
