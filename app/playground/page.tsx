"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Cormorant, Anonymous_Pro, Annie_Use_Your_Telescope } from "next/font/google"
import { cn } from "@/lib/utils"
import LiquidChrome from "@/components/liquid-chrome"

const cormorant = Cormorant({ subsets: ["latin"], weight: ["400", "700"] });
const anonymous = Anonymous_Pro({ subsets: ["latin"], weight: ["400", "700"] });
const annie = Annie_Use_Your_Telescope({ subsets: ["latin"], weight: ["400"] });

export default function PlaygroundPage() {
  return (
    <div className={cn("relative w-full h-screen overflow-hidden bg-white text-black selection:bg-black selection:text-white", anonymous.className)}>
      
      {/* --- BACKGROUNDS --- */}
      {/* Middle Grey Gradient */}
      <div 
        className="absolute top-[25.6vh] left-0 w-full h-[74.4vh] flex items-center justify-center z-0" 
        style={{ background: "linear-gradient(249.096deg, rgb(204, 204, 204) 35.629%, rgb(102, 102, 102) 78.262%)" }} 
      />
      {/* Bottom Black Section - Fixed Z-Index to be above the image */}
      <div className="absolute top-[73.6vh] left-0 w-full h-[26.4vh] bg-black z-[25] overflow-hidden">
        {/* Full-screen sized animation offset to match viewport position (avoids "squeezed" look) */}
        <div className="absolute top-[-73.6vh] left-0 w-screen h-screen">
          <LiquidChrome
            baseColor={[0.015, 0.015, 0.015]}
            speed={0.16}
            amplitude={0.17}
            frequencyX={2.5}
            frequencyY={1.5}
            interactive={false}
          />
        </div>
        {/* Subtle top reflection for depth */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 z-10" />
      </div>

      {/* --- TOP LAYER (Nav & Intro) --- */}
      <div className="absolute top-0 left-0 w-full h-[25.5vh] z-40 px-[2.7vw] pt-[3.5vh]">
        {/* Nav Left */}
        <div className="absolute top-[3.5vh] left-[2.7vw] uppercase text-[1.38vw] leading-[0.95] tracking-[-0.06em]">
          Harsh <br />Rathore
        </div>
        
        {/* Nav Right */}
        <div className="absolute top-[3.5vh] right-[2.7vw] flex items-start text-[1.38vw] tracking-[-0.06em] uppercase">
          <div className="mr-[5.5vw] leading-[0.95]">
            About<br />me
          </div>
          <div className="mr-[4.5vw] leading-[0.95]">
            Case<br />study
          </div>
          <div className="border border-black w-[6.5vw] h-[3vh] flex items-center justify-center -mt-[0.4vh] cursor-pointer hover:bg-black hover:text-white transition-colors">
            Contact
          </div>
        </div>

        {/* Intro */}
        <div className="absolute top-[10vh] left-[2.7vw] w-[93vw] text-[1.4vw] text-justify leading-tight tracking-[-0.06em]">
          HI! I’m <span className="font-bold">Harsh</span> a <span className="font-bold italic">creative developer</span> obsessed with dissolving the boundaries between design and code. I craft experiences where aesthetics aren’t just layered on top, but engineered into the <span className="font-bold">core fast, scalable</span>, and built to convert. From intuitive <span className="font-bold">UI/UX</span> to <span className="font-bold">full-stack</span> execution, I turn ideas into systems that <span className="font-bold">don’t just look good, but work relentlessly.</span>
        </div>
      </div>

      {/* --- MIDDLE TEXT LAYER (Behind or interacting with image) --- */}
      {/* MANUAL CONTROLS: Use the style objects below to fine-tune the "creative developer" text positions and sizes */}
      <div className="absolute top-[25.5vh] left-0 w-full h-[48.1vh] pointer-events-none z-10 flex items-center">
        <div className="w-full relative h-full flex items-center">
          
          {/* WORD: "creative" */}
          <span 
            className={cn("absolute text-white font-bold tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ 
              fontSize: "12.5vw",      // Alter font size here
              left: "9.3vw",          // Alter X-axis here
              top: "50%",            // Anchor
              transform: "translateY(-50%)" // Manual offset: translateY(10vh) etc.
            }}
          >
            creative
          </span>

          {/* WORD: "developer" */}
          <span 
            className={cn("absolute text-white font-normal tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ 
              fontSize: "12.5vw",      // Alter font size here
              right: "3vw",         // Alter X-axis here
              top: "50%",            // Anchor
              transform: "translateY(-50%)" // Manual offset: translateY(-5vh) etc.
            }}
          >
            developer
          </span>
          
        </div>
        
        {/* "Hi!" Text */}
        <div className={cn("absolute top-[10%] left-[58vw] text-black text-[3.3vw]", annie.className)}>
          Hi!
        </div>
      </div>

      {/* --- IMAGE LAYER --- */}
      {/* Positioned exactly relative to the viewport height & width to prevent scaling issues causing scroll */}
      <div className="absolute top-0 left-[23vw] w-[54vw] h-[114vh] z-20 pointer-events-none">
        <Image 
          src="/playground/harsh.png" 
          alt="Harsh Rathore" 
          fill 
          className="object-contain object-top"
          priority
        />
      </div>

      {/* --- BOTTOM STATS LAYER --- */}
      <div className="absolute bottom-[4.2vh] left-[2.7vw] w-[94.6vw] h-[17.2vh] z-30 flex justify-between items-center text-white pointer-events-none">
        {[
          { label: "Projects", value: "59+" },
          { label: "Traffic Served", value: "28.49MIL+" },
          { label: "Up-time", value: "99.9%" },
          { label: "Experince", value: "2.7YR+" }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="w-[23vw] h-full border-l border-white/[0.08] flex flex-col justify-center px-[2vw] relative transition-colors duration-500 hover:bg-white/[0.02]"
          >
            {/* Minimalist Data Representation */}
            <div className="flex flex-col gap-2">
              <p className="text-[2.8vw] leading-none tracking-[-0.07em] font-bold text-white uppercase italic">
                {stat.value}
              </p>
              <p className="text-[0.9vw] leading-none tracking-[0.15em] font-normal text-white/30 uppercase">
                {stat.label}
              </p>
            </div>
            
            {/* Subtle light accent to top left of each card to define space */}
            <div className="absolute top-0 left-0 w-[1px] h-[1.5vh] bg-white/20" />
          </div>
        ))}
      </div>

    </div>
  )
}
