import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeInText } from './TextHighlight';

const DynamicIcon = ({ name }: { name: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <LucideIcons.HelpCircle className="h-full w-full" />;
    return <IconComponent className="h-full w-full" />;
};

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export default function Services({ services }: { services: Service[] }) {
    if (!services || services.length === 0) return null;

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-slate-50 py-32 dark:bg-[#0f172a]"
        >
            {/* Ambient Background Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[100px]"
            />
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold">
                        <FadeInText text="Services" />
                    </h2>
                    <p className="mx-auto max-w-xl text-slate-500 dark:text-slate-400">
                        <FadeInText text="High-quality solutions tailored to your specific needs." />
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, _) => (
                        <motion.div
                            key={service.id}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                show: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { type: 'spring', stiffness: 50 },
                                },
                            }}
                            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl transition-colors group-hover:bg-blue-500/10" />

                            <motion.div
                                whileHover={{
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    scale: 1.1,
                                    transition: { duration: 0.5 },
                                }}
                                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            >
                                {/* Render Lucide Icon */}
                                <div className="h-8 w-8">
                                    <DynamicIcon name={service.icon} />
                                </div>
                            </motion.div>

                            <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {service.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
