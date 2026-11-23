import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import Glow from "@/components/Glow";
import PolicyBody from "@/components/privacy/PolicyBody";
import { whiteButton } from "@/components/contact/ui";
import { DETAILS, PDF_HREF, SECTIONS, SHORT_VERSION } from "./policy";

export const metadata: Metadata = {
  title: "Privacy Policy — Rabbitt AI",
  description:
    "How Rabbitt AI collects, uses, shares and protects personal data, and the choices you have.",
};

// The privacy page, from the Figma "Privacy" frames: a centred title with the PDF download, "The short
// version" in four points on the products-card gradient, then the policy (components/privacy/PolicyBody)
// with "On this page" on the left. The text is in ./policy.ts.

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark bg-page text-white selection:bg-blue-600 selection:text-white">
        <header className="rb-container pt-28 lg:pt-[168px]">
          <h1 className="text-[44px] font-semibold leading-[46px] tracking-[-0.02em] lg:text-center lg:text-[72px] lg:leading-[76px]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[16px] leading-[25px] text-white/60 lg:mx-auto lg:mt-6 lg:max-w-[720px] lg:text-center lg:text-[18px] lg:leading-7">
            How Rabbitt AI collects, uses, shares and protects personal data, and the choices you have.
          </p>
          <div className="mt-4 lg:mt-9 lg:flex lg:justify-center">
            <a href={PDF_HREF} download className={`${whiteButton} w-full justify-center rounded-lg lg:w-auto`}>
              Download PDF <ArrowDown aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </header>

        <section aria-labelledby="short-version" className="rb-container mt-10 lg:mt-[78px]">
          <div className="relative isolate overflow-hidden px-6 py-7 lg:px-12 lg:pb-[42px] lg:pt-12">
            <Glow blur={90} />
            <h2 id="short-version" className="text-[26px] font-semibold leading-8 lg:text-[32px] lg:leading-[38px]">
              The short version.
            </h2>
            <ul className="mt-5 grid gap-5 lg:mt-11 lg:grid-cols-4 lg:gap-8">
              {SHORT_VERSION.map((p) => (
                <li key={p.title} className="border-t border-white/25 pt-[21px] lg:pt-6">
                  <p className="text-[17px] font-semibold leading-6 lg:text-[19px] lg:leading-[26px]">{p.title}</p>
                  <p className="mt-1.5 text-[15px] leading-[23px] text-white/75 lg:mt-2">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-8 lg:mt-[100px]">
          <PolicyBody sections={SECTIONS} details={DETAILS} pdfHref={PDF_HREF} />
        </div>
      </main>
      <Footer />
    </>
  );
}
