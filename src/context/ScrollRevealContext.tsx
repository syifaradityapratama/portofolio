'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

interface ScrollRevealContextType {
  isRevealed: boolean
  isScrolling: boolean
  triggerReveal: () => void
}

const ScrollRevealContext = createContext<ScrollRevealContextType>({
  isRevealed: false,
  isScrolling: false,
  triggerReveal: () => {},
})

export function useScrollReveal() {
  return useContext(ScrollRevealContext)
}

// Custom easing function for smooth scroll
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

// Smooth scroll to position with custom easing
function smoothScrollToTop(
  duration: number, 
  onProgress: (progress: number) => void,
  onComplete: () => void
) {
  const startPosition = window.scrollY
  const startTime = performance.now()

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuart(progress)
    
    window.scrollTo(0, startPosition * (1 - easedProgress))
    onProgress(progress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      window.scrollTo(0, 0)
      onComplete()
    }
  }

  requestAnimationFrame(animate)
}

interface ScrollRevealProviderProps {
  children: ReactNode
  preloaderDuration?: number // Time before preloader starts exiting
  preloaderExitDuration?: number // Duration of preloader exit animation
  scrollDuration?: number // Duration of scroll-to-top animation
}

export function ScrollRevealProvider({
  children,
  preloaderDuration = 1500,
  preloaderExitDuration = 700, // 0.6s animation + 0.1s delay
  scrollDuration = 1000, // 1 second — snappier scroll-to-top
}: ScrollRevealProviderProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const hasTriggeredReveal = useRef(false)

  // Detect prefers-reduced-motion (bypass cinematic scroll for accessibility)
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Scroll to bottom initially (after mount, before preloader exits)
  useEffect(() => {
    // If reduced motion: skip scroll-to-bottom entirely
    if (prefersReducedMotion.current) {
      window.scrollTo(0, 0)
      return
    }

    // Immediately scroll to bottom (hidden behind preloader)
    const scrollToBottom = () => {
      const documentHeight = document.documentElement.scrollHeight
      window.scrollTo(0, documentHeight)
    }
    
    // Small delay to ensure page is rendered
    const timer = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timer)
  }, [])

  // After preloader exits, start scroll-to-top animation
  useEffect(() => {
    if (hasScrolled) return

    const totalDelay = preloaderDuration + preloaderExitDuration
    
    const timer = setTimeout(() => {
      // If reduced motion: skip scroll animation, reveal instantly
      if (prefersReducedMotion.current) {
        window.scrollTo(0, 0)
        hasTriggeredReveal.current = true
        setIsRevealed(true)
        return
      }

      setIsScrolling(true)
      setHasScrolled(true)
      
      smoothScrollToTop(
        scrollDuration, 
        (progress) => {
          // Trigger reveal at 70% scroll progress for seamless transition
          if (progress >= 0.7 && !hasTriggeredReveal.current) {
            hasTriggeredReveal.current = true
            setIsRevealed(true)
          }
        },
        () => {
          setIsScrolling(false)
          // Ensure revealed in case scroll was very short
          if (!hasTriggeredReveal.current) {
            setIsRevealed(true)
          }
        }
      )
    }, totalDelay)

    return () => clearTimeout(timer)
  }, [preloaderDuration, preloaderExitDuration, scrollDuration, hasScrolled])

  const triggerReveal = useCallback(() => {
    setIsRevealed(true)
  }, [])

  return (
    <ScrollRevealContext.Provider value={{ isRevealed, isScrolling, triggerReveal }}>
      {children}
    </ScrollRevealContext.Provider>
  )
}
