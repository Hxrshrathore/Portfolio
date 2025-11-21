"use client"

import FlowingMenu from "./flowing-menu"

const demoItems = [
  {
    link: "/projects?category=Web%20Designs",
    text: "Web Experiences",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    link: "/projects?category=UI%2FUX%20Designs",
    text: "Interface Design",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    link: "/projects?category=AI%2FML%20Projects",
    text: "Smart Solutions",
    image: "https://picsum.photos/600/400?random=3",
  },
  { link: "/projects?category=Graphics", text: "Visual Identity", image: "https://picsum.photos/600/400?random=4" },
]

export default function FlowingMenuSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">What I Create</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          From concept to reality. Explore the different dimensions of digital craftsmanship.
        </p>
      </div>

      {/* Flowing Menu */}
      <div className="h-[600px] relative">
        <FlowingMenu items={demoItems} />
      </div>

      {/* Component Categories Grid */}
    </section>
  )
}
