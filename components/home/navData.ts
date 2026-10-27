import { products } from "./productsData";

export type NavItem = {
  label: string;
  detail?: string;
  href: string;
  // products show their logo
  logo?: string;
  logoLight?: string;
};

export type NavSection = { title?: string; items: NavItem[] };

export type NavGroup = {
  label: string;
  // a plain link
  href?: string;
  // or a dropdown: a short lead on the left, the items beside it
  lead?: { title: string; cta?: { label: string; href: string } };
  sections?: NavSection[];
};

// Menu content comes from the site's existing navigation.
export const navGroups: NavGroup[] = [
  {
    label: "Products",
    lead: {
      title: "Private AI, built to run in your own cloud.",
      cta: { label: "View all products", href: "/products" },
    },
    sections: [
      {
        items: products.map((p) => ({
          label: p.name,
          detail: p.detail,
          href: p.href,
          logo: p.logo,
          logoLight: p.logoLight,
        })),
      },
    ],
  },
  {
    label: "Data",
    lead: { title: "From raw data to trained models." },
    sections: [
      {
        title: "Services",
        items: [
          {
            label: "Data Annotation",
            detail: "Enterprise dataset curation, human-in-the-loop validation, and LLM alignment.",
            href: "/services/data-annotation",
          },
        ],
      },
      {
        title: "Solutions",
        items: [
          {
            label: "CuratorsAI",
            detail: "AI-powered voice agent creation and conversational workflows.",
            href: "/curators-ai",
          },
          {
            label: "NavicaAI",
            detail: "Explore career pathways and talent intelligence based on skills.",
            href: "/navica-ai",
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    lead: {
      title: "Not sure where to start?",
      cta: { label: "Talk to us", href: "/contactus" },
    },
    sections: [
      {
        items: [
          {
            label: "Content Writing",
            detail: "High-volume website copy, programmatic SEO, and technical documentation.",
            href: "/services/content-writing",
          },
          {
            label: "Content Strategy",
            detail: "Data-driven editorial planning and multi-channel AI distribution.",
            href: "/services/content-strategy",
          },
          {
            label: "Video Editing & Generation",
            detail: "AI-powered generative video production and motion workflows.",
            href: "/services/video-editing",
          },
          {
            label: "University Training Programs",
            detail: "Hands-on GenAI curriculum, workshops, and student enablement.",
            href: "/services/university-training",
          },
          {
            label: "Website Revamp Services",
            detail: "Modern, high-converting digital web experiences built for the AI era.",
            href: "/services/website-revamp",
          },
          {
            label: "Corporate Trainings",
            detail: "Custom enterprise upskilling for technical teams and leadership.",
            href: "/services/corporate-trainings",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    lead: { title: "Learn how we build." },
    sections: [
      {
        items: [
          {
            label: "Blogs",
            detail: "Technical breakdowns, LLM architectures, and AI engineering insights.",
            href: "/blogs",
          },
          {
            label: "Case Studies",
            detail: "Enterprise transformations and production AI deployments in action.",
            href: "/casestudies",
          },
          {
            label: "Webinars",
            detail: "Live masterclasses, architecture blueprints, and technical sessions.",
            href: "/webinars",
          },
        ],
      },
    ],
  },
  { label: "AINama", href: "/ainama" },
];
