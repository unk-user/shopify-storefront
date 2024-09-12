'use client';

import { Product, ProductVariant } from '@/lib/shopify/types';
import { Button } from '../ui/button';
import { useCart } from '../cart/cart-context';
import { useFormState } from 'react-dom';
import { addItem } from '../cart/actions';
import { ProductState } from '@/lib/productUtils';

const SubmitButton = ({
  availableForSale = true,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) => {
  if (!availableForSale || !selectedVariantId) {
    return (
      <Button disabled variant="secondary">
        Disabled
      </Button>
    );
  }

  return <Button aria-label="Add to cart">Add to Cart</Button>;
};

export function AddToCart({
  product,
  state,
}: {
  product: Product;
  state: ProductState;
}) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const [data, formAction] = useFormState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, {
    selectedVariantId,
    quantity: 1,
  });
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product, finalVariant?.quantityAvailable || 0);
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
