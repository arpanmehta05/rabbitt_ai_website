# Rabbitt AI — Landing Page Design Spec

> Single source of truth for the home page (`/`). Read this before touching any UI.
> Status legend: **DECIDED** (project owner said so, or applied and checked) · **PROPOSED** (my default, not yet confirmed) · **TBD** (needs input).
> Audited against the code on 2026-11-03: everything below describes what the page does now.

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
- **Supporting colours: white and dark.** The dark theme is a deep blue built from the brand blue: page background `#060d26`, with `#0a1640` and `#0e1d52` for raised surfaces and glows of `#0061ff`. The near-black `#020305` from `main` was tried and dropped as too harsh.
- Tone: corporate, plain, confident. Short sentences. No hype words, no jokes.

## 3. Design principles — DECIDED

1. **Minimal.** Few elements per screen, generous space, hairline dividers instead of boxes.
2. **Corporate.** Calm and trustworthy over playful. One accent colour.
3. **Little motion.** Smooth scroll plus a few subtle fades (§9).
4. **Server-first.** Everything meaningful is in the HTML the server sends (§12).
5. **Real, not generated.** Only real photos, real logos, and our own product screenshots (§14).

## 4. Theme — DECIDED: one dark page

The whole site is dark, on the one background `#060d26`. The only light thing is the intro screen that plays first. There is no theme toggle, no colour button and no saved preference; every section has a fixed theme and marks itself with `data-nav-theme`, which the navbar reads.

| Part | Look |
|---|---|
| Intro (plays first) | Light: pale blue-white screen, blue ring and mark |
| First screen (`HeroIntro`, `HeroObject`) and the client logos | Dark, `#060d26`, with a faint grid and glows of the brand blue that fade out toward the bottom edge; on the right one abstract blue object (§10) |
| Products | Dark, `#060d26`, one soft blue glow |
| Statement scene (pinned) | Dark, `#060d26`: faint grid, brand-blue glows, a network of blue and white nodes and lines, white text with "Rabbitt" and "cloud" in the light blue |
| Numbers and dome (`Backbone`) | Dark, `#060d26`, a soft blue glow behind the burst that fades out before the edges |
| Closing block with the globe | Dark, `#060d26`, a blue glow behind the globe |
| Footer | Dark, `#060d26`, a blue glow in the top left |

The navbar is dark over all of these, with a light variant kept for any light section added later.

## 5. Colour tokens — DECIDED (defined once in `app/globals.css`)

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--bg` | `#060d26` | `bg-page` | Page background, footer |
| `--bg-raised` | `#0a1640` | `bg-raised` | Dropdown panel, folded navbar card, bar once scrolled |
| `--surface` | `#0e1d52` | `bg-surface` | Inputs, any contained element |
| `--line` | `rgba(255,255,255,0.10)` | `border-white/10` | Hairlines and borders |
| text | `#ffffff` | `text-white` | Headlines |
| text muted | white at 70% | `text-white/70` | Body copy, links |
| text subtle | white at 55% | `text-white/55` | Labels, captions: **the floor, never lower** |
| `--brand` | `#0061ff` | `bg-brand` | Buttons, key accents, selection |
| `--brand-hover` | `#1a47d6` | `hover:bg-brand-hover` | Button hover |
| `--brand-text` | `#4d9bff` | `text-brand-text` | Blue **text**, links and focus ring on dark |

The page and components use these class names, not raw hex values.

Contrast (approximate): white on `#060d26` is very high; white on the brand button is about 5:1 (passes); `#0061ff` as text on `#060d26` is about 3.7:1 and **fails** for body text, so blue text always uses `--brand-text` (about 6.7:1).

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
| Label (uppercase) | 12px | 500 | — | +0.08em |

## 7. Spacing, layout, radii — DECIDED (applied)

- **Base unit 4px.** Scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Content width: the whole screen**, with a side gutter of **20px** (phone), **32px** (tablet), **48px** (desktop) and **64px** (1280px and wider); reading text keeps its own narrow limit. One class does it: `.rb-container` in `globals.css`. The navbar, first screen, logos, products, numbers' heading, closing block (`SplitStage`), dropdown and footer all use it, so their left edges line up (measured at 1440px wide: every one at x = 112px).
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
| **Section header** | Optional 12px uppercase label, one headline, one paragraph, max 60ch. |
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
| Intro (`Intro.tsx`) | New | CSS-only: the mark appears, a blue ring draws, name and promise fade in, a line fills, the screen lifts away (~3.3s). Once a day, skippable (button or Escape), off for reduced motion. |
| First screen (`HeroIntro.tsx`, `HeroObject.tsx`) | New (headline from `new-rewamp`) | Left: the copy and two buttons. Right: one abstract blue object (§10). Both Server Components. |
| Client logos (`CompaniesStrip.tsx`) | New, modelled on adyen.com | See §10. |
| Products (`ProductsIndex.tsx`) | `new-rewamp` | Recoloured onto the dark page, one brand blue, one-weight heading, pointer glow removed, a Server Component. |
| Statement scene (`ScrollHero.tsx`, `Network.tsx`) | `new-rewamp` | Planet and icon chips removed, blue and white only, no parallax, headline moved to its own first screen. |
| Numbers and dome (`Backbone.tsx`, `Burst.tsx`) | `experiment` | One theme, no colour button, no count-up, no pink. |
| Closing block (`CtaSection.tsx`, `SplitStage.tsx`, `Globe.tsx`) | `new-rewamp` | One-weight heading, aligned to the shared container; the globe is unchanged from `new-rewamp`. |
| Navbar (`Navbar.tsx`, `navData.ts`) | `new-rewamp` | Rebuilt: compact card, new dropdown, no theme toggle. |
| Footer (`MainFooter.tsx`) | `main` | Arrows removed, styled by this file, accordion on phones. |

