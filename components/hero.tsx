"use client";

import * as React from "react";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";
import GlassSurface from "@/components/GlassSurface";
import TransitionLink from "@/components/transition-link";
import { ArrowUpRight, FileUser } from "lucide-react";

// Website mockup screenshots from the projects / work page hero section
const CDN = "https://pub-546a6f9534fa4f7abd35b1c5c23bb394.r2.dev/projects";

const IMAGES: TiltedGridImage[] = [
  {
    src: `${CDN}/Nutgram.png`,
    alt: "Nutgram client portal website mockup",
  },
  {
    src: `${CDN}/KIITFEST.png`,
    alt: "KIITFEST university festival website mockup",
  },
  {
    src: `${CDN}/Kritarth.png`,
    alt: "Kritarth social initiative platform mockup",
  },
  {
    src: `${CDN}/Hermes%20Racing.png`,
    alt: "Hermes Racing Formula Student team mockup",
  },
  {
    src: `${CDN}/Viral%20ARC.png`,
    alt: "Viral ARC creator platform mockup",
  },
  {
    src: `${CDN}/Chimera.png`,
    alt: "Chimera tech symposium website mockup",
  },
  {
    src: `${CDN}/Udghosh.png`,
    alt: "Udghosh festival website mockup",
  },
  {
    src: `${CDN}/TEDxKIIT%20University.png`,
    alt: "TEDxKIIT University conference mockup",
  },
  {
    src: `${CDN}/KIIT%20MUN.png`,
    alt: "KIIT MUN conference platform mockup",
  },
  {
    src: `${CDN}/Nexus%20AI.png`,
    alt: "Nexus AI assistant mockup",
  },
  {
    src: `${CDN}/Verinews.png`,
    alt: "Verinews automated news aggregator mockup",
  },
  {
    src: `${CDN}/Estate.png`,
    alt: "Estate architectural digital experience mockup",
  },
  {
    src: `${CDN}/Blunt%20E-commerce.png`,
    alt: "Blunt e-commerce storefront mockup",
  },
  {
    src: `${CDN}/Pandav%20Studio.png`,
    alt: "Pandav Studio creative production mockup",
  },
  {
    src: `${CDN}/Acsent%20Choacing%20Center.png`,
    alt: "Acsent Coaching website mockup",
  },
  {
    src: `${CDN}/Bikash%20Vidalya.png`,
    alt: "Bikash Vidyalaya institution portal mockup",
  },
];

export default function Hero() {
  return (
    <TiltedGridHero
      images={IMAGES}
      fade={0}
      className="h-screen min-h-[640px] w-full bg-white text-zinc-950"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between pt-20 md:pt-24 pb-12 md:pb-16 text-center">
        <div className="px-6 pt-6 md:pt-10">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Harsh Kumar
            <br />
            <span className="text-zinc-600 font-normal text-2xl sm:text-3xl md:text-4xl block mt-1">
              Forward Deployed Engineer Intern
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-5 px-6">
          <p className="max-w-md text-balance text-sm text-zinc-600 sm:text-base">
            I design, engineer, and ship full-stack products, AI-powered applications, and integrations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <TransitionLink href="/projects" className="inline-block group">
              <GlassSurface
                width={154}
                height={46}
                borderRadius={23}
                distortionScale={-180}
                displace={0.5}
                backgroundOpacity={0.12}
                className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                <span className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-zinc-900 group-hover:text-black">
                  Portfolio
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </GlassSurface>
            </TransitionLink>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <GlassSurface
                width={154}
                height={46}
                borderRadius={23}
                distortionScale={-180}
                displace={0.5}
                backgroundOpacity={0.12}
                className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                <span className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-zinc-900 group-hover:text-black">
                  Résumé
                  <FileUser className="w-3.5 h-3.5 text-zinc-600 transition-transform group-hover:scale-110" />
                </span>
              </GlassSurface>
            </a>
          </div>
        </div>
      </div>
    </TiltedGridHero>
  );
}
