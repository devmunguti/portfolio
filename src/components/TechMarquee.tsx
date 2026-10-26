"use client";

import React from "react";

interface TechItem {
  name: string;
  category: "Framework" | "Language" | "Database";
  color: string;
  glow: string;
  icon: React.ReactNode;
}

const techStack: TechItem[] = [
  {
    name: "React",
    category: "Framework",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Framework",
    color: "#539E43",
    glow: "rgba(83, 158, 67, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2.5l11.5 6.6v13.8L16 29.5 4.5 22.9V9.1L16 2.5z"
          fill="#539E43"
          opacity="0.15"
        />
        <path
          d="M16 4.2l9.9 5.7v12.2L16 27.8 6.1 22.1V9.9L16 4.2z"
          stroke="#539E43"
          strokeWidth="2"
        />
        <path
          d="M16 11v10M11 13.5l5 2.5 5-2.5"
          stroke="#539E43"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="4" fill="#F7DF1E" />
        <path
          d="M10 24.5c.8.6 1.8 1 2.8 1 2.4 0 3.7-1.4 3.7-3.8V11.5h-3.4v10.1c0 1.2-.5 1.7-1.4 1.7-.6 0-1.1-.2-1.7-.5v1.7zm11.7.1c2.1 0 3.8-1 4.7-2.6l-2.6-1.5c-.6.9-1.3 1.4-2.1 1.4-.9 0-1.6-.4-1.6-1.3 0-1 .8-1.4 2.5-2.1 2.5-1 3.9-2.2 3.9-4.3 0-2.3-1.8-3.9-4.5-3.9-2.1 0-3.6.8-4.5 2.3l2.5 1.6c.5-.8 1.1-1.2 2-1.2.9 0 1.5.5 1.5 1.2 0 .8-.6 1.2-2.1 1.8-2.6 1.1-4.3 2.1-4.3 4.6 0 2.4 1.8 4 4.6 4z"
          fill="#181A1F"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Language",
    color: "#3776AB",
    glow: "rgba(55, 118, 171, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path
          d="M15.8 3C10.5 3 9.7 5.3 9.7 7.6v2.8h6.4v.9H6.8C4.5 11.3 3 13.2 3 16.5c0 3.8 2.3 5.4 5.3 5.4h2.3v-3.2c0-3.2 2.7-5.9 5.9-5.9h5.8c.8 0 1.5-.7 1.5-1.5V7.6C23.8 4.7 20.9 3 15.8 3zm-2.4 2.4c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3z"
          fill="#3776AB"
        />
        <path
          d="M16.2 29c5.3 0 6.1-2.3 6.1-4.6v-2.8H16v-.9h9.3c2.3 0 3.8-1.9 3.8-5.2 0-3.8-2.3-5.4-5.3-5.4h-2.3v3.2c0 3.2-2.7 5.9-5.9 5.9H9.8c-.8 0-1.5.7-1.5 1.5v3.7c0 2.9 2.9 4.6 7.9 4.6zm2.4-2.4c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: "C++",
    category: "Language",
    color: "#00599C",
    glow: "rgba(0, 89, 156, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2.5l11.5 6.6v13.8L16 29.5 4.5 22.9V9.1L16 2.5z"
          fill="#00599C"
        />
        <path
          d="M13.5 13.2a4 4 0 1 0 0 5.6"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Plus signs */}
        <path
          d="M19 14v4M17 16h4M25 14v4M23 16h4"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "C",
    category: "Language",
    color: "#659AD2",
    glow: "rgba(101, 154, 210, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2.5l11.5 6.6v13.8L16 29.5 4.5 22.9V9.1L16 2.5z"
          fill="#659AD2"
        />
        <path
          d="M18 11.5a6.5 6.5 0 1 0 0 9"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "HTML5",
    category: "Language",
    color: "#E34F26",
    glow: "rgba(227, 79, 38, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path d="M5.5 3.5l2.2 24.5L16 30.5l8.3-2.5 2.2-24.5H5.5z" fill="#E34F26" />
        <path d="M16 5.5v22.7l6.5-1.9 1.8-20.8H16z" fill="#EF652A" />
        <path
          d="M10.2 9.5h11.6l-.3 3.5H16v.1h-5.5l.3 3.4H16v.1h-5.2l.4 4.5 4.8 1.4v-3.3l-2.4-.7-.2-2h2.6v-.1h5.3l-.6 6.8-4.7 1.4v-3.3"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Language",
    color: "#1572B6",
    glow: "rgba(21, 114, 182, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path d="M5.5 3.5l2.2 24.5L16 30.5l8.3-2.5 2.2-24.5H5.5z" fill="#1572B6" />
        <path d="M16 5.5v22.7l6.5-1.9 1.8-20.8H16z" fill="#33A9DC" />
        <path
          d="M10.2 9.5h11.6l-.3 3.5H16v.1h-5.5l.3 3.4H16v.1h-5.2l.4 4.5 4.8 1.4v-3.3l-2.4-.7-.2-2h2.6v-.1h5.3l-.6 6.8-4.7 1.4v-3.3"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.35)",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2.5C16 2.5 9 10 9 17.5c0 4.5 3 8 7 9.8 4-1.8 7-5.3 7-9.8 0-7.5-7-15-7-15z"
          fill="#47A248"
        />
        <path
          d="M16 2.5v24.8c-.3.1-.7.2-1 .2-3.8 0-6-3-6-6.5 0-6 7-18.5 7-18.5z"
          fill="#4DB33D"
        />
        <path
          d="M16 28.5c-.3 0-.6-.3-.6-.6v-3.5c.2.1.4.1.6.1V28.5z"
          fill="#3FA037"
        />
      </svg>
    ),
  },
];

export default function TechMarquee() {
  // Duplicate list twice for a completely seamless continuous infinite loop
  const duplicatedList = [...techStack, ...techStack];

  return (
    <section className="relative w-full overflow-hidden border-y border-navy/10 bg-gradient-to-b from-white via-[#FAFBFD] to-white py-8 select-none">
      {/* Background Accent Title / Subtitle */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brandOrange animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy/70">
            Core Tech Stack &amp; Languages
          </span>
        </div>
        <span className="text-xs font-semibold text-navy/40 hidden sm:inline-block">
          Languages and frameworks i have interacted with
        </span>
      </div>

      {/* Edge gradient fade masks for clean infinite aesthetic */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />

      {/* Marquee Track Container */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-5 py-2">
          {duplicatedList.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              style={{
                ["--tech-glow" as any]: item.glow,
              }}
              className="group relative flex items-center gap-3.5 rounded-2xl border border-navy/10 bg-white px-5 py-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_12px_28px_-6px_var(--tech-glow)] cursor-pointer"
            >
              {/* Brand Icon with subtle float/bounce effect */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/[0.03] transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="flex flex-col pr-1">
                <span className="font-display text-sm font-bold text-navy transition-colors group-hover:text-brandOrange">
                  {item.name}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/45">
                  {item.category}
                </span>
              </div>

              {/* Colored Corner Dot */}
              <div
                className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
