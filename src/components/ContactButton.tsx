"use client"

import { useState } from "react"
import { Mail, Copy, ExternalLink, AppWindow, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ContactButtonProps {
  email: string
}

export default function ContactButton({ email }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950 transition hover:bg-zinc-200"
      >
        <Mail size={18} />
        <span>Contact Me</span>
        <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-zinc-100 rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-xl backdrop-blur-md focus:outline-none z-50 overflow-hidden"
          >
            <div className="p-1">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <ExternalLink size={16} />
                </div>
                Open in Gmail
              </a>
              
              <a
                href={`mailto:${email}`}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <AppWindow size={16} />
                </div>
                Default App
              </a>

              <button
                onClick={handleCopy}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-400">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </div>
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop to close menu when clicking outside */}
      {isOpen && (
        <div 
            className="fixed inset-0 z-40 bg-transparent" 
            onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
