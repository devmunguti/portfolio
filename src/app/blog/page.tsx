import Link from "next/link";
import { prisma, safe } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await safe(() => prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }), []);
  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
      <h1 className="mb-12 font-display text-6xl font-semibold tracking-tight">Writing</h1>
      {posts.length === 0 && <p className="text-ink/60">No posts yet.</p>}
      {posts.map((p) => (
        <Link key={p.id} href={`/blog/${p.slug}`} className="block border-t border-ink/15 py-6 hover:text-accent">
          <h2 className="font-display text-3xl font-medium">{p.title}</h2>
          <p className="mt-2 text-ink/70">{p.excerpt}</p>
        </Link>
      ))}
    </main>
  );
}
