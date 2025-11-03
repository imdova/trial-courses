import React from "react";
import { Control, FieldErrors, useController, Path } from "react-hook-form";
import { QuizFormValuesTwo } from "@/types/forms";

type DurationField = {
  minutes: number;
  seconds: number;
};

type DurationError = {
  minutes?: {
    message?: string;
  };
  seconds?: {
    message?: string;
  };
};

// Helper type to extract nested field names that match the duration structure
type DurationFieldName<T> = {
  [K in keyof T]: T[K] extends DurationField ? K : never;
}[keyof T];

type Props = {
  name: DurationFieldName<QuizFormValuesTwo>;
  control: Control<QuizFormValuesTwo>;
  errors?: FieldErrors<QuizFormValuesTwo>;
  label?: string;
};

const DurationInput: React.FC<Props> = ({ name, control, errors, label }) => {
  const minutesFieldName = `${name}.minutes` as Path<QuizFormValuesTwo>;
  const secondsFieldName = `${name}.seconds` as Path<QuizFormValuesTwo>;

  const { field: minutesField } = useController({
    control,
    name: minutesFieldName,
    rules: {
      required: "Minutes are required",
      min: { value: 0, message: "Must be 0 or more" },
    },
    defaultValue: 0,
  });

  const { field: secondsField } = useController({
    control,
    name: secondsFieldName,
    rules: {
      required: "Seconds are required",
      min: { value: 0, message: "Must be 0–59" },
      max: { value: 59, message: "Must be less than 60" },
    },
    defaultValue: 0,
  });

  // Type-safe error access
  const errorGroup = errors?.[name] as
    | (DurationError & {
        message?: never;
      })
    | undefined;

  // Ensure the input values are numbers
  const minutesValue =
    typeof minutesField.value === "number" ? minutesField.value : 0;
  const secondsValue =
    typeof secondsField.value === "number" ? secondsField.value : 0;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label || ""}</label>
      <div className="flex items-center gap-3">
        <div>
          <div className="flex flex-col gap-1">
            <label
              className="text-xs text-muted-foreground"
              htmlFor={minutesField.name}
            >
              Minutes
            </label>
            <input
              type="number"
              placeholder="Minutes"
              className={`w-24 px-3 py-1 border text-sm rounded-md focus:outline-none ${
                errorGroup?.minutes ? "border-red-500" : "border-gray-300"
              }`}
              name={minutesField.name}
              onBlur={minutesField.onBlur}
              onChange={(e) =>
                minutesField.onChange(parseInt(e.target.value) || 0)
              }
              value={minutesValue}
              min={0}
            />
          </div>
          {errorGroup?.minutes && (
            <p className="text-red-500 text-xs mt-1">
              {errorGroup.minutes.message}
            </p>
          )}
        </div>

        <span className="text-sm font-medium text-gray-700">:</span>

        <div>
          <div className="flex flex-col gap-1">
            <label
              className="text-xs text-muted-foreground"
              htmlFor={secondsField.name}
            >
              Seconds
            </label>
            <input
              type="number"
              placeholder="Seconds"
              className={`w-24 px-3 py-1 border text-sm rounded-md focus:outline-none ${
                errorGroup?.seconds ? "border-red-500" : "border-gray-300"
              }`}
              name={secondsField.name}
              onBlur={secondsField.onBlur}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                secondsField.onChange(Math.min(59, Math.max(0, value)));
              }}
              value={secondsValue}
              min={0}
              max={59}
            />
          </div>
          {errorGroup?.seconds && (
            <p className="text-red-500 text-xs mt-1">
              {errorGroup.seconds.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DurationInput;
