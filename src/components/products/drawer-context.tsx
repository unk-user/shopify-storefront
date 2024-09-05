'use client';

import { Product } from '@/lib/shopify/types';
import { createContext, useContext, useMemo, useState } from 'react';



type DrawerContextType = {
  product: Product | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: (product: Product) => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openDrawer = (product: Product) => {
    setProduct(product);
    setOpen(true);
  };

  const closeDrawer = () => {
    setProduct(null);
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      product,
      open,
      setOpen,
      openDrawer,
      closeDrawer,
    }),
    [product, open]
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
