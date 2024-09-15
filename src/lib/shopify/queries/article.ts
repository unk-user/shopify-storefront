export const getProductArticleQuery = /* GraphQL */ `
  query getArticle($handle: String!) {
    blog(handle: "product") {
      title
      articleByHandle(handle: $handle) {
        title
        contentHtml
      }
    }
  }
`;
