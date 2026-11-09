# Rabbitt AI — Landing Page Design Spec

> Single source of truth for the home page (`/`). Read this before touching any UI.
> Status legend: **DECIDED** (project owner said so, or applied and checked) · **PROPOSED** (my default, not yet confirmed) · **TBD** (needs input).
> Audited against the code and the running page on 2026-11-04: everything below describes what the page does now.

---

## 1. Purpose and audience — DECIDED

Rabbitt AI is a **service company** that builds **custom AI solutions** for clients, and also develops **its own products**.

- **Audience:** businesses (founders, product / data / engineering leads, and the people who sign off budgets) who need a custom solution or want to adopt one of our products.
- **Primary action:** contact us / book a demo (`/contactus`).
- **Secondary action:** explore products (`/products`).
- **The page must answer, in order:** what do you do → can I trust you → what have you built → how do I start.
- **Headline:** "Own your data. Own your AI." stays. The sub-copy under it is still to be reviewed so it also covers custom solutions.

## 2. Brand and tone — DECIDED

- **Main colour: blue** (taken from the logo, `#0061ff`).
- **Supporting colours: white and dark.** The dark theme is black, as on the original rabbitt.ai (the owner chose it over the deep blue tried earlier): page background `#000000`, with `#0a0b10` and `#14161f` for raised surfaces. The brand blue `#0061ff` is the only accent.
- Tone: corporate, plain, confident. Short sentences. No hype words, no jokes.

## 3. Design principles — DECIDED

1. **Minimal.** Few elements per screen, generous space, hairline dividers instead of boxes.
2. **Corporate.** Calm and trustworthy over playful. One accent colour.
3. **Little motion.** Smooth scroll plus a few subtle fades (§9).
4. **Server-first.** Everything meaningful is in the HTML the server sends (§12).
5. **Real, not generated.** Only real photos, real logos, and our own product screenshots (§14). The one exception is the hero object picture, kept on the owner's decision.

## 4. Theme — DECIDED: one dark page

The whole site is dark, on the one background `#000000`. Nothing is light: there is no intro screen (removed by the owner in November 2026, because the first screen has its own animation). There is no theme toggle, no colour button and no saved preference; every section has a fixed theme and marks itself with `data-nav-theme`, which the navbar reads.

| Part | Look |
|---|---|
| First screen (`HeroPull`) and the client logos | Dark, `#000000`; a canvas of white and light-blue particles around the centred words (§10) |
| Products | Dark, `#000000`, nothing behind the list |
| Services | Dark, `#000000`, a stack of three black cards on hairline borders, type only |
| Statement scene (pinned) | Dark, `#000000`: faint grid, a network of blue and white nodes and lines, white text with "Rabbitt" and "cloud" in the light blue |
| Numbers and dome (`Backbone`) | Dark, `#000000`, nothing behind the burst but the black page |
| Closing block with the globe | Dark, `#000000`, nothing behind the globe |
| Footer | Dark, `#000000`, no glow |

The navbar is dark over all of these, with a light variant kept for any light section added later.

## 5. Colour tokens — DECIDED (defined once in `app/globals.css`)

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--bg` | `#000000` | `bg-page` | Page background, footer |
| `--bg-raised` | `#0a0b10` | `bg-raised` | Dropdown panel, folded navbar card, bar once scrolled |
| `--surface` | `#14161f` | `bg-surface` | Inputs, any contained element |
| `--line` | `rgba(255,255,255,0.10)` | `border-white/10` | Hairlines and borders |
| text | `#ffffff` | `text-white` | Headlines |
| text muted | white at 70% | `text-white/70` | Body copy, links |
| text subtle | white at 55% | `text-white/55` | Labels, captions: **the floor, never lower** |
| `--brand` | `#0061ff` | `bg-brand` | Buttons, key accents, selection |
| `--brand-hover` | `#1a47d6` | `hover:bg-brand-hover` | Button hover |
| `--brand-text` | `#4d9bff` | `text-brand-text` | Blue **text**, links and focus ring on dark |

The page and components use these class names, not raw hex values.

Contrast (approximate): white on `#000000` is very high; white on the brand button is about 5:1 (passes); `#0061ff` as text on `#000000` is about 3.7:1 and **fails** for body text, so blue text always uses `--brand-text` (about 6.7:1).

Rules: one accent. No pink, violet or per-product colour. Product logos keep their own colours only inside the logo.

