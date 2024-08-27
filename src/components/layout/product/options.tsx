'use client';
import { Product } from '@/lib/shopify/types';
import useProductOptions from '../products/useProductOptions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


export function ProductOptions({ product }: { product: Product }) {
  const { selectedOptions, selectedVariant, switchOption } = useProductOptions({
    product,
  });

  return (
    <div className="flex flex-col gap-2 mt-8">
      {product.options.map((option) => (
        <div key={option.id}>
          {option.name}:{' '}
          <div className="flex items-center gap-1">
            {option.values.map((value) => (
              <Button
                key={value}
                onClick={() => switchOption(value, option.name)}
                className={cn([
                  selectedOptions[option.name] === value && 'bg-blue-950',
                ])}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
