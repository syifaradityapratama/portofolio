import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://syifaraditya.com' // Adjust to your production URL

  // Fetch project slugs from Sanity
  const projects = await client.fetch<{ slug: { current: string }, _updatedAt: string }[]>(
    `*[_type == "project"]{ "slug": slug.current, _updatedAt }`
  );

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectEntries,
  ]
}
