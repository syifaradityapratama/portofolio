'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function AuroraEffect() {
  const prefersReducedMotion = useReducedMotion()

  // For users who prefer reduced motion, render a static ambient gradient
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute -inset-x-1/2 top-0 h-[50%] rounded-[100%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.1) 30%, rgba(59, 130, 246, 0.07) 60%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
      {/* Aurora wave 1 - Blue/Cyan */}
      <motion.div
        className="absolute -inset-x-1/2 top-0 h-[50%] rounded-[100%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.15) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)',
          filter: 'blur(40px)',
          willChange: 'transform', // Force GPU
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.1, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Aurora wave 2 - Purple/Pink */}
      <motion.div
        className="absolute -inset-x-1/4 top-[10%] h-[40%] rounded-[100%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.12) 40%, rgba(168, 85, 247, 0.08) 70%, transparent 100%)',
          filter: 'blur(50px)',
          willChange: 'transform', // Force GPU
        }}
        animate={{
          x: ['5%', '-15%', '5%'],
          y: ['0%', '10%', '0%'],
          scale: [1.1, 1, 1.1],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Aurora wave 3 - Green accent */}
      <motion.div
        className="absolute left-1/4 right-1/4 top-[5%] h-[30%] rounded-[100%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.08) 50%, transparent 100%)',
          filter: 'blur(45px)',
          willChange: 'transform', // Force GPU
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['0%', '15%', '0%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
      
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
          willChange: 'transform', // Force GPU
        }}
        animate={{
          opacity: [0, 0.5, 0],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
