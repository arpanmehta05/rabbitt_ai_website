# Rabbitt AI — Full Website (`main` branch) · UI Handoff

> **What this document covers:** the complete website as it exists on the **`main`** branch — its **landing page**, **every other page**, the shared navigation/footer, the design system, and what is still unfinished.
> **What it does not cover:** the *new* landing page being built on the `new-rewamp` branch (light + dark theme, scroll-driven hero). That is in [`README-LANDING-PAGE.md`](./README-LANDING-PAGE.md).
> **Who it is for:** the UI/UX designer who will redesign and complete the site. You do **not** need repo access — every colour, font, size, layout and behaviour is written out below.
> **How to read it:** §1–2 give the overview, §3–4 the design system and shared components, §5 the landing page, §6 every other page, §7–9 the problems and open items.

---

## 1. The two branches in one minute

| | **`main`** (this document) | **`new-rewamp`** |
|---|---|---|
| What it is | The full, working website — every page exists and shares one look | Only a rebuilt landing page |
| Look | **Dark only**, near-black, sky-blue accent, white pill buttons | Light **and** dark, blue + pink accent, editorial |
| Pages | **21 pages** (+ 404) all styled consistently | 1 page (`/`) |
| Navbar / footer | One floating dark navbar + dark footer on every page | New flat navbar + footer on the landing page only |

**The goal of the redesign:** take `main` (complete but with an older, dark-only look and several unfinished spots) and bring the whole site up to the standard of the new landing page, without losing any pages or content.

---

## 2. Site map — every page on `main`

Status key: ✅ built and complete · 🟡 built but has unfinished or placeholder parts · 🔁 alias/redirect (no design needed)

### 2.1 Core pages

| Route | Page | Status | One-line summary |
|-------|------|--------|------------------|
| `/` | **Landing page** | ✅ | Intro animation → hero with video → logos → products → AI-adoption journey → impact numbers → FAQ → CTA |
| `/about` | About Us | ✅ | Hero with 3D hologram, stats strip, company story, founder, security |
| `/products` | Products | 🟡 | Category tabs + scroll-pinned showcase of 19 products |
| `/contactus` | Contact Us | 🟡 | Floating-label form + sales email |
| `/privacy` | Privacy Policy | ✅ | Long legal text with sticky contents list |
| `*` | 404 Not Found | ✅ | Big "404", floating logo, quick links |
| `/ainama` | AINama (book promo) | 🟡 | "15 Real-World GenAI Case Studies" book page |

### 2.2 Product and solution pages

| Route | Page | Status |
|-------|------|--------|
| `/chancerag` | ChanceRAG — enterprise RAG | ✅ |
| `/curators-ai` | CuratorsAI — voice agents | ✅ |
| `/navica-ai` | NavicaAI — career pathways | 🟡 (testimonials look like placeholders) |

### 2.3 Service pages

| Route | Page | Status |
|-------|------|--------|
| `/services/content-writing` | Content Writing | ✅ |
| `/services/content-strategy` | Content Strategy | ✅ |
| `/services/video-editing` | Video Editing & Generation | ✅ |
| `/services/university-training` | University Training Programs | ✅ |
| `/services/corporate-trainings` | Corporate Trainings | ✅ |
| `/services/website-revamp` | Website Revamp Services | 🟡 (hero only — no other sections) |
| `/services/data-annotation` | Data Annotation | ✅ (different layout from the other six) |

### 2.4 Resources

| Route | Page | Status |
|-------|------|--------|
| `/blogs` | Blog directory | ✅ (content from a CMS) |
| `/blogs/[article]` | Blog article | ✅ |
| `/casestudies` | Case study directory | ✅ (content from a CMS) |
| `/casestudies/[article]` | Case study article | ✅ |
| `/webinars` | Webinars | 🟡 (registration form is a mock; dates are stale) |

### 2.5 Aliases (same page, no design work)

| Address | Shows |
|---------|-------|
| `/chance-rag` | same as `/chancerag` |
| `/contact` | redirects to `/contactus` |
| `/content-writing` | redirects to `/services/content-writing` |
| `/services/corporate-training` | same as `/services/corporate-trainings` |
| `/services/university-training-programs` | same as `/services/university-training` |
| `/services/video-editing-and-generation` | same as `/services/video-editing` |
| `/services/website-revamp-services` | same as `/services/website-revamp` |

### 2.6 Links that lead nowhere

The footer lists **Whitepapers**, **Careers** and **Newsroom**. They have no page yet and need designing from scratch.

---

## 3. Design system (as it is on `main`)

### 3.1 Colours

**Backgrounds (all dark)**

| Use | Hex |
|-----|-----|
| Main page background (almost every page) | `#020305` |
| Alternate section band | `#060914` (hover `#0a1020`) |
| Cards / panels | `#060c18`, `#060d1a` (blog cards), `#04060d` and `#040711` (webinar and case-study cards), `#070b14` |
| Products showcase | `#030712` → `#061120` diagonal |
| Navbar | `#030507` at 90% + blur |
| Footer | `#02060d` |
| Landing hero | `#020406` |
| About page bands (a blue-tinted family) | `#02050b`, `#050b16`, `#07111f` |
| Small icon squares in the menu | `#111a2b` |

**Accent and text**

| Use | Colour |
|-----|--------|
| Main accent (eyebrow labels, numbers, hover, links) | Sky `#38bdf8` (sky-400) and `#7dd3fc` (sky-300) |
| Headline gradient words | `#60a5fa` → `#3b82f6` → `#2563eb` |
| Logo wordmark gradient | `#9ad5ff` → `#4895ff` → `#0061ff` |
| Brand blue (a few CTAs) | `#0061ff` |
| Headlines | `#ffffff` |
| Body | `#cbd5e1` (slate-300) |
| Secondary text | `#94a3b8` (slate-400) |
| Tertiary / small print | `#64748b` (slate-500) and darker slate-600/700 |
| Borders and hairlines | white at 7–16% |
| Success / live | emerald (green) |
| Error | rose (red) |
| Text selection | white background, black text |

