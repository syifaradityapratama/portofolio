'use client'

import { motion } from 'framer-motion'

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Animated highlight lines - horizontal */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent"
        initial={{ top: '20%', opacity: 0 }}
        animate={{ 
          top: ['20%', '80%', '20%'],
          opacity: [0, 0.5, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'linear',
        }}
      />
      
      {/* Animated highlight lines - vertical */}
      <motion.div 
        className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-purple-500/30 to-transparent"
        initial={{ left: '30%', opacity: 0 }}
        animate={{ 
          left: ['30%', '70%', '30%'],
          opacity: [0, 0.5, 0],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: 'linear',
        }}
      />
      
      {/* Corner accents */}
      <div className="absolute top-20 left-20 w-32 h-32 border-l border-t border-zinc-800/30" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border-r border-b border-zinc-800/30" />
      
      {/* Glowing orbs at intersections */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-blue-500/50 blur-sm"
        animate={{
          top: ['25%', '75%', '25%'],
          left: ['25%', '50%', '25%'],
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-purple-500/50 blur-sm"
        animate={{
          top: ['60%', '30%', '60%'],
          right: ['30%', '50%', '30%'],
          scale: [1.5, 1, 1.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' as const }}
      />
    </div>
  )
}
