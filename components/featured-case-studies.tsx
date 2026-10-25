import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Cpu, Database, Layers, Workflow } from "lucide-react"
import { FEATURED_CASE_STUDIES, FEATURED_SLUGS } from "@/lib/curation"

export default function FeaturedCaseStudies() {
  const caseStudies = FEATURED_SLUGS.map(slug => FEATURED_CASE_STUDIES[slug]).filter(Boolean)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Client Engagement":
        return <Layers className="w-4 h-4 text-emerald-400" />
      case "University Platform":
        return <Workflow className="w-4 h-4 text-cyan-400" />
      case "Applied AI":
        return <Cpu className="w-4 h-4 text-purple-400" />
      case "Data Pipeline":
        return <Database className="w-4 h-4 text-amber-400" />
      default:
        return <Layers className="w-4 h-4 text-zinc-400" />
    }
  }

  return (
    <section id="case-studies" className="relative w-full bg-black py-24 md:py-32 px-4 md:px-8 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/40 text-xs font-mono uppercase tracking-[0.25em]">
                Verified Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            Real software systems engineered under real constraints — exploring architecture, trade-offs, debugging, and production delivery.
          </p>
        </div>

        {/* 4 Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((study, idx) => (
            <article
              key={study.slug}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(study.category)}
                    <span className="text-xs font-mono text-zinc-300 font-medium">
                      {study.clientOrOrg}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {study.timeline}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                  {study.headline}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {study.architectureSummary}
                </p>

                {/* System Highlights / Deliverables */}
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                    Verified Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {study.verifiedDeliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                <Link
                  href={`/projects/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white/90 hover:text-white transition-colors group/link"
                >
                  <span>Read Engineering Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>

                {study.liveLink && (
                  <a
                    href={study.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Projects Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white hover:border-white/25 transition-all"
          >
            Explore Full Project Archive ({FEATURED_SLUGS.length}+ Projects) →
          </Link>
        </div>
      </div>
    </section>
  )
}
