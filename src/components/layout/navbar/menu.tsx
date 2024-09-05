import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CollectionMenu } from './collection-menu';
import { getNavbarCollections } from '@/lib/shopify';

export async function NavMenu() {
  const navbarCollections = await getNavbarCollections()

  return (
    <nav>
      <ul className="space-x-1 flex items-center *:py-2">
        <ListItem href="/products" label="Shop" />
        <CollectionMenu collections={navbarCollections} />
        <ListItem href="/about" label="About" />
      </ul>
    </nav>
  );
}

const ListItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Button variant="secondary" className="uppercase" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </li>
  );
};
