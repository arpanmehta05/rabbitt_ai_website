import type { Metadata } from "next";
import { fetchBlogs } from "@/lib/cms";
import { categoriesOf, toListing } from "@/lib/listing";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import BlogIndex from "@/components/listing/BlogIndex";
import { whiteButton } from "@/components/listing/ListingParts";

export const metadata: Metadata = {
  title: "Blogs — Rabbitt AI",
  description:
    "News, research and notes from the Rabbitt AI team: LLM architectures, data workflows and private AI.",
};

// The blog index, from the Figma "Blog – Desktop 1440" and "Blog – Mobile 390": a headline with a
// Subscribe button, then search, filters, the two newest posts large and the rest in a grid.
export default async function BlogsPage() {
  const items = (await fetchBlogs()).map((b) => toListing(b, "/blogs"));
  const categories = categoriesOf(items);

  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark min-h-screen bg-page text-white selection:bg-blue-600 selection:text-white">
        <header className="rb-container flex flex-col gap-6 pb-10 pt-28 sm:flex-row sm:items-start sm:justify-between lg:pb-12 lg:pt-40">
          <h1 className="max-w-[20ch] text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.04em]">
            News, research and notes from the Rabbitt AI team
          </h1>
          <a
            href="https://www.linkedin.com/company/rabbitt-ai/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className={`${whiteButton} h-10 shrink-0 self-start px-4 text-[14px] sm:mt-3`}
          >
            Subscribe
          </a>
        </header>

        <div className="rb-container pb-24 lg:pb-32">
          <div className="border-t border-white/[0.08] pt-8">
            <BlogIndex items={items} categories={categories} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
