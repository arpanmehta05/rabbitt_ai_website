import { cookies } from "next/headers";
import LandingExperience from "@/components/LandingExperience";
import LandingStats from "@/components/LandingStats";
import LlmAdoptionJourney from "@/components/LlmAdoptionJourney";
import ClientMarquee from "@/components/ClientMarquee";
import LandingProducts from "@/components/LandingProducts";
import LandingFaq from "@/components/LandingFaq";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export default async function Home() {
  const cookieStore = await cookies();
  const initialSkip = cookieStore.has("rabbitt_intro_seen");

  return (
    <main className="bg-[#020305]">
      <LandingExperience initialSkip={initialSkip} />
      <ClientMarquee />
      <LandingProducts />
      <LlmAdoptionJourney />
      <LandingStats />
      <LandingFaq />
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