## 6. Typography — DECIDED: one family, **Inter**

**One font family for the whole site, loaded once in `layout.tsx` with `next/font/google`** (`display: "swap"`, self-hosted by Next). Every older font variable (`--font-display`, `--font-serif`, `--font-geist-sans`…) points at it, so no page can pick a second one. Code and mono text use the browser's default monospace stack, with no web font.

**Why Inter (UI/UX):**
> Our visitors are busy business buyers. They scan before they read, and they trust what is easy to read. So our type should disappear and let the message through. Inter was designed for screens: tall lowercase letters, open shapes and clear spacing that stay sharp at small sizes on a dark background. Letters that look alike (I, l, 1, 0, O) are drawn apart, which matters for a company that works with data. Its numbers stay aligned, so stats read cleanly. One family with many weights builds the whole hierarchy from size and weight alone, so we never mix fonts. It is neutral by design, so the brand is carried by the blue, the content and the work, not by decoration. Visitors have read Inter in countless software products, so the page feels familiar, credible and professional.

| Font | Why we passed |
|---|---|
| Instrument Serif | Thin serif strokes blur on dark backgrounds at small sizes. Reads as editorial, not B2B trust. Serif-plus-sans headings are the AI-template look we avoid. |
| Inter Tight | Same design with tighter spacing, which hurts body-text legibility. Also a second family. |
| Geist | A close second, newer and tied to one vendor's look. |
| Poppins / Montserrat | Wide, round shapes; hard to read in dense small text. |
| Roboto | Reads as the Android default; less refined numerals. |
| Space Grotesk / DM Sans / Jakarta | Trendy letterforms that date quickly. |
| Display serifs | Decorative; wrong for a brand built on clarity. |

Honest caveat: this is a reasoned choice, not a law. Geist or Source Sans would also work.

**Weights:** 400 body, 500 UI and buttons, 600 headings. Light 300 is not used on the page.

### Type scale — applied

| Element | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero headline | `clamp(2.5rem, 5.6vw, 4.5rem)` (40 → 72px) | 600 | 1.05 | −0.03em |
| Section headline (Products, numbers, closing block, statement) | `clamp(1.875rem, 3.4vw, 3rem)` (30 → 48px) | 600 (the statement 500) | 1.1 | −0.025em |
| Product name in the index | `clamp(1.75rem, 2.8vw, 2.5rem)` | 500 | 1 | −0.03em |
| Numbers | `clamp(2.5rem, 5vw, 4rem)` | 500, tabular | 1 | −0.03em |
| Body | 16 → 18px | 400 | 1.6 | 0 |
| UI and buttons | 15px | 500 | — | 0 |
| Label (uppercase) | 12px | 500 | — | +0.08em (footer column titles and navbar dropdown groups only; never above a heading, §16) |

## 7. Spacing, layout, radii — DECIDED (applied)

- **Base unit 4px.** Scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Content width: the whole screen**, with a side gutter of **20px** (phone), **32px** (tablet), **48px** (desktop) and **64px** (1280px and wider); reading text keeps its own narrow limit. One class does it: `.rb-container` in `globals.css`. The navbar, first screen, logos, products, numbers' heading, closing block (`SplitStage`), dropdown and footer all use it, so their left edges line up (measured: every one starts at x = 64px at 1440 and 1920 wide, 48px at 1024, 32px at 768 and 20px on a phone).
- **Section rhythm: 96px** top and bottom on desktop, **64px** on a tablet, **48px** on a phone: `.rb-section`, or `py-12 md:py-16 lg:py-24`. Products is the one exception: its top padding is 48px at every size, because the logos above it carry the space between the two.
- **Radii:** buttons 8px · cards, chips and the folded navbar card 12px · logos 8px. No pill buttons.
- **Breakpoints:** 640 · 768 · 1024 · 1280.

## 8. Components — DECIDED (applied)

Every interactive element shows one keyboard focus ring: 2px `--brand-text`, 2px offset (global `:focus-visible` in `globals.css`).

