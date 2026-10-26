import { prisma, safe } from "@/lib/prisma";
import { ProjectForm, PostForm, DeleteButton } from "@/components/AdminForms";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const [projects, posts, messages, views, top] = await Promise.all([
    safe(() => prisma.project.findMany({ orderBy: { year: "desc" } }), []),
    safe(() => prisma.post.findMany({ orderBy: { createdAt: "desc" } }), []),
    safe(() => prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 20 }), []),
    safe(() => prisma.pageView.count(), 0),
    safe(() => prisma.pageView.groupBy({ by: ["path"], _count: { path: true }, orderBy: { _count: { path: "desc" } }, take: 5 }), []),
  ]);
  return (
    <main className="mx-auto max-w-4xl space-y-20 px-6 pb-32 pt-32">
      <h1 className="font-display text-5xl font-semibold">Dashboard</h1>

      <section>
        <h2 className="mb-4 font-display text-2xl font-medium">Visitors</h2>
        <p className="text-lg">{views} total page views</p>
        <ul className="mt-2 text-ink/70">{top.map((t) => <li key={t.path}>{t.path}: {t._count.path}</li>)}</ul>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-medium">Projects</h2>
        <ul className="mb-8">{projects.map((p) => <li key={p.id} className="flex justify-between border-t border-ink/15 py-3"><span>{p.title} ({p.year})</span><DeleteButton endpoint="projects" id={p.id} /></li>)}</ul>
        <ProjectForm />
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-medium">Posts</h2>
        <ul className="mb-8">{posts.map((p) => <li key={p.id} className="flex justify-between border-t border-ink/15 py-3"><span>{p.title} {p.published ? "" : "(draft)"}</span><DeleteButton endpoint="posts" id={p.id} /></li>)}</ul>
        <PostForm />
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-medium">Messages</h2>
        {messages.length === 0 && <p className="text-ink/60">No messages yet.</p>}
        {messages.map((m) => <div key={m.id} className="border-t border-ink/15 py-4"><p className="font-medium">{m.name} · {m.email}</p><p className="mt-1 whitespace-pre-wrap">{m.body}</p></div>)}
      </section>
    </main>
  );
}
