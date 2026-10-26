import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { prisma, safe } from "@/lib/prisma";
import { DEFAULT_PROJECTS } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbProject = await safe(() => prisma.project.findUnique({ where: { slug } }), null);
  const p = dbProject || DEFAULT_PROJECTS.find((item) => item.slug === slug) || null;

  if (!p || !p.published) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-32 pt-36 bg-white text-navy">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm font-semibold text-navy/60 hover:text-brandOrange transition-colors mb-8"
      >
        <span>← Back to Selected Work</span>
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="rounded-full bg-brandOrange/10 px-3 py-1 text-xs font-semibold text-brandOrange uppercase tracking-wider">
          {("category" in p && p.category === "company") || p.slug === "aniheal"
            ? "Company Work"
            : "Personal System"}
        </span>
        <span className="text-sm font-semibold text-navy/50">{p.year}</span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-navy">
        {p.title}
      </h1>

      <p className="mt-4 text-lg sm:text-xl text-navy/80 leading-relaxed max-w-2xl">
        {p.summary}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 my-6">
        {p.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-navy/5 px-3 py-1.5 text-xs font-semibold text-navy ring-1 ring-navy/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Live Confirmation Action Links */}
      <div className="flex flex-wrap items-center gap-4 my-8 p-6 rounded-2xl border border-navy/10 bg-navy/[0.02]">
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brandOrange px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brandOrange/25 hover:bg-brandOrange-hover hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Confirm Live Website</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-navy/5 transition-all"
          >
            <span>View Source Code</span>
            <svg className="h-4 w-4 text-navy/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <article className="mt-10 space-y-4 leading-relaxed text-base sm:text-lg text-navy/85 border-t border-navy/10 pt-8">
        <ReactMarkdown>{p.body}</ReactMarkdown>
      </article>
    </main>
  );
}
