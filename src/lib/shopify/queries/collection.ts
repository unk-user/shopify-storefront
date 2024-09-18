import collectionFragment from '../fragments/collection';
import productFragment from '../fragments/product';

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $limit: Int
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: $limit) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getNavbarCollectionsQuery = /* GraphQL */ `
  query getNavbarCollections {
    collections(first: 5, sortKey: TITLE) {
      edges {
        node {
          title
          handle
          products(first: 20, sortKey: TITLE) {
            edges {
              node {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;
