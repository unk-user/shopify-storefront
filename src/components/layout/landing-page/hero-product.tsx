'use client';
import './landing-page.css';

import Image from 'next/image';

export function HeroProduct() {
  return (
    <section className="section-default mobile-px">
      <div className="carousel-container flex flex-col">
        <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />
        <div className="h-full w-full relative">
          <Image
            src="/hero-product.jpg"
            alt="hero product"
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
            fill
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
