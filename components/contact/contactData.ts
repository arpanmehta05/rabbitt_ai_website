import { products } from "@/components/home/productsData";
import { navGroups } from "@/components/home/navData";

// Content for the contact page (Figma "Completed pages" → Contact). Products, services and data
// offerings come from the same lists as the navbar, so the page never drifts from the menus.

const itemsOf = (label: string) => navGroups.find((g) => g.label === label)?.sections?.flatMap((s) => s.items) ?? [];

export const SERVICES = itemsOf("Services");
export const DATA = itemsOf("Data");
export const PRODUCTS = products.map((p) => ({ label: p.name, detail: p.detail, href: p.href }));

// "I'd like to discuss [topic]". The topic sets the line under the headline, which list the
// product/service field offers (if any), and the question's placeholder. `?topic=` picks one.
export const TOPICS = [
  {
    id: "demo",
    label: "a product demo",
    line: "See IcyPluto, DRIP, RAW, Cloud Watcher or ChanceRAG run on your own data, inside your own cloud.",
    pick: { label: "Which product?", options: PRODUCTS.map((p) => p.label) },
    question: "Your use case, where your data lives, your timeline…",
    starter: "",
  },
  {
    id: "service",
    label: "a service project",
    line: "Content, video, training or a custom build from the team. Tell us what you need and by when.",
    pick: { label: "Which service?", options: SERVICES.map((s) => s.label) },
    question: "What do you need made or taught, who it is for, and by when?",
    starter: "",
  },
  {
    id: "revamp",
    label: "a website revamp",
    line: "We start with a check of every page, then rebuild. Send us the address and what is not working.",
    pick: null,
    site: true,
    question: "What is not working on the site today?",
    starter: "",
  },
  {
    id: "ainama",
    label: "the AINama book",
    line: "AINama collects 15 real-world GenAI case studies. Tell us where to send your copy.",
    pick: null,
    question: "Where should we send your copy?",
    starter: "I would like a copy of the AINama book. ",
  },
  {
    id: "other",
    label: "something else",
    line: "Press, partnerships, or a question we have not thought of. It reaches a person.",
    pick: null,
    question: "Tell us what you are working on",
    starter: "",
  },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

// "What we can do for you": three cards per tab, and a link under them
export const WHAT_WE_DO = [
  {
    id: "Services",
    cards: ["Website Revamp Services", "Content Strategy", "Corporate Trainings"],
    from: SERVICES,
    more: { label: "Start a service project", href: "/contactus?topic=service#form" },
  },
  {
    id: "Products",
    cards: ["IcyPluto", "DRIP", "RAW"],
    from: PRODUCTS,
    more: { label: `See all ${PRODUCTS.length === 6 ? "six" : PRODUCTS.length} products`, href: "/products" },
  },
  {
    id: "Data",
    cards: ["Data Annotation", "CuratorsAI", "NavicaAI"],
    from: DATA,
    more: { label: "Talk to us about your data", href: "/contactus?topic=other#form" },
  },
].map((tab) => ({
  ...tab,
  items: tab.cards
    .map((name) => tab.from.find((i) => i.label === name))
    .filter((i): i is { label: string; detail?: string; href: string } => !!i)
    .map((i) => ({ ...i, label: i.label.replace(/ Services$/, "") })),
}));

// the times offered for a call, India Standard Time
export const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
