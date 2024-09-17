'use client';

import { ProductState } from '@/lib/productUtils';
import { Product } from '@/lib/shopify/types';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type DrawerContextType = {
  product: Product | null;
  open: boolean;
  productState: ProductState;
  updateProductState: (name: string, value: string) => ProductState;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: (product: Product) => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productState, setProductState] = useState<ProductState>({});
  
  const updateProductState = useCallback(
    (name: string, value: string) => {
      const newState = { ...productState, [name.toLowerCase()]: value };
      setProductState(newState);
      return newState;
    },
    [productState]
  );

  const openDrawer = (product: Product) => {
    setProduct(product);
    setOpen(true);
  };

  const closeDrawer = () => {
    setProduct(null);
    setProductState({});
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      product,
      open,
      productState,
      updateProductState,
      setOpen,
      openDrawer,
      closeDrawer,
    }),
    [product, open, productState, updateProductState]
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
