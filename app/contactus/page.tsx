import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import ContactSwitch from "@/components/contact/ContactSwitch";
import ContactForm from "@/components/contact/ContactForm";
import ContactRail from "@/components/contact/ContactRail";
import BookCall from "@/components/contact/BookCall";
import WhatWeDo from "@/components/contact/WhatWeDo";

export const metadata: Metadata = {
  title: "Contact Us — Rabbitt AI",
  description:
    "Talk to the Rabbitt AI team about a product demo, a service project, a website revamp or the AINama book, or book a 30-minute call. A person replies within 2–4 business hours.",
};

// The contact page, from the Figma "Contact" frames (Completed pages): a centred headline and a
// switch between sending a message and booking a call. The message view is the form beside the
// direct-contact blocks; the call view is the booking panel. Then "What we can do for you", and the
// footer. `?topic=` (demo, service, revamp, ainama, other) picks the form's topic; `?mode=call`
// opens on the call.
export default async function ContactUsPage({ searchParams }: { searchParams: Promise<{ topic?: string; mode?: string }> }) {
  const { topic, mode } = await searchParams;
  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark bg-page text-white selection:bg-blue-600 selection:text-white">
        <section className="rb-container pt-28 lg:pt-[168px]">
          <h1 className="text-center text-[40px] font-semibold leading-[1.1] tracking-[-0.045em] sm:text-[56px] lg:text-[72px] lg:leading-[1.05]">
            Let’s talk about your data.
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-center text-[16px] leading-[1.55] text-white/60 lg:mt-5 lg:text-[18px]">
            Tell us what you are working on, or pick a time to talk. A person replies within 2–4 business hours.
          </p>

          <ContactSwitch
            initial={mode === "call" ? "call" : "message"}
            message={
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.52fr)_minmax(0,1fr)] lg:gap-5">
                <div className="bg-white/[0.04] p-5 py-7 lg:p-12">
                  <ContactForm key={topic ?? "demo"} initialTopic={topic} />
                </div>
                <ContactRail />
              </div>
            }
            call={
              <>
                <BookCall />
                <p className="mt-8 text-center text-[14px] text-white/55 lg:text-[15px]">
                  Prefer to write? Switch to Send a message, or email{" "}
                  <a href="mailto:sales@rabbitt.ai" className="text-white/80 underline underline-offset-2 hover:text-white">
                    sales@rabbitt.ai
                  </a>
                  .
                </p>
              </>
            }
          />
        </section>

        <WhatWeDo />
      </main>
      <Footer />
    </>
  );
}
