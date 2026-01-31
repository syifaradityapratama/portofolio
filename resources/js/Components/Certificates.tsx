import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { FadeInText } from './TextHighlight';

interface Certificate {
    id: number;
    name: string;
    issuer: string;
    image?: string;
    credential_url?: string;
}

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
    if (!certificates || certificates.length === 0) return null;

    return (
        <section id="certificates" className="bg-white py-24 dark:bg-[#0b1121]">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="mb-2 text-3xl font-bold">
                        <FadeInText text="Certifications" />
                    </h2>
                    <div className="h-1 w-20 rounded-full bg-blue-500" />
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {certificates.map((cert, _) => {
                        const CardContent = (
                            <>
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                                    {cert.image ? (
                                        <img
                                            src={cert.image.startsWith('http') || cert.image.startsWith('/') ? cert.image : `/${cert.image}`}
                                            alt={cert.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Award
                                            className="text-slate-400 dark:text-slate-500"
                                            size={32}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className="leading-tight font-bold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200">
                                        {cert.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">{cert.issuer}</p>
                                    {cert.credential_url && (
                                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                                            Verify <ExternalLink size={12} />
                                        </div>
                                    )}
                                </div>
                            </>
                        );

                        return cert.credential_url ? (
                            <motion.a
                                key={cert.id}
                                href={cert.credential_url}
                                target="_blank"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    show: {
                                        opacity: 1,
                                        scale: 1,
                                        transition: { type: 'spring', stiffness: 100 },
                                    },
                                }}
                                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-800/50"
                            >
                                {CardContent}
                            </motion.a>
                        ) : (
                            <motion.div
                                key={cert.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    show: {
                                        opacity: 1,
                                        scale: 1,
                                        transition: { type: 'spring', stiffness: 100 },
                                    },
                                }}
                                className="flex items-start gap-4 rounded-2xl border border-transparent bg-white p-4 dark:bg-transparent"
                            >
                                {CardContent}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
