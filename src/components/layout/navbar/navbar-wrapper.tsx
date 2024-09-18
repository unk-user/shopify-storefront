'use client';

import { cn } from '@/lib/utils';
import useSubmenu from '@/store/navbar-submenu';
import { useEffect, useRef } from 'react';

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen: collectionMenuOpen } = useSubmenu();

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offset = 28;
        const scrollY = window.scrollY;
        if (scrollY >= offset) {
          headerRef.current.setAttribute('data-sticky', 'true');
        } else {
          headerRef.current.removeAttribute('data-sticky');
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={cn('absolute top-0 right-0 left-0 bg-background h-4 md:h-7', collectionMenuOpen ? '' : 'hidden')} />
      <header
        ref={headerRef}
        className={cn([
          'z-30 inline-block group/header mt-4 md:mt-7 sticky top-0 w-full px-4 md:px-8 xl:px-20 data-[sticky]:bg-secondary data-[sticky]:border-b border-input transition-colors duration-200',
          collectionMenuOpen ? 'bg-background' : '',
        ])}
      >
        <div className="flex items-stretch h-[60px] max-w-screen-2xl mx-auto">
          {children}
        </div>
      </header>
      <div
        className={cn([
          'fixed inset-0 top-[108px] bg-black/90 z-20 transition-opacity duration-300 pointer-events-none',
          collectionMenuOpen ? 'opacity-100' : 'opacity-0',
        ])}
      ></div>
    </>
  );
}
