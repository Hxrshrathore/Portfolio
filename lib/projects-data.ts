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
    id: "liquid-chrome-portfolio",
    title: "Liquid Chrome Experience",
    description: "A revolutionary portfolio that redefines what's possible in the browser",
    longDescription:
      "This isn't just a portfolio — it's a statement. Built with cutting-edge WebGL technology and powered by innovative design thinking, this experience pushes the boundaries of web development. Every interaction is crafted to inspire, every animation designed to captivate.",
    image: "/placeholder.svg?height=400&width=600&text=Liquid+Chrome+Portfolio",
    heroImage: "/placeholder.svg?height=600&width=800&text=Liquid+Chrome+Hero",
    subtitle: "Where Art Meets Technology",
    slug: "liquid-chrome-portfolio",
    tags: ["React", "Next.js", "WebGL", "TypeScript"],
    category: "Web Designs",
    featured: true,
    demoUrl: "https://portfolio-demo.com",
    githubUrl: "https://github.com/hxrshrathore/portfolio",
    technologies: ["Next.js", "TypeScript", "WebGL", "Framer Motion", "Tailwind CSS"],
    challenges: [
      "Creating fluid WebGL animations that feel natural and responsive",
      "Achieving 60fps performance across all devices without compromise",
      "Building an interface that's both artistic and highly functional",
    ],
    solutions: [
      "Engineered custom WebGL shaders with OGL for maximum performance",
      "Implemented intelligent memory management and cleanup systems",
      "Created adaptive rendering that scales beautifully across devices",
    ],
    results: [
      "Achieved consistent 60fps performance on 95% of devices",
      "Reduced initial load time by 40% through smart optimization",
      "Increased user engagement by 300% with immersive interactions",
    ],
    process: [
      {
        title: "Vision & Research",
        description:
          "Explored the intersection of art and technology, studying fluid dynamics and chrome reflections to create something truly unique.",
        contentType: "gradient-cyan-emerald",
      },
      {
        title: "Technical Innovation",
        description:
          "Developed custom WebGL shaders and interaction systems that bring the liquid chrome effect to life with stunning realism.",
        contentType: "image",
      },
      {
        title: "Performance Mastery",
        description:
          "Optimized every frame, every calculation, every interaction to ensure the experience feels magical on any device.",
        contentType: "gradient-orange-yellow",
      },
      {
        title: "Launch & Impact",
        description:
          "Deployed with comprehensive monitoring and analytics, creating a new standard for interactive web experiences.",
        contentType: "gradient-purple-pink",
      },
    ],
  },
  {
    id: "next-gen-ecommerce",
    title: "Next-Gen Commerce Platform",
    description: "Redefining online shopping with AI-powered personalization",
    longDescription:
      "More than just an e-commerce platform — this is the future of digital retail. Combining machine learning, real-time analytics, and intuitive design to create shopping experiences that feel personal, seamless, and delightful.",
    image: "/placeholder.svg?height=400&width=600&text=E-commerce+Platform",
    heroImage: "/placeholder.svg?height=600&width=800&text=E-commerce+Hero",
    subtitle: "The Future of Digital Commerce",
    slug: "next-gen-ecommerce",
    tags: ["React", "Node.js", "AI/ML", "Stripe"],
    category: "Web Designs",
    featured: true,
    demoUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/hxrshrathore/ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "TensorFlow.js"],
    challenges: [
      "Processing millions of transactions with zero downtime",
      "Creating AI recommendations that feel natural, not intrusive",
      "Building a checkout flow that converts at the highest rates",
    ],
    solutions: [
      "Architected microservices with Redis caching for lightning speed",
      "Developed machine learning models that understand user behavior",
      "Designed a frictionless checkout that reduces abandonment by 60%",
    ],
    results: ["Processed over $5M in transactions", "Achieved 99.99% uptime", "Increased conversion rates by 45%"],
    process: [
      {
        title: "Market Intelligence",
        description:
          "Deep analysis of user behavior patterns and market trends to identify opportunities for innovation in digital commerce.",
        contentType: "gradient-blue-purple",
      },
      {
        title: "AI Integration",
        description:
          "Built sophisticated recommendation engines and personalization systems that learn and adapt to each user's preferences.",
        contentType: "image",
      },
      {
        title: "Seamless Experience",
        description:
          "Crafted every touchpoint from discovery to checkout, ensuring each interaction feels effortless and intuitive.",
        contentType: "gradient-green-teal",
      },
      {
        title: "Scale & Growth",
        description:
          "Deployed with enterprise-grade infrastructure, ready to handle millions of users and transactions with ease.",
        contentType: "gradient-red-orange",
      },
    ],
  },
  {
    id: "ai-creative-studio",
    title: "AI Creative Studio",
    description: "Where artificial intelligence meets human creativity",
    longDescription:
      "A groundbreaking platform that amplifies human creativity through AI. This isn't about replacing designers — it's about empowering them with tools that understand context, style, and intent to create something truly extraordinary.",
    image: "/placeholder.svg?height=400&width=600&text=AI+Creative+Studio",
    heroImage: "/placeholder.svg?height=600&width=800&text=AI+Studio+Hero",
    subtitle: "Amplifying Human Creativity",
    slug: "ai-creative-studio",
    tags: ["React", "Python", "OpenAI", "TensorFlow"],
    category: "AI/ML Projects",
    featured: false,
    demoUrl: "https://ai-studio-demo.com",
    githubUrl: "https://github.com/hxrshrathore/ai-studio",
    technologies: ["React", "Python", "OpenAI API", "TensorFlow", "WebGL"],
    challenges: [
      "Creating AI that understands artistic intent and context",
      "Building real-time collaboration between humans and AI",
      "Ensuring generated content maintains brand consistency",
    ],
    solutions: [
      "Developed custom neural networks trained on design principles",
      "Built real-time feedback loops between AI and human creativity",
      "Created brand-aware AI models that maintain visual consistency",
    ],
    results: [
      "Reduced design iteration time by 70%",
      "Increased creative output by 300%",
      "Achieved 95% user satisfaction in creative workflows",
    ],
    process: [
      {
        title: "Creative Research",
        description:
          "Studied the intersection of AI and creativity, understanding how technology can enhance rather than replace human imagination.",
        contentType: "gradient-indigo-purple",
      },
      {
        title: "AI Development",
        description:
          "Built sophisticated machine learning models that understand design principles, color theory, and visual composition.",
        contentType: "image",
      },
      {
        title: "Human-AI Interface",
        description:
          "Designed intuitive interfaces that make AI collaboration feel natural and empowering for creative professionals.",
        contentType: "gradient-pink-rose",
      },
      {
        title: "Creative Impact",
        description:
          "Launched with creative agencies and independent designers, transforming how they approach ideation and execution.",
        contentType: "gradient-emerald-green",
      },
    ],
  },
  {
    id: "immersive-fitness-experience",
    title: "Immersive Fitness Experience",
    description: "Transforming fitness through gamification and social connection",
    longDescription:
      "Fitness isn't just about exercise — it's about community, motivation, and personal growth. This platform combines cutting-edge health tracking with social features and gamification to create workouts that people actually look forward to.",
    image: "/placeholder.svg?height=400&width=600&text=Fitness+Experience",
    heroImage: "/placeholder.svg?height=600&width=800&text=Fitness+Hero",
    subtitle: "Fitness Reimagined",
    slug: "immersive-fitness-experience",
    tags: ["React Native", "HealthKit", "Firebase", "AR"],
    category: "UI/UX Designs",
    featured: true,
    demoUrl: "https://fitness-demo.com",
    githubUrl: "https://github.com/hxrshrathore/fitness-app",
    technologies: ["React Native", "HealthKit", "Firebase", "ARKit", "TensorFlow Lite"],
    challenges: [
      "Creating motivation that lasts beyond the first week",
      "Building accurate health tracking across different devices",
      "Designing social features that inspire rather than intimidate",
    ],
    solutions: [
      "Developed psychology-based gamification that builds lasting habits",
      "Integrated with multiple health platforms for comprehensive tracking",
      "Created supportive community features focused on encouragement",
    ],
    results: [
      "Achieved 80% user retention after 3 months",
      "Users increased workout frequency by 150%",
      "Built a community of 100,000+ active members",
    ],
    process: [
      {
        title: "Behavioral Research",
        description:
          "Studied exercise psychology and motivation patterns to understand what truly drives long-term fitness success.",
        contentType: "gradient-blue-cyan",
      },
      {
        title: "Experience Design",
        description:
          "Crafted user journeys that make fitness feel like play, with rewards and social connections that motivate continued engagement.",
        contentType: "image",
      },
      {
        title: "Technology Integration",
        description:
          "Seamlessly connected with health devices and platforms to provide comprehensive tracking without complexity.",
        contentType: "gradient-purple-indigo",
      },
      {
        title: "Community Building",
        description:
          "Launched with fitness influencers and built organic growth through word-of-mouth and social sharing features.",
        contentType: "gradient-green-blue",
      },
    ],
  },
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
},

  {
    id: "data-storytelling-platform",
    title: "Data Storytelling Platform",
    description: "Transforming complex data into compelling visual narratives",
    longDescription:
      "Data tells stories, but most platforms just show numbers. This platform transforms complex datasets into interactive narratives that reveal insights, patterns, and opportunities that traditional dashboards miss entirely.",
    image: "/placeholder.svg?height=400&width=600&text=Data+Platform",
    heroImage: "/placeholder.svg?height=600&width=800&text=Data+Hero",
    subtitle: "Where Data Becomes Story",
    slug: "data-storytelling-platform",
    tags: ["D3.js", "React", "Python", "WebGL"],
    category: "Graphics",
    featured: false,
    demoUrl: "https://dataviz-demo.com",
    githubUrl: "https://github.com/hxrshrathore/data-platform",
    technologies: ["D3.js", "React", "Python", "PostgreSQL", "WebGL"],
    challenges: [
      "Making complex data accessible to non-technical users",
      "Creating visualizations that reveal hidden patterns",
      "Building interactions that feel intuitive and powerful",
    ],
    solutions: [
      "Developed AI-powered narrative generation from raw data",
      "Created custom visualization components that adapt to data types",
      "Built progressive disclosure interfaces that guide exploration",
    ],
    results: [
      "Reduced data analysis time by 80%",
      "Increased data-driven decision making by 200%",
      "Enabled non-technical teams to find insights independently",
    ],
    process: [
      {
        title: "Data Psychology",
        description:
          "Researched how humans process visual information and make decisions based on data to inform design principles.",
        contentType: "gradient-teal-blue",
      },
      {
        title: "Visualization Innovation",
        description:
          "Created new chart types and interaction patterns that reveal insights traditional dashboards can't show.",
        contentType: "image",
      },
      {
        title: "Narrative Engine",
        description:
          "Built AI systems that automatically generate compelling stories from data patterns and anomalies.",
        contentType: "gradient-orange-red",
      },
      {
        title: "Enterprise Impact",
        description: "Deployed across Fortune 500 companies, transforming how teams understand and act on their data.",
        contentType: "gradient-violet-purple",
      },
    ],
  },
  {
    id: "blockchain-identity-platform",
    title: "Blockchain Identity Platform",
    description: "Decentralized identity management for the future web",
    longDescription:
      "Privacy and security shouldn't be afterthoughts. This platform puts users in complete control of their digital identity, using blockchain technology to create a system that's both secure and user-friendly.",
    image: "/projects/kiitmun.png?height=400&width=600&text=Blockchain+Identity",
    heroImage: "/placeholder.svg?height=600&width=800&text=Identity+Hero",
    subtitle: "Your Identity, Your Control",
    slug: "blockchain-identity-platform",
    tags: ["Solidity", "Web3", "React", "IPFS"],
    category: "Web Designs",
    featured: false,
    demoUrl: "https://identity-demo.com",
    githubUrl: "https://github.com/hxrshrathore/blockchain-identity",
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "MetaMask"],
    challenges: [
      "Making blockchain technology accessible to everyday users",
      "Ensuring privacy while maintaining verification capabilities",
      "Creating seamless experiences across different platforms",
    ],
    solutions: [
      "Built intuitive interfaces that hide blockchain complexity",
      "Implemented zero-knowledge proofs for privacy-preserving verification",
      "Created universal identity standards that work everywhere",
    ],
    results: [
      "Achieved 100% user data sovereignty",
      "Reduced identity verification time by 90%",
      "Eliminated data breaches through decentralization",
    ],
    process: [
      {
        title: "Blockchain Architecture",
        description:
          "Designed decentralized systems that put users in complete control while maintaining security and verification capabilities.",
        contentType: "gradient-yellow-orange",
      },
      {
        title: "Smart Contract Development",
        description:
          "Built secure, audited smart contracts that handle identity verification without compromising user privacy.",
        contentType: "image",
      },
      {
        title: "User Experience Design",
        description:
          "Created interfaces that make blockchain technology feel as simple as traditional web applications.",
        contentType: "gradient-cyan-blue",
      },
      {
        title: "Ecosystem Integration",
        description:
          "Partnered with platforms and services to create a universal identity system that works across the entire web.",
        contentType: "gradient-red-pink",
      },
    ],
  },
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
