"use client"

import { useState } from "react"
import Image from "next/image"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from "sanity"
import { Briefcase, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"
import { useScrollReveal } from "@/context/ScrollRevealContext"

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

interface ExperienceAccordionProps {
  experiences: Experience[]
}

// Custom components for Portable Text
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-2 text-zinc-400 text-sm leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="ml-4 list-disc space-y-1.5 text-zinc-400 text-sm marker:text-blue-500">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ExperienceAccordion({ experiences }: ExperienceAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { isRevealed } = useScrollReveal()

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-[23px] top-4 bottom-4 w-px bg-zinc-800" />
      
      <div className="space-y-0">
        {experiences.map((job, index) => {
          const isExpanded = expandedId === job._id
          
          return (
          <motion.div 
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={isRevealed ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative group/row transition-all duration-500 rounded-3xl ${
              isExpanded 
                ? "bg-white/3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                : "hover:bg-white/1.5"
            }`}
          >
            {/* Timeline Line */}
            <div className="absolute left-[5.5px] top-0 bottom-0 w-px bg-zinc-800/50 group-last/row:h-6" />
            
            <div className="relative px-6">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6">
                <motion.div 
                  className={`w-[12px] h-[12px] rounded-full border-2 bg-black z-10 transition-colors duration-300 ${
                    isExpanded 
                      ? "border-blue-400" 
                      : job.isCurrentJob
                        ? "border-blue-500"
                        : "border-zinc-700"
                  }`}
                  animate={isExpanded ? { 
                    scale: [1, 1.25, 1],
                  } : job.isCurrentJob ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: isExpanded ? 3.5 : 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Visual pulse rings */}
                <AnimatePresence>
                  {isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        key="expanded-pulse-1"
                        className="absolute w-full h-full rounded-full border-2 border-blue-400/60"
                        animate={{ 
                          scale: [1, 2.2], 
                          opacity: [0, 0.8, 0] 
                        }}
                        transition={{ 
                          duration: 3.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      />
                      <motion.div
                        key="expanded-pulse-2"
                        className="absolute w-full h-full rounded-full border border-blue-400/40"
                        animate={{ 
                          scale: [1, 1.7], 
                          opacity: [0, 0.5, 0] 
                        }}
                        transition={{ 
                          duration: 3.5, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div 
                className="pl-8 sm:pl-12 cursor-pointer"
                onClick={() => toggleExpand(job._id)}
              >
                {/* Header Row - No border when expanded to feel seamless */}
                <div className={`flex items-start gap-4 py-6 transition-colors duration-300 ${
                  isExpanded ? "border-transparent" : "border-b border-zinc-800/50"
                }`}>
                  {/* Company Logo */}
                  <motion.div 
                    className="shrink-0 mt-0.5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {job.companyLogo ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 p-1.5 shadow-sm">
                        <Image
                          src={urlFor(job.companyLogo).width(200).url()}
                          alt={job.company}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 shadow-sm">
                        <Briefcase className="h-6 w-6 text-zinc-500" />
                      </div>
                    )}
                  </motion.div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-1">
                      <h3 className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
                        isExpanded ? "text-blue-400" : "text-white"
                      }`}>
                        {job.role}
                      </h3>
                      <span className="text-sm font-medium text-zinc-500 tabular-nums">
                        {formatDate(job.startDate)} — {job.isCurrentJob ? "Present" : job.endDate ? formatDate(job.endDate) : ""}
                      </span>
                    </div>
                    <p className="text-zinc-400 font-medium">
                      {job.company}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center border transition-colors ${
                      isExpanded 
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                        : "border-white/5 text-zinc-500 group-hover/row:border-white/10 group-hover/row:text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>

                {/* Description - Cardless style with left accent */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { 
                          duration: 0.5, 
                          ease: [0.22, 1, 0.36, 1] 
                        },
                        opacity: { 
                          duration: 0.3, 
                          delay: 0.1 
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="pb-8 pt-2"
                      >
                        <div className="pl-6 border-l-2 border-blue-500/20 py-2">
                          <div className="text-zinc-300/90 leading-relaxed max-w-3xl">
                            <PortableText value={job.description} components={ptComponents} />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
        })}
      </div>
    </div>
  )
}
