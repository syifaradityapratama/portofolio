'use client'

import { motion, type Variants } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export default function TypewriterText({ 
  text, 
  className = '', 
  delay = 0,
  speed = 0.05,
}: TypewriterTextProps) {
  const letters = text.split('')
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  }

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          style={{ 
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
            minWidth: letter === ' ' ? '0.25em' : 'auto',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
