'use client';
import { ProductState, findSelectedVariant } from '@/lib/productUtils';
import { Product } from '@/lib/shopify/types';
import { useCallback, useState } from 'react';

//TODO: REFACTOR IF POSSIBLE
export type selectedOptions = ProductState;

export default function useProductOptions({ product }: { product: Product }): {
  selectedOptions: selectedOptions;
  switchOption: (value: string, optionName: string) => void;
  selectedVariant?: Product['variants'][number] | null;
} {
  const [selectedOptions, setSelectedOptions] = useState<selectedOptions>({});

  const switchOption = useCallback((value: string, optionName: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }, []);

  const selectedVariant = findSelectedVariant(product, selectedOptions)

  return { selectedOptions, selectedVariant, switchOption };
}
