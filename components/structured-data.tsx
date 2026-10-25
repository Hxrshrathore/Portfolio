import Script from "next/script"

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
// ... (rest of schemas stay the same)
    name: "Harsh Kumar",
    alternateName: "hxrshrathore",
    url: "https://hxrshrathore.vercel.app",
    image: "https://hxrshrathore.vercel.app/profile.jpg",
    sameAs: [
      "https://github.com/hxrshrathore",
      "https://linkedin.com/in/hxrshrathore",
      "https://twitter.com/hxrshrathore",
      "https://behance.net/hxrshrathore",
    ],
    jobTitle: "Product-Minded Software Engineer & Applied AI Builder",
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Web Applications",
      "Applied AI & LLM Integrations",
      "API Integrations & Automation",
      "Next.js",
      "React",
      "TypeScript",
      "Python Data Pipelines",
      "SQL & PostgreSQL",
      "Interface Engineering",
      "Design Systems",
    ],
    description:
      "Product-Minded Software Engineer & Applied AI Builder. Engineering full-stack applications, LLM workflows, data extraction pipelines, and high-performance interfaces.",
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://hxrshrathore.vercel.app/#portfolio",
    name: "Harsh Kumar Portfolio & Engineering Case Studies",
    description: "Engineering case studies in full-stack applications, applied AI systems, workflow automation, and interface engineering",
    author: {
      "@type": "Person",
      name: "Harsh Kumar",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en-US",
    keywords: "software engineering, applied AI, full-stack, Next.js, TypeScript, data pipelines, portfolio",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Harsh Kumar Portfolio",
    alternateName: "hxrshrathore Portfolio",
    url: "https://hxrshrathore.vercel.app",
    description: "Portfolio of Harsh Kumar — Product-Minded Software Engineer & Applied AI Builder",
    inLanguage: "en-US",
  }

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Harsh Kumar - Engineering & Applied AI Solutions",
    description:
      "Full-stack web application development, applied AI/LLM integrations, and workflow automation pipelines.",
    provider: {
      "@type": "Person",
      name: "Harsh Kumar",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    availableLanguage: ["English", "Hindi"],
    serviceType: [
      "Full-Stack Web Applications",
      "Applied AI & LLM Integrations",
      "API Integrations & Workflow Automation",
      "High-Performance Web Platforms",
      "Product Interfaces & Design Systems",
    ],
  }

  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-professional"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
