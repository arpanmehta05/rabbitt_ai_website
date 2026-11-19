import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products } from "./productsData";

// The products section: one rounded card on the black page, with a soft blue gradient inside it
// (four blurred circles over a deep navy, all from the brand blues, no photograph). On the left the
// heading and one outline button to all products; on the right every product on a white hairline,
// with its one line. From the Figma "Products / feature card". A Server Component; the circles drift
// slowly with CSS and stand still for reduced motion. The heading is the section's only title: no
// label above it.

const isExternal = (href: string) => href.startsWith("http");

// ChanceRAG and Cloud Watcher are left out of this card; they stay in the shared product list
const shown = products.filter((p) => p.name !== "ChanceRAG" && p.name !== "Cloud Watcher");

export default function FeatureCard() {
  return (
    <section aria-labelledby="products-title" className="bg-page px-3 py-6 sm:px-6 sm:py-12">
      <div className="relative isolate overflow-hidden rounded-[20px] bg-[#050d29] sm:rounded-3xl">
        {/* the gradient: four blurred circles, behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 motion-safe:[&>span]:animate-[rb-drift_24s_ease-in-out_infinite_alternate]"
        >
          <span className="absolute -left-[10%] -top-[20%] h-[90%] w-[55%] rounded-full bg-[#0061ff]/55 blur-[110px]" />
          <span className="absolute left-[45%] top-[5%] h-[95%] w-[70%] rounded-full bg-[#4d9bff]/40 blur-[110px]" />
          <span className="absolute left-[25%] top-[55%] h-[70%] w-[50%] rounded-full bg-[#1a47d6]/60 blur-[110px]" />
          <span className="absolute -left-[15%] top-[45%] h-[60%] w-[50%] rounded-full bg-black/50 blur-[110px]" />
        </div>

        <div className="grid gap-12 px-6 py-16 sm:px-12 lg:min-h-[656px] lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-center lg:gap-16 lg:px-24 lg:py-20">
          <div>
            <h2
              id="products-title"
              className="max-w-[520px] text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            >
              Everything we build, on your own terms.
            </h2>
            <Link
              href="/products"
              className="group mt-9 inline-flex h-11 items-center gap-2 rounded-lg border border-white/80 px-5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              View all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="border-b border-white/85">
            {shown.map((p) => {
              const body = (
                <span className="flex items-start justify-between gap-6">
                  <span className="grid gap-1.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <span className="text-xl font-medium tracking-[-0.025em] text-white">{p.name}</span>
                    <span className="text-[15px] leading-[1.4] text-white/70 transition-colors group-hover:text-white">
                      {p.detail}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 h-4 w-4 shrink-0 text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </span>
              );
              const cls = "group block py-5 pr-1";
              return (
                <li key={p.name} className="border-t border-white/85">
                  {isExternal(p.href) ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {body}
                    </a>
                  ) : (
                    <Link href={p.href} className={cls}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
