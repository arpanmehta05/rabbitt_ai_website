import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { fetchBlog, formatDate, resolveContentImages } from "@/lib/cms";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await fetchBlog(slug);
    return {
      title: `${blog.title} — Rabbitt AI`,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: blog.image ? [{ url: blog.image }] : [],
      },
    };
  } catch {
    return { title: "Blog — Rabbitt AI" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let blog;
  try {
    blog = await fetchBlog(slug);
  } catch {
    notFound();
  }

  const rawHtml = await marked(resolveContentImages(blog.content ?? ""), { breaks: true });
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return (
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      <div className="pointer-events-none fixed inset-x-0 top-0 h-[260px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(14,165,233,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-[860px] px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
        {/* Back link */}
        <Link
          href="/blogs"
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m10 12-4-4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Blogs
        </Link>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {blog.about && (
            <span className="rounded-full border border-white/15 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
              {blog.about.length > 20 ? blog.about.slice(0, 20).trimEnd() + "…" : blog.about}
            </span>
          )}
          <time className="text-xs text-slate-500" dateTime={blog.dateAdded}>
            {formatDate(blog.dateAdded)}
          </time>
        </div>

        {/* Author */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden border border-white/[0.1] bg-[#0b1525]">
            <Image
              src="/logo.svg"
              alt="Rabbitt AI"
              width={22}
              height={22}
              className="object-contain opacity-80"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Rabbitt AI</p>
            <p className="text-xs text-slate-500">Rabbitt AI Team</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem]">
          {blog.title}
        </h1>

        {/* Description */}
        {blog.description && (
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            {blog.description}
          </p>
        )}

        {/* Hero image */}
        {blog.image && (
          <div className="relative mt-10 w-full overflow-hidden border border-white/[0.08] bg-[#060d1a]">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={800}
              sizes="(max-width: 860px) 100vw, 860px"
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="blog-prose mt-12"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />

        {/* Footer */}
        <div className="mt-16 border-t border-white/[0.07] pt-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m10 12-4-4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
