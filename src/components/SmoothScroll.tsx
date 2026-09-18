"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts once at the root layout. Replaces raw wheel/touch scrolling with
 * Lenis's eased momentum scroll so every page and section scrolls smoothly —
 * it still dispatches native `scroll` events, so Header's scroll-progress
 * bar and anchor links keep working unchanged.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Let in-page anchor links (e.g. AboutView's Contents sidebar) ease in too.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -100 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if ((window as any).__lenis === lenis) {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return null;
}
