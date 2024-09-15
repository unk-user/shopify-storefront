import { getProductArticle } from '@/lib/shopify';
import Prose from '../Prose';

export async function ProductArticle({ handle }: { handle: string }) {
  const blog = await getProductArticle(handle);
  if (!blog) return null;

  return <Prose html={blog.articleByHandle.contentHtml} className='max-md:px-4' />;
}
