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
  // Smooth scroll engine is disabled while scroll is restricted in development mode
  return null;
}
