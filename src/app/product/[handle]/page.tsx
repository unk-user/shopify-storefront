import { AddToCart } from '@/components/cart/add-to-cart';
import { ProductOptions } from '@/components/product/options';
import { ProductArticle } from '@/components/product/product-article';
import { ProductCarousel } from '@/components/product/product-carousel';
import { getProduct, getProductArticle } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { Suspense } from 'react';

//TODO: PRICE BASED ON SELECTED VARIANT
//TODO: BETTER LOADING FALLBACKS

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);
  const productBlog = await getProductArticle(params.handle);

  if (product)
    return (
      <>
        <section className="section-default flex flex-col md:flex-row">
          <ProductCarousel product={product} />
          <div className="flex-1 px-4 md:pl-4 lg:pl-8 xl:pl-16 pt-4 md:pt-0">
            <ProductDetails product={product} />
          </div>
        </section>
        <section className="section-default">
          {!!productBlog.articleByHandle?.contentHtml ? (
            <Suspense>
              <ProductArticle productBlog={productBlog} />
            </Suspense>
          ) : null}
        </section>
      </>
    );
}

const ProductDetails = ({ product }: { product: Product }) => (
  <div className="flex flex-col md:sticky top-20">
    <h1 className="text-xl md:text-2xl font-bold">{product?.title}</h1>
    <p className="mt-2 text-xs md:text-sm text-primary-foreground/70">
      SKU: {product?.variants[0].sku}
    </p>
    <p className="mt-2 md:mt-4 text-lg md:text-xl font-bold text-storefront-accent-400">
      {formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      )}
    </p>
    <ProductOptions product={product} />
    <AddToCart product={product} />
    <p className="font-poppins mt-8 text-sm">{product?.description}</p>
  </div>
);
