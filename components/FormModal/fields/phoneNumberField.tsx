import PhoneNumberInput from "@/components/UI/form/phoneNumber";
import { FieldConfig } from "@/types/forms";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface PhoneFieldProps {
  field: FieldConfig;
  controllerField: Partial<ControllerRenderProps<FieldValues, string>>;
}

export const PhoneNumberField: React.FC<PhoneFieldProps> = ({
  field,
  controllerField,
}) => {
  const placeholder =
    "Enter " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label?.replace("*", "")
        : field.name);
  return (
    <div className={`${field.textFieldProps?.label ? "mt-2" : ""}`}>
      {field.label && (
        <div className="mb-1">
          <label htmlFor={String(field.name)} className="font-semibold">
            {field.label?.replace("*", "")}
            {field.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      <PhoneNumberInput
        {...controllerField}
        {...field.componentProps}
        placeholder={field.textFieldProps?.placeholder || placeholder || ""}
      />
    </div>
  );
};
