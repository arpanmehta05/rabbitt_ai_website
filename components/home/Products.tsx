"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products, type Product } from "./productsData";

const isExternal = (href: string) => href.startsWith("http");

function Mark({ product }: { product: Product }) {
  const size = "h-auto max-h-14 w-auto max-w-[8.5rem] object-contain object-left sm:max-h-[4.5rem] sm:max-w-[10.5rem]";
  const fade = "opacity-90 transition duration-500 group-hover:opacity-100";
  if (product.logo) {
    return (
      <span className="flex origin-left items-center" style={{ transform: `scale(${product.logoScale ?? 1})` }}>
        <Image
          src={product.logoLight ?? product.logo}
          alt=""
          width={240}
          height={96}
          className={`${size} ${fade} ${product.logoLight ? "dark:hidden" : ""}`}
        />
        {product.logoLight && (
          <Image src={product.logo} alt="" width={240} height={96} className={`${size} ${fade} hidden dark:block`} />
        )}
      </span>
    );
  }
  return (
    <span
      className="grid h-14 w-14 place-items-center rounded-2xl text-2xl font-semibold"
      style={{ background: `${product.accent}1f`, color: product.accent }}
    >
      {product.name.charAt(0)}
    </span>
  );
}

// the row's colour pools under the pointer, like a light moving across a page
function follow(e: MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

function Row({ product, index, reduce }: { product: Product; index: number; reduce: boolean | null }) {
  const className = "group relative block px-1 py-8 sm:py-10 lg:px-4";
  const body = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--mx, 30%) var(--my, 50%), ${product.accent}1c, transparent 70%)`,
        }}
      />

      <span className="relative grid items-center gap-x-8 gap-y-4 sm:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1.2fr)_minmax(0,1fr)_1.75rem]">

        <span className="flex h-[4.5rem] items-center">
          <Mark product={product} />
        </span>

        <span
          className="text-[clamp(2.2rem,4vw,4rem)] font-light leading-none tracking-[-0.045em] text-[#05060a] dark:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </span>

        <span className="max-w-sm text-[15px] leading-snug text-black/55 dark:text-white/55 sm:text-base">
          {product.detail}
        </span>

        <ArrowUpRight
          className="hidden h-6 w-6 -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 lg:block"
          style={{ color: product.accent }}
        />
      </span>

      {/* the row's own colour, drawn along its underline on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        style={{ background: product.accent }}
      />
    </>
  );

  return (
    <motion.li
      onMouseMove={follow}
      className="border-b border-black/[0.1] dark:border-white/[0.12]"
      {...(reduce
        ? {}
        : {
            initial: { opacity: 0, y: 22 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-40px" },
            transition: { duration: 0.65, delay: 0.04 * (index % 3), ease: [0.16, 1, 0.3, 1] as const },
          })}
    >
      {isExternal(product.href) ? (
        <a href={product.href} target="_blank" rel="noopener noreferrer" className={className}>
          {body}
        </a>
      ) : (
        <Link href={product.href} className={className}>
          {body}
        </Link>
      )}
    </motion.li>
  );
}

// The products as a full-width index: big names on hairlines, with each row lighting up in its
// product's own colour when you point at it.
export default function Products() {
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      {/* light mode: pick the hero's aurora back up; dark mode: a soft blue glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[200px] right-[-8%] h-[560px] w-[720px] rounded-[50%] bg-[#ff2d95]/20 blur-[130px] dark:hidden" />
        <div className="absolute -top-[260px] left-[22%] h-[420px] w-[640px] rounded-[50%] bg-[#4d9bff]/25 blur-[120px] dark:hidden" />
        <div className="absolute left-[10%] top-[6%] hidden h-[460px] w-[760px] rounded-[50%] bg-[#0061ff]/15 blur-[140px] dark:block" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-20 sm:px-10 lg:px-14 lg:pb-28 lg:pt-28 xl:px-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="max-w-3xl text-[clamp(2rem,3.6vw,3.6rem)] leading-[1.1] tracking-[-0.035em] text-[#05060a] dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="font-semibold">Everything we build,</span>{" "}
            <span className="font-light">on your own terms.</span>
          </motion.h2>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[17px] font-medium text-[#05060a] transition-colors hover:text-[#0061ff] dark:text-white dark:hover:text-[#4d9bff]"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-black/[0.1] dark:border-white/[0.12] lg:mt-16">
          {products.map((product, i) => (
            <Row key={product.name} product={product} index={i} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
}
