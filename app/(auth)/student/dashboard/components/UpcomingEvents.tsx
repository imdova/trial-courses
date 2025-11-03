"use client";
import { events } from "@/constants/events.data";
import { EventCalendar } from "@/types/schedule";
import { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [currentWeekEvents, setCurrentWeekEvents] = useState<typeof events>([]);

  // Get start and end of current week
  const getCurrentWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const weekStart = new Date(now.setDate(diff));
    const weekEnd = new Date(now.setDate(diff + 6));
    return { weekStart, weekEnd };
  };

  // Filter events for current week
  useEffect(() => {
    const { weekStart, weekEnd } = getCurrentWeekRange();
    const filteredEvents = events.filter((event) => {
      return event.date >= weekStart && event.date <= weekEnd;
    });
    setCurrentWeekEvents(filteredEvents);
  }, []);

  // Generate time slots from 8 AM (08:00) to 11:30 PM (23:30) with 30-minute intervals
  useEffect(() => {
    const slots = [];
    for (let hour = 8; hour < 24; hour++) {
      slots.push(
        `${hour.toString().padStart(2, "0")}:00`,
        `${hour.toString().padStart(2, "0")}:30`
      );
    }
    setTimeSlots(slots);
  }, []);

  const formatTime = (time: string) => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    if (hour === 12 && minute === 0) return "12 PM";
    if (hour < 12) return `${hour}:${minuteStr.padStart(2, "0")} AM`;
    if (hour === 12) return `12:${minuteStr.padStart(2, "0")} PM`;
    return `${hour - 12}:${minuteStr.padStart(2, "0")} PM`;
  };

  // Get event color based on type or course
  const getEventColor = (event: EventCalendar) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const hash = event.courseName
      ?.split("")
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return colors[hash ?? 1 % colors.length];
  };

  // Find events for day and time
  const findEventForDayAndTime = (
    day: string,
    time: string,
    events: EventCalendar[]
  ) => {
    const dayIndex = daysOfWeek.indexOf(day);
    const [hours, minutes] = time.split(":").map(Number);
    const slotMinutes = hours * 60 + minutes;

    return events.find((event) => {
      const eventDay = event.date.getDay();
      if (eventDay !== dayIndex) return false;

      const [startHours, startMins] = event.startTime.split(":").map(Number);
      const [endHours, endMins] = event.endTime.split(":").map(Number);
      const eventStart = startHours * 60 + startMins;
      const eventEnd = endHours * 60 + endMins;

      return slotMinutes >= eventStart && slotMinutes < eventEnd;
    });
  };

  return (
    <div className="mt-4 p-2">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Upcoming Events
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white p-4 shadow-sm border border-gray-200 rounded-lg">
        {/* Days column */}
        <div className="w-16 border-r border-gray-100 flex flex-col">
          <div className="h-10 border-b border-gray-100"></div>
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="h-14 flex items-center justify-center border-b border-gray-100 p-1 text-xs font-medium text-gray-700"
            >
              {day.substring(0, 3)}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex flex-col min-w-max">
            {/* Time header */}
            <div className="flex h-10 border-b border-gray-100">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="w-14 flex items-center justify-center border-r border-gray-100 text-[10px] text-gray-500"
                >
                  {index % 2 === 0 ? formatTime(time) : ""}
                </div>
              ))}
            </div>

            {/* Day rows */}
            {daysOfWeek.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex h-14 border-b border-gray-100"
              >
                {timeSlots.map((time, timeIndex) => {
                  const event = findEventForDayAndTime(
                    day,
                    time,
                    currentWeekEvents
                  );
                  const isStartOfEvent = event?.startTime === time;

                  return (
                    <div
                      key={timeIndex}
                      className={`w-12 border-r border-gray-100 relative ${
                        !event ? "hover:bg-gray-50" : ""
                      }`}
                    >
                      {event && isStartOfEvent && (
                        <div
                          className={`absolute flex flex-col justify-center h-fit inset-0.5 text-white z-10 rounded-xl p-2 overflow-hidden ${getEventColor(
                            event
                          )}`}
                          style={{
                            width: `calc(100% * ${
                              (timeToMinutes(event.endTime) -
                                timeToMinutes(event.startTime)) /
                              30
                            })`,
                          }}
                        >
                          <div className="text-[10px] font-medium truncate leading-tight">
                            {event.title}
                          </div>
                          <div className="text-[9px] truncate leading-tight">
                            {formatTime(event.startTime)}-
                            {formatTime(event.endTime)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export default UpcomingEvents;
