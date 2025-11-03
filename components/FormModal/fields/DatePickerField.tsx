"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { FieldConfig } from "@/types/forms";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface DatePickerFieldProps<T extends FieldValues> {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<T, Path<T>>>;
  error?: FieldError | null;
}

const DatePickerField = <T extends FieldValues>({
  field,
  controllerField,
  error,
}: DatePickerFieldProps<T>) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>("");
  const [viewDate, setViewDate] = useState(new Date());
  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const pickerRef = useRef<HTMLDivElement>(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    if (controllerField?.value) {
      const date = new Date(controllerField.value);
      if (!isNaN(date.getTime())) {
        setDateValue(controllerField.value);
        setDisplayValue(formatDateForDisplay(date));
        setViewDate(date);
      }
    }
  }, [controllerField?.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateChange = (date: Date) => {
    const isoString = date.toISOString();
    setDateValue(isoString);
    setDisplayValue(formatDateForDisplay(date));
    controllerField?.onChange?.(isoString);
    setShowPicker(false);
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setViewDate(newDate);
  };

  const changeYear = (increment: number) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setViewDate(newDate);
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      1
    ).getDay();
    const blanks = Array(firstDayOfMonth).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...daysArray].map((day, idx) => (
      <button
        key={idx}
        type="button"
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${day === null ? "invisible" : ""}
          ${
            dateValue &&
            day === new Date(dateValue).getDate() &&
            viewDate.getMonth() === new Date(dateValue).getMonth() &&
            viewDate.getFullYear() === new Date(dateValue).getFullYear()
              ? "bg-green-500 text-white"
              : "hover:bg-gray-100"
          }
          ${
            day === new Date().getDate() &&
            viewDate.getMonth() === new Date().getMonth() &&
            viewDate.getFullYear() === new Date().getFullYear()
              ? "border border-green-300"
              : ""
          }
        `}
        onClick={() =>
          day &&
          handleDateChange(
            new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
          )
        }
        disabled={day === null}
      >
        {day}
      </button>
    ));
  };

  const renderMonths = () => {
    return months.map((month, index) => (
      <button
        type="button"
        key={month}
        className={`p-2 rounded-md hover:bg-gray-100
          ${
            viewDate.getMonth() === index &&
            viewDate.getFullYear() === new Date(dateValue).getFullYear()
              ? "bg-green-100 text-green-600"
              : ""
          }
        `}
        onClick={() => {
          setViewDate(new Date(viewDate.getFullYear(), index, 1));
          setMode("day");
        }}
      >
        {month}
      </button>
    ));
  };

  const renderYears = () => {
    const currentYear = viewDate.getFullYear();
    const startYear = currentYear - (currentYear % 10);
    const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1);

    return years.map((year) => (
      <button
        key={year}
        type="button"
        className={`p-2 rounded-md hover:bg-gray-100
          ${
            viewDate.getFullYear() === year ? "bg-green-100 text-green-600" : ""
          }
        `}
        onClick={() => {
          setViewDate(new Date(year, viewDate.getMonth(), 1));
          setMode("month");
        }}
      >
        {year}
      </button>
    ));
  };

  return (
    <div className=" relative" ref={pickerRef}>
      {field.label && (
        <label
          htmlFor={String(field.name)}
          className="mb-1 block  font-semibold  "
        >
          {field.label.replace("*", "")}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={`flex items-center w-full  rounded-lg border px-3 py-2 outline-none border-gray-300  h-[38px] cursor-pointer
            ${error ? "border-red-500" : "border-gray-300 "}
            transition-colors duration-200
          `}
          onClick={() => setShowPicker(!showPicker)}
        >
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span className={` ${!displayValue ? "text-gray-400" : ""}`}>
            {displayValue || field.textFieldProps?.placeholder || "Select date"}
          </span>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 top-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() =>
                mode === "day" ? changeMonth(-1) : changeYear(-10)
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2">
              <button
                type="button"
                className="px-2 py-1 text-sm font-medium hover:bg-gray-100 rounded"
                onClick={() => setMode("month")}
              >
                {months[viewDate.getMonth()]}
              </button>
              <button
                type="button"
                className="px-2 py-1 text-sm font-medium hover:bg-gray-100 rounded"
                onClick={() => setMode("year")}
              >
                {viewDate.getFullYear()}
              </button>
            </div>

            <button
              type="button"
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => (mode === "day" ? changeMonth(1) : changeYear(10))}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {mode === "day" && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
            </>
          )}

          {mode === "month" && (
            <div className="grid grid-cols-3 gap-2">{renderMonths()}</div>
          )}

          {mode === "year" && (
            <div className="grid grid-cols-3 gap-2">{renderYears()}</div>
          )}

          {/* Footer */}
          <div className="flex justify-between mt-4 pt-2 border-t border-gray-200">
            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-800"
              onClick={() => {
                handleDateChange(new Date());
                setViewDate(new Date());
              }}
            >
              Today
            </button>
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowPicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
