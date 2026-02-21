'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkillCard from '@/components/SkillCard'
import { getLogoUrl } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useIsMobile'

// Types
interface Skill {
  _id: string
  name: string
  items?: string[]
  websiteUrl?: string
  iconUrl?: string
  category: string
}

interface SkillsClientProps {
  skills: Skill[]
}

// Color palette for dynamically derived categories
const CATEGORY_COLORS: Record<string, string> = {
  frontend: 'from-blue-400 to-cyan-400',
  backend: 'from-green-400 to-emerald-400',
  database: 'from-orange-400 to-amber-400',
  tools: 'from-purple-400 to-pink-400',
  marketing: 'from-rose-400 to-red-400',
  devops: 'from-sky-400 to-indigo-400',
}

// Fallback colors for categories not in the palette
const FALLBACK_COLORS = [
  'from-teal-400 to-cyan-400',
  'from-fuchsia-400 to-purple-400',
  'from-lime-400 to-green-400',
  'from-yellow-400 to-orange-400',
  'from-indigo-400 to-blue-400',
]

function getCategoryColor(key: string, index: number): string {
  return CATEGORY_COLORS[key] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
}

// ── #5 FIXED Marquee Row (Seamless Infinite Scroll) ──
// Uses margin-right instead of flex gap to ensure pixel-perfect -50% looping.
// Uses w-max so container width = content width exactly.
const MarqueeRow = ({ items, direction = "left", isMobile = false }: { items: Skill[], direction?: "left" | "right", isMobile?: boolean }) => {
    // Mobile: 4x duplication (enough for narrow screens), Desktop: 8x
    const duplicatedItems = Array(isMobile ? 4 : 8).fill(null).flatMap(() => items)

    return (
        <div className="marquee-row flex overflow-hidden select-none py-4">
            <motion.div
                className="flex w-max flex-nowrap"
                animate={{ x: direction === "left" ? "-50%" : "0%" }}
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                transition={{
                    ease: "linear",
                    duration: items.length * 4, // #7 Speed: slower for readability
                    repeat: Infinity,
                }}
            >
                {duplicatedItems.map((skill, idx) => {
                     const logoUrl = getLogoUrl(skill)
                     return (
                        <div key={`${skill._id}-${idx}`} className="shrink-0 mr-6" data-cursor-text={skill.name}>
                            <SkillCard 
                                name={skill.name} 
                                iconUrl={logoUrl} 
                                websiteUrl={skill.websiteUrl}
                                index={idx} 
                                variant="circle"
                            />
                        </div>
                     )
                })}
            </motion.div>
        </div>
    )
}

export default function SkillsClient({ skills }: SkillsClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const isMobile = useIsMobile()

  // Derive categories dynamically from data
  const uniqueKeys = [...new Set(skills.map(s => s.category?.toLowerCase() || 'other'))]
  const displayCategories = [
    { key: 'all', label: 'All', color: 'from-zinc-400 to-zinc-600' },
    ...uniqueKeys.map((key, i) => ({
      key,
      label: skills.find(s => s.category?.toLowerCase() === key)?.category || key,
      color: getCategoryColor(key, i),
    })),
  ]

  const filteredSkills = activeCategory === 'all' ? skills : skills.filter(skill => skill.category?.toLowerCase() === activeCategory)
  
  // Marquee Data
  const mid = Math.ceil(skills.length / 2)
  const row1 = skills.slice(0, mid)
  const row2 = skills.slice(mid)

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {displayCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeCategory === category.key
                ? 'text-white'
                : 'text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {activeCategory === category.key && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-full bg-linear-to-r ${category.color}`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        
        {/* VIEW A: MARQUEE — Circle Bubbles (All) */}
        {activeCategory === 'all' && skills.length > 0 ? (
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8 relative"
             >
                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
                
                <div className="flex flex-col gap-6 -rotate-1 hover:rotate-0 transition-transform duration-700 origin-center">
                    <MarqueeRow items={row1} direction="left" isMobile={isMobile} />
                    <MarqueeRow items={row2} direction="right" isMobile={isMobile} />
                </div>
             </motion.div>
        ) : activeCategory !== 'all' ? (
            /* VIEW B: #10 BENTO GRID + #8 Stagger + #9 Float (Filtered) */
            <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
                {filteredSkills.map((skill, index) => {
                    const logoUrl = getLogoUrl(skill)
                    const isFeatured = index < 2
                    const floatDuration = 3 + (index % 3) // 3s, 4s, 5s
                    
                    return (
                        <motion.div 
                            key={skill._id} 
                            data-cursor-text={skill.name}
                            // #8 Staggered Entry
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.06,
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ease: [0.22, 1, 0.36, 1] as any,
                            }}
                            // #10 Bento: first 2 items span 2 columns on md+
                            className={isFeatured ? "md:col-span-2" : ""}
                        >
                            {/* #9 Float Wrapper (desktop only) */}
                            <motion.div
                                animate={isMobile ? undefined : { y: [0, -6, 0] }}
                                transition={isMobile ? undefined : {
                                    duration: floatDuration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.6 + index * 0.15,
                                }}
                            >
                                <SkillCard 
                                    name={skill.name}
                                    iconUrl={logoUrl}
                                    websiteUrl={skill.websiteUrl}
                                    index={index}
                                    categoryKey={activeCategory}
                                    featured={isFeatured}
                                />
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>
            </AnimatePresence>
        ) : null}
        
        {/* Empty State */}
        {filteredSkills.length === 0 && (
            <div className="text-center py-12 text-zinc-500">No skills found in this category.</div>
        )}
      </div>
    </>
  )
}
