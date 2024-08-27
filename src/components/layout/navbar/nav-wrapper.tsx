'use client';

import { cn } from '@/lib/utils';
import useScrollDirection from './useScroll';

export function NavWrapper({ children }: { children: React.ReactNode }) {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={cn([
        'sticky top-0 left-0 right-0 border-b px-4 md:px-8 xl:px-16 bg-white z-20 transition-transform duration-300',
        scrollDirection === 'down' ? '-translate-y-full' : '',
      ])}
    >{children}</header>
  );
}
