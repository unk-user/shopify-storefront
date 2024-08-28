import { ProductOptions } from '@/components/layout/product/options';
import { ProductCarousel } from '@/components/layout/product/product-carousel';
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
      <section className="w-full flex">
        <div className="w-[800px] aspect-square bg-gray-800 flex items-center justify-center py-24 px-28">
          <ProductCarousel product={product} />
        </div>
        <div className="flex-1 flex flex-col px-12 py-24">
          <h1 className="text-xl leading-8 font-bold text-black/85">
            {product?.title}
          </h1>
          <p className="mt-2 text-sm">SKU: {product?.variants[0].sku}</p>
          <p className="mt-4 text-2xl font-bold">{formattedPrice}</p>
          <ProductOptions product={product} />
        </div>
      </section>
    );
}
