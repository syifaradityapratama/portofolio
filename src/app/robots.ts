import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Hide Sanity Studio from search results
    },
    sitemap: 'https://radityaportofolio.is-a.dev/sitemap.xml',
  }
}
