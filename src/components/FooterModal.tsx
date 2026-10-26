"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FooterModal({ isOpen, onClose }: FooterModalProps) {
  const [copied, setCopied] = useState(false);
  const email = "devmunguti@gmail.com";

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Pop-up Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-3xl sm:rounded-3xl border border-white/10 bg-navy p-6 sm:p-8 text-white shadow-2xl transition-all duration-300 animate-slideUp">
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brandOrange via-brandSlate to-brandOrange" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Direct Contact · Available for Hire
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Let&apos;s Connect &amp; Collaborate<span className="text-brandOrange">.</span>
            </h3>
            <p className="mt-1 text-sm text-brandSlate-light">
              Reach out directly for web development, system architecture, or project inquiries.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close contact popup"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          {/* Email Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-brandSlate-light">
                  Email Address
                </span>
                <svg className="h-4 w-4 text-brandSlate-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-mono text-sm sm:text-base font-semibold text-white truncate">
                {email}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all text-center cursor-pointer"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
              <a
                href={`mailto:${email}`}
                className="flex-1 rounded-xl bg-brandOrange px-3 py-2 text-xs font-semibold text-white hover:bg-brandOrange-hover transition-all text-center"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-brandSlate-light">
                  Direct Messaging
                </span>
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white">
                +254 759 070 905
              </p>
              <p className="text-xs text-brandSlate-light/80 mt-1">
                Quick WhatsApp &amp; call responses for projects.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/254759070905"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all text-center"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>

        {/* Location & Social Links Footer Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-brandSlate-light">
            <svg className="h-3.5 w-3.5 text-brandOrange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Based in Nairobi, Kenya · Available for Global Remote Work</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <a
              href="https://aniheal.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandSlate-light hover:text-brandOrange transition-colors"
            >
              aniheal.co.ke
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandSlate-light hover:text-brandOrange transition-colors"
            >
              GitHub
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandSlate-light hover:text-brandOrange transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
