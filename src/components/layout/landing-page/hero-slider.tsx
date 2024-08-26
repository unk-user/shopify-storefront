'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAnimate } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type Slide = {
  img: string;
  header: string;
  subHeader: string;
  actionLabel: string;
  actionUrl: string;
};
export type Slides = Slide[];

const TRANSITION_DURATION = 0.6;

const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

const useSlideInterval = (
  callback: () => void,
  delay: number,
  isVisible: boolean,
  state?: any
) => {
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay, isVisible, state]);
};

const SlideContent = React.forwardRef<
  HTMLDivElement,
  { slide: Slide; isActive: boolean }
>(({ slide, isActive }, ref) => (
  <div
    ref={ref}
    className={cn([
      'absolute bottom-24 left-16 flex flex-col items-start mb-auto font-sans text-white',
      isActive ? 'opacity-100' : 'opacity-0',
    ])}
  >
    <h2 className="text-3xl font-bold mb-2">{slide.header}</h2>
    <p className="text-xl mb-3">{slide.subHeader}</p>
    <Button variant="outline" className="bg-transparent text-base" asChild>
      <Link href={slide.actionUrl}>{slide.actionLabel}</Link>
    </Button>
  </div>
));
SlideContent.displayName = 'SlideContent';


export function HeroSlider({ slides }: { slides: Slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<(HTMLElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const isVisible = useVisibility();

  const handleSlideChange = async (direction: 'next' | 'previous') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newSlide =
      direction === 'next'
        ? (currentSlide + 1) % slides.length
        : (currentSlide - 1 + slides.length) % slides.length;

    if (containerRef.current[newSlide] && containerRef.current[currentSlide]) {
      const outX = direction === 'next' ? '-100%' : '100%';
      const inX = direction === 'next' ? ['100%', '0%'] : ['-100%', '0%'];

      await Promise.all([
        animate(
          containerRef.current[currentSlide]!,
          {
            x: outX,
            display: 'none',
          },
          { duration: TRANSITION_DURATION, ease: 'easeInOut' }
        ),
        animate(
          contentRef.current[newSlide]!,
          {
            opacity: [0, 1],
            y: ['20%', '0%'],
          },
          { type: 'tween', delay: 0.5, duration: 0.4, ease: 'easeOut' }
        ),
        animate(
          containerRef.current[newSlide]!,
          {
            x: inX,
            display: 'block',
          },
          { duration: TRANSITION_DURATION, ease: 'easeInOut' }
        ),
      ]);

      setCurrentSlide(newSlide);
    }

    setIsAnimating(false);
  };

  useSlideInterval(
    () => handleSlideChange('next'),
    5000,
    isVisible,
    currentSlide
  );

  return (
    <section className='w-full'>
      <div className="w-full h-[calc(100vh-64px)] relative overflow-hidden flex items-center justify-center">
        <div className="relative h-full w-full" ref={scope}>
          {slides.map((slide, index) => (
            <article
              key={index}
              ref={(el) => {
                containerRef.current[index] = el;
              }}
              className={cn([
                'absolute h-full w-full',
                {
                  block: currentSlide === index,
                  hidden: currentSlide !== index,
                },
              ])}
              aria-hidden={currentSlide !== index}
            >
              <Image
                src={slide.img}
                alt={slide.header}
                className="w-full h-full object-cover"
                sizes="(100vw, 100vh)"
                priority={true}
                fill
              />
              <div className="relative w-full h-full from-black/85 via-black/10 to-black/85 bg-gradient-to-r">
                <SlideContent
                  ref={(el) => {
                    contentRef.current[index] = el;
                  }}
                  slide={slide}
                  isActive={currentSlide === index}
                />
              </div>
            </article>
          ))}
          <nav className="absolute z-30 w-full top-1/2 left-0 -translate-y-1/2 flex justify-between">
            <button
              onClick={() => handleSlideChange('previous')}
              className="text-white/60 h-44 w-16"
              aria-label="Previous slide"
            >
              <ChevronLeft className="mx-auto" />
            </button>
            <button
              onClick={() => handleSlideChange('next')}
              className="text-white/60 h-44 w-16"
              aria-label="Next slide"
            >
              <ChevronRight className="mx-auto" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
