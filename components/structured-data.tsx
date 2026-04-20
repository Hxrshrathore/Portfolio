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
    jobTitle: "Web Designer & Front-End Developer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "KIIT University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "KIIT University",
    },
    knowsAbout: [
      "Web Design",
      "UI/UX Design",
      "Front-End Development",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Full Stack Development",
      "Data Analysis",
      "Graphic Design",
      "WebGL",
      "Three.js",
      "Framer Motion",
    ],
    description:
      "Award-winning web designer, UI/UX expert, and front-end developer at KIIT University. Specializing in innovative, user-centric digital experiences with expertise in React, Next.js, Python, and full stack development.",
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://hxrshrathore.vercel.app/#portfolio",
    name: "Harsh Kumar Portfolio",
    description: "Professional portfolio showcasing web design, UI/UX, and front-end development projects",
    author: {
      "@type": "Person",
      name: "Harsh Kumar",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en-US",
    keywords: "web design, UI/UX, front-end development, React, Next.js, portfolio",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Harsh Kumar Portfolio",
    alternateName: "hxrshrathore Portfolio",
    url: "https://hxrshrathore.vercel.app",
    description: "Professional portfolio of Harsh Kumar - Web Designer, UI/UX Expert, and Front-End Developer",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hxrshrathore.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Harsh Kumar - Web Design & Development Services",
    description:
      "Professional web design, UI/UX design, and front-end development services by KIIT student Harsh Kumar",
    provider: {
      "@type": "Person",
      name: "Harsh Kumar",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    availableLanguage: ["English", "Hindi"],
    priceRange: "$$",
    serviceType: [
      "Web Design",
      "UI/UX Design",
      "Front-End Development",
      "Full Stack Development",
      "Graphic Design",
      "Portfolio Development",
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
