import { QuizFormValuesTwo, RadioGroupOption } from "@/types/forms";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useWatch,
} from "react-hook-form";

type RadioGroupProps = {
  name: keyof QuizFormValuesTwo;
  options: RadioGroupOption[];
  label?: string;
  required?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "solid" | "card";
  register: UseFormRegister<QuizFormValuesTwo>;
  errors?: FieldErrors<QuizFormValuesTwo>;
  watch?: UseFormWatch<QuizFormValuesTwo>;
  control: Control<QuizFormValuesTwo>; // <== add this
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  label,
  required = false,
  className = "",
  orientation = "vertical",
  variant = "default",
  register,
  errors,
  control,
}) => {
  const currentValue = useWatch({ name, control, defaultValue: "" });

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`${
          orientation === "horizontal" ? "flex flex-wrap gap-3" : "space-y-2"
        }`}
      >
        {options.map((option) => (
          <div key={option.value} className="flex gap-2">
            <label
              className={`flex items-start cursor-pointer transition-all ${
                variant === "card"
                  ? `border rounded-lg p-4 ${
                      // Add checked logic via CSS or state if needed externally
                      "border-gray-200 hover:border-gray-300"
                    }`
                  : variant === "solid"
                  ? `w-fit p-1`
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  value={option.value}
                  {...register(name, { required })}
                  className="h-4 w-4 accent-green-600"
                />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="block text-sm font-medium text-gray-900">
                  {option.label}
                </span>
                {option.description && (
                  <span className="block text-xs text-gray-500 mt-1">
                    {option.description}
                  </span>
                )}
              </div>
            </label>

            {/* Conditionally render input if this option is selected and has showInput */}
            {option.showInput && currentValue === option.value && (
              <div className=" ml-3">
                {option.inputProps?.name && (
                  <>
                    <div className="flex items-center flex-wrap gap-2 ">
                      <input
                        type={option.inputProps.type || "number"}
                        placeholder={option.inputProps.placeholder}
                        className={`px-3 py-1 border text-sm rounded-md focus:outline-none ${
                          errors?.[option.inputProps.name]
                            ? "border-red-500"
                            : "border-gray-300"
                        } ${
                          option.inputProps.className || "w-full max-w-[100px]"
                        }`}
                        {...register(option.inputProps.name, {
                          ...(option.inputProps.validation || {}),
                        })}
                      />
                      <span className="text-xs">{option.inputProps.label}</span>
                    </div>
                    {errors?.[option.inputProps.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[option.inputProps.name]?.message as string}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">This field is required.</p>
      )}
    </div>
  );
};
