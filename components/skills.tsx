import { Card, CardContent } from "@/components/ui/card"
import { Code, Layers, Palette, Database, LineChart, Cpu } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="h-8 w-8 text-blue-500" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="h-8 w-8 text-blue-500" />,
      skills: ["Figma", "Adobe XD", "Responsive Design", "Motion Design", "Prototyping"],
    },
    {
      title: "Backend Development",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs"],
    },
    {
      title: "Creative Coding",
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      skills: ["GLSL Shaders", "Canvas API", "SVG Animation", "p5.js", "D3.js"],
    },
    {
      title: "Data Visualization",
      icon: <LineChart className="h-8 w-8 text-blue-500" />,
      skills: ["D3.js", "Chart.js", "Observable Plot", "Tableau", "Data Processing"],
    },
    {
      title: "Performance Optimization",
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      skills: ["Lazy Loading", "Code Splitting", "Bundle Analysis", "Caching Strategies"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I've developed expertise in various technologies and methodologies, allowing me to build comprehensive
            solutions for diverse projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-bold ml-3">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
