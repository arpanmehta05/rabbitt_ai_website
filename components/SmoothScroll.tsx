"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Eases mouse-wheel and trackpad scrolling over the whole site. It drives the real window scroll,
// so position-based effects (framer-motion's useScroll, sticky columns) keep working as they are.
// Touch screens keep their native momentum scrolling, and nothing runs for people who ask for
// reduced motion. Scrollable panels (like the mobile menu) still scroll on their own.
export default function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: true,
    });
    lenis.current = instance;

    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // a new page starts at the top, without gliding there from wherever the last one ended
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