NavicaAI's hero is the only place that uses **purple** (a purple + blue glow behind its screenshot).

### 3.2 Fonts

| Role | Font | Notes |
|------|------|-------|
| Everything | **Geist Sans** (Google Fonts, free) | Headlines are Bold/Semibold, body Regular/Medium |
| "Mono" labels | Also Geist Sans | The site asks for a monospace font on small labels, step numbers and tags, **but those render in Geist Sans, not a real monospace** |
| Closing-quote on service pages | A system serif (Georgia-style) | Only place a serif appears |
| Email templates | Arial | |

Headlines use **very tight letter-spacing** (−0.04em to −0.065em).

### 3.3 Type scale (typical values)

| Element | Size | Weight |
|---------|------|--------|
| Landing hero headline | fluid 44–88px | Bold, line height 1.04 |
| Page H1 — service pages | 36px → 47px → 55px | Bold |
| Page H1 — Products, Contact, Privacy | 36px → 60px → 74px | Bold |
| Page H1 — Blogs | 48px → 72px | Bold |
| Page H1 — About | 48px → 72px → 86px | Semibold, line height 0.96 |
| Page H1 — Webinars, article pages | 36–44px | Semibold |
| Section H2 — service pages | 30px → 48px | Semibold |
| Section H2 — Curators / Navica / Data Annotation | 24px → 36px | Bold |
| Eyebrow label | 11px UPPERCASE, +0.22em tracking, sky-400 | Semibold |
| Body paragraph | 16–18px, relaxed line height | Regular |
| Small print | 10–12px | — |

(See §8 — these sizes differ page to page.)

### 3.4 Buttons

| Type | Look |
|------|------|
| **Primary** | White pill, dark text `#020305`, 15px semibold, padding ≈ 14×28px, soft white glow shadow, trailing "→" that nudges right on hover; hover colour `#f1f5f9` |
| **Secondary** | Pill with a 1px white-16% border, white text, trailing "→" in white 40%; hover: border 30%, faint white fill |
| **Navbar CTA** | Smaller white pill "Book a Demo →" (13px on phones, 14px otherwise) |
| **Filter chips** | Pills (blogs: sky-tinted when active) · underline tabs (webinars) · square-ish tabs with solid white active state (case studies) · sliding pill tab bar (products) |
| **Text links** | Sky-300 with "↗" or "→" |

### 3.5 Shapes and layout

| Item | Value |
|------|-------|
| Container | max 1440px (some pages 1360 / 1400 / 1600) |
| Side padding | 24px → 40px → 64px |
| Navbar height | 64px, fixed |
| Cards | **Mixed:** square edges (service cards, blog cards, article content) · 16px radius (Data Annotation, Case Studies, Webinars) · 12px (menu rows, privacy cards) |
| Buttons | Always fully round |
| Decorative backgrounds | Faint sky-blue radial or linear wash at the top of the page; 52–64px faint grid lines; dot grids; a ring outline on some sections |

### 3.6 Motion

- Fade-up on scroll for headings and cards on a few pages (landing, FAQ, Products hero, contact).
- Accordion "+" rotates 45° (answers appear instantly, no height animation).
- Hover: arrows nudge right, cards lift ~4px, images scale 1.01–1.04, borders brighten.
- Special: landing intro, landing stat count-up, products pinned scroll, video carousel, 3D hologram on About.
- Most pages do **not** handle "reduce motion" (the landing intro does).

### 3.7 Icons

Mostly hand-drawn inline SVG outline icons (about, AINama, nav) plus a few Lucide icons (video controls, webinars). Arrows in buttons are text characters "→" / "↗".

---

## 4. Shared components (on every page unless noted)

### 4.1 Navbar
- Fixed, 64px, `#030507` at 90% with blur and a thin bottom hairline.
- **Left:** logo mark (40px) + wordmark **"Rabbitt"** (not "Rabbitt AI") in the blue gradient.
- **Centre (desktop ≥ 1024px):** **Data ▾ · Products ▾ · Services ▾ · Resources ▾ · AINama** — items turn sky-300 on hover, sky-400 when their menu is open.
- **Right:** white **"Book a Demo →"** pill and (on phones) a hamburger button.
- **Dropdowns** are floating panels (max 1216px wide) centred under the bar:
  - **Data:** *Services* — Data Annotation. *Solutions* — CuratorsAI, NavicaAI.
  - **Products:** a category selector (**Marketing · Learning · Technology · Ecosystem Products**) with the products of that category listed as rows with logo, name and description. Picking a category also remembers it for the Products page.
  - **Services:** 6 services (Content Writing, Content Strategy, Video Editing & Generation, University Training Programs, Website Revamp Services, Corporate Trainings) plus a "Book a consultation →" link.
  - **Resources:** Blogs, Case Studies, Webinars.
  - Menu entries have a 40px rounded icon square (`#111a2b`), a title (turns sky-300 on hover), and a one-line description.
  - Closes on outside click.
- **Mobile:** full-screen scrolling menu with the same groups.
- No light/dark toggle.

### 4.2 Footer (`#02060d`)
- **Brand block:** logo + wordmark "Rabbitt" (32px, blue gradient), tagline *"Helping enterprises unlock the full potential of their data with secure, reliable and impactful Generative AI solutions."*, a "Contact" link, **LinkedIn** and **Instagram** icons.
- **Columns:** **Products** (Marketing, Learning, Technology, Ecosystem Products + "View all products") · **Services** (7 services) · **Resources** (Blog, Case Studies, Whitepapers*, Webinars) · **Company** (About Rabbitt AI, Careers*, Newsroom*, Contact Us). *\* link to nothing yet.*
- **Legal row:** "© 2026 Rabbitt AI. All rights reserved." + "Privacy Policy". Text is pure white throughout.

