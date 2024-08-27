//TODO: IMPLEMENT ADD TO CART BUTTON

'use client';
import { Button } from '@/components/ui/button';
import { Product, ProductOption } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useProductOptions from './useProductOptions';

const formatPrice = (amount: string, currencycode: string) => {
  return Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencycode,
  }).format(Number(amount));
};

const OptionValues = ({
  option,
  selectedValue,
  setValue,
}: {
  option: ProductOption;
  selectedValue: string | null;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="flex items-center flex-wrap gap-[2px]">
      {option.values.map((value) => (
        <Button
          key={value}
          onClick={(e) => {
            e.stopPropagation();
            setValue(value);
          }}
          type="button"
          size="sm"
          className={cn([
            'p-0 bg-black/90 rounded-none text-xs',
            selectedValue === value && 'bg-blue-950',
          ])}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority: boolean;
}) {
  const router = useRouter();
  const { selectedOptions, switchOption, selectedVariant } = useProductOptions({
    product,
  });

  const productLink = `/product/${product.handle}`;

  const handleCardClick = useCallback(() => {
    router.push(productLink);
  }, [router, productLink]);

  const formattedPrice = useMemo(
    () =>
      formatPrice(
        selectedVariant
          ? selectedVariant.price.amount
          : product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      ),
    [product.priceRange, selectedVariant]
  );

  return (
    <article className="h-full flex flex-col hover:cursor-pointer">
      <Link href={productLink}>
        <figure className="w-full aspect-square relative">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || 'product image'}
            className={cn([
              'h-full w-full object-contain',
              !selectedVariant ? 'opacity-100' : 'opacity-0',
            ])}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            fill
          />
          {product.variants.map((variant) => {
            return (
              <Image
                key={variant.id}
                src={variant.image?.url}
                alt={product.featuredImage.altText || 'product image'}
                className={cn([
                  'h-full w-full object-contain',
                  variant.id === selectedVariant?.id
                    ? 'opacity-100'
                    : 'opacity-0',
                ])}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading={priority ? 'eager' : 'lazy'}
                priority={priority}
                fill
              />
            );
          })}
        </figure>
      </Link>
      <Link href={productLink} className="flex flex-col flex-1 basis-auto p-1">
        <h2 className="text-base font-medium mb-2">{product.title}</h2>
        <p className="text-base mt-auto">
          From <span className="font-bold">{formattedPrice}</span>
        </p>
      </Link>
      <div className="space-y-1" onClick={handleCardClick}>
        {product.options.map((option) => (
          <OptionValues
            key={option.name}
            option={option}
            selectedValue={selectedOptions && selectedOptions[option.name]}
            setValue={(value: string) => switchOption(value, option.name)}
          />
        ))}
      </div>
    </article>
  );
}
