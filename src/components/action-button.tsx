import { ArrowUpRight } from 'react-feather';
import { Button } from './ui/button';

export function ActionButton({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#B2B2B2]/60 px-4 py-2 w-max text-lg font-normal group h-auto" asChild={asChild}>
      {children}
      <ArrowUpRight
        className="text-primary-foreground group-hover:rotate-45 transition-transform duration-200"
        strokeWidth={1.5}
      />
    </Button>
  );
}
