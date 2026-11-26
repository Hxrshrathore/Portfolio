"use client"

import { motion } from "framer-motion"
import CurvedLoop from "./curved-loop"

export default function CurvedLoopSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-black overflow-hidden pt-1 pb-10 md:pb-16"
    >
      <CurvedLoop
        marqueeText="Hello ✦ नमस्ते ✦ ନମସ୍କାର ✦ ਸਤ ਸ੍ਰੀ ਅਕਾਲ ✦ 你好 ✦ "
        speed={3}
        curveAmount={360}
        direction="left"
        interactive={true}
        className="text-white"
      />
    </motion.section>
  )
}
