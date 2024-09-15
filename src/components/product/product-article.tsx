import { getProductArticle } from '@/lib/shopify';

export async function ProductArticle({ handle }: { handle: string }) {
  const blog = await getProductArticle(handle);
  if (!blog) return null;

  return <div>{blog.articleByHandle.contentHtml}</div>;
}
