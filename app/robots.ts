import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin', '/api/bridge', '/api', '/cart'],
    },
    sitemap: 'https://hxrshrathore.vercel.app/sitemap.xml',
  }
}
