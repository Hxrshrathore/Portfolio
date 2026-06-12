"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_SECRET = process.env.ADMIN_SECRET || "Harshh@055"

export async function loginAdmin(password: string) {
  if (password === ADMIN_SECRET) {
    const cookieStore = await cookies()
    cookieStore.set("admin_token", ADMIN_SECRET, {
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
