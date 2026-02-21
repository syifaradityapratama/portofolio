import { client } from "@/sanity/lib/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from "sanity"
import ExperienceAccordion from "./ExperienceAccordion"
import SectionHeader from "./SectionHeader"

interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrentJob: boolean
  companyLogo?: SanityImageSource
  description: PortableTextBlock[]
}

async function getExperience() {
  try {
    return await client.fetch<Experience[]>(
      `*[_type == "experience"] | order(startDate desc) {
        _id,
        company,
        role,
        startDate,
        endDate,
        isCurrentJob,
        companyLogo,
        description
      }`
    )
  } catch (error) {
    console.warn("Failed to fetch experience:", error)
    return []
  }
}

export default async function Experience() {
  const experiences = await getExperience()

  if (!experiences || experiences.length === 0) return null

  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-zinc-800/50" id="experience">
      {/* Top divider accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-purple-500 to-transparent" />
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <div className="md:pl-12 mb-16">
          <SectionHeader 
            title="Work Experience"
            subtitle="My professional journey and career milestones. Click on each role to see more details."
          />
        </div>


        <div className="md:pl-12">
          <ExperienceAccordion experiences={experiences} />
        </div>
      </div>
    </section>
  )
}
