'use client';

import { formatPrice } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useCart } from './cart-context';
import { QuantitySelect } from './quantity-select';
import { Trash2 } from 'react-feather';
import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { removeItem } from './actions';

export function CartTable() {
  const { cart } = useCart();

  return (
    <Table
      className={
        !cart?.totalQuantity || cart?.totalQuantity === 0 ? 'h-full' : ''
      }
    >
      <TableHeader>
        <TableRow className="uppercase *:text-primary-foreground/80">
          <TableHead className="pl-2">Product</TableHead>
          <TableHead className="max-md:hidden">Quantity</TableHead>
          <TableHead className="text-end pr-2">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.totalQuantity && cart?.totalQuantity > 0 ? (
          cart?.lines.map((line, i) => (
            <TableRow key={line.id} className="*:align-top">
              <TableCell className="pl-2">
                <div className="flex items-start gap-3">
                  <div className="relative w-[100px] max-md:w-[88px] aspect-square shrink-0">
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={
                        line.merchandise.product.featuredImage.altText ||
                        'Product Image'
                      }
                      className="rounded-md"
                      sizes="(min-width: 768px) 100px, 88px"
                      loading="lazy"
                      fill
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-grow">
                    <Link
                      href={`/product/${line.merchandise.product.handle}`}
                      className="md:text-base text-sm font-semibold hover:underline underline-offset-2 truncate max-md:w-36"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.selectedOptions.map((option) => (
                      <p
                        key={option.name}
                        className="text-sm text-primary-foreground/80 lowercase truncate"
                      >{`${option.name}: ${option.value}`}</p>
                    ))}
                    <div className="md:hidden mt-2">
                      <QuantitySelect line={line} />
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-md:hidden">
                <QuantitySelect line={line} />
              </TableCell>
              <TableCell className="font-semibold relative text-end pr-2">
                {formatPrice(
                  line.cost.totalAmount.amount,
                  line.cost.totalAmount.currencyCode
                )}
                <div className="absolute bottom-4 right-0">
                  <RemoveItem merchandiseId={line.merchandise.id} />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="h-full flex-1">
            <TableCell colSpan={3} className="text-center text-base">
              Your Cart is Empty <br className="md:hidden" />
              <Link
                href="/products"
                className="underline underline-offset-1 font-medium"
              >
                Continue shopping
              </Link>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function RemoveItem({ merchandiseId }: { merchandiseId: string }) {
  const { updateCartItem } = useCart();

  const handleRemove = async (formData: any) => {
    updateCartItem(merchandiseId, 'delete');
    const result = await removeItem(merchandiseId);
    result.status === 'success'
      ? toast.success(result.message)
      : toast.error(result.message);
  };

  return (
    <form action={handleRemove}>
      <Button
        variant="icon"
        size="icon"
        type="submit"
        className="h-auto w-auto p-2 bg-transparent border-none group"
      >
        <Trash2
          strokeWidth={1.5}
          className="text-storefront-primary-300 group-hover:text-primary-foreground transition-colors duration-100"
        />
      </Button>
    </form>
  );
}


