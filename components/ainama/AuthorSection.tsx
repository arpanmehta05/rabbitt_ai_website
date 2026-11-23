import Image from "next/image";

// "Mr. Harneet Singh", from the Figma frame: the photograph over the first two of the four columns,
// and over the other two his name, role, three short paragraphs and six credentials in a grid of
// two. The photograph ends on the same line as the last row of credentials. A Server Component.
const CREDENTIALS = [
  "DRDO Medal of Honor",
  "Top 100 AI Leaders in Europe",
  "IIT Delhi alumnus",
  "Forbes Business Council",
  "$1B+ P&L managed",
  "5x founder",
];

export default function AuthorSection() {
  return (
    <section aria-labelledby="author-title" className="rb-container bg-page py-14 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-4 lg:gap-x-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl lg:col-span-2 lg:h-[min(646px,calc(100svh-12rem))] lg:w-auto">
          <Image
            src="/assets/harneetsingh.png"
            alt="Mr. Harneet Singh, Chief AI Officer of Rabbitt AI"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col lg:col-span-2">
          <h2 id="author-title" className="text-[clamp(2.25rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-white">
            Mr. Harneet Singh
          </h2>
          <p className="mt-3 text-[17px] font-medium text-brand-text">
            Chief AI Officer, Rabbitt AI (London) &nbsp;·&nbsp; Founder &amp; Serial Entrepreneur
          </p>
          <div className="mt-6 space-y-4 text-base leading-[1.5] text-white/70">
            <p>
              This book is an initiative led by the Lion Founder, Mr. Harneet Singh, a DRDO Medal of Honor recipient, who was
              chosen among the World&rsquo;s Top 100 AI Leaders in Europe alongside the likes of the Google DeepMind CEO, Groq
              CTO, and Hugging Face co-founder.
            </p>
            <p>
              Mr. Harneet Singh is an IIT Delhi alumnus with an extensive track record of building 5 companies from scratch and
              managing a P&amp;L of $1 Billion+.
            </p>
            <p>
              He is an active member of the Forbes Business Council and CII, and has previously served as a specialized AI
              consultant with the South Korean Navy.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-auto lg:grid-cols-3 lg:pt-8">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex h-16 items-center rounded-[10px] border border-white/20 px-4 text-[15px] leading-snug font-medium text-white/90">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
