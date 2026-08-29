"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import SiteNavigation from "@/components/SiteNavigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface ProductNode {
  id: string;
  name: string;
  src: string;
  pos: { desktop: { x: number; y: number }; tablet: { x: number; y: number } };
  curveControl: { cx1: number; cy1: number; cx2: number; cy2: number };
}

const productNodes: ProductNode[] = [
  {
    id: "cloudwatcher",
    name: "CloudWatcher",
    src: "/cloudwatcher.svg",
    pos: { desktop: { x: -35, y: -28 }, tablet: { x: -38, y: -30 } },
    curveControl: { cx1: -10, cy1: -21, cx2: -24, cy2: -28 },
  },
  {
    id: "aiquest",
    name: "AI Quest",
    src: "/aiquest.svg",
    pos: { desktop: { x: -43, y: -4 }, tablet: { x: -44, y: -6 } },
    curveControl: { cx1: -18, cy1: -7, cx2: -32, cy2: -4 },
  },
  {
    id: "icypluto",
    name: "IcyPluto",
    src: "/Icypluto.svg",
    pos: { desktop: { x: -36, y: 22 }, tablet: { x: -38, y: 20 } },
    curveControl: { cx1: -14, cy1: 7, cx2: -26, cy2: 22 },
  },
  {
    id: "quill",
    name: "IcyQuill",
    src: "/quill.svg",
    pos: { desktop: { x: -20, y: 38 }, tablet: { x: -24, y: 36 } },
    curveControl: { cx1: -8, cy1: 15, cx2: -14, cy2: 36 },
  },
  {
    id: "onskill",
    name: "OnSkill",
    src: "/onskill.svg",
    pos: { desktop: { x: 33, y: -30 }, tablet: { x: 36, y: -30 } },
    curveControl: { cx1: 10, cy1: -23, cx2: 24, cy2: -30 },
  },
  {
    id: "drip",
    name: "Drip",
    src: "/drip.svg",
    pos: { desktop: { x: 43, y: -6 }, tablet: { x: 44, y: -8 } },
    curveControl: { cx1: 18, cy1: -9, cx2: 32, cy2: -6 },
  },
  {
    id: "pingu",
    name: "PingU",
    src: "/pingu.svg",
    pos: { desktop: { x: 36, y: 20 }, tablet: { x: 38, y: 18 } },
    curveControl: { cx1: 14, cy1: 7, cx2: 26, cy2: 20 },
  },
  {
    id: "chance",
    name: "Chance Rag",
    src: "/chance.svg",
    pos: { desktop: { x: 22, y: 38 }, tablet: { x: 24, y: 36 } },
    curveControl: { cx1: 8, cy1: 15, cx2: 16, cy2: 36 },
  },
];

