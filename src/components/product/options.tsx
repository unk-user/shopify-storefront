'use client';
import { Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { useProduct, useUpdateURL } from '@/components/product/product-context';
import useProductOptions from '../useProductOptions';
import { Button } from '../ui/button';

export function ProductOptions({ product }: { product: Product }) {
  const { state, updateOption } = useProduct();
  const { hasNoOptionsOrJustOneOption, getOptionStatus } = useProductOptions({
    product,
    state,
  });
  const updateUrl = useUpdateURL();

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  return (
    <div className="flex flex-col mt-4 space-y-4 md:mt-8 mb-8">
      {product.options.map((option) => (
        <form key={option.id}>
          <dl>
            <dt className="mb-2 uppercase tracking-wide">{option.name}</dt>
            <dd className="flex flex-wrap gap-1">
              {option.values.map((value) => {
                const optionNameLowerCase = option.name.toLowerCase();
                const { isActive, isAvailableForSale } = getOptionStatus(
                  optionNameLowerCase,
                  value
                );

                return (
                  <Button
                    formAction={() => {
                      const newState = updateOption(optionNameLowerCase, value);
                      updateUrl(newState);
                    }}
                    key={value}
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    title={`${option.name} ${value}${
                      !isAvailableForSale ? ' (Out of Stock)' : ''
                    }`}
                    variant="secondary"
                    size="sm"
                    className={cn('min-w-[64px] text-base', {'border-storefront-accent-500' : isActive})}
                  >
                    {value}
                  </Button>
                );
              })}
            </dd>
          </dl>
        </form>
      ))}
    </div>
  );
}
