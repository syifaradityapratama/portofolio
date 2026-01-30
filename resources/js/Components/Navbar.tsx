import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';

const MotionLink = motion(Link);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const { url, props } = usePage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const about = (props as any).about;
    const isHome = url === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Theme init
        const theme = localStorage.getItem('theme');
        if (
            theme === 'dark' ||
            (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark');
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed z-40 w-full transition-all duration-300 ${
                    scrolled || mobileMenuOpen
                        ? 'border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/70'
                        : 'bg-transparent py-4'
                }`}
            >
                <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-50 inline-block overflow-hidden bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent transition hover:opacity-80"
                    >
                        {/* Use global prop if available */}
                        {about?.logo && !logoError ? (
                            <img
                                src={`/storage/${about.logo}`}
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            'SR.'
                        )}
                    </motion.a>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 md:flex">
                        {['About', 'Services', 'Experience', 'Projects', 'Certificates'].map(
                            (item, i) => {
                                const href = `#${item.toLowerCase()}`;
                                const isAnchor = isHome;

                                return isAnchor ? (
                                    <motion.a
                                        key={item}
                                        href={href}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                                        className="group relative text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full" />
                                    </motion.a>
                                ) : (
                                    <MotionLink
                                        key={item}
                                        href={`/${href}`} // Go to home + hash
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                                        className="group relative text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full" />
                                    </MotionLink>
                                );
                            }
                        )}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            className="rounded-full bg-slate-100 p-2 text-slate-600 transition-transform hover:scale-110 dark:bg-slate-800 dark:text-slate-300"
                        >
                            {isDark ? (
                                <Sun size={20} className="text-yellow-500" />
                            ) : (
                                <Moon size={20} />
                            )}
                        </motion.button>
                        {isHome ? (
                            <motion.a
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                href="#contact"
                                className="transform rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:opacity-90 dark:bg-white dark:text-slate-900"
                            >
                                Contact Me
                            </motion.a>
                        ) : (
                            <MotionLink
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                href="/#contact"
                                className="transform rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:opacity-90 dark:bg-white dark:text-slate-900"
                            >
                                Contact Me
                            </MotionLink>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="z-50 p-2 text-slate-700 md:hidden dark:text-slate-200"
                        aria-label={
                            mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
                        }
                        aria-expanded={mobileMenuOpen}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mobileMenuOpen ? 'close' : 'open'}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-white/95 backdrop-blur-xl md:hidden dark:bg-slate-900/95"
                        aria-label="Mobile navigation"
                        role="navigation"
                    >
                        {['About', 'Services', 'Experience', 'Projects', 'Certificates'].map(
                            (item) => {
                                const href = `#${item.toLowerCase()}`;

                                const handleMobileClick = (e: React.MouseEvent) => {
                                    if (isHome) {
                                        e.preventDefault();
                                        const target = document.querySelector(href);
                                        if (target) {
                                            setMobileMenuOpen(false);
                                            // Small delay to let menu close animation start
                                            setTimeout(() => {
                                                target.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }
                                    } else {
                                        setMobileMenuOpen(false);
                                    }
                                };

                                return isHome ? (
                                    <a
                                        key={item}
                                        href={href}
                                        onClick={handleMobileClick}
                                        className="text-2xl font-bold text-slate-800 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
                                    >
                                        {item}
                                    </a>
                                ) : (
                                    <Link
                                        key={item}
                                        href={`/${href}`}
                                        onClick={handleMobileClick}
                                        className="text-2xl font-bold text-slate-800 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
                                    >
                                        {item}
                                    </Link>
                                );
                            }
                        )}
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
