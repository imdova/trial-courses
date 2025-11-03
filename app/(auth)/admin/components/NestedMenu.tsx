import React, { useState, useRef, useEffect } from "react";

type DateValue = Date | null;

const DatePicker: React.FC<{
  selected: DateValue;
  onChange: (date: DateValue) => void;
  inline?: boolean;
}> = ({ selected, onChange, inline = false }) => {
  const [isOpen, setIsOpen] = useState(inline);
  const [viewDate, setViewDate] = useState(selected || new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !inline
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inline]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const blanks = Array(firstDay).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...daysArray].map((day, idx) => (
      <button
        key={idx}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${day === null ? "invisible" : ""}
          ${
            selected &&
            day === selected.getDate() &&
            viewDate.getMonth() === selected.getMonth() &&
            viewDate.getFullYear() === selected.getFullYear()
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }
        `}
        onClick={() => {
          if (day) {
            const newDate = new Date(viewDate);
            newDate.setDate(day);
            onChange(newDate);
            if (!inline) setIsOpen(false);
          }
        }}
        disabled={day === null}
      >
        {day}
      </button>
    ));
  };

  const prevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  return (
    <div className="relative" ref={ref}>
      {!inline && (
        <input
          type="text"
          readOnly
          className="border rounded p-2 w-full"
          value={selected ? selected.toLocaleDateString() : ""}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Select date"
        />
      )}

      {isOpen && (
        <div
          className={`absolute z-10 mt-1 bg-white rounded-md shadow-lg border ${
            inline ? "relative mt-0" : ""
          }`}
        >
          <div className="p-2 w-64">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={prevMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                &lt;
              </button>
              <div className="font-medium">
                {months[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const NestedMenu: React.FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value === "Set up") {
      setIsSubMenuOpen(true);
    } else {
      setIsSubMenuOpen(false);
      // Handle other date presets if needed
    }
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      // setStartDate(tempStartDate);
      // setEndDate(tempEndDate);
    }
    setIsSubMenuOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      <select
        className="h-10 rounded border border-gray-300 px-3 py-2"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="">Select a period</option>
        <option value="Today">Today</option>
        <option value="This week">This week</option>
        <option value="This month">This month</option>
        <option value="This year">This year</option>
        <option value="Set up">Custom range</option>
      </select>

      {isSubMenuOpen && (
        <div
          className="absolute left-0 top-full mt-1 z-50"
          onMouseLeave={() => setIsSubMenuOpen(false)}
        >
          <div className="flex flex-col gap-2">
            <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-lg w-[500px]">
              <div className="flex w-full items-center justify-center py-2">
                {tempStartDate || tempEndDate ? (
                  <div className="flex items-center gap-3">
                    <div className="rounded-md border p-2">
                      {formatDate(tempStartDate)}
                    </div>
                    -
                    <div className="rounded-md border p-2">
                      {formatDate(tempEndDate)}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-600">Select Date Range</span>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-medium">Start Date</h3>
                  <DatePicker
                    selected={tempStartDate}
                    onChange={setTempStartDate}
                    inline
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-medium">End Date</h3>
                  <DatePicker
                    selected={tempEndDate}
                    onChange={setTempEndDate}
                    inline
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setTempStartDate(null);
                    setTempEndDate(null);
                    setIsSubMenuOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleApply}
                  disabled={!tempStartDate || !tempEndDate}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedMenu;
