import clsx from 'clsx'
import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={clsx("grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2", className)}>
      {children}
    </div>
  )
}

export function BentoGridItem({ children, className, span = 1 }: { children: ReactNode, className?: string, span?: number }) {
    return (
        <div className={clsx(className, span === 2 ? "md:col-span-2" : "md:col-span-1")}>
            {children}
        </div>
    )
}
