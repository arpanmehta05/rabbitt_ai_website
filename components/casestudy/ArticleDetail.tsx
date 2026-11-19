import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/cms";
import Navbar from "@/components/home/Navbar";
import CtaSection from "@/components/home/CtaSection";
import SplitStage from "@/components/home/SplitStage";
import Footer from "@/components/home/MainFooter";
import StoryNav from "@/components/casestudy/StoryNav";
import CaseHero from "@/components/casestudy/CaseHero";

// The article page, from the Figma "Case study" frames: a light page. Breadcrumb, the title, one meta
// line, then the picture beside a short summary (and, for a case study, the headline numbers); below,
// a sticky side column (facts, "In this story", a demo card) next to the article, then three more
// pieces, and the same closing block and footer as the rest of the site. Case studies and blog posts
// are the same page: only the words in the breadcrumb and the "more" row change (`kind`).
// The summary beside the picture is trimmed to the picture's height (CaseHero). The side column never
// grows taller than the screen: "In this story" takes the room that is left and slides up as you read,
// so the headings still to come are always in view however long the article is (StoryNav).
// A Server Component; the only script is CaseHero (picture shape, summary trim) and StoryNav.

export type ArticleMore = { slug: string; title: string; about: string; dateAdded: string };

export type ArticleProps = {
  kind: "case" | "blog";
  title: string;
  summary: string;
  about: string;
  image?: string;
  dateAdded: string;
  html: string;
  toc: { id: string; label: string }[];
  facts: [string, string][];
  numbers: { value: string; label: string }[];
  more: ArticleMore[];
};

const KIND = {
  case: {
    crumbRoot: "Customers",
    crumbLabel: "Case studies",
    listHref: "/casestudies",
    baseHref: "/casestudies",
    fallbackAbout: "Case study",
    moreTitle: "More case studies",
    allLabel: "All case studies",
    readLabel: "Read the case study",
  },
  blog: {
    crumbRoot: "Resources",
    crumbLabel: "Blogs",
    listHref: "/blogs",
    baseHref: "/blogs",
    fallbackAbout: "Blog",
    moreTitle: "More from the blog",
    allLabel: "All blogs",
    readLabel: "Read the post",
  },
} as const;

export default function ArticleDetail({ kind, title, summary, about, image, dateAdded, html, toc, facts, numbers, more }: ArticleProps) {
  const k = KIND[kind];

  const asideInner = (
    <>
      <dl className="shrink-0 border-t border-[#e5e7eb]">
        {facts.map(([key, v]) => (
          <div key={key} className="border-b border-[#e5e7eb] py-4">
            <dt className="text-sm text-[#6b7280]">{key}</dt>
            <dd className="mt-1 text-[15px] text-[#090d16]">{v}</dd>
          </div>
        ))}
      </dl>
      {toc.length > 1 && (
        <div className="mt-8 hidden min-h-0 flex-1 lg:flex">
          <StoryNav items={toc} />
        </div>
      )}
      <div className="mt-8 shrink-0 rounded-2xl bg-[#f1f3f9] p-6">
        <p className="max-w-[260px] text-xl leading-[1.3] tracking-[-0.01em]">See what a private AI could do with your data.</p>
        <Link
          href="/contactus"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0061ff] text-[15px] font-medium text-white transition-colors hover:bg-[#1a47d6]"
        >
          Book a demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
  const asideClass = "lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100svh-7rem)] lg:flex-col lg:overflow-hidden";
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-black focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar theme="light" />
      <main id="main" data-nav-theme="light" className="bg-white pt-16 text-[#090d16] selection:bg-blue-600 selection:text-white">
        {/* hero: breadcrumb, title, meta, picture and summary */}
        <section className="rb-container pb-12 pt-10 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6b7280]">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>{k.crumbRoot}</li>
              <li aria-hidden>/</li>
              <li>
                <Link href={k.listHref} className="hover:text-[#090d16]">
                  {k.crumbLabel}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-[#090d16]">
                {about || k.fallbackAbout}
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 w-full text-[clamp(1.875rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#090d16]">
            {title}
          </h1>
          <p className="mt-6 text-[15px] text-[#6b7280]">
            {about && <>{about} &nbsp;·&nbsp; </>}
            <time dateTime={dateAdded}>{formatDate(dateAdded)}</time>
          </p>

          {image ? (
            <CaseHero src={image} alt={title} summary={summary} numbers={numbers} />
          ) : summary ? (
            <p className="mt-10 max-w-3xl text-lg leading-[1.6] text-[#4b5563]">{summary}</p>
          ) : null}
        </section>

        {/* story: sticky side column + article */}
        <section className="rb-container pb-16 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-5">
            <aside className={`lg:col-span-2 lg:self-start ${asideClass}`}>{asideInner}</aside>
            <article className="cs-prose min-w-0 border-[#e5e7eb] lg:col-span-3 lg:border-t lg:pt-4" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>

        {/* more pieces */}
        {more.length > 0 && (
          <section aria-labelledby="more-title" className="rb-container border-t border-[#e5e7eb] py-14 lg:py-16">
            <div className="flex items-end justify-between gap-6">
              <h2 id="more-title" className="text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-[-0.02em]">
                {k.moreTitle}
              </h2>
              <Link href={k.listHref} className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0061ff]">
                {k.allLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {more.map((s) => (
                <li key={s.slug}>
                  <Link href={`${k.baseHref}/${s.slug}`} className="group flex h-full flex-col gap-3">
                    <span className="line-clamp-3 text-xl font-medium leading-[1.25] tracking-[-0.015em] transition-colors group-hover:text-[#0061ff]">
                      {s.title.replace(/\s+/g, " ").trim()}
                    </span>
                    <span className="text-sm text-[#6b7280]">
                      {s.about} &nbsp;·&nbsp; {formatDate(s.dateAdded)}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-[#0061ff]">
                      {k.readLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div data-nav-theme="light" className="border-t border-[#e5e7eb] bg-white">
          <SplitStage>
            <CtaSection theme="light" />
          </SplitStage>
        </div>
      </main>
      <Footer theme="light" />
    </>
  );
}
