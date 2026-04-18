"use client"

import CurvedLoop from "./curved-loop"

export default function CurvedLoopSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <CurvedLoop
        marqueeText="Innovation ✦ Perfection ✦ Excellence ✦ Craftsmanship ✦ "
        speed={3}
        curveAmount={500}
        direction="left"
        interactive={true}
        className="text-white"
      />
    </section>
  )
}
