"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const field = "w-full border-b border-ink/30 bg-transparent py-2 outline-none focus:border-accent";

export function ProjectForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      slug: f.slug, title: f.title, summary: f.summary, body: f.body, image: f.image || undefined,
      stack: f.stack.split(",").map((s) => s.trim()).filter(Boolean), liveUrl: f.liveUrl || undefined,
      repoUrl: f.repoUrl || undefined, year: Number(f.year),
    }) });
    if (res.ok) { (e.target as HTMLFormElement).reset(); setError(""); router.refresh(); } else setError("Could not save. Check that the slug is unique and all required fields are filled.");
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="title" placeholder="Title" required className={field} />
      <input name="slug" placeholder="slug-like-this" required className={field} />
      <input name="summary" placeholder="One-line summary" required className={field} />
      <input name="year" type="number" placeholder="Year" required className={field} />
      <input name="image" placeholder="Image URL (or /projects/shot.png)" className={field} />
      <input name="stack" placeholder="Stack, comma separated" className={field} />
      <input name="liveUrl" placeholder="Live URL" className={field} />
      <input name="repoUrl" placeholder="Repo URL" className={field} />
      <textarea name="body" placeholder="Case study (Markdown)" rows={5} className={field} />
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <button className="w-fit rounded-full bg-ink px-6 py-2 text-paper hover:bg-accent">Add project</button>
    </form>
  );
}

export function PostForm() {
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, published: f.published === "on" }) });
    if (res.ok) { (e.target as HTMLFormElement).reset(); router.refresh(); }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="title" placeholder="Title" required className={field} />
      <input name="slug" placeholder="slug-like-this" required className={field} />
      <input name="excerpt" placeholder="Short excerpt" className={field} />
      <textarea name="body" placeholder="Post (Markdown)" rows={8} required className={field} />
      <label className="flex items-center gap-2"><input type="checkbox" name="published" /> Publish now</label>
      <button className="w-fit rounded-full bg-ink px-6 py-2 text-paper hover:bg-accent">Save post</button>
    </form>
  );
}

export function DeleteButton({ endpoint, id }: { endpoint: "projects" | "posts"; id: string }) {
  const router = useRouter();
  return (
    <button className="text-sm text-red-700 underline" onClick={async () => {
      if (!confirm("Delete this item? This cannot be undone.")) return;
      await fetch(`/api/${endpoint}?id=${id}`, { method: "DELETE" });
      router.refresh();
    }}>Delete</button>
  );
}
