import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { fetchBlog, fetchBlogs, formatDate, resolveContentImages } from "@/lib/cms";
import ArticleDetail from "@/components/casestudy/ArticleDetail";

// A blog post: the same page as a case study (components/casestudy/ArticleDetail.tsx), from the Figma
// "Case study" frames. The post's headings become "In this story", the facts are its category and its
// date, and three more posts follow. There are no headline numbers: that row is only for case studies.

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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let blog;
  try {
    blog = await fetchBlog(slug);
  } catch {
    notFound();
  }

  // the post's own "# Title" line is the page title already, so it is dropped from the article
  let md = resolveContentImages(blog.content ?? "");
  md = md.replace(/^#\s+.+$/m, "");

  let html = DOMPurify.sanitize(await marked(md, { breaks: true }));
  const toc: { id: string; label: string }[] = [];
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = strip(inner);
    let id = slugify(text) || `section-${toc.length + 1}`;
    if (toc.some((t) => t.id === id)) id += `-${toc.length + 1}`;
    toc.push({ id, label: text.includes(":") ? text.split(":")[0].trim() : text });
    return `<h2 id="${id}">${text.includes(":") ? text.split(":").slice(1).join(":").trim() : text}</h2>`;
  });

  // the CMS "about" of a post is often a long run of keywords: only a short one is a category
  const category = blog.about && blog.about.length <= 40 ? blog.about : "Blog";
  const summary = (blog.description || "").replace(/\s+/g, " ").trim();
  const facts: [string, string][] = [
    ["Category", category],
    ["Published", formatDate(blog.dateAdded)],
  ].filter(([, v]) => !!v) as [string, string][];

  const more = (await fetchBlogs().catch(() => []))
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3)
    .map((b) => ({ slug: b.slug, title: b.title, about: b.about && b.about.length <= 40 ? b.about : "Blog", dateAdded: b.dateAdded }));

  return (
    <ArticleDetail
      kind="blog"
      title={blog.title}
      summary={summary}
      about={category}
      image={blog.image}
      dateAdded={blog.dateAdded}
      html={html}
      toc={toc}
      facts={facts}
      numbers={[]}
      more={more}
    />
  );
}
