# Rabbitt AI — New Landing Page (`new-rewamp` branch) · UI Handoff

> **What this document covers:** only the **new landing page** (the home page, `/`) that lives on the **`new-rewamp`** branch.
> **What it does not cover:** the live/consistent website on the **`main`** branch (its landing page and every other page). That is all in [`README-FULL-WEBSITE.md`](./README-FULL-WEBSITE.md).
> **Who it is for:** the UI/UX designer. You do not need repo access — every colour, font, size, behaviour and asset is written out below.
> **Status:** ✅ Built and working in light **and** dark theme. Needs your review and the open items in §12.

---

## 1. What this page is

A single, scroll-driven page with one message: **"Own your data. Own your AI."** — Rabbitt builds private models and agents that run inside the customer's own cloud, so nothing leaves and the customer owns the weights.

The first screen is a pinned "planet rising" scene that turns into a word-by-word statement. After it come a products index, a customer-logo band beside a pinned Milky Way galaxy, a closing call to action and the footer.

### Page order (top to bottom)

| # | Section | Layout |
|---|---------|--------|
| 0 | **Navbar** (fixed, always on screen) | Full width, 68px tall |
| 1 | **Hero** — headline → planet rises → statement | Pinned scene, 2.8 screens of scroll |
| 2 | **Products** — index list of 6 products | Full width, max 1400px |
| 3 | **Companies** — logo band | Left column of a two-column "stage" |
| 4 | **Closing CTA** | Left column of the same stage |
| — | **Milky Way galaxy** (pinned, beside 3 and 4) | Right column, desktop only |
| 5 | **Footer** | Full width |

---

## 2. Design principles (the feel)

- **Editorial and calm.** Large light-weight type, hairline dividers, no cards, no boxes, no badges.
- **One accent colour.** Rabbitt blue `#0061ff`. Hot pink `#ff2d95` appears only as a small secondary glow.
- **Two-weight headlines.** The first half of a headline is bold, the second half light — e.g. **"Everything we build,"** *on your own terms.*
- **Pill buttons only.** Every button and hover highlight is fully rounded.
- **Motion follows the scroll.** Things sharpen, rise and draw as the user scrolls. Nothing loops loudly, and everything respects "reduce motion".
- **Light and dark are equals.** Both themes were designed deliberately, not inverted.

---

## 3. Colour palette

### 3.1 Brand colours

| Name | Hex | Used for |
|------|-----|----------|
| **Brand blue** | `#0061ff` | Primary buttons, hover colour of links, highlighted words, icon tint, text-selection background |
| **Sky blue** | `#4d9bff` | Blue text and hover colour on dark backgrounds; end of the blue gradient |
| **Hover blue** | `#1a47d6` | Hover state of the blue buttons |
| **Dark-mode button hover** | `#2f7bff` | Hover of the secondary hero button in dark theme |
| **Hot pink** | `#ff2d95` | Aurora glow, pink network nodes and pulses |
| **Soft pink** | `#ff4aa8` | Right-hand end of the planet rim and of the network lines |
| **Ink** | `#05060a` | Text on light backgrounds |
| **White** | `#ffffff` | Light page background; text on dark |

### 3.2 Backgrounds

| Surface | Light theme | Dark theme |
|---------|-------------|------------|
| Page | `#ffffff` | `#0a1228` (deep navy) |
| Hero section | `#ffffff` | `#04060c` (near-black) |
| Navbar at top of page | transparent | transparent |
| Navbar after scrolling | white 85% + blur | `#04060c` 85% + blur |
| Navbar with a dropdown open | `#ffffff` | `#070d20` |
| Footer | `#ffffff` | `#0a1228` |
| Network icon chip | `#ffffff` | `#10193a` |
| Text selection | `#0061ff` with white text | same |

### 3.3 Text (black or white at an opacity — not a grey hex)

| Role | Light | Dark |
|------|-------|------|
| Headlines | `#05060a` | `#ffffff` |
| Paragraph / lead | black 60–65% | white 60–65% |
| Product description | black 55% | white 55% |
| Nav links (idle) | black 65% | white 65% |
| Footer links | black 60% | white 60% |
| Small labels / column titles | black 40% | white 40% |
| Legal line | black 50% | white 50% |

