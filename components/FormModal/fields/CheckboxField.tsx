import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface CheckboxFieldProps {
  field: {
    name: string; // ✅ added
    label?: string;
    resetFields?: string[];
  };
  controllerField: Partial<ControllerRenderProps<FieldValues, string>>;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetValues?: (fieldNames: string[]) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  controllerField,
  onCheckboxChange,
  resetValues,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controllerField.onChange?.(e);
    onCheckboxChange?.(e);
    if (field.resetFields && resetValues) {
      resetValues(field.resetFields);
    }
  };

  return (
    <label className="flex cursor-pointer items-center space-x-2 select-none">
      <div className="relative">
        <input
          type="checkbox"
          name={field.name} // ✅ use field.name
          className="peer sr-only"
          checked={!!controllerField.value}
          onChange={handleChange}
          ref={controllerField.ref} // ✅ RHF ref if provided
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-500"></div>
        <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
      </div>
      {field.label && (
        <span className="text-sm text-gray-700">{field.label}</span>
      )}
    </label>
  );
};
