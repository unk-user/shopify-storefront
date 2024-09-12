import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CollectionMenu } from './collection-menu';
import { getNavbarCollections } from '@/lib/shopify';
import { MobileNavmenu } from './mobile-menu';

//TODO: HANDLE DATA BOUNDERIES BETTER
export async function NavMenu() {
  const collections = await getNavbarCollections();
  if (!collections) throw new Error('No collections');

  return (
    <nav>
      <ul className="space-x-1 hidden md:flex items-center *:py-2">
        <ListItem href="/products" label="Shop" />
        <CollectionMenu collections={collections} />
        <ListItem href="/about" label="About" />
      </ul>
      <div className="md:hidden">
        <MobileNavmenu collections={collections} />
      </div>
    </nav>
  );
}

const ListItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Button
        variant="secondary"
        className="uppercase hover:underline"
        asChild
      >
        <Link href={href}>{label}</Link>
      </Button>
    </li>
  );
};
