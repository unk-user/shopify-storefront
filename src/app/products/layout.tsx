import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 md:px-8 xl:px-16 h-full">
      <section className="py-12 max-w-screen-2xl mx-auto">
        <Suspense fallback={null}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </section>
    </div>
  );
}
