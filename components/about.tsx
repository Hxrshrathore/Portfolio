import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, User } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Hi, I'm <span className="text-blue-500">Alex Chen</span>
            </h3>
            <p className="text-gray-600">
              I'm a creative developer with over 5 years of experience building immersive web experiences. I specialize
              in combining cutting-edge technologies with thoughtful design to create memorable digital products.
            </p>
            <p className="text-gray-600">
              My expertise includes front-end development, interactive animations, WebGL, and building performant web
              applications. I'm passionate about creating experiences that are both visually stunning and functionally
              robust.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2">
                <Download size={16} />
                Download CV
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <User size={16} />
                More About Me
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-5xl font-bold text-blue-500 mb-2">5+</h4>
                <p className="text-gray-600">Years Experience</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-5xl font-bold text-blue-500 mb-2">50+</h4>
                <p className="text-gray-600">Projects Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-5xl font-bold text-blue-500 mb-2">20+</h4>
                <p className="text-gray-600">Happy Clients</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-5xl font-bold text-blue-500 mb-2">10+</h4>
                <p className="text-gray-600">Awards Won</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
