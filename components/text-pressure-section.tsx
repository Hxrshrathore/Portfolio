"use client"

import TextPressure from "./text-pressure"

export default function TextPressureSection() {
  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Text Pressure Component */}
        <div className="relative h-[300px] flex items-center justify-center">
          <TextPressure
            text="@hxrshrathore"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>

        {/* Description */}
        <div className="text-center mt-16">
          <p className="text-gray-400 max-w-2xl mx-auto">
            <br />
          </p>
          <div className="mt-8 text-sm text-gray-500">
            <p>Crafted with precision. Powered by innovation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
