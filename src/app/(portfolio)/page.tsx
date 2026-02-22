import { client } from "@/sanity/lib/client"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import ProjectsClient from "@/components/ProjectsClient"


import { Metadata } from 'next';

export const revalidate = 60; // ISR: regenerate every 60 seconds for performance

// Fetch Profile Data for Metadata
async function getProfileData() {
  return await client.fetch(`*[_type == "profile"][0]{ 
    fullName, 
    headline, 
    subheadline,
    "imageUrl": profileImage.asset->url 
  }`)
}

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();

  const title = profile?.fullName ? `${profile.fullName} | Portfolio` : 'Syifa Raditya Pratama | Portfolio';
  const description = profile?.headline || 'Building high-performance web applications and digital solutions.';

  const ogImage = profile?.imageUrl || "/icon.svg";

  return {
    metadataBase: new URL("https://radityaportofolio.is-a.dev"),
    title,
    description,
    keywords: ["Syifa Raditya Pratama", "Web Developer Bandung", "Laravel Developer", "Next.js Portfolio", "Software Engineer Indonesia", "Full Stack Developer"],
    openGraph: {
      title,
      description,
      url: "https://radityaportofolio.is-a.dev",
      siteName: "Syifa Raditya Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

async function getProjects() {
  try {
    return await client.fetch(`*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      slug,
      description,
      tags,
      demoLink,
      repoLink,
      mainImage
    }`)
  } catch (error) {
    console.warn("Failed to fetch projects (likely missing env vars):", error)
    return []
  }
}

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  tags: string[]
  demoLink?: string
  repoLink?: string
  mainImage: SanityImageSource & { alt?: string }
}

async function getProfile() {
  try {
    return await client.fetch(`*[_type == "profile"][0]{ whatsapp, github, linkedin, email }`)
  } catch {
    return { whatsapp: '6281234567890', github: 'https://github.com', linkedin: 'https://linkedin.com', email: 'contact@radit.dev' }
  }
}

export default async function Home() {
  // throw new Error("Testing Error Boundary"); 
  const projects = await getProjects() as Project[]
  const profile = await getProfile()

  return (
    <main className="min-h-screen bg-zinc-950">
        <Hero />
        <About />
        <Skills />
        <Experience />
        
        <section id="projects" className="relative bg-zinc-950 py-24 md:py-32 border-t border-zinc-800/50" data-cursor-text="PROJECTS">
            {/* Top divider accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-px w-24 bg-linear-to-r from-transparent via-emerald-500 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4">
              <ProjectsClient projects={projects} />
            </div>
        </section>
        
        <Contact 
          whatsapp={profile?.whatsapp} 
          github={profile?.github}
          linkedin={profile?.linkedin}
          email={profile?.email}
        />

    </main>
  )
}
