import type { Project } from "./projects-data"

export interface CaseStudyEngineeringDetails {
  slug: string
  headline: string
  role: string
  clientOrOrg: string
  timeline: string
  category: "Client Engagement" | "University Platform" | "Applied AI" | "Data Pipeline"
  architectureSummary: string
  coreProblem: string
  systemDesign: string[]
  technicalDecisions: {
    decision: string
    rationale: string
    tradeOff: string
  }[]
  debuggingChallenge: string
  securityAndReliability: string
  fdeRelevance: string
  verifiedDeliverables: string[]
  liveLink?: string
  githubUrl?: string
}

export const FEATURED_CASE_STUDIES: Record<string, CaseStudyEngineeringDetails> = {
  "nutgram": {
    slug: "nutgram",
    headline: "Commercial Client Management & Operations Portal",
    role: "Full-Stack Engineer (Design + Implementation)",
    clientOrOrg: "Nutgram (Freelance Client)",
    timeline: "April 2026 - Present",
    category: "Client Engagement",
    architectureSummary: "Next.js App Router application with PostgreSQL data persistence, authenticated administrative workflow, and role-based client dashboard for operational asset tracking.",
    coreProblem: "The client needed a consolidated platform to eliminate scattered email threads and manual document exchanges by providing client teams with a unified interface for project deliverables, status reporting, and review cycles.",
    systemDesign: [
      "Client UI Layer: Next.js with React 19, Tailwind CSS, and Framer Motion micro-interactions.",
      "API & Server Actions: Validated server mutations using Zod schemas and timing-safe session validation.",
      "Persistence Layer: Relational data model with indexed lookup by client organization and project ID.",
      "Storage & Delivery: Asset pipeline for client deliverables with signed URL generation."
    ],
    technicalDecisions: [
      {
        decision: "Server Actions instead of separate REST microservices",
        rationale: "Reduced network round-trips and shared type safety directly between client form inputs and server validation logic.",
        tradeOff: "Tightly coupled to Next.js runtime; mitigated by extracting business logic into standalone service helpers."
      },
      {
        decision: "Relational data schema with strict foreign keys",
        rationale: "Prevents orphaned client assets and guarantees atomic updates during deliverable revisions.",
        tradeOff: "Requires deliberate schema migrations during development iterations."
      }
    ],
    debuggingChallenge: "Resolved a session token hydration race condition where client components rendered inconsistent authorization states before cookie headers were processed on cold starts.",
    securityAndReliability: "Enforces strict server-side cookie verification on all `/admin` and client portal mutations. Fails closed with zero secret fallbacks.",
    fdeRelevance: "Demonstrates end-to-end forward-deployed execution: translating vague client operational pain points into an active, secure full-stack software system.",
    verifiedDeliverables: [
      "Role-Based Client Portal Dashboard",
      "Administrative Workflow & Review Pipeline",
      "Automated Status Notifications",
      "Secure Asset Delivery Pipeline"
    ],
    liveLink: "https://nutgram.vercel.app"
  },
  "kiitfest": {
    slug: "kiitfest",
    headline: "High-Traffic University Festival Digital Gateway",
    role: "Lead Frontend Engineer",
    clientOrOrg: "KIIT Student Activity Center",
    timeline: "Feb 2026 - Mar 2026",
    category: "University Platform",
    architectureSummary: "High-performance event platform engineered for high-concurrency event schedules, dynamic category filtering, and mobile-first student attendee access.",
    coreProblem: "Annual university festival required an interactive digital hub capable of handling sudden traffic spikes from thousands of student participants accessing real-time venue schedules, event rules, and registration portals across mobile networks.",
    systemDesign: [
      "Edge-Cached Pages: Static page pre-rendering with Next.js SSG for core schedule views to absorb traffic surges.",
      "Interaction Engine: Hardware-accelerated GSAP timelines and virtualized schedule feeds to maintain 60fps on mid-tier mobile devices.",
      "Resilient Fallbacks: Offline-tolerant caching and zero-dependency critical path rendering."
    ],
    technicalDecisions: [
      {
        decision: "Static Site Generation (SSG) with client-side interactive search",
        rationale: "Eliminated server load during peak announcement hours by pre-rendering all event rules and timetable trees.",
        tradeOff: "Schedule updates require incremental static revalidation rather than instant database streaming."
      },
      {
        decision: "Asset budgeting and lazy-loaded WebGL canvas",
        rationale: "Guaranteed initial meaningful paint under 1.2s on campus cellular connections.",
        tradeOff: "Visual flair renders progressively after critical event details are already interactive."
      }
    ],
    debuggingChallenge: "Diagnosed and eliminated layout thrashing on low-memory mobile browsers caused by simultaneous CSS transforms and unoptimized DOM repaints during multi-track schedule filtering.",
    securityAndReliability: "Static pre-generation guarantees 100% uptime even if upstream student databases experience high latency.",
    fdeRelevance: "Highlights user-centered performance engineering under fixed institutional deadlines with hard concurrency requirements.",
    verifiedDeliverables: [
      "Multi-Track Event Schedule Matrix",
      "Interactive Category Filter System",
      "Mobile-Optimized Registration Gateway",
      "High-Impact Motion & Visual Showcase"
    ],
    liveLink: "https://kiitfest-preview.vercel.app/"
  },
  "nexus-ai": {
    slug: "nexus-ai",
    headline: "AI-Augmented Contextual Workflow Assistant",
    role: "Applied AI Engineer & Full-Stack Developer",
    clientOrOrg: "Independent Engineering Exploration",
    timeline: "2025 - 2026",
    category: "Applied AI",
    architectureSummary: "Applied LLM application orchestrating contextual prompt templates, structured output parsing, and conversational memory with streaming UI feedback.",
    coreProblem: "Users frequently struggle to extract actionable summaries and structured schemas from unstructured notes without wrestling with brittle manual prompt engineering.",
    systemDesign: [
      "Inference Gateway: Node.js server route invoking LLM endpoints with configurable temperature and token limits.",
      "Streaming Response Handler: Server-Sent Events (SSE) pipe streaming tokens directly into React state for low-latency perceived response.",
      "JSON Schema Enforcement: Post-processing parser validating returned payload structures against Zod definitions.",
      "Error Recovery: Exponential backoff on rate-limited model calls with user-facing degraded mode indicators."
    ],
    technicalDecisions: [
      {
        decision: "Streaming SSE over polling or single-payload responses",
        rationale: "Drastically reduced Time-to-First-Token (TTFT) from 4s down to 350ms, maintaining engagement.",
        tradeOff: "Requires resilient client-side stream chunk reconstruction and reconnection handling."
      },
      {
        decision: "Deterministic JSON schema prompting with strict validation",
        rationale: "Ensures downstream application components receive dependable types without runtime errors.",
        tradeOff: "Slightly increased prompt token overhead for system instruction framing."
      }
    ],
    debuggingChallenge: "Fixed malformed JSON generation when models streamed truncated closing brackets by implementing an incremental stream-tolerant parsing state machine.",
    securityAndReliability: "API keys are strictly isolated in server-only execution environments; input sanitization prevents prompt injection into internal system instructions.",
    fdeRelevance: "Demonstrates practical applied AI capability: bridging raw foundation model APIs with dependable UI states and schema validation.",
    verifiedDeliverables: [
      "Streaming Token UI with Cursor Animation",
      "Structured JSON Extraction Engine",
      "Session Context Management",
      "Resilient Model Failover & Error Handling"
    ],
    liveLink: "https://nexus-ai-v1-3.vercel.app/"
  },
  "rcoe-data-extraction": {
    slug: "rcoe-data-extraction",
    headline: "Automated Data Extraction & Transformation Pipeline",
    role: "Automation & Backend Engineer",
    clientOrOrg: "RCOE Rajasthan (Institutional Project)",
    timeline: "May 2023 - 2024",
    category: "Data Pipeline",
    architectureSummary: "Automated data processing pipeline extracting tabular records from SQL datastores, executing data cleaning rules, and compiling validated analytical Excel reports via Python and Flask.",
    coreProblem: "Administrative teams spent hours manually copying and consolidating disparate student and institutional records from legacy SQL tables into formatted reports, introducing human transcription errors and reporting delays.",
    systemDesign: [
      "Extraction Worker: Python script querying SQL database tables with parameterized filtering.",
      "Transformation Pipeline: pandas dataframe pipelines executing type normalization, deduplication, and anomaly detection.",
      "Report Generator: openpyxl engine compiling styled multi-sheet workbooks with conditional formatting and summary totals.",
      "API Dispatcher: Lightweight Flask endpoint triggering batch processing runs on demand."
    ],
    technicalDecisions: [
      {
        decision: "Python + pandas + openpyxl over manual spreadsheets or SQL views",
        rationale: "Automated repeatable data hygiene checks, null-coalescing, and deterministic cell formatting in code.",
        tradeOff: "Requires Python execution environment alongside the host database."
      },
      {
        decision: "Parameterized queries with read-only database credentials",
        rationale: "Eliminates risk of accidental database corruption during high-volume report generation.",
        tradeOff: "Requires maintaining separate read and write database connection pools."
      }
    ],
    debuggingChallenge: "Resolved memory exhaustion when processing tables with over 50,000 rows by switching from in-memory workbook construction to chunked stream writing.",
    securityAndReliability: "Read-only database isolation ensures the extraction pipeline cannot alter live production records.",
    fdeRelevance: "Core FDE competency: connecting legacy enterprise data sources to modern automated workflows that solve real operational friction.",
    verifiedDeliverables: [
      "Automated SQL-to-Excel Transformation Engine",
      "Data Cleansing & Deduplication Pipeline",
      "Flask Batch Execution Endpoint",
      "Formatted Analytical Report Templates"
    ]
  }
}

