import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { FadeInText } from './TextHighlight';

interface Category {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    category_id: number;
    // Add other fields as necessary based on ProjectCard usage
    [key: string]: unknown; // Allow loose typing for other props passed to ProjectCard for now
}

export default function Projects({
    projects,
    categories,
}: {
    projects: Project[];
    categories?: Category[];
}) {
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

    if (!projects || projects.length === 0) return null;

    const filteredProjects =
        activeCategory === 'all'
            ? projects
            : projects.filter((p) => p.category_id === activeCategory);

    return (
        <section
            id="projects"
            className="relative overflow-hidden bg-slate-50 py-32 dark:bg-slate-900/50"
        >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-slate-300 to-transparent opacity-50 dark:via-slate-700" />

            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:mb-16 md:text-left"
                >
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                <FadeInText text="Featured Work" />
                            </h2>
                            <p className="max-w-2xl text-lg text-slate-500 dark:text-slate-400">
                                <FadeInText text="A selection of projects where design meets robust engineering." />
                            </p>
                        </div>

                        {/* Category Filter */}
                        {categories && categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                        activeCategory === 'all'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                            activeCategory === cat.id
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div layout className="grid gap-10 md:grid-cols-2 md:gap-16 lg:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center text-slate-500">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
