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
import { useMediaQuery } from 'react-responsive';
import { Product, ProductVariant } from '@/lib/shopify/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
//Refactor and add isAvailableForSale check

export function ProductDrawer() {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const {
    open,
    product,
    productState,
    setOpen,
    closeDrawer,
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
    <>
      <Drawer
        open={open && !isDesktop}
        onOpenChange={setOpen}
        onClose={closeDrawer}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Choose options</DrawerTitle>
            <DrawerDescription className="hidden">
              choose product options and add to cart
            </DrawerDescription>
          </DrawerHeader>
          <DrawerOptions
            product={product}
            productState={productState}
            selectedVariant={selectedVariant}
            formattedPrice={formattedPrice}
          />
        </DrawerContent>
      </Drawer>
      <Sheet open={open && isDesktop} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Choose options</SheetTitle>
            <SheetDescription className="hidden">
              choose product options and add to cart
            </SheetDescription>
          </SheetHeader>
          <DrawerOptions
            product={product}
            productState={productState}
            selectedVariant={selectedVariant}
            formattedPrice={formattedPrice}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

const DrawerOptions = ({
  product,
  productState,
  selectedVariant,
  formattedPrice,
}: {
  product: Product;
  productState: ProductState;
  selectedVariant?: ProductVariant;
  formattedPrice: string | null;
}) => (
  <div className="flex flex-col p-4 md:px-0">
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
        <h3 className="font-medium">{product.title}</h3>
        <p className="font-bold text-storefront-accent-400">{formattedPrice}</p>
      </div>
    </div>
    <ProductOptions product={product} state={productState} />
    <AddToCart product={product} variant={selectedVariant} />
  </div>
);
