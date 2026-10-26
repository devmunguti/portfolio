import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { prisma, safe } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await safe(() => prisma.post.findUnique({ where: { slug } }), null);
  if (!p || !p.published) notFound();
  return (
    <main className="mx-auto max-w-2xl px-6 pb-32 pt-40">
      <h1 className="font-display text-5xl font-semibold tracking-tight">{p.title}</h1>
      <article className="mt-10 space-y-4 text-lg leading-relaxed"><ReactMarkdown>{p.body}</ReactMarkdown></article>
    </main>
  );
}
