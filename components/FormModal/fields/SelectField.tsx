import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { cn } from "@/util";
import {
  getDependsOnField,
  getFilteredOptions,
  getPlaceholder,
  MultiSelectTags,
} from "./helper";
import { FieldConfig } from "@/types/forms";

interface SelectFieldProps<T extends FieldValues> {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<T, Path<T>>>;
  error?: FieldError | null;
  resetValues?: (fieldNames: string[]) => void;
  formValues?: Record<string, string>;
  dependsOnField?: FieldConfig;
  label?: string;
}

const getCurrentValues = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string");
  if (typeof value === "string" && value) return [value];
  return [];
};

interface SelectDropdownProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  options: FieldConfig["options"];
  isMultiple: boolean;
  dependsOn: FieldConfig | null;
  placeholder: string;
  className: string;
  onSelectionChange: (value: string) => void;
  onResetFields?: () => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  field,
  controllerField,
  options,
  dependsOn,
  placeholder,
  className,
  onSelectionChange,
  onResetFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const value = controllerField?.value;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onSelectionChange(optionValue);
      if (field.resetFields) {
        onResetFields?.();
      }
      setIsOpen(false);
    },
    [onSelectionChange, onResetFields, field.resetFields]
  );

  const renderValue = () => {
    if (!options) return null;

    const selected = options.find((opt) => opt.value === value)?.label;
    return selected ? (
      <span className="truncate">{selected}</span>
    ) : (
      <span className="text-neutral-400 truncate">
        {field.textFieldProps?.placeholder || placeholder || "Select an option"}
      </span>
    );
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={!!dependsOn}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-3 py-2.5 border  border-gray-300 rounded-lg text-left bg-white",
          "focus:outline-none ",
          "transition-all duration-200 ease-in-out",
          !!dependsOn && "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          {renderValue()}
          <span className="pointer-events-none">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto"
          role="listbox"
        >
          {options?.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "cursor-pointer px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2",
                "transition-colors duration-150 ease-in-out",
                value === option.value &&
                  "bg-primary-50 text-primary-600 font-medium"
              )}
              role="option"
              aria-selected={value === option.value}
            >
              {option.icon && (
                <span className="text-lg mr-2">{option.icon}</span>
              )}
              <span className="truncate">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SelectField = <T extends FieldValues>({
  field,
  controllerField,
  error,
  resetValues,
  formValues,
  dependsOnField,
}: SelectFieldProps<T>) => {
  const isMultiple = field.multiple === true;
  const currentValues = getCurrentValues(controllerField?.value);
  const options = getFilteredOptions(field, isMultiple, currentValues);
  const dependsOn = getDependsOnField(field, formValues, dependsOnField);
  const placeholder = getPlaceholder(field);
  const className = field.textFieldProps?.className || "";

  const handleSelectionChange = useCallback(
    (optionValue: string) => {
      if (!controllerField?.onChange) return;

      if (isMultiple) {
        if (!currentValues.includes(optionValue)) {
          controllerField.onChange([...currentValues, optionValue]);
        }
      } else {
        controllerField.onChange(optionValue);
      }
    },
    [controllerField, isMultiple, currentValues]
  );

  const removeItem = useCallback(
    (item: string) => {
      if (!controllerField?.onChange) return;
      controllerField.onChange(currentValues.filter((value) => value !== item));
    },
    [controllerField, currentValues]
  );

  const handleResetFields = useCallback(() => {
    if (field.resetFields) {
      resetValues?.(field.resetFields);
    }
  }, [field.resetFields, resetValues]);

  return (
    <div className="w-full">
      {field.label && (
        <div className="mb-1">
          <label
            htmlFor={String(field.name)}
            className={`font-semibold ${className}`}
          >
            {field.label?.replace("*", "")}
            {field.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      {isMultiple && (
        <MultiSelectTags
          field={field}
          selectedValues={controllerField?.value}
          onRemoveItem={removeItem}
        />
      )}

      <SelectDropdown
        field={field}
        controllerField={controllerField}
        options={options}
        isMultiple={isMultiple}
        dependsOn={dependsOn}
        className={className}
        placeholder={placeholder}
        onSelectionChange={handleSelectionChange}
        onResetFields={handleResetFields}
      />

      {error?.message && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default SelectField;
