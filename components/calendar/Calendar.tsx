import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  progress?: number;
  total?: number;
  lecturer?: string;
  link?: string;
};

type CalendarProps = {
  events: Event[];
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
};

const Calendar = ({ events, onDateSelect, selectedDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1)
    );
  };

  const nextYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1)
    );
  };

  const jumpToYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearPicker(false);
  };

  const renderYearPicker = () => {
    const currentYear = currentMonth.getFullYear();
    const years = [];
    for (let i = currentYear - 6; i <= currentYear + 5; i++) {
      years.push(i);
    }

    return (
      <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-4 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => jumpToYear(year)}
              className={`p-2 rounded-md text-center ${
                year === currentYear
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };
    return (
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center space-x-1">
          <button
            onClick={prevYear}
            className="p-2 rounded-full text-muted-foreground hover:bg-gray-100"
            aria-label="Previous year"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={prevMonth}
            className="p-2 rounded-full text-muted-foreground hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setShowYearPicker(!showYearPicker)}
          className="text-sm font-semibold text-muted-foreground hover:bg-gray-100 px-3 py-1 rounded-md"
        >
          {currentMonth.toLocaleDateString("en-US", options)}
        </button>

        <div className="flex items-center space-x-1">
          <button
            onClick={nextMonth}
            className="p-2 rounded-full text-muted-foreground hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={nextYear}
            className="p-2 rounded-full text-muted-foreground hover:bg-gray-100"
            aria-label="Next year"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>

        {showYearPicker && renderYearPicker()}
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Get days from previous month to show
    const prevMonthDays = [];
    const prevMonthDaysCount = firstDayOfMonth;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    for (let i = 0; i < prevMonthDaysCount; i++) {
      const day = daysInPrevMonth - prevMonthDaysCount + i + 1;
      prevMonthDays.push(
        <div
          key={`prev-day-${day}`}
          className="h-10 w-10 text-gray-400 flex items-center justify-center text-xs"
        >
          {day}
        </div>
      );
    }

    // Current month days
    const currentMonthDays = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(year, month, d);
      const isSelected =
        selectedDate.toDateString() === currentDate.toDateString();
      const hasEvents = events.some(
        (event) => event.date.toDateString() === currentDate.toDateString()
      );

      currentMonthDays.push(
        <div
          key={`day-${d}`}
          onClick={() => onDateSelect(currentDate)}
          className={`h-10 w-10  rounded-full  flex flex-col items-center justify-center cursor-pointer
            ${isSelected ? "bg-green-100 border-green-500" : "hover:bg-gray-50"}
            ${hasEvents ? "border-green-300" : ""}`}
        >
          <span
            className={`text-xs ${
              isSelected ? "font-bold text-green-800" : ""
            }`}
          >
            {d}
          </span>
          {hasEvents && (
            <div className="w-1 h-1 rounded-full bg-green-500 mt-1"></div>
          )}
        </div>
      );
    }

    // Next month days to fill the grid
    const nextMonthDays = [];
    const totalCells = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 42 - totalCells; // 6 rows x 7 days = 42 cells

    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(
        <div
          key={`next-day-${i}`}
          className="h-10 w-10 text-gray-400 flex items-center justify-center text-xs"
        >
          {i}
        </div>
      );
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    const rows = [];
    for (let i = 0; i < allDays.length; i += 7) {
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-7 gap-3">
          {allDays.slice(i, i + 7)}
        </div>
      );
    }

    return <div className="block mb-4">{rows}</div>;
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
