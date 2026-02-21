import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableTextBlock } from "sanity";
import { getLogoUrl } from "@/lib/utils";
import BrandIcon from "@/components/BrandIcon";
import ScrollToTop from "@/components/ScrollToTop";

// Disable cache for real-time updates from Sanity
export const revalidate = 0;

interface Project {
  title: string;
  description: string;
  mainImage: SanityImageSource;
  demoLink?: string;
  repoLink?: string;
  content: PortableTextBlock[];
  techStack: {
    _id: string;
    name: string;
    iconUrl: string;
  }[];
}

async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      mainImage,
      demoLink,
      repoLink,
      content,
      "techStack": techStack[]->{
        _id,
        name,
        websiteUrl,
        "iconUrl": icon.asset->url
      }
    }`,
    { slug }
  );
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full h-[400px] my-10 flex justify-center">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Project Image"}
            fill
            className="rounded-xl object-contain bg-zinc-900/50"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
    normal: ({ children }) => <p className="text-zinc-400 leading-relaxed mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 text-zinc-400">{children}</ul>,
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black pt-4 md:pt-8 pb-24">
      <ScrollToTop />

      {/* Back to Projects — always visible, above hero */}
      <div className="container mx-auto px-6 mb-4">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={urlFor(project.mainImage).width(1920).url()}
          alt={project.title}
          fill
          priority
          className="object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        
        <div className="container relative mx-auto h-full px-6 flex flex-col justify-end py-10 md:pb-12">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tighter">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base md:text-xl text-zinc-300 leading-relaxed font-medium">
            {project.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Body */}
          <div className="lg:col-span-2">
            {/* Tech Stack Bar */}
            <div className="mb-12 flex flex-wrap gap-4 items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mr-2">Built with</span>
              {project.techStack?.map((skill: { _id: string; name: string; iconUrl?: string; websiteUrl?: string }) => {
                const logoUrl = getLogoUrl(skill);
                
                return (
                  <div key={skill._id} className="group relative flex items-center justify-center h-10 w-10 bg-zinc-900 rounded-lg border border-white/5 hover:border-blue-500/50 transition-all">
                    <BrandIcon 
                      name={skill.name} 
                      iconUrl={logoUrl} 
                      size={20} 
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {skill.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <article className="prose prose-invert max-w-none prose-zinc lg:prose-xl">
              <PortableText value={project.content} components={ptComponents} />
            </article>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                  Project Links
                </h3>
                
                <div className="flex flex-col gap-4">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                    >
                      View Live Demo <ExternalLink size={18} />
                    </a>
                  )}

                  {project.repoLink && (
                    <a 
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
                    >
                      Source Code <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom back link — visible after reading content */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
          <Link 
            href="/#projects" 
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group text-lg"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