### 4.3 Contact CTA band (bottom of most pages)
- `#020305` with a faint sky wash and a very faint dot grid.
- Left: H2 **"Ready to build AI that *delivers* for your enterprise?"** ("delivers" in the blue gradient); paragraph *"Partner with Rabbitt AI to engineer secure, production-grade intelligence. From custom model adaptation to enterprise retrieval, we help you launch in weeks."*; buttons **Contact Us →** (white) and **Explore Products →** (outline).
- Right (desktop only): the large rabbit logo with a blue glow.
- **Shown on** the landing page and most content pages. **Not shown on** Contact, Blogs and the blog / case-study article pages.

### 4.4 FAQ accordion (service pages, ChanceRAG, landing)
Left: small eyebrow + H2. Right: list of questions; one open at a time; the first is open by default; a "+" icon rotates to ×; no animated height.

### 4.5 Article body style (blogs and case studies)
Slate-300 text, 17px, line height 1.82; headings white semibold (H2 has a bottom hairline); links sky-400 underlined; quotes with a sky left rule and faint sky fill; inline code sky-300; code blocks `#0a1120`; tables with hairlines; images with a thin border. **Every radius is 0 (square).** Dark-only.

---

## 5. The landing page on `main` (`/`)

Order: **Intro animation → Hero → Trusted-by logos → Products → AI-adoption journey → Impact stats → FAQ → Contact CTA → Footer**. All on `#020305`.

### 5.1 Intro animation (first visit)
- Starts on a **very light grey-white** (`#f8fafc`) screen with a pale grid, the large rabbit logo (≈ 160×208px, 192×256 on tablets and up) in the centre.
- The logo "pulses" (a short shockwave at ~0.55 s), then **eight product bubbles** shoot out from the logo along curved lines and settle around it: **CloudWatcher, AI Quest, IcyPluto, IcyQuill, OnSkill, DRIP, PingU, Chance Rag**. Bubbles are white pills with the product logo and a dark-slate name. On phones they become a 2-column grid at the bottom.
- After ~0.7 s a 3.4-second transition plays: the background fades **from light to the dark `#020305`**, with soft blue glows, a dotted orbital ellipse pattern and a few faint particles; the lines retract; the logo **shrinks and flies up to the navbar** position; the navbar fades in; the hero fades in.
- **Scrolling is locked** until it finishes.
- It plays **once per visitor per 24 hours**; after that the page opens straight on the hero. It is skipped when "reduce motion" is on.

### 5.2 Hero
- Two columns on desktop (text 0.92 : video 1.08), single column on phones. Background `#020406` with a blue radial glow on the right and a dark fade at the bottom.
- **Headline** (white fading into `#3b82f6`, bold, fluid 44–88px): **"Own your AI, / Own your Data"**.
- **Paragraph** (`#c0c4cf`): *"Rabbitt AI transforms your enterprise data into reliable Generative AI solutions that drive measurable impact — securely and at scale."*
- **Button:** white pill **"Explore Solutions →"** (scrolls down to the products section).
- **Right:** a muted, auto-playing video of a staircase with the rabbit (blended into the background so it has no hard edges), with a few thin glowing stair-shaped outlines.

### 5.3 "Trusted by industry leaders" — customer logos
- Small uppercase label in slate-300, wide tracking.
- **Two rows of logos scrolling in opposite directions** (top row left, 40 s loop; bottom row right, 36 s loop), edges fading into the background. Logos at 85% opacity, 100% on hover, 40–52px tall.
- Row 1 (13): Spinny, Cars24, Acko Drive, 91Wheels, Pristyn Care, TATA 1mg, Truemeds, Healthkart, Paytm, PhonePe, Groww, Acko, Policybazaar.
- Row 2 (12): Unacademy, UpGrad, Interview Kickstart, Extramarks, 99acres, SquareYards, MagicBricks, NoBroker, Lead Squared, SHRM, Darwinbox, Moengage.
- If a logo fails to load, its name is shown as small grey text.

### 5.4 Products ("Rabbitt AI products")
- Eyebrow **RABBITT AI PRODUCTS** (sky-300). H2 **"Intelligence built for the work that matters."** (up to 72px, semibold, line height 0.98). Right: *"Explore a connected suite of products that helps teams learn, create, understand, and operate with greater clarity."* + white pill **"View all products →"**.
- A **3-column grid of bordered tiles** (2 columns on tablets, 1 on phones), each ≥ 288px tall: logo top-right, small category label, big product name (30px semibold), description, and a round arrow button bottom-right. Hover: tile tints sky, logo scales 5%, arrow button fills. Tiles open in a new tab.

| Product | Category label | Description |
|---------|----------------|-------------|
| IcyPluto | Growth intelligence | Marketing automation and analytics that turn customer signals into measurable growth. |
| IcyQuill | Content intelligence | A focused AI writing workspace for confident, high-quality content at scale. |
| DRIP | Learning intelligence | Adaptive learning experiences that help ambitious teams build durable capability. |
| Cloud Watcher | Cloud intelligence | Clear, actionable visibility into cloud cost, health, and operations. |
| ChanceRAG | Enterprise knowledge | Reliable document reasoning that makes your company knowledge useful and secure. |
| OnSkill | Workforce intelligence | A better view of workforce competency, skills, and progress across the organization. |

### 5.5 AI-adoption journey (interactive)
- Eyebrow **GENERATIVE AI PLATFORM**; H2 **"Every stage of your AI adoption journey, built around you."**
- A row of **5 pill tabs**: **Define Problem · Design and Build Data · Develop Model · Develop Application · Evaluate Data and Model**. Clicking a tab swaps the content.
- Each stage shows: a small eyebrow, a large title, a paragraph (left) and a **technical diagram card** on the right (`#060c18`, rounded 16px, sky accents, small monospace-style labels). The diagrams include: business-outcome inputs feeding a central "core" node; a data pipeline (ingestion → processing → grounding); a model panel listing models and a "vLLM Inference" line.
- Stage copy:
  1. Define Problem — "Start with the business outcome."
  2. Design and Build Data — "Build data your AI can trust."
  3. Develop Model — "Develop the right intelligence."
  4. Develop Application — "Turn intelligence into an experience."
  5. Evaluate Data and Model — "Keep quality accountable."

