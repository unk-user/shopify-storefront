import { ProductCarousel } from '@/components/product/product-carousel';
import { getProduct } from '@/lib/shopify';

//TODO: MAKE RESPONSIVE & REFACTOR TO SMALL COMPONENTS

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: product?.priceRange.minVariantPrice.currencyCode,
  }).format(Number(product?.priceRange.minVariantPrice.amount));

  if (product)
    return (
      <>
        <section className="flex flex-col md:flex-row">
          <ProductCarousel product={product} />
          <div className="flex-1 flex flex-col px-4 md:pl-4 lg:pl-8 xl:pl-16">
            <h1 className="text-2xl font-bold">
              {product?.title}
            </h1>
            <p className="mt-2 text-sm text-storefront-primary-300">SKU: {product?.variants[0].sku}</p>
            <p className="mt-4 text-2xl font-bold text-storefront-accent-400">{formattedPrice}</p>
          </div>
        </section>
      </>
    );
}
