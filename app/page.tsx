import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProcessSection from "@/components/process-section";
import SecuritySection from "@/components/security-section";
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
          <SecuritySection />
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
}