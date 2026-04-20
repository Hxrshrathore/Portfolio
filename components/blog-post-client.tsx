"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { format } from "date-fns"
import { Calendar, Clock, ArrowLeft, Tag, Share2, Printer, Bookmark } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import PlasmaWave from "@/components/PlasmaWave"
import { Button } from "@/components/ui/button"

interface BlogPostClientProps {
  post: any
  relatedPosts: any[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Specialized Markdown Components for Architectural Style
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 mt-16 tracking-tighter">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 mt-12 tracking-tight flex items-center gap-4">
        <span className="w-8 h-[1px] bg-white/20 hidden md:block" />
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 mt-8">{children}</h3>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light tracking-wide">{children}</p>
    ),
    a: ({ href, children }: any) => (
      <Link href={href as string} className="text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all">
        {children}
      </Link>
    ),
    ul: ({ children }: any) => <ul className="list-none mb-8 space-y-4">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside text-gray-400 mb-8 space-y-4">{children}</ol>,
    li: ({ children }: any) => (
      <li className="flex items-start gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
        <span className="text-gray-400 font-light">{children}</span>
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative bg-white/[0.02] border-l-2 border-white/20 py-8 px-10 my-12 italic text-gray-300 rounded-r-3xl overflow-hidden group">
        <div className="absolute top-4 right-4 text-[10px] font-mono text-white/5 uppercase tracking-[0.2em] group-hover:text-white/10 transition-colors">
          Reference Log // {post.slug}
        </div>
        {children}
      </blockquote>
    ),
    code: ({ children }: any) => (
      <code className="bg-white/5 text-white px-1.5 py-0.5 rounded font-mono text-xs border border-white/10">{children}</code>
    ),
    pre: ({ children }: any) => (
      <pre className="relative bg-[#0a0a0a] text-gray-300 p-8 rounded-[2rem] overflow-x-auto my-12 border border-white/5 font-mono text-sm leading-relaxed group shadow-2xl">
         <div className="absolute top-4 right-8 flex gap-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
         </div>
         {children}
      </pre>
    ),
    img: (props: any) => (
      <div className="my-16 space-y-4">
        <div className="rounded-[2.5rem] overflow-hidden border border-white/5">
          <img {...props} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={props.alt || ""} />
        </div>
        {props.alt && <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">{props.alt}</p>}
      </div>
    ),
    hr: () => <hr className="border-white/5 my-16" />,
  }

  const publishedDate = new Date(post.date)

  return (
    <article className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* ── Reading Progress ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 z-0">
        <PlasmaWave
          colors={["#0c0c0e", "#161618"]}
          speed1={0.04}
          speed2={0.05}
          focalLength={2}
          bend1={0.1}
          bend2={0.2}
          dir2={0}
          rotationDeg={165}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <header className="fixed top-0 inset-x-0 h-24 flex items-center z-50 px-4 md:px-8 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold tracking-[0.3em] uppercase group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Return to Index
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border border-white/5 hover:bg-white/5 text-white/40 hover:text-white">
                <Share2 size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border border-white/5 hover:bg-white/5 text-white/40 hover:text-white">
                <Bookmark size={14} />
              </Button>
            </div>
          </div>
        </header>

        {/* ── Hero Section ── */}
        <section className="pt-48 pb-24 px-4 md:px-8">
           <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Visual Category & Meta */}
                <div className="flex items-center gap-4">
                   <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold tracking-[0.4em] uppercase text-white/60">
                      {post.tags[0] || "Architecture"}
                   </span>
                   <div className="w-12 h-[1px] bg-white/20" />
                   <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20">
                      ID // Post_{post.slug.substring(0, 8)}
                   </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
                  {post.title}
                </h1>

                <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed italic max-w-2xl">
                  {post.description}
                </p>

                {/* Date/Time Bar */}
                <div className="flex flex-wrap items-center gap-10 pt-12 border-t border-white/5">
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/20">Published</span>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
                         <Calendar size={12} className="opacity-40" />
                         {format(publishedDate, "dd . MM . yyyy")}
                      </div>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/20">Interval</span>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
                         <Clock size={12} className="opacity-40" />
                         {post.readingTime} Reading
                      </div>
                   </div>
                   <div className="flex flex-col gap-1 ml-auto hidden sm:flex">
                      <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/20 md:text-right text-left">Curated By</span>
                      <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-white/60 uppercase">
                         {post.author}
                         <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 overflow-hidden" />
                      </div>
                   </div>
                </div>
              </motion.div>
           </div>
        </section>

        {/* ── Main Content Area ── */}
        <section className="pb-40 px-4 md:px-8">
           <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 {/* Sidebar Info (Hidden on mobile) */}
                 <aside className="lg:col-span-2 hidden lg:block h-fit pt-20">
                    <div className="space-y-12 sticky top-40">
                       <div className="space-y-4">
                          <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20 block">Actions</span>
                          <div className="flex flex-col gap-4">
                             <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors group">
                                <Printer size={12} className="group-hover:scale-110 transition-transform" />
                                Hard Copy
                             </button>
                             <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors group">
                                <Share2 size={12} className="group-hover:scale-110 transition-transform" />
                                Distribute
                             </button>
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20 block">Keywords</span>
                          <div className="flex flex-wrap gap-2">
                             {post.tags.map((tag: string) => (
                               <span key={tag} className="text-[9px] font-mono text-white/30 hover:text-white transition-colors cursor-pointer capitalize">#{tag}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </aside>

                 {/* Markdown Body */}
                 <div className="lg:col-span-8 lg:col-start-3">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="prose prose-invert prose-white max-w-none prose-p:text-gray-400 prose-headings:tracking-tighter"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents as any}
                      >
                        {post.content}
                      </ReactMarkdown>
                    </motion.div>

                    {/* Final Signature / Bottom Bar */}
                    <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                       <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">End of Record</p>
                          <h4 className="text-xl font-bold tracking-tighter">Thank you for reading.</h4>
                       </div>
                       <Button variant="outline" className="rounded-full border-white/10 px-8 hover:bg-white hover:text-black transition-all text-[9px] font-bold tracking-[0.3em] uppercase">
                          Stay Updated
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ── Related Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="py-24 px-4 md:px-8 border-t border-white/5 bg-white/[0.01]">
            <div className="container mx-auto max-w-5xl">
              <div className="flex justify-between items-end mb-16 px-4 md:px-0">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/20">Discovery</span>
                  <h2 className="text-3xl font-bold tracking-tighter">Extend your learning</h2>
                </div>
                <Link href="/blog" className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors mb-2">
                  View All Archvies
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <ArrowLeft className="rotate-180 w-8 h-8" />
                    </div>
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 block">
                       {format(new Date(relatedPost.date), "MMM dd, yyyy")}
                    </span>
                    <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-white/40 line-clamp-2 font-light leading-relaxed">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </article>
  )
}
