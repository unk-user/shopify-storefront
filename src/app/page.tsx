import { shopifyFetch } from '@/lib/shopify';

const getProducts = async () => {
  const query = /* GraphQL */ `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const { body: data, status } = await shopifyFetch({ query });
  return data;
};

export default async function Home() {
  const data = await getProducts();

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
