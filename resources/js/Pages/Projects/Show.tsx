import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

import MainLayout from '@/Layouts/MainLayout';

interface Project {
    title: string;
    slug: string;
    thumbnail: string;
    content: string;
    category?: { name: string };
    tech_stacks?: Array<{ id: number; name: string; image?: string; url?: string }>;
    gallery?: string[];
    github_link?: string;
    live_link?: string;
}

export default function Show({ project }: { project: Project }) {
    const getImageUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/')) return path;
        return `/${path}`;
    };

    return (
        <>
            <Head title={`${project.title} - Portfolio`} />

            <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <Link
                        href={route('home')}
                        className="mb-6 inline-flex items-center gap-2 text-slate-500 transition hover:text-blue-500"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <div className="mb-4 flex justify-center">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {project.category?.name}
                        </span>
                    </div>

                    <h1 className="mb-6 bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl dark:from-white dark:to-slate-400">
                        {project.title}
                    </h1>

                    <div className="mb-8 flex flex-wrap justify-center gap-3">
                        {project.tech_stacks?.map((tech) => (
                            <span
                                key={tech.id}
                                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            >
                                {tech.image ? (
                                    <img
                                        src={getImageUrl(tech.image)}
                                        alt={tech.name}
                                        className="h-4 w-4 object-contain"
                                    />
                                ) : tech.url ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${tech.url}&sz=32`}
                                        alt={tech.name}
                                        className="h-4 w-4 object-contain"
                                    />
                                ) : null}
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-12 overflow-hidden rounded-3xl border border-slate-200 shadow-2xl dark:border-slate-700"
                >
                    <img
                        src={getImageUrl(project.thumbnail)}
                        alt={project.title}
                        className="w-full object-cover"
                    />
                </motion.div>

                {/* Description - Moved Above Gallery */}
                <div
                    className="prose prose-lg dark:prose-invert mx-auto mb-12 max-w-none rounded-3xl border border-slate-100 bg-white p-8 text-slate-600 shadow-sm md:p-12 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {/* Gallery Grid - Improved Layout */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mb-12">
                        <h3 className="mb-6 border-l-4 border-blue-500 pl-4 text-2xl font-bold">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {project.gallery.map((image: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:border-slate-700"
                                >
                                    <img
                                        src={getImageUrl(image)}
                                        alt="Gallery Image"
                                        className="h-48 w-full object-cover md:h-64"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 flex flex-col justify-center gap-4 pt-8 md:flex-row">
                    {project.github_link && (
                        <a
                            href={project.github_link}
                            target="_blank"
                            className="flex transform items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:opacity-90 dark:bg-white dark:text-slate-900"
                        >
                            <Github size={20} />
                            View on GitHub
                        </a>
                    )}

                    {project.live_link && (
                        <a
                            href={project.live_link}
                            target="_blank"
                            className="flex transform items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/30 transition hover:-translate-y-1 hover:bg-blue-700"
                        >
                            <ExternalLink size={20} />
                            Visit Website
                        </a>
                    )}
                </div>
            </main>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