Files in `components/home` that are not on the page: `Hero.tsx`, `Logos.tsx`, `Products.tsx`, `Statement.tsx`, `HeroGradient.tsx`, `Footer.tsx`, `ThemeToggle.tsx` and `Companies.tsx`.

## 9. Motion — DECIDED: smooth scroll, otherwise minimal

- **Smooth scroll:** Lenis (`components/SmoothScroll.tsx`), eased with `lerp: 0.07` over the whole site. A real mouse-wheel scroll was recorded at 40ms steps: 0 → 71 → 110 → 154 → 178 → 198 → … → 298px, a gliding ease-out rather than a jump. Off for reduced motion; touch keeps native scrolling.
- **Rising into place:** `.rb-rise` on load and `.rb-reveal` as an element scrolls into view, both pure CSS (12px up and fade, 500ms ease-out, where the browser supports scroll timelines). They never hide content before they run, and they do not run for reduced motion.
- **Hover:** colour, border and underline transitions of 150–500ms.
- **No parallax.** The network no longer shifts with the scroll.
- **Owner-chosen exceptions** (decorative, kept on purpose, all static for reduced motion): the logo strip changes five logos every 3.8s; the statement scene's network drifts and sends pulses of light along its lines; the numbers section's burst; the globe turns slowly (nothing else on it moves); in the hero picture, three small lights circle on their own rings (46s, 78s, 120s a turn) and one arc of light slides around the inner ring (9s).
- **Never:** pointer-following effects, auto-playing video with sound, animation that blocks reading, content hidden until JavaScript runs.

## 10. Page structure — DECIDED (current order)

`app/page.tsx`: Skip link → Intro → Navbar → **First screen** → **Client logos** → **Products** → **Statement scene** → **Numbers and dome** → **Closing block with globe** → **Footer**.

- **Logo strip:** bare white wordmarks on the same dark page, no bar or band. Held at the bottom of the first screen while that screen scrolls away (CSS `position: sticky`), then it lands right under it and scrolls on; it stops there. The first screen is 106svh tall, so the logos are held for about 190px of scrolling at 1280×800. The first screen's glow and grid fade out toward its bottom edge, and the gap above the logos equals the gap below (118px each at 1280×800). Five logos at a time (three on a phone), changing every 3.8s. The 10 wordmark logos only; the 15 app-style square icons can't take a white version. All names are in the page text for crawlers.
- **Statement scene:** pinned for 230svh. Nothing but the faint grid is on screen before the text; the statement fades in first, the network fades in just after it and then grows node by node while the words are revealed word by word.
- **Closing block:** a hairline of light, then the split stage: copy on the left, a smaller globe (up to 420px) on the right, both centred on the same line (desktop only).
- **Globe:** the dotted globe as it was on `new-rewamp`: dark blue ocean, continents in fine light dots, a faint graticule and a thin rim of light, turning slowly. The data-centre lines, hub points and pulses were tried and removed at the owner's request.
- **First screen:** the headline, one line and two buttons on the left. On the right, `HeroObject`: one abstract 3D object in the brand blue (a tilted disc, a pane of glass, a flat disc slicing through it, stepped bars and a six-sided plate), in the manner of the object on Together AI's home page. The picture is `/public/hero-object.png`, a transparent PNG (1195×788) that the owner generated with an image tool from a reference and recoloured to our blues; it is the one generated picture on the site, used on the owner's decision. Three thin labels (Your data, Your model, Your cloud) are live text over it, the picture drifts slowly up and down (9s) behind a soft blue glow, and the motion stops for reduced motion. A Server Component, loaded with `next/image` (priority), shown from 1024px up and sized by the screen's height and the column (checked at 1440×900 and 1280×720). Earlier tries were replaced: a labelled architecture diagram, an abstract orb, the Rabbitt mark (`HeroMark`, kept in the repo) and a code-drawn version of the object. Other options built for review live on the `/design` route (A type-led, B product window, C story scene, D the object); that route is noindex and is deleted once a hero is chosen.

