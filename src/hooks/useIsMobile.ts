'use client'

import { useSyncExternalStore } from 'react'

/**
 * Detects mobile devices via viewport width.
 * Returns true on screens < 768px (Tailwind's `md` breakpoint).
 * Heavy animations should be disabled when this returns true.
 */
export function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
    () => false // SSR fallback: assume desktop
  )
}
