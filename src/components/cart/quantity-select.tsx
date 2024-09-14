'use client';
import { CartItem } from '@/lib/shopify/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCart } from './cart-context';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { updateItemQuantity } from './actions';
import { toast } from 'sonner';

export function QuantitySelect({ line }: { line: CartItem }) {
  const { updateCartItem } = useCart();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: any) => {
    const quantity = Number(formData.get('quantity'));
    updateCartItem(line.merchandise.id, 'quantity', quantity);
    const response = await updateItemQuantity(line.merchandise.id, quantity);
    response.status === 'success'
      ? toast.success(response.message)
      : toast.error(response.message);
  };

  return (
    <form action={handleSubmit} ref={formRef}>
      <SelectionSubmit formRef={formRef} line={line} />
    </form>
  );
}

function SelectionSubmit({
  line,
  formRef,
}: {
  line: CartItem;
  formRef: React.RefObject<HTMLFormElement>;
}) {
  const { pending } = useFormStatus();

  return (
    <Select
      disabled={pending}
      name="quantity"
      onValueChange={() => formRef.current?.requestSubmit()}
    >
      <SelectTrigger className="rounded-none bg-secondary border-none h-8 w-full">
        <SelectValue placeholder={line.quantity.toString()} />
      </SelectTrigger>
      <SelectContent className="min-w-0 rounded-none border-none mt-0!">
        {Array(line.merchandise.quantityAvailable + 1)
          .fill(0)
          .map((_, i) => (
            <SelectItem key={i} value={String(i)} className="px-8">
              {i}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
