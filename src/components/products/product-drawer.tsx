'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDrawer } from './drawer-context';
import { cn, formatPrice } from '@/lib/utils';
import { findSelectedVariant, ProductState } from '@/lib/productUtils';
import { useMemo } from 'react';

import Image from 'next/image';
import { ProductOptions } from './options';
import { AddToCart } from './add-to-cart';
//Refactor and add isAvailableForSale check

export function ProductDrawer() {
  const {
    open,
    product,
    productState,
    setOpen,
    closeDrawer,
    updateProductState,
  } = useDrawer();

  const selectedVariant = useMemo(() => {
    return product ? findSelectedVariant(product, productState) : undefined;
  }, [product, productState]);

  const formattedPrice = useMemo(
    () =>
      product &&
      formatPrice(
        selectedVariant?.price.amount ||
          product?.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      ),
    [product, selectedVariant]
  );

  if (!product) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={closeDrawer}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Choose options</DrawerTitle>
          <DrawerDescription>description</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-[100px] h-[100px] shrink-0">
              {product.variants
                .filter((variant) => variant.availableForSale)
                .map((variant) => (
                  <Image
                    key={variant.id}
                    src={variant.image.url}
                    alt={variant.image.altText}
                    className={cn(
                      'opacity-0',
                      selectedVariant
                        ? selectedVariant.id === variant.id && 'opacity-100'
                        : 'opacity-100'
                    )}
                    sizes="100px"
                    fill
                  />
                ))}
            </div>
            <div>
              <h3 className='font-medium'>{product.title}</h3>
              <p className="font-bold text-storefront-accent-400">{formattedPrice}</p>
            </div>
          </div>
          <ProductOptions product={product} state={productState} />
          <AddToCart product={product} variant={selectedVariant} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
