"use client"

import CurvedLoop from "./curved-loop"

export default function CurvedLoopSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <CurvedLoop
        marqueeText="Hello ✦ नमस्ते ✦ ନମସ୍କାର ✦ ਸਤ ਸ੍ਰੀ ਅਕਾਲ ✦ 你好 ✦ "
        speed={3}
        curveAmount={500}
        direction="left"
        interactive={true}
        className="text-white"
      />
    </section>
  )
}
