"use client"

import { motion } from "framer-motion"

// Shimmer animation component
function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-800/60 ${className}`}>
      <motion.div 
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Shimmer className="absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        
        <div className="container relative mx-auto h-full px-6 flex flex-col justify-end pb-12">
          {/* Back button skeleton */}
          <Shimmer className="w-32 h-6 rounded-lg mb-8" />
          
          {/* Title skeleton */}
          <Shimmer className="w-3/4 h-16 md:h-20 rounded-xl mb-6" />
          
          {/* Description skeleton */}
          <Shimmer className="w-full max-w-2xl h-6 rounded-lg mb-2" />
          <Shimmer className="w-2/3 max-w-xl h-6 rounded-lg" />
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Body Skeleton */}
          <div className="lg:col-span-2">
            {/* Tech Stack skeleton */}
            <div className="mb-12 flex flex-wrap gap-4 items-center">
              <Shimmer className="w-20 h-4 rounded" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Shimmer key={i} className="w-10 h-10 rounded-lg" />
              ))}
            </div>

            {/* Content skeleton */}
            <div className="space-y-6">
              <Shimmer className="w-1/2 h-8 rounded-lg" />
              <Shimmer className="w-full h-4 rounded" />
              <Shimmer className="w-full h-4 rounded" />
              <Shimmer className="w-3/4 h-4 rounded" />
              
              <Shimmer className="w-full h-64 rounded-xl mt-8" />
              
              <Shimmer className="w-2/3 h-8 rounded-lg mt-8" />
              <Shimmer className="w-full h-4 rounded" />
              <Shimmer className="w-full h-4 rounded" />
              <Shimmer className="w-5/6 h-4 rounded" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-8">
                <Shimmer className="w-32 h-6 rounded-lg mb-6" />
                <Shimmer className="w-full h-14 rounded-xl mb-4" />
                <Shimmer className="w-full h-14 rounded-xl" />
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
