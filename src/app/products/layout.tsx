import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-0 md:px-8 xl:px-20 h-full">
      <section className="pt-8 pb-24 max-w-screen-2xl mx-auto">
        <Suspense fallback={null}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </section>
    </div>
  );
}
