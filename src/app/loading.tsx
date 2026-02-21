"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Branded Logo with Enhanced Animation */}
        <motion.div 
          className="w-20 h-20 border-2 border-white/20 rounded-2xl flex items-center justify-center relative bg-white/5 mb-8"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span 
            className="text-lg font-bold text-white tracking-widest"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            SRP
          </motion.span>
          
          {/* Multiple Rotating Borders */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-3px] border-2 border-transparent border-t-white/50 border-r-white/20 rounded-2xl"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-6px] border border-transparent border-b-blue-500/30 rounded-2xl"
          />
          
          {/* Pulse Ring */}
          <motion.div 
            className="absolute inset-0 border border-white/20 rounded-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
        
        {/* Loading Text with Typewriter Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs font-mono text-zinc-500 tracking-[0.4em] uppercase">
            Loading
          </span>
          
          {/* Animated Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{ 
                  y: [-3, 3, -3],
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
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div 
          className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 bg-size-[200%_100%]"
            animate={{ 
              x: ["-100%", "100%"],
              backgroundPosition: ["0% 50%", "100% 50%"]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
      
      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-2xl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-2xl" />
    </main>
  );
}