// Reserved for the next product-navigation implementation.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductIcon({ name }: { name: string }) {
  switch (name) {
    case "IcyPluto":
      return (
        <Image
          src="/Icypluto.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "IcyQuill":
      return (
        <Image
          src="/quill.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "Drip":
      return (
        <Image
          src="/drip.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "OnSkill":
      return (
        <Image
          src="/onskill.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "Cloud Watcher":
      return (
        <Image
          src="/cloudwatcher.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "Ping Me":
      return (
        <Image
          src="/pingu.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "ChanceRAG":
      return (
        <Image
          src="/chance.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "AI Learning Platform Gamified":
      return (
        <Image
          src="/aiquest.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "Rabbitt Learning":
    case "Voice Rabbitt":
      return (
        <Image
          src="/logo.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "AI World":
      return (
        <Image
          src="/globe.svg"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "IcyLingo":
      return (
        <svg
          className="h-4 w-4 text-sky-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "IcyLunar":
      return (
        <svg
          className="h-4 w-4 text-indigo-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      );
    case "Fire Reach":
      return (
        <svg
          className="h-4 w-4 text-orange-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "Pluto Circle":
      return (
        <svg
          className="h-4 w-4 text-cyan-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.3" />
          <circle cx="12" cy="3" r="2" fill="currentColor" />
        </svg>
      );
    case "LMS":
      return (
        <svg
          className="h-4 w-4 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      );
    case "Code Bunny":
      return (
        <svg
          className="h-4 w-4 text-sky-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case "R Proctor":
      return (
        <svg
          className="h-4 w-4 text-blue-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case "HRMS":
      return (
        <svg
          className="h-4 w-4 text-violet-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "Canvas":
      return (
        <svg
          className="h-4 w-4 text-teal-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "GMA Council":
      return (
        <svg
          className="h-4 w-4 text-amber-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "WES Council":
      return (
        <svg
          className="h-4 w-4 text-cyan-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return (
        <span className="text-xs font-bold text-sky-300">
          {name.slice(0, 1)}
        </span>
      );
  }
}

// The former activation / ecosystem screen is intentionally retired from the
// landing surface. Its implementation remains isolated below.
const showLegacyIntro = true;

type Point = { x: number; y: number };
type NodeTargets = Record<string, Point>;

function nodePath(node: ProductNode) {
  const target = node.pos.desktop;
  const distance = Math.hypot(target.x, target.y);
  const ringRadius = 22;
  const start = {
    x: (target.x / distance) * ringRadius,
    y: (target.y / distance) * ringRadius,
  };
  const delta = { x: target.x - start.x, y: target.y - start.y };
  return `M ${start.x} ${start.y} C ${start.x + delta.x * 0.34} ${start.y + delta.y * 0.34}, ${target.x - delta.x * 0.2} ${target.y - delta.y * 0.2}, ${target.x} ${target.y}`;
}

export default function LandingExperience() {
  const prefersReducedMotion = useReducedMotion();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hatOpeningRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandTargetRef = useRef<HTMLDivElement>(null);
  const desktopNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobileNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [targets, setTargets] = useState<{
    nodes: NodeTargets;
    logo: Point;
  }>({ nodes: {}, logo: { x: 0, y: 0 } });
  const [introPhase, setIntroPhase] = useState<
    "initializing" | "shockwave" | "ecosystem"
  >(prefersReducedMotion ? "ecosystem" : "initializing");
  const [transitionComplete, setTransitionComplete] = useState(
    prefersReducedMotion ?? false,
  );
  const sequenceProgress = useMotionValue(prefersReducedMotion ? 1 : 0);
  const ecosystemReveal = useMotionValue(prefersReducedMotion ? 1 : 0);
  const animationProgress = useTransform(sequenceProgress, (value) =>
    prefersReducedMotion ? 1 : value,
  );
  const networkLength = useTransform(
    animationProgress,
    [0, 0.32, 0.52],
    [1, 0.08, 0],
  );
  const networkOpacity = useTransform(
    animationProgress,
    [0.18, 0.48],
    [0.75, 0],
  );
  const fieldOpacity = useTransform(animationProgress, [0.18, 0.52], [1, 0]);
  const logoTargetX = useMotionValue(0);
  const logoTargetY = useMotionValue(0);

  const logoX = useTransform(
    [animationProgress, logoTargetX] as const,
    ([p, tx]) => {
      const t = Math.max(
        0,
        Math.min(1, ((p as number) - 0.45) / (0.72 - 0.45)),
      );
      return t * (tx as number);
    },
  );
  const logoY = useTransform(
    [animationProgress, logoTargetY] as const,
    ([p, ty]) => {
      const t = Math.max(
        0,
        Math.min(1, ((p as number) - 0.45) / (0.72 - 0.45)),
      );
      return t * (ty as number);
    },
  );
  const logoScale = useTransform(animationProgress, [0.43, 0.72], [1, 0.22]);
  const launchHatOpacity = useTransform(animationProgress, [0.48, 0.7], [1, 0]);
  const navOpacity = useTransform(animationProgress, [0.64, 0.78], [0, 1]);
  const referenceHeroOpacity = useTransform(
    animationProgress,
    [0.72, 0.94],
    [0, 1],
  );
  const lightBgOpacity = useTransform(
    animationProgress,
    [0, 0.28, 0.68],
    [1, 0.85, 0],
  );
  const darkBgOpacity = useTransform(
    animationProgress,
    [0.15, 0.48, 0.82],
    [0, 0.65, 1],
  );
  const darkCoreScale = useTransform(
    animationProgress,
    [0.1, 0.78],
    [0.65, 1.25],
  );
  const darkAtmosphereOpacity = useTransform(
    animationProgress,
    [0.35, 0.82],
    [0, 1],
  );
  const orbitalCurvesOpacity = useTransform(
    animationProgress,
    [0.45, 0.85],
    [0, 0.65],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !showLegacyIntro) return;
    const shockwaveTimer = window.setTimeout(
      () => setIntroPhase("shockwave"),
      550,
    );
    const ecosystemTimer = window.setTimeout(
      () => setIntroPhase("ecosystem"),
      850,
    );
    return () => {
      window.clearTimeout(shockwaveTimer);
      window.clearTimeout(ecosystemTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !showLegacyIntro || introPhase !== "ecosystem")
      return;
    const controls = animate(ecosystemReveal, 1, {
      duration: 1.1,
      ease: "linear",
    });
    return () => controls.stop();
  }, [introPhase, prefersReducedMotion, ecosystemReveal]);

  useEffect(() => {
    if (prefersReducedMotion || !showLegacyIntro || introPhase !== "ecosystem")
      return;

    let controls: ReturnType<typeof animate> | undefined;
    const startTransition = window.setTimeout(() => {
      controls = animate(sequenceProgress, 1, {
        duration: 3.4,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => setTransitionComplete(true),
      });
    }, 700);

    return () => {
      window.clearTimeout(startTransition);
      controls?.stop();
    };
  }, [introPhase, prefersReducedMotion, sequenceProgress]);

  useEffect(() => {
    if (prefersReducedMotion || transitionComplete) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousTouchAction = document.documentElement.style.touchAction;
    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKey = (event: KeyboardEvent) => {
      if (
        [
          " ",
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
        ].includes(event.key)
      )
        event.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.touchAction = "none";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKey);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.documentElement.style.touchAction = previousTouchAction;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKey);
    };
  }, [prefersReducedMotion, transitionComplete]);

  useLayoutEffect(() => {
    const measureTargets = () => {
      const opening = hatOpeningRef.current?.getBoundingClientRect();
      const logo = logoRef.current?.getBoundingClientRect();
      const brand = brandTargetRef.current?.getBoundingClientRect();
      if (!opening || !logo || !brand) return;
      const activeNodeRefs =
        window.innerWidth >= 768
          ? desktopNodeRefs.current
          : mobileNodeRefs.current;
      const nodes = productNodes.reduce<NodeTargets>((result, node) => {
        const rect = activeNodeRefs[node.id]?.getBoundingClientRect();
        if (rect)
          result[node.id] = {
            x: opening.left + opening.width / 2 - (rect.left + rect.width / 2),
            y: opening.top + opening.height / 2 - (rect.top + rect.height / 2),
          };
        return result;
      }, {});
      setTargets({
        nodes,
        logo: {
          x: brand.left + brand.width / 2 - (logo.left + logo.width / 2),
          y: brand.top + brand.height / 2 - (logo.top + logo.height / 2),
        },
      });
      logoTargetX.set(
        brand.left + brand.width / 2 - (logo.left + logo.width / 2),
      );
      logoTargetY.set(
        brand.top + brand.height / 2 - (logo.top + logo.height / 2),
      );
    };
    let rafId = requestAnimationFrame(measureTargets);
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureTargets);
    });
    if (sceneRef.current) observer.observe(sceneRef.current);
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureTargets);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [introPhase, logoTargetX, logoTargetY]);

  const isInitializing = introPhase === "initializing";
  const isShockwaveOrAfter =
    introPhase === "shockwave" || introPhase === "ecosystem";
  const isEcosystem = introPhase === "ecosystem";

  return (
    <div
      ref={scrollAreaRef}
      className="bg-[#020305] selection:bg-blue-600 selection:text-white"
    >
      <div className="relative">
        <div
          ref={sceneRef}
          className="relative z-20 h-svh overflow-hidden font-sans antialiased bg-[#F8FAFC]"
        >
          <motion.div
            style={{ opacity: prefersReducedMotion ? 0 : lightBgOpacity }}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#F8FAFC]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-[radial-gradient(ellipse_65%_50%_at_50%_48%,rgba(191,219,254,0.55),transparent_70%)] blur-2xl opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_48%,#000_70%,transparent_100%)] opacity-70" />
          </motion.div>
          <motion.div
            style={{ opacity: prefersReducedMotion ? 1 : darkBgOpacity }}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#020305]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_46%,#071022_0%,#030711_52%,#020305_100%)]" />

            <motion.div
              style={{ scale: prefersReducedMotion ? 1 : darkCoreScale }}
              className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[580px] bg-[radial-gradient(circle_380px_at_50%_50%,rgba(37,99,235,0.24)_0%,rgba(14,165,233,0.12)_40%,rgba(99,102,241,0.05)_70%,transparent_100%)] blur-2xl opacity-90 origin-center"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(59,130,246,0.07)_0%,rgba(99,102,241,0.04)_50%,transparent_85%)] blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_46%,#000_30%,transparent_90%)] opacity-50" />

            <motion.svg
              style={{
                opacity: prefersReducedMotion ? 0.65 : orbitalCurvesOpacity,
              }}
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Concentric Soft Orbital Curves */}
              <ellipse
                cx="50%"
                cy="46%"
                rx="520"
                ry="310"
                fill="none"
                stroke="rgba(56, 189, 248, 0.05)"
                strokeWidth="1"
                strokeDasharray="3 8"
              />
              <ellipse
                cx="50%"
                cy="46%"
                rx="720"
                ry="430"
                fill="none"
                stroke="rgba(99, 102, 241, 0.04)"
                strokeWidth="1"
              />
              <ellipse
                cx="50%"
                cy="46%"
                rx="920"
                ry="550"
                fill="none"
                stroke="rgba(37, 99, 235, 0.03)"
                strokeWidth="1"
                strokeDasharray="2 12"
              />

              {/* Subtle Infrastructure Contour Waves */}
              <path
                d="M -100 260 C 350 180, 800 360, 1350 240 S 1950 320, 2300 260"
                fill="none"
                stroke="rgba(56, 189, 248, 0.035)"
                strokeWidth="1"
              />
              <path
                d="M -100 580 C 450 680, 950 500, 1450 620 S 1950 540, 2300 600"
                fill="none"
                stroke="rgba(99, 102, 241, 0.03)"
                strokeWidth="1"
              />
            </motion.svg>

            {/* Tiny Barely Visible Micro-Particles for Cinematic Depth */}
            <motion.div
              style={{
                opacity: prefersReducedMotion ? 1 : darkAtmosphereOpacity,
              }}
              className="absolute inset-0"
            >
              <div className="absolute top-[22%] left-[18%] h-1 w-1 rounded-full bg-sky-300/30 blur-[0.5px]" />
              <div className="absolute top-[32%] right-[22%] h-1.5 w-1.5 rounded-full bg-blue-400/25 blur-[0.5px]" />
              <div className="absolute top-[68%] left-[24%] h-1 w-1 rounded-full bg-indigo-300/25 blur-[0.5px]" />
              <div className="absolute top-[74%] right-[28%] h-1 w-1 rounded-full bg-sky-300/30 blur-[0.5px]" />
              <div className="absolute top-[18%] right-[38%] h-0.5 w-0.5 rounded-full bg-white/40" />
              <div className="absolute top-[82%] left-[42%] h-0.5 w-0.5 rounded-full bg-sky-200/40" />
              <div className="absolute top-[48%] left-[8%] h-1 w-1 rounded-full bg-blue-300/20 blur-[0.5px]" />
              <div className="absolute top-[52%] right-[10%] h-1 w-1 rounded-full bg-indigo-200/25 blur-[0.5px]" />
            </motion.div>
          </motion.div>

          <SiteNavigation
            opacity={navOpacity}
            brandTargetRef={brandTargetRef}
          />

          <div className="absolute inset-0 mx-auto w-full max-w-7xl px-4 sm:px-8">
            <motion.div
              style={{ opacity: fieldOpacity }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 sm:h-[380px] sm:w-[380px]"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 380 380"
                aria-hidden="true"
              >
                <circle
                  cx="190"
                  cy="190"
                  r="155"
                  fill="none"
                  stroke="rgba(56,189,248,0.18)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="165"
                  fill="none"
                  stroke="rgba(56,189,248,0.09)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle cx="190" cy="35" r="2" fill="#94A3B8" opacity="0.6" />
                <circle cx="190" cy="345" r="2" fill="#94A3B8" opacity="0.6" />
                <circle cx="35" cy="190" r="2" fill="#94A3B8" opacity="0.6" />
                <circle cx="345" cy="190" r="2" fill="#94A3B8" opacity="0.6" />
              </svg>
            </motion.div>
            <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
              <svg
                className="h-full w-full"
                viewBox="-50 -50 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="lineGradRest"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {isEcosystem &&
                  productNodes.map((node, index) => (
                    <NodePath
                      key={node.id}
                      node={node}
                      index={index}
                      ecosystemReveal={ecosystemReveal}
                      exitLength={networkLength}
                      exitOpacity={networkOpacity}
                    />
                  ))}
              </svg>
            </div>
            <div
              id="ecosystem"
              className="absolute inset-0 z-20 hidden md:block"
            >
              {isEcosystem &&
                productNodes.map((node, index) => (
                  <DesktopNode
                    key={node.id}
                    node={node}
                    index={index}
                    progress={animationProgress}
                    target={targets.nodes[node.id]}
                    nodeRef={(element) => {
                      desktopNodeRefs.current[node.id] = element;
                    }}
                  />
                ))}
            </div>

            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center">
              <AnimatePresence>
                {isShockwaveOrAfter && !prefersReducedMotion && (
                  <>
                    <motion.div
                      key="shockwave-primary"
                      initial={{ opacity: 0.85, scale: 0.82 }}
                      animate={{ opacity: 0, scale: 2.7 }}
                      transition={{ duration: 0.52, ease: [0.1, 0.9, 0.2, 1] }}
                      className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-blue-500/70"
                      style={{
                        boxShadow:
                          "0 0 35px rgba(37, 99, 235, 0.45), inset 0 0 20px rgba(37, 99, 235, 0.25)",
                      }}
                    />
                    <motion.div
                      key="shockwave-secondary"
                      initial={{ opacity: 0.72, scale: 0.86 }}
                      animate={{ opacity: 0, scale: 2.2 }}
                      transition={{
                        duration: 0.44,
                        delay: 0.035,
                        ease: [0.1, 0.8, 0.2, 1],
                      }}
                      className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-sky-400/80"
                    />
                    <motion.div
                      key="shockwave-flash"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{
                        opacity: [0, 0.72, 0.1],
                        scale: [0.6, 1.35, 1],
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/35 via-sky-300/25 to-blue-500/35 blur-3xl"
                    />
                  </>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isInitializing && !prefersReducedMotion && (
                  <motion.div
                    key="laser-orbit"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 0.7, 0], scale: [1, 1, 1.18] }}
                    exit={{
                      opacity: 0,
                      scale: 1.12,
                      transition: { duration: 0.1 },
                    }}
                    transition={{
                      opacity: { duration: 0.6, times: [0, 0.82, 1] },
                      scale: { duration: 0.6 },
                    }}
                    className="pointer-events-none absolute h-[340px] w-[340px] sm:h-[380px] sm:w-[380px]"
                  >
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 380 380"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="introLaserGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0061FF"
                            stopOpacity="0"
                          />
                          <stop
                            offset="40%"
                            stopColor="#0061FF"
                            stopOpacity="0.6"
                          />
                          <stop
                            offset="80%"
                            stopColor="#38BDF8"
                            stopOpacity="0.95"
                          />
                          <stop
                            offset="100%"
                            stopColor="#FFFFFF"
                            stopOpacity="1"
                          />
                        </linearGradient>
                        <filter
                          id="introLaserGlow"
                          x="-10%"
                          y="-10%"
                          width="120%"
                          height="120%"
                        >
                          <feDropShadow
                            dx="0"
                            dy="0"
                            stdDeviation="3"
                            floodColor="#0061FF"
                            floodOpacity="0.75"
                          />
                        </filter>
                      </defs>
                      <motion.g
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        style={{ transformOrigin: "190px 190px" }}
                      >
                        <motion.circle
                          cx="190"
                          cy="190"
                          r="155"
                          fill="none"
                          stroke="url(#introLaserGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          filter="url(#introLaserGlow)"
                          initial={{ pathLength: 0.15 }}
                          animate={{ pathLength: [0.15, 0.9, 1] }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <circle
                          cx="345"
                          cy="190"
                          r="4.5"
                          fill="#FFFFFF"
                          className="drop-shadow-[0_0_8px_#38BDF8]"
                        />
                        <circle cx="345" cy="190" r="2" fill="#FFFFFF" />
                      </motion.g>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                ref={logoRef}
                style={{
                  opacity: launchHatOpacity,
                  x: logoX,
                  y: logoY,
                  scale: logoScale,
                }}
                className="relative z-20 flex transform-gpu items-center justify-center will-change-transform"
              >
                <span
                  ref={hatOpeningRef}
                  className="pointer-events-none absolute left-1/2 top-[20%] h-3 w-12 -translate-x-1/2"
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: isShockwaveOrAfter
                      ? [1, 1.18, 0.98, 1.01, 1]
                      : [0.9, 1],
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: isShockwaveOrAfter
                      ? {
                          duration: 0.45,
                          times: [0, 0.25, 0.55, 0.8, 1],
                          ease: "easeOut",
                        }
                      : { duration: 0.4, ease: "easeOut" },
                  }}
                  className="relative h-52 w-40 drop-shadow-lg sm:h-64 sm:w-48"
                >
                  <Image
                    src="/logo.svg"
                    alt="Rabbitt Ai"
                    width={208}
                    height={277}
                    priority
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>

            <motion.section
              style={{ opacity: referenceHeroOpacity }}
              className="absolute left-1/2 top-0 z-40 h-full w-screen -translate-x-1/2 bg-[#020305] pt-[4.5rem]"
              aria-label="Rabbitt Ai enterprise data solutions"
            >
              <ReferenceHero />
            </motion.section>

            <div className="absolute inset-x-4 bottom-7 z-20 grid grid-cols-2 gap-2.5 md:hidden">
              {isEcosystem &&
                productNodes.map((node, index) => (
                  <MobileNode
                    key={node.id}
                    node={node}
                    index={index}
                    progress={animationProgress}
                    target={targets.nodes[node.id]}
                    nodeRef={(element) => {
                      mobileNodeRefs.current[node.id] = element;
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReferenceHero() {
  const productNames = [
    "IcyPluto",
    "Drip",
    "Cloud Watcher",
    "ChanceRAG",
    "OnSkill",
  ];

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#020305] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_46%_72%_at_76%_54%,rgba(30,77,147,0.13),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,transparent,rgba(5,12,23,0.92))]" />

      <div className="relative z-10 grid w-full flex-1 grid-cols-1 items-center px-6 pb-7 pt-8 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-16 xl:px-[5.75rem]">
        <div className="relative z-20 max-w-[43rem] pt-5 lg:pt-0">
          <h2 className="max-w-[42rem] text-[clamp(2.55rem,4.8vw,5.35rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#f6f7fb]">
            <span className="bg-gradient-to-r from-[#7ec5ff] via-[#2f80ed] to-[#0052ff] bg-clip-text text-transparent">
              Own your data,
              <br />
              own your AI.
            </span>
          </h2>
          <p className="mt-7 max-w-[31rem] text-[clamp(0.95rem,1.25vw,1.2rem)] leading-[1.62] tracking-[-0.025em] text-[#c0c4cf]">
            Rabbitt Ai transforms your enterprise data into reliable Generative
            AI solutions that drive measurable impact — securely and at scale.
          </p>
          <a
            href="#solutions"
            className="mt-8 inline-flex items-center gap-4 rounded-xl bg-[#f7f8fb] px-6 py-4 text-[0.96rem] font-medium text-[#080a0e] shadow-[0_8px_26px_rgba(255,255,255,0.12)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Solutions{" "}
            <span className="text-xl leading-none" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <ArchitecturalDoorway />
      </div>

      <div className="relative z-20 border-t border-white/[0.07] bg-[#010204]/78 px-6 py-5 backdrop-blur-sm sm:px-10 lg:px-16 xl:px-[5.25rem]">
        <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center">
          <p className="shrink-0 border-white/[0.2] text-[0.68rem] font-medium uppercase leading-[1.45] tracking-[0.16em] text-[#aeb4c1] sm:mr-8 sm:border-r sm:pr-8">
            Explore our
            <br />
            products
          </p>
          <div className="grid flex-1 grid-cols-3 items-center gap-x-7 gap-y-3 text-center sm:grid-cols-5 sm:gap-x-6 lg:gap-x-10">
            {productNames.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap text-[clamp(1rem,1.75vw,1.55rem)] font-medium tracking-[-0.06em] text-[#717785] last:tracking-[-0.08em]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitecturalDoorway() {
  return (
    <div className="pointer-events-none relative order-first -mb-8 h-[34vh] min-h-[15rem] sm:h-[39vh] lg:order-none lg:mb-0 lg:h-[min(68vh,44rem)]">
      <div
        className="absolute inset-[-10%_-8%_-8%_0] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 42% 62% at 72% 61%, rgba(35, 122, 255, 0.27), transparent 73%)",
        }}
      />
      <div className="absolute bottom-[8%] right-[16%] h-[73%] w-[33%] min-w-[10rem] bg-[linear-gradient(90deg,rgba(56,75,99,0.22),rgba(8,13,21,0.84)_17%,rgba(19,30,46,0.92)_82%,rgba(3,6,11,0.95))] shadow-[-18px_0_42px_rgba(98,157,255,0.11)]" />
      <div className="absolute bottom-[8%] right-[16%] h-[73%] w-[33%] min-w-[10rem] border-l border-white/[0.08] border-t border-white/[0.045]" />
      <div className="absolute bottom-[8%] right-[16%] h-[44%] w-[13%] min-w-[4rem] rounded-tl-[5rem] border-l border-t border-[#8ec5ff]/70 bg-[radial-gradient(ellipse_at_100%_100%,rgba(25,100,218,0.85),rgba(14,43,94,0.76)_54%,rgba(3,9,19,0.9)_76%)] shadow-[-10px_0_29px_rgba(50,137,255,0.6),inset_-3px_0_16px_rgba(151,205,255,0.4)]" />
      <div className="absolute bottom-[8%] right-[16%] h-[43.8%] w-[13.15%] min-w-[4rem] rounded-tl-[5rem] border-l border-t border-white/45" />
      <div className="absolute bottom-[7.6%] right-[14.2%] h-[2px] w-[13.7%] min-w-[4.25rem] bg-[#d8efff] blur-[0.3px] shadow-[0_0_12px_3px_rgba(83,160,255,0.85)]" />
      <motion.svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 720 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="doorway-pulse-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* No base stroke is rendered: this is a short travelling light trail only. */}
        <motion.path
          d="M 54 450 C 180 370 360 432 486 388 C 548 367 584 330 570 306"
          pathLength="1"
          fill="none"
          stroke="#dff3ff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="0.12 0.88"
          filter="url(#doorway-pulse-glow)"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.08, 0.9, 1],
          }}
        />
        <motion.circle
          cx="570"
          cy="306"
          r="5"
          fill="#e6f6ff"
          filter="url(#doorway-pulse-glow)"
          animate={{ opacity: [0, 0, 1, 0], scale: [0.4, 0.4, 1.35, 1.75] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.72, 0.88, 1],
          }}
        />
      </motion.svg>
      <div className="absolute inset-x-[-10%] bottom-0 h-[40%] bg-[radial-gradient(ellipse_57%_31%_at_75%_100%,rgba(48,105,180,0.26),transparent_72%)]" />
    </div>
  );
}

// NodePath: renders one connector line.
// Entry: shoots from hat (pathLength 0→1) with per-node stagger driven by ecosystemReveal.
// Exit: pathLength is multiplied by exitLength so it shrinks as the intro animation plays.
function NodePath({
  node,
  index,
  ecosystemReveal,
  exitLength,
  exitOpacity,
}: {
  node: ProductNode;
  index: number;
  ecosystemReveal: MotionValue<number>;
  exitLength: MotionValue<number>;
  exitOpacity: MotionValue<number>;
}) {
  // Stagger: node i starts drawing at (i * 0.09) on the 0→1 clock, finishes at (i * 0.09 + 0.48)
  const start = index * 0.09;
  const end = Math.min(1, start + 0.48);
  const entryLength = useTransform(ecosystemReveal, [start, end], [0, 1], {
    clamp: true,
  });

  // Combined pathLength: entry shoots it out, exit pulls it back as intro progresses
  const pathLength = useTransform(
    [entryLength, exitLength] as const,
    ([entry, exit]) => (entry as number) * (exit as number),
  );

  // Opacity fades in with entry (first 30% of its window) and out with exit
  const entryOpacity = useTransform(entryLength, [0, 0.3], [0, 0.85], {
    clamp: true,
  });
  const opacity = useTransform(
    [entryOpacity, exitOpacity] as const,
    ([entry, exit]) => Math.min(entry as number, exit as number),
  );

  return (
    <motion.path
      d={nodePath(node)}
      fill="none"
      stroke="url(#lineGradRest)"
      strokeWidth="0.22"
      strokeDasharray="0.6 0.6"
      style={{ pathLength, opacity }}
    />
  );
}

function DesktopNode({
  node,
  index,
  progress,
  target,
  nodeRef,
}: {
  node: ProductNode;
  index: number;
  progress: MotionValue<number>;
  target?: Point;
  nodeRef: (element: HTMLDivElement | null) => void;
}) {
  const x = useTransform(
    progress,
    [0, 0.2, 0.45],
    [0, (target?.x ?? 0) * 0.22 * (index % 2 ? -1 : 1), target?.x ?? 0],
  );
  const y = useTransform(
    progress,
    [0, 0.2, 0.45],
    [0, (target?.y ?? 0) * 0.2 - (index % 2 ? 28 : -28), target?.y ?? 0],
  );
  const scale = useTransform(progress, [0.12, 0.45], [1, 0.18]);
  const opacity = useTransform(progress, [0.28, 0.48], [1, 0]);
  return (
    <motion.div
      ref={nodeRef}
      style={{
        left: `calc(50% + ${node.pos.desktop.x}%)`,
        top: `calc(50% + ${node.pos.desktop.y}%)`,
        x,
        y,
        scale,
        opacity,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.72, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.36,
          delay: 0.43 + index * 0.035,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <NodeCard node={node} />
      </motion.div>
    </motion.div>
  );
}

function MobileNode({
  node,
  index,
  progress,
  target,
  nodeRef,
}: {
  node: ProductNode;
  index: number;
  progress: MotionValue<number>;
  target?: Point;
  nodeRef: (element: HTMLDivElement | null) => void;
}) {
  const x = useTransform(
    progress,
    [0, 0.2, 0.45],
    [0, (target?.x ?? 0) * 0.25 * (index % 2 ? -1 : 1), target?.x ?? 0],
  );
  const y = useTransform(
    progress,
    [0, 0.2, 0.45],
    [0, (target?.y ?? 0) * 0.2 - (index % 2 ? 18 : -18), target?.y ?? 0],
  );
  const scale = useTransform(progress, [0.12, 0.45], [1, 0.14]);
  const opacity = useTransform(progress, [0.28, 0.48], [1, 0]);
  return (
    <motion.div
      ref={nodeRef}
      style={{ x, y, scale, opacity }}
      className="will-change-transform"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.38,
          delay: 0.1 + index * 0.045,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <NodeCard node={node} compact />
      </motion.div>
    </motion.div>
  );
}

function NodeCard({
  node,
  compact = false,
}: {
  node: ProductNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md ${compact ? "gap-3 p-3 shadow-xs" : "gap-4 px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"}`}
    >
      <div
        className={`${compact ? "h-10 w-10" : "h-14 w-14"} relative flex shrink-0 items-center justify-center`}
      >
        <Image
          src={node.src}
          alt={node.name}
          width={56}
          height={56}
          className="h-full w-full object-contain"
        />
      </div>
      <span
        className={`${compact ? "text-xs" : "text-[15px]"} whitespace-nowrap pr-1 font-semibold tracking-tight text-slate-800`}
      >
        {node.name}
      </span>
      <div className="h-1.5 w-1.5 rounded-full bg-blue-500/70" />
    </div>
  );
}
