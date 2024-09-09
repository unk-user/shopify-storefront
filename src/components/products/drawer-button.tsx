import { Button } from '../ui/button';

export function DrawerButton({ handleClick }: { handleClick: () => void }) {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleClick();
  };

  return (
    <Button
      className="w-full mt-auto bg-gradient-to-r from-storefront-primary to-storefront-primary-400 
      hover:from-storefront-primary-800 hover:to-storefront-primary-500"
      onClick={onClick}
    >
      Choose Options
    </Button>
  );
}
