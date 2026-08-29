import LandingExperience from "@/components/LandingExperience";
import LlmAdoptionJourney from "@/components/LlmAdoptionJourney";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="bg-[#020305]">
      <LandingExperience />
      <LlmAdoptionJourney />
      <SiteFooter />
    </main>
  );
}