| Component | Spec |
|---|---|
| **Button, primary** | `bg-brand`, white text, 15px / 500, **48px tall**, 8px radius, side padding 28px, `hover:bg-brand-hover`, a 16px arrow that nudges on hover. In the navbar bar it is 40px tall so it sits in the 64px bar. |
| **Button, secondary** | Transparent, 1px border white at 10%, white text, same size, border to white at 40% on hover. |
| **Text link** | `--brand-text`, underline on hover, optional small arrow, at least 44px to hit on a touch screen. |
| **Section header** | One headline and one paragraph (max 60ch). **No label, number or eyebrow above it** (§16). |
| **Product row** | Logo, name, one line, link, on a hairline. On hover the hairline is drawn in the brand blue and an arrow appears. No glow and nothing that follows the pointer. |
| **Stat** | Large number, short label. The numbers are in the HTML as they are (no count-up from zero). The first one is lit by default; hovering another lights it and slides the bright hairline under it; leaving returns to the first. |
| **CTA block** | One headline, one sentence, one primary button, one text link. |
| **Tap targets** | At least 44×44px on a touch screen. |

### Navbar

- **Bar:** 64px, fixed, on the shared container. At the top it is transparent over the hero; once scrolled it is `--bg-raised` at 90% with a blur. Logo (mark and a solid white "Rabbitt AI", not gradient text) on the left, Products / Data / Services / Resources / AINama in the middle, one primary button on the right. Hamburger below 1024px.
- **Takes the colours of the section under it**, through `data-nav-theme`.
- **Compact behaviour** (modelled on adyen.com): scrolling down folds the bar into a small card at the top left (logo and a menu icon). The full bar comes back when the pointer comes to the card, and as soon as the page is scrolled up by even a little, without reaching the top; scrolling down folds it again. On a touch screen a tap on the card opens it and the next scroll down folds it. Folding thresholds: 12px down, 6px up. Everything moves on a 0.5s ease-out.
- **Dropdown** (modelled on adyen.com, our own content from `navData.ts`): hovering or clicking Products, Data, Services or Resources grows one wide panel from the bar and dims and softly blurs the page behind it. Left: the menu name in large type, one line about it and, where there is one, a link. Right: the entries under small uppercase labels (Our products; Services and Solutions; Custom services; Learn), each with its one-line description and, for products, its logo. No close button: Escape, a click on the dimmed page and leaving the panel close it. The menu name and the labels **decode** as the panel opens: they flicker through random characters and settle, left to right, into the real text in about 0.6s (screen readers get the real text at once, reduced motion skips the flicker). The panel stays while any menu is open; only its contents change. AINama is a plain link.

### Footer

- **Layout:** the brand on the left (logo and a white "Rabbitt AI", the one-line description, "Let's build the future together" as a plain underlined link, the LinkedIn and Instagram buttons at 48px with 8px corners), then Products, Services, Resources and Company side by side on hairlines, then a bottom bar with the copyright on the left and the privacy policy on the right and no icons. One tier, not two.
- **Style:** labels 12px uppercase at 55%; links 15px at 70% turning white with an underline that draws from the left; "View all products" at the bottom of its column in the light blue. **No arrows anywhere.** The column widths leave room for the longest names, so they stay on one line at 1280px.
- **Accordion below 1024px:** the four columns become titles with a plus or minus sign that open one at a time.
- **Open:** Whitepapers, Careers and Newsroom go nowhere yet (`#`).

### Where each part came from

| Part | Source | What was changed |
|---|---|---|
| First screen (`hero-options/HeroPull.tsx`) | New (headline from `new-rewamp`; after the agent section on krea.ai) | The line, the pull and the promise (§10). A client island: the timeline and the particle canvas. |
| Services (`Services.tsx`) | New | A stack of three sticky cards, set in type only (§10). A Server Component. |
| Client logos (`CompaniesStrip.tsx`) | New, modelled on adyen.com | See §10. |
| Products (`ProductsIndex.tsx`) | `new-rewamp` | Recoloured onto the dark page, one brand blue, one-weight heading, pointer glow removed, a Server Component. |
| Statement scene (`ScrollHero.tsx`, `Network.tsx`) | `new-rewamp` | Planet and icon chips removed, blue and white only, no parallax, headline moved to its own first screen. |
| Numbers and dome (`Backbone.tsx`, `Burst.tsx`) | `experiment` | One theme, no colour button, no count-up, no pink. |
| Case studies (`CaseStudies.tsx`) | New | Reads the real case studies from the CMS (cached hourly); built from the numbers section's type and the products list's hairlines. |
| Closing block (`CtaSection.tsx`, `SplitStage.tsx`, `Globe.tsx`) | `new-rewamp` | One-weight heading, aligned to the shared container; the globe is unchanged from `new-rewamp`. |
| Navbar (`Navbar.tsx`, `navData.ts`) | `new-rewamp` | Rebuilt: compact card, new dropdown, no theme toggle. |
| Footer (`MainFooter.tsx`) | `main` | Arrows removed, styled by this file, accordion on phones. |

