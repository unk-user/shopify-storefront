'use client';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { ShoppingBag } from 'react-feather';

export function CartButton() {
  const { cart } = useCart();
  const totalItems = cart?.totalQuantity;
  const [isPinging, setIsPinging] = useState(false);
  const prevTotalItemsRef = useRef(totalItems);

  useEffect(() => {
    const prevTotalItems = prevTotalItemsRef.current;
    if (prevTotalItems !== totalItems) {
      setIsPinging(true);
      const timer = setTimeout(() => setIsPinging(false), 300);
      return () => clearTimeout(timer);
    }

    prevTotalItemsRef.current = totalItems;
  }, [totalItems]);

  return (
    <Button
      variant="icon"
      size="icon"
      className={cn(
        'relative transition-all duration-300 easeOut',
        isPinging && 'border-storefront-accent border-2'
      )}
    >
      <ShoppingBag width={24} height={24} strokeWidth={1.5} />
      <div
        className={cn(
          'absolute h-4 min-w-4 leading-4 text-center align-middle bg-storefront-accent-500 translate-y-1/2 translate-x-1/2 bottom-2 right-2 rounded-sm text-xs',
          {
            hidden: !totalItems || totalItems === 0,
          }
        )}
      >
        {totalItems}
      </div>
    </Button>
  );
}
