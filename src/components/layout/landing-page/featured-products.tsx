import { ProductsGrid } from '@/components/products/grid';
import { ProductCard } from '@/components/products/product-card';
import { getCollectionProducts } from '@/lib/shopify';
import Link from 'next/link';

export async function FeaturedProducts() {
  const featuredProducts = await getCollectionProducts({
    collection: 'nextjs-frontend-featured',
    limit: 4,
  });

  return (
    <section className="section-default">
      <div className='flex items-center mb-4'>
        <h2 className='text-lg font-semibold uppercase'>Featured Products</h2>
        <Link href="/products" className='underline ml-auto'>View all</Link>
      </div>
      <ProductsGrid>
        {featuredProducts.map((product) => (
          <ProductCard product={product} key={product.id} priority />
        ))}
      </ProductsGrid>
    </section>
  );
}
