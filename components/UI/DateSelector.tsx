"use client";

import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Calendar } from "@/components/UI/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { cn } from "@/util";
import { DayPicker } from "react-day-picker";
import { FormControl } from "./form";

type DateSelectorProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  value?: string;
  placeholder?: string;
  withFormControl?: boolean;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  placeholder,
  withFormControl = false,
  className,
  ...props
}) => {
  const ButtonContent = (
    <Button
      variant="select"
      className={cn("w-auto max-w-full gap-4",value ? "" : "text-muted-foreground", className)}
    >
      <span className="flex items-center gap-2  truncate max-w-full">
        <CalendarDaysIcon />
        {value || placeholder || "Pick a date"}
      </span>
      <ChevronDownIcon />
    </Button>
  );

  return (
    <Popover>
      {withFormControl ? (
        <FormControl>
          <PopoverTrigger asChild>{ButtonContent}</PopoverTrigger>
        </FormControl>
      ) : (
        <PopoverTrigger asChild>{ButtonContent}</PopoverTrigger>
      )}

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar mode="single" today={new Date()} {...props} />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
