import { DrawerProvider } from './drawer-context';
import { ProductDrawer } from './product-drawer';

export function ProductsGrid({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      <div className="grid gap-x-2 gap-y-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-md:px-4">
        {children}
      </div>
      <ProductDrawer />
    </DrawerProvider>
  );
}
