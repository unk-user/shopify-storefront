import { ProductProvider } from '@/components/product/product-context';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <div className="pt-8 pb-24 max-w-screen-2xl mx-auto">{children}</div>
    </ProductProvider>
  );
}