Files in `components/home` that are not on the page: `HeroLoop.tsx` (option H on `/design`), `HeroMark.tsx`, `Hero.tsx`, `Logos.tsx`, `Products.tsx`, `Statement.tsx`, `HeroGradient.tsx`, `Footer.tsx`, `ThemeToggle.tsx` and `Companies.tsx`, plus `hero-options/` (used only by the `/design` review route).

## 9. Motion — DECIDED: smooth scroll, otherwise minimal

- **Smooth scroll:** Lenis (`components/SmoothScroll.tsx`), eased with `lerp: 0.07` over the whole site. A real mouse-wheel scroll was recorded at 40ms steps: 0 → 71 → 110 → 154 → 178 → 198 → … → 298px, a gliding ease-out rather than a jump. Off for reduced motion; touch keeps native scrolling.
- **Rising into place:** `.rb-rise` on load and `.rb-reveal` as an element scrolls into view, both pure CSS (12px up and fade, 500ms ease-out, where the browser supports scroll timelines). They never hide content before they run, and they do not run for reduced motion.
- **Hover:** colour, border and underline transitions of 150–500ms.
- **No parallax.** The network no longer shifts with the scroll.
- **Owner-chosen exceptions** (decorative, kept on purpose, all static for reduced motion): the logo strip changes five logos every 3.8s; the statement scene's network drifts and sends pulses of light along its lines; the numbers section's burst; the globe turns slowly (nothing else on it moves); the hero object drifts slowly up and down (9s), with its three labels moving with it.
- **Never:** pointer-following effects, auto-playing video with sound, animation that blocks reading, content hidden until JavaScript runs.

## 10. Page structure — DECIDED (current order)

`app/page.tsx`: Skip link → Navbar → **First screen** → **Client logos** → **Products** → **Services** → **Statement scene** → **Numbers and dome** → **Where your AI runs** → **Case studies** → **Founder** → **FAQ** → **Closing block with globe** → **Footer**.

- **Logo strip:** bare white wordmarks on the same dark page, no bar or band. Held at the bottom of the first screen while that screen scrolls away (CSS `position: sticky`), then it lands right under it and scrolls on; it stops there. The first screen is 106svh tall, so the logos are held for about 190px of scrolling at 1280×800. The first screen's glow and grid fade out toward its bottom edge, and the gap above the logos equals the gap below (118px each at 1280×800). Five logos at a time (three on a phone), changing every 3.8s. The 10 wordmark logos only; the 15 app-style square icons can't take a white version. All names are in the page text for crawlers.
- **Services** (`Services.tsx`): dark, on `.rb-section` and the shared container, right after the products, with `id="services"` so `/#services` jumps to it. Added because Rabbitt is a service company first (§1) and the page showed only products. **One headline** ("Services for every stage of adopting AI."), one plain line under it ("Nine services in three areas. Pick one, or start with a conversation.") and a "Talk to us" text link to `/contactus`. **History, so it is not repeated:** hairline columns were rejected as the same as Products; the same list in raised boxes was rejected as "just coloured"; the numbers 01–03 were rejected as double headings (§16); and the stacking cards with **drawn illustrations** (a wireframe of documents feeding a model, a browser window, a staircase of dots, on a dot grid, with a pulsing glow and a cast shadow) were rejected as looking AI-generated. **The idea is a stack of sheets, set in type only.** Three full-width cards, one per practice area, **Data and AI** (Data Annotation, CuratorsAI, NavicaAI), **Content and web** (Content Writing, Content Strategy, Video Editing & Generation, Website Revamp) and **Training** (Corporate Trainings, University Training Programs). From 1024px each card is `position: sticky`, 18px lower than the one before (top 88, 106, 124px), 40px apart, so scrolling slides each card up and over the previous one while that card's top edge stays visible; below 1024px they are simply stacked 16px apart. **All three cards must be the same height** (the grid rows are `1fr`, so every card is as tall as the tallest, 552px at 1440): a shorter card cannot cover a taller one, which left the Content card showing under the Training card in an earlier version. After the last card the grid has one empty row, 24vh tall, inside the same block, so the finished stack (tops 88, 106 and 124px) stays pinned for about a fifth of a screen before it scrolls away; without it the stack collapsed the instant the last card landed. **Sticky only works while nothing above it has `overflow: hidden`** (the intro locks the body's scroll while it plays). CSS only, nothing hidden, no script. A card is flat and on **the page's own black** (`bg-page`, opaque so the next card covers it), with a 1px hairline border white at 15% and 12px corners (§7), 48px padding (32 on a tablet, 24 on a phone), at least 26rem tall, **no filled grey or navy surface** (every other section is bare black with hairlines, and a `#0a0b10` fill on these cards was rejected by the owner as not fitting the theme), **no shadow, glow, dot grid, picture or drawing**. Two columns (0.9fr / 1.1fr, 64px apart): on the left the area name as its only heading (`clamp(1.875rem, 3.2vw, 2.75rem)` / 600, nothing above it) and one line at 70%; on the right its services as large rows between hairlines: the name (`clamp(1.25rem, 1.8vw, 1.625rem)` / 500), one line (15px at 65%) and an arrow at 55%. On hover the name and arrow turn `--brand-text` and the arrow nudges up and right. No motion of its own. Every link goes to a page that exists, and the lists match the navbar's Data and Services menus (`navData.ts`). A Server Component.
  **Why no pictures:** the repo has no real photographs or product screenshots for these services. `public/assets/*-real.jpg`, `*-hero.jpg` and `annotation-*.jpg` are AI-generated (garbled text on screens and boards) and `curators-hero.jpg` is an invented mock-up, so §14 and §16 rule them out. Add images here only when real ones exist (real photos of the team or workshops, real product screenshots).
