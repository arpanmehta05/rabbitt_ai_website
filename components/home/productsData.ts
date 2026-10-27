// The products, in the order they are shown. Used by the Products section and the navbar.
// Descriptions and links come from the site's existing navigation; RAW's line is the one on
// raw.rabbitt.ai. A product with no `logo` gets a monogram until its logo is added: put the
// file in /public and set `logo` to its path. `accent` tints that product's panel.
export type Product = {
  name: string;
  detail: string;
  href: string;
  accent: string;
  logo?: string;
  // for a logo with white parts that vanish on the light theme: the version used there
  logoLight?: string;
  // for a logo that sits small in its frame, to draw it larger in the Products list
  logoScale?: number;
};

export const products: Product[] = [
  {
    name: "IcyPluto",
    detail: "Unified platform for marketing automation and growth.",
    href: "https://new.icypluto.com/",
    logo: "/Icypluto.svg",
    accent: "#7c3aed",
  },
  {
    name: "DRIP",
    detail: "Adaptive learning experiences for modern teams.",
    href: "https://drip.rabbitt.ai/",
    logo: "/drip.svg",
    accent: "#0061ff",
  },
  {
    name: "RAW",
    detail: "Optimise your AI agents for accuracy and cost.",
    href: "https://raw.rabbitt.ai/",
    logo: "/logo.svg",
    logoScale: 1.5,
    accent: "#2f7bff",
  },
  {
    name: "OnSkill",
    detail: "Workforce competency and skill management.",
    href: "https://onskill.org/",
    logo: "/onskill.svg",
    accent: "#2f7bff",
  },
  {
    name: "Cloud Watcher",
    detail: "Cloud cost, health, and operations intelligence.",
    href: "https://cloudwatcher.rabbitt.ai/",
    logo: "/cloudwatcher.svg",
    accent: "#38bdf8",
  },
  {
    name: "Ping U",
    detail: "Intelligent notifications and incident coordination when the signal matters.",
    href: "https://www.pingme.rabbitt.ai/",
    logo: "/pingu.svg",
    logoLight: "/pingu-light.svg",
    accent: "#ff4aa8",
  },
];