### 3.4 Lines and dividers

| Role | Light | Dark |
|------|-------|------|
| Hairlines (product rows, menu rows) | black 10% | white 12% |
| Navbar / footer border | black 6–8% | white 10% |
| Logo-band top and bottom lines | black 12% | white 15% |
| Logo-band dot grid | `rgba(5,6,10,0.10)` | `rgba(255,255,255,0.09)` |
| Hero background grid (64px squares) | `#05060a` at 6% | white at 7% |

### 3.5 Hero planet and glows

| Part | Colour |
|------|--------|
| Planet body (light), at start | `#060f48` (deep navy) |
| Planet body (light), mid-scroll | `#1a4fe0` → `#bcd3ff` |
| Planet body (light), settled | `#ffffff` |
| Pearl veil inside the planet (light) | `#bcd3ff` → `#e9f0ff` → `#ffffff` (top to bottom) |
| Rim of light (light theme) | `#2f6bff` → `#ffffff` (centre) → `#5b97ff` → `#ff4aa8` (far right) |
| Rim of light (dark theme) | `#1f55e0` → `#eaf1ff` (centre) → `#2f6bff` → `#ff4aa8` |
| Dark planet body | `#04060c` rising to `#0a1228` |
| Top lighting on the planet | `#5b97ff` → `#0b52ee` → `#0a2fa3` |
| Aurora glows (light) | blue `#0061ff` 20% · pink `#ff2d95` 20% · sky `#4d9bff` 25%, heavily blurred |
| Glows (dark) | blue `#0061ff` 15–45% · bright core `#bcd2ff` · pink `#ff2d95` 60% |
| "Own your AI." gradient (light) | `#0061ff` → `#4d9bff` |
| "Own your AI." gradient (dark) | `#3d7bff` → `#b4cdff` |

### 3.5b Product accents (each product row glows in its own colour on hover)

| Product | Accent |
|---------|--------|
| IcyPluto | `#7c3aed` (violet) |
| DRIP | `#0061ff` |
| RAW | `#2f7bff` |
| OnSkill | `#2f7bff` |
| Cloud Watcher | `#38bdf8` |
| Ping U | `#ff4aa8` |

### 3.6 Milky Way galaxy

The galaxy is made of tens of thousands of tiny soft stars. It is drawn differently on each theme: on dark the stars add up into a glow; on light they are drawn as ink on the white page.

| Part | Dark theme | Light theme |
|------|-----------|-------------|
| Spiral arms | `#4d8cff` | `#0061ff` (brand blue) |
| Core and bar | warm white `#ffe8d1` | deep indigo `#0a1a85` |
| Star-forming knots on the outer arms | `#ff4da8` | `#ff2e94` |
| Soft glow behind the core | warm `#ffd1b3` | pale blue `#8f9eff` |
| Soft glow over the whole disk | `#1f4df2` | pale blue `#4d99ff` |

### 3.7 Network behind the statement

Node tints: **blue** `#0061ff` (dark theme `#4d9bff`) · **pink** `#ff2d95` · **plain** `#05060a` at 45% (dark theme white 60%).
Connecting lines fade from `#2f7bff` → `#7d8cff` → `#ff4aa8`.

---

## 4. Typography

### 4.1 Fonts (both free on Google Fonts)

| Role | Font | Weights used | Used for |
|------|------|--------------|----------|
| **Display** | **Inter Tight** | 300 Light · 500 Medium · 600 Semibold | Every headline, the "Rabbitt AI" wordmark, product names, the statement |
| **Body / UI** | **Inter** | 400 · 500 | Paragraphs, buttons, navigation, footer |

Fallback: Inter → system UI fonts → sans-serif. Fonts load with "swap" (text shows immediately in the fallback).

### 4.2 Type scale

