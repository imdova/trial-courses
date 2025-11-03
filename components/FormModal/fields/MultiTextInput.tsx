import ItemTag from "@/components/UI/ItemTag";
import { FieldConfig } from "@/types/forms";
import { toStringArray } from "@/util/forms";
import { useState, KeyboardEvent } from "react";
import { FieldError } from "react-hook-form";
import TextField from "./TextField";
import { Plus } from "lucide-react";
import IconButton from "@/components/UI/Buttons/IconButton";

type Props = {
  field?: FieldConfig;
  error?: FieldError | null;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MultiTextInput: React.FC<Props> = ({
  field,
  error,
  value: valueProp,
  placeholder = "Type multiple values and press Enter",
  onChange,
}) => {
  const value = toStringArray(valueProp);
  const [inputValue, setInputValue] = useState<string>("");
  const inputPlaceholder = placeholder || field?.textFieldProps?.placeholder;
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addItems(inputValue);
    }
  };

  const addItems = (input: string) => {
    const newEntries = input
      .split(",")
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

  const { className, ...labelProps } =
    field?.textFieldProps?.InputLabelProps || {};

  return (
    <div className="w-full">
      {field?.label && (
        <div className="mb-1">
          <label
            htmlFor={String(field?.name)}
            className={`font-semibold ${className}`}
            {...labelProps}
          >
            {field?.label?.replace("*", "")}
            {field?.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {value.map((item, index) => (
            <ItemTag
              key={index}
              item={item}
              label={item}
              onRemove={() => removeItem(index)}
            />
          ))}
        </div>
      )}

      <div className="flex w-full items-center gap-2">
        <TextField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error?.message}
          placeholder={inputPlaceholder}
          className="w-full flex-grow"
        />
        <IconButton
          Icon={Plus}
          className="block md:hidden w-fit"
          onClick={() => inputValue.trim() && addItems(inputValue)}
        />
      </div>

      {value.length > 0 && (
        <div className="text-sm text-gray-500">
          {value.length} item
          {value.length !== 1 ? "s" : ""} added
        </div>
      )}
    </div>
  );
};

export default MultiTextInput;