- **Statement scene:** pinned for 230svh. Nothing but the faint grid is on screen before the text; the statement fades in first, the network fades in just after it and then grows node by node while the words are revealed word by word.
- **Case studies** (`CaseStudies.tsx`): dark, on `.rb-section` and the shared container. **One headline only** ("Results from work already in production.", no label above it, per the no-double-headings rule in §16) and a text link "View all case studies" to `/casestudies`. Under a hairline, three equal columns split by hairlines (one column on a phone). **No pictures:** the case-study images in the CMS are colourful and AI-looking, and they fought the black, one-accent page (tried and removed at the owner's request). Each card is type only, with nothing above its number (the category label that sat there was removed as a double heading, §16): the study's biggest result as a very large tabular number (`clamp(3.5rem, 7.2vw, 6.5rem)`, 500, line height 0.9, tracking −0.04em — larger than the numbers section on purpose, because it is the card's whole picture), its one-line label, the study's title, and a "Read the case study" text link pinned to the bottom (cards are at least 26rem tall on desktop so the links line up). On hover the number turns `--brand-text`, the arrow nudges and a hairline is drawn in the brand blue under the card; the whole card is the link to `/casestudies/[slug]`. **The content is real, not written for the page:** it is the three newest studies from the CMS (`fetchCaseStudiesCached` in `lib/cms.ts`) that have a result in their headline, and the number is the largest "NN% …" found in that headline. A Server Component with no script. The list is cached and refreshed hourly (`revalidate: 3600`, not `no-store`), so `/` stays pre-rendered (§12); if the CMS cannot be reached the section is left out. Today it shows 80% fewer hallucinations, 70% shorter call handling and 400% faster data processing.
- **Where your AI runs** (`WhereItRuns.tsx`, `WhereItRuns.module.css`): added in November 2026 to answer "can I trust you" (§1) with something concrete; the statement scene and the numbers already say "your data stays in your cloud", so this one says *where* it runs. Dark, on `.rb-section` and the shared container, between the numbers and the case studies, with `id="where-it-runs"`. **One headline** ("Run it where your data already lives."), one line under it. Below: **three large words you choose between** ("Your private cloud", "Your own servers", "An air-gapped site", `clamp(2rem, 5vw, 4.25rem)` / 600) in the left column, and the explanation of the chosen one in the right column with a "Talk to us about your setup" text link; the chosen word is white with a brand-blue underline, the others sit at 55%. On a phone they stack. **Chosen with real radio buttons and `:has()`, no script**; all three explanations are in the HTML, and where `:has()` is unsupported all three simply stay visible. (CSS modules rename `#id` selectors, so the module uses attribute selectors.) Under a hairline, three guarantees: Zero data retention, Never trains shared models, The weights stay yours. Every sentence is taken from the FAQ answers, so the page says one thing in both places. Type only; it is deliberately unlike the rows (products), stacked cards (services), columns (case studies) and accordion (FAQ). A Server Component.
- **Founder** (`Founder.tsx`): added in November 2026, between the case studies and the FAQ, as a real person behind the company (§1). **The quote is the section's only headline** (no label above it, §16): the founder's own published words, "In the new world, we are helping companies become the landlords of AI world rather than just the tenants like the past Internet world.", with the name and role under it. Left, the real photograph `public/assets/harneetsingh.png` (§14) in a 12px frame, **shown in its own colours** (a black-and-white version was tried first; the owner chose colour); on a phone it sits above the quote. Then one paragraph and a link, "Read the announcement", to the funding post `/blogs/rabbittai-raises-21-million-from-tc-group-of-companies`. **The facts are only those in that announcement, worded the way it words them:** a serial entrepreneur and IIT Delhi alum who has built five companies; a $2.1 million seed round in 2024 with TC Group and **angel investors from NVIDIA, Meta and Microsoft, not those companies themselves**. Do not write "backed by NVIDIA, Meta and Microsoft" and do not add logos of those companies. The photo is a casual one (a restaurant window); a formal headshot would be better. A Server Component.
- **FAQ** (`Faq.tsx`): dark, on `.rb-section` and the shared container. Left: one headline (no label above it), one line and a text link to `/contactus` (sticky on desktop). Right: seven questions on hairlines, each a native `<details>` (one open at a time through `name`), a plus that turns to a cross when open. A Server Component with no script; the answers are also sent as `FAQPage` JSON-LD.
- **Closing block:** a hairline of light, then the split stage: copy on the left, a smaller globe (up to 420px) on the right, both centred on the same line (desktop only).
- **Globe:** the dotted globe as it was on `new-rewamp`: dark blue ocean, continents in fine light dots, a faint graticule and a thin rim of light, turning slowly. The data-centre lines, hub points and pulses were tried and removed at the owner's request.
- **First screen** (`hero-options/HeroPull.tsx`, option J "The pull", after the agent section on krea.ai; chosen by the owner in November 2026): one full screen, centred, in three beats that play by themselves as soon as the page opens (the joke's word-by-word fade is plain CSS from the first paint; the rest starts once the screen is in view). 1. One line about big public models fades in word by word while particles of light stream out from around it. 2. The particles are pulled back in and spell "Own your data. Own your AI.", which sharpens into the real h1. 3. They settle into a slow orbit around the headline, and the one line of copy and the two buttons rise in. Every word is in the HTML from the first paint; the particles are a decorative canvas under the text, drawn at full strength **everywhere, including behind the headline, the copy and the buttons** (they used to dim near the text, which left an empty patch around it; the owner asked for that to go); reduced motion shows the final frame. **Kept smooth on purpose (do not undo):** the particles are created and drawn from the first frame, and only afterwards, once the font is in, is each given its place in the headline (read from a small crop of the headline, not the whole screen); the canvas eases in over 1.2s; the joke's and headline's blur and fade sit on their own GPU layers (`will-change`); the loop never reads layout each frame (the boxes are measured once, and again on resize or when the font arrives); the pixel ratio is capped at 1.5. Measured at 1440 × 900: the loop costs about 3ms a frame (it was 6ms, with spikes to 27ms). The previous first screen, the loop, is kept on `/design` as option H and described below.
- **The loop** (`HeroLoop.tsx`, option H, the first screen until November 2026): words on the left, vertically centred above the logos: the headline "Own your data. Own your AI." (one h1, Inter 600), one line of copy, a **blue** primary button (`bg-brand`) and a secondary outline button. On the right, from 1024px up, the loop, which fills the whole right side down to the logo strip, drawn on a 700 × 840 grid and sized with container units so it scales as one piece. A ring with a dial of ticks and a slow dotted outer ring; three stage nodes, and their names (Connect, Train, Deploy) set as real text never below 12px, centred on the dotted outer ring at the top, lower right and lower left, each on a solid black plate that breaks the ring and the dial behind it, the word lighting when the arrow is at its stage; one arrow with a glowing arc trailing behind it that travels the ring and rests at each stage (one 12s cycle); in the middle three short bars showing which stage it is, the stage name in the light blue, and the caption under it changing word by word. **No numerals anywhere in the picture** (the big step numbers and the 01 / 02 / 03 tags were tried and dropped). Four cards joined to the ring by hairlines, each running from the middle of a card edge to a point on the ring at an angle chosen to stay clear of the three names (the cards sit at the corners of the right side, so no line crosses a card or a word), each a live little interface that plays out once per cycle in its own stage. A card has a plain header (its name only), a body, and a footer under a hairline that holds a small rounded badge (a thin-line icon in the light blue on a tinted square) and one line of text; there are **no decorative dots and no bare icons on the cards**. Document search: a search that types itself and finds files where they are (HardDrive badge). Data annotation: boxes that draw themselves over a page with their tags above them, and a Labelled 1,204 / 5,000 line with a progress bar (Users badge). Training run: a loss curve being drawn, with Epoch and Loss on one line (KeyRound badge). Support agent: a chat being answered (Cloud badge). Short streaks of light ride the hairlines into the ring in Connect and Train and out of it to the support agent in Deploy. The sample texts in the cards (file names, scores, the chat) are placeholders written for the picture. All CSS, no script (`.rb-*` in `globals.css`); reduced motion shows one still frame. Below 1024px only the words show. Earlier first screens (abstract object, glass rabbit) and the other options live on the `/design` route (A to I, the loop is H); that route is noindex and is deleted once the owner has decided.

Not decided yet: whether a process section or real client stats are added (§18).

## 11. Responsive — DECIDED

Works on every device from 320px phones to wide desktops. Checked at 375 (the pane's smallest width is about 386), 768, 1024, 1440 and 1920 wide: no horizontal scroll, the hero headline is 40px on a phone, and no touch target under 44px was found on a phone.
- Mobile first. Single column below 768px.
- Large decorative elements (the globe) are not used below 1024px.
- Test widths: 320 · 375 · 768 · 1024 · 1440 · 1920 (all but 320 checked; 320 still needs a real device).

## 12. Rendering — DECIDED: server-side rendering, pre-rendered

- **Pre-rendered**, not per request: `next build` marks `/` as static (`○`). No `force-dynamic`, no `cookies()` or `headers()` on the home page. The built HTML contains the headline, the logos' names, the product names, the statement, the numbers section, the closing block, the footer links and the skip link, and the share-image tags.
- **Server Components:** `app/page.tsx`, `HeroLoop`, `ProductsIndex`, `CaseStudies`, `CtaSection`.
- **Small client islands**, each for a real reason: `Navbar` (compact bar, dropdown, menu), `MainFooter` (the phone accordion and the Products page's category memory), `CompaniesStrip` (the changing logos), `Backbone` (hover state), `HeroPull` (the first screen's timeline and particle canvas), `ScrollHero` and `Network` (scroll-linked scene), `SplitStage` and `Globe` (WebGL, desktop only, and not loaded until the visitor is within a screen of it, so it never competes with the first screen's animation), `SmoothScroll`. They are still rendered to HTML on the server.
- **Not allowed:** `dynamic(..., { ssr: false })` (none left), content that appears only after `useEffect`, data fetched in the browser for first paint.
- Data (products, nav) lives in plain TypeScript files (`productsData.ts`, `navData.ts`). The one exception is the case studies, which come from the CMS on the server and are cached for an hour (`revalidate`), never `no-store`, so the page stays static.
- Metadata through the `metadata` export; JSON-LD in `layout.tsx`; fonts through `next/font`; images through `next/image`.

## 13. Accessibility — DECIDED (applied)

- Contrast: text never lower than white at 55% on the dark page; blue text uses `--brand-text`.
- Keyboard: one visible focus ring everywhere, Escape closes the dropdown, a **skip-to-content link** is the first thing in the page, the folded navbar's hidden version is `inert`.
- Semantic HTML: one `h1`, ordered `h2`s, `nav`, `main` (`id="main"`) and `footer` landmarks, `aria-label` on icon buttons, the decoded menu headings carry the real text for screen readers, the statement is in the page as plain text.
- `alt` text on meaningful images; decorative ones empty.
- `prefers-reduced-motion`: no rising, no smooth scroll, no flicker, no logo changes, no network or globe motion.

## 14. Assets — DECIDED

- Logo `public/logo.svg`, product logos, client logos (`public/brands`, with white versions in `public/brands/dark`).
- **No blurred glow patches** on the black page (large blurred blue blobs look like stains). The hero object sits on plain black with no glow or shadow around it.
- **No AI-generated visuals**, except `public/hero-object.png` (the hero object, generated by the owner and recoloured to our blues). Allowed: real photos, product screenshots, real client logos, Lucide icons, simple shapes drawn in code.
- **Share image:** `app/opengraph-image.tsx`, 1200×630, drawn in code from the brand's colours and words (pre-rendered at build). It replaces the logo SVG that was used before.
- `app/manifest.ts` uses `#000000` for the theme and background colour.
- Still missing: logos for products that have none (they show a letter).

## 15. Performance budget — PROPOSED (not yet met)

| Metric | Target | Now |
|---|---|---|
| JS on first load of `/` | under 150KB gzipped | **about 256KB** (measured from the built page's scripts; the globe's `three` is a separate chunk, loaded only on wide screens) |
| LCP / CLS / INP | under 2.5s / 0.1 / 200ms | not measured |
| Lighthouse (mobile) | 90+ Performance, 100 Accessibility, 100 SEO | not run |

The weight is React and Next, `framer-motion` (used by the navbar, the numbers section, the statement scene, the network and the logo strip) and `lucide-react`. The way down is to replace `framer-motion` in the simple places (the strip and the numbers hairline) with CSS. `HeroIntro` and `ProductsIndex` already no longer use it.

## 16. Don'ts — DECIDED

- **No double headings:** no bold-clause + light-clause split headlines and no serif-plus-sans mixed headlines. One heading per section: one font, one weight, one colour.
- **No labels, numbers or eyebrows above or beside a heading — never, anywhere on the site (owner's rule, November 2026).** A heading always stands alone. This counts as a double heading and is banned in every form: step or index numbers (01, 02, 03 / 1. 2. 3. / "Step 1"), small uppercase kickers or eyebrows ("OUR SERVICES", "WHY US"), category tags above a card's title or number, and any second line of type stacked on a heading to introduce it. Applies to section headings, card and panel headings, and the big numbers that lead a card. If the grouping needs explaining, say it in the heading itself or in the one line of copy under it. The only 12px uppercase labels allowed are titles of link lists that have no heading of their own: the footer columns and the navbar dropdown groups.
- **No two sections that look alike.** Each section has its own layout; a new one is never a restyle of a neighbour (e.g. the services are raised panels because the products directly above are open rows on hairlines).
- **No AI-generated content or visuals** (the hero object picture is the one exception, §14).
- No second accent colour (no pink), no gradient text on the page. Pure black `#000000` is the page colour by the owner's choice.
- No pointer-following effects.
- No second font family.
- No content hidden until JavaScript runs; no client-only rendered content.
- No arrows in the footer; no close button on the dropdown; no colour button anywhere.
- **No text on top of anything** (exception: the first screen's particles, which pass behind its words by the owner's decision, §10). A word never sits on a line, a ring, a tick, a hairline or another element. Give it clear space, or its own solid plate that breaks what is behind it. Check it at the smallest laptop size (1280 × 720), where the 12px floor makes text biggest compared with a picture that scales down, and at every stage of an animation.

## 17. Launch checklist

- [x] One dark theme, tokens defined once and used as class names
- [x] One font family (Inter)
- [x] One layout: shared container, shared section rhythm, 8px radii, 48px buttons
- [x] First screen, logos, products, statement scene, numbers, closing block, footer, navbar built and checked
- [x] First screen, products and closing block are Server Components; `/` pre-renders as static
- [x] Share image and manifest colours
- [x] Skip link, global focus ring, 44px tap targets
- [ ] Delete the `/design` route (`app/design`), `components/home/hero-options` and `HeroMark.tsx` once a hero is chosen
- [ ] Replace `framer-motion` in the simple places to get under the 150KB budget
- [ ] Dead links: Whitepapers, Careers, Newsroom (build or remove)
- [ ] Confirm the numbers and the copy are real and signed off
- [ ] Contact / demo form and `/api/contact` tested end to end
- [ ] Analytics and cookie consent (if required)
- [ ] Lighthouse and a real-device test (320, 375, 768, 1024, 1440, 1920)
- [ ] Domain, production deploy, sitemap and robots check

## 18. Open questions

1. The right half of the first screen is now the generated blue object (`hero-object.png`). Keep it, pick another option on `/design`, or replace it with a real product screenshot once one is ready?
2. Does a process section or real client statistics join the page? (The services section was added in November 2026, §10.) The numbers (6 products, 7 services, 4 business units, 100%) are still placeholders until confirmed.
3. The hero sub-copy: does it also cover custom solutions?
4. Keep Whitepapers, Careers and Newsroom, or remove them from the footer until the pages exist?
