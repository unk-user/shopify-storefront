import { ProductsGrid } from '@/components/products/grid';
import { ProductCard } from '@/components/products/product-card';
import { SortDropdown } from '@/components/products/sort';
import { defaultSort, sorting } from '@/lib/constants';
import { getCollectionProducts } from '@/lib/shopify';

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  return (
    <>
      <header className="mb-4 flex items-center">
        <h1 className="text-lg">
          {params.collection.replace('-', ' ').toUpperCase()} Collection
        </h1>
        <SortDropdown />
      </header>
      {products.length > 0 ? (
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard
              product={product}
              key={product.id}
              priority={index < 3}
            />
          ))}
        </ProductsGrid>
      ) : null}
    </>
  );
}
