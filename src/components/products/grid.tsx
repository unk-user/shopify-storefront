import { DrawerProvider } from './drawer-context';
import { ProductDrawer } from './product-drawer';

export function ProductsGrid({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {children}
      </div>
      <ProductDrawer />
    </DrawerProvider>
  );
}
