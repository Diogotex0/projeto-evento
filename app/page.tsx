import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { EventTypesSection } from "@/components/sections/EventTypesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ToastProvider } from "@/components/ui/Toast";

export default function LandingPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <EventTypesSection />
        <TestimonialsSection />
        <PricingSection />
        <FooterSection />
      </div>
    </ToastProvider>
  );
}
