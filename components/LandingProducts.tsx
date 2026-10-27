import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "IcyPluto",
    category: "Growth intelligence",
    description:
      "Marketing automation and analytics that turn customer signals into measurable growth.",
    logo: "/Icypluto.svg",
    href: "https://new.icypluto.com/",
  },
  {
    name: "IcyQuill",
    category: "Content intelligence",
    description:
      "A focused AI writing workspace for confident, high-quality content at scale.",
    logo: "/quill.svg",
    href: "https://quill.icypluto.com/",
  },
  {
    name: "DRIP",
    category: "Learning intelligence",
    description:
      "Adaptive learning experiences that help ambitious teams build durable capability.",
    logo: "/drip.svg",
    href: "https://drip.rabbitt.ai/",
  },
  {
    name: "Cloud Watcher",
    category: "Cloud intelligence",
    description:
      "Clear, actionable visibility into cloud cost, health, and operations.",
    logo: "/cloudwatcher.svg",
    href: "https://cloudwatcher.rabbitt.ai/",
  },
  {
    name: "ChanceRAG",
    category: "Enterprise knowledge",
    description:
      "Reliable document reasoning that makes your company knowledge useful and secure.",
    logo: "/chance.svg",
    href: "/chancerag",
  },
  {
    name: "OnSkill",
    category: "Workforce intelligence",
    description:
      "A better view of workforce competency, skills, and progress across the organization.",
    logo: "/onskill.svg",
    href: "https://onskill.org/",
  },
];

export default function LandingProducts() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-[#020305] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_42%_at_83%_4%,rgba(14,116,144,0.16),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/[0.1] pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Rabbitt AI products
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Intelligence built for the work that matters.
            </h2>
          </div>
          <div className="lg:justify-self-end lg:max-w-md">
            <p className="text-base leading-7 text-slate-300 sm:text-lg">
              Explore a connected suite of products that helps teams learn,
              create, understand, and operate with greater clarity.
            </p>
            <Link
              href="/products"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#020305] shadow-[0_8px_28px_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-slate-200 hover:shadow-[0_10px_34px_rgba(255,255,255,0.16)]"
            >
              View all products
              <span
                className="text-lg leading-none transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="grid border-l border-t border-white/[0.1] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-72 border-b border-r border-white/[0.1] p-7 transition-colors duration-300 hover:bg-sky-300/[0.055] sm:p-8"
            >
              <div className="flex justify-end">
                <div className="flex h-12 w-20 items-center justify-end">
                  <Image
                    src={product.logo}
                    alt=""
                    width={100}
                    height={48}
                    className="max-h-12 w-auto max-w-20 object-contain opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="mt-16">
                <p className="text-xs font-medium tracking-[0.1em] text-sky-200/75">
                  {product.category}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-sm pr-12 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {product.description}
                </p>
              </div>
              <span
                className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] text-slate-300 transition-all duration-300 group-hover:border-sky-200/50 group-hover:bg-sky-200 group-hover:text-[#020305] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
                aria-label={`Explore ${product.name}`}
              >
                {/* drawn, not typed: iOS shows the ↗ character as an emoji */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
