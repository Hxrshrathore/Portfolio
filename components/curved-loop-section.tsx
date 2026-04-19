"use client"

import CurvedLoop from "./curved-loop"

export default function CurvedLoopSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <CurvedLoop
        marqueeText="Hello ✦ नमस्ते ✦ ନମସ୍କାର ✦ 你好 ✦ ਸਤ ਸ੍ਰੀ ਅਕਾਲ ✦ "
        speed={3}
        curveAmount={500}
        direction="left"
        interactive={true}
        className="text-white"
      />
    </section>
  )
}
