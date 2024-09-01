'use client';
import { ShoppingBag } from 'react-feather';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useCart } from './cart-context';
import { useEffect } from 'react';
import { createCartAndSetCookie } from './actions';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

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
      <SheetContent>
        <div className="flex flex-col gap-1 min-h-full">
          {cart?.lines.map((item) => (
            <div className="flex items-center" key={item.id}>
              <Image
                src={item.merchandise.product.featuredImage.url}
                alt={item.merchandise.product.featuredImage.altText}
                height={100}
                width={100}
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold text-lg">
                  {item.merchandise.title}
                </h4>
                <p>quantity: {item.quantity}</p>
                <p>
                  {formatPrice(
                    item.cost.totalAmount.amount,
                    item.cost.totalAmount.currencyCode
                  )}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-auto w-full">
            Total:
            <p className="font-bold text-lg">
              {formatPrice(
                cart?.cost.totalAmount.amount || '0.0',
                cart?.cost.totalAmount.currencyCode || 'MAD'
              )}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
