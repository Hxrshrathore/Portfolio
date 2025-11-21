import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { format } from "date-fns"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const publishedTime = new Date(post.date).toISOString()
  const url = `https://hxrshrathore.com/blog/${post.slug}`

  return {
    title: `${post.title} | hxrshrathore`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime,
      authors: [post.author],
      url,
      siteName: "hxrshrathore",
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@hxrshrathore",
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "article:published_time": publishedTime,
      "article:author": post.author,
      "article:tag": post.tags.join(", "),
    },
  }
}

// MDX components configuration
const mdxComponents = {
  h1: ({ children }: any) => <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h3>,
  p: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
  a: ({ href, children }: any) => (
    <Link href={href as string} className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
      {children}
    </Link>
  ),
  ul: ({ children }: any) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
  li: ({ children }: any) => <li className="ml-4">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-400 my-4">{children}</blockquote>
  ),
  code: ({ children }: any) => (
    <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">{children}</code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-800">
      {children}
    </pre>
  ),
  Image: (props: any) => (
    <Image
      {...props}
      width={props.width || 800}
      height={props.height || 400}
      className="rounded-lg my-6"
      alt={props.alt || ""}
    />
  ),
  img: (props: any) => <img {...props} className="rounded-lg my-6 w-full h-auto" alt={props.alt || ""} />,
  hr: () => <hr className="border-gray-800 my-8" />,
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)
  const publishedDate = new Date(post.date)
  const url = `https://hxrshrathore.com/blog/${post.slug}`

  // JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || "https://hxrshrathore.com/og-image.jpg",
    datePublished: publishedDate.toISOString(),
    dateModified: publishedDate.toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://hxrshrathore.com",
    },
    publisher: {
      "@type": "Person",
      name: "hxrshrathore",
      logo: {
        "@type": "ImageObject",
        url: "https://hxrshrathore.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleBody: post.content,
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-400 mb-6">{post.description}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {post.author[0].toUpperCase()}
                </div>
                <span className="text-gray-300">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedDate.toISOString()}>{format(publishedDate, "MMMM dd, yyyy")}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 rounded-xl overflow-hidden border border-gray-800">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
              components={mdxComponents}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-800">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{relatedPost.description}</p>
                    <div className="text-xs text-gray-500">{format(new Date(relatedPost.date), "MMM dd, yyyy")}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
