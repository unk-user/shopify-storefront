'use client';

import {
  useState,
  useRef,
  useCallback,
  MouseEventHandler,
  useEffect,
} from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive';

interface ZoomableImageProps {
  src: string;
  alt: string;
  priority: boolean;
  loading: 'eager' | 'lazy';
}

export function ZoomableImage({
  src,
  alt,
  priority,
  loading,
}: ZoomableImageProps) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleChangeScale = useCallback(() => {
    if (!imageRef.current) return;
    setScale((prevScale) => (prevScale < 2 ? 2 : 1));
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setIsZoomed(false);
      setScale(1);
    }
  }, [isDesktop, setIsZoomed, setScale]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className="object-contain md:rounded-md md:cursor-zoom-in"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        loading={loading}
        fill
        onClick={() => isDesktop && setIsZoomed(true)}
      />
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-none w-screen h-screen p-0 sm:rounded-none hidden md:block">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              ref={imageRef}
              src={src}
              alt={alt}
              className={cn([
                'object-contain h-full aspect-square transition-transform duration-200 ease-in-out',
                scale < 2 ? 'cursor-zoom-in' : 'cursor-zoom-out',
              ])}
              style={{ transform: `scale(${scale})` }}
              sizes="100vw"
              onClick={handleChangeScale}
              loading="lazy"
              fill
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
