import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import About from '@/Components/About';
import Services from '@/Components/Services';
import Projects from '@/Components/Projects';
import Certificates from '@/Components/Certificates';
import Contact from '@/Components/Contact';
import MainLayout from '@/Layouts/MainLayout';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Experience from '@/Components/Experience';

interface WelcomeProps {
    about: {
        name: string;
        role: string;
        image?: string;
        short_desc: string;
        long_desc: string;
        linkedin?: string;
        github?: string;
        logo?: string;
        whatsapp?: string;
        instagram?: string;
        email: string;
    };
    techStacks: Array<{
        name: string;
        image?: string;
        url?: string;
    }>;
    services: Array<{ id: number; title: string; description: string; icon: string }>;
    experiences: {
        [key: string]: Array<{
            id: number;
            company: string;
            title: string;
            period: string;
            description: string;
            type: string;
        }>;
    };
    projects: Array<{
        id: number;
        title: string;
        slug: string;
        thumbnail: string;
        category_id: number;
        [key: string]: unknown;
    }>;
    categories: Array<{ id: number; name: string }>;
    certificates: Array<{
        id: number;
        name: string;
        issuer: string;
        image?: string;
        credential_url?: string;
    }>;
}

export default function Welcome(props: WelcomeProps) {
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Slight delay to ensure DOM is ready
        }
    }, []);

    return (
        <LazyMotion features={domAnimation}>
            <Head title="Portfolio" />

            {/* Navbar and Footer are now in MainLayout for persistent transition */}
            <Hero about={props.about} />
            <About about={props.about} techStacks={props.techStacks} />
            <Services services={props.services} />
            <Experience experiences={props.experiences} />
            <Projects projects={props.projects} categories={props.categories} />
            <Certificates certificates={props.certificates} />
            <Contact about={props.about} />
        </LazyMotion>
    );
}

Welcome.layout = (page: React.ReactNode) => <MainLayout children={page} />;
