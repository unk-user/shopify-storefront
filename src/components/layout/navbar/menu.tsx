'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu } from '@/lib/shopify/types';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface CollectionItem extends Menu {}

interface CollectionGroup {
  title: 'collections';
  items: CollectionItem[];
}

export type TransformedMenuItem = Menu | CollectionGroup;

export function isCollectionGroup(
  item: TransformedMenuItem
): item is CollectionGroup {
  return (item as CollectionGroup).items !== undefined;
}

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

//TODO: refactor and change href attribute
export function NavbarMenu({ initialItems }: { initialItems: Menu[] }) {
  const menuItems = useMemo(
    () => transformMenuItems(initialItems),
    [initialItems, transformMenuItems]
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="uppercase">
        {menuItems.map((menuItem) =>
          isCollectionGroup(menuItem) ? (
            <NavigationMenuItem key={menuItem.title}>
              <NavigationMenuTrigger className="uppercase">
                {menuItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-30!">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {menuItem.items.map((item) => (
                    <Link
                      href={item.path}
                      key={item.title}
                      className="w-full rounded-sm hover:bg-accent px-2 py-1"
                    >
                      {item.title.replace('-', ' ').toUpperCase()}
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={menuItem.title}>
              <Link href={menuItem.path} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menuItem.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
