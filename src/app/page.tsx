import Image from "next/image";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import ProjectList from "@/components/ProjectList";
import ContactForm from "@/components/ContactForm";
import { prisma, safe } from "@/lib/prisma";
import { DEFAULT_PROJECTS, ProjectItem } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dbProjects = await safe(() => prisma.project.findMany({ where: { published: true }, orderBy: { year: "desc" } }), []);
  const projects: ProjectItem[] = (dbProjects.length ? dbProjects : DEFAULT_PROJECTS) as ProjectItem[];

  return (
    <main className="bg-white text-navy selection:bg-brandOrange/20 selection:text-brandOrange overflow-x-hidden">
      <Hero />

      {/* Infinite Animated Tech Stack & Languages Marquee with Smooth Reveal */}
      <div className="reveal-on-scroll">
        <TechMarquee />
      </div>

      {/* Selected Work Section */}
      <section id="work" className="relative max-w-7xl mx-auto px-6 py-28 md:px-12">
        {/* Subtle Ambient Decorative Bubble Accent in Background */}
        <div
          className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-radial from-brandOrange/10 via-brandSlate/5 to-transparent blur-2xl animate-ambient-float"
          aria-hidden
        />

        <div className="reveal-on-scroll flex items-baseline justify-between mb-12 border-b border-navy/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brandOrange">
              Portfolio &amp; Experience
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-navy mt-1">
              Selected Work<span className="text-brandOrange">.</span>
            </h2>
          </div>
          <span className="text-xs uppercase tracking-wider text-navy/60 font-semibold hidden sm:inline-block">
            Company &amp; Personal Systems
          </span>
        </div>
        <ProjectList projects={projects} />
      </section>

      {/* About Section */}
      <section id="about" className="relative max-w-7xl mx-auto px-6 py-28 md:px-12 grid gap-12 md:grid-cols-12 items-center">
        {/* Subtle Ambient Floating Bubble Accent */}
        <div
          className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-radial from-brandSlate/15 via-brandOrange/5 to-transparent blur-2xl animate-ambient-float"
          aria-hidden
        />

        {/* Left Column: Photo with Smooth Slide-in from Left */}
        <div className="reveal-left md:col-span-5">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-navy/5 shadow-xl ring-1 ring-navy/10 group">
            <Image
              src="/myphoto.jpeg"
              alt="Augustine Munguti"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-signature text-2xl block text-white/95">Augustine Munguti</span>
              <span className="text-xs tracking-wider text-white/80 uppercase font-medium">Software Engineer</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio with Smooth Slide-in from Right */}
        <div className="reveal-right md:col-span-7 space-y-6">
          <div className="inline-block rounded-full bg-brandOrange/10 px-3.5 py-1 text-xs font-semibold text-brandOrange tracking-wide uppercase">
            About Me
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-navy">
            I build websites and webapps that stay fast, thoughtful, and simple.
          </h2>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed">
            I am an Information Technology student at Karatina University with hands-on experience in web development, technical support, networking, and computer maintenance. I am passionate about solving real-world problems through technology and building user-centered digital solutions while continuously growing my skills as a software developer.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="reveal-scale delay-75 inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-4 py-2 text-xs font-semibold text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-brandOrange" />
              Full-Stack System Engineering
            </span>
            <span className="reveal-scale delay-150 inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-4 py-2 text-xs font-semibold text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-brandOrange" />
              Scalable Database Design
            </span>
            <span className="reveal-scale delay-225 inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-4 py-2 text-xs font-semibold text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-brandOrange" />
              Kenya &amp; Worldwide Collaboration
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-28 md:px-12 border-t border-navy/10">
        <div className="reveal-on-scroll mb-10">
          <span className="text-xs uppercase tracking-wider text-brandOrange font-bold">
            Get In Touch
          </span>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold leading-none tracking-tight text-navy mt-2">
            Let&apos;s talk<span className="text-brandOrange">.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-navy/70 max-w-lg">
            Have a project in mind, need software engineering expertise, or just want to connect? Send a note below.
          </p>
        </div>
        <div className="reveal-scale delay-150">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
