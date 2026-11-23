import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The services as the same full-width index the products used to have under the client logos: the
// name big on a hairline, with one line about it and a link. On hover the row's hairline is
// drawn in the brand blue and the arrow appears. A Server Component; the rise-in is CSS (.rb-reveal).
// Same 48px top padding as the products index, since it sits right under the client logos.

type Service = { name: string; detail: string; href: string };

const services: Service[] = [
  { name: "Content Writing", detail: "High-volume website copy, programmatic SEO, and technical documentation.", href: "/services/content-writing" },
  { name: "Content Strategy", detail: "Data-driven editorial planning and multi-channel AI distribution.", href: "/services/content-strategy" },
  { name: "Video Editing & Generation", detail: "AI-powered generative video production and motion workflows.", href: "/services/video-editing" },
  { name: "University Training Programs", detail: "Hands-on GenAI curriculum, workshops, and student enablement.", href: "/services/university-training" },
  { name: "Website Revamp Services", detail: "Modern, high-converting digital web experiences built for the AI era.", href: "/services/website-revamp" },
  { name: "Corporate Trainings", detail: "Custom enterprise upskilling for technical teams and leadership.", href: "/services/corporate-trainings" },
];

function Row({ service }: { service: Service }) {
  return (
    <li className="rb-reveal border-b border-white/10">
      <Link href={service.href} className="group relative block px-1 py-5 sm:py-6 lg:px-4">
        <span className="grid items-center gap-x-8 gap-y-3 sm:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[24rem_minmax(0,1fr)_1.5rem]">
          <span className="text-[clamp(1.25rem,1.7vw,1.625rem)] font-medium leading-tight tracking-[-0.02em] text-white">
            {service.name}
          </span>

          <span className="text-[15px] leading-snug text-white/65">{service.detail}</span>

          <ArrowUpRight
            aria-hidden
            className="hidden h-5 w-5 -translate-x-2 translate-y-2 text-brand-text opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 lg:block"
          />
        </span>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-text transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </Link>
    </li>
  );
}

export default function ServicesIndex() {
  return (
    <section aria-labelledby="services-title" className="relative">
      <div className="rb-container relative pb-12 pt-12 md:pb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="services-title"
            className="rb-reveal max-w-3xl text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
          >
            Six services, from the team behind the products.
          </h2>

          <Link
            href="/contactus"
            className="group inline-flex items-center gap-2 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            Talk to us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-10 border-t border-white/10 lg:mt-12">
          {services.map((s) => (
            <Row key={s.name} service={s} />
          ))}
        </ul>
      </div>
    </section>
  );
}
