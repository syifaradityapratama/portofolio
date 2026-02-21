'use client'

import { motion } from 'framer-motion'


import { useScrollReveal } from '@/context/ScrollRevealContext'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  center = false,
  className = "" 
}: SectionHeaderProps) {
  const { isRevealed } = useScrollReveal()

  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : 'text-center md:text-left'} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={isRevealed ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-zinc-400 max-w-2xl ${center ? 'mx-auto' : 'mx-auto md:mx-0'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