| Element | Size | Weight | Line height | Letter spacing |
|---------|------|--------|-------------|----------------|
| Hero headline | fluid: 3.1rem → 8vw → 7rem (≈50–112px) | Medium | 1.0 | −0.05em |
| Hero statement | fluid: 1.9rem → 3.7vw → 3.3rem (≈30–53px) | Medium | 1.16 | −0.035em |
| Section headline (Products, Companies) | fluid: 2rem → 3.6vw → 3.6rem (≈32–58px) | Semibold + Light | 1.1 | −0.035em |
| CTA headline | fluid: 2.1rem → 3.8vw → 3.7rem (≈34–59px) | Semibold + Light | 1.1 | −0.035em |
| Product name | fluid: 2.2rem → 4vw → 4rem (≈35–64px) | Light | 1.0 | −0.045em |
| Hero sub-copy | 18px (20px from 640px wide) | Regular | relaxed | normal |
| Company name (logo band) | 20px (24px from 640px wide) | Medium | — | −0.02em |
| "Rabbitt AI" wordmark | ≈26px | Semibold | 1 | −0.045em |
| Dropdown lead sentence | ≈26px | Light | 1.18 | −0.035em |
| Menu item title | 17px | Medium | — | −0.01em |
| Buttons | 15–17px | Medium | — | — |
| Small UPPERCASE labels | 12–13px | Medium | — | +0.12–0.14em |
| Footer links | 15px | Regular | — | — |
| Legal line | 14px | Regular | — | — |

**Rule:** headlines pair two weights in one sentence — first clause semibold, second clause light.

---

## 5. Layout, spacing and breakpoints

| Item | Value |
|------|-------|
| Breakpoints | 640 · 768 · **1024** · 1280 px |
| Content max width | **1400px** |
| Side padding | 24px (phone) → 40px (≥640) → 56px (≥1024) → 80px (≥1280) |
| Navbar height | **68px**, fixed |
| Stage columns (desktop) | content 1.12 : galaxy 0.88 |
| Galaxy column | sticks under the navbar and fills the rest of the screen height; shown from 1024px up only |
| Hero scroll length | 2.8 screen heights (1 screen if "reduce motion") |
| Section rhythm | ≈80px above, 80–112px below on desktop; tighter on phones |
| Corner radii | Buttons / hover highlights fully round · network chips 16px · small logo icons 12px |

---

## 6. Section-by-section

### 6.1 Navbar

- **Left:** logo mark (44×44) + "Rabbitt AI" wordmark in the blue gradient.
- **Centre (desktop):** Products ▾ · Data ▾ · Services ▾ · Resources ▾ · AINama.
- **Right:** theme toggle (40px round button, moon ↔ sun) + **Book a demo** pill.
- **Behaviour**
  - Transparent at the top; becomes frosted white / dark navy after 24px of scroll.
  - Hovering an item slides a soft pill highlight from item to item.
  - Dropdowns are **full-width flat panels** hanging from the bar: a short lead sentence on the left, link rows on the right in a 3-column grid. Rows are plain text on a hairline; the title turns blue and a small arrow appears on hover. Products rows also show the product logo on the right.
  - Closes on Escape, on an outside click, or 160ms after the pointer leaves.
- **Phone / tablet (< 1024px):** hamburger button opens a scrolling accordion with a full-width **Book a demo** button at the bottom.

| Menu | Entries |
|------|---------|
| Products | IcyPluto, DRIP, RAW, OnSkill, Cloud Watcher, Ping U · link "View all products" |
| Data | *Services:* Data Annotation · *Solutions:* CuratorsAI, NavicaAI |
| Services | Content Writing, Content Strategy, Video Editing & Generation, University Training Programs, Website Revamp Services, Corporate Trainings · link "Talk to us" |
| Resources | Blogs, Case Studies, Webinars |
| AINama | plain link |

Each entry has a one-line description (e.g. Data Annotation — "Enterprise dataset curation, human-in-the-loop validation, and LLM alignment.").

### 6.2 Hero (the pinned scene)

The screen stays fixed while the user scrolls through three beats:

| Scroll position | What the user sees |
|-----------------|--------------------|
| 0 – 30% | Headline **"Own your data. Own your AI."** ("Own your AI." in the blue gradient), sub-copy *"Private models and agents that run inside your own cloud. Nothing leaves, and the weights are yours."* and two buttons. A glowing planet rim rises from the bottom of the screen and covers it; the headline lifts away. |
| 30 – 89% | The planet turns pearl-white (light theme) or deep navy (dark). A **network of data-source icons** (database, document, mail, cloud, git branch, chat, lock, server, folder, people, table, code, shield, workflow) grows across the scene, with small pulses of light travelling along its lines. The statement appears **word by word** — each word sharpens from blurred and dim to crisp. "Rabbitt" and "cloud" are tinted blue. |
| 89 – 100% | Brief hold, then the page scrolls on. |

