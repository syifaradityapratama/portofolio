import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
    project: {
        title: string;
        slug: string;
        thumbnail?: string;
        short_description?: string;
        category?: { name: string };
        [key: string]: unknown;
    };
}

export default function ProjectCard({ project }: ProjectProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={route('projects.show', project.slug)}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="relative block h-[400px] w-full cursor-none overflow-hidden rounded-3xl border border-slate-200 bg-white md:h-[450px] dark:border-slate-700 dark:bg-slate-800"
        >
            <div
                style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}
                className="absolute inset-4 overflow-hidden rounded-2xl shadow-2xl md:inset-6"
            >
                <img
                    src={
                        project.thumbnail
                            ? project.thumbnail.startsWith('http')
                                ? project.thumbnail
                                : `${project.thumbnail}`
                            : '/images/placeholder.jpg'
                    }
                    alt={project.title}
                    className="h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            </div>

            <div
                style={{ transform: 'translateZ(100px)' }}
                className="absolute right-10 bottom-10 left-10 z-20"
            >
                <div className="mb-3 flex items-center gap-2">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-full border border-blue-500/30 bg-blue-900/50 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-md"
                    >
                        {project.category?.name || 'Development'}
                    </motion.span>
                </div>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2 text-3xl leading-tight font-bold text-white drop-shadow-lg"
                >
                    {project.title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 line-clamp-2 max-w-[90%] text-sm text-slate-300"
                >
                    {project.short_description}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group flex items-center text-sm font-bold text-white"
                >
                    View Case Study{' '}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.div>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
                }}
            />
        </motion.a>
    );
}

// Needed to avoid TS errors for route() which is global in Inertia/Laravel
declare global {
    var route: (name: string, params?: unknown) => string;
}
