'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

interface ParticleFieldProps {
  count?: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  xDrift1: number
  xDrift2: number
}

// Generate particles outside of render
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
    xDrift1: Math.random() * 20 - 10,
    xDrift2: Math.random() * 40 - 20,
  }))
}

export default function ParticleField({ count = 30 }: ParticleFieldProps) {
  const shouldReduceMotion = useReducedMotion()
  
  // Use useState with lazy initializer to avoid calling Math.random during render
  const [particles] = useState<Particle[]>(() => generateParticles(count))

  if (shouldReduceMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            willChange: 'transform, opacity', // Force GPU
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            y: [0, -50, -100],
            x: [0, particle.xDrift1, particle.xDrift2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Shooting stars */}
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{ top: '20%', left: '80%' }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [-200, 0],
          y: [200, 0],
        }}
        transition={{
          duration: 1,
          delay: 3,
          repeat: Infinity,
          repeatDelay: 8,
        }}
      >
        <div className="absolute w-20 h-px bg-linear-to-l from-white/50 to-transparent -left-20 top-0" />
      </motion.div>
      
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{ top: '40%', left: '60%' }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [-150, 0],
          y: [150, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 7,
          repeat: Infinity,
          repeatDelay: 12,
        }}
      >
        <div className="absolute w-16 h-px bg-linear-to-l from-white/50 to-transparent -left-16 top-0" />
      </motion.div>
    </div>
  )
}
