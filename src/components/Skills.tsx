import { client } from "@/sanity/lib/client"
import SkillsClient from "@/components/SkillsClient"
import SectionHeader from "@/components/SectionHeader"

interface Skill {
  _id: string
  name: string
  websiteUrl?: string
  iconUrl?: string
  category: string
}

async function getSkills() {
    try {
        const data = await client.fetch<Skill[]>(
            `*[_type == "skills"] | order(category asc, name asc) { 
                _id, 
                name, 
                websiteUrl,
                "iconUrl": icon.asset->url, 
                category 
            }`,
            {},
            { next: { revalidate: 60 } } // Refresh data every 60 seconds
        )
        return data;
    } catch (error) {
        console.error("Failed to fetch skills:", error)
        return []
    }
}

export default async function Skills() {
  const skills = await getSkills()

  if (!skills || skills.length === 0) return null

  return (
    <section id="skills" className="relative min-h-dvh flex items-center bg-zinc-950 border-t border-zinc-800/50">
      {/* Top divider accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 py-24">
        
        <SectionHeader 
            title="Tech Stack"
            subtitle="The tools I use to build scalable products."
            center
        />

        <SkillsClient skills={skills} />

      </div>
    </section>
  )
}
