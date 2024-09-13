import { CartHeader, MobileCartDrawer } from '@/components/cart';
import { CartTable } from '@/components/cart/cart-table';
import { SummaryCard } from '@/components/cart/summary-card';

export default function CartPage() {
  return (
    <>
      <header className="section-default mb-4 md:mb-6 flex flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-lg font-medium uppercase">Your Cart</h1>
        <CartHeader />
      </header>
      <section className="section-default flex px-3 md:px-0 flex-1 gap-4 max-md:mb-[240px]">
        <div className="md:basis-3/4 w-full">
          <CartTable />
        </div>
        <div className="md:basis-1/4 w-full flex flex-col items-start max-md:hidden sticky top-32 h-max">
          <SummaryCard />
        </div>
      </section>
      <MobileCartDrawer />
    </>
  );
}
