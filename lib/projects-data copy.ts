export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  category: string
  featured: boolean
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  process: {
    title: string
    description: string
    contentType?: string
  }[]
  slug: string
  subtitle: string
  heroImage: string
}

export const projects: Project[] = [
  
  {
  id: "kiit-mun-2025",
  title: "KIIT MUN 2025 Website",
  description: "Official website for KIIT Model United Nations 2025",
  longDescription:
    "A high-performance, fully redesigned platform built for KIIT MUN 2025 — one of India’s largest university-level MUN conferences. The website focuses on speed, clarity, and scalability while handling thousands of visitors, registrations, and daily updates.",
  image: "/projects/kiitmun.png?height=400&width=600&text=KIIT+MUN+2025",
  heroImage: "/projects/kiitmun.png?height=600&width=800&text=KIIT+MUN+Hero",
  subtitle: "Modern, Scalable & Conference-Ready",
  slug: "kiit-mun-2025",
  tags: ["Next.js", "React", "Tailwind", "SSR"],
  category: "Web Designs",
  featured: true,
  demoUrl: "https://kiitmun.org",
  technologies: ["Next.js", "React", "Tailwind CSS", "Server Components", "Vercel"],
  challenges: [
    "Redesigning a legacy MUN website from scratch",
    "Handling high traffic surges during registration windows",
    "Ensuring fast load times across low-end devices"
  ],
  solutions: [
    "Implemented a fully optimized Next.js 14 architecture",
    "Used smart caching, ISR, and CDN optimization for instant loads",
    "Built a modular content system for event heads to update pages quickly"
  ],
  results: [
    "Achieved 98+ Lighthouse performance score",
    "Reduced page load time by 60%",
    "Handled thousands of visitors without downtime"
  ],
  process: [
    {
      title: "Requirement Analysis",
      description:
        "Worked alongside the KIIT MUN core team to plan structure, content flow, and technical requirements.",
      contentType: "gradient-blue-cyan"
    },
    {
      title: "Design & Development",
      description:
        "Built a clean, modern UI with reusable components optimized for speed, accessibility, and branding.",
      contentType: "image"
    },
    {
      title: "Optimization Pass",
      description:
        "Implemented caching strategies, ISR, compression, and asset optimization for maximum performance.",
      contentType: "gradient-purple-pink"
    },
    {
      title: "Deployment",
      description:
        "Deployed on Vercel with real-time monitoring, analytics, and automatic CI/CD pipelines.",
      contentType: "gradient-emerald-green"
    }
  ],
},
{
  id: "chimera-6",
  title: "Chimera 6.0 Techfest Website",
  description: "The official website for KIIT's flagship technical fest — Chimera 6.0",
  longDescription:
    "Chimera 6.0 is KIIT's largest technical and innovation festival. This website was built to showcase events, hackathons, workshops, schedules, and team information with a fast, animated, and completely mobile-first UI designed for massive traffic.",
  image: "/placeholder.svg?height=400&width=600&text=Chimera+6.0",
  heroImage: "/placeholder.svg?height=600&width=800&text=Chimera+Hero",
  subtitle: "High-Impact Technical Fest Platform",
  slug: "chimera-6",
  tags: ["Next.js", "Animations", "Tailwind", "GSAP"],
  category: "Web Designs",
  featured: true,
  demoUrl: "https://chimera.kiit.ac.in",
  technologies: ["Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion"],
  challenges: [
    "Creating a visually striking design suitable for a technical fest",
    "Managing large amounts of event/schedule data",
    "Keeping the site fast while using heavy animations"
  ],
  solutions: [
    "Designed a modular events architecture with dynamic routing",
    "Used GSAP + Framer Motion for optimized animations without FPS drops",
    "Implemented clean caching and code-splitting for performance"
  ],
  results: [
    "Smooth 60fps animations across devices",
    "Fully responsive mobile-first layout with fast navigation",
    "Successfully supported high traffic during registration peaks"
  ],
  process: [
    {
      title: "Branding & Visual Direction",
      description:
        "Created a futuristic, tech-fest themed UI with neon accents and bold typography.",
      contentType: "gradient-blue-purple"
    },
    {
      title: "Animated Interface",
      description:
        "Integrated GSAP and Framer Motion to bring the brand identity alive with kinetic motion.",
      contentType: "image"
    },
    {
      title: "Data Architecture",
      description:
        "Built dynamic event pages, schedule systems, and organisers’ sections for easy updates.",
      contentType: "gradient-green-teal"
    },
    {
      title: "Launch & Testing",
      description:
        "Ran performance checks, device testing, SEO optimization, and deployed with monitoring.",
      contentType: "gradient-orange-red"
    }
  ],
}
]

// Export functions that are used by the components
export const getAllProjects = (): Project[] => {
  return projects
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured)
}

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug)
}

export const getRelatedProjects = (currentProjectId: string, limit = 3): Project[] => {
  return projects.filter((project) => project.id !== currentProjectId).slice(0, limit)
}

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "All") return projects
  return projects.filter((project) => project.category === category)
}