- **Buttons:** **Book a demo** (dark pill → blue on hover; white pill in dark theme) and **Explore products** (white pill with a thin ring in light theme; solid blue pill in dark theme).
- Faint 64px grid behind the headline, fading out from the centre.
- The network keeps a clear space in the middle so the statement is always readable. Icons float gently and shift slightly at different speeds as the page scrolls (nearer = more movement).
- **Statement copy:** "Most AI vendors ask you to send them your data. Rabbitt builds private models and agents that run inside your own cloud, so everything you train stays yours."
- **Reduce-motion fallback:** one static screen with the headline only — no planet animation, no statement scene, no network.

### 6.3 Products

- Heading **"Everything we build, on your own terms."** with a "View all products →" link on the right.
- A full-width **index list**. Each row: logo · large light-weight product name · one-line description · arrow.
- **Hover:** a soft radial glow in the product's accent colour follows the pointer; the arrow slides in; a coloured underline draws left to right. Keyboard focus shows the same.
- Rows fade up as they scroll into view (staggered 40ms).
- All six open the product's own website in a new tab.

| Product | One-line description |
|---------|----------------------|
| IcyPluto | Unified platform for marketing automation and growth. |
| DRIP | Adaptive learning experiences for modern teams. |
| RAW | Optimise your AI agents for accuracy and cost. |
| OnSkill | Workforce competency and skill management. |
| Cloud Watcher | Cloud cost, health, and operations intelligence. |
| Ping U | Intelligent notifications and incident coordination when the signal matters. |

- Ping U has a separate dark-ink logo for light theme. RAW's logo (the Rabbitt mark) is drawn 1.5× larger.
- Background: pink + sky aurora in light theme; a soft blue glow in dark theme.

### 6.4 Companies

- Heading **"Companies we've worked with, across fintech, mobility, health and education."**
- A **band on a dot grid**, framed by two thin lines. It bleeds off the left edge of the screen and ends at the galaxy. Inside: a single row of logos scrolling slowly leftwards, with the ends fading out. It does not pause on hover.
- **25 companies:** Groww, Paytm, PhonePe, Acko, Policybazaar, upGrad, Unacademy, Cars24, Spinny, Acko Drive, 99acres, Magicbricks, NoBroker, Square Yards, 91wheels, HealthKart, Tata 1mg, Truemeds, Pristyn Care, Darwinbox, SHRM, MoEngage, LeadSquared, Extramarks, Interview Kickstart.
- Two logo kinds: **wordmark** (the logo already spells the name; a dark-theme version is needed for each) and **icon** (square app icon, with the company name typed beside it).
- Reduce-motion: scrolling stops and the row becomes swipeable.

### 6.5 Milky Way galaxy (pinned)

- A 3D barred spiral galaxy: a bright core on a short bar, four spiral arms (two major, two minor) of fine stars, pink star-forming knots along the outer arms, a faint halo of loose stars and a soft glow behind it all. It is tilted towards the viewer.
- Turns slowly on its own.
- Stays pinned in the right column while Companies and the CTA scroll past on the left.
- **Desktop only (≥ 1024px)** — not shown on tablets or phones.
- A soft blue glow sits behind it in dark theme.

### 6.6 Closing CTA

- Heading **"Put your data to work, without ever giving it up."**
- Copy: *"Bring one use case. We will run it on your data inside your own cloud, and show you what it does for your team."*
- Primary: **Book a demo** — blue pill with a white circular arrow button (44px) that rotates −45° on hover.
- Secondary: **Explore products** — text link with an underline that turns blue on hover.
- By design: no box, no card, no ornament.

### 6.7 Footer

Modelled on the footer of adyen.com: a full-screen-height footer with link columns on top, a large dotted celestial body rising from the bottom edge, and a slim bar underneath. Ours uses the Milky Way galaxy instead of a planet.

