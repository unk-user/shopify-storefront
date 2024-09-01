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

export function SortDropdown() {
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
    <Select onValueChange={onChange}>
      <SelectTrigger className="ml-auto w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
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
  );
}
