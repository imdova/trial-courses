import ItemTag from "@/components/UI/ItemTag";
import { FieldConfig } from "@/types/forms";
import { getNestedValue } from "@/util/forms";
import React from "react";

export const getFilteredOptions = (
  field: FieldConfig,
  isMultiple: boolean,
  currentValues: string[]
) => {
  return isMultiple
    ? field.options?.filter((x) => !currentValues.includes(String(x.value))) ||
        []
    : field.options || [];
};

export const getDependsOnField = (
  field: FieldConfig,
  formValues: Record<string, string | boolean> | undefined,
  dependsOnField: FieldConfig | undefined
): FieldConfig | null => {
  return field.dependsOn &&
    formValues &&
    !getNestedValue(formValues, field.dependsOn)
    ? { name: field.dependsOn, ...dependsOnField }
    : null;
};

export const getPlaceholder = (field: FieldConfig): string => {
  if (field.textFieldProps?.label) {
    return String(field.textFieldProps.label).replace("*", "");
  }
  if (field.label) {
    return "Select " + field.label.replace("*", "");
  }
  return "Select " + field.name;
};

export const getDependsOnTooltipText = (dependsOn: FieldConfig): string => {
  const label = dependsOn.textFieldProps?.label
    ? String(dependsOn.textFieldProps.label).replace("*", "")
    : dependsOn.label?.replace("*", "") || dependsOn.name;
  return `Please select ${label} first`;
};

// Sub-components
export const FieldLabel: React.FC<{ field: FieldConfig }> = ({ field }) => {
  const label = field.textFieldProps?.label || field.label;
  if (label) {
    return (
      <label className="mb-1 font-semibold">
        {label.replace("*", "")}
        {field.required ? <span className="text-red-500">* </span> : null}
      </label>
    );
  }

  return null;
};

export const MultiSelectTags: React.FC<{
  field: FieldConfig;
  selectedValues: string[] | undefined;
  onRemoveItem: (item: string) => void;
}> = ({ field, selectedValues, onRemoveItem }) => {
  if (!selectedValues?.length) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {selectedValues.map((item: string, index: number) => {
        const option = field.options?.find((x) => x.value === item);
        return (
          <ItemTag
            key={index}
            item={item}
            label={option?.label || item}
            onRemove={onRemoveItem}
          />
        );
      })}
    </div>
  );
};
