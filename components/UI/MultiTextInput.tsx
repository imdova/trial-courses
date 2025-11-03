import { toStringArray } from "@/util/forms";
import { useState, KeyboardEvent } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Plus, X } from "lucide-react";
import { Input } from "./input";
import { FormDescription } from "./form";
import { cn } from "@/util";

interface MultiTextInputProps extends React.ComponentProps<"input"> {
  hideAddBtn?: boolean;
  hideTags?: boolean;
  splitBy?: string;
  disableSplit?: boolean;
}

const MultiTextInput: React.FC<MultiTextInputProps> = ({
  value: initialValue,
  onChange,
  hideAddBtn = false,
  hideTags = false,
  disableSplit = false,
  splitBy = ",",
  className,
  ...props
}) => {
  const value = toStringArray(initialValue);
  const [inputValue, setInputValue] = useState<string>("");
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addItems(inputValue);
    }
  };

  const addItems = (input: string) => {
    let newEntries: string[] = [];
    newEntries = disableSplit
      ? [input.trim()]
      : input
          .split(splitBy)
          .map((item) => item.trim())
          .filter(Boolean);
    const newItems = [...value, ...newEntries];
    if (onChange) {
      const syntheticEvent = {
        target: { value: newItems },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    setInputValue("");
  };
  const removeItem = (indexToRemove: number) => {
    const newItems = value.filter((_, index) => index !== indexToRemove);
    if (onChange) {
      const syntheticEvent = {
        target: { value: newItems },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <>
      {!hideTags && value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <Badge key={index} variant="outline">
              {item}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 size-5"
                onClick={() => removeItem(index)}
              >
                <X className="size-3.5" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-1 rounded-md shadow-xs">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full rounded-r-none shadow-none focus-visible:z-1",
            className,
          )}
          {...props}
        />
        {!hideAddBtn && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none border-l-0"
            onClick={() => addItems(inputValue)}
          >
            <Plus />
            <span className="sr-only">Add</span>
          </Button>
        )}
      </div>

      {value.length > 0 && (
        <FormDescription className="text-xs">
          {value.length} item
          {value.length !== 1 ? "s" : ""} added
        </FormDescription>
      )}
    </>
  );
};

export default MultiTextInput;
