import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products, type Product } from "./productsData";

// The products as a full-width index: the name big on a hairline, with its logo, one line about it
// and a link. On hover the row's hairline is drawn in the brand blue and the arrow appears. No
// glow and nothing that follows the pointer (design.md §8). A Server Component: plain markup, with
// the rise-in as it scrolls into view done in CSS (.rb-reveal).
//
// It sits right under the client logos, which carry the space between the two, so its own top
// padding is 48px at every size instead of the usual section rhythm.

const isExternal = (href: string) => href.startsWith("http");

function Mark({ product }: { product: Product }) {
  if (product.logo) {
    return (
      <span className="flex origin-left items-center" style={{ transform: `scale(${product.logoScale ?? 1})` }}>
        <Image
          src={product.logo}
          alt=""
          width={240}
          height={96}
          className="h-auto max-h-14 w-auto max-w-[8.5rem] object-contain object-left opacity-90 transition duration-300 group-hover:opacity-100 sm:max-h-[4.5rem] sm:max-w-[10.5rem]"
        />
      </span>
    );
  }
  return (
    <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand-text/15 text-2xl font-semibold text-brand-text">
      {product.name.charAt(0)}
    </span>
  );
}

function Row({ product }: { product: Product }) {
  const className = "group relative block px-1 py-8 sm:py-10 lg:px-4";
  const body = (
    <>
      <span className="grid items-center gap-x-8 gap-y-4 sm:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1.2fr)_minmax(0,1fr)_1.75rem]">
        <span className="flex h-[4.5rem] items-center">
          <Mark product={product} />
        </span>

        <span className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-white">
          {product.name}
        </span>

        <span className="max-w-sm text-[15px] leading-snug text-white/70 sm:text-base">{product.detail}</span>

        <ArrowUpRight className="hidden h-6 w-6 -translate-x-2 translate-y-2 text-brand-text opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 lg:block" />
      </span>

      {/* the row's hairline, drawn in the brand blue on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-text transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </>
  );

  return (
    <li className="rb-reveal border-b border-white/10">
      {isExternal(product.href) ? (
        <a href={product.href} target="_blank" rel="noopener noreferrer" className={className}>
          {body}
        </a>
      ) : (
        <Link href={product.href} className={className}>
          {body}
        </Link>
      )}
    </li>
  );
}

export default function ProductsIndex() {
  return (
    <section aria-labelledby="products-title" className="relative">
      {/* a soft glow of the brand blue, on the page's own dark background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[6%] h-[460px] w-[760px] rounded-[50%] bg-brand/15 blur-[140px]" />
      </div>

      <div className="rb-container relative pb-12 pt-12 md:pb-16 lg:pb-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="products-title"
            className="rb-reveal max-w-3xl text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
          >
            Everything we build, on your own terms.
          </h2>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-white/10 lg:mt-16">
          {products.map((product) => (
            <Row key={product.name} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