- **Height:** the height of the content, but never shorter than the screen. The link block, a large gap (362px on wide screens, 298px on tablets, 96px on phones) and the 72px bottom bar add up to about 750px on desktop. So on a tall window the footer is exactly one screen; on a short laptop window it is taller than the screen — the links show first and the galaxy only comes into view after scrolling a little more, as on Adyen.
- **Link columns (desktop ≥ 1024px):** four equal columns — **Products** (Marketing · Learning · Technology · Ecosystem Products + a blue "View all products ↗") · **Services** (7 services) · **Resources** (Blog · Case Studies · Whitepapers · Webinars) · **Company** (About Rabbitt AI · Careers · Newsroom · Contact Us). Column titles are 12px UPPERCASE at 50% opacity; links are 16.5px medium, with 9px of space between lines.
- **No hover effects** on links, buttons or the galaxy.
- **Galaxy:** a 560px-tall band (460px on tablets, 340px on phones), full width, sitting just above the bottom bar. The galaxy is centred horizontally, tilted, and shown **whole** (not cropped), with soft edges at the top and bottom of the band. As the footer scrolls into view it fades in and eases up about 60px into place. It keeps turning slowly on its own. There is **no pointer or hover interaction**. Same colours in both themes as §3.6.
- **Buttons row (above the galaxy):** directly under the link columns, left-aligned — **LinkedIn** and **Instagram** square buttons (48×48, 6px radius, faint fill) and a blue **Book a demo →** button (48px tall, 6px radius). They sit clear of the galaxy so nothing is drawn over them.
- **Bottom bar:** small logo mark, **PRIVACY POLICY** and "© 2026 RABBITT AI" (11px UPPERCASE), below the galaxy.
- **Phone (< 1024px):** the four columns become an accordion (title + chevron, one tap to open), the galaxy is smaller (still centred and whole), and the buttons row sits under the accordion, above the galaxy.
- **Backgrounds:** white (light) / `#0a1228` (dark).
- Differences from Adyen's: no language selector (we have one language); a Book a demo button takes its place; the brand tagline that used to sit in the footer was dropped.

---

## 7. Reusable UI pieces

| Piece | Where | Description |
|-------|-------|-------------|
| Pill CTA with arrow circle | Navbar, closing CTA | Blue pill, white inner circle with arrow, circle rotates −45° on hover; hover colour `#1a47d6` |
| Solid pill button | Hero | Ink (or white in dark) fill; turns blue on hover |
| Outlined pill button | Hero, second button | Thin ring in light theme, solid blue in dark |
| Underlined text link + arrow | Closing CTA, Products | Arrow nudges up-right on hover |
| Theme toggle | Navbar | 40px circle with border, moon ↔ sun icon |
| Social button | Footer | 44px circle, border + icon turn blue on hover |
| Menu row | Dropdowns, mobile menu | Hairline on top, title + description + optional logo on the right |
| Product row | Products | Logo · name · description · arrow, pointer-following glow, drawn underline |
| Logo item | Companies | Wordmark, or icon + company name |
| Network chip | Hero | 44px rounded square (16px radius), white / `#10193a`, tinted blue, pink or plain |
| Word-by-word reveal | Hero statement | Each word fades and un-blurs as the scroll reaches it |
| Eased scrolling | Whole site | Mouse wheel and trackpad scrolling is smoothed; phones keep native scrolling; off for "reduce motion" |

