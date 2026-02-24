'use client';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollReveal } from '@/context/ScrollRevealContext';

interface FooterProps {
  fullName?: string;
}

export default function Footer({ fullName = 'Syifa Raditya' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { isRevealed } = useScrollReveal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.footer 
      className="bg-black border-t border-white/5 py-12 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView={isRevealed ? "visible" : undefined}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[200px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Back to Top - Centered with Glow */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 text-sm px-4 py-2 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 hover:shadow-lg hover:shadow-white/5"
          >
            <span className="tracking-wide">Back to Top</span>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* DIVIDER - Gradient */}
        <motion.div 
          variants={itemVariants} 
          className="w-full h-px mb-8 bg-linear-to-r from-transparent via-white/10 to-transparent" 
        />

        {/* BOTTOM ROW: Copyright (Left) | Tagline (Center) | Built With (Right) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs"
        >
          {/* Copyright - Continuous flicker + hover pop */}
          <motion.p 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="text-zinc-500 tracking-wide cursor-default"
          >
            © {currentYear} {fullName}. All Rights Reserved.
          </motion.p>

          {/* Tagline - Bold & Prominent */}
          <p className="text-zinc-400 font-medium tracking-wider text-center order-first md:order-0">
            Crafting digital experiences with precision and passion.
          </p>

          {/* Built With - Continuous flicker + hover pop */}
          <motion.p 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="text-zinc-500 tracking-wide cursor-default"
          >
            Built with{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-zinc-300">
              Next.js, Tailwind CSS & Sanity
            </span>
          </motion.p>
        </motion.div>

      </div>
    </motion.footer>
  );
}

