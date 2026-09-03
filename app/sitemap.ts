import type { MetadataRoute } from "next";
import { fetchBlogs, fetchCaseStudies } from "@/lib/cms";

const BASE_URL = "https://rabbitt.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Core static marketing and product pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/chancerag`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/curators-ai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/navica-ai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ainama`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/casestudies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contactus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Services
    {
      url: `${BASE_URL}/services/data-annotation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/content-writing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/content-strategy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/corporate-trainings`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/university-training-programs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/video-editing-and-generation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/website-revamp`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic Blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await fetchBlogs();
    blogRoutes = blogs.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.slug}`,
      lastModified: blog.dateAdded ? new Date(blog.dateAdded) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Graceful fallback if CMS is temporarily unreachable
  }

  // Dynamic Case Study routes
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await fetchCaseStudies();
    caseStudyRoutes = caseStudies.map((cs) => ({
      url: `${BASE_URL}/casestudies/${cs.slug}`,
      lastModified: cs.dateAdded ? new Date(cs.dateAdded) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Graceful fallback if CMS is temporarily unreachable
  }

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
