import React, { useState, forwardRef, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, Clock, Check } from "lucide-react";
import {
  ControllerRenderProps,
  FieldValues,
  FieldError,
} from "react-hook-form";
import { FieldConfig } from "@/types/forms";

interface TimeFieldProps {
  field: Omit<FieldConfig, "value"> & { value?: string }; // Explicitly add value to field props
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
}

const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ field, controllerField, error }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(12);
    const [minutes, setMinutes] = useState(0);
    const [isAM, setIsAM] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize with field value
    useEffect(() => {
      const currentValue = controllerField?.value ?? field.value;
      if (currentValue) {
        const [h, m] = String(currentValue).split(":").map(Number);
        setHours(h > 12 ? h - 12 : h === 0 ? 12 : h);
        setMinutes(m);
        setIsAM(h < 12);
      } else {
        // Set default values if no value is provided
        setHours(12);
        setMinutes(0);
        setIsAM(true);
      }
    }, [controllerField?.value, field.value]);

    const handleTimeChange = (
      newHours: number,
      newMinutes: number,
      newIsAM: boolean
    ) => {
      const formattedHours = newIsAM ? newHours : newHours + 12;
      const formattedTime = `${formattedHours}:${newMinutes
        .toString()
        .padStart(2, "0")}`;

      // Call field's onChange if it exists
      if (field.onChange) {
        field.onChange(formattedTime);
      }

      // Call controllerField's onChange if it exists
      if (controllerField?.onChange) {
        controllerField.onChange(formattedTime);
      }

      // Call onBlur if it exists
      if (controllerField?.onBlur) {
        controllerField.onBlur();
      }
    };

    const handleHourChange = (increment: boolean) => {
      const newHours = increment ? (hours % 12) + 1 : (hours + 11) % 12;
      const finalHours = newHours === 0 ? 12 : newHours;
      setHours(finalHours);
      handleTimeChange(finalHours, minutes, isAM);
    };

    const handleMinuteChange = (increment: boolean) => {
      const newMinutes = increment ? (minutes + 1) % 60 : (minutes + 59) % 60;
      setMinutes(newMinutes);
      handleTimeChange(hours, newMinutes, isAM);
    };

    const handleAMPMChange = (newIsAM: boolean) => {
      setIsAM(newIsAM);
      handleTimeChange(hours, minutes, newIsAM);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (controllerField?.onBlur) {
          controllerField.onBlur();
        }
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="w-full relative" ref={ref}>
        {field.label && (
          <div className="mb-1">
            <label htmlFor={String(field.name)} className={`font-semibold `}>
              {field.label?.replace("*", "")}
              {field.required ? <span className="text-red-500">*</span> : null}
            </label>
          </div>
        )}

        <div
          className={`w-full h-[42px] rounded-lg border px-4 py-2 flex items-center justify-between cursor-pointer
            ${error ? "border-red-500" : "border-gray-300 "}
            bg-white text-gray-800 shadow-sm transition-all duration-200`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">
              {`${hours}:${minutes.toString().padStart(2, "0")} ${
                isAM ? "AM" : "PM"
              }`}
            </span>
          </div>
          <div className="text-gray-400">
            {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 mt-1 min-w-[250px] right-0 w-full bg-white rounded-lg shadow-lg border border-green-100 overflow-hidden"
          >
            <div className="p-4 flex items-center justify-center gap-4 ">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleHourChange(true)}
                  className="p-2 rounded-full hover:bg-gray-100 text-black"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <div className="text-2xl font-medium text-black my-2">
                  {hours.toString().padStart(2, "0")}
                </div>
                <button
                  type="button"
                  onClick={() => handleHourChange(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-black"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="text-2xl font-medium text-black">:</div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleMinuteChange(true)}
                  className="p-2 rounded-full hover:bg-gray-100 text-black"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <div className="text-2xl font-medium text-black my-2">
                  {minutes.toString().padStart(2, "0")}
                </div>
                <button
                  type="button"
                  onClick={() => handleMinuteChange(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-black"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col items-center ml-4">
                <button
                  type="button"
                  onClick={() => handleAMPMChange(true)}
                  className={`px-3 py-1 rounded-md mb-1 ${
                    isAM
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-green-50"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleAMPMChange(false)}
                  className={`px-3 py-1 rounded-md ${
                    !isAM
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-green-50"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            <div className="p-2 border-t border-green-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (controllerField?.onBlur) {
                    controllerField.onBlur();
                  }
                }}
                className="px-3 py-1 bg-primary text-white rounded-md flex items-center gap-1 hover:bg-primary"
              >
                <Check className="h-4 w-4" /> Done
              </button>
            </div>
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

TimeField.displayName = "TimeField";

export default TimeField;
