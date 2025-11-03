import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Option } from "@/types/forms";

const RadioGroupChip = ({
  items,
  value,
  onValueChange,
}: {
  items: Option[];
  value: string;
  onValueChange: (value: string) => void;
}) => {
  const id = useId();

  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={value}
      className="grid grid-cols-3 gap-2"
      defaultValue={""}
    >
      {items.map((item) => (
        <label
          key={`${id}-${item.value}`}
          className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:bg-primary/20 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
        >
          <RadioGroupItem
            id={`${id}-${item.value}`}
            value={item.value}
            className="sr-only after:absolute after:inset-0"
            aria-label={`size-radio-${item.value}`}
          />
          <p className="text-foreground text-sm leading-none font-medium">
            {item.icon}
            {item.label}
          </p>
        </label>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupChip;
