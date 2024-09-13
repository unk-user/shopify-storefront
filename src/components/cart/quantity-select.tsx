import { CartItem } from '@/lib/shopify/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function QuantitySelect({ line }: { line: CartItem }) {
  return (
    <Select>
      <SelectTrigger className="rounded-none bg-secondary border-none h-8 w-full">
        <SelectValue placeholder={line.quantity.toString()} />
      </SelectTrigger>
      <SelectContent className="min-w-0 rounded-none border-none mt-0!">
        {Array(line.merchandise.quantityAvailable)
          .fill(0)
          .map((_, i) => (
            <SelectItem key={i} value={String(i + 1)} className="px-2">
              {i + 1}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
