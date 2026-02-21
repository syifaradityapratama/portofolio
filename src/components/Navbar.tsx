"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useScrollReveal } from "@/context/ScrollRevealContext";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { isRevealed } = useScrollReveal();
  const isMobile = useIsMobile(1024); // md breakpoint for tablet too

  // Hide navbar on scroll down, show on scroll up (desktop only)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Never hide on mobile/tablet
    if (isMobile) {
      setHidden(false);
      setScrolled(latest > 50);
      return;
    }
    
    // Only hide if scrolled past threshold
    if (latest > 100) {
      setHidden(latest > previous);
    } else {
      setHidden(false);
    }
    
    // Add solid background when scrolled
    setScrolled(latest > 50);
  });

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("mailto:")) return;

    const targetPath = href.split("#")[0] || "/";
    const hash = href.split("#")[1];

    if (pathname === targetPath) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          const rect = element.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - 80;
          smoothScrollTo(targetY, 1200);
        }
      } else {
        e.preventDefault();
        smoothScrollTo(0, 1200);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tech", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Work", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  // Staggered animation variants for nav links
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, type: "tween" as const }
    },
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <>
      {/* Mobile Backdrop - OUTSIDE nav so it's not affected by hide animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled 
            ? "border-white/10 bg-black/80 backdrop-blur-sm md:backdrop-blur-xl shadow-lg shadow-black/20" 
            : "border-white/5 bg-black/40 backdrop-blur-sm md:backdrop-blur-md"
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo with animated border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="relative group flex items-center justify-center"
              onClick={(e) => handleNavClick(e, "/")}
            >
              {/* Logo Box */}
              <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center relative bg-white/5 overflow-hidden group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                <span className="text-sm font-bold text-white tracking-widest group-hover:text-zinc-300 transition-colors duration-300">SRP</span>
                
                {/* Rotating border animation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-2px] border border-transparent border-t-white/30 rounded-xl pointer-events-none"
                />
                
                {/* Subtle pulse glow */}
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with staggered entrance */}
          <motion.div 
            className="hidden md:flex gap-8 text-sm font-medium text-zinc-400"
            variants={containerVariants}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
          >
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={linkVariants}>
                <Link 
                  href={link.href} 
                  className="relative py-2 px-1 group"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {/* Link text with hover color */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {link.name}
                  </span>
                  
                  {/* Animated underline - CSS based for reliability */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-blue-500 to-cyan-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  
                  {/* Subtle background glow on hover */}
                  <span className="absolute inset-0 -z-10 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300 scale-90 group-hover:scale-100" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Toggle with morphing animation */}
          <motion.button 
            className="md:hidden text-white p-3 -mr-3 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Toggle Menu"}
            aria-expanded={isOpen}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu with staggered items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-zinc-950/98 border-b border-white/10 backdrop-blur-sm overflow-hidden z-50"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    <Link 
                      href={link.href} 
                      className="text-lg font-medium text-zinc-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5 block relative group"
                      onClick={(e) => {
                        setIsOpen(false);
                        handleNavClick(e, link.href);
                      }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {/* Hover indicator */}
                      <motion.span 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"
                        whileHover={{ height: "60%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
