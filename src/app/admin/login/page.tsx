"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) });
    if (res.ok) router.push("/admin"); else setError((await res.json()).error);
  }
  const field = "w-full border-b border-ink/30 bg-transparent py-3 outline-none focus:border-accent";
  return (
    <main className="mx-auto grid min-h-screen max-w-sm place-content-center">
      <form onSubmit={onSubmit} className="grid w-80 gap-6">
        <h1 className="font-display text-4xl font-semibold">Admin sign in</h1>
        <label>Email<input name="email" type="email" required className={field} /></label>
        <label>Password<input name="password" type="password" required className={field} /></label>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button className="rounded-full bg-ink px-8 py-3 text-paper hover:bg-accent">Sign in</button>
      </form>
    </main>
  );
}
