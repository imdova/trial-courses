"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Calendar } from "@/components/UI/calendar";
import { Input } from "@/components/UI/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateToYYYYMMDD(date: Date | undefined) {
  if (!date || isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

const DatePicker: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  value: dateValue,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    dateValue ? new Date(String(dateValue)) : undefined,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Sync with external value changes
  React.useEffect(() => {
    if (dateValue) {
      const newDate = new Date(String(dateValue));
      if (isValidDate(newDate)) {
        setDate(newDate);
        setMonth(newDate);
        setValue(formatDate(newDate));
      }
    } else {
      setDate(undefined);
      setValue("");
    }
  }, [dateValue]);

  const handleChange = (value?: Date) => {
    if (onChange) {
      // Convert Date to YYYY-MM-DD string format
      const dateString = formatDateToYYYYMMDD(value);
      const syntheticEvent = {
        target: { value: dateString },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };
  return (
    <div className="relative flex gap-2">
      <Input
        {...rest}
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          setValue(inputValue);
          const date = new Date(inputValue);
          if (isValidDate(date)) {
            setDate(date);
            setMonth(date);
            handleChange(date);
          } else {
            // If invalid date, still trigger onChange with empty string
            if (onChange) {
              const syntheticEvent = {
                target: { value: "" },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              onChange(syntheticEvent);
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setDate(date);
              setValue(formatDate(date));
              setOpen(false);
              handleChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
