import { AddToCart } from '@/components/cart/add-to-cart';
import { ProductOptions } from '@/components/product/options';
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
        <section className="flex flex-col md:flex-row min-h-screen">
          <ProductCarousel product={product} />
          <div className="flex-1 px-4 md:pl-4 lg:pl-8 xl:pl-16 pt-4 md:pt-0">
            <div className='flex flex-col md:sticky top-20'>
              <h1 className="text-xl md:text-2xl font-bold">
                {product?.title}
              </h1>
              <p className="mt-2 text-xs md:text-sm text-storefront-primary-300">
                SKU: {product?.variants[0].sku}
              </p>
              <p className="mt-2 md:mt-4 text-lg md:text-xl font-bold text-storefront-accent-400">
                {formattedPrice}
              </p>
              <ProductOptions product={product} />
              <AddToCart product={product} />
              <p className="font-poppins mt-8 text-sm">
                {product?.description}
              </p>
            </div>
          </div>
        </section>
      </>
    );
}
