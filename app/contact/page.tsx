import type { Metadata } from "next";
import SiteNavigation from "@/components/SiteNavigation";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us — Rabbitt Ai",
  description:
    "Speak directly with our enterprise solutions team. Whether you need custom model adaptation, enterprise retrieval, or private cloud deployment, we're here to guide your AI journey.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#020305] min-h-screen flex flex-col justify-between">
      {/* Shared navigation */}
      <SiteNavigation />

      {/* Contact content & consultation booking */}
      <ContactSection />

      {/* Shared footer */}
      <SiteFooter />
    </main>
  );
}
