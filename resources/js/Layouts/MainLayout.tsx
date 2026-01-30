import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import ScrollProgress from '@/Components/ScrollProgress';
import BackToTop from '@/Components/BackToTop';
import CustomCursor from '@/Components/CustomCursor';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
    const { url, props } = usePage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const about = (props as any).about;

    useEffect(() => {
        if (about?.logo) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = `/storage/${about.logo}`;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = `/storage/${about.logo}`;
                document.head.appendChild(newLink);
            }
        }
    }, [about]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-slate-100">
            <ScrollProgress />
            <CustomCursor />

            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>

            <Footer about={about} />
            <BackToTop />
        </div>
    );
}
