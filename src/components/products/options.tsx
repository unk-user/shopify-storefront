import { ProductOption } from "@/lib/shopify/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const ProductCardOptions = ({
  option,
  selectedValue,
  setValue,
}: {
  option: ProductOption;
  selectedValue: string | null;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="flex items-center flex-wrap gap-[2px]">
      {option.values.map((value) => (
        <Button
          key={value}
          onClick={(e) => {
            e.stopPropagation();
            setValue(value);
          }}
          type="button"
          size="sm"
          className={cn([
            'p-0 bg-black/90 rounded-none text-xs',
            selectedValue === value && 'bg-blue-950',
          ])}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};