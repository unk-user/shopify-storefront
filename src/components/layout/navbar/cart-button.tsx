import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'react-feather';

export function CartButton() {
  return (
    <Button variant="icon" size="icon">
      <ShoppingBag width={24} height={24} strokeWidth={1.5} />
    </Button>
  );
}
