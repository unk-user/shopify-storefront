'use client';

import { useCart } from '@/components/cart/cart-context';
import { CartTable } from '@/components/cart/cart-table';
import { SummaryCard } from '@/components/cart/summary-card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { formatPrice } from '@/lib/utils';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function CartPage() {
  const { cart } = useCart();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const formattedPrice = useMemo(() => {
    if (cart?.cost) {
      const currencyCode = cart?.cost.totalAmount.currencyCode;
      const subTotal = formatPrice(
        cart?.cost?.subtotalAmount.amount,
        currencyCode
      );
      const total = formatPrice(cart?.cost?.totalAmount.amount, currencyCode);
      const tax = formatPrice(cart?.cost?.totalTaxAmount.amount, currencyCode);

      return {
        subTotal,
        total,
        tax,
      };
    }
    return { subTotal: '0 MAD', total: '0 MAD', tax: '0 MAD' };
  }, [cart?.cost]);

  return (
    <>
      <header className="section-default mb-4 md:mb-6 flex flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-lg font-medium uppercase">Your Cart</h1>
        <p className="text-base font-poppins">
          <span className="text-primary-foreground/70">
            {cart?.totalQuantity || 0}{' '}
            {cart?.totalQuantity === 1 ? 'item' : 'items'}
          </span>{' '}
          | {formattedPrice.subTotal}
        </p>
      </header>
      <section className="section-default flex px-3 md:px-0 flex-1 gap-4 max-md:mb-[240px]">
        <div className="md:basis-3/4 w-full">
          <CartTable />
        </div>
        <div className="md:basis-1/4 w-full flex flex-col items-start max-md:hidden sticky top-32 h-max">
          <SummaryCard formattedPrice={formattedPrice} />
        </div>
      </section>
      <Drawer
        dismissible={false}
        open={!isDesktop}
        shouldScaleBackground={false}
        setBackgroundColorOnScale={false}
        disablePreventScroll
        modal={false}
      >
        <DrawerContent className="md:hidden">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Summary</DrawerTitle>
            <DrawerDescription className="hidden">
              Cart summary and checkout
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 mb-6">
            <SummaryCard formattedPrice={formattedPrice} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
