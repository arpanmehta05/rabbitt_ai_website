import type { Metadata } from "next";
import { fetchBlogs } from "@/lib/cms";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import ContentFilter from "@/components/ContentFilter";

export const metadata: Metadata = {
  title: "Blogs — Rabbitt AI",
  description:
    "Technical breakdowns, LLM architectures, and AI engineering insights from the Rabbitt AI team.",
};

export default async function BlogsPage() {
  const blogs = await fetchBlogs();
  const categories = [...new Set(blogs.map((b) => b.about).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(14,165,233,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="border-b border-white/[0.07] pb-12 pt-36 sm:pt-44">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Insights
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Blogs
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              Deep dives into AI engineering, data workflows, LLM architectures, and everything we&apos;re learning building at scale.
            </p>
          </div>
        </header>

        {/* Filter + Grid */}
        <section className="py-16">
          <ContentFilter
            items={blogs}
            categories={categories}
            hrefPrefix="/blogs"
          />
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
