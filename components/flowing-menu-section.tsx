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
      <div className="text-center py-16 md:py-24 px-4">
        <h2 className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight px-2">How Can I Help You?</h2>
        <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto tracking-wide px-4">
          Full-stack developer with a passion for building cool stuff.
          <br className="hidden md:block" />
          <span className="hidden md:inline">I don&apos;t cut corners — always looking for new challenges and opportunities to learn.</span>
        </p>
      </div>

      {/* Flowing Menu */}
      <div className="h-[450px] md:h-[600px] relative">
        <FlowingMenu items={demoItems} />
      </div>

      {/* Component Categories Grid */}
    </section>
  )
}
