'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ChevronLeft, ChevronRight, Menu } from 'react-feather';
import { NavbarCollection } from '@/lib/shopify/types';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

import Link from 'next/link';

const mainVariants: Variants = {
  open: {
    x: 'calc(-50% - 0.75rem)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      type: 'tween',
    },
  },
  closed: {
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      type: 'tween',
    },
  },
};

//TODO: REFACTOR COMPONENTS

export function MobileNavmenu({
  collections,
}: {
  collections: NavbarCollection;
}) {
  const [open, setOpen] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleOpen = () => {
    if (!open) {
      setSlideOut(false);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <div className="h-full py-2">
        <Button
          size="icon"
          variant="icon"
          asChild
        >
          <SheetTrigger className="flex items-center">
            <Menu
              height={24}
              width={24}
              strokeWidth={1.5}
              className="text-primary-foreground"
            />
          </SheetTrigger>
        </Button>
      </div>
      <SheetContent side="left" className="pt-4 overflow-hidden">
        <SheetHeader className="hidden">
          <SheetTitle>Navbar Menu</SheetTitle>
          <SheetDescription>Menu Links</SheetDescription>
        </SheetHeader>
        <motion.div
          variants={mainVariants}
          animate={slideOut ? 'open' : 'closed'}
          className="flex w-[calc(200%+1.5rem)] gap-6"
        >
          <div title="Main" className="w-full">
            <ul className="w-full mt-8">
              <li>
                <ListLink label="Shop" href="/products" onClick={handleOpen} />
              </li>
              <li>
                <Button
                  variant="mobileNavlink"
                  size="custom"
                  onClick={() => setSlideOut(true)}
                >
                  Collections
                  <ChevronRight width={24} height={24} className="ml-auto" />
                </Button>
              </li>
              <li>
                <ListLink label="About" href="/about" onClick={handleOpen} />
              </li>
            </ul>
          </div>
          <div title="Collections" className="w-full h-full relative pt-8">
            <Button
              variant="ghost"
              className="absolute -top-2 h-8 w-full hover:bg-transparent justify-start px-1 gap-1s"
              onClick={() => setSlideOut(false)}
            >
              <ChevronLeft width={16} height={16} />
              All
            </Button>
            <ListLink
              label="Collections"
              href="/products"
              onClick={handleOpen}
            />
            <ul className="space-y-2">
              {collections.map((collection) => (
                <li key={collection.handle} className="pl-2 font-medium">
                  <Link
                    href={`/products/${collection.handle}`}
                    className="hover:underline"
                    onClick={handleOpen}
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

const ListLink = ({
  label,
  href,
  className,
  onClick,
}: {
  label: string;
  href: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="mobileNavlink"
      size="custom"
      className={className}
      onClick={onClick}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
