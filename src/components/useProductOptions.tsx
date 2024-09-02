import { ProductState } from '@/lib/productUtils';
import { Product } from '@/lib/shopify/types';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export default function useProductOptions({
  product,
  state,
}: {
  product: Product;
  state: ProductState;
}) {
  const hasNoOptionsOrJustOneOption =
    !product.options.length ||
    (product.options.length === 1 && product.options[0]?.values.length === 1);

  const combinations: Combination[] = product.variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (acc, option) => ({ ...acc, [option.name.toLowerCase()]: option.value }),
      {}
    ),
  }));

  const getOptionStatus = (optionNameLowerCase: string, value: string) => {
    const optionParams = { ...state, [optionNameLowerCase]: value };

    const filtered = Object.entries(optionParams).filter(([key, value]) =>
      product.options.find(
        (option) =>
          option.name.toLowerCase() === key && option.values.includes(value)
      )
    );

    const isAvailableForSale = combinations.find((combibantion) =>
      filtered.every(
        ([key, value]) =>
          combibantion[key] === value && combibantion.availableForSale
      )
    );

    const isActive = state[optionNameLowerCase] === value;

    return { isAvailableForSale, isActive };
  };

  return { hasNoOptionsOrJustOneOption, getOptionStatus };
}
