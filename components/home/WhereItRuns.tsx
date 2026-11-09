import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./WhereItRuns.module.css";

// The trust section the page was missing (design.md §1: "can I trust you"). The headline promises
// "Own your data", and the statement scene and the numbers say it; this one is the concrete part:
// where the models and agents actually run, and what holds whichever way you choose. All of it is
// taken from the answers in the FAQ, so the page says one thing in both places.
//
// It is type only, and it does not look like its neighbours (a list of rows, three columns, an
// accordion): three large words you choose between, with the explanation of the chosen one beside
// them. The choosing is CSS only (radio buttons and :has(), see the module file), so it is a Server
// Component with no script, and all three explanations are in the HTML. No label, number or eyebrow
// above the headline (§16).

const options = [
  {
    label: "Your private cloud",
    text: "The default. Models and agents run in your own cloud account, next to the data they use. Retrieval sits alongside your warehouses, CRMs and knowledge bases, so nothing has to be moved or replatformed.",
  },
  {
    label: "Your own servers",
    text: "For teams that keep their infrastructure in-house. The same models and pipelines run on-premise, inside your own network.",
  },
  {
    label: "An air-gapped site",
    text: "For government, financial services and healthcare, where data sovereignty is strict. It runs fully on-premise with no external network dependency at all.",
  },
];

const guarantees = [
  { name: "Zero data retention", detail: "Deployments run inside your private cloud." },
  { name: "Never trains shared models", detail: "Your data, queries and outputs are never used to train them." },
  { name: "The weights stay yours", detail: "Models trained on your data belong to you." },
];

export default function WhereItRuns() {
  return (
    <section id="where-it-runs" aria-labelledby="where-title" className="rb-section scroll-mt-16">
      <div className="rb-container">
        <h2
          id="where-title"
          className="rb-reveal max-w-3xl text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
        >
          Run it where your data already lives.
        </h2>
        <p className="rb-reveal mt-6 max-w-[60ch] text-base leading-[1.6] text-white/70 sm:text-lg">
          Models and agents are deployed inside your environment, so nothing has to be moved and nothing is sent out.
        </p>

        <fieldset
          className={`${styles.root} m-0 mt-12 grid min-w-0 gap-10 border-0 p-0 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16`}
        >
          <legend className="sr-only">Where do you want it to run?</legend>

          <div className="flex flex-col items-start gap-1 sm:gap-2">
            {options.map((o, i) => (
              <div key={o.label} className="relative">
                <input
                  type="radio"
                  name="where"
                  id={`where-${i}`}
                  className={styles.pick}
                  defaultChecked={i === 0}
                />
                <label
                  htmlFor={`where-${i}`}
                  className={`${styles.opt} text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]`}
                >
                  {o.label}
                </label>
              </div>
            ))}
          </div>

          <div className="lg:pt-3">
            {options.map((o, i) => (
              <div key={o.label} data-i={i} className={styles.panel}>
                <p className="text-base leading-[1.65] text-white/70 sm:text-lg">{o.text}</p>
              </div>
            ))}
            <Link
              href="/contactus"
              className="group mt-6 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
            >
              Talk to us about your setup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </fieldset>

        <ul className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-10 lg:mt-20">
          {guarantees.map((g) => (
            <li key={g.name} className="rb-reveal">
              <p className="text-[17px] font-medium leading-snug text-white">{g.name}</p>
              <p className="mt-2 text-[15px] leading-snug text-white/65">{g.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
