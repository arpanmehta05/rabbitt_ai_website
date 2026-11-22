// The three customer stories in the landing page's case studies showcase.
//
// EVERY ENTRY HERE IS A PLACEHOLDER. The content team supplies the real ones (see the "Content brief –
// Case studies section" frame next to the landing page in Figma): customers who agreed to be named, a real
// image per story (16:10), their logo, two real approved results, one story line, an approved quote with
// name and role, and the case study page to link to. Replace the entries below and nothing else needs to
// change: a missing `image` or `logo` shows a dashed placeholder, a missing `href` hides the link.
// Do not publish the page with these placeholders.

export type ShowcaseStory = {
  /** the tab label: the company name */
  tab: string;
  /** a white-on-transparent SVG in /public, shown on the image */
  logo?: string;
  /** a real image in /public, 16:10 and at least 1600px wide */
  image?: string;
  /** two results: a number with its unit (it counts up when it contains a number) and a short label */
  results: [{ value: string; label: string }, { value: string; label: string }];
  /** one sentence: the problem, and what Rabbitt built */
  story: string;
  quote: string;
  name: string;
  role: string;
  /** the matching case study page */
  href?: string;
};

export const showcaseHeading = "Results from work already in production.";
export const showcaseLine = "[One supporting sentence with a real number, e.g. how many teams run Rabbitt in production.]";

export const showcase: ShowcaseStory[] = [
  {
    tab: "Customer one",
    results: [
      { value: "XX%", label: "[What improved, in plain words]" },
      { value: "Nx", label: "[A second result, in plain words]" },
    ],
    story: "[One sentence: the problem, and what Rabbitt built for them.]",
    quote: "[Customer quote: one or two sentences, in their own words, approved by them.]",
    name: "Customer name",
    role: "Role, Company",
    href: "/casestudies",
  },
  {
    tab: "Customer two",
    results: [
      { value: "XX%", label: "[What improved, in plain words]" },
      { value: "Nx", label: "[A second result, in plain words]" },
    ],
    story: "[One sentence: the problem, and what Rabbitt built for them.]",
    quote: "[Customer quote: one or two sentences, in their own words, approved by them.]",
    name: "Customer name",
    role: "Role, Company",
    href: "/casestudies",
  },
  {
    tab: "Customer three",
    results: [
      { value: "XX%", label: "[What improved, in plain words]" },
      { value: "Nx", label: "[A second result, in plain words]" },
    ],
    story: "[One sentence: the problem, and what Rabbitt built for them.]",
    quote: "[Customer quote: one or two sentences, in their own words, approved by them.]",
    name: "Customer name",
    role: "Role, Company",
    href: "/casestudies",
  },
];
