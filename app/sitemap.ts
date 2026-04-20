import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { shopProducts } from '@/lib/shop-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hxrshrathore.com'

  // Fetch blog posts
  const posts = await getAllPosts()
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Fetch shop products
  const productEntries: MetadataRoute.Sitemap = shopProducts.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  return [...staticEntries, ...postEntries, ...productEntries]
}
