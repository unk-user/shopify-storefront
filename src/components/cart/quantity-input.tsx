'use client';

import { Minus, Plus } from 'react-feather';
import { Input } from '../ui/input';

export function QuantityInput({
  maxQuantity,
  quantity,
  setQuantity,
}: {
  maxQuantity: number;
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  const increment = () => quantity < maxQuantity && setQuantity(quantity + 1);
  const decrement = () => quantity > 0 && setQuantity(quantity - 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="h-12 w-full md:w-36 bg-secondary flex items-center">
      <button type="button" className="h-12 p-2" onClick={decrement}>
        <Minus width={20} height={20} />
      </button>
      <Input
        type="number"
        min={1}
        max={maxQuantity}
        onChange={handleChange}
        value={quantity}
        className="h-full flex-grow rounded-none border-none bg-secondary text-center text-base"
      />
      <button type="button" className="h-12 p-2 ml-auto" onClick={increment}>
        <Plus width={20} height={20} />
      </button>
    </div>
  );
}
