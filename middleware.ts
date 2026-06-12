import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_SECRET = process.env.ADMIN_SECRET || "Harshh@055"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only target admin routes
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value

    // If matching /admin/login
    if (pathname === "/admin/login") {
      if (adminToken === ADMIN_SECRET) {
        // Already authenticated, send to dashboard
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // For any other /admin path, verify credentials
    if (adminToken !== ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
