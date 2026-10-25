"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isValidAdminToken, getAdminSecret } from "@/lib/auth"

export async function loginAdmin(password: string) {
  const adminSecret = getAdminSecret()

  // Fail closed if server has no configured secret
  if (!adminSecret) {
    return { success: false, error: "Administrative authentication is currently unavailable." }
  }

  if (isValidAdminToken(password)) {
    const cookieStore = await cookies()
    cookieStore.set("admin_token", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return { success: true }
  }

  return { success: false, error: "Incorrect password" }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  redirect("/admin/login")
}
