'use client';

import { formatPrice } from '@/lib/utils';
import { useCart } from './cart-context';
import { useMemo } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { SummaryCard } from './summary-card';
import { useMediaQuery } from 'react-responsive';

export function CartHeader() {
  const { cart } = useCart();
  const subTotal = useMemo(
    () =>
      formatPrice(
        cart?.cost?.subtotalAmount.amount || '0',
        cart?.cost.subtotalAmount.currencyCode || 'MAD'
      ),
    [cart?.cost]
  );

  return (
    <p className="text-base font-poppins">
      <span className="text-primary-foreground/70">
        {cart?.totalQuantity || 0}{' '}
        {cart?.totalQuantity === 1 ? 'item' : 'items'}
      </span>{' '}
      | {subTotal}
    </p>
  );
}

export function MobileCartDrawer() {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  return (
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
          <SummaryCard />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
