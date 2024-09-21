import { BenefitsSection } from '@/components/layout/landing-page/benefits-section';
import { FaqSection } from '@/components/layout/landing-page/faq-section';
import { FeaturedProducts } from '@/components/layout/landing-page/featured-products';
import { FeaturesSection } from '@/components/layout/landing-page/features-section';
import { HeroProduct } from '@/components/layout/landing-page/hero-product';
import { HeroSection } from '@/components/layout/landing-page/hero-section';
import { LogoSlider } from '@/components/layout/landing-page/logo-slider';

export default async function Home() {
  return (
    <>
      <div className="gradient-circle-tr" />
      <main className="main-layout space-y-36">
        <HeroSection />
        <HeroProduct />
        <FeaturedProducts />
        <FeaturesSection />
        <BenefitsSection />
        <LogoSlider />
        <FaqSection />
      </main>
    </>
  );
}
