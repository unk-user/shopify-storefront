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
import { formatPrice } from '@/lib/utils';
import { findSelectedVariant } from '@/lib/productUtils';
import { AddToCart } from './add-to-cart';

//Refactor and add isAvailableForSale check

export function ProductDrawer() {
  const context = useDrawer();
  const product = context.product;

  if (product) {
    const selectedVariant = findSelectedVariant(product, context.productState);
    return (
      <Drawer
        open={context.open}
        onOpenChange={context.setOpen}
        onClose={context.closeDrawer}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Choose options</DrawerTitle>
            <DrawerDescription>description</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col p-4">
            <div className="flex items-start gap-4">
              <Image
                src={selectedVariant?.image.url as string}
                alt={selectedVariant?.image.altText || ''}
                width={100}
                height={100}
                loading="lazy"
              />
              <div>
                <h3>{product.title}</h3>
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
                        onClick={() =>
                          context.updateProductState(option.name, value)
                        }
                        className={
                          context.productState[option.name.toLowerCase()] ===
                          value
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
            <AddToCart product={product} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
}
