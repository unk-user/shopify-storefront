import { getCollectionProducts } from '@/lib/shopify';
import Image from 'next/image';

//TODO: lift props to top level
export async function FeaturedProducts() {
  const products = await getCollectionProducts({ collection: 'featured' });

  return (
    <section className="grid grid-rows-1 grid-cols-5 h-[300px] w-screen px-16 overflow-x-scroll my-56">
      {products.map((product) => (
        <div key={product.id} className='relative'>
          <Image
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText}
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className='object-cover'
            fill
          />
        </div>
      ))}
    </section>
  );
}
