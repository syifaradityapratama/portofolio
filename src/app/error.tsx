'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, type Transition } from 'framer-motion';
import { Construction, Hammer, ArrowRight } from 'lucide-react';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase } as Transition,
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: customEase } as Transition,
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">

      {/* Animated Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Construction Icon */}
        <motion.div variants={iconVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
          <motion.div
            className="relative p-6 rounded-full border-2 border-yellow-500/30 bg-yellow-500/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Construction className="h-12 w-12 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Yellow Line Accent */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-1 bg-yellow-500 mb-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)]"
        />

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-4"
        >
          Under Development
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-zinc-400 mb-2 max-w-md text-lg leading-relaxed"
        >
          This section is currently being built with care.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-zinc-500 mb-8 max-w-md text-sm leading-relaxed flex items-center justify-center gap-2"
        >
          <Hammer className="h-4 w-4" />
          Check back soon for updates!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4"
        >
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-full hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </motion.button>

          <Link
            href="/"
            className="group px-8 py-3 border border-white/10 text-zinc-400 font-medium rounded-full hover:bg-white/5 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            Return Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
