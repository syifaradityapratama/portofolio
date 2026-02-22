'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensuring the luxury intro has time to be appreciated
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds — enough for branding, fast enough for LCP
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 0.6, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1
            } 
          }}
        >
          {/* Dual Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />
          
          {/* Corner Accents */}
          <motion.div 
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-2xl"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-2xl"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center w-full px-6">
            
            {/* 1. BRAND MONOGRAM with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-white/20 rounded-2xl flex items-center justify-center relative bg-white/5">
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Image 
                    src="/icon.svg" 
                    alt="SRP Mascot" 
                    width={60} 
                    height={60} 
                  />
                </motion.div>
                
                {/* Dual Rotating Borders */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px] border-2 border-transparent border-t-white/50 border-r-white/20 rounded-2xl"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-8px] border border-transparent border-b-blue-500/30 border-l-cyan-500/20 rounded-2xl"
                />
                
                {/* Pulse Ring */}
                <motion.div 
                  className="absolute inset-0 border border-white/20 rounded-2xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* 2. WELCOME SUBTEXT */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-zinc-400 font-mono text-xs md:text-sm uppercase tracking-[0.5em] mb-12 text-center"
            >
              Building the project experience
            </motion.p>

            {/* 3. GRADIENT PROGRESS BAR */}
            <div className="w-64 md:w-96 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 bg-size-[200%_100%]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
            </div>

            {/* 4. BOUNCING DOTS */}
            <motion.div 
               className="mt-8 flex items-center gap-3"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
            >
               <div className="flex gap-1.5">
                 {[0, 1, 2].map((i) => (
                   <motion.div
                     key={i}
                     className="w-2 h-2 bg-white rounded-full"
                     animate={{ 
                       y: [-4, 4, -4],
                       opacity: [0.4, 1, 0.4]
                     }}
                     transition={{ 
                       duration: 0.8, 
                       repeat: Infinity, 
                       delay: i * 0.15,
                       ease: "easeInOut"
                     }}
                   />
                 ))}
               </div>
               <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase ml-2">
                 INITIALIZING
               </span>
            </motion.div>

          </div>

          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
