import type React from "react"
import { Suspense } from "react"
import "./globals.css"
import { Geist, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClickSpark from "@/components/click-spark"
import BlendedCursor from "@/components/blended-cursor"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import AnimatedFavicon from "@/components/animated-favicon"
import StructuredData from "@/components/structured-data"
import { PageTransitionProvider } from "@/components/page-transition"
import { Analytics } from "@vercel/analytics/next"
import BugReportWidget from "@/components/bug-report-widget"
import NavigationWrapper from "@/components/navigation-wrapper"
import AnalyticsTracker from "@/components/analytics-tracker"

const geistSans = Geist({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Harsh Kumar | Product-Minded Software Engineer & Applied AI Builder",
  description:
    "Product-Minded Software Engineer & Applied AI Builder. Engineering full-stack products, AI-powered applications, and high-leverage integrations — from problem discovery to production deployment.",
  keywords: [
    "Harsh Kumar",
    "Product-Minded Software Engineer",
    "Applied AI Builder",
    "Forward Deployed Engineer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Python Data Pipelines",
    "LLM Integrations",
    "API Automation",
    "WebGL Shaders",
    "Interface Engineering",
    "Bhubaneswar India",
    "hxrshrathore",
  ],
  authors: [{ name: "Harsh Kumar" }],
  creator: "Harsh Kumar",
  publisher: "Harsh Kumar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hxrshrathore.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harsh Kumar | Product-Minded Software Engineer & Applied AI Builder",
    description:
      "I design, engineer, and ship full-stack products, AI-powered applications, and integrations — from figuring out the problem to getting the solution running.",
    url: "https://hxrshrathore.vercel.app",
    siteName: "Harsh Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Kumar - Product-Minded Software Engineer & Applied AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar | Product-Minded Software Engineer & Applied AI Builder",
    description:
      "I design, engineer, and ship full-stack products, AI-powered applications, and integrations — from figuring out the problem to getting the solution running.",
    creator: "@hxrshrathore",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${inter.variable} font-sans bg-black text-white`}>
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageTransitionProvider>
            <AnimatedFavicon />
            <NavigationWrapper>
              <main className="flex-grow">
                {children}
              </main>
            </NavigationWrapper>
          </PageTransitionProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
