import { cache } from "react";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  about: string;
  image: string;
  content: string;
  keywords: string;
  dateAdded: string;
  createdAt?: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  description: string;
  about: string;
  image: string;
  content: string;
  keywords: string;
  dateAdded: string;
  createdAt?: string;
}

const CMS_BASE = "https://cms.rabbitt.ai";

export const fetchBlogs = cache(async (): Promise<Blog[]> => {
  const res = await fetch(`${CMS_BASE}/api/blog/rabbitt`, { cache: "no-store" });
  if (!res.ok) throw new Error(`CMS blog list failed: ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error("CMS returned non-ok status for blogs");
  return (data.blogs as Blog[]).sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
});

export const fetchBlog = cache(async (slug: string): Promise<Blog> => {
  const res = await fetch(`${CMS_BASE}/api/blog/rabbitt/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`CMS blog fetch failed for slug "${slug}": ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(`CMS returned non-ok status for blog "${slug}"`);
  return data.blog as Blog;
});

export const fetchCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const res = await fetch(`${CMS_BASE}/api/casestudy/rabbitt`, { cache: "no-store" });
  if (!res.ok) throw new Error(`CMS case study list failed: ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error("CMS returned non-ok status for case studies");
  return (data.casestudies as CaseStudy[]).sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
});

export const fetchCaseStudy = cache(async (slug: string): Promise<CaseStudy> => {
  const res = await fetch(`${CMS_BASE}/api/casestudy/rabbitt/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`CMS case study fetch failed for slug "${slug}": ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(`CMS returned non-ok status for case study "${slug}"`);
  return data.casestudy as CaseStudy;
});

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function resolveContentImages(content: string): string {
  if (!content) return "";
  return content
    .replace(/(!\[.*?\]\()(\/(?:blogimages|assets)\/)/g, "$1https://rabbitt.ai$2")
    .replace(/(<img[^>]+src=["'])(\/(?:blogimages|assets)\/)/g, "$1https://rabbitt.ai$2")
    .replace(/\/blogimages\/llm-blog-2\.jpeg/g, "/blogimages/llm-blog-2.png");
}
