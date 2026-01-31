import { motion } from 'framer-motion';
import Hero3D from './3D/Hero3D';
import { ArrowRight, Download } from 'lucide-react';
import { FadeInText } from './TextHighlight';
import { LetterHover } from './InteractiveText';
interface HeroProps {
    about: {
        name?: string;
        role?: string;
        short_desc: string;
        is_open_to_work?: boolean;
        resume?: string;
        [key: string]: unknown;
    };
}

export default function Hero({ about }: HeroProps) {
    return (
        <section
            id="about"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <Hero3D />

            {/* Light Mode Gradient Orbs */}
            <div className="animate-blob pointer-events-none absolute top-20 left-20 h-72 w-72 rounded-full bg-purple-300 opacity-30 mix-blend-multiply blur-3xl filter dark:opacity-0" />
            <div className="animate-blob animation-delay-2000 pointer-events-none absolute top-20 right-20 h-72 w-72 rounded-full bg-yellow-300 opacity-30 mix-blend-multiply blur-3xl filter dark:opacity-0" />
            <div className="animate-blob animation-delay-4000 pointer-events-none absolute -bottom-8 left-1/2 h-72 w-72 rounded-full bg-pink-300 opacity-30 mix-blend-multiply blur-3xl filter dark:opacity-0" />

            <div className="relative z-10 container px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center space-y-8"
                >
                    {about.is_open_to_work && (
                        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                            Open to Work
                        </div>
                    )}

                    <h1 className="mx-auto max-w-4xl cursor-default text-4xl leading-tight font-bold text-slate-900 sm:text-5xl md:text-7xl dark:text-white">
                        <LetterHover text={about.name || 'Syifa Raditya Pratama'} /> <br />
                        <span className="mt-2 block text-indigo-500">
                            <LetterHover text={about.role || 'Developer'} />
                        </span>
                    </h1>

                    <div className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
                        <FadeInText text={about.short_desc} />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            href="#projects"
                            className="group flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-700"
                        >
                            View Work
                            <ArrowRight
                                size={20}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </motion.a>

                        {about.resume && (
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                href={about.resume}
                                target="_blank"
                                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-slate-800"
                            >
                                Download CV
                                <Download size={20} />
                            </motion.a>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
