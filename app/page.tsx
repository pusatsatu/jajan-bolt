import Header from '@/components/header';
import HeroSection from '@/components/landing/hero-section';
import AboutSection from '@/components/landing/about-section';
import FeaturesSection from '@/components/landing/features-section';
import DemoSection from '@/components/landing/demo-section';
import PricingSection from '@/components/landing/pricing-section';
import FAQSection from '@/components/landing/faq-section';
import TestimonialSection from '@/components/landing/testimonial-section';
import CTASection from '@/components/landing/cta-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <FAQSection />
        <TestimonialSection />
        <CTASection />
      </main>
    </div>
  );
}