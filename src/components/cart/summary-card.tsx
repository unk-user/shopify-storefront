'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCart } from './cart-context';
import { useMemo } from 'react';
import { formatPrice } from '@/lib/utils';

interface FormattedPrice {
  subTotal: string;
  total: string;
  tax: string;
}

export function SummaryCard() {
  const { cart } = useCart();
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
      <h2 className="text-2xl max-md:hidden">Summary</h2>
      <ul className="md:mt-6 w-full *:h-7 md:space-y-2">
        <li className="w-full flex items-center">
          Subtotal
          <span className="ml-auto">{formattedPrice.subTotal}</span>
        </li>
        <li className="w-full flex items-center">
          Estimated Shipping
          <span className="ml-auto">__</span>
        </li>
        <li className="w-full flex items-center">
          Total Tax
          <span className="ml-auto">{formattedPrice.tax}</span>
        </li>
      </ul>
      <div className="w-full flex items-center mt-2 md:mt-6 border-t md:border-y py-4">
        Total
        <span className="ml-auto">{formattedPrice.total}</span>
      </div>
      <Button
        className="w-full md:mt-8 bg-gradient-to-r from-primary to-storefront-primary-500"
        disabled={!cart}
        asChild
      >
        <Link href={cart?.checkoutUrl || ''}>Check Out</Link>
      </Button>
    </>
  );
}
