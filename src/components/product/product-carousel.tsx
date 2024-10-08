'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/shopify/types';
import { type CarouselApi } from '@/components/ui/carousel';
import { useProduct } from './product-context';
import { useCallback, useEffect, useState } from 'react';
import { findSelectedVariant } from '@/lib/productUtils';
import { ZoomableImage } from './zoomable-image';

import Image from 'next/image';
//TODO: IMPROVE STYLING

export function ProductCarousel({ product }: { product: Product }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { state } = useProduct();

  const handleSelect = useCallback(() => {
    if (api) {
      setSelectedIndex(api.selectedScrollSnap());
    }
  }, [api]);

  useEffect(() => {
    api?.on('select', handleSelect);
    return () => {
      api?.off('select', handleSelect);
    };
  }, [api, handleSelect]);

  useEffect(() => {
    if (!state || !api) return;

    const selectedVariant = findSelectedVariant(product, state);

    if (selectedVariant) {
      const variantIndex = product.images.findIndex(
        (image) => selectedVariant.image.url === image.url
      );
      if (variantIndex !== -1) api.scrollTo(variantIndex);
    }
  }, [state, product, api]);

  return (
    <div className="flex flex-col gap-4 md:w-[45%]">
      <Carousel setApi={setApi} opts={{ loop: false }}>
        <CarouselContent className="h-full aspect-square gap-4">
          {product.images.map((image, index) => (
            <CarouselItem key={image.url}>
              <div className="relative w-full aspect-square">
                <ZoomableImage
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  priority={index === selectedIndex}
                  loading={index === selectedIndex ? 'eager' : 'lazy'}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute text-sm font-medium bottom-1 right-2 text-storefront-primary-900">
          {selectedIndex + 1} / {product.images.length}
        </div>
      </Carousel>
      <Carousel
        className="md:block hidden"
        opts={{ slidesToScroll: 5, loop: false }}
      >
        <CarouselContent className="lg:-ml-2 -ml-1">
          {product.images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className="lg:basis-auto basis-[20%] lg:pl-2 pl-1"
            >
              <div
                className="relative rounded-sm overflow-hidden hover:cursor-pointer"
                onClick={() => api?.scrollTo(index)}
              >
                <div
                  className={cn('absolute inset-0 bg-black/50 invisible', {
                    visible: selectedIndex === index,
                  })}
                ></div>
                <Image
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  className="object-contain"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
