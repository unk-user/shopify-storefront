'use client';

import { Product, ProductVariant } from '@/lib/shopify/types';
import { Button } from '../ui/button';
import { useCart } from './cart-context';
import { useProduct } from '../product/product-context';
import { useFormState, useFormStatus } from 'react-dom';
import { addItem } from './actions';
import { useEffect } from 'react';
import { toast } from 'sonner';

const SubmitButton = ({
  availableForSale = true,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) => {
  const { pending } = useFormStatus();

  if (!availableForSale || !selectedVariantId) {
    return (
      <Button
        type="submit"
        disabled
        className="w-full h-12 text-base font-semibold"
      >
        {availableForSale ? 'Select Options' : 'Out of Stock'}
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      aria-label="Add to cart"
      disabled={pending}
      className="w-full bg-gradient-to-r from-primary to-storefront-primary-400 h-12 text-base font-semibold"
    >
      Add to Cart
    </Button>
  );
};

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [data, formAction] = useFormState(addItem, null);

  useEffect(() => {
    if (data) {
      data.status === 'success'
        ? toast.success(data.message)
        : toast.error(data.message);
    }
  }, [data]);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        actionWithVariant();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {data?.message}
      </p>
    </form>
  );
}
