'use client'

import { motion } from 'framer-motion'
import BrandIcon from './BrandIcon'

// Category → Hover Color mapping (#3 Gradient Border)
const CATEGORY_COLORS: Record<string, { border: string; glow: string }> = {
  frontend: { border: 'rgba(56,189,248,0.7)', glow: '0 0 25px rgba(56,189,248,0.3)' },
  backend:  { border: 'rgba(52,211,153,0.7)', glow: '0 0 25px rgba(52,211,153,0.3)' },
  database: { border: 'rgba(251,146,60,0.7)', glow: '0 0 25px rgba(251,146,60,0.3)' },
  tools:    { border: 'rgba(192,132,252,0.7)', glow: '0 0 25px rgba(192,132,252,0.3)' },
}
const DEFAULT_COLOR = { border: 'rgba(6,182,212,0.8)', glow: '0 0 25px rgba(6,182,212,0.4)' }

interface SkillCardProps {
  name: string
  iconUrl?: string | null
  websiteUrl?: string | null
  index?: number
  variant?: 'square' | 'circle'
  categoryKey?: string  // #3: determines hover glow color
  featured?: boolean    // #10: Bento large card
}

export default function SkillCard({ 
  name, iconUrl, websiteUrl, variant = 'square', categoryKey, featured = false 
}: SkillCardProps) {
  const colors = (categoryKey && CATEGORY_COLORS[categoryKey]) || DEFAULT_COLOR

  // ── #1 CIRCLE VARIANT (Marquee "All") ──
  if (variant === 'circle') {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.2, 
          rotate: 8,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="skill-circle w-20 h-20 shrink-0 rounded-full border-2 border-white/10 bg-zinc-900/60
                   flex items-center justify-center backdrop-blur-sm cursor-default
                   transition-all duration-300"
        title={name}
      >
        <BrandIcon
          name={name}
          iconUrl={iconUrl}
          websiteUrl={websiteUrl}
          size={36}
          className="skill-circle-icon h-9 w-9 opacity-60 transition-all duration-300"
        />
      </motion.div>
    )
  }

  // ── #2/#3 SQUARE VARIANT (Grid / Bento) ──
  const iconSize = featured ? 80 : 64
  const iconClass = featured ? 'h-20 w-20' : 'h-16 w-16'

  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        y: -6,
        borderColor: colors.border,
        boxShadow: colors.glow,
        transition: {
          scale: { type: 'spring', stiffness: 400, damping: 15 },
          y: { type: 'spring', stiffness: 400, damping: 15 },
        }
      }}
      className={`skill-card group w-full flex flex-col items-center justify-center gap-4 rounded-2xl 
                  border border-white/5 bg-zinc-900/40 transition-all duration-300 
                  hover:bg-zinc-900/80 cursor-default ${featured ? 'p-8' : 'p-6'}`}
    >
      <motion.div
        whileHover={{ rotate: [0, -8, 8, -4, 0] }}
        transition={{ duration: 0.5 }}
      >
        <BrandIcon
          name={name}
          iconUrl={iconUrl}
          websiteUrl={websiteUrl}
          size={iconSize}
          className={`skill-card-icon ${iconClass}`}
        />
      </motion.div>

      <span className={`font-medium text-zinc-400 transition-colors group-hover:text-white 
                        text-center ${featured ? 'text-base' : 'text-sm'}`}>
        {name}
      </span>
    </motion.div>
  )
}
