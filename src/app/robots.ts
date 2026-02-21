import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Hide Sanity Studio from search results
    },
    sitemap: 'https://syifaraditya.com/sitemap.xml', // Adjust if you have a different domain
  }
}
