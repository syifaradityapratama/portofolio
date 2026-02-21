"use client"

import Image from "next/image"
import { useState } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface BrandIconProps {
  name: string
  iconUrl?: string | null
  websiteUrl?: string | null
  className?: string
  size?: number
}

export default function BrandIcon({ name, iconUrl, websiteUrl, className, size = 20 }: BrandIconProps) {
  const [stage, setStage] = useState<'primary' | 'favicon' | 'letter'>('primary')

  // Build favicon URL from websiteUrl (same logic as Sanity Studio preview)
  const faviconUrl = websiteUrl
    ? (() => { try { return `https://www.google.com/s2/favicons?sz=128&domain=${new URL(websiteUrl).hostname}` } catch { return null } })()
    : null

  const currentSrc = stage === 'primary' ? iconUrl : stage === 'favicon' ? faviconUrl : null

  const handleError = () => {
    if (stage === 'primary' && faviconUrl) {
      setStage('favicon') // Try website favicon
    } else {
      setStage('letter')  // Show letter fallback
    }
  }

  return (
    <div className={cn(
      "relative flex items-center justify-center overflow-hidden",
      className
    )}>
      {currentSrc ? (
        <Image
          src={currentSrc}
          alt={name}
          width={size}
          height={size}
          className="object-contain md:grayscale group-hover:grayscale-0 transition-all md:opacity-70 opacity-100 group-hover:opacity-100 animate-[pulse_4s_ease-in-out_infinite] md:animate-none"
          onError={handleError}
          unoptimized
        />
      ) : (
        <span className="text-[10px] font-black text-zinc-400 group-hover:text-blue-400 transition-colors tracking-tighter">
          {name.substring(0, 1).toUpperCase()}
        </span>
      )}
    </div>
  )
}

