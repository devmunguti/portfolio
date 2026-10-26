"use client";

import Link from "next/link";
import { ProjectItem } from "@/lib/projects";

const staggerDelays = ["delay-75", "delay-150", "delay-225", "delay-300"];

export default function ProjectList({ projects }: { projects: ProjectItem[] }) {
  const companyProjects = projects.filter((p) => p.category === "company" || p.slug === "aniheal");
  const personalProjects = projects.filter((p) => p.category !== "company" && p.slug !== "aniheal");

  return (
    <div className="space-y-16">
      {/* 1. COMPANY & CLIENT WORK */}
      <div className="reveal-on-scroll">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brandOrange/10 text-brandOrange ring-1 ring-brandOrange/20 shadow-xs">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
            Company &amp; Commercial Work
          </h3>
          <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[11px] font-semibold text-navy/60">
            Featured
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {companyProjects.map((p) => (
            <div
              key={p.slug}
              className="reveal-scale group relative overflow-hidden rounded-2xl border border-navy/15 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brandOrange/40 hover:shadow-2xl"
            >
              {/* Top Animated Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brandOrange via-brandSlate to-navy" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Company Project
                    </span>
                    <span className="text-xs font-semibold text-navy/50">
                      {p.year}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-navy group-hover:text-brandOrange transition-colors">
                    {p.title}
                  </h4>

                  <p className="text-base text-navy/80 leading-relaxed">
                    {p.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-navy/[0.04] px-3 py-1 text-xs font-medium text-navy/80 ring-1 ring-navy/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex shrink-0 flex-col sm:flex-row md:flex-col gap-3 pt-2 md:pt-0">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brandOrange px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brandOrange/25 hover:bg-brandOrange-hover hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <span>Visit Live Website</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-navy/5 hover:border-navy/30 transition-all text-center"
                  >
                    <span>Project Overview</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PERSONAL PROJECTS & SYSTEMS */}
      <div>
        <div className="reveal-on-scroll mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy/10 text-navy ring-1 ring-navy/15 shadow-xs">
              <svg className="h-4 w-4 text-brandOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
              Personal Projects &amp; Systems
            </h3>
          </div>
          <span className="text-xs font-semibold text-navy/50">
            {personalProjects.length} Custom Platforms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalProjects.map((p, index) => (
            <div
              key={p.slug}
              className={`reveal-on-scroll ${staggerDelays[index % staggerDelays.length]} group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/15 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-brandOrange/40 hover:shadow-xl`}
            >
              {/* Top subtle hover accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brandOrange/0 to-transparent group-hover:via-brandOrange transition-all duration-300" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brandOrange">
                    System Architecture
                  </span>
                  <span className="text-xs font-semibold text-navy/40">
                    {p.year}
                  </span>
                </div>

                <h4 className="font-display text-xl sm:text-2xl font-bold text-navy group-hover:text-brandOrange transition-colors">
                  {p.title}
                </h4>

                <p className="text-sm text-navy/75 leading-relaxed">
                  {p.summary}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-navy/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-navy/70 ring-1 ring-navy/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-navy/10">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-navy/[0.05] hover:bg-brandOrange hover:text-white px-3.5 py-2 text-xs font-semibold text-navy transition-all group/btn"
                  >
                    <span>Confirm Live System</span>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy/60 hover:text-navy transition-colors ml-auto group/cs"
                >
                  <span>Case Study</span>
                  <svg className="h-3 w-3 transition-transform group-hover/cs:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
