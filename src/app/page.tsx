import { FeaturedProducts } from '@/components/layout/landing-page/featured-products';
import { FeaturesSection } from '@/components/layout/landing-page/features-section';
import { HeroProduct } from '@/components/layout/landing-page/hero-product';
import { HeroSection } from '@/components/layout/landing-page/hero-section';

export default async function Home() {
  return (
    <>
      <div className="gradient-circle-tr" />
      <main className="main-layout">
        <HeroSection />
        <HeroProduct />
        <FeaturedProducts />
        <FeaturesSection />
      </main>
    </>
  );
}
