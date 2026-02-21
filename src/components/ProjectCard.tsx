'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ProjectProps {
  project: {
    _id: string
    title: string
    slug: { current: string }
    mainImage: SanityImageSource & { alt?: string }
    description: string
    tags: string[]
    demoLink?: string
    repoLink?: string
  }
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: ProjectProps) {
  return (
    <Link href={`/projects/${project.slug.current}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-zinc-700/50 hover:bg-zinc-900/80"
      >
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="relative z-10">
          <div className="mb-4">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {project.tags?.slice(0, 3).map((tag, i) => (
                <span key={i} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="mb-6 line-clamp-3 text-sm text-zinc-400">
            {project.description}
          </p>
        </div>

        {project.mainImage && (
          <div className="relative mt-auto h-40 w-full overflow-hidden rounded-lg mb-4">
              <Image
                  src={urlFor(project.mainImage).width(600).url()}
                  alt={project.mainImage.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={priority}
                />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm font-medium text-zinc-400 group-hover:text-blue-400 transition-colors mt-2">
           View Case Study
           <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </motion.div>
    </Link>
  )
}
