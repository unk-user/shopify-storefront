'use client';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { Button } from '../ui/button';
import { useCart } from '../cart/cart-context';
import { useProduct } from '../product/product-context';
import { useFormStatus } from 'react-dom';
import { addItem } from '../cart/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { QuantityInput } from '../cart/quantity-input';
import { Loader } from 'react-feather';

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
        className="flex-grow h-12 text-base font-semibold"
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
      className="flex-grow bg-gradient-to-r from-primary to-storefront-primary-400 h-12 text-base font-semibold"
    >
      {pending ? <Loader className="animate-spin" /> : 'Add to cart'}
    </Button>
  );
};

export function AddToCart({
  product,
  variant,
}: {
  product: Product;
  variant?: ProductVariant;
}) {
  const { variants, availableForSale } = product;
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCart();

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  const handleAddToCart = async () => {
    addCartItem(
      finalVariant,
      product,
      finalVariant.quantityAvailable,
      quantity
    );
    const response = await addItem(finalVariant.id, quantity);
    response.status === 'success'
      ? toast.success(response.message)
      : toast.error(response.message);
  };

  return (
    <form
      action={handleAddToCart}
      className="flex flex-col-reverse md:flex-row gap-2"
    >
      <QuantityInput
        maxQuantity={finalVariant?.quantityAvailable}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
    </form>
  );
}
