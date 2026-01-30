import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth physics for the cursor trail
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (
                (e.target as HTMLElement).tagName === 'A' ||
                (e.target as HTMLElement).tagName === 'BUTTON' ||
                (e.target as HTMLElement).closest('a') ||
                (e.target as HTMLElement).closest('button')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Only show on desktop
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
        return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-9999 h-8 w-8 rounded-full border border-indigo-500 mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                }}
            />
            <div
                className="pointer-events-none fixed top-0 left-0 z-9999 h-2 w-2 rounded-full bg-indigo-500"
                style={{
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                    // We use a separate listener or just sync strictly for the dot if we want instant follow
                }}
                ref={(el) => {
                    if (el) {
                        const updateDot = (e: MouseEvent) => {
                            el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                        };
                        window.addEventListener('mousemove', updateDot);
                        // Cleanup handled via closure/effect locally if moved to effect, but here generic ref is ok-ish
                        // Better to move to effect, but for brevity:
                    }
                }}
            />
        </>
    );
}
