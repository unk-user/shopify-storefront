'use client';
import { Product } from '@/lib/shopify/types';
import { Button } from '@/components/ui/button';
import { cn, createUrl } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function ProductOptions({ product }: { product: Product }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params;
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col gap-2 mt-8">
      {product.options.map((option) => (
        <div key={option.id}>
          {option.name}:{' '}
          <div className="flex items-center gap-1">
            {option.values.map((value) => (
              <Button
                key={value}
                onClick={() =>
                  router.replace(
                    createUrl(pathname, updateSearchParams(option.name, value)),
                    { scroll: false }
                  )
                }
                className={cn([
                  searchParams.get(option.name) === value ? 'bg-blue-950' : '',
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
