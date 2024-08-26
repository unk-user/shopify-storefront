import { getMenu } from '@/lib/shopify';
import { Menu } from '@/lib/shopify/types';
import { ShoppingBag, User } from 'react-feather';
import { NavbarMenu } from './menu';
import Link from 'next/link';

interface CollectionItem extends Menu {}

interface CollectionGroup {
  title: 'collections';
  items: CollectionItem[];
}

export type TransformedMenuItem = Menu | CollectionGroup;

const transformMenuItems = (menuItems: Menu[]): TransformedMenuItem[] => {
  return menuItems.reduce<TransformedMenuItem[]>((acc, item) => {
    if (item.title.startsWith('collection-')) {
      const collectionGroup = acc.find(
        (i): i is CollectionGroup => i.title === 'collections'
      );
      if (collectionGroup) {
        collectionGroup.items.push({
          title: item.title.replace('collection-', ''),
          path: item.path,
        });
      } else {
        acc.push({
          title: 'collections',
          items: [
            {
              title: item.title.replace('collection-', ''),
              path: item.path,
            },
          ],
        });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};

export async function Navbar() {
  const menuItems = await getMenu('nextjs-frontend-header-menu');
  const transformedMenuItems = transformMenuItems(menuItems);

  return (
    <nav className="top-0 left-0 right-0 border-b px-4 md:px-8 xl:px-16">
      <div className='flex items-center h-16 gap-x-8 mx-auto max-w-screen-2xl'>
        <Link href="/" className="text-lg font-bold font-sans" prefetch>
          KEYCHRON
        </Link>
        <NavbarMenu items={transformedMenuItems} />
        <div className="ml-auto space-x-4 flex items-center">
          <User />
          <ShoppingBag className="mr-1" strokeWidth="0.1rem" />
        </div>
      </div>
    </nav>
  );
}
