import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Lanyard from './Lanyard';
import TextHighlight from './TextHighlight';
import { WordHover, LetterHover } from './InteractiveText';

interface AboutData {
    image?: string;
    desc: string;
    linkedin?: string;
    github?: string;
}

interface TechStack {
    name: string;
    image?: string;
    url?: string;
}

export default function About({
    about,
    techStacks,
}: {
    about: AboutData;
    techStacks: TechStack[];
}) {
    // Duplicate stacks for infinite loop seamlessly
    const marqueeVariant = {
        animate: {
            x: [0, -1035],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop' as const,
                    duration: 20,
                    ease: 'linear' as const,
                },
            },
        },
    };

    return (
        <section
            id="about-details"
            className="relative overflow-hidden bg-white py-24 dark:bg-[#0b1121]"
        >
            {/* Background Blobs */}
            <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="relative z-10 container mx-auto max-w-6xl px-6">
                <div className="mb-24 grid items-center gap-16 md:grid-cols-2">
                    {/* Image / Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative flex h-[600px] items-center justify-center"
                    >
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/5 blur-[100px]" />
                        <Lanyard
                            image={about.image ? `/${about.image}` : '/images/profile.png'}
                            className="z-10"
                        />
                    </motion.div>

                    <motion.div className="space-y-6">
                        <h2 className="mb-6 text-4xl font-bold">
                            <LetterHover
                                text="About Me"
                                className="cursor-default"
                                hoverColor="text-indigo-500"
                            />
                        </h2>

                        <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                            <p>
                                <WordHover text={about.desc} />
                            </p>
                            <p>
                                I specialize in building{' '}
                                <TextHighlight>robust applications</TextHighlight> using modern
                                technologies. Whether it's a{' '}
                                <TextHighlight>complex backend system</TextHighlight> or a{' '}
                                <TextHighlight>highly interactive frontend</TextHighlight>, I love
                                solving problems through{' '}
                                <TextHighlight className="font-bold text-indigo-500">
                                    code
                                </TextHighlight>
                                .
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {about.linkedin && (
                                <a
                                    href={about.linkedin}
                                    target="_blank"
                                    className="flex items-center gap-2 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    LinkedIn <ExternalLink size={18} />
                                </a>
                            )}
                            {about.github && (
                                <a
                                    href={about.github}
                                    target="_blank"
                                    className="flex items-center gap-2 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    GitHub <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Tech Stack Marquee */}
                <div className="relative">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                            <p className="text-sm font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                                <LetterHover text="Technologies I Use" hoverColor="text-blue-500" />
                            </p>
                        </p>
                    </div>

                    <div className="mask-linear-fade relative w-full overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 z-10 w-20 bg-linear-to-r from-white to-transparent dark:from-[#0b1121]" />
                        <div className="absolute top-0 right-0 bottom-0 z-10 w-20 bg-linear-to-l from-white to-transparent dark:from-[#0b1121]" />

                        <div className="flex overflow-hidden">
                            <motion.div
                                className="flex flex-nowrap items-center gap-12"
                                variants={marqueeVariant}
                                animate="animate"
                            >
                                {[...techStacks, ...techStacks, ...techStacks].map((stack, i) => (
                                    <div
                                        key={i}
                                        className="group flex min-w-[80px] flex-col items-center gap-2"
                                    >
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 p-3 shadow-sm grayscale transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:grayscale-0 dark:bg-slate-800 dark:group-hover:bg-slate-700">
                                            {/* Support external URLs or local storage */}
                                            {stack.image ? (
                                                <img
                                                    src={
                                                        stack.image.startsWith('http')
                                                            ? stack.image
                                                            : `/storage/${stack.image}`
                                                    }
                                                    alt={stack.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : stack.url ? (
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${stack.url}&sz=128`}
                                                    alt={stack.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <span className="text-xl font-bold text-slate-400">
                                                    {stack.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                            {stack.name}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
