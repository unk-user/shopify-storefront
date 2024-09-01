'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/shopify/types';
import { type CarouselApi } from '@/components/ui/carousel';
import { useProduct } from './product-context';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { findSelectedVariant } from '@/lib/productUtils';

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
  }, [state, product.variants, product.images, api]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Carousel
        className="w-full h-full bg-white"
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="w-full h-full">
          {product.images.map((image) => (
            <CarouselItem key={image.url}>
              <div className="relative h-full w-full">
                <Image
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  sizes="50vw"
                  className="object-contain"
                  loading="lazy"
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex items-center gap-1">
        {product.images.map((image, index) => (
          <div
            className={cn([
              'relative border-4 hover:cursor-pointer',
              selectedIndex === index ? 'border-b-yellow-500' : '',
            ])}
            onClick={() => api?.scrollTo(index)}
            aria-label={`View image ${index + 1}`}
            key={image.url}
          >
            <Image
              src={image.url}
              alt={image.altText || 'Product Image'}
              width={50}
              height={50}
              loading="lazy"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
