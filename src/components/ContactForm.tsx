"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) setState("sent");
    else { setError((await res.json()).error ?? "Something went wrong. Try again."); setState("error"); }
  }

  if (state === "sent") return <p className="text-xl font-semibold text-navy">Message sent! I will reply within a few days.</p>;
  const field = "w-full border-b border-navy/25 bg-transparent py-3 outline-none focus:border-brandOrange transition-colors text-navy text-base";
  return (
    <form onSubmit={onSubmit} className="grid max-w-xl gap-6">
      <label className="text-xs uppercase tracking-wider font-semibold text-navy/60">
        Name
        <input name="name" required className={field} placeholder="Your name" />
      </label>
      <label className="text-xs uppercase tracking-wider font-semibold text-navy/60">
        Email
        <input name="email" type="email" required className={field} placeholder="you@domain.com" />
      </label>
      <label className="text-xs uppercase tracking-wider font-semibold text-navy/60">
        Message
        <textarea name="body" required rows={4} className={field} placeholder="Tell me about your project or inquiry..." />
      </label>
      {state === "error" && <p role="alert" className="text-sm font-medium text-rose-600">{error}</p>}
      <button
        disabled={state === "sending"}
        className="w-fit rounded-full bg-brandOrange px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brandOrange/25 transition-all hover:bg-brandOrange-hover hover:scale-[1.02] active:scale-95 disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