**Icons:** [Lucide](https://lucide.dev) outline icons — Arrow Right, Arrow Up-Right, Chevron Down, Menu, X, Moon, Sun, plus the 14 data-source icons in the network.

---

## 8. Themes

- Light and dark are switched **manually** with the toggle in the navbar; the choice is remembered on that device and applied before the page paints (no flash).
- The site does **not** follow the visitor's operating-system theme automatically (open question, §12).
- Every element in §6 has a defined look in both themes.

---

## 9. Responsive behaviour

| Width | Changes |
|-------|---------|
| < 1024px | Hamburger menu with accordion; the galaxy is not shown; the logo band uses the full width; sections tighten (the closing section was specifically tuned for phones) |
| ≥ 1024px | Full navbar with dropdowns; two-column stage with pinned galaxy |
| Touch devices | Native momentum scrolling is kept |

## 10. Accessibility

- **Reduce motion:** no planet scene, no word reveal, no network, no logo scrolling, no eased scrolling.
- The hero statement is available to screen readers as plain text; decorative layers are hidden from them; duplicate logos in the marquee are hidden.
- Dropdown buttons announce open/closed; Escape closes them; product rows show the same hover glow on keyboard focus.
- External links open in a new tab.
- Keep body text at **55% opacity or stronger** to hold contrast in both themes.

---

## 11. How this differs from the `main` branch landing page

(Full detail of `main` is in [`README-FULL-WEBSITE.md`](./README-FULL-WEBSITE.md).)

| | **New landing (`new-rewamp`)** | **Current landing (`main`)** |
|---|---|---|
| Theme | Light **and** dark | Dark only |
| Accent | Blue `#0061ff` + pink glow | Sky blue `#38bdf8` / `#3b82f6` |
| Hero | Scroll-driven planet + word-by-word statement + data network | Timed intro animation (logo → product orbit) then headline over a video |
| Headline | "Own your data. Own your AI." | "Own your AI, Own your Data" |
| Products | 6, as a hairline index list | 6, as a bordered 3-column card grid |
| Customers | Single logo band + pinned galaxy | Two logo rows (left and right) under "Trusted by industry leaders" |
| Sections after products | Closing CTA, footer | AI adoption journey, impact stats, FAQ, CTA, footer |
| Navbar | Flat full-width dropdowns, pill hover, theme toggle | Floating mega-menu, white pill CTA |

---

## 12. Status — done and pending

### Done

- [x] Navbar (dropdowns, hover pill, theme toggle, mobile accordion)
- [x] Hero scroll scene, planet, aurora, grid, word-by-word statement
- [x] Data-source network behind the statement
- [x] Products index (6 products) with per-product hover colour
- [x] Companies band (25 logos, light + dark versions)
- [x] Pinned Milky Way galaxy
- [x] Closing CTA
- [x] Footer
- [x] Light and dark themes for all of the above
- [x] Smooth scrolling, reduce-motion fallbacks, phone layout

### Pending / open items for you

| # | Item | Detail |
|---|------|--------|
| 1 | **Missing sections vs the old landing** | The old landing has an AI-adoption-journey section, impact numbers (500+ projects, 1.7M+ annotations, 100+ clients, 8+ platforms) and a FAQ. None of these exist yet in the new style — decide which come back and design them |
| 2 | **Footer dead links** | "Whitepapers", "Careers" and "Newsroom" go nowhere yet — pages need designing |
| 3 | **Footer social links** | Only LinkedIn and Instagram. Confirm whether X/Twitter and YouTube should be added |
| 4 | **Footer product links** | The four product categories all lead to the Products page and pre-select that category — confirm this is wanted |
| 5 | **Products list vs catalogue** | Landing shows 6 products; the full catalogue has 19. Several (IcyLingo, IcyLunar, Code Bunny, R Proctor, HRMS, Canvas…) have **no logo** and show a letter placeholder |
| 6 | **Colour inconsistency** | Dark-theme blue is `#4d9bff` everywhere except the footer (`#4d8dff`) — pick one |
| 7 | **Design tokens** | Colours are set per element rather than as a shared token list; a named token set (colours, radii, spacing) from you would make every later change a one-line edit |
| 8 | **Share image** | Social previews currently use the logo SVG; a proper 1200×630 image is needed |
| 9 | **App colours** | The installable-app theme colour is still `#020305` from the old dark site |
| 10 | **Automatic dark mode** | Decide whether first-time visitors should get the theme matching their device |
| 11 | **Phone review** | The planet scene works on phones, but the galaxy stage is desktop-only — needs a design review on real devices |
| 12 | **Content sign-off** | Copy has not yet been through the content-update pass |

---

## 13. Assets

You do not need the repo; ask the developer to export what you need. The page uses:

| Asset | Notes |
|-------|-------|
| Rabbitt logo mark | SVG, 44×44 in navbar |
| 6 product logos | IcyPluto, DRIP, OnSkill, Cloud Watcher, Ping U (+ a light-theme version of Ping U); RAW reuses the Rabbitt mark |
| 25 customer logos | PNG/SVG/WebP, plus a dark-theme version of each wordmark-style logo |
| Galaxy | Generated in code from a star distribution — no image file |
| Fonts | Inter and Inter Tight from Google Fonts |
| Icons | Lucide icon set |
