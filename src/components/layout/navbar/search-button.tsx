import { Button } from '@/components/ui/button';
import { Search } from 'react-feather';

export function SearchButton() {
  return (
    <Button
      variant="icon"
      size="icon"
    >
      <Search width={24} height={24} strokeWidth={1.5} />
    </Button>
  );
}
