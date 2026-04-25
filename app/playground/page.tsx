"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Cormorant, Anonymous_Pro, Annie_Use_Your_Telescope } from "next/font/google"
import { cn } from "@/lib/utils"
import LiquidChrome from "@/components/liquid-chrome"
import { Highlighter } from "@/components/ui/highlighter"

const cormorant = Cormorant({ subsets: ["latin"], weight: ["400", "700"] });
const anonymous = Anonymous_Pro({ subsets: ["latin"], weight: ["400", "700"] });
const annie = Annie_Use_Your_Telescope({ subsets: ["latin"], weight: ["400"] });

export default function PlaygroundPage() {
  return (
    <div className={cn("relative w-full h-screen overflow-hidden bg-white text-black selection:bg-black selection:text-white", anonymous.className)}>
      
      {/* --- BACKGROUNDS --- */}
      {/* Middle Grey Gradient */}
      <div 
        className="absolute top-[35vh] md:top-[25.6vh] left-0 w-full h-[65vh] md:h-[74.4vh] flex items-center justify-center z-0 transition-all duration-700" 
        style={{ background: "linear-gradient(249.096deg, rgb(204, 204, 204) 35.629%, rgb(102, 102, 102) 78.262%)" }} 
      />
      {/* Bottom Black Section */}
      <div className="absolute top-[73.6vh] left-0 w-full h-[26.4vh] bg-black z-[25] overflow-hidden">
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 z-10" />
      </div>

      {/* --- TOP LAYER (Nav & Intro) --- */}
      <div className="absolute top-0 left-0 w-full h-[35vh] md:h-[25.5vh] z-15 px-[2.7vw] pt-[2vh] md:pt-[3.5vh]">
        {/* Nav Left */}
        <div className="absolute top-[2vh] md:top-[3.5vh] left-[2.7vw] uppercase text-[3.5vw] md:text-[1.38vw] leading-[0.95] tracking-[-0.06em]">
          Harsh <br />Rathore
        </div>
        
        {/* Nav Right */}
        <div className="absolute top-[2vh] md:top-[3.5vh] right-[2.7vw] flex items-start text-[3vw] md:text-[1.38vw] tracking-[-0.06em] uppercase">
          <div className="mr-[4vw] md:mr-[5.5vw] leading-[0.95]">
            About<br />me
          </div>
          <div className="mr-[3vw] md:mr-[4.5vw] leading-[0.95]">
            Case<br />study
          </div>
          <div className="border border-black w-[15vw] md:w-[6.5vw] h-[2.5vh] md:h-[3vh] flex items-center justify-center -mt-[0.2vh] md:-mt-[0.4vh] cursor-pointer hover:bg-black hover:text-white transition-colors text-[2.5vw] md:text-[1.1vw]">
            Contact
          </div>
        </div>

        {/* Intro - Vertically Centered on Mobile, Top Aligned on Desktop */}
        <div className="h-full flex flex-col justify-center md:justify-start md:pt-[6.5vh] pb-[2vh] md:pb-0">
          <div className="w-[93vw] text-[3.2vw] md:text-[1.4vw] text-justify leading-tight tracking-[-0.06em]">
            HI! I’m <span className="font-bold">Harsh</span> a{" "}
            <Highlighter action="highlight" color="rgba(255, 152, 0, 0.45)" padding={4} iterations={2} strokeWidth={1.5}>
              <span className="font-bold italic">creative developer</span>
            </Highlighter>{" "}
            obsessed with dissolving the boundaries between{" "}
            <Highlighter action="underline" color="rgba(0, 0, 0, 0.8)" strokeWidth={2} iterations={2}>
              design and code
            </Highlighter>
            . I craft experiences where aesthetics aren’t just layered on top, but engineered into the{" "}
            <span className="font-bold">
              core{" "}
              <Highlighter action="underline" color="rgba(255, 152, 0, 0.7)" strokeWidth={2} iterations={2}>
                fast, scalable
              </Highlighter>
            </span>
            , and built to convert. From intuitive <span className="font-bold">UI/UX</span> to{" "}
            <Highlighter action="box" color="rgba(135, 206, 250, 0.7)" padding={2} iterations={2} strokeWidth={1.5}>
              <span className="font-bold">full-stack</span>
            </Highlighter>{" "}
            execution, I turn ideas into systems that{" "}
            <Highlighter action="highlight" color="rgba(135, 206, 250, 0.4)" padding={4} iterations={2} strokeWidth={1.5}>
               don’t just look good, but work relentlessly.
            </Highlighter>
          </div>
        </div>
      </div>

      {/* --- MIDDLE TEXT LAYER --- */}
      <div className="absolute top-[35vh] md:top-[25.5vh] left-0 w-full h-[35vh] md:h-[48.1vh] pointer-events-none z-10 flex items-center">
        <div className="w-full relative h-full flex items-center">
          
          {/* WORD: "creative" - Mobile Version */}
          <span 
            className={cn("md:hidden absolute text-white font-bold tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ fontSize: "clamp(40px, 10vw, 160px)", left: "6vw", top: "50%", transform: "translateY(-50%)" }}
          >
            creative
          </span>
          {/* WORD: "creative" - Desktop Version */}
          <span 
            className={cn("hidden md:block absolute text-white font-bold tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ fontSize: "12.5vw", left: "9.3vw", top: "50%", transform: "translateY(-50%)" }}
          >
            creative
          </span>

          {/* WORD: "developer" - Mobile Version */}
          <span 
            className={cn("md:hidden absolute text-white font-normal tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ fontSize: "clamp(40px, 10vw, 160px)", right: "3vw", top: "50%", transform: "translateY(-50%)" }}
          >
            developer
          </span>
          {/* WORD: "developer" - Desktop Version */}
          <span 
            className={cn("hidden md:block absolute text-white font-normal tracking-[-0.06em] leading-none", cormorant.className)}
            style={{ fontSize: "12.5vw", right: "3vw", top: "50%", transform: "translateY(-50%)" }}
          >
            developer
          </span>
          
        </div>
        
        {/* "Hi!" Text */}
        <div className={cn("absolute top-[10%] left-[65vw] md:left-[58vw] text-black text-[6vw] md:text-[3.3vw]", annie.className)}>
          Hi!
        </div>
      </div>

      {/* --- IMAGE LAYER --- */}
      <div className="absolute top-[27vh] md:top-0 left-[5vw] md:left-[23vw] w-[90vw] md:w-[54vw] h-[80vh] md:h-[114vh] z-20 pointer-events-none">
        <Image 
          src="/playground/harsh.png" 
          alt="Harsh Rathore" 
          fill 
          className="object-contain object-top md:scale-100 scale-75"
          priority
        />
      </div>

      {/* --- BOTTOM STATS LAYER --- */}
      <div className="absolute bottom-0 md:bottom-[4.2vh] left-0 md:left-[2.7vw] w-full md:w-[94.6vw] h-[26.4vh] md:h-[17.2vh] z-30 grid grid-cols-2 md:flex md:justify-between items-center text-white pointer-events-none">
        {[
          { label: "Projects", value: "59+", desktopLabel: "Projects" },
          { label: "Traffic", value: "28.49M+", desktopLabel: "Traffic Served" },
          { label: "Up-time", value: "99.9+", desktopLabel: "Up-time" },
          { label: "Experince", value: "2.7Y+", desktopLabel: "Experince" }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="w-full md:w-[23vw] h-full border-l border-white/[0.08] flex flex-col justify-center px-[6vw] md:px-[2vw] relative transition-colors duration-500 hover:bg-white/[0.02]"
          >
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="text-[6vw] md:text-[2.8vw] leading-none tracking-[-0.07em] font-bold text-white uppercase md:italic">
                {stat.value}{i === 2 ? "%" : ""}
              </p>
              <p className="text-[2.5vw] md:text-[0.9vw] leading-none tracking-[0.1em] md:tracking-[0.15em] font-normal text-white/30 uppercase text-nowrap">
                <span className="md:hidden">{stat.label}</span>
                <span className="hidden md:inline">{stat.desktopLabel}</span>
              </p>
            </div>
            <div className="absolute top-0 left-0 w-[1px] h-[2vh] md:h-[1.5vh] bg-white/20" />
          </div>
        ))}
      </div>

    </div>
  )
}
