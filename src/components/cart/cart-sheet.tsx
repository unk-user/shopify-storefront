'use client';
import { ShoppingBag } from 'react-feather';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useCart } from './cart-context';
import { useEffect } from 'react';
import { createCartAndSetCookie } from './actions';

export function CartSheet() {
  const { cart, updateCartItem } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  return (
    <Sheet>
      <SheetTrigger className="ml-auto">
        <ShoppingBag className="mr-1" strokeWidth="0.1rem" />
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
}
