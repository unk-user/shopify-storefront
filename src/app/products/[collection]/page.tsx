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
  const resultsText = products.length > 1 ? 'Results' : 'Result';

  return (
    <>
      <header className="mb-4 md:mb-6 flex md:items-center flex-col md:flex-row px-4 md:px-0">
        <h1 className="text-lg font-medium uppercase">
          {params.collection.replace('-', ' ').toUpperCase()} Collection{' '}
          <span className="md:inline hidden">
            ({products.length} {resultsText})
          </span>
        </h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-auto">
          <p className="text-base text-storefront-primary-300 md:hidden">
            {products.length} {resultsText}
          </p>
          <SortDropdown />
        </div>
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
