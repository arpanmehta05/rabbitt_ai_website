"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

// The products as a grid of plain dark cards, after the one on adobe.com. At rest a card is flat:
// a small icon at the top, a name and one line at the bottom. Under the pointer a picture fades in
// behind the text. The three columns start at different heights and settle into a row as the grid
// scrolls into view.

type Item = {
  name: string;
  detail: string;
  href: string;
  icon: ReactNode;
  // on hover the card turns this colour and shows the product's logo large
  accent?: string;
  logoSrc?: string;
  dark?: boolean;
};

const tile = "grid h-11 w-11 place-items-center rounded-[10px] bg-white p-1.5";
const logo = (src: string) => <Image src={src} alt="" width={36} height={36} className="max-h-full max-w-full object-contain" />;

const items: Item[] = [
  { name: "IcyPluto", detail: "Unified platform for marketing automation and growth.", href: "https://new.icypluto.com/", icon: <span className={tile}>{logo("/Icypluto.svg")}</span>, accent: "#6d4aff", logoSrc: "/Icypluto.svg" },
  { name: "DRIP", detail: "Adaptive learning experiences for modern teams.", href: "https://drip.rabbitt.ai/", icon: <span className={tile}>{logo("/drip.svg")}</span>, accent: "#0061ff", logoSrc: "/drip.svg" },
  { name: "RAW", detail: "Optimise your AI agents for accuracy and cost.", href: "https://raw.rabbitt.ai/", icon: <span className={tile}>{logo("/logo.svg")}</span>, accent: "#1a47d6", logoSrc: "/logo.svg" },
  { name: "OnSkill", detail: "Workforce competency and skill management.", href: "https://onskill.org/", icon: <span className={`${tile} !bg-[#0a1636]`}>{logo("/onskill.svg")}</span>, accent: "#0a1636", logoSrc: "/onskill.svg", dark: true },
  { name: "Cloud Watcher", detail: "Cloud cost, health and operations intelligence.", href: "https://cloudwatcher.rabbitt.ai/", icon: <span className={tile}>{logo("/cloudwatcher.svg")}</span>, accent: "#0b6fe0", logoSrc: "/cloudwatcher.svg" },
  { name: "Ping U", detail: "Intelligent notifications and incident coordination when the signal matters.", href: "https://www.pingme.rabbitt.ai/", icon: <span className={tile}>{logo("/pingu-light.svg")}</span>, accent: "#e8408f", logoSrc: "/pingu-light.svg" },
  { name: "ChanceRAG", detail: "Retrieval you can trust, grounded in your own documents.", href: "/chancerag", icon: <span className={tile}>{logo("/chance.svg")}</span>, accent: "#0061ff", logoSrc: "/chance.svg" },
  { name: "Services", detail: "Content, video, training and data annotation from the Rabbitt team.", href: "/services/content-strategy", icon: <span className={`${tile} !bg-[#0061ff] text-white`}><Layers className="h-5 w-5" /></span>, accent: "#0061ff" },
  { name: "All products", detail: "See everything Rabbitt AI builds.", href: "/products", icon: <ArrowRight className="h-6 w-6 text-white" /> },
];

// each column starts this many pixels lower and rises to its place
const LIFT = [0, 56, 112];

function Card({ item, col, progress }: { item: Item; col: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [LIFT[col], 0]);
  const external = item.href.startsWith("http");
  const cls = "group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#161616] p-7 outline-none focus-visible:ring-2 focus-visible:ring-[#4d9bff] md:min-h-[360px]";

  const body = (
    <>
      {item.accent && (
        <>
          <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ background: item.accent }} />
        </>
      )}
      {item.accent ? (
        // the icon is a tile in the corner; on hover it bounces out to the middle of the card and grows into the big logo
        <span
          className={`absolute left-7 top-7 z-10 grid h-11 w-11 place-items-center rounded-[10px] p-1.5 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.7,0.64,1)] group-hover:left-1/2 group-hover:top-[40%] group-hover:h-[132px] group-hover:w-[132px] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:rounded-[30px] group-hover:p-6 group-focus-visible:left-1/2 group-focus-visible:top-[40%] group-focus-visible:h-[132px] group-focus-visible:w-[132px] group-focus-visible:-translate-x-1/2 group-focus-visible:-translate-y-1/2 ${item.dark ? "bg-[#05060a]" : "bg-white"}`}
        >
          {item.logoSrc ? <Image src={item.logoSrc} alt="" width={96} height={96} className="max-h-full max-w-full object-contain" /> : <Layers className="h-5 w-5 text-[#0061ff] transition-all duration-[800ms] group-hover:h-14 group-hover:w-14" />}
        </span>
      ) : (
        <div className="relative z-10">{item.icon}</div>
      )}
      <div className="h-11" aria-hidden />
      <div className="relative z-10">
        <h3 className="text-[2rem] font-normal leading-none tracking-[-0.015em] text-white" style={{ fontFamily: "var(--font-serif-display), 'Times New Roman', serif" }}>
          {item.name}
        </h3>
        <p className="mt-3 max-w-[34ch] text-[15px] leading-snug text-white/60 transition-colors duration-500 group-hover:text-white">{item.detail}</p>
      </div>
    </>
  );

  return (
    <motion.div style={{ y }} className="h-full">
      {external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {body}
        </a>
      ) : (
        <Link href={item.href} className={cls}>
          {body}
        </Link>
      )}
    </motion.div>
  );
}

export default function Products() {
  const reduce = useReducedMotion();
  const grid = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: grid, offset: ["start end", "start 35%"] });
  const still = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? still : scrollYProgress;

  return (
    <section id="products" aria-labelledby="products-title" className="bg-black px-5 py-24 text-white sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#4d9bff]">Products</p>
            <h2 id="products-title" className="mt-4 max-w-[20ch] text-[clamp(2.4rem,5.4vw,4.4rem)] font-normal leading-[1] tracking-[-0.02em]" style={{ fontFamily: "var(--font-serif-display), 'Times New Roman', serif" }}>
              Built to run <span className="italic text-[#4d9bff]">in your cloud</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[16px] leading-relaxed text-white/55">Every Rabbitt product is private by design. Pick one up, or put them together.</p>
        </div>

        <div ref={grid} className="grid gap-4 pb-28 sm:grid-cols-2 lg:grid-cols-3 lg:pb-0">
          {items.map((item, i) => (
            <Card key={item.name} item={item} col={i % 3} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}
