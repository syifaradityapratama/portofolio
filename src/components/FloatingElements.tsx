'use client'

import { motion } from 'framer-motion'

// Floating code snippets and tech icons
const FLOATING_ITEMS = [
  { content: '<div>', x: '10%', y: '20%', delay: 0, duration: 20 },
  { content: '/>', x: '85%', y: '15%', delay: 2, duration: 18 },
  { content: '{ }', x: '15%', y: '70%', delay: 1, duration: 22 },
  { content: '( )', x: '80%', y: '75%', delay: 3, duration: 16 },
  { content: '=>', x: '70%', y: '30%', delay: 1.5, duration: 19 },
  { content: '[]', x: '25%', y: '85%', delay: 2.5, duration: 21 },
]

// Floating shapes
const FLOATING_SHAPES = [
  { type: 'circle', x: '5%', y: '40%', size: 8, delay: 0 },
  { type: 'circle', x: '90%', y: '50%', size: 6, delay: 1 },
  { type: 'ring', x: '75%', y: '60%', size: 20, delay: 2 },
  { type: 'ring', x: '20%', y: '35%', size: 16, delay: 1.5 },
  { type: 'dot', x: '60%', y: '20%', size: 4, delay: 0.5 },
  { type: 'dot', x: '40%', y: '80%', size: 3, delay: 2.5 },
]

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating code snippets */}
      {FLOATING_ITEMS.map((item, index) => (
        <motion.div
          key={`code-${index}`}
          className="absolute font-mono text-xs text-zinc-700/40 select-none"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          {item.content}
        </motion.div>
      ))}
      
      {/* Floating shapes */}
      {FLOATING_SHAPES.map((shape, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {shape.type === 'circle' && (
            <div 
              className="rounded-full bg-blue-500/20"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'ring' && (
            <div 
              className="rounded-full border border-zinc-700/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'dot' && (
            <div 
              className="rounded-full bg-purple-500/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
        </motion.div>
      ))}
      
      {/* Gradient lines */}
      <motion.div
        className="absolute w-px h-32 bg-linear-to-b from-transparent via-blue-500/20 to-transparent"
        style={{ left: '12%', top: '30%' }}
        animate={{ opacity: [0, 0.5, 0], height: ['0%', '15%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute w-px h-32 bg-linear-to-b from-transparent via-purple-500/20 to-transparent"
        style={{ right: '15%', top: '50%' }}
        animate={{ opacity: [0, 0.5, 0], height: ['0%', '12%', '0%'] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </div>
  )
}
