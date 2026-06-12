import { NextResponse } from "next/server"

const BRIDGE_SECRET = process.env.BRIDGE_SECRET || "bridge_prod_key_77a9cfef12bc"

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    if (token !== BRIDGE_SECRET) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 })
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
