import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/layout/navbar';
import { cookies } from 'next/headers';
import { getCart } from '@/lib/shopify';
import { CartProvider } from '@/components/cart/cart-context';

const inter = Inter({ subsets: ['latin'] });

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = cookies().get('cartId')?.value;
  //Don't await the fetch call because it will block the UI
  const cart = getCart(cartId);

  return (
    <html lang="en">
      <body className={`${inter.className} ${sans.variable}`}>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