### 5.6 Impact stats — "Impact you can measure."
Four big numbers that **count up** when scrolled into view (60–96px, white, with a sky "+"), divided by hairlines:

| Number | Label | Description |
|--------|-------|-------------|
| 500+ | Projects Delivered | Enterprise AI implementations shipped to production |
| 1.7M+ | Data Annotations | Labelled data points powering fine-tuned enterprise models |
| 100+ | Enterprise Clients | Organisations trusting Rabbitt AI in their critical workflows |
| 8+ | Product Platforms | Connected products across intelligence, learning, content, and operations |

### 5.7 FAQ
Eyebrow **FAQ**, H2 beginning **"Questions we get…"**. Seven questions in the accordion style of §4.4: how Rabbitt differs from a generic LLM API · time from first call to live deployment (4–8 weeks) · existing data infrastructure vs migration · whether data trains shared models (never) · which products are in the ecosystem · engagement model (project, retainer or SaaS) · on-premise / air-gapped support.

### 5.8 Contact CTA and footer — see §4.3 and §4.2.

---

## 6. Every other page

### 6.1 About — `/about`
Own colour family (blue-tinted `#02050b / #050b16 / #07111f`), the biggest H1 on the site, no scroll animation.
1. **Hero** (2 columns): H1 **"Intelligence should feel like *your own.*"** ("your own." in sky-300, 5.4rem). Paragraph; buttons **Start a conversation ↗** (white) and **Explore our products** (outline). Right: the **3D hologram** — a slowly rotating neural-style sphere of ~380 glowing nodes with ~650 thin connecting lines, four orbital rings (cyan `#00f0ff` dashed with tick marks, `#38bdf8`, `#0284c7`, `#0ea5e9`), a glowing white-to-sky core with two small spinning rings, radiating spokes, dust, and a cyan pedestal glow. Draggable, follows the mouse, pauses off-screen (520px tall, 680px on large screens). Faint sky wash and 64px grid behind.
2. **Stats strip:** London · Headquartered / 70+ · Enterprise engagements / 500+ · AI specialists network / Global · Delivery footprint.
3. **"The best AI should make your organisation more itself."** — heading left, two paragraphs right; below, three numbered rows: 01 *Your intelligence stays yours.* · 02 *Specialisation beats scale for real work.* · 03 *Trust is part of the architecture.*
4. **"A different operating model for enterprise AI."** — text + link "See the Rabbitt AI platform ↗"; three bordered cards with icons: *Own the substrate*, *Connect the context*, *Keep improving*.
5. **"London roots. Global perspective."** — founder paragraph; three milestone columns: 2023 Founded in London · 2024 Platform & partnerships · Today Built for enterprise work.
6. **"Technical ambition, grounded in the work."** — founder portrait (4:5, 32px radius, name overlay "Harneet Singh — Founder & Chief AI Officer"), bio, tags: Europe Top 100 AI Leader · Author, AI NAMA · IIT Delhi.
7. **"Security is a product decision."** — four chips: private VPC / air-gapped, role-based access and auditability, encryption, no third-party model training.
8. Contact CTA, footer.

### 6.2 Products — `/products` 🟡
- **Hero** (58–66% of screen height, `#030508`): H1 **"We turn your data / into AI that delivers."** ("delivers." in `#3b82f6`, up to 74px); a short sky rule; paragraph; **no buttons**. At the bottom, a decorative **flowing ribbon of 36 curved lines** with one bright glowing core line (white → `#60a5fa` / `#38bdf8`).
- **Category tab bar** (pill-shaped, `#06111f`, sky border): **Marketing · Learning · Technology · Ecosystem Products**; a highlight slides between tabs; the choice is remembered; default Marketing.
- **Desktop (≥ 1024px): a scroll-pinned stage.** The screen stays fixed while the user scrolls through the products of the chosen category. Left: category label, product name (huge, auto-sized to its length), description, white button **"Explore {name} →"**. Right: the logo (or monogram) and name, with a **numbered timeline (01, 02…)** beneath whose active node glows. Text slides and blurs between products. A "SCROLL TO EXPLORE" hint sits at the bottom.
- **Mobile:** each product is a stacked block with index, mark, name and description.
- Logos are SVGs; products without one show a **monogram in a circle**.

| Category | Product — description |
|----------|-----------------------|
| **Marketing** | **IcyPluto** — unified platform for marketing automation and measurable growth · **IcyLingo** — AI-driven language content generation at scale (monogram "IL") · **IcyLunar** — social listening and competitive intelligence (glyph "◐") · **IcyQuill** — AI content partner for long-form writing · **Fire Reach** — outreach automation for precise, personal lead engagement · **Pluto Circle** — community marketing and audience management (monogram "PC") |
| **Learning** | **Rabbitt Learning** — AI-driven enterprise learning, upskilling and knowledge enablement · **DRIP** — adaptive learning for ambitious teams · **LMS** — AI learning management system (monogram) · **Code Bunny** — AI coding companion and learning sandbox (monogram) · **AI Learning Platform Gamified** — quests, rewards and leaderboards · **OnSkill** — workforce competency and skill management · **R Proctor** — automated AI proctoring (monogram) |
| **Technology** | **ChanceRAG** — enterprise RAG for deep document reasoning · **HRMS** — agentic AI human-resource management (monogram) · **Canvas** — on-premise visual workflow automation (monogram) |
| **Ecosystem Products** | **Voice Rabbitt** — conversational voice experiences (monogram) · **Cloud Watcher** — cloud cost, health and operations intelligence · **Ping You** — notifications and incident coordination |

