import { ProductProvider } from '@/components/product/product-context';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <main className="main-layout">{children}</main>
    </ProductProvider>
  );
}
