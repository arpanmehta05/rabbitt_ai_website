// The products page content (app/products/page.tsx), from the Figma "Products – Desktop 1440" frame.

export type Product = { name: string; line: string; href: string };

const HREF: Record<string, string> = {
  IcyPluto: "https://new.icypluto.com/",
  IcyLingo: "https://new.icypluto.com/",
  IcyLunar: "https://new.icypluto.com/",
  IcyQuill: "https://quill.icypluto.com/",
  "Fire Reach": "https://firereach.rabbitt.ai/",
  "Pluto Circle": "https://master.d3tzbu7ir1twhi.amplifyapp.com/",
  "Rabbitt Learning": "https://learning.rabbitt.ai/",
  DRIP: "https://drip.rabbitt.ai/",
  LMS: "https://admin.learning.rabbitt.ai/",
  "Code Bunny": "https://learning.rabbitt.ai/codebunny",
  "AI Quest": "https://www.aiquest.rabbitt.ai/",
  OnSkill: "https://onskill.org/",
  "R Proctor": "/contactus?product=r-proctor",
  ChanceRAG: "/chancerag",
  RAW: "https://raw.rabbitt.ai/",
  HRMS: "/contactus?product=hrms",
  Canvas: "/contactus?product=canvas",
  "Cloud Watcher": "https://cloudwatcher.rabbitt.ai/",
  "Voice Rabbitt": "https://www.voice.rabbitt.ai/",
  "Ping You": "https://www.pingme.rabbitt.ai/",
};

const p = (name: string, line: string): Product => ({ name, line, href: HREF[name] ?? "/contactus" });

export const FACTS = [
  { value: "20", label: "Products" },
  { value: "6", label: "Flagship products" },
  { value: "4", label: "Product families" },
  { value: "70+", label: "Enterprise engagements" },
];

// span: how many of the four columns the tile takes on desktop; tone: the block colour
export const FLAGSHIPS: (Product & { statement: string; span: 1 | 2; tone: "blue" | "card" | "sky" | "deep" })[] = [
  { ...p("IcyPluto", "Agentic AI for marketers: track AI visibility, grow brand mentions and run your GEO strategy."), statement: "Be the brand AI recommends.", span: 2, tone: "blue" },
  { ...p("RAW", "Build, observe and optimise AI agents for accuracy and cost."), statement: "Every agent run, traced and priced.", span: 1, tone: "card" },
  { ...p("DRIP", "Measure AI fluency with real engineering assessments."), statement: "Hire on real AI work.", span: 1, tone: "sky" },
  { ...p("Rabbitt Learning", "Enterprise learning for teams putting AI to work."), statement: "Upskill whole teams.", span: 1, tone: "card" },
  { ...p("Cloud Watcher", "Multi-cloud monitoring, cost optimisation and AI observability."), statement: "See every cloud dollar.", span: 1, tone: "deep" },
  { ...p("ChanceRAG", "Enterprise RAG for deep document reasoning, precision and context."), statement: "Answers from your own documents, with the sources.", span: 2, tone: "card" },
];

export const PRINCIPLES = [
  { title: "Your data stays put.", text: "Products run where your data already lives. Nothing is copied out, and nothing trains someone else’s model." },
  { title: "Your cloud, your rules.", text: "Deployed inside your own cloud account, under your security policies and access controls." },
  { title: "You own what it learns.", text: "Models, prompts and results belong to you, so the value builds up inside your company." },
];

export const TEAMS: { team: string; sentence: string; products: Product[] }[] = [
  {
    team: "Marketing",
    sentence: "Get found in AI search, reach the right leads and keep content moving.",
    products: [p("IcyPluto", "Win in AI search and grow brand mentions."), p("Fire Reach", "Outreach that stays precise and personal."), p("IcyQuill", "Long-form writing and editing with AI."), p("IcyLunar", "Social listening and competitive intelligence.")],
  },
  {
    team: "HR & Learning",
    sentence: "Hire on real work, train whole teams and keep every assessment fair.",
    products: [p("Rabbitt Learning", "Enterprise learning and upskilling."), p("DRIP", "Measure AI fluency with real work."), p("OnSkill", "Workforce skills with a clear view of progress."), p("HRMS", "Agentic HR workflows and talent operations.")],
  },
  {
    team: "Engineering",
    sentence: "Ship agents and search you can trace, tune and pay less for.",
    products: [p("RAW", "Optimise AI agents for accuracy and cost."), p("ChanceRAG", "Enterprise RAG for document reasoning."), p("Canvas", "On-premise visual workflow automation."), p("Code Bunny", "An AI coding companion and sandbox.")],
  },
  {
    team: "Operations & IT",
    sentence: "Watch cloud spend, catch incidents early and answer every call.",
    products: [p("Cloud Watcher", "Cloud cost, health and AI observability."), p("Ping You", "Notifications and incident coordination."), p("Voice Rabbitt", "Voice AI for enterprise conversations."), p("R Proctor", "AI proctoring for online assessments.")],
  },
];

export const FAMILIES: { name: string; line: string; products: Product[] }[] = [
  {
    name: "Marketing",
    line: "Grow reach and revenue with AI that knows your market.",
    products: [p("IcyPluto", "Agentic AI for marketers to win in AI search."), p("IcyLingo", "Language content generation at scale."), p("IcyLunar", "Social listening and competitive intelligence."), p("IcyQuill", "An AI partner for long-form writing."), p("Fire Reach", "Outreach that stays precise and personal."), p("Pluto Circle", "Community marketing and audience management.")],
  },
  {
    name: "Learning",
    line: "Build skills across teams, from the first course to the proctored exam.",
    products: [p("Rabbitt Learning", "Enterprise learning and upskilling."), p("DRIP", "Measure AI fluency with real work."), p("LMS", "Course delivery, tracking and compliance."), p("Code Bunny", "An AI coding companion and sandbox."), p("AI Quest", "Gamified AI learning with quests."), p("OnSkill", "Workforce skills with a clear view of progress."), p("R Proctor", "AI proctoring for online assessments.")],
  },
  {
    name: "Technology",
    line: "The building blocks for private, enterprise AI.",
    products: [p("ChanceRAG", "Enterprise RAG for document reasoning."), p("RAW", "Optimise AI agents for accuracy and cost."), p("HRMS", "Agentic HR workflows and talent operations."), p("Canvas", "On-premise visual workflow automation.")],
  },
  {
    name: "Ecosystem",
    line: "Run, watch and talk to everything you have built.",
    products: [p("Cloud Watcher", "Cloud cost, health and AI observability."), p("Voice Rabbitt", "Voice AI for enterprise conversations."), p("Ping You", "Notifications and incident coordination.")],
  },
];

export const STEPS = [
  { title: "Pick the problem.", text: "Tell us what is slow, costly or manual. We point you to the product that fits." },
  { title: "Run it on your data.", text: "We deploy it inside your cloud and prove it on your own work, not a demo." },
  { title: "Grow from there.", text: "Add products as you need them. They share the same data and controls." },
];

export const isExternal = (href: string) => href.startsWith("http");
