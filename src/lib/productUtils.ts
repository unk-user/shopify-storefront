import { Product, ProductVariant, ProductOption } from '@/lib/shopify/types';

export type ProductState = Record<string, string>;

export function findSelectedVariant(
  product: Product,
  selectedOptions: ProductState
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => selectedOptions[option.name.toLowerCase()] === option.value
    )
  );
}
