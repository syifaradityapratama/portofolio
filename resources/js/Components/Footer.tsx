import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
    about: {
        name?: string;
        email?: string;
        github?: string;
        linkedin?: string;
        [key: string]: unknown;
    };
}

export default function Footer({ about }: FooterProps) {
    const socials = [
        { icon: Github, href: about?.github || '#', label: 'GitHub' },
        { icon: Linkedin, href: about?.linkedin || '#', label: 'LinkedIn' },
        { icon: Mail, href: `mailto:${about?.email || ''}`, label: 'Email' },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-[#0b1121]"
        >
            <div className="container mx-auto px-6 text-center">
                <div className="mb-8 flex justify-center gap-6">
                    {socials.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="rounded-full bg-slate-50 p-3 text-slate-500 shadow-xs transition-colors hover:text-blue-600 hover:shadow-md dark:bg-slate-900 dark:hover:text-blue-400"
                        >
                            <social.icon size={20} />
                        </motion.a>
                    ))}
                </div>

                <p className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    © 2026 {about?.name}. Made with{' '}
                    <Heart size={14} className="animate-pulse fill-red-500 text-red-500" /> using
                    Laravel & React.
                </p>
            </div>
        </motion.footer>
    );
}
