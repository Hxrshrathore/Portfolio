import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogPostClient from "@/components/blog-post-client"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const publishedTime = new Date(post.date).toISOString()
  const url = `https://hxrshrathore.com/blog/${post.slug}`
  const siteTitle = "hxrshrathore"

  return {
    title: `${post.title} | ${siteTitle}`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    referrer: 'origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime,
      authors: [post.author],
      url,
      siteName: siteTitle,
      locale: 'en_US',
      images: [
        {
          url: post.image || "https://hxrshrathore.com/og-placeholder.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@hxrshrathore",
      images: [post.image || "https://hxrshrathore.com/og-placeholder.jpg"],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags)
  const publishedDate = new Date(post.date).toISOString()
  const baseUrl = "https://hxrshrathore.com"
  const url = `${baseUrl}/blog/${post.slug}`

  // Sophisticated Multi-Entity Schema
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image || `${baseUrl}/og-placeholder.jpg`,
      datePublished: publishedDate,
      dateModified: publishedDate,
      author: {
        "@type": "Person",
        name: post.author,
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "hxrshrathore",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      keywords: post.tags.join(", "),
      articleBody: post.content,
      wordCount: post.content.split(/\s+/).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      numberOfItems: 3,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}
