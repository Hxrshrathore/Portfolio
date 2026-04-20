import "dotenv/config"
// Import db using require to ensure it happens after dotenv/config
const { db } = require("../lib/db")
const { projects } = require("../lib/db/schema")

const rawProjects = [
  { sno: 1, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Nutgram", github: "", status: "BUILDING", dates: "Aprill'26 -Present" },
  { sno: 2, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Nutgram Client-Portal", github: "", status: "BUILDING", dates: "Aprill'26 -Present" },
  { sno: 3, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "KIITFEST", github: "", status: "ACTIVE", dates: "Feb'26-Mar'26" },
  { sno: 4, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "Kritarth", github: "", status: "ACTIVE", dates: "Jan'26" },
  { sno: 5, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Hermes Racing", github: "", status: "ACTIVE", dates: "Dec'25-Jan'26" },
  { sno: 6, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Viral ARC", github: "", status: "ACTIVE", dates: "Nov'25-Jan'26" },
  { sno: 7, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Viral ARC MBTI", github: "", status: "ARCHIVED", dates: "Jan'26" },
  { sno: 8, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Digital Viking", github: "", status: "ARCHIVED", dates: "Jan'26" },
  { sno: 9, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "Chimera", github: "", status: "ACTIVE", dates: "Oct'25-Nov'25" },
  { sno: 10, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "Udghosh", github: "", status: "ACTIVE", dates: "Mar'26-Apr'26" },
  { sno: 11, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "TEDxKIIT University", github: "", status: "ACTIVE", dates: "Mar'26-Apr'26" },
  { sno: 12, type: "KIIT Event", tags: "des+dev", lang: "Typescript", name: "KIIT MUN", github: "", status: "DOWN", dates: "Oct'25-Dec'25" },
  { sno: 13, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Acsent Choacing Center", github: "", status: "ARCHIVED", dates: "Apr'25-May'25" },
  { sno: 14, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Hemsida", github: "", status: "ARCHIVED", dates: "Apr'25-May'26" },
  { sno: 15, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Sunshine Jr. Sr. School/College", github: "", status: "ARCHIVED", dates: "" },
  { sno: 16, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Indura English Highschool", github: "", status: "ARCHIVED", dates: "Apr'25" },
  { sno: 17, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "DMC Marks", github: "", status: "ARCHIVED", dates: "" },
  { sno: 18, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Katulaiya Play School", github: "", status: "ARCHIVED", dates: "July'25" },
  { sno: 19, type: "Hemsida", tags: "des+dev", lang: "Typescript", name: "Bikash Vidalya", github: "", status: "ARCHIVED", dates: "Apr'25" },
  { sno: 20, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "RCOE Rajasthan", github: "", status: "ARCHIVED", dates: "" },
  { sno: 21, type: "Project", tags: "des+dev, AI", lang: "Typescript", name: "Nexus AI", github: "", status: "BUILDING", dates: "" },
  { sno: 22, type: "Project", tags: "des+dev", lang: "Typescript", name: "Verinews", github: "", status: "BUILDING", dates: "" },
  { sno: 23, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Precollege 1", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 24, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Precollege 2", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 25, type: "Prototype", tags: "des", lang: "Figma", name: "Agency (Red & Black)", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 26, type: "Freelance", tags: "des+dev", lang: "Typescript", name: "Pandav Studio", github: "", status: "ARCHIVED", dates: "" },
  { sno: 27, type: "Freelance", tags: "dev", lang: "PHP", name: "Ved Academy", github: "", status: "ARCHIVED", dates: "" },
  { sno: 28, type: "Freelance", tags: "dev", lang: "Python", name: "RCOE data Extraction", github: "", status: "ARCHIVED", dates: "" },
  { sno: 29, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Shopping Gennie", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 30, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Senjuti Trust", github: "", status: "PROTOTYPE", dates: "July'25" },
  { sno: 31, type: "Project", tags: "des+dev", lang: "Typescript", name: "Multi-Sortable-Client-Table-UI", github: "", status: "ARCHIVED", dates: "July'25" },
  { sno: 32, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Estate", github: "", status: "PROTOTYPE", dates: "May'25" },
  { sno: 33, type: "Project", tags: "des+dev", lang: "Typescript", name: "Blunt E-commerce", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 34, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Mr Architech", github: "Fix Code from V0", status: "PROTOTYPE", dates: "Apr'25" },
  { sno: 35, type: "Prototype", tags: "des+dev", lang: "Typescript", name: "Baddie Ops", github: "Fix Code from V0", status: "PROTOTYPE", dates: "Apr'25" },
  { sno: 36, type: "Project", tags: "dev", lang: "Python", name: "Human-like-typeing-simulation", github: "", status: "ARCHIVED", dates: "Apr'24" },
  { sno: 37, type: "Project", tags: "des", lang: "HTML + CSS", name: "Clock UI", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 38, type: "Project", tags: "des", lang: "HTML + CSS", name: "Pizza-Boss", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 39, type: "Project", tags: "des", lang: "HTML + CSS", name: "Live-Battery-percentage", github: "", status: "PROTOTYPE", dates: "" },
  { sno: 40, type: "Freelance", tags: "des", lang: "Figma", name: "KRIDANTA", github: "", status: "ARCHIVED", dates: "Aug'25" },
  { sno: 41, type: "Project", tags: "dev", lang: "Python", name: "Snakegame.py", github: "", status: "ARCHIVED", dates: "Dec'23" },
  { sno: 42, type: "Project", tags: "dev", lang: "Python", name: "Internet-speed-test-app", github: "", status: "ARCHIVED", dates: "Nov'23" },
  { sno: 43, type: "Project", tags: "dev", lang: "Python", name: "Simple Linear Regression with Python", github: "", status: "ARCHIVED", dates: "Nov'23" },
  { sno: 44, type: "Project", tags: "dev, AI", lang: "Python", name: "MovieLens-100K-Recommender", github: "", status: "ARCHIVED", dates: "Nov'23" },
  { sno: 45, type: "Project", tags: "dev, AI, Data Analysit", lang: "Python", name: "Iris-Flower-Classification-ML-Python", github: "", status: "ARCHIVED", dates: "Nov'23" },
  { sno: 46, type: "Project", tags: "dev", lang: "C", name: "Fish Feeder", github: "", status: "ARCHIVED", dates: "Oct'23" },
  { sno: 47, type: "Project", tags: "dev, AI", lang: "Python", name: "Facial-Regognition-system", github: "", status: "ARCHIVED", dates: "Aug'23" },
  { sno: 48, type: "Project", tags: "dev", lang: "Python", name: "Python Number System Convertor", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 49, type: "Project", tags: "dev, AI", lang: "Python", name: "Object identification Python", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 50, type: "Project", tags: "dev", lang: "Python", name: "Number Gussing Game", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 51, type: "Project", tags: "dev", lang: "Python", name: "Zip File Extractor", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 52, type: "Project", tags: "dev", lang: "C", name: "IP Changer", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 53, type: "Project", tags: "dev", lang: "C", name: "Mac Spoofer", github: "", status: "ARCHIVED", dates: "July'23" },
  { sno: 54, type: "Project", tags: "dev", lang: "C", name: "Resume.io2PDF", github: "", status: "ARCHIVED", dates: "June'23" },
  { sno: 55, type: "Project", tags: "dev, Data Analysit", lang: "C", name: "Ciggs Buddy", github: "", status: "ARCHIVED", dates: "June'23" },
  { sno: 56, type: "Project", tags: "dev", lang: "Python", name: "RCOE FLASK_SQL2Excel", github: "", status: "ARCHIVED", dates: "May'23" },
  { sno: 57, type: "Project", tags: "dev", lang: "Python", name: "Image from Site to Telegram Bot", github: "", status: "ARCHIVED", dates: "Mar'23" },
  { sno: 58, type: "Project", tags: "dev, Data Analysit", lang: "Python", name: "Instagram Followers-Following Excel", github: "", status: "ARCHIVED", dates: "Mar'23" },
  { sno: 59, type: "Freelance", tags: "dev+des, Data Analyist", lang: "PHP", name: "RCOE", github: "", status: "ARCHIVED", dates: "" },
]

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

async function seed() {
  console.log("🌱 Starting bulk project migration...")

  const projectsToInsert = rawProjects.map((p) => {
    const slug = slugify(p.name)
    const tagsArr = p.tags.split(/[+,]/).map(t => t.trim().toLowerCase())
    
    // Domain Mapping
    let domain: "DATA ANALYST" | "WEB DESIGN" | "WEB DEVELOPMENT" | "AI/ML" | "GD" = "WEB DEVELOPMENT"
    if (p.tags.includes("AI")) domain = "AI/ML"
    else if (p.tags.includes("Data")) domain = "DATA ANALYST"
    else if (p.type === "Hemsida" || p.tags.includes("des") && !p.tags.includes("dev")) domain = "WEB DESIGN"
    else if (p.type === "Freelance" || p.type === "Project" || p.type === "Prototype") domain = "WEB DEVELOPMENT"

    // Tech stack generation
    const tech = [p.lang]
    if (p.tags.includes("dev")) tech.push("Full-stack")
    if (p.tags.includes("des")) tech.push("UX/UI")

    return {
      id: `p-${p.sno}-${slug.substring(0, 10)}`,
      slug,
      title: p.name,
      subtitle: `${p.type} ${p.lang} Project`,
      description: `A ${p.type.toLowerCase()} project focused on ${p.lang}. Featuring ${p.tags} implementation.`,
      longDescription: `This project, ${p.name}, was developed as a ${p.type.toLowerCase()} initiative. Using ${p.lang}, the goal was to create a robust and scalable solution while focusing on ${p.tags}. The project involved end-to-end development and design integration.`,
      image: "/placeholder.svg",
      heroImage: "/placeholder.svg",
      tags: tagsArr.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
      domain,
      status: p.status as any,
      date: p.dates || "Legacy",
      featured: p.sno <= 5, // Feature the first 5 projects
      githubUrl: p.github && p.github.startsWith("http") ? p.github : null,
      technologies: tech,
      challenges: ["Initial setup and architecture", "Complex data mapping", "Cross-platform compatibility"],
      solutions: ["Modular design patterns", "Drizzle ORM for database", "Responsive CSS layout"],
      results: ["Successful deployment", "High performance metrics", "Positive user feedback"],
      process: [
        { title: "Planning", description: "Requirement gathering and architecture design." },
        { title: "Development", description: "Core feature implementation and unit testing." },
        { title: "Deployment", description: "Full deployment to production environment." }
      ]
    }
  })

  try {
    for (const project of projectsToInsert) {
      await db.insert(projects).values(project).onConflictDoUpdate({
        target: projects.slug,
        set: project
      })
      console.log(`✅ Upserted: ${project.title}`)
    }
    console.log("\n✨ Successfully migrated 59 projects!")
  } catch (error) {
    console.error("❌ Error seeding projects:", error)
    process.exit(1)
  }
}

seed()
