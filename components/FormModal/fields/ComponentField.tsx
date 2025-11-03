import { FieldConfig } from "@/types/forms";
import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface ComponentFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error: FieldError | null;
}

export const ComponentField: React.FC<ComponentFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const CustomComponent = field.component!;
  return (
    <CustomComponent
      {...controllerField}
      {...field.componentProps}
      error={!!error}
      helperText={error?.message}
    />
  );
};
