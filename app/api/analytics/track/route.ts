import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { pageViews } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      sessionId,
      url,
      pathname,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      device,
      os,
      browser,
      screenWidth,
      screenHeight,
    } = body

    if (!sessionId || !url || !pathname) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Geolocation headers injected by Vercel
    const country = req.headers.get("x-vercel-ip-country") || null
    const city = req.headers.get("x-vercel-ip-city") || null

    const [inserted] = await db
      .insert(pageViews)
      .values({
        sessionId,
        url,
        pathname,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        country,
        city,
        device,
        os,
        browser,
        screenWidth,
        screenHeight,
        duration: 0, // initially 0, updated on unmount
      })
      .returning({ id: pageViews.id })

    return NextResponse.json({ success: true, id: inserted.id })
  } catch (error) {
    console.error("Error inserting page view:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, duration } = body

    if (!id || typeof duration !== "number") {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    await db
      .update(pageViews)
      .set({ duration })
      .where(eq(pageViews.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating page view duration:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
