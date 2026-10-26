"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [bubbleBounced, setBubbleBounced] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerBubbleBounce = () => {
    setBubbleBounced(true);
    setTimeout(() => setBubbleBounced(false), 700);
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "contact";
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-full bg-white/85 backdrop-blur-xl border border-navy/10 px-4 py-2 sm:px-6 sm:py-2.5 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_12px_36px_-8px_rgba(11,30,54,0.18)] bg-white/95 scale-[0.99] border-navy/15"
            : "shadow-[0_8px_30px_-6px_rgba(11,30,54,0.1)]"
        }`}
      >
        {/* Brand & Animated Interactive Micro-Bubble */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-base sm:text-lg font-bold text-navy tracking-tight select-none"
        >
          {/* Animated 3D Micro-Bubble */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              triggerBubbleBounce();
            }}
            title="Interactive bubble - click me!"
            className="relative flex items-center justify-center cursor-pointer"
          >
            {/* Outer dynamic glowing halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-brandOrange/40 via-brandSlate/30 to-brandOrange/30 blur-xs animate-bubble-glimmer" />

            {/* 3D Glass Sphere Body */}
            <div
              className={`relative h-7 w-7 rounded-full bg-gradient-to-br from-brandOrange via-[#D44E2D] to-navy shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.4),0_4px_12px_rgba(232,93,59,0.35)] transition-all duration-300 group-hover:scale-125 animate-nav-bubble flex items-center justify-center ${
                bubbleBounced ? "scale-140 rotate-180" : ""
              }`}
            >
              {/* Glossy top specular reflection */}
              <span className="absolute top-1 left-1.5 h-2 w-2 rounded-full bg-white/85 blur-[0.3px]" />
              {/* Bottom soft reflection */}
              <span className="absolute bottom-1 right-1.5 h-1 w-1.5 rounded-full bg-white/40" />
              {/* Center micro particle core */}
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span>Augustine</span>
            <span className="text-brandOrange">Munguti</span>
          </div>
        </Link>

        {/* Navigation Links + CTA with interactive bubble highlight */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-1.5 rounded-full text-navy/70 hover:text-navy hover:bg-navy/[0.05] transition-all duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Let's Talk CTA Pill with live status beacon */}
          <a
            href="#contact"
            onClick={scrollToContact}
            className="group relative flex items-center gap-2 rounded-full bg-brandOrange px-4 py-2 sm:px-5 sm:py-2 text-xs font-bold text-white shadow-md shadow-brandOrange/30 hover:bg-brandOrange-hover hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            {/* Pulsing beacon bubble */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span>Let&apos;s Talk</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
