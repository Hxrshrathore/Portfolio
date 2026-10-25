import { NextResponse } from "next/server"
import { isValidBridgeToken } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7).trim()
    if (!isValidBridgeToken(token)) {
      return NextResponse.json({ error: "Unauthorized access: invalid or unconfigured bridge token" }, { status: 401 })
    }

    return NextResponse.json({
      status: "online",
      service: "Harsh Portfolio API Bridge",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      note: "Connection successful. Ready to be integrated with the client portal.",
      availableScopes: [
        "read:analytics",
        "read:contacts",
        "write:contacts",
        "read:projects",
        "write:projects",
      ],
    })
  } catch (error) {
    console.error("API Bridge error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
