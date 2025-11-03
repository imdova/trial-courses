import React, { forwardRef, useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      className,
      value: controlledValue,
      onChange,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(
      options.find((opt) => opt.value === controlledValue) || null
    );
    const selectContainerRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectContainerRef.current &&
          !selectContainerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleOptionSelect = (option: Option) => {
      setSelectedOption(option);
      setIsOpen(false);

      // Trigger onChange if provided
      if (onChange) {
        onChange({
          target: {
            name: props.name,
            value: option.value,
          },
          currentTarget: {
            name: props.name,
            value: option.value,
          },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    return (
      <div ref={selectContainerRef} className="relative w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div
          className={`relative w-full ${
            error ? "text-red-900" : "text-gray-900"
          } `}>
          <select
            ref={ref}
            className="hidden"
            value={controlledValue}
            onChange={(e) => console.log(e.target.value)}
            {...props}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500"
            } ${className || ""} `}>
            <span>
              {selectedOption?.label || placeholder || "Select an option"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {isOpen && (
            <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white shadow-lg">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option)}
                  className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100">
                  {option.label}
                  {selectedOption?.value === option.value && (
                    <Check className="h-4 w-4 text-blue-500" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={`mt-1 text-xs ${
              error ? "text-red-600" : "text-gray-500"
            } `}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
