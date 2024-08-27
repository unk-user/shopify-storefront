import { getMenu } from '@/lib/shopify';
import { ShoppingBag, User } from 'react-feather';
import { NavbarMenu } from './menu';
import Link from 'next/link';
import { NavWrapper } from './nav-wrapper';

export async function Navbar() {
  const menuItems = await getMenu('nextjs-frontend-header-menu');
  console.log(menuItems);

  return (
    <NavWrapper>
      <div className="flex items-center py-2 gap-x-8 mx-auto max-w-screen-2xl">
        <Link href="/" className="text-lg font-bold font-sans">
          KEYCHRON
        </Link>
        <NavbarMenu initialItems={menuItems} />
        <div className="ml-auto space-x-4 flex items-center">
          <User />
          <ShoppingBag className="mr-1" strokeWidth="0.1rem" />
        </div>
      </div>
    </NavWrapper>
  );
}
