"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"
import Preloader from "./preloader"
import BlendedCursor from "./blended-cursor"
import SmoothScroll from "./smooth-scroll"
import ClickSpark from "./click-spark"
import BugReportWidget from "./bug-report-widget"

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isExcludedPage = pathname === "/bio" || pathname === "/playground"

  if (isExcludedPage) {
    return <div className="flex flex-col min-h-screen">{children}</div>
  }

  return (
    <Preloader>
      <BlendedCursor />
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={12}
            sparkRadius={20}
            sparkCount={8}
            duration={500}
            easing="ease-out"
            extraScale={1.2}
          >
            {children}
          </ClickSpark>
          <Footer />
        </div>
      </SmoothScroll>
      <BugReportWidget />
    </Preloader>
  )
}
