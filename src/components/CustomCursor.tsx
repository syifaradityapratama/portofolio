'use client'

import { useEffect, useState, useRef, useSyncExternalStore } from "react"
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion"

// Detect touch devices (phones, tablets) — returns true if no fine pointer
function useIsTouchDevice(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia('(pointer: coarse)')
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia('(pointer: coarse)').matches,
    () => false
  )
}


// 1. Rainbow Tail + Satellite Component (Combined for Sync)
const RainbowOrbitSystem = ({ 
    x, y, 
    orbitRadius = 28, 
    duration = 3000,
    size = 12
}: { 
    x: MotionValue<number>, 
    y: MotionValue<number>, 
    orbitRadius?: number, 
    duration?: number,
    size?: number
}) => {
  const [points, setPoints] = useState<{x: number, y: number}[]>([])
  const [head, setHead] = useState<{x: number, y: number} | null>(null)
  const frameRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const updateLoop = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      
      // Calculate Orbit Angle
      // distinct rotation for orbit
      const angle = (elapsed / duration) * (Math.PI * 2)
      
      const currentX = x.get()
      const currentY = y.get()
      
      // Calculate Orbit Position (Center + Offset)
      const orbitX = currentX + Math.cos(angle) * orbitRadius
      const orbitY = currentY + Math.sin(angle) * orbitRadius
      
      // Update Head Position
      setHead({ x: orbitX, y: orbitY })

      // Update Tail History
      setPoints(prev => {
        const newPoints = [...prev, { x: orbitX, y: orbitY }]
        if (newPoints.length > 25) newPoints.shift()
        return newPoints
      })
      
      frameRef.current = requestAnimationFrame(updateLoop)
    }
    
    frameRef.current = requestAnimationFrame(updateLoop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [x, y, orbitRadius, duration])

  if (!head || points.length < 2) return null

  const pathContent = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ")
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-visible">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* The Tail */}
        <path 
          d={pathContent} 
          fill="none" 
          stroke="url(#rainbowGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeLinejoin="round" 
          className="opacity-60 blur-[1px]"
        />
        
        {/* The Satellite Head (Earth) - Rendered inside SVG or overlay? SVG circles are fine */}
        <circle 
            cx={head.x} 
            cy={head.y} 
            r={size / 2} 
            fill="#67e8f9" // Cyan-300
            filter="url(#glow)"
        />
        <defs>
             <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
      </svg>
    </div>
  )
}

export default function CustomCursor() {
  const isTouchDevice = useIsTouchDevice()
  const [isHovered, setIsHovered] = useState(false)

  // 1. Mouse Values
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // 2. Physics Configs
  // Heavier spring for the center of orbit to smooth it out
  const springConfigMain = { damping: 25, stiffness: 300, mass: 0.5 }
  const satCenterX = useSpring(mouseX, springConfigMain)
  const satCenterY = useSpring(mouseY, springConfigMain)

  useEffect(() => {
    if (isTouchDevice) return // Skip all mouse handling on touch devices

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    document.body.style.cursor = 'none'

    return () => {
        window.removeEventListener("mousemove", moveCursor)
        window.removeEventListener("mouseover", handleMouseOver)
        document.body.style.cursor = 'auto'
      }
    }, [mouseX, mouseY, isTouchDevice])
  
    // Touch devices (mobile/tablet) don't need a custom cursor
    if (isTouchDevice) return null

    return (
      <>
        <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden">
          

          {/* A. SATELLITE SYSTEM (Tail + Head) */}
          {!isHovered && (
             <RainbowOrbitSystem 
                x={satCenterX} 
                y={satCenterY} 
                orbitRadius={27} // Reduced from 32 to 20 (Closer)
                duration={4000}  // Slightly faster
                size={12}
            />
          )}
  
          {/* B. CORE SYSTEM (Sun + Ring) */}
          <motion.div
              className="absolute top-0 left-0"
              style={{ x: mouseX, y: mouseY }}
          >
              {/* 1. Dot (Sun) - Hides on Hover (Target Mode) */}
              <motion.div 
                  className={`w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      isHovered ? 'bg-transparent' : 'bg-white'
                  }`}
                  animate={{ scale: isHovered ? 0 : 1 }}
              />
  
              {/* 2. Ring (Orbit Path) - Becomes Target Reticle */}
              <motion.div
                  className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-white/40 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                      opacity: isHovered ? 1.5 : [0.2, 0.7, 0.2], // Fully visible on hover
                      scale: isHovered ? 0.75 : [1, 1.35, 1],    // Expands to frame target
                      borderColor: isHovered ? "rgba(6,182,212,0.8)" : "rgba(255,255,255,0.4)" // Cyan focus
                  }}
                  transition={{ 
                      duration: isHovered ? 0.2 : 1.75, 
                      repeat: isHovered ? 0 : Infinity,
                      ease: "easeInOut" 
                  }}
              />
          </motion.div>
        </div>
      </>
    )
  }
