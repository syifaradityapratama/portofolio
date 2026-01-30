import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function LetterHover({
    text,
    className = '',
    hoverColor = '#6366f1',
}: {
    text: string;
    className?: string;
    hoverColor?: string;
}) {
    const safeText: string = text || '';
    const words: string[] = safeText.split(' ');

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word: string, wordIndex: number) => (
                <span key={wordIndex} className="mr-2 inline-block whitespace-nowrap">
                    {word.split('').map((letter: string, i: number) => (
                        <motion.span
                            key={i}
                            className="relative inline-block transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                                delay: (wordIndex * 5 + i) * 0.05, // Staggered entrance
                            }}
                            whileHover={{
                                scale: 1.2,
                                rotate: Math.random() * 20 - 10,
                                y: -5,
                                color: hoverColor,
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );
}

export function WordHover({ text, className = '' }: { text: string; className?: string }) {
    const safeText = text || '';
    const words = safeText.split(' ');

    return (
        <span className={`${className} block`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="mr-1.5 inline-block cursor-default transition-all duration-200 hover:scale-105 hover:font-bold hover:text-slate-800 dark:hover:text-slate-200"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

export function MagnetButton({
    children,
    className = '',
    onClick,
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    return (
        <motion.button
            className={className}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            {children}
        </motion.button>
    );
}
