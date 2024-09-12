'use client';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'react-feather';

export function CartButton() {
  const { cart } = useCart();
  const totalItems = cart?.totalQuantity;

  return (
    <Button variant="icon" size="icon" className="relative">
      <ShoppingBag width={24} height={24} strokeWidth={1.5} />
      <div
        className={cn(
          'absolute h-4 w-4 leading-4 text-center align-middle bg-storefront-accent-500 translate-y-1/2 translate-x-1/2 bottom-2 right-2 rounded-sm text-xs',
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
