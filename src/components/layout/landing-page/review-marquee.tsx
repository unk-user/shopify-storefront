'use client';
import { Marquee } from '@/components/marquee';
import { shopifyFetch } from '@/lib/shopify';
import Image from 'next/image';

//TODO: Refactor Review Marquee
export async function ReviewMarquee() {
  const landingPageQuery = /* GraphQL */ `
    {
      metaobject(handle: { type: "landing_page", handle: "landing-page" }) {
        field(key: "review_marquee") {
          key
          value
          references(first: 20) {
            nodes {
              ... on MediaImage {
                image {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `;

  const landingPageData: any = await shopifyFetch({
    query: landingPageQuery,
  });

  const images =
    landingPageData?.body?.data?.metaobject?.field?.references?.nodes.map(
      (node: any) => node?.image
    ) || [];

  return (
    <Marquee>
      {images.map((img: any) => (
        <div key={img.url} className="w-max h-min">
          <Image
            key={img.url}
            src={img.url}
            alt={img.altText}
            width={img.width}
            height={img.height}
            className="object-cover"
          />
        </div>
      ))}
    </Marquee>
  );
}
