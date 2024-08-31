'use client';

import { Product } from '@/lib/shopify/types';
import { Button } from '../ui/button';
import { useCart } from './cart-context';

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