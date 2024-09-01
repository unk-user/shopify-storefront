import { getMenu } from '@/lib/shopify';
import { ShoppingBag } from 'react-feather';
import { NavbarMenu } from './menu';
import Link from 'next/link';
import { NavWrapper } from './nav-wrapper';
import { CartSheet } from '@/components/cart/cart-sheet';

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
        <CartSheet />
      </div>
    </NavWrapper>
  );
}
