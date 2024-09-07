'use client';

import { sorting } from '@/lib/constants';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { Sliders } from 'react-feather';
import { Button } from '@/components/ui/button';
import useSortDrawer from '@/store/sort-drawer';

export function SortDropdown() {
  const { open } = useSortDrawer();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const q = searchParams.get('q');

  const onChange = (value: string) => {
    const href = createUrl(
      pathname,
      new URLSearchParams({ ...(q && { q }), ...(value && { sort: value }) })
    );

    router.replace(href);
  };

  return (
    <>
      <Select onValueChange={onChange}>
        <SelectTrigger className="ml-auto hidden md:flex w-[200px] z-20">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="z-20">
          {sorting.map((item) => (
            <SelectItem
              key={item.slug || 'default'}
              value={item.slug || 'default'}
              disabled={
                item.slug
                  ? searchParams.get('sort') === item.slug
                  : searchParams.get('sort') === 'default'
              }
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="link"
        className="md:hidden ml-auto gap-2 p-0 h-min"
        onClick={open}
      >
        <Sliders width={16} height={16} />
        Sort By
      </Button>
    </>
  );
}
