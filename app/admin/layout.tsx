import type React from "react"
import { cookies } from "next/headers"
import { isValidAdminToken } from "@/lib/auth"
import AdminClientLayout from "@/components/admin/admin-client-layout"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  const isAuthenticated = isValidAdminToken(token)

  return (
    <AdminClientLayout isAuthenticated={isAuthenticated}>
      {children}
    </AdminClientLayout>
  )
}

