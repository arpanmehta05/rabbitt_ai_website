import type { Metadata } from "next";
import SiteNavigation from "@/components/SiteNavigation";
import ProductsHero from "@/components/ProductsHero";
import ProductsShowcase from "@/components/ProductsShowcase";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Products — Rabbitt AI",
  description:
    "We turn your data into AI that delivers. Rabbitt AI builds secure, reliable and scalable AI solutions that help enterprises unlock real impact.",
};

export default function ProductsPage() {
  return (
    <main className="bg-[#020305] min-h-screen flex flex-col justify-between">
      {/* Shared site navbar */}
      <SiteNavigation />

      {/* Hero section matching provided visual */}
      <ProductsHero />

      {/* Product catalogue and scroll-driven showcase */}
      <ProductsShowcase />

      {/* White CTA Card before footer */}
      <ContactCta />

      {/* Shared site footer */}
      <SiteFooter />
    </main>
  );
}
