"use client";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  Controller,
  useFormContext,
  Control,
  UseFormSetValue,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TimeSlot = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

type FormattedDateString = string;

interface SchedulePickerProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  className?: string;
  placeholder?: string;
  mode?: "start-only" | "start-end";
  endTimeName?: Path<TFormValues>;
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
}

type SchedulePickerRef = {
  value: FormattedDateString | "";
  focus: () => void;
  blur: () => void;
};

const SchedulePicker = forwardRef(function SchedulePicker<
  TFormValues extends FieldValues
>(
  {
    name,
    className = "",
    placeholder = "Select date and time",
    mode = "start-only",
    endTimeName,
    control: propControl,
    setValue,
  }: SchedulePickerProps<TFormValues>,
  ref: React.Ref<SchedulePickerRef>
) {
  const { control: contextControl } = useFormContext<TFormValues>();
  const control = propControl || contextControl;

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<TimeSlot | null>(null);
  const [endTime, setEndTime] = useState<TimeSlot | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [customTime, setCustomTime] = useState<string>("");
  const [yearRange, setYearRange] = useState({
    start: new Date().getFullYear() - 10,
    end: new Date().getFullYear() + 10,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate years for year picker (dynamic range)
  const years = useMemo(() => {
    return Array.from(
      { length: yearRange.end - yearRange.start + 1 },
      (_, i) => yearRange.start + i
    );
  }, [yearRange]);

  // Generate months for month picker
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "long" }),
      index: i,
    }));
  }, []);

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
    const totalCells = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7;
    const daysFromNextMonth = totalCells - (daysInMonth + daysFromPrevMonth);

    const days = [];

    for (let i = daysFromPrevMonth; i > 0; i--) {
      const day = prevMonthDays - i + 1;
      days.push({
        date: new Date(year, month - 1, day),
        currentMonth: false,
        day,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true,
        day: i,
      });
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        currentMonth: false,
        day: i,
      });
    }

    return days;
  };

  const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(date);
      setShowTimeSlots(true);
    }
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowYearPicker(false);
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);
    setCurrentMonth(newDate);
    setShowMonthPicker(false);
  };

  const loadMoreYears = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setYearRange((prev) => ({
        start: prev.start - 10,
        end: prev.start - 1,
      }));
    } else {
      setYearRange((prev) => ({
        start: prev.end + 1,
        end: prev.end + 10,
      }));
    }
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];

    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push({ hour, minute, period: "AM" });
        slots.push({ hour, minute, period: "PM" });
      }
    }

    slots.sort((a, b) => {
      const totalA =
        (a.hour % 12 || 12) * 60 + a.minute + (a.period === "PM" ? 720 : 0);
      const totalB =
        (b.hour % 12 || 12) * 60 + b.minute + (b.period === "PM" ? 720 : 0);
      return totalA - totalB;
    });

    return slots;
  };

  const formatTimeSlot = (time: TimeSlot) => {
    return `${time.hour}:${time.minute.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (date: Date, time: TimeSlot): FormattedDateString => {
    let hours24 = time.hour;
    if (time.period === "PM" && hours24 !== 12) hours24 += 12;
    if (time.period === "AM" && hours24 === 12) hours24 = 0;

    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${hours24
      .toString()
      .padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
  };

  const handleTimeSelect = (time: TimeSlot, type: "start" | "end") => {
    if (type === "start") {
      setStartTime(time);
      if (mode === "start-end" && !endTime) {
        let newHour = time.hour + 1;
        let newPeriod: "AM" | "PM" = time.period;

        if (time.period === "AM" && newHour === 12) {
          newPeriod = "PM";
        } else if (time.period === "PM" && newHour === 12) {
          newPeriod = "AM";
        } else if (newHour > 12) {
          newHour -= 12;
          newPeriod = time.period === "AM" ? "PM" : "AM";
        }

        setEndTime({ hour: newHour, minute: time.minute, period: newPeriod });
      }
    } else {
      setEndTime(time);
    }
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
    const [hours, minutes] = e.target.value.split(":").map(Number);
    if (!isNaN(hours)) {
      const period = hours >= 12 ? "PM" : "AM";
      const twelveHourFormat = hours % 12 || 12;
      setStartTime({
        hour: twelveHourFormat,
        minute: minutes || 0,
        period,
      });
    }
  };

  const togglePeriod = () => {
    if (startTime) {
      setStartTime({
        ...startTime,
        period: startTime.period === "AM" ? "PM" : "AM",
      });
    }
  };

  const handleSave = () => {
    if (selectedDate && startTime) {
      const formattedStartTime = formatDateTime(selectedDate, startTime);
      setValue(
        name as Path<TFormValues>,
        formattedStartTime as PathValue<TFormValues, Path<TFormValues>>
      );

      if (mode === "start-end" && endTime) {
        const formattedEndTime = formatDateTime(selectedDate, endTime);
        setValue(
          endTimeName as Path<TFormValues>,
          formattedEndTime as PathValue<TFormValues, Path<TFormValues>>
        );
      }

      setShowPicker(false);
    }
  };

  const days = generateDays();
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (showPicker && wrapperRef.current && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const pickerHeight = mode === "start-end" ? 600 : 500;
      setDropdownPosition(
        spaceBelow < pickerHeight && inputRect.top > pickerHeight
          ? "top"
          : "bottom"
      );
    }
  }, [showPicker, mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
        setShowYearPicker(false);
        setShowMonthPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useImperativeHandle(ref, () => ({
    value:
      selectedDate && startTime ? formatDateTime(selectedDate, startTime) : "",
    focus: () => {
      setShowPicker(true);
      inputRef.current?.focus();
    },
    blur: () => setShowPicker(false),
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div ref={wrapperRef} className={`relative `}>
          <input
            ref={inputRef}
            type="text"
            readOnly
            value={(field.value as FormattedDateString | "") || ""}
            onClick={() => setShowPicker(!showPicker)}
            className={
              className
                ? className
                : "w-full p-3 pl-4 border border-gray-300 rounded-lg focus:outline-none  text-sm transition-all duration-200"
            }
            placeholder={placeholder}
          />

          {showPicker && (
            <div
              className={`absolute z-50 min-w-[320px] ${
                dropdownPosition === "bottom" ? "mt-2" : "mb-2 bottom-full"
              } left-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-2 rounded-full hover:bg-green-50 text-gray-600 hover:text-green-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMonthPicker(!showMonthPicker);
                        setShowYearPicker(false);
                      }}
                      className="px-3 py-1 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 font-medium transition-colors"
                    >
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                      })}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowYearPicker(!showYearPicker);
                        setShowMonthPicker(false);
                      }}
                      className="px-3 py-1 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700 font-medium transition-colors"
                    >
                      {currentMonth.getFullYear()}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-2 rounded-full hover:bg-green-50 text-gray-600 hover:text-green-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {showYearPicker && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <button
                        type="button"
                        onClick={() => loadMoreYears("prev")}
                        className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-medium text-gray-500">
                        {yearRange.start} - {yearRange.end}
                      </span>
                      <button
                        type="button"
                        onClick={() => loadMoreYears("next")}
                        className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                      {years.map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => handleYearChange(year)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            year === currentMonth.getFullYear()
                              ? "bg-green-500 text-white"
                              : "hover:bg-green-50 text-gray-700"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showMonthPicker && (
                  <div className="mb-4">
                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                      {months.map((month) => (
                        <button
                          key={month.index}
                          type="button"
                          onClick={() => handleMonthChange(month.index)}
                          className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            month.index === currentMonth.getMonth()
                              ? "bg-green-500 text-white"
                              : "hover:bg-green-50 text-gray-700"
                          }`}
                        >
                          {month.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!showYearPicker && !showMonthPicker && (
                  <>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <div
                          key={`${day}-${index}`}
                          className="text-center text-xs font-medium text-gray-500 py-1"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            handleDateClick(day.date, day.currentMonth)
                          }
                          className={`h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                            ${
                              day.currentMonth
                                ? "text-gray-800 hover:bg-green-100"
                                : "text-gray-400"
                            }
                            ${
                              selectedDate &&
                              day.date.getDate() === selectedDate.getDate() &&
                              day.date.getMonth() === selectedDate.getMonth() &&
                              day.date.getFullYear() ===
                                selectedDate.getFullYear() &&
                              day.currentMonth
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : ""
                            }`}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {showTimeSlots && !showYearPicker && !showMonthPicker && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Start Time
                    </h3>
                    <div className="flex gap-3">
                      <select
                        className="border rounded-lg outline-none px-3 py-2 flex-1 bg-white text-sm "
                        value={
                          startTime
                            ? `${startTime.hour}:${startTime.minute
                                .toString()
                                .padStart(2, "0")}:${startTime.period}`
                            : ""
                        }
                        onChange={(e) => {
                          const [hourStr, minuteStr, period] =
                            e.target.value.split(":");
                          if (hourStr && minuteStr && period) {
                            setStartTime({
                              hour: Number(hourStr),
                              minute: Number(minuteStr),
                              period: period as "AM" | "PM",
                            });
                          }
                        }}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time, index) => (
                          <option
                            key={`start-${index}`}
                            value={`${time.hour}:${time.minute
                              .toString()
                              .padStart(2, "0")}:${time.period}`}
                          >
                            {formatTimeSlot(time)} {time.period}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">
                        Or enter custom time:
                      </h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={customTime}
                          onChange={handleCustomTimeChange}
                          className="border rounded-lg px-3 py-2 flex-1 text-sm outline-none"
                        />
                        <button
                          type="button"
                          onClick={togglePeriod}
                          className="px-3 py-2 border rounded-lg bg-white text-sm font-medium hover:bg-green-50 transition-colors"
                        >
                          {startTime?.period || "AM"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {mode === "start-end" && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        End Time
                      </h3>
                      <div className="flex gap-3">
                        <select
                          className="border rounded-lg px-3 py-2 flex-1 bg-white text-sm "
                          value={
                            endTime
                              ? `${endTime.hour}:${endTime.minute
                                  .toString()
                                  .padStart(2, "0")}:${endTime.period}`
                              : ""
                          }
                          onChange={(e) => {
                            const [hourStr, minuteStr, period] =
                              e.target.value.split(":");
                            if (hourStr && minuteStr && period) {
                              setEndTime({
                                hour: Number(hourStr),
                                minute: Number(minuteStr),
                                period: period as "AM" | "PM",
                              });
                            }
                          }}
                        >
                          <option value="">Select time</option>
                          {timeSlots
                            .filter((time) => {
                              if (!startTime) return true;
                              const startTotalMinutes =
                                (startTime.hour % 12 || 12) * 60 +
                                startTime.minute +
                                (startTime.period === "PM" ? 720 : 0);
                              const currentTotalMinutes =
                                (time.hour % 12 || 12) * 60 +
                                time.minute +
                                (time.period === "PM" ? 720 : 0);
                              return currentTotalMinutes > startTotalMinutes;
                            })
                            .map((time, index) => (
                              <option
                                key={`end-${index}`}
                                value={`${time.hour}:${time.minute
                                  .toString()
                                  .padStart(2, "0")}:${time.period}`}
                              >
                                {formatTimeSlot(time)} {time.period}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-2">
                      Quick select:
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots
                        .filter((time) => {
                          if (!startTime || mode === "start-only") return true;
                          const startTotal =
                            (startTime.hour % 12 || 12) * 60 +
                            startTime.minute +
                            (startTime.period === "PM" ? 720 : 0);
                          const currentTotal =
                            (time.hour % 12 || 12) * 60 +
                            time.minute +
                            (time.period === "PM" ? 720 : 0);
                          return currentTotal > startTotal;
                        })
                        .slice(0, mode === "start-end" ? 6 : 3)
                        .map((time, index) => (
                          <button
                            key={`quick-select-${index}`}
                            type="button"
                            onClick={() =>
                              handleTimeSelect(
                                time,
                                mode === "start-end" &&
                                  startTime &&
                                  (time.hour % 12 || 12) * 60 +
                                    time.minute +
                                    (time.period === "PM" ? 720 : 0) >
                                    (startTime.hour % 12 || 12) * 60 +
                                      startTime.minute +
                                      (startTime.period === "PM" ? 720 : 0)
                                  ? "end"
                                  : "start"
                              )
                            }
                            className={`py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                              (mode === "start-end" && endTime
                                ? endTime.hour === time.hour &&
                                  endTime.minute === time.minute &&
                                  endTime.period === time.period
                                : false) ||
                              (startTime &&
                                startTime.hour === time.hour &&
                                startTime.minute === time.minute &&
                                startTime.period === time.period)
                                ? "bg-green-500 text-white"
                                : "bg-white hover:bg-green-50 border border-gray-200"
                            }`}
                          >
                            {formatTimeSlot(time)} {time.period}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowPicker(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={
                        !selectedDate ||
                        !startTime ||
                        (mode === "start-end" && !endTime)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                        !selectedDate ||
                        !startTime ||
                        (mode === "start-end" && !endTime)
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}) as <TFormValues extends FieldValues>(
  props: SchedulePickerProps<TFormValues> & {
    ref?: React.Ref<SchedulePickerRef>;
  }
) => React.ReactElement;

export default SchedulePicker;
