import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 md:px-8 xl:px-16 bg-storefront-primary min-h-screen">
      <Suspense fallback={null}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Suspense>
    </div>
  );
}
