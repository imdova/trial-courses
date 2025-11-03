import { UseFormRegisterReturn } from "react-hook-form";
import { forwardRef } from "react";
import { Info } from "lucide-react";

type ToggleProps = {
  id: string;
  label: string;
  className?: string;
  details?: string;
  description?: string;
  disabled?: boolean;
  inputElement?: React.ReactNode; // 🔥 Added here
} & UseFormRegisterReturn;

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      id,
      label,
      description,
      disabled,
      details,
      className,
      inputElement,
      ...register
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div>
              <label
                htmlFor={id}
                className={`text-sm font-medium ${className} text-gray-900 mb-2`}
              >
                {label}
              </label>
              <p className="text-muted-foreground text-sm">{details}</p>
            </div>

            {description?.length && (
              <div className="group cursor-pointer z-20">
                <Info className="text-muted-foreground" size={15} />
                <p className="invisible opacity-0 absolute top-0 bg-white border shadow-md rounded-md p-2 group-hover:visible group-hover:opacity-100 transition-all text-xs text-gray-500">
                  {description}
                </p>
              </div>
            )}
            {inputElement && <div className="ml-2">{inputElement}</div>}
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            disabled={disabled}
            className="sr-only peer"
            {...register}
          />
          <div
            className={`w-11 h-6 bg-gray-200 rounded-full ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            } peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
          ></div>
        </label>
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
