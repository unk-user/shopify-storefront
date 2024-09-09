import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-8 pb-24 max-w-screen-2xl mx-auto">
      <Suspense fallback={null}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Suspense>
    </section>
  );
}
