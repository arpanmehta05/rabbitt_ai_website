import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { fetchCaseStudy, fetchCaseStudiesCached, formatDate, resolveContentImages } from "@/lib/cms";
import ArticleDetail from "@/components/casestudy/ArticleDetail";

// The case study page: it builds its data from the CMS and renders the shared ArticleDetail (the same
// page the blog posts use), from the Figma "Case study" frames: a light page. Breadcrumb, the title, one
// meta line, then the picture beside a short summary and the headline numbers; below, a sticky side
// column (facts, "In this story", a demo card) next to the article, then three more studies, and the
// same closing block and footer as the rest of the site. All of it comes from the CMS: the numbers
// are the "NN% ..." results in the study's own headline, the facts are its industry/client line,
// its category and its date, and "In this story" lists the article's own headings.

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const study = await fetchCaseStudy(slug);
    return {
      title: `${study.title} — Rabbitt AI`,
      description: study.description,
      openGraph: {
        title: study.title,
        description: study.description,
        images: study.image ? [{ url: study.image }] : [],
      },
    };
  } catch {
    return { title: "Case Study — Rabbitt AI" };
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

// every "NN% something" in the study's headline, e.g. "15% Increase in Accuracy", "400% Boost in ..."
function headlineNumbers(heading: string) {
  const out: { value: string; label: string }[] = [];
  for (const m of heading.matchAll(/(\d+(?:\.\d+)?)%\s+(.+?)(?=\s+and\s+\d|,|\s[–—-]\s|\s+Leading\b|\s+for\b|$)/g)) {
    const label = m[2].trim().toLowerCase();
    out.push({ value: `${m[1]}%`, label });
  }
  return out.slice(0, 3);
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;

  let study;
  try {
    study = await fetchCaseStudy(slug);
  } catch {
    notFound();
  }

  // pull the headline and the industry / client line out of the markdown; the rest is the article
  let md = resolveContentImages(study.content ?? "");
  const h1 = md.match(/^#\s+(.+)$/m)?.[1]?.replace(/[*_`]/g, "").trim() ?? study.title;
  md = md.replace(/^#\s+.+$/m, "");
  const fact = md.match(/^\*\*(Industry|Client):?\*\*:?\s*(.+)$/im);
  md = md.replace(/^\*\*Project Success Story\*\*.*$/im, "").replace(/^\*\*(Industry|Client):?\*\*:?\s*.+$/im, "");

  let html = DOMPurify.sanitize(await marked(md, { breaks: true }));
  const toc: { id: string; label: string }[] = [];
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = strip(inner);
    let id = slugify(text) || `section-${toc.length + 1}`;
    if (toc.some((t) => t.id === id)) id += `-${toc.length + 1}`;
    toc.push({ id, label: text.includes(":") ? text.split(":")[0].trim() : text });
    return `<h2 id="${id}">${text.includes(":") ? text.split(":").slice(1).join(":").trim() : text}</h2>`;
  });

  const numbers = headlineNumbers(h1);
  const summary = (study.description || "").replace(/\s+/g, " ").trim();
  const facts: [string, string][] = [
    [fact ? (fact[1].toLowerCase() === "client" ? "Client" : "Industry") : "Category", fact ? fact[2].replace(/[*_]/g, "").trim() : study.about],
    ["Service", study.about],
    ["Published", formatDate(study.dateAdded)],
  ].filter(([, v]) => !!v) as [string, string][];

  const others = (await fetchCaseStudiesCached().catch(() => []))
    .filter((s) => s.slug !== study.slug)
    .slice(0, 3);

  return (
    <ArticleDetail
      kind="case"
      title={study.title}
      summary={summary}
      about={study.about}
      image={study.image}
      dateAdded={study.dateAdded}
      html={html}
      toc={toc}
      facts={facts}
      numbers={numbers}
      more={others}
    />
  );
}
