"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // Once revealed, we can unobserve for maximum performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed)"
      );
      targets.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Check again after a short delay to catch dynamic or hydrated elements
    const timer = setTimeout(observeElements, 400);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
