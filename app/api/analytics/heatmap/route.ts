import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { clickEvents } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId, clicks } = body

    if (!sessionId || !Array.isArray(clicks) || clicks.length === 0) {
      return NextResponse.json({ success: true, count: 0 }) // No clicks to track
    }

    // Map and insert
    const insertValues = clicks.map((click: any) => ({
      sessionId,
      pathname: click.pathname,
      xPercent: click.xPercent,
      yPercent: click.yPercent,
      element: click.element || null,
    }))

    await db.insert(clickEvents).values(insertValues)

    return NextResponse.json({ success: true, count: insertValues.length })
  } catch (error) {
    console.error("Error inserting click events:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