// Slugs that represent beginner coursework or inappropriate titles that must NOT appear in public views
export const UNLISTED_PROJECT_SLUGS = new Set([
  "baddie-ops", // Inappropriate prototype title
  "snakegame-py",
  "clock-ui",
  "pizza-boss",
  "live-battery-percentage",
  "number-gussing-game",
  "simple-linear-regression-with-python",
  "iris-flower-classification-ml-python",
  "python-number-system-convertor",
  "zip-file-extractor",
  "ip-changer",
  "mac-spoofer",
  "fish-feeder",
  "ciggs-buddy",
  "facial-regognition-system",
  "object-identification-python",
  "human-like-typeing-simulation",
  "internet-speed-test-app",
  "resume-io2pdf",
  "image-from-site-to-telegram-bot",
  "instagram-followers-following-excel"
])

// Slugs of the top featured case studies
export const FEATURED_SLUGS = ["nutgram", "kiitfest", "nexus-ai", "rcoe-data-extraction"]

// Slugs of verified client & institutional production systems
export const PRODUCTION_PROJECT_SLUGS = new Set([
  "nutgram",
  "nutgram-client-portal",
  "kiitfest",
  "kritarth",
  "chimera",
  "hermes-racing",
  "viral-arc",
  "pandav-studio",
  "bikash-vidalya",
  "acsent-choacing-center",
  "indura-english-highschool",
  "sunshine-jr-sr-schoolcollege",
  "tedxkiit-university",
  "udghosh",
  "kiit-mun",
  "katulaiya-play-school",
  "ved-academy",
  "rcoe-data-extraction",
  "rcoe-flask-sql2excel",
  "rcoe",
  "rcoe-rajasthan"
])

