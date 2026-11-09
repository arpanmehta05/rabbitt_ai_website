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
          className="h-auto max-h-10 w-auto max-w-[7rem] object-contain object-left opacity-90 transition duration-300 group-hover:opacity-100 sm:max-h-12 sm:max-w-[8rem]"
        />
      </span>
    );
  }
  return (
    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-text/15 text-lg font-semibold text-brand-text">
      {product.name.charAt(0)}
    </span>
  );
}

function Row({ product }: { product: Product }) {
  const className = "group relative block px-1 py-5 sm:py-6 lg:px-4";
  const body = (
    <>
      <span className="grid items-center gap-x-8 gap-y-3 sm:grid-cols-[8.5rem_11rem_minmax(0,1fr)] lg:grid-cols-[9.5rem_14rem_minmax(0,1fr)_1.5rem]">
        <span className="flex h-12 items-center">
          <Mark product={product} />
        </span>

        <span className="text-[clamp(1.25rem,1.7vw,1.625rem)] font-medium leading-tight tracking-[-0.02em] text-white">
          {product.name}
        </span>

        <span className="text-[15px] leading-snug text-white/65">{product.detail}</span>

        <ArrowUpRight className="hidden h-5 w-5-translate-x-2 translate-y-2 text-brand-text opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 lg:block" />
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
      <div className="rb-container relative pb-12 pt-12 md:pb-16">
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

        <ul className="mt-10 border-t border-white/10 lg:mt-12">
          {products.map((product) => (
            <Row key={product.name} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
