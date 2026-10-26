"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import gsap from "gsap";

const HeroObject = dynamic(() => import("./HeroObject"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const monoLayerRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);

  // Proximity/Spread percentage of monochrome layer
  const [spreadPercent, setSpreadPercent] = useState<number>(50);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const pulseOffsetRef = useRef<number>(0);

  // Track mouse across the hero section
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    mousePosRef.current = { x, y };
  }, []);

  // Clickable interactive pulse: draws the bubble to touch the portrait and then recedes
  const triggerBubblePulse = () => {
    const proxy = { pulse: pulseOffsetRef.current };
    gsap.timeline()
      .to(proxy, {
        pulse: 1,
        duration: 0.85,
        ease: "power2.out",
        onUpdate: () => {
          pulseOffsetRef.current = proxy.pulse;
        },
      })
      .to(proxy, {
        pulse: 0,
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate: () => {
          pulseOffsetRef.current = proxy.pulse;
        },
      });
  };

  // Click handler to redirect directly to the footer
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerBubblePulse();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let animId: number;
    let currentX = 0;
    let currentY = 0;

    // 60fps/120fps physics loop driving bubble float + black & white connection
    const loop = (timestamp: number) => {
      const t = timestamp * 0.001;

      // 1. Organic gentle breathing oscillation (sine wave)
      const organicFloatX = Math.sin(t * 1.4) * 32; // moves left and right
      const organicFloatY = Math.cos(t * 1.1) * 18; // moves up and down

      // 2. Mouse cursor influence (moving mouse left draws bubble closer to portrait)
      const mouseInfluenceX = (0.5 - mousePosRef.current.x) * 55;
      const mouseInfluenceY = (mousePosRef.current.y - 0.5) * 30;

      // 3. Pulse push from clicking the button
      const pulsePush = pulseOffsetRef.current * -55;

      const targetX = organicFloatX + mouseInfluenceX + pulsePush;
      const targetY = organicFloatY + mouseInfluenceY;

      // Smooth liquid lerp
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      // Directly update the bubble transform
      if (bubbleContainerRef.current) {
        bubbleContainerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      // Calculate monochrome spread based on bubble's position:
      // When bubble floats left (closer to portrait, currentX is negative), spread increases (e.g. 50% - 70%)
      // When bubble floats right (away from portrait, currentX is positive), spread decreases toward 0%
      const spread = Math.min(Math.max(48 - currentX * 0.85, 0), 75);
      const opacity = Math.min(Math.max(spread / 30, 0), 1);

      // Directly update the monochrome overlay mask on the portrait
      if (monoLayerRef.current) {
        const falloff = Math.max(spread - 10, 0);
        const mask = `linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) ${falloff}%, transparent ${spread}%)`;
        monoLayerRef.current.style.webkitMaskImage = mask;
        monoLayerRef.current.style.maskImage = mask;
        monoLayerRef.current.style.opacity = opacity.toFixed(3);
      }

      // Divider aura line at the connection boundary
      if (dividerLineRef.current) {
        dividerLineRef.current.style.right = `${spread}%`;
        dividerLineRef.current.style.opacity = (opacity * 0.75).toFixed(3);
      }

      setSpreadPercent(spread);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP entrance animation on load
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-anim-left", {
        x: -35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
      })
      .from(".hero-portrait-frame", {
        scale: 0.94,
        opacity: 0,
        duration: 0.95,
        ease: "power2.out",
      }, "-=0.55")
      .from(".hero-anim-right", {
        x: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
      }, "-=0.65")
      .from(".hero-anim-bottom", {
        y: 45,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
      }, "-=0.45");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] w-full overflow-hidden bg-white px-6 pt-24 pb-8 md:px-12 lg:px-16 flex flex-col justify-between"
    >
      {/* 3D Morphing Bubble in Background - Dynamically Floats & Sways */}
      <div
        ref={bubbleContainerRef}
        className="pointer-events-none absolute right-[2%] top-[8%] z-0 h-[460px] w-[460px] max-w-[85vw] opacity-80 will-change-transform md:right-[12%] md:top-[10%] md:h-[540px] md:w-[540px]"
        aria-hidden
      >
        <Suspense fallback={null}>
          <HeroObject />
        </Suspense>
      </div>

      {/* Main Content Grid: Left typography | Center Bubble-Connected Portrait | Right Bio */}
      <div className="relative z-10 grid w-full max-w-7xl mx-auto grid-cols-1 items-center gap-8 pt-2 md:grid-cols-12 md:gap-4 lg:gap-8">
        
        {/* LEFT COLUMN: "Let me Introduce Myself" */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-center space-y-2">
          <p className="hero-anim-left font-sans text-sm md:text-base font-semibold tracking-normal text-navy/70">
            I don&apos;t think I&apos;ve done this so,
          </p>
          <div className="hero-anim-left space-y-0.5">
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.05]">
              Let me
            </h1>
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-brandOrange leading-[1.05]">
              Introduce
            </h1>
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.05]">
              Myself
            </h1>
          </div>
          {/* Terracotta Orange Accent Underline Bar */}
          <div className="hero-anim-left pt-2">
            <div className="h-3.5 w-16 rounded-xs bg-brandOrange shadow-sm" />
          </div>
        </div>

        {/* CENTER COLUMN: Portrait with Bubble-Connected Monochrome Transition */}
        <div className="md:col-span-4 lg:col-span-4 flex justify-center items-center">
          <div
            className="hero-portrait-frame relative aspect-square w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] select-none overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-navy/10"
          >
            {/* Layer 1: Base Full Color Image (Stays always visible) */}
            <div className="absolute inset-0 h-full w-full">
              <Image
                src="/myphoto.jpeg"
                alt="Augustine Munguti portrait (Full Color)"
                fill
                priority
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover"
              />
            </div>

            {/* Layer 2: Monochrome / Black & White Overlay (Active on the side connected to the floating bubble) */}
            <div
              ref={monoLayerRef}
              className="absolute inset-0 h-full w-full pointer-events-none transition-opacity duration-100"
              style={{
                WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 48%)",
                maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 48%)",
              }}
            >
              <Image
                src="/myphoto.jpeg"
                alt="Augustine Munguti portrait (Monochrome)"
                fill
                priority
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover filter grayscale contrast-125 brightness-92"
              />
            </div>

            {/* Subtle soft light edge where the monochrome transition meets the natural colors */}
            <div
              ref={dividerLineRef}
              className="pointer-events-none absolute top-0 bottom-0 w-[1.5px] bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-75"
              style={{ right: `${spreadPercent}%` }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Bio & Interactive Bubble Pulse Button */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-center space-y-5 md:pl-4">
          <div className="hero-anim-right space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-navy tracking-tight">
              My name is Augustine Munguti.
            </h2>
            <p className="font-sans text-base md:text-lg text-navy/80 leading-relaxed max-w-sm">
              I&apos;m a Software Engineer focused on building web applications and software solutions.
            </p>
          </div>

          {/* Contact Me Button: pulses bubble & redirects to footer */}
          <div className="hero-anim-right pt-1">
            <a
              href="#footer"
              onClick={handleContactClick}
              className="group inline-flex items-center gap-2.5 rounded-full bg-brandOrange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brandOrange/30 hover:bg-brandOrange-hover hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer"
              title="Click to redirect to contact details in the footer"
            >
              <span>Contact Me</span>
              <svg
                className="h-4 w-4 text-white transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BRANDED CARDS: Left Signature Card | Right Symmetrical Accent Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 items-end">
        
        {/* Bottom Left Card: Deep Navy + Slate Bar + Cursive Signature */}
        <div className="hero-anim-bottom md:col-span-4 lg:col-span-4">
          <div className="relative overflow-hidden rounded-t-2xl bg-navy p-6 pt-7 shadow-2xl ring-1 ring-white/10">
            {/* Top Slate-Blue Stripe */}
            <div className="absolute top-0 inset-x-0 h-3 bg-brandSlate" />
            
            {/* Handwritten Signature */}
            <div className="space-y-0 select-none pt-1">
              <span className="font-signature text-3xl sm:text-4xl text-white tracking-wider block leading-tight">
                Augustine
              </span>
              <div className="flex items-center gap-2">
                <span className="font-signature text-3xl sm:text-4xl text-white tracking-wider block leading-tight">
                  Munguti
                </span>
                <span className="h-1.5 w-7 rounded-full bg-brandOrange block -mt-1" />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-brandSlate/90 tracking-wider uppercase">
              Full-Stack &amp; Web Solutions
            </p>
          </div>
        </div>

        {/* Center spacing to let the portrait suit line align */}
        <div className="hidden md:block md:col-span-4 lg:col-span-4" />

        {/* Bottom Right Card: Symmetrical Deep Navy Block with Slate Bar */}
        <div className="hero-anim-bottom md:col-span-4 lg:col-span-4">
          <div className="relative overflow-hidden rounded-t-2xl bg-navy p-6 pt-7 shadow-2xl ring-1 ring-white/10 flex flex-col justify-between">
            {/* Top Slate-Blue Stripe */}
            <div className="absolute top-0 inset-x-0 h-3 bg-brandSlate" />

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-white tracking-wide uppercase">
                Available for New Projects
              </span>
            </div>

            <p className="mt-3 text-sm text-brandSlate/90 leading-relaxed">
              Turning complex requirements into fast, elegant, and maintainable software.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