// Slugs of clearly designated prototypes and experimental lab systems
export const LAB_PROTOTYPE_SLUGS = new Set([
  "nexus-ai",
  "verinews",
  "viral-arc-mbti",
  "digital-viking",
  "precollege-1",
  "precollege-2",
  "shopping-gennie",
  "senjuti-trust",
  "multi-sortable-client-table-ui",
  "estate",
  "blunt-e-commerce"
])

/**
 * Filter out unlisted hobby/inappropriate projects while preserving all 59 records in database.
 */
export function isPublicProject(project: Project): boolean {
  return !UNLISTED_PROJECT_SLUGS.has(project.slug.toLowerCase())
}

/**
 * Get curated public projects, partitioned by category.
 */
export function getCuratedProjects(allProjects: Project[]) {
  const publicProjects = allProjects.filter(isPublicProject)

  const featured = FEATURED_SLUGS
    .map(slug => publicProjects.find(p => p.slug.toLowerCase() === slug.toLowerCase()))
    .filter((p): p is Project => Boolean(p))

  const clientAndInstitutional = publicProjects.filter(
    p => PRODUCTION_PROJECT_SLUGS.has(p.slug.toLowerCase()) && !FEATURED_SLUGS.includes(p.slug.toLowerCase())
  )

  const labPrototypes = publicProjects.filter(
    p => LAB_PROTOTYPE_SLUGS.has(p.slug.toLowerCase()) && !FEATURED_SLUGS.includes(p.slug.toLowerCase())
  )

  const others = publicProjects.filter(
    p => !FEATURED_SLUGS.includes(p.slug.toLowerCase()) &&
         !PRODUCTION_PROJECT_SLUGS.has(p.slug.toLowerCase()) &&
         !LAB_PROTOTYPE_SLUGS.has(p.slug.toLowerCase())
  )

  return {
    featured,
    clientAndInstitutional,
    labPrototypes,
    others,
    allPublic: publicProjects
  }
}
