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
      className="landing-section relative overflow-hidden bg-[#f7faff] px-6 py-24 text-slate-950 sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_42%_at_83%_4%,rgba(14,116,144,0.16),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1769aa]">
              Rabbitt AI products
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Intelligence built for the work that matters.
            </h2>
          </div>
          <div className="lg:justify-self-end lg:max-w-md">
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Explore a connected suite of products that helps teams learn,
              create, understand, and operate with greater clarity.
            </p>
            <Link
              href="/products"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#092f6b] bg-white px-5 py-3 text-sm font-semibold text-[#092f6b] shadow-[0_8px_22px_rgba(15,47,95,0.08)] transition-all duration-200 hover:bg-[#092f6b] hover:text-white"
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

        <div className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,47,95,0.06)] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-72 border-b border-r border-slate-200 p-7 transition-colors duration-300 hover:bg-[#f0f7ff] sm:p-8"
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
                <p className="text-xs font-semibold tracking-[0.1em] text-[#1769aa]">
                  {product.category}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                  {product.description}
                </p>
              </div>
              <span
                className="absolute bottom-7 right-7 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-base text-slate-500 transition-all duration-300 group-hover:border-[#1769aa] group-hover:bg-[#1769aa] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-label={`Explore ${product.name}`}
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
