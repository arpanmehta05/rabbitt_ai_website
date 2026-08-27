"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
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

type Point = { x: number; y: number };
type NodeTargets = Record<string, Point>;

function nodePath(node: ProductNode) {
  return `M 0 -7.3 C ${node.curveControl.cx1} ${node.curveControl.cy1}, ${node.curveControl.cx2} ${node.curveControl.cy2}, ${node.pos.desktop.x} ${node.pos.desktop.y}`;
}

export default function LandingExperience() {
  const prefersReducedMotion = useReducedMotion();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hatOpeningRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandTargetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleTargetRef = useRef<HTMLDivElement>(null);
  const navTitleTargetRef = useRef<HTMLDivElement>(null);
  const desktopNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobileNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Motion values for the nav-title target delta (set in measureTargets, reactive to useTransform)
  const navTitleDeltaX = useMotionValue(0);
  const navTitleDeltaY = useMotionValue(0);
  const [targets, setTargets] = useState<{
    nodes: NodeTargets;
    logo: Point;
    title: Point;
  }>({ nodes: {}, logo: { x: 0, y: 0 }, title: { x: 0, y: 0 } });
  const [introPhase, setIntroPhase] = useState<
    "initializing" | "shockwave" | "ecosystem"
  >(prefersReducedMotion ? "ecosystem" : "initializing");
  const [transitionComplete, setTransitionComplete] = useState(
    prefersReducedMotion ?? false,
  );
  const [textCompleted, setTextCompleted] = useState(
    prefersReducedMotion ?? false,
  );
  const [blurRevealActive, setBlurRevealActive] = useState(
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
  const navOpacity = useTransform(animationProgress, [0.48, 0.7], [0, 1]);
  // Motion values for animation targets — set imperatively in measureTargets
  // so useTransform always picks up the latest value reactively.
  const logoTargetX = useMotionValue(0);
  const logoTargetY = useMotionValue(0);
  const titleTargetX = useMotionValue(0);
  const titleTargetY = useMotionValue(0);

  const logoX = useTransform(
    [animationProgress, logoTargetX] as const,
    ([p, tx]) => {
      const t = Math.max(0, Math.min(1, ((p as number) - 0.45) / (0.72 - 0.45)));
      return t * (tx as number);
    },
  );
  const logoY = useTransform(
    [animationProgress, logoTargetY] as const,
    ([p, ty]) => {
      const t = Math.max(0, Math.min(1, ((p as number) - 0.45) / (0.72 - 0.45)));
      return t * (ty as number);
    },
  );
  const logoScale = useTransform(animationProgress, [0.43, 0.72], [1, 0.22]);
  const titleX = useTransform(
    [animationProgress, titleTargetX] as const,
    ([p, tx]) => {
      const t = Math.max(0, Math.min(1, ((p as number) - 0.5) / (0.82 - 0.5)));
      return t * (tx as number);
    },
  );
  const titleY = useTransform(
    [animationProgress, titleTargetY] as const,
    ([p, ty]) => {
      const t = Math.max(0, Math.min(1, ((p as number) - 0.5) / (0.82 - 0.5)));
      return t * (ty as number);
    },
  );
  const titleScale = useTransform(animationProgress, [0.5, 0.82], [1, 1.15]);
  const titleOpacity = useTransform(
    animationProgress,
    [0.42, 0.64],
    [1, 0],
  );

  // Stable, non-measured destinations for the finished hero and navbar brand.
  // Keeping these outside the scaled launch elements prevents their targets
  // from drifting when the animation itself changes the element's dimensions.
  const heroTitleOpacity = useTransform(
    animationProgress,
    [0.58, 0.82],
    [0, 1],
  );
  const launchHatOpacity = useTransform(animationProgress, [0.48, 0.7], [1, 0]);

  // Second screen: fades in exactly in sync with the Rabbitt AI title (no delay)
  const secondScreenOpacity = useTransform(
    animationProgress,
    [0.48, 0.72, 0.88],
    [0, 0, 1],
  );

  // Post-intro scroll phase: "Rabbitt AI" moves into the navbar, second-screen content scrolls up
  const { scrollY } = useScroll();
  const postScrollProgress = useTransform(scrollY, [0, 550], [0, 1], {
    clamp: true,
  });
  const heroTitlePostOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const navBrandTitleOpacity = useTransform(
    postScrollProgress,
    [0.55, 1],
    [0, 1],
  );
  // Rabbitt AI title: translate toward navTitleTargetRef (measured in measureTargets)
  const postTitleX = useTransform(
    [postScrollProgress, navTitleDeltaX] as const,
    ([p, dx]) => (p as number) * (dx as number),
  );
  const postTitleY = useTransform(
    [postScrollProgress, navTitleDeltaY] as const,
    ([p, dy]) => (p as number) * (dy as number),
  );
  // Scale from current intro scale (1.15) down to navbar brand size
  const postTitleScale = useTransform(postScrollProgress, [0, 1], [1, 0.26]);
  // Second-screen text scrolls up at 1:1 with window scroll and fades out slightly
  const secondScreenPostY = useTransform(scrollY, [0, 550], [0, -420]);
  const secondScreenPostOpacity = useTransform(
    scrollY,
    [0, 350, 550],
    [1, 0.5, 0],
  );

  // Scroll-driven Background Transformation:
  // 0.00: 100% Light Technical Canvas
  // 0.25: Light canvas begins cooling down with subtle blue aura
  // 0.50: Deep midnight blue & expanding electric core glow emerges
  // 0.75: Mostly midnight navy
  // 1.00: Full dark AI infrastructure atmosphere
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

  // Reset scroll to top on page refresh/load to ensure clean initial hero animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
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

  // When ecosystem phase starts, animate the line-reveal clock 0→1 linearly.
  // Each NodePath maps its stagger window on this value for the "shoot from hat" entry.
  useEffect(() => {
    if (prefersReducedMotion || introPhase !== "ecosystem") return;
    const controls = animate(ecosystemReveal, 1, {
      duration: 1.1,
      ease: "linear",
    });
    return () => controls.stop();
  }, [introPhase, prefersReducedMotion, ecosystemReveal]);

  useEffect(() => {
    if (prefersReducedMotion || introPhase !== "ecosystem") return;

    let controls: ReturnType<typeof animate> | undefined;
    const startTransition = window.setTimeout(() => {
      controls = animate(sequenceProgress, 1, {
        duration: 4,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => setTransitionComplete(true),
      });
    }, 1900);

    return () => {
      window.clearTimeout(startTransition);
      controls?.stop();
    };
  }, [introPhase, prefersReducedMotion, sequenceProgress]);

  // Trigger word-blur reveal as soon as animationProgress crosses 0.85
  // (same moment the Rabbitt AI heading is fully visible) — no timer lag
  useMotionValueEvent(animationProgress, "change", (value) => {
    if (value >= 0.85) {
      setBlurRevealActive(true);
      setTransitionComplete(true);
    } else if (value < 0.72) {
      setBlurRevealActive(false);
      setTextCompleted(false);
    }
  });

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
      const title = titleRef.current?.getBoundingClientRect();
      const titleTarget = titleTargetRef.current?.getBoundingClientRect();
      if (!opening || !logo || !brand || !title || !titleTarget) return;
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
        title: {
          x:
            titleTarget.left +
            titleTarget.width / 2 -
            (title.left + title.width / 2),
          y:
            titleTarget.top +
            titleTarget.height / 2 -
            (title.top + title.height / 2),
        },
      });
      // Keep the actual animated values in sync with the measured destinations.
      // The previous scroll change left these values at zero, so neither the hat
      // nor the title could leave the centre of the hero.
      logoTargetX.set(
        brand.left + brand.width / 2 - (logo.left + logo.width / 2),
      );
      logoTargetY.set(
        brand.top + brand.height / 2 - (logo.top + logo.height / 2),
      );
      titleTargetX.set(
        titleTarget.left +
          titleTarget.width / 2 -
          (title.left + title.width / 2),
      );
      titleTargetY.set(
        titleTarget.top +
          titleTarget.height / 2 -
          (title.top + title.height / 2),
      );
      // Compute delta for post-scroll: from titleTargetRef center to navTitleTargetRef center
      const navTitleTarget = navTitleTargetRef.current?.getBoundingClientRect();
      if (navTitleTarget) {
        navTitleDeltaX.set(
          navTitleTarget.left +
            navTitleTarget.width / 2 -
            (titleTarget.left + titleTarget.width / 2),
        );
        navTitleDeltaY.set(
          navTitleTarget.top +
            navTitleTarget.height / 2 -
            (titleTarget.top + titleTarget.height / 2),
        );
      }
    };
    // Use rAF so measurement always runs after the browser has finished layout/paint
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
  }, [
    introPhase,
    logoTargetX,
    logoTargetY,
    navTitleDeltaX,
    navTitleDeltaY,
    titleTargetX,
    titleTargetY,
  ]);

  const isInitializing = introPhase === "initializing";
  const isShockwaveOrAfter =
    introPhase === "shockwave" || introPhase === "ecosystem";
  const isEcosystem = introPhase === "ecosystem";

  return (
    <div
      ref={scrollAreaRef}
      className="bg-[#030712] selection:bg-blue-600 selection:text-white"
    >
      {/* Hero — sticky so it stays fixed while the post-intro scroll phase plays out */}
      <div
        ref={sceneRef}
        className="relative sticky top-0 h-svh overflow-hidden transform-gpu font-sans antialiased bg-[#F8FAFC]"
      >
        {/* Layer 1: Initial Bright Technical Canvas (Visible at rest 0%, fades on scroll) */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0 : lightBgOpacity }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#F8FAFC]"
        >
          {/* Soft Central Radial Blue Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-[radial-gradient(ellipse_65%_50%_at_50%_48%,rgba(191,219,254,0.55),transparent_70%)] blur-2xl opacity-80" />

          {/* Fine Technical Grid across viewport (10% darker definition) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_48%,#000_70%,transparent_100%)] opacity-70" />
        </motion.div>

        {/* Layer 2: Progressive Dark Midnight Blue / Indigo Atmosphere (Reveals as scroll progresses) */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : darkBgOpacity }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#030712]"
        >
          {/* Base Midnight Navy to Deep Indigo Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_46%,#070E28_0%,#04091A_50%,#02050E_100%)]" />

          {/* Soft Electric-Blue Atmospheric Radial Glow expanding from Rabbitt Core */}
          <motion.div
            style={{ scale: prefersReducedMotion ? 1 : darkCoreScale }}
            className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[580px] bg-[radial-gradient(circle_380px_at_50%_50%,rgba(37,99,235,0.24)_0%,rgba(14,165,233,0.12)_40%,rgba(99,102,241,0.05)_70%,transparent_100%)] blur-2xl opacity-90 origin-center"
          />

          {/* Secondary Ambient Indigo/Purple Depth Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(59,130,246,0.07)_0%,rgba(99,102,241,0.04)_50%,transparent_85%)] blur-3xl pointer-events-none" />

          {/* Ultra-Subtle Technical Micro-Grid with Smooth Radial Mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_46%,#000_30%,transparent_90%)] opacity-50" />

          {/* Faint Flowing Contour Wave Lines & Soft Orbital Curves */}
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

        <motion.nav
          style={{ opacity: navOpacity }}
          className="absolute inset-x-0 top-0 z-50 flex h-20 items-center px-5 sm:px-8"
          aria-label="Main navigation"
        >
          <div
            ref={brandTargetRef}
            className="h-10 w-10 shrink-0"
            aria-hidden="true"
          >
            <motion.div
              style={{ opacity: navOpacity }}
              className="h-full w-full"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </motion.div>
          </div>
          {/* Measurement target: where "Rabbitt AI" text lands in the navbar on scroll */}
          <div
            ref={navTitleTargetRef}
            className="ml-3 h-8 w-28 shrink-0"
            aria-hidden="true"
          >
            <motion.span
              style={{ opacity: navBrandTitleOpacity }}
              className="block whitespace-nowrap pt-1 text-xl font-bold tracking-tight text-white"
            >
              Rabbitt AI
            </motion.span>
          </div>
          <div className="ml-auto hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            <a
              href="#ecosystem"
              className="transition-colors hover:text-blue-400"
            >
              Ecosystem
            </a>
            <a href="#about" className="transition-colors hover:text-blue-400">
              About
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-blue-400"
            >
              Contact
            </a>
          </div>
        </motion.nav>

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
          <div id="ecosystem" className="absolute inset-0 z-20 hidden md:block">
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
                    animate={{ opacity: [0, 0.72, 0.1], scale: [0.6, 1.35, 1] }}
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
                        <stop offset="0%" stopColor="#0061FF" stopOpacity="0" />
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
              style={{ opacity: launchHatOpacity, x: logoX, y: logoY, scale: logoScale }}
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
                  alt="Rabbitt AI"
                  width={208}
                  height={277}
                  priority
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </motion.div>
            {/* Post-scroll outer wrapper: moves "Rabbitt AI" into the navbar on scroll */}
            <motion.div
              style={{ x: postTitleX, y: postTitleY, scale: postTitleScale }}
              className="origin-left transform-gpu will-change-transform"
            >
              <motion.div
                ref={titleRef}
                style={{
                  x: titleX,
                  y: titleY,
                  scale: titleScale,
                  opacity: titleOpacity,
                }}
                className="relative z-20 mt-6 origin-center transform-gpu will-change-transform"
              >
                <h1 className="select-none bg-gradient-to-r from-[#7EC5FF] via-[#2F80ED] to-[#0052FF] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl">
                  Rabbitt AI
                </h1>
              </motion.div>
            </motion.div>
          </div>

          {/* The final hero title has a stable canvas position. It stays clear of
              the copy, then yields to the navbar label as the page scrolls. */}
          <motion.h1
            style={{ opacity: heroTitleOpacity }}
            className="pointer-events-none absolute inset-x-4 top-[18%] z-20 text-center text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-[#7EC5FF] via-[#2F80ED] to-[#0052FF] bg-clip-text drop-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <motion.span style={{ opacity: heroTitlePostOpacity }}>
              Rabbitt AI
            </motion.span>
          </motion.h1>

          {/* Second-screen content — tied to animationProgress + post-scroll */}
          <motion.div
            style={{
              opacity: secondScreenOpacity,
              y: secondScreenPostY,
            }}
            className="pointer-events-none absolute inset-x-4 top-[10%] z-10 flex flex-col items-center text-center sm:inset-x-8 sm:top-[12%] md:top-[14%]"
          >
            <motion.div style={{ opacity: secondScreenPostOpacity }}>
              <div
                ref={titleTargetRef}
                className="mx-auto h-28 max-w-2xl sm:h-32 md:h-36"
                aria-hidden="true"
              />
              <h2
                id="about"
                className="mx-auto mt-6 text-2xl font-bold tracking-tight text-white drop-shadow-xs sm:mt-8 sm:text-3xl md:text-4xl"
              >
                Own your AI, Own your Data
              </h2>
              <WordBlurReveal
                text="Rabbitt.AI taps into the full potential of enterprise data to develop reliable, scalable, and intelligent Generative AI solutions that transform complex business information into actionable insights, streamline operations, and deliver measurable value you can count on."
                active={blurRevealActive || (prefersReducedMotion ?? false)}
                onComplete={() => setTextCompleted(true)}
              />

              {/* Next Part Preview appears ONLY after the text blur completion */}
              <AnimatePresence>
                {(textCompleted || prefersReducedMotion) && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto mt-8 flex flex-col items-center gap-2.5 sm:mt-10"
                  >
                    {/* Animated Down Arrow Icon */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-sky-400 backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.25)] animate-bounce">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>

                    {/* Next Section Title & Description */}
                    <h3 className="text-sm font-semibold tracking-tight text-slate-200 sm:text-base md:text-lg">
                      Enterprise AI Infrastructure
                    </h3>
                    <p className="max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
                      Deploy sovereign models, unified pipelines, and scalable
                      enterprise intelligence with complete data privacy.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {/* end secondScreenPostOpacity */}
          </motion.div>

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

      {/* Next section — placeholder height so the sticky hero has room to scroll through the post-intro phase */}
      <div className="relative min-h-screen bg-[#030712]" id="next-section">
        {/* Future content goes here */}
      </div>
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

function WordBlurReveal({
  text,
  active,
  onComplete,
}: {
  text: string;
  active: boolean;
  onComplete?: () => void;
}) {
  const words = React.useMemo(() => text.split(" "), [text]);
  const prefersReduced = useReducedMotion();

  return (
    <motion.p
      className="mx-auto mt-6 max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed tracking-normal text-slate-300/90 [text-shadow:_0_0_12px_rgba(56,189,248,0.18)]"
      initial="hidden"
      animate={active || prefersReduced ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.035, delayChildren: 0.12 }}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <motion.span
            key={`${word}-${index}`}
            variants={{
              hidden: {
                opacity: 0,
                filter: "blur(10px)",
              },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.35,
                  ease: [0.2, 0.65, 0.3, 0.9],
                },
              },
            }}
            onAnimationComplete={() => {
              if (isLastWord && active && onComplete) {
                onComplete();
              }
            }}
            className="inline-block mr-[0.32em] will-change-[filter,opacity]"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.p>
  );
}
