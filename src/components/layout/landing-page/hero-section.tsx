import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'react-feather';

export function HeroSection() {
  return (
    <section className="section-default mobile-px pt-16">
      <div className="mx-auto lg:text-center *:lg:mx-auto">
        <h1
          className="text-4xl font-semibold max-w-4xl bg-gradient-to-r from-storefront-primary-300 to-primary-foreground
            bg-clip-text text-transparent max-md:text-3xl"
        >
          Elevate Every Keystroke with Our Professional Mechanical Keyboards
        </h1>
        <p
          title="Subheader"
          className="max-w-3xl max-md:text-base mt-4 max-md:mt-2"
        >
          Discover the perfect blend of performance, precision, and aesthetics
          with Keychron&apos;s versatile mechanical keyboards.
        </p>
        <Button
          variant="primary"
          className="px-14 mt-6 uppercase group"
          asChild
        >
          <Link href="/products">
            Shop now
            <ArrowUpRight className="ml-2 group-hover:rotate-45 group-active:rotate-45 transition-transform duration-150" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
