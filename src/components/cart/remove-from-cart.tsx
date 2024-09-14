'use client'

import { toast } from "sonner";
import { removeItem } from "./actions";
import { useCart } from "./cart-context";
import { Button } from "../ui/button";
import { Trash2 } from "react-feather";

export function RemoveItem({ merchandiseId }: { merchandiseId: string }) {
  const { updateCartItem } = useCart();

  const handleRemove = async (formData: any) => {
    updateCartItem(merchandiseId, 'delete');
    const result = await removeItem(merchandiseId);
    result.status === 'success'
      ? toast.success(result.message)
      : toast.error(result.message);
  };

  return (
    <form action={handleRemove}>
      <Button
        variant="icon"
        size="icon"
        type="submit"
        className="h-auto w-auto p-2 bg-transparent border-none group"
      >
        <Trash2
          strokeWidth={1.5}
          className="text-storefront-primary-300 group-hover:text-primary-foreground transition-colors duration-100"
        />
      </Button>
    </form>
  );
}
