import { Clock, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

type EventListProps = {
  events: Event[];
  selectedDate: Date;
};

const EventList = ({ events, selectedDate }: EventListProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isEventNear = (event: Event) => {
    // 1. Check if the event is today
    const currentDate = new Date(currentTime);
    currentDate.setHours(0, 0, 0, 0);

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() !== currentDate.getTime()) {
      return false; // Not today
    }

    // 2. Parse start and end times
    const [startHours, startMinutes] = event.startTime.split(":").map(Number);
    const [endHours, endMinutes] = event.endTime.split(":").map(Number);

    // 3. Create Date objects for event start & end times (using current date)
    const eventStartTime = new Date(currentTime);
    eventStartTime.setHours(startHours, startMinutes, 0, 0);

    const eventEndTime = new Date(currentTime);
    eventEndTime.setHours(endHours, endMinutes, 0, 0);

    // 4. Calculate time differences
    const minsUntilStart =
      (eventStartTime.getTime() - currentTime.getTime()) / (1000 * 60);
    const minsUntilEnd =
      (eventEndTime.getTime() - currentTime.getTime()) / (1000 * 60);

    // 5. Check if:
    // - Event starts within 30 mins (future) OR
    // - Event is ongoing (started but not ended)
    return (
      (minsUntilStart > 0 && minsUntilStart <= 30) ||
      (minsUntilStart <= 0 && minsUntilEnd > 0)
    );
  };

  if (filteredEvents.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4">
        <p className="text-gray-500 text-sm">
          No events scheduled for this day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Schedule</h3>
        <Link
          href={"/student/schedule"}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          See All
        </Link>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const isNear = isEventNear(event);
          return (
            <div
              key={event.id}
              className={`rounded-lg p-2 ${
                isNear
                  ? "bg-gradient-to-r from-green-800 to-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div
                  className={`text-4xl font-bold p-4 border-r-2 ${
                    isNear
                      ? "text-white border-white"
                      : "text-gray-600 border-gray-600"
                  }`}
                >
                  {selectedDate.getDate()}
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-medium ${
                      isNear ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {event.title}
                  </h4>
                  {event.progress !== undefined &&
                    event.total !== undefined && (
                      <div
                        className={`${
                          isNear
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        } w-fit text-xs px-2 py-1 rounded-full mb-2`}
                      >
                        {event.progress} of {event.total} Chapters
                      </div>
                    )}
                  <div
                    className={`flex items-center ${
                      isNear ? "text-white" : "text-gray-500"
                    } mt-1`}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-sm">
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>

                  {event.link && (
                    <div
                      className={`flex items-center text-sm ${
                        isNear ? "text-white" : "text-gray-800"
                      } mt-1`}
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      <Link
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Meeting
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
