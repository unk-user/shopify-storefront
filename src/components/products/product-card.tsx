//TODO: IMPLEMENT ADD TO CART BUTTON
'use client';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { cn, formatPrice } from '@/lib/utils';
import { useDrawer } from './drawer-context';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DrawerButton } from './drawer-button';
import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Link from 'next/link';
import Image from 'next/image';

const labelVariants: Variants = {
  shown: {
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.2,
      type: 'tween',
    },
  },
  hidden: {
    y: -24,
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
  const PRODUCT_LINK = `/product/${product.handle}`;

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const { openDrawer } = useDrawer();

  const [hovered, setHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );

  const variantPrice = useMemo(
    () =>
      formatPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
      ),
    [selectedVariant]
  );

  const minPrice = useMemo(
    () =>
      formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      ),
    [product]
  );

  const handleOpenDrawer = useCallback(() => {
    openDrawer(product);
  }, [product, openDrawer]);

  return (
    <div
      className="w-full group"
      onMouseEnter={() => isDesktop && setHovered(true)}
      onMouseLeave={() => isDesktop && setHovered(false)}
    >
      <figure className="h-full">
        <Link href={PRODUCT_LINK} className="h-full flex flex-col">
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
                'w-full flex-wrap items-center gap-1 mt-1 z-10 hidden',
                product.variants.length && 'md:group-hover:flex',
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
              <p className="text-xs text-storefront-primary-400">
                {product.variants.length > 7 &&
                  '+' + (product.variants.length - 7)}
              </p>
            </div>
            <motion.div
              variants={labelVariants}
              animate={hovered ? 'shown' : 'hidden'}
              className="hidden md:group-hover:block"
            >
              <p className="text-xs md:text-sm xl:text-base w-full mt-1 font-bold">
                {variantPrice}
              </p>
            </motion.div>
            <div
              className={cn(
                'w-full flex flex-col space-y-1 pt-1 md:pt-2 pb-3 text-xs md:text-sm xl:text-base',
                product.variants.length && 'md:group-hover:hidden'
              )}
            >
              <p className="font-semibold">{product.title}</p>
              <p className="font-bold">
                <span className="text-storefront-accent">From</span> {minPrice}
              </p>
            </div>
            <DrawerButton handleClick={handleOpenDrawer} />
          </div>
        </Link>
      </figure>
    </div>
  );
}
