'use client'
import { Product } from '@/lib/shopify/types';
import { useCallback, useMemo, useState } from 'react';


//TODO: REFACTOR IF POSSIBLE
export type selectedOptions = Record<string, string | null>;

export default function useProductOptions({ product }: { product: Product }): {
  selectedOptions: selectedOptions;
  switchOption: (value: string, optionName: string) => void;
  selectedVariant?: Product['variants'][number] | null;
} {
  const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({});

  const switchOption = useCallback((value: string, optionName: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }, []);

  const selectedVariant = useMemo(() => {
    if (!selectedOptions || !product.variants.length) return null;

    return product.variants.find((variant) => {
      return variant.selectedOptions.every((option) =>
        selectedOptions[option.name]
          ? option.value === selectedOptions[option.name]
          : true
      );
    });
  }, [product.variants, selectedOptions]);

  return { selectedOptions, selectedVariant, switchOption };
}
