import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Smartphone } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { FadeInText } from './TextHighlight';

interface AboutProps {
    email: string;
    phone?: string;
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    [key: string]: unknown;
}

export default function Contact({ about }: { about: AboutProps }) {
    interface ContactForm {
        name: string;
        email: string;
        message: string;
    }

    const { data, setData, post, processing, recentlySuccessful, errors, reset } =
        useForm<ContactForm>({
            name: '',
            email: '',
            message: '',
        });

    // Reset form on success
    // Custom success state for longer visibility
    const [showSuccess, setShowSuccess] = import('react').then((r) => r.useState(false));

    useEffect(() => {
        if (recentlySuccessful) {
            // @ts-ignore
            setShowSuccess(true);
            const timer = setTimeout(() => {
                // @ts-ignore
                setShowSuccess(false);
                reset();
            }, 5000); // 5 seconds visibility
            return () => clearTimeout(timer);
        }
    }, [recentlySuccessful, reset]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.send'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-slate-50 py-24 dark:bg-[#0f1117]"
        >
            {/* Background Elements */}
            <div className="pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl md:flex-row dark:border-slate-800 dark:bg-slate-900"
                >
                    {/* Left: Contact Info & CTA */}
                    <div className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white md:w-2/5 md:p-12 dark:bg-slate-950">
                        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-500/20 blur-[60px]" />

                        <div>
                            <h2 className="mb-4 text-3xl leading-tight font-bold">
                                <FadeInText text="Let's build something future-proof." />
                            </h2>
                            <p className="mb-8 leading-relaxed text-slate-400">
                                <FadeInText text="Whether you have a groundbreaking idea or need to scale an existing platform, I'm here to help you achieve your goals." />
                            </p>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="mb-2 text-sm font-semibold tracking-wider text-slate-500 uppercase">
                                    Socials
                                </h3>
                                <div className="flex gap-4">
                                    {/* Social Icons could go here if needed, keeping it clean for now */}
                                </div>
                            </div>

                            {about?.whatsapp ? (
                                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                                    <p className="mb-4 text-sm text-slate-300">
                                        Need a faster response?
                                    </p>
                                    <a
                                        href={`https://wa.me/${about.whatsapp}`}
                                        target="_blank"
                                        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-4 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                    >
                                        <Smartphone size={20} className="group-hover:shake" />
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="relative bg-white p-10 md:w-3/5 md:p-12 dark:bg-slate-900">
                        {/* Success Notification */}
                        <AnimatePresence>
                            {/* @ts-ignore */}
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -20, height: 0 }}
                                    className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
                                >
                                    <CheckCircle size={20} />
                                    <div>
                                        <p className="font-bold">Message Sent!</p>
                                        <p className="text-xs opacity-80">
                                            I'll get back to you shortly.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    <FadeInText text="Send me a message" />
                                </h3>
                                <p className="text-sm text-slate-500">
                                    <FadeInText text="Fill out the form below and I'll reply via email." />
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="group relative">
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 placeholder-transparent transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                                        placeholder="John Doe"
                                        required
                                        aria-required="true"
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute top-4 left-4 cursor-text text-sm text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs peer-focus:text-indigo-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs dark:peer-focus:bg-slate-900 dark:peer-[:not(:placeholder-shown)]:bg-slate-900"
                                    >
                                        Name
                                    </label>
                                    {errors.name && (
                                        <p className="absolute mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="group relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 placeholder-transparent transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                                        placeholder="john@example.com"
                                        required
                                        aria-required="true"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute top-4 left-4 cursor-text text-sm text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs peer-focus:text-indigo-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs dark:peer-focus:bg-slate-900 dark:peer-[:not(:placeholder-shown)]:bg-slate-900"
                                    >
                                        Email
                                    </label>
                                    {errors.email && (
                                        <p className="absolute mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="group relative">
                                <textarea
                                    rows={4}
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="peer w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 placeholder-transparent transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                                    placeholder="Tell me about your project..."
                                    required
                                    aria-required="true"
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                />
                                <label
                                    htmlFor="message"
                                    className="absolute top-4 left-4 cursor-text text-sm text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs peer-focus:text-indigo-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs dark:peer-focus:bg-slate-900 dark:peer-[:not(:placeholder-shown)]:bg-slate-900"
                                >
                                    Message
                                </label>
                                {errors.message && (
                                    <p className="absolute mt-1 text-xs text-red-500">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex w-full transform items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-indigo-600 hover:shadow-indigo-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                            >
                                <span>{processing ? 'Sending...' : 'Send Message'}</span>
                                {!processing && (
                                    <motion.div
                                        initial={{ x: 0, y: 0 }}
                                        animate={{ x: 0, y: 0 }}
                                        whileHover={{ x: 5, y: -5, rotate: -45 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Send size={18} />
                                    </motion.div>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
