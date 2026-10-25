import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isValidAdminToken } from "@/lib/auth"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Protect Admin API endpoints
  if (pathname.startsWith("/api/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value
    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json({ error: "Unauthorized access: admin privileges required" }, { status: 401 })
    }
    return NextResponse.next()
  }

  // 2. Protect Admin UI routes
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value
    const isAuthenticated = isValidAdminToken(adminToken)

    // Bypass check for the login page
    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        // Already authenticated, forward to admin dashboard
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // For any other /admin route, require valid authentication
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}

