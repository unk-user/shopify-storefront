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
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      <header className="mb-4 flex items-center">
        {searchValue ? (
          <h1 className="text-lg">
            {products.length === 0
              ? 'There are no products that match'
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-medium">&quot;{searchValue}&quot;</span>
          </h1>
        ) : null}
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
