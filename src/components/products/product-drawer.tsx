'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDrawer } from './drawer-context';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils';
import { ProductState, findSelectedVariant } from '@/lib/productUtils';
import { AddToCart } from './add-to-cart';
import { useEffect, useMemo, useState } from 'react';
import { ProductVariant } from '@/lib/shopify/types';

//Refactor and add isAvailableForSale check

export function ProductDrawer() {
  const { open, setOpen, closeDrawer, product } = useDrawer();
  const [productState, setProductState] = useState<ProductState>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const updateProductState = (name: string, value: string) => {
    setProductState((prev) => ({ ...prev, [name.toLowerCase()]: value }));
  };

  useEffect(() => {
    if (product) {
      const initialState = product.availableForSale
        ? product.variants
            .find((variant) => variant.availableForSale)
            ?.selectedOptions.reduce(
              (acc, option) => ({
                ...acc,
                [option.name.toLowerCase()]: option.value,
              }),
              {}
            ) ?? {}
        : product.variants[0].selectedOptions.reduce(
            (acc, option) => ({
              ...acc,
              [option.name.toLowerCase()]: option.value,
            }),
            {}
          );

      setProductState(initialState ?? {});
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const selectedVariant = findSelectedVariant(product, productState);
      setSelectedVariant(selectedVariant);
    }
  }, [product, productState]);

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
            <div className="relative w-[100px] h-[100px]">
              {product.variants
                .filter((variant) => variant.availableForSale)
                .map((variant) => (
                  <Image
                    key={variant.id}
                    src={variant.image.url}
                    alt={variant.image.altText}
                    className={cn([
                      selectedVariant && selectedVariant.id === variant.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    ])}
                    fill
                  />
                ))}
            </div>
            <div>
              <h3>{}</h3>
              <p className="font-bold">
                {formatPrice(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {product.options.map((option) => (
                <div className="flex items-center gap-1" key={option.id}>
                  {option.values.map((value) => (
                    <Button
                      key={value}
                      onClick={() => updateProductState(option.name, value)}
                      className={
                        productState[option.name.toLowerCase()] === value
                          ? 'bg-blue-900'
                          : ''
                      }
                      size="sm"
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <AddToCart product={product} state={productState} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
