import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { cn } from "@/util";
import {
  FieldLabel,
  getDependsOnField,
  getFilteredOptions,
  getPlaceholder,
  MultiSelectTags,
} from "./helper";
import { FieldConfig, Option } from "@/types/forms";
import SearchableSelect from "@/components/UI/form/SearchableSelect";

interface SelectFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
  resetValues?: (fieldNames: FieldConfig["name"][]) => void;
  formValues?: Record<string, string | boolean>;
  dependsOnField?: FieldConfig;
}

// Helper functions
const getCurrentValues = (value: string | boolean): string[] => {
  return Array.isArray(value) ? value : value ? [String(value)] : [];
};

const SelectDropdown: React.FC<{
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  options: Option[];
  isMultiple: boolean;
  error: boolean;
  dependsOn: FieldConfig | null;
  className: string;
  placeholder: string;
  onSelectionChange: (value: string) => void;
  onResetFields?: () => void;
}> = ({
  field,
  controllerField,
  options,
  isMultiple,
  dependsOn,
  className,
  placeholder,
  onSelectionChange,
  onResetFields,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    let value: string;
    if (typeof e === "string") {
      value = e;
    } else {
      value = e.target.value;
    }
    field.onChange?.(value);
    onSelectionChange(value);
    if (field.resetFields) {
      onResetFields?.();
    }
  };

  const renderValue = (value: string) => {
    const selected = options.find((opt) => opt.value == value)?.label;
    return selected ? (
      selected
    ) : (
      <span className="text-neutral-400">
        {field.textFieldProps?.placeholder || placeholder || "Select"}
      </span>
    );
  };

  return (
    <SearchableSelect
      className={cn("w-full bg-white", className)}
      {...controllerField}
      options={options}
      value={isMultiple ? "" : controllerField?.value}
      onChange={handleChange}
      renderValue={renderValue}
      disabled={!!dependsOn}
      error={error}
    />
  );
};

// Main component
const SearchableSelectField: React.FC<SelectFieldProps> = ({
  field,
  controllerField,
  error,
  resetValues,
  formValues,
  dependsOnField,
}) => {
  const isMultiple = field.multiple === true;
  const currentValues = getCurrentValues(controllerField?.value);
  const options = getFilteredOptions(field, isMultiple, currentValues);
  const dependsOn = getDependsOnField(field, formValues, dependsOnField);
  const placeholder = getPlaceholder(field);
  const className = field.textFieldProps?.className || "";

  const handleSelectionChange = (optionValue: string) => {
    if (!controllerField?.onChange) return;

    if (isMultiple) {
      if (!currentValues.includes(optionValue)) {
        controllerField.onChange([...currentValues, optionValue]);
      }
    } else {
      controllerField.onChange(optionValue);
    }
  };

  const removeItem = (item: string) => {
    if (!controllerField?.onChange) return;
    controllerField.onChange(currentValues.filter((value) => value !== item));
  };

  const handleResetFields = () => {
    if (field.resetFields) {
      resetValues?.(field.resetFields);
    }
  };

  return (
    <div className={`w-full ${field.textFieldProps?.label ? "mt-2" : ""}`}>
      <FieldLabel field={field} />

      {isMultiple && (
        <MultiSelectTags
          field={field}
          selectedValues={controllerField?.value}
          onRemoveItem={removeItem}
        />
      )}

      <div>
        <SelectDropdown
          field={field}
          controllerField={controllerField}
          options={options}
          error={!!error}
          isMultiple={isMultiple}
          dependsOn={dependsOn}
          className={className}
          placeholder={placeholder}
          onSelectionChange={handleSelectionChange}
          onResetFields={handleResetFields}
        />
      </div>

      {error && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SearchableSelectField;
