'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { sorting } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import useSortDrawer from '@/store/sort-drawer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

export function SortDrawer() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, open, close, setOpen } = useSortDrawer();
  const q = searchParams.get('q');

  const onChange = (value: string) => {
    const href = createUrl(
      pathname,
      new URLSearchParams({ ...(q && { q }), ...(value && { sort: value }) })
    );

    close();
    router.replace(href);
  };
  return (
    <Drawer open={isOpen && isMobile} onClose={close} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sort By</DrawerTitle>
          <DrawerDescription>Choose Sort Option</DrawerDescription>
        </DrawerHeader>
        <RadioGroup
          defaultValue={searchParams.get('sort') || 'default'}
          onValueChange={onChange}
          className="px-8 mb-12 space-y-1"
        >
          {sorting.map((item) => (
            <div
              key={item.slug || 'default'}
              className="flex items-center gap-2"
            >
              <RadioGroupItem
                value={item.slug || 'default'}
                id={item.slug || 'default'}
              />
              <Label htmlFor={item.slug || 'default'}>{item.title}</Label>
            </div>
          ))}
        </RadioGroup>
      </DrawerContent>
    </Drawer>
  );
}
