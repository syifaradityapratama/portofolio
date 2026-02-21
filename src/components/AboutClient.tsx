'use client'

import { motion, type Transition } from 'framer-motion'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'

interface AboutClientProps {
  bio: PortableTextBlock[]
}

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase } as Transition,
  },
}

// Wrap each PortableText block in a motion.div for stagger effect
const ptComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <motion.p
        variants={itemVariants}
        className="text-lg leading-relaxed"
      >
        {children}
      </motion.p>
    ),
    h3: ({ children }) => (
      <motion.h3
        variants={itemVariants}
        className="text-white text-xl font-semibold mt-8 mb-4"
      >
        {children}
      </motion.h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <motion.ul
        variants={itemVariants}
        className="space-y-2 list-disc pl-6"
      >
        {children}
      </motion.ul>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
  },
}

import { useScrollReveal } from '@/context/ScrollRevealContext'

// ... existing imports

export default function AboutClient({ bio }: AboutClientProps) {
  const { isRevealed } = useScrollReveal()
  
  return (
    <section id="about" className="relative min-h-dvh flex items-center bg-black border-t border-zinc-800/50">
      {/* Top divider accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={isRevealed ? { width: 96, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"
        />
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black" />

      {/* Floating ambient glow */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 py-24">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView={isRevealed ? "visible" : undefined}
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-zinc-400"
          >
            Get to know me better
          </motion.p>
        </motion.div>

        {/* Bio Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView={isRevealed ? "visible" : undefined}
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <motion.div
              variants={containerVariants}
              className="space-y-6 text-zinc-300 leading-relaxed text-justify"
            >
              <PortableText value={bio} components={ptComponents} />
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements — Animated */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial="hidden"
          whileInView={isRevealed ? "visible" : undefined}
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="h-1 w-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-500"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            variants={itemVariants}
            className="h-1 w-4 rounded-full bg-zinc-700"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.span
            variants={itemVariants}
            className="h-1 w-4 rounded-full bg-zinc-800"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
