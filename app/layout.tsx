import type React from "react"
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
  title: "Harsh Kumar | Web Designer, UI/UX & Front-End Developer – KIIT Student Portfolio 2025",
  description:
    "Explore Harsh Kumar's award-winning web, UI/UX, and graphic design portfolio. KIIT 3rd-year student—Python, data, and full stack developer. Available for projects and freelance work.",
  keywords: [
    "web designer portfolio 2025",
    "best web developer student India",
    "KIIT web designer",
    "top UI/UX designer portfolio",
    "front-end developer student",
    "Python web designer portfolio",
    "full stack junior portfolio",
    "data analyst web portfolio",
    "AI-ready portfolio site",
    "college student designer showcase",
    "website builder for hire",
    "modern creative web designer India",
    "KIIT 3rd year web designer",
    "student portfolio front-end projects",
    "Harsh Kumar web designer",
    "Bhubaneswar web developer",
    "React developer portfolio",
    "Next.js developer India",
    "UI/UX designer for hire",
    "freelance web designer student",
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
    title: "Harsh Kumar | Web Designer, UI/UX & Front-End Developer – KIIT Student Portfolio 2025",
    description:
      "Explore Harsh Kumar's award-winning web, UI/UX, and graphic design portfolio. KIIT 3rd-year student—Python, data, and full stack developer. Available for projects.",
    url: "https://hxrshrathore.vercel.app",
    siteName: "Harsh Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Kumar - Web Designer & Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar | Web Designer, UI/UX & Front-End Developer – KIIT Student Portfolio 2025",
    description:
      "Explore Harsh Kumar's award-winning web, UI/UX, and graphic design portfolio. KIIT 3rd-year student—Python, data, and full stack developer.",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
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
        <Analytics />
      </body>
    </html>
  )
}
