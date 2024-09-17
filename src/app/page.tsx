import { HeroSection } from '@/components/layout/landing-page/hero-section';
import { HeroSlider } from '@/components/layout/landing-page/hero-slider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'react-feather';

export default async function Home() {
  return (
    <>
      <div className="gradient-circle-tr" />
      <main className="main-layout">
        <HeroSection />
        <section className="section-default 2xl:px-24 max-md:px-4">
          <div className="w-full h-[600px] rounded-xl overflow-hidden">
            <HeroSlider />
          </div>
        </section>
      </main>
    </>
  );
}
