'use client';

import { ProductState } from '@/lib/productUtils';
import { Product } from '@/lib/shopify/types';
import { createContext, useContext, useMemo, useState } from 'react';

type DrawerContextType = {
  product: Product | null;
  productState: ProductState;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: (product: Product) => void;
  closeDrawer: () => void;
  updateProductState: (optionName: string, optionValue: string) => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productState, setProductState] = useState<ProductState>({});

  const getInitialProductState = (product: Product) => {
    return product.variants[0].selectedOptions.reduce(
      (acc, option) => ({ ...acc, [option.name.toLowerCase()]: option.value }),
      {}
    );
  };

  const openDrawer = (product: Product) => {
    setProduct(product);
    setProductState(getInitialProductState(product));
    setOpen(true);
  };

  const closeDrawer = () => {
    setProduct(null);
    setProductState({});
    setOpen(false);
  };

  const updateProductState = (optionName: string, optionValue: string) => {
    const lowerCaseOptionName = optionName.toLowerCase();
    setProductState((prev) => ({
      ...prev,
      [lowerCaseOptionName]: optionValue,
    }));
  };

  const value = useMemo(
    () => ({
      product,
      productState,
      open,
      setOpen,
      openDrawer,
      closeDrawer,
      updateProductState,
    }),
    [product, open, productState]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