Notes: logos exist for 10 of the 19; the other nine use monograms. No product has a screenshot.

### 6.3 Contact Us — `/contactus` 🟡
- Two columns, no CTA band.
- **Left:** eyebrow **CONTACT**; H1 **"Let's build / intelligence that / *delivers.*"** (up to 72px); *"Speak directly with our enterprise solutions team. No sales pipeline, no automated responses."*; at the bottom the label **SALES** and `sales@rabbitt.ai`.
- **Right — form** with four fields that have only a bottom border and **floating labels** (label sits in the field, floats up and turns sky-400 on focus or when filled; border brightens): **Name\*, Email\*, Company, Message** (4-line text area). Placeholder text only appears while a field is focused.
- **Button:** white pill **"Send message →"**. *Loading:* spinner replaces the label and the button dims. *Footnote:* "Zero data training · Private deployment · NDA on request".
- **Error state:** red-bordered box, "Unable to send message" + the reason. **Success state:** green circled check, **"Message sent."**, *"We'll be in touch within 2 hours."*, and an underlined **"Send another"** button.
- **Behind the scenes:** the form sends two emails (see §6.13).

### 6.4 Privacy Policy — `/privacy`
Eyebrow **LEGAL**; H1 **"Privacy Policy"**; intro; "Last updated: August 2025". Two columns: a **sticky "Contents" list** on the left (desktop only; highlights the section being read, click scrolls) and a narrow article column. Thirteen sections: Purpose · Notice to End Users · Data We Collect · How We Use Your Information · Third-Party Sharing · Payment Privacy · Cookies & Tracking Technologies · International Data Transfers · Security Measures · Data from Third-Party Sources · Your Rights · Legal Basis for Processing · Contact Us. Content types: paragraphs, small term/detail cards, bullet lists, a contact card for the "Data Privacy Officer".

### 6.5 404 page
Giant white **"404"** (up to 240px) with the rabbit logo floating up and down over its lower edge; H2 **"Lost in the Rabbitt hole?"**; copy; buttons **Back to Home →** (white) and **Explore Products** (glass outline); blue glows and a masked grid behind. Below, **"Quick navigation"** — 4 link cards (Platform Overview, Enterprise Products, AI Adoption Journey, Book an Enterprise Demo), each with a short description.

### 6.6 AINama — `/ainama` 🟡
A promo page for a book: **"AINama By Rabbitt.AI — 15 Real-World GenAI Case Studies"**.
1. **Hero:** H1 "AINama By *Rabbitt.AI*" (gradient on Rabbitt.AI); intro; five sector bullets (BigTech / model providers, GenAI startups, IT consulting, consumer / retail, academic / government); buttons **Request Your Copy →** (white) and **Speak with Solutions Team →** (outline); right: the **book cover** image with a heavy shadow.
2. **"Why this book?"** — five-column metrics bar: 15 Industry Experts · 15 Case Studies · 15 Industries · 5 Continents · 1 Definitive Book.
3. **"Who is this book for?"** — sticky heading + five rows with icons: CXOs & Enterprise Leaders · Founders & Builders · Policy Makers & Regulators · AI Engineers & Enthusiasts · For The World.
4. **"What Will You Gain?"** — one large rounded panel with a centred quote and three icon cards: Production Blueprints · Real Economic ROI · Risk & Governance.
5. **About the author "Mr. Harneet Singh"** — portrait, bio, badge chips (DRDO Medal of Honor, Top 100 AI Leaders in Europe, IIT Delhi Alumnus, Forbes Business Council, $1B+ P&L Managed, 5x Founder).
6. Contact CTA, footer.

### 6.7 ChanceRAG — `/chancerag`
1. **Hero:** H1 **"Full-fledged RAG for deep document reasoning."** (second half in gradient); buttons **Deploy ChanceRAG →**, **Request Technical Specs →**; right: product hero image (16:9, rounded, blue glow).
2. **"Engineered for accuracy, scale, and enterprise trust."** (`#060914` with grid) — four cards with a coloured 2px top edge and tag chips: 01 Multi-Modal Document Ingestion · 02 Hybrid Semantic & Sparse Search · 03 Verifiable Citation Provenance · 04 Role-Based Access & Security.
3. **"The ChanceRAG 4-stage retrieval pipeline."** — four divided rows (number · title + detail · tool chips): Intelligent Ingestion & Layout Parsing · Dual-Index Hybrid Vector Embedding · Context Compression & Cross-Encoder Reranking · Synthesized Reasoning & Citation Grounding.
4. **"Proven in mission-critical enterprise environments."** — four use-case cards, each with a metric line: Financial Filings & Due Diligence (10x faster audit review) · Legal & Contract Intelligence (99.4% citation accuracy) · Clinical Protocols & Research (HIPAA-compliant) · Technical Engineering Manuals (<250ms latency).
5. **FAQ** "Technical details before you deploy." — five questions (hallucinations vs standard RAG, tables/charts/scanned PDFs, deployment options, access control and SSO, vector databases and models).
6. Contact CTA, footer.

### 6.8 CuratorsAI — `/curators-ai`
1. **Hero:** eyebrow VOICE AGENT PLATFORM; H1 **"CuratorsAI, Voice-Driven Conversational Intelligence for Enterprise"**; buttons **Deploy Voice Agent →**, **See How It Works →** (scrolls down); right: hero photo in a glowing card.
2. **"Are you on mute?"** — tagline *"If your customers feel on mute, your business won't grow."* + three stat pillars: <240ms full-duplex latency · 99.4% ASR accuracy · 8+ native languages.
3. **"The Sub-250ms Real-Time Voice Pipeline."** — three cards (*Acoustic Perception — The Ear*, *Cognitive Engine — The Mind*, *Voice Modulation — The Voice*) each with a list of tech chips; then a **"Global Dialect Coverage"** panel of eight language tiles: EN · हिंदी · ES · FR · DE · 日本語 · PT · IT.
4. **"Deploy production voice agents in six simple stages"** — six step cards with a white top edge and "Step 0N" pill: Define Your Agent Persona · Voice Engine & Modulation · Knowledge Base Ingestion · Automated Action Triggers · Simulation & Latency Audit · Telephony Deploy & Scale.
5. Contact CTA, footer.

