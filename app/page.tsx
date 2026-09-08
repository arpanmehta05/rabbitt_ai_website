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
  // Keep the theme decision in one place until we agree on the switch UI.
  const landingTheme = "light" as const;

  return (
    <main className={`landing-${landingTheme} bg-[#f8fbff]`}>
      <LandingExperience initialSkip={initialSkip} theme={landingTheme} />
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
