import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProcessSection from "@/components/process-section";
import MarketsSection from "@/components/markets-section";
import SecuritySection from "@/components/security-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-screen w-full">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProcessSection />
          <MarketsSection />
          <SecuritySection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
}