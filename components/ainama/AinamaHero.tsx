import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import s from "./AinamaHero.module.css";

// The first screen of the AINama page, matched to the Figma "AINama – Desktop" and "– Mobile" hero:
// the name of the book as one giant word, the book tilted clockwise in front of it (8 degrees on a desktop,
// 6 on a phone), the short description and the one button at the bottom left, and the book's own
// line and numbers at the bottom right, its top level with the description. From 1024px up the whole
// hero is scaled to fit inside one screen (see the stylesheet). A Server Component; nothing here moves.
export default function AinamaHero() {
  return (
    <section className={`${s.hero} bg-page`}>
      <div className="rb-container">
        <h1 className={s.title}>AINama</h1>
      </div>

      {/* the book, in front of the word. On a phone it sits in the flow under the word. */}
      <div className={s.bookWrap}>
        <Image
          src="/assets/ainama-book.png"
          alt="AINama by Rabbitt.AI, the book cover"
          width={1306}
          height={1204}
          priority
          sizes="(min-width: 1440px) 720px, (min-width: 1024px) 50vw, 92vw"
          className={s.book}
        />
      </div>

      <div className={`${s.text} rb-container`}>
        <div className={s.cols}>
          <div className={s.col}>
            <p className={`${s.byline} text-brand-text`}>By Rabbitt.AI</p>
            <p className={`${s.intro} text-white/70`}>
              A comprehensive collection of 15 case studies, carefully curated from diverse sectors. The definitive field
              guide to real-world GenAI strategies and enterprise innovations.
            </p>
            <div className={s.btns}>
              <Link
                href="/contactus?topic=ainama#form"
                className={`${s.btn} ${s.btnRequest} group bg-brand text-white hover:bg-brand-hover`}
              >
                Request your copy
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* its top lines up with the description, which starts under the "By Rabbitt.AI" line */}
          <figure className={`${s.col} ${s.quoteCol}`}>
            <blockquote className={`${s.quote} text-white`}>
              &ldquo;The book aims to clear the air around the Gen AI world with Real and Powerful Use Cases from Real and
              Powerful Industry Experts.&rdquo;
            </blockquote>
            <figcaption className={`${s.cap} text-white/55`}>Mr. Harneet Singh, author</figcaption>
            <p className={`${s.stats} text-white/55`}>15 case studies &nbsp;·&nbsp; 15 industries &nbsp;·&nbsp; 5 continents</p>
          </figure>
        </div>
      </div>
    </section>
  );
}
