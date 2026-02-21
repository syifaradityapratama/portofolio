'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, List, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid'
import ProjectCard from '@/components/ProjectCard'
import SectionHeader from '@/components/SectionHeader'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  mainImage: SanityImageSource & { alt?: string }
  description: string
  tags: string[]
  demoLink?: string
  repoLink?: string
}

interface ProjectsClientProps {
  projects: Project[]
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  },
}

import { useScrollReveal } from '@/context/ScrollRevealContext'

// ... existing imports

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isRevealed } = useScrollReveal()

  return (
    <>
      <SectionHeader 
        title="Selected Work"
        subtitle="Projects that showcase my skills and experience."
        center
      />

      {/* View Toggle */}
      <div className="flex justify-center gap-2 mb-12">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-3 rounded-xl border transition-all duration-300 ${
            viewMode === 'grid'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
          }`}
          aria-label="Grid View"
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-3 rounded-xl border transition-all duration-300 ${
            viewMode === 'list'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
          }`}
          aria-label="List View"
        >
          <List size={20} />
        </button>
      </div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial="hidden"
            whileInView={isRevealed ? "visible" : undefined}
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <BentoGrid>
              {projects
                .filter(project => project.slug?.current)
                .map((project, i) => (
                  <BentoGridItem key={project._id} span={i === 0 ? 2 : 1}>
                    <ProjectCard project={project} priority={i === 0} />
                  </BentoGridItem>
                ))}
            </BentoGrid>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial="hidden"
            whileInView={isRevealed ? "visible" : undefined}
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {projects
              .filter(project => project.slug?.current)
              .map((project, i) => (
                <ProjectListItem key={project._id} project={project} priority={i === 0} />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <h3 className="text-xl font-medium text-white mb-2">Projects Coming Soon</h3>
          <p className="text-zinc-400">I am currently populating the portfolio with my latest work.</p>
        </div>
      )}
    </>
  )
}

// List View Item Component
function ProjectListItem({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <Link 
        href={`/projects/${project.slug.current}`} 
        className="group block"
        data-cursor-text="View"
    >
      <motion.div
        whileHover={{ x: 8 }}
        className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
      >
        {/* Image Thumbnail */}
        {project.mainImage && (
          <div className="relative w-full sm:w-48 h-32 sm:h-28 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={urlFor(project.mainImage).width(400).url()}
              alt={project.mainImage.alt || project.title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center text-zinc-500 group-hover:text-blue-400 transition-colors">
          <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </motion.div>
    </Link>
  )
}
