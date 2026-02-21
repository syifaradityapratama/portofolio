'use client'

import { motion, useReducedMotion, type Transition } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'
import { useScrollReveal } from '@/context/ScrollRevealContext'

// Dynamic imports — eliminates heavy animation JS from initial bundle
const AnimatedGrid = dynamic(() => import('./AnimatedGrid'), { ssr: false, loading: () => null })
const FloatingElements = dynamic(() => import('./FloatingElements'), { ssr: false, loading: () => null })
const AuroraEffect = null // REMOVED: Replaced with CSS-only gradient for performance
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false, loading: () => null })

interface HeroClientProps {
  profile: {
    fullName?: string
    headline?: string
    subheadline?: string
    profileImageUrl?: string
    profileImageAlt?: string
    resumeUrl?: string
    isAvailable?: boolean
  }
}

// Custom easing as tuple for TypeScript
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1]



const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: customEase,
    } as Transition
  },
}

const ringVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
}

export default function HeroClient({ profile }: HeroClientProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const { isRevealed } = useScrollReveal()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-dvh flex items-center px-6 lg:px-16 overflow-hidden">
      {/* Ambient Gradient — CSS-only replacement for AuroraEffect (zero JS cost) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-x-1/2 -top-1/4 h-[70%] rounded-[100%] opacity-20 animate-[aurora_20s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, rgba(59,130,246,0.08) 40%, rgba(139,92,246,0.05) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute -inset-x-1/4 top-[10%] h-[50%] rounded-[100%] opacity-15 animate-[aurora_25s_ease-in-out_infinite_reverse]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 100%)',
          }}
        />
      </div>
      
      {/* Particle Field - Stars (disabled for reduced motion, client-only) */}
      {!prefersReducedMotion && <ParticleField count={40} />}
      
      {/* Animated Grid Background */}
      <AnimatedGrid />
      
      {/* Floating Decorative Elements */}
      <FloatingElements />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950" />
      
      {/* Animated background orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
      />
      
      {/* Content Grid: Split Layout */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Profile Image with Floating Effect (No 3D Tilt) */}
          <motion.div 
            className="flex justify-center lg:justify-start order-1 lg:order-1"
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
            variants={imageVariants}
          >
            {profile.profileImageUrl && (
              <motion.div 
                ref={imageContainerRef}
                className="relative"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Decorative rings with staggered animation */}
                <motion.div 
                  className="absolute -inset-4 rounded-full border border-zinc-800/50"
                  variants={ringVariants}
                  initial="hidden"
                  animate={isRevealed ? 'visible' : 'hidden'}
                  transition={{ delay: 0.3 }}
                />
                <motion.div 
                  className="absolute -inset-8 rounded-full border border-zinc-800/30"
                  variants={ringVariants}
                  initial="hidden"
                  animate={isRevealed ? 'visible' : 'hidden'}
                  transition={{ delay: 0.5 }}
                />
                <motion.div 
                  className="absolute -inset-12 rounded-full border border-zinc-800/15"
                  variants={ringVariants}
                  initial="hidden"
                  animate={isRevealed ? 'visible' : 'hidden'}
                  transition={{ delay: 0.7 }}
                />
                
                {/* Glow effect behind image */}
                <motion.div 
                  className="absolute inset-4 rounded-full bg-blue-500/20 blur-3xl"
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                />
                
                {/* Main image */}
                <motion.div 
                  className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-900/50 shadow-2xl shadow-blue-500/20"
                  whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image 
                    src={profile.profileImageUrl} 
                    alt={profile.profileImageAlt || "Profile Image"} 
                    fill
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    className="object-cover object-top"
                    priority
                    quality={85}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT: Text + CTA */}
          <div 
            className="text-center lg:text-left order-2 lg:order-2 space-y-6 flex flex-col items-center lg:items-start"
          >
            {/* Availability Badge - animated, waits for reveal */}
            {profile.isAvailable && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: customEase }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Available for Work
              </motion.div>
            )}

            {/* === LCP CRITICAL ZONE — Renders immediately, no isRevealed gate === */}
            {/* Name with gradient animation */}
            {profile.fullName && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <motion.span
                  className="bg-clip-text text-transparent bg-size-[200%_100%]"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #fff 0%, #60a5fa 25%, #a78bfa 50%, #60a5fa 75%, #fff 100%)',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  {profile.fullName}
                </motion.span>
              </h1>
            )}

            {/* Headline — immediately visible */}
            <h2 
              className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight bg-linear-to-r from-zinc-300 via-zinc-100 to-zinc-300 bg-clip-text text-transparent"
            >
              {profile.headline || "Full Stack Precision. Business Vision."}
            </h2>

            {/* Subheadline — immediately visible */}
            <p className="text-lg text-zinc-400 max-w-xl">
              {profile.subheadline || "Building digital products that solve real-world problems with code and strategy."}
            </p>
            {/* === END LCP CRITICAL ZONE === */}

            {/* CTA Buttons — animated, waits for reveal */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1, ease: customEase }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4"
            >
              {profile.resumeUrl && (
                <MagneticButton strength={0.2}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:shadow-lg hover:shadow-white/25 overflow-hidden"
                    >
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="relative z-10">View Resume</span>
                      <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={18} />
                    </Link>
                  </motion.div>
                </MagneticButton>
              )}
              <MagneticButton strength={0.2}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition-all hover:border-blue-500/50 hover:text-white hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-2 sm:bottom-4 md:bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="flex flex-col items-center gap-1 sm:gap-2 text-zinc-500"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-5 sm:h-8 bg-linear-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