### 6.9 NavicaAI — `/navica-ai` 🟡
1. **Hero:** eyebrow AI CAREER INTELLIGENCE; H1 **"NavicaAI, Your Dream AI Career Mapped in Clicks"**; buttons **Map Your Future Free →**, **See How It Works →**; right: product screenshot with a **purple + blue** glow.
2. **"Because Your Career Deserves More"** — three pillars: 6+ tailored career paths · 10-minute compatibility test · 94% transition success rate.
3. **"It's your career, reimagined step by step"** — five stacked cards, each with text on the left and a **static mock-up of the app** on the right: 1 Upload Your Resume (dashed drop zone) · 2 Explore 6 Tailored Career Choices (role rows with match %) · 3 Get Your Complete Career Guide (three phases) · 4 Take Compatibility Assessment (question 3 of 10) · 5 Your Results, Your Roadmap (94% score).
4. **"What others are saying about Navica AI"** — four testimonial cards with initials avatars (Nisha Patel, Marcus Vance, Priya Sundaram, Liam O'Connor) — **look like placeholder content, no photos**.
5. Contact CTA, footer.

### 6.10 Service pages — shared template (University, Corporate, Content Strategy, Video; Content Writing is a close variant)
1. **Hero:** left = H1 (second half in gradient) + paragraph + two buttons; right = **16:9 image** in a rounded frame with a blue glow (`max 640px`).
2. **Disciplines** (`#060914` band with grid): H2 + paragraph on the left; a **2×2 grid of four cards** on the right, each with a coloured top edge (sky/blue cycle), number, title, note and three small tag chips.
3. **Method:** H2, then **four numbered rows** (number · step title · description).
4. **Closing statement:** big H2 + text link, a faint ring decoration; right column with a **serif quote** and a **six-cell fact grid** (small sky labels over values).
5. **FAQ** (4–5 questions).
6. Contact CTA, footer.

| Page | H1 | Hero image | Specific content |
|------|----|-----------|------------------|
| **Content Writing** | "Tailor-made content that *fits your brand perfectly.*" | **A 12-wedge colour wheel** of content types instead of an image: Articles, Thought Leadership, Script writing, Product Descriptions, Marketing Emails, Newsletters, Social Media Content, Blogs, Website Content, Translation Services, Ebooks & Guides, Technical Writing (rainbow amber→lime, dark hub "TYPES OF Content Writing") | Cards: Brand stories · Authority · Conversion · Clarity (each with its own colour edge: amber, sky, rose, green; no tags). Method: Listen for the useful detail · Find the sharpest angle · Make every line earn its place · Deliver work people can use |
| **Content Strategy** | "Data-driven content strategy that *turns insights into market leadership.*" | team photo | Cards: Topic Clusters & Pillars · Multi-Channel Distribution · Audience & Intent Intel · Editorial Governance & AI. **Extra section:** rounded card, "Semantic topic clusters & search intent pathways." with 3 bullets, a button "Request a Strategic Content Audit →", and a desk photo with two label chips |
| **Video Editing & Generation** | "Cinematic video production that *captivates and converts.*" | studio photo | Cards: AI Video Generation · Post-Production & VFX · Commercials & 3D Product · Social & Performance Clips (tags such as Runway Gen-3, DaVinci Resolve, 9:16 Vertical Feeds). **Extra section: a 3D video carousel** (below) |
| **University Training Programs** | "Hands-on GenAI curriculum that *empowers the next generation.*" | training photo | Cards: LLM Engineering & Agents · GenAI for Academic Research · Faculty Enablement & Tools · Hackathons & Capstones |
| **Corporate Trainings** | "Enterprise GenAI upskilling that *transforms teams into powerhouses.*" | training photo | Cards: Engineering & LLM Systems · Product & AI Solution Design · Leadership & AI Governance · Cross-Functional Automation |

**Video carousel (Video Editing page):** a 3D stage showing four 16:9 sample videos; the active one is centred and large, neighbours are tilted back at ~24° and dimmed; click a neighbour or use the ← → buttons or dots; videos play muted on a loop and the active one has a **Mute/Unmute pill**; counter "01 / 04" below. It has no heading or captions.

### 6.11 Website Revamp — `/services/website-revamp` 🟡
A **single hero only**: H1 *"Transform your digital presence with a high-converting revamp."*, paragraph mentioning the sister product Icypluto, image, and two buttons — **Explore Website Revamp on Icypluto ↗** (opens an external site) and **Schedule Consultation →**. No disciplines, method or FAQ sections — unlike the other six service pages. Buttons stack vertically on phones.

### 6.12 Data Annotation — `/services/data-annotation`
A different layout from the template, **no FAQ**, rounded cards.
1. **Hero** (5 : 7): eyebrow DATA SERVICES; H1 **"Personalised *Data Annotation* to accelerate your AI"**; paragraph (images, text, audio, video, 3D, RLHF; 99%+ accuracy); buttons **Start a Project →** and **See Our Process →**; right: hero photo.
2. **"What We Do"** — H2 "End-to-end annotation across every data modality"; four image cards (16:10 photo, "01 // TAG", a stat pill, title, description, format chips):
   - Image & Video Annotation Platform — Computer Vision — 4.2B+ labels (COCO, YOLO v8, Pascal VOC, LabelMe)
   - Voice Intelligence & Diarization Lab — Audio & Speech — <2% word error rate
   - LiDAR & 3D Sensor Annotation — 3D Point Cloud — 1.4M+ point clouds
   - Clinical Imaging & DICOM Segmentation — Healthcare & Medical — 99.8% clinical accuracy
3. **"Our Process"** — H2 "AI data experts lead your project *from start to end*"; six step cards with a white top edge: Requirement Definition · Frame Design · Data Screening · Pipeline Execution · QA & Management · Output Delivery (each with a deliverable footer such as "99.2% Consensus SLA").
4. Contact CTA, footer.

### 6.13 Contact emails
Sent from the form; both are light-theme HTML emails (600px white card, 16px radius, `#f4f7fb` page, 5px sky top bar `#38bdf8`, Arial, accents `#0284c7`):
- **To the visitor — receipt:** "Rabbitt AI" wordmark, tag "ENTERPRISE AI", H "We've received your inquiry.", a summary box of what they sent, signed "Enterprise Solutions Team", footer links (Documentation, Security whitepaper, Schedule a call).
- **To sales — new lead:** "RABBITT AI · SALES DESK", "A new inquiry is ready for review.", a details table, the message with a sky left rule, and a **"Reply to lead"** button.

### 6.14 Blogs — `/blogs`, article pages
- **Directory:** large H1 **"Blogs"** (up to 72px, plain white), eyebrow INSIGHTS, one-line intro. **Category chips** ("All" + categories; pill-shaped, sky when active, uppercase 12px, long names cut at 20 characters). **Grid** of 3 columns (2 on tablets, 1 on phones) of square-cornered cards: 16:9 image with fade, category tag top-left, 2-line title, 2-line description, avatar + "Rabbitt AI · date", and a "Read ›" label that appears on hover only (invisible on touch). Hover: card lifts, image zooms, title turns light sky. No CTA band.
- **Article:** narrow column (860px). Back link "All Blogs" → category pill + date → author block (logo + "Rabbitt AI Team", fixed) → title (up to 44px semibold) → description → hero image → article body in the style of §4.5 → "Back to Blogs". No share buttons, related posts or table of contents.
- **Loading:** grey pulsing skeleton of header, chips and six cards (without navbar/footer).
- **Content comes from a CMS** (each article has: title, short description, category, image, date, body written in Markdown).

### 6.15 Case studies — `/casestudies`, article pages
- **Directory:** mono eyebrow "PRODUCTION CASE STUDIES"; H1 **"Real results. *Production scale.*"** (second part light grey); right-aligned intro. **Tab filter** (square-ish tabs, active = solid white). **2-column grid of rounded cards** (16px radius): 16:9 image in an inner frame, category + running number "01, 02…", H2 title, 3-line description, date + "Explore study →". Contact CTA band below.
- **Article:** same structure as blogs, plus a grey "Case Study" pill before the category.
- Same CMS source as blogs. Skeleton does not match the real layout (3 square columns vs 2 rounded).

### 6.16 Webinars — `/webinars` 🟡
- H1 **"Technical Masterclasses"** + intro. **Filters:** underline tabs by topic (All · Agentic Systems · Enterprise RAG · Inference & Fine-Tuning · Data Annotation · Security & Compliance) and a toggle **All / Live / On-Demand**; they combine.
- **Featured card** (only when no filter is active): large rounded card, image left with a green pulsing **"Featured Live Session"** badge and a duration chip; right: category, title, description, date, white **"Register Free →"** (a rectangular, not pill, button).
- **Grid** "All Masterclasses (5 sessions)": rounded cards with a Live (green) or On-Demand (dark with play icon) tag, duration chip, category, 2-line title, description, date or "Instant Replay", and a "Register →" / "Watch →" text button.
- **Empty state:** "No sessions match your selected filters." + "Reset filters".
- **Registration pop-up:** dark rounded dialog with Full Name and Work Email, button "Confirm Free Registration" (live) or "Unlock Instant Replay" (on-demand), success screen with green check ("You're Registered!" / "Access Unlocked!"). Closes on backdrop click, X, or Escape.
- Six sessions, all written directly into the page:

| Title | Topic | Type | Length |
|-------|-------|------|--------|
| Multi-Agent Workflows in Production: State, Memory & Human Gates | Agentic Systems | Live — Wed 12 Nov 2025, 1:00 PM EDT | 55 min |
| Continuous LLM Evaluations: Beyond Synthetic Benchmarks in CI/CD | Enterprise RAG | Live — Thu 27 Nov 2025, 11:00 AM EDT | 50 min |
| Fine-Tuning Open Models for Specialized Legal and Financial Analysis | Inference & Fine-Tuning | On-demand | 52 min |
| High-Throughput Data Annotation: Quality Automation for Multimodal AI | Data Annotation | On-demand | 48 min |
| Zero-Trust LLM Infrastructure: Private VPCs, Guardrails & Dynamic DLP | Security & Compliance | On-demand | 58 min |
| Optimizing Inference Latency: Speculative Decoding & Tensor Parallelism | Inference & Fine-Tuning | On-demand | 64 min |

---

## 7. Inconsistencies a designer will notice

| # | Issue |
|---|-------|
| 1 | **Headline sizes and weights change page to page** (service pages ~47–55px bold, About up to 86px semibold, Blogs up to 72px bold, Webinars 60px semibold). H2s range from 24px to 60px |
| 2 | **Corner language is mixed:** square cards (service pages, blog cards, article content) next to 16px rounded cards (Data Annotation, Case Studies, Webinars) and pills |
| 3 | **Dark backgrounds are not one value:** at least 12 slightly different near-blacks (`#020305`, `#02050b`, `#030712`, `#060914`, `#060c18` …). About page uses its own blue-tinted family |
| 4 | **Filters look different on every list:** pill chips (Blogs) · square tabs (Case Studies) · underline tabs (Webinars) · sliding pill bar (Products) |
| 5 | **Gradient headline accent** is used on product and service pages but not on Blogs, Case Studies or Webinars; About uses flat sky-300 |
| 6 | **Page-bottom CTA band is missing** from Blogs, the article pages and Contact |
| 7 | **Wordmark is "Rabbitt"** in the navbar and footer but the company is "Rabbitt AI" everywhere else |
| 8 | **"Mono" style labels are not monospaced** (font mapping) — step numbers, tags and chips all render in Geist Sans |
| 9 | **Product marks are inconsistent:** nine of 19 products use letter monograms; IcyLunar uses a "◐" symbol |
| 10 | **Skeletons don't match real layouts** (Case Studies) and omit navbar/footer |
| 11 | **Dark only** — no light version of anything, including long-form reading pages |
| 12 | **Latency claim differs:** CuratorsAI says "<240ms" in the pillar but "sub-250ms" in headings |
| 13 | Button shapes vary: webinar "Register Free" is a rectangle; everywhere else pills; Website Revamp buttons have different padding |
| 14 | Colour contrast is low in places: slate-500/600/700 text on near-black (Contact intro, Contact footnote, Privacy body) |
| 15 | **Reduce motion** is respected only by the landing intro |

---

## 8. Unfinished, placeholder or broken — to complete

| # | Page | Item |
|---|------|------|
| 1 | Footer | Whitepapers, Careers, Newsroom — no pages |
| 2 | Webinars | Registration form is a **mock** (sends nothing, no replay video exists), yet the success message says an invite/replay "has been sent". Upcoming dates are in **2025** (stale). Webinar images are reused service/product photos; one purpose-made studio photo is unused. Form labels are not linked to inputs |
| 3 | Website Revamp | Hero only — needs the discipline, method and FAQ sections for parity |
| 4 | NavicaAI | Named testimonials and "94% success" look like placeholders; no photos. The CTA goes to the generic contact form |
| 5 | AINama | Both buttons go to the contact page; there is no "request a copy" flow. A stray backslash appears before "$1 Billion+" in the author bio |
| 6 | Products | Contact links with a product tag (`?product=…`) are ignored by the form. IcyPluto, IcyLingo and IcyLunar share one link; Pluto Circle points to a temporary test address. Nine products have no logo |
| 7 | Contact | Page promises reply "within 2 hours" but the visitor's email says "2–4 business hours". Email footer links (Documentation, Security whitepaper) point to pages that don't exist |
| 8 | Privacy | The Data Privacy Officer contact is the sales mailbox. The contents list is hidden on phones with no replacement. "Last updated" is typed in by hand |
| 9 | All service CTAs | Labels like "Download Enterprise Deck", "Request Showreel Samples", "Request Syllabus & Lab Specs" all just go to the contact page |
| 10 | Content Writing | Some eyebrow labels were commented out, leaving headings without their small label; the wheel uses Arial; the page title mentions "TransCurators" |
| 11 | Video Editing | "15+ Lng" abbreviation typo; carousel has no heading/captions and no reduce-motion handling |
| 12 | 404 | One quick link goes to a landing section that must exist; link descriptions are cut off; each card's small badge is defined but never shown |
| 13 | Blog / case study | Author is fixed to "Rabbitt AI Team"; no share, related posts, or contents list; if the CMS is down the list pages show an error instead of a friendly state |
| 14 | Hidden content | "Read ›" on blog cards only appears on hover — invisible on touch |
| 15 | Metadata | Social share image is the logo SVG; the installable-app colours are the dark `#020305` |

**Copy that needs fact-checking before launch** (marketing claims stated as fact): "70+ engagements / 500+ specialists" (About); "500+ projects, 1.7M+ annotations, 100+ clients" (landing); "99.4% citation accuracy", "10x faster", SOC 2 Type II (ChanceRAG); "<240ms latency, 99.4% ASR" (CuratorsAI); "94% transition success", "35% compensation" (NavicaAI); "4.2B+ labels, 99.8% clinical accuracy, FDA-Ready" (Data Annotation); SOC 2 sandboxes, zero retention, cohort sizes (Corporate Training).

---

## 9. Suggested order of work

1. **Design system first** — one background value, one accent, one heading scale, one corner radius, one button set, one filter style; then a **light theme**.
2. **Shared shell** — navbar, footer, CTA band (every page inherits them).
3. **Landing page** — adopt the new design from [`README-LANDING-PAGE.md`](./README-LANDING-PAGE.md) and decide which `main` sections return (journey, stats, FAQ, two-row logos).
4. **Templates** — one *service* template (7 pages), one *product* template (ChanceRAG, CuratorsAI, NavicaAI, AINama), one *directory + article* template (Blogs, Case Studies, Webinars).
5. **Contact flow** — page, form states, both emails.
6. **Products** page (19 products, 9 logos missing).
7. **About**, **Privacy** (with a mobile contents list), **404**.
8. **New pages:** Whitepapers, Careers, Newsroom.
9. **Finish the unfinished** (§8) and fact-check copy.

---

## 10. Reference

### Content sources
| Content | Source |
|---------|--------|
| Blogs and case studies | An external CMS; each item has title, description, category, image, date and Markdown body |
| Webinars | Typed directly into the page |
| Products, navigation, FAQs, stats | Typed directly into the code (the developer must change them) |
| Contact form | Sends two emails through an email service; needs an API key to work |

### Assets (ask the developer to export)
| Group | What |
|-------|------|
| Brand | Rabbitt logo mark (SVG), favicon |
| Product logos | IcyPluto, IcyQuill, DRIP, Cloud Watcher, ChanceRAG, OnSkill, PingU, AI Quest, Fire Reach (SVG) + NavicaAI screenshot |
| Customer logos | 25 PNG/SVG/WebP files |
| Photos | AINama cover, founder portrait, ChanceRAG hero, CuratorsAI hero, service heroes (content strategy ×2, video studio, university, corporate, website revamp, data annotation), four annotation photos (vision, audio, LiDAR, medical), webinar studio (unused) |
| Video | Landing hero video (staircase), four sample videos for Video Editing |
| Fonts | Geist (Google Fonts) |
