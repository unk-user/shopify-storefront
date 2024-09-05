'use client';
import Link from 'next/link';
import useSubmenu from '@/store/navbar-submenu';

import { NavbarCollection } from '@/lib/shopify/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Variants, motion } from 'framer-motion';

const itemsVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', type: 'tween', duration: 0.2 },
  },
  closed: {
    opacity: 0,
    y: 30,
  },
};

export function CollectionMenu({
  collections,
}: {
  collections: NavbarCollection;
}) {
  const { isOpen, open, close } = useSubmenu();

  return (
    <li
      className="inline-block h-full"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Button
        variant="secondary"
        className="uppercase inline-flex items-center"
        asChild
      >
        <Link href="/">Collections</Link>
      </Button>
      <nav
        aria-label="Navbar Submenu"
        className={cn([
          'absolute top-[60px] left-0 right-0 bg-background group-data-[sticky]/header:bg-secondary transition-all duration-200 overflow-hidden px-20',
          isOpen ? 'h-auto' : 'h-0 invisible *:hidden',
        ])}
      >
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={{ open: { transition: { staggerChildren: 0.1 } } }}
          className="h-full w-full pb-8 grid grid-cols-5 gap-12 max-w-screen-2xl mx-auto"
        >
          {collections.map((collection) => (
            <motion.div
              variants={itemsVariants}
              key={collection.handle}
              className="h-full"
              role="menu"
            >
              <Button variant="link" className="px-0" asChild>
                <Link
                  onClick={() => close()}
                  href={`/products/${collection.handle}`}
                  className="block py-4"
                >
                  {collection.title}
                </Link>
              </Button>
              <ul className="space-y-2">
                {collection.products.map((product) => (
                  <li key={product.handle}>
                    <Link
                      className="text-xs text-primary-foreground/75 hover:text-primary-foreground"
                      onClick={() => close()}
                      href={`/product/${product.handle}`}
                    >
                      <p className="leading-normal">{product.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </nav>
    </li>
  );
}