Not decided yet: whether a services section, a process section or real client stats are added (§18).

## 11. Responsive — DECIDED

Works on every device from 320px phones to wide desktops. Checked at 320, 375 and 1440 wide: no horizontal scroll, the hero headline is 40px on the smallest phone, and tap targets are at least 44px.
- Mobile first. Single column below 768px.
- Large decorative elements (the globe) are not used below 1024px.
- Test widths: 320 · 375 · 768 · 1024 · 1440 · 1920 (768, 1024 and 1920 not yet checked).

## 12. Rendering — DECIDED: server-side rendering, pre-rendered

- **Pre-rendered**, not per request: `next build` marks `/` as static (`○`). No `force-dynamic`, no `cookies()` or `headers()` on the home page. The built HTML contains the headline, the logos' names, the product names, the statement, the numbers section, the closing block, the footer links and the skip link, and the share-image tags.
- **Server Components:** `app/page.tsx`, `HeroIntro`, `HeroObject`, `ProductsIndex`, `CtaSection`.
- **Small client islands**, each for a real reason: `Navbar` (compact bar, dropdown, menu), `MainFooter` (the phone accordion and the Products page's category memory), `CompaniesStrip` (the changing logos), `Backbone` (hover state), `ScrollHero` and `Network` (scroll-linked scene), `SplitStage` and `Globe` (WebGL, desktop only), `Intro` (remembers it was seen), `SmoothScroll`. They are still rendered to HTML on the server.
- **Not allowed:** `dynamic(..., { ssr: false })` (none left), content that appears only after `useEffect`, data fetched in the browser for first paint.
- Data (products, nav) lives in plain TypeScript files (`productsData.ts`, `navData.ts`).
- Metadata through the `metadata` export; JSON-LD in `layout.tsx`; fonts through `next/font`; images through `next/image`.

## 13. Accessibility — DECIDED (applied)

- Contrast: text never lower than white at 55% on the dark page; blue text uses `--brand-text`.
- Keyboard: one visible focus ring everywhere, Escape closes the dropdown, a **skip-to-content link** is the first thing in the page, the folded navbar's hidden version is `inert`.
- Semantic HTML: one `h1`, ordered `h2`s, `nav`, `main` (`id="main"`) and `footer` landmarks, `aria-label` on icon buttons, the decoded menu headings carry the real text for screen readers, the statement is in the page as plain text.
- `alt` text on meaningful images; decorative ones empty.
- `prefers-reduced-motion`: no intro, no rising, no smooth scroll, no flicker, no logo changes, no network or globe motion.

## 14. Assets — DECIDED

- Logo `public/logo.svg`, product logos, client logos (`public/brands`, with white versions in `public/brands/dark`).
- **No AI-generated visuals.** Allowed: real photos, product screenshots, real client logos, Lucide icons, simple shapes drawn in code.
- **Share image:** `app/opengraph-image.tsx`, 1200×630, drawn in code from the brand's colours and words (pre-rendered at build). It replaces the logo SVG that was used before.
- `app/manifest.ts` uses `#060d26` for the theme and background colour.
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
- **No AI-generated content or visuals.**
- No pure `#000`, no second accent colour (no pink), no gradient text.
- No pointer-following effects.
- No second font family.
- No content hidden until JavaScript runs; no client-only rendered content.
- No arrows in the footer; no close button on the dropdown; no colour button anywhere.

## 17. Launch checklist

- [x] One dark theme, tokens defined once and used as class names
- [x] One font family (Inter)
- [x] One layout: shared container, shared section rhythm, 8px radii, 48px buttons
- [x] Intro, first screen, logos, products, statement scene, numbers, closing block, footer, navbar built and checked
- [x] First screen, products and closing block are Server Components; `/` pre-renders as static
- [x] Share image and manifest colours
- [x] Skip link, global focus ring, 44px tap targets
- [ ] Replace `framer-motion` in the simple places to get under the 150KB budget
- [ ] Dead links: Whitepapers, Careers, Newsroom (build or remove)
- [ ] Confirm the numbers and the copy are real and signed off
- [ ] Contact / demo form and `/api/contact` tested end to end
- [ ] Analytics and cookie consent (if required)
- [ ] Lighthouse and a real-device test (320, 375, 768, 1024, 1440, 1920)
- [ ] Domain, production deploy, sitemap and robots check

## 18. Open questions

1. The right half of the first screen is now the generated blue object (`hero-object.png`). Keep it, pick another option on `/design`, or replace it with a real product screenshot once one is ready?
2. Does a services section, a process section or real client statistics join the page? The numbers (6 products, 7 services, 4 business units, 100%) are still placeholders until confirmed.
3. The hero sub-copy: does it also cover custom solutions?
4. Keep Whitepapers, Careers and Newsroom, or remove them from the footer until the pages exist?
