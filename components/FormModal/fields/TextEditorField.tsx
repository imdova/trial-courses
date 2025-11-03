import TextEditor from "@/components/editor/editor";
import { FieldConfig } from "@/types/forms";
import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface TextEditorFieldProps {
  field: FieldConfig;
  controllerField: Partial<ControllerRenderProps<FieldValues, string>>;
  error: FieldError | null;
}

export const TextEditorField: React.FC<TextEditorFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  return (
    <div>
      {field.label && (
        <div className="mb-1">
          <label htmlFor={String(field.name)} className={`font-semibold`}>
            {field.label?.replace("*", "")}
            {field.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      <TextEditor {...controllerField} {...field.componentProps} />
      {error?.message && (
        <p className="text-sm text-red-500">{error?.message}</p>
      )}
    </div>
  );
};
