import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Immersive 3D Portfolio",
      description: "A WebGL-powered portfolio with interactive 3D elements and animations",
      tags: ["Three.js", "React", "WebGL"],
      image: "/placeholder.svg?height=400&width=600",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "E-commerce Dashboard",
      description: "A comprehensive dashboard for managing online store operations",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/placeholder.svg?height=400&width=600",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Interactive Data Visualization",
      description: "Complex data sets visualized through interactive and animated charts",
      tags: ["D3.js", "SVG", "JavaScript"],
      image: "/placeholder.svg?height=400&width=600",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "AI-Powered Chat Application",
      description: "Real-time chat application with AI-powered responses and features",
      tags: ["React", "Node.js", "WebSockets"],
      image: "/placeholder.svg?height=400&width=600",
      demoUrl: "#",
      codeUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my recent work showcasing my skills in web development, interactive design, and creative coding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <ExternalLink size={14} />
                    Live Demo
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Github size={14} />
                    Source Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg">View All Projects</Button>
        </div>
      </div>
    </section>
  )
}
