import { SortDropdown } from '@/components/products/sort';
import { ProductsGrid } from '@/components/products/grid';
import { ProductCard } from '@/components/products/product-card';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'Results' : 'Result';

  return (
    <>
      <header className="mb-4 md:mb-6 flex md:items-center flex-col md:flex-row px-4 md:px-0 section-default">
        <h1 className="text-lg font-medium uppercase">
          {searchValue ? `Search results for "${searchValue}"` : `All Products`}
          <span className="md:inline hidden">
            {' '}
            ({products.length} {resultsText})
          </span>
        </h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-auto">
          <p className="text-base text-primary-foreground/70 md:hidden">
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
              priority={index < 4}
            />
          ))}
        </ProductsGrid>
      ) : null}
    </>
  );
}
