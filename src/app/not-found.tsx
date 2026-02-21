'use client';

import Link from 'next/link';
import { motion, type Transition } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
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

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden text-white">

      {/* Background Grid (Aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Massive Background Text (Watermark) — Breathing animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.h1
          className="text-[25vw] font-bold text-white/3 tracking-tighter"
          animate={{ opacity: [0.03, 0.06, 0.03], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.h1>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center space-y-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4">
          <motion.p
            variants={itemVariants}
            className="text-zinc-500 font-mono text-xs tracking-[0.2em] uppercase"
          >
            Error Code: 404_VOID
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Coordinates Invalid.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 max-w-md mx-auto text-sm md:text-base leading-relaxed"
          >
            The page you are looking for has been moved, deleted, or never existed in this reality.
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            <span>Return to Base</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
