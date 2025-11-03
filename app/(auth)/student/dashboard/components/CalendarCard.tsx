"use client";
import { useState } from "react";

const CalendarCard = () => {
  const [startDate, setStartDate] = useState(new Date()); // Starting at Feb 17, 2023
  const today = new Date();

  const monthNames = [
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

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate the next 6 days from start date
  const getDaysToShow = () => {
    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 6; i++) {
      const date = new Date(current);
      date.setDate(current.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const daysToShow = getDaysToShow();
  const currentMonth = startDate.getMonth();
  const currentYear = startDate.getFullYear();

  const changeDateRange = (days: number) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + days);
    setStartDate(newDate);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeDateRange(-6)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={() => changeDateRange(6)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        {/* Day names row */}
        <div className="grid grid-cols-6 gap-2 mb-1">
          {daysToShow.map((date) => (
            <div
              key={`name-${date.getDate()}`}
              className="text-center text-sm font-medium text-gray-500"
            >
              {dayNames[date.getDay()]}
            </div>
          ))}
        </div>

        {/* Day numbers row */}
        <div className="grid grid-cols-6 gap-2">
          {daysToShow.map((date) => (
            <div
              key={`day-${date.getDate()}`}
              className={`text-center py-2 rounded-full
                ${
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()
                    ? "bg-[#3f51b5] text-white"
                    : "text-gray-700"
                }`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
