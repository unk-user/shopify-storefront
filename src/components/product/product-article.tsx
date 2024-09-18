import { BlogArticle } from '@/lib/shopify/types';
import Prose from '../Prose';

export function ProductArticle({ productBlog }: { productBlog: BlogArticle }) {
  return (
    <Prose
      html={productBlog.articleByHandle.contentHtml}
      className="max-md:px-4"
    />
  );
}
