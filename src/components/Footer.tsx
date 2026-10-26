"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="border-t border-navy/15 bg-navy text-white scroll-mt-10">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brandOrange via-brandSlate to-navy" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Signature Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-0.5">
              <span className="font-signature text-3xl sm:text-4xl text-white tracking-wider block">
                Augustine
              </span>
              <div className="flex items-center gap-2">
                <span className="font-signature text-3xl sm:text-4xl text-white tracking-wider block">
                  Munguti
                </span>
                <span className="h-1.5 w-6 rounded-full bg-brandOrange block -mt-1" />
              </div>
            </div>

            <p className="text-sm text-brandSlate-light max-w-sm leading-relaxed">
              Software Engineer and web developer building fast, considered web products and business management systems.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                Available for New Projects &amp; Roles
              </span>
            </div>
          </div>

          {/* Quick Navigation Column (No blog link) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brandSlate-light">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#work" className="text-white/70 hover:text-brandOrange transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-white/70 hover:text-brandOrange transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white/70 hover:text-brandOrange transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brandSlate-light">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>
                <span className="text-brandSlate-light text-xs uppercase block">Email</span>
                <a
                  href="mailto:devmunguti@gmail.com"
                  className="font-medium text-white hover:text-brandOrange transition-colors"
                >
                  devmunguti@gmail.com
                </a>
              </p>
              <p className="pt-1">
                <span className="text-brandSlate-light text-xs uppercase block">WhatsApp / Phone</span>
                <a
                  href="https://wa.me/254759070905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>+254 759 070 905</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </p>
              <p className="pt-1">
                <span className="text-brandSlate-light text-xs uppercase block">Location</span>
                <span className="text-white">Nairobi, Kenya · Remote Worldwide</span>
              </p>
              <p className="pt-1">
                <span className="text-brandSlate-light text-xs uppercase block">Featured Client</span>
                <a
                  href="https://aniheal.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brandOrange hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>aniheal.co.ke</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brandSlate-light">
          <p>© {new Date().getFullYear()} Augustine Munguti. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
