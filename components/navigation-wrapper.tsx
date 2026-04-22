"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"
import DevBanner from "./dev-banner"

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBioPage = pathname === "/bio"

  if (isBioPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <DevBanner />
      {children}
      <Footer />
    </>
  )
}
