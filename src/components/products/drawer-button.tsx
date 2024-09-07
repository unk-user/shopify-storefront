import { Button } from '../ui/button';

export function DrawerButton({ handleClick }: { handleClick: () => void }) {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleClick();
  };

  return (
    <Button
      className="w-full mt-auto bg-gradient-to-r from-storefront-primary to-[#B2B2B2]/50 hover:from-storefront-primary/60 hover:to-[#B2B2B2]/30"
      onClick={onClick}
    >
      Choose Options
    </Button>
  );
}
