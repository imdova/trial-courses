import { Button } from "@/components/UI/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/UI/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { Check, ChevronDownIcon } from "lucide-react";
import { Option } from "@/types/forms";
import { cn } from "@/util";
import React from "react";
import { FormControl } from "./form";

interface ComboBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  options: Option[];
  className?: string;
  onChange?: (value: string) => void;
}

const Combobox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  defaultValue,
  className,
  placeholder,
  readOnly,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const item = value
    ? options.find((option) => option.value === value)
    : options.find((option) => option.value === defaultValue);

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            type="button"
            className={cn(
              "aria-expanded:border-primary truncate aria-expanded:ring-primary/50 w-full justify-between aria-expanded:ring-[3px]",
              className,
            )}
            disabled={rest.disabled || readOnly}
          >
            <div className="flex max-w-[calc(100%-1rem)] items-center gap-2 overflow-x-hidden">
              {item && item.icon}
              <p>
                {item?.accessory || item?.label || (
                  <span className="text-muted-foreground">
                    {placeholder ? placeholder : `Select ${rest.name}...`}
                  </span>
                )}
              </p>
            </div>
            <ChevronDownIcon className="text-muted-foreground size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${rest.name}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {rest.name} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, indx) => (
                <CommandItem
                  key={option.value + indx}
                  onSelect={() => {
                    handleChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.icon}
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
