// Core Data Types for Portfolio

export interface Profile {
    name: string;
    role: string;
    bio: string;
    email: string;
    linkedin?: string;
    github?: string;
    whatsapp?: string;
    instagram?: string;
    is_open_to_work: boolean;
    image?: string;
    logo?: string;
    resume?: string;
    google_analytics_id?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    color?: string;
}

export interface TechStack {
    id: number;
    name: string;
    image?: string;
    url?: string;
}

export interface Project {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    thumbnail?: string;
    short_description: string;
    content?: string;
    gallery?: string[];
    tech_stack?: string[];
    live_link?: string;
    github_link?: string;
    is_featured: boolean;
    category?: Category;
    techStacks?: TechStack[];
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    title: string;
    icon?: string;
    description: string;
    is_active: boolean;
}

export interface Experience {
    id: number;
    type: 'work' | 'education';
    title: string;
    company: string;
    period: string;
    description?: string;
    sort_order: number;
}

export interface Certificate {
    id: number;
    name: string;
    issuer: string;
    issued_at: string;
    credential_url?: string;
    image?: string;
    is_featured: boolean;
    sort_order: number;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

// Shared Props from HandleInertiaRequests middleware
export interface SharedProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    about: Profile;
    techStacks: TechStack[];
    services: Service[];
    projects: Project[];
    certificates: Certificate[];
    experiences: Experience[];
}

// Page-specific props
export interface WelcomePageProps extends SharedProps {
    categories: Category[];
}

export interface ProjectShowPageProps extends SharedProps {
    project: Project;
}
