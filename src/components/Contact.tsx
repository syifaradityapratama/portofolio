'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Mail, Copy, Check, ExternalLink, AppWindow, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/context/ScrollRevealContext';
import { sendGAEvent } from '@next/third-parties/google';

interface ContactProps {
  whatsapp?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

// Hardcoded contact content
const CONTACT_HEADLINE = 'Open for';
const CONTACT_SUBHEADLINE = 'Fresh graduate yang passionate di web development. Terbuka untuk posisi full-time maupun project freelance.';
const ROTATING_WORDS = ['Opportunities', 'Freelance', 'Projects', 'Collaboration', 'Work'];

export default function Contact({ whatsapp, github, linkedin, email }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [wordIndex, setWordIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailMenuOpen, setEmailMenuOpen] = useState(false);
  const { isRevealed } = useScrollReveal();
  
  const containerRef = useRef(null);
  
  const contactEmail = email || 'contact@radit.dev';
  
  const waNumber = whatsapp || "6281234567890";
  const waLink = `https://wa.me/${waNumber.replace(/\D/g, '')}?text=Halo,%20saya%20tertarik%20untuk%20berdiskusi%20dengan%20Anda.`;

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        // GA4 Conversion Tracking — Success
        sendGAEvent('event', 'contact_form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        // GA4 Conversion Tracking — Error
        sendGAEvent('event', 'contact_form_error', {
          event_category: 'engagement',
          event_label: 'contact_form_failed',
        });
      }
    } catch {
      setStatus('error');
      sendGAEvent('event', 'contact_form_error', {
        event_category: 'engagement',
        event_label: 'contact_form_network_error',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const currentWord = ROTATING_WORDS[wordIndex];

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="min-h-dvh flex items-center py-24 md:py-32 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden border-t border-zinc-800/50"
    >
      {/* Top divider accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full max-w-[500px] h-full max-h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full max-w-[400px] h-full max-h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT SIDE: Headline & CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView={isRevealed ? "visible" : undefined}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-5"
          >
            {/* Headline with Rotating Word */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                {CONTACT_HEADLINE}{' '}
                <span className="relative inline-block min-w-[150px] min-[340px]:min-w-[280px] h-[1.2em] align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-0 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400"
                    >
                      {currentWord}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </motion.div>

            {/* Subheadline with character stagger */}
            <motion.p 
              variants={itemVariants}
              className="text-zinc-400 text-lg md:text-xl leading-relaxed"
            >
              {CONTACT_SUBHEADLINE}
            </motion.p>

            {/* Separator */}
            <motion.div variants={itemVariants} className="w-16 h-px bg-white/10" />

            {/* WhatsApp CTA */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm text-zinc-500 font-medium">Prefer direct chat?</p>
              <a 
                href={waLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/10 hover:border-green-500/30 hover:bg-green-950/30 text-zinc-400 hover:text-green-400 py-4 px-6 rounded-xl transition-all duration-300 group"
              >
                <MessageCircle size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">WhatsApp</span>
              </a>
            </motion.div>

            {/* Separator */}
            <motion.div variants={itemVariants} className="w-16 h-px bg-white/10" />

            {/* Social Links Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-sm text-zinc-500 font-medium">Or connect with me</p>
              
              {/* Social Links - Horizontal: GitHub (left), LinkedIn (right) */}
              <div className="flex gap-4">
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/10 hover:border-white/20 hover:bg-zinc-800/50 text-zinc-400 hover:text-white py-4 px-6 rounded-xl transition-all duration-300 group"
                >
                  <Github size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">GitHub</span>
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/10 hover:border-blue-500/30 hover:bg-blue-950/30 text-zinc-400 hover:text-blue-400 py-4 px-6 rounded-xl transition-all duration-300 group"
                >
                  <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              </div>
            </motion.div>

            {/* Separator */}
            <motion.div variants={itemVariants} className="w-16 h-px bg-white/10" />

            {/* Email Section with Dropdown */}
            <motion.div variants={itemVariants} className="space-y-3 relative">
              <p className="text-sm text-zinc-500 font-medium">Or email me at</p>
              <div className="relative">
                <button
                  onClick={() => setEmailMenuOpen(!emailMenuOpen)}
                  className="w-full flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/10 hover:border-white/20 hover:bg-zinc-800/50 text-zinc-400 hover:text-white py-4 px-6 rounded-xl transition-all duration-300"
                >
                  <Mail size={24} />
                  <span className="font-medium">Email Me</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${emailMenuOpen ? "rotate-180" : ""}`} 
                  />
                </button>

                <AnimatePresence>
                  {emailMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-xl backdrop-blur-md z-50 overflow-hidden"
                    >
                      <div className="p-2 flex gap-2" role="menu">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex flex-col items-center gap-2 rounded-lg p-3 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                          onClick={() => setEmailMenuOpen(false)}
                          aria-label="Send email via Gmail"
                          role="menuitem"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <ExternalLink size={18} aria-hidden="true" />
                          </div>
                          Gmail
                        </a>
                        
                        <a
                          href={`mailto:${contactEmail}`}
                          className="flex-1 flex flex-col items-center gap-2 rounded-lg p-3 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                          onClick={() => setEmailMenuOpen(false)}
                          aria-label="Send email via default app"
                          role="menuitem"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                            <AppWindow size={18} aria-hidden="true" />
                          </div>
                          Default
                        </a>

                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(contactEmail);
                            setEmailCopied(true);
                            setTimeout(() => setEmailCopied(false), 2000);
                          }}
                          className="flex-1 flex flex-col items-center gap-2 rounded-lg p-3 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                          aria-label={emailCopied ? "Email copied to clipboard" : "Copy email address"}
                          role="menuitem"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-400">
                            {emailCopied ? <Check size={18} aria-hidden="true" className="text-green-500" /> : <Copy size={18} aria-hidden="true" />}
                          </div>
                          {emailCopied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Backdrop to close menu */}
                {emailMenuOpen && (
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setEmailMenuOpen(false)}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit} 
              className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden group"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-1">Atau Kirim Pesan</h3>
                <p className="text-sm text-zinc-500 mb-6">Saya akan merespons dalam 24 jam.</p>
              </div>

              <div className="space-y-5 relative z-10">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Nama</label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/70 transition-all duration-300"
                    placeholder="Radit"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/70 transition-all duration-300"
                    placeholder="radit@example.com"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pesan</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-800/70 transition-all duration-300 resize-none"
                    placeholder="Ceritakan tentang hal yang ingin didiskusikan..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className={`relative z-10 w-full font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  status === 'success' 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {status === 'loading' ? 'Mengirim...' : status === 'success' ? '✓ Pesan Terkirim!' : 'Kirim Pesan'}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center animate-pulse relative z-10">
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
