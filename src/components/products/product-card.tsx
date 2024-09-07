//TODO: IMPLEMENT ADD TO CART BUTTON
'use client';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { cn, formatPrice } from '@/lib/utils';
import { useDrawer } from './drawer-context';
import { useEffect, useState } from 'react';
import { DrawerButton } from './drawer-button';
import { motion, Variants } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const labelVariants: Variants = {
  shown: {
    y: 0,
    display: 'block',
    transition: {
      ease: 'easeOut',
      duration: 0.3,
      type: 'tween',
    },
  },
  hidden: {
    y: -24,
    display: 'none',
    transition: {
      duration: 0,
    },
  },
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority: boolean;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [hovered, setHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const { openDrawer } = useDrawer();
  const productLink = `/product/${product.handle}`;

  const handleClick = () => {
    openDrawer(product);
  };
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  useEffect(() => {
    const touchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);
    if (touchDevice) setHovered(false);
  }, [isDesktop]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
    >
      <figure className="h-full">
        <Link href={productLink} className="h-full flex flex-col">
          <div className="w-full aspect-square relative">
            <Image
              src={selectedVariant.image.url}
              alt={product.title}
              className="object-contain"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              fill
            />
          </div>
          <div className="w-full flex-1 flex flex-col">
            <div
              className={cn([
                'w-full flex-wrap items-center gap-1 mt-1 z-10',
                product.variants.length && hovered ? 'flex' : 'hidden',
              ])}
            >
              {Array(7)
                .fill(0)
                .map(
                  (_, index) =>
                    product.variants[index] && (
                      <div
                        key={product.variants[index].id}
                        onMouseEnter={() =>
                          setSelectedVariant(product.variants[index])
                        }
                        className="w-8 h-8 relative"
                      >
                        <Image
                          src={product.variants[index].image.url}
                          alt={product.title}
                          className="object-contain"
                          loading="lazy"
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                        />
                      </div>
                    )
                )}
              <p className="text-xs text-primary-foreground/60">
                {product.variants.length > 7 &&
                  '+' + (product.variants.length - 7)}
              </p>
            </div>
            <motion.div
              animate={hovered ? 'shown' : 'hidden'}
              variants={labelVariants}
              className={
                product.variants.length && hovered ? 'block' : 'hidden'
              }
            >
              <p className="text-xs md:text-sm xl:text-base w-full mt-1 font-bold">
                {formatPrice(selectedVariant.price.amount, currencyCode)}
              </p>
            </motion.div>
            <div
              className={cn([
                'w-full flex flex-col space-y-1 pt-1 md:pt-2 pb-3 text-xs md:text-sm xl:text-base',
                product.variants.length && hovered ? 'hidden' : '',
              ])}
            >
              <p className="font-semibold">{product.title}</p>
              <p className='font-bold'>
                <span className="text-storefront-accent">From</span>{' '}
                {formatPrice(
                  product.priceRange.minVariantPrice.amount,
                  currencyCode
                )}
              </p>
            </div>
            <DrawerButton handleClick={handleClick} />
          </div>
        </Link>
      </figure>
    </div>
  );
}
