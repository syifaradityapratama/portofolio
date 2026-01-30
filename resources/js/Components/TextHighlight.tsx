import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function TextHighlight({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <motion.span 
            className={`relative inline-block px-1 cursor-default ${className}`}
            whileHover="hover"
            initial="initial"
        >
            <motion.span 
                variants={{
                    initial: { width: "0%" },
                    hover: { width: "100%" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 bg-yellow-200/50 dark:bg-yellow-500/30 -skew-x-12 -z-10 rounded-sm"
            />
            <span className="relative z-10">{children}</span>
        </motion.span>
    );
}

export function FadeInText({ text, className = "" }: { text: string, className?: string }) {
    const words = text.split(" ");
    
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="inline-block mr-1"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}
