import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Users } from 'lucide-react';
import { FadeInText } from './TextHighlight';

interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
}

interface Experiences {
    [key: string]: ExperienceItem[];
}

export default function Experience({ experiences }: { experiences: Experiences }) {
    const categories = [
        { id: 'work', label: 'Work', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'organization', label: 'Organization', icon: Users },
    ];

    const [activeTab, setActiveTab] = useState('work');

    if (!experiences) return null;

    // Filter out empty categories
    const visibleCategories = categories.filter(
        (cat) => experiences[cat.id] && experiences[cat.id].length > 0
    );

    // If current active tab is empty, switch to first available
    if (!experiences[activeTab] && visibleCategories.length > 0) {
        setActiveTab(visibleCategories[0].id);
    }

    // If no experiences at all
    if (visibleCategories.length === 0) return null;

    return (
        <section id="experience" className="bg-white py-24 dark:bg-[#0b1121]">
            <div className="container mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="mb-2 text-3xl font-bold">
                        <FadeInText text="Experience & Education" />
                    </h2>
                    <div className="h-1 w-20 rounded-full bg-blue-500" />
                </motion.div>

                {/* Tabs */}
                <div className="mb-12 flex flex-wrap gap-4">
                    {visibleCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                                activeTab === cat.id
                                    ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
                            }`}
                        >
                            <cat.icon size={18} />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {experiences[activeTab]?.map((item, idx: number) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative border-l-2 border-slate-200 pl-8 dark:border-slate-800"
                                >
                                    <div
                                        className={`absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 border-white transition-colors dark:border-[#0b1121] ${
                                            activeTab === 'work'
                                                ? 'bg-blue-500'
                                                : activeTab === 'education'
                                                  ? 'bg-green-500'
                                                  : 'bg-purple-500'
                                        }`}
                                    />

                                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-colors hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800">
                                        <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h3>
                                            <span className="mt-2 w-fit rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 md:mt-0 dark:bg-slate-700 dark:text-slate-300">
                                                {item.period}
                                            </span>
                                        </div>
                                        <div className="mb-4 font-medium text-blue-600 dark:text-blue-400">
                                            {item.company}
                                        </div>
                                        <div
                                            className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
