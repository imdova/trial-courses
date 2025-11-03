"use client";
import { useState, useEffect, Suspense } from "react";
import {
  Link as LinkIcon,
  Plus,
  Download,
  SlidersHorizontal,
} from "lucide-react";
import { EventCalendar } from "@/types/schedule";
import { events } from "@/constants/events.data";
import Link from "next/link";
import Image from "next/image";
import FormModal from "@/components/FormModal/FormModal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Loading from "@/components/loading/loading";
import { exportToCSV } from "@/util/general";

const FullSchedule = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<EventCalendar>>({
    title: "",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
  });
  const [filteredEvents, setFilteredEvents] = useState<EventCalendar[]>(events);

  // Get filter from URL or default to 'upcoming'
  const currentFilter = searchParams.get("filter") || "upcoming";

  useEffect(() => {
    // Filter events based on the current filter
    const now = new Date();
    let filtered = [...events];

    switch (currentFilter) {
      case "upcoming":
        filtered = events.filter((event) => event.date >= now);
        break;
      case "past":
        filtered = events.filter((event) => event.date < now);
        break;
      case "pending":
        // Assuming pending events are those with no link or some other condition
        filtered = events.filter((event) => !event.link);
        break;
      default:
        filtered = events;
    }

    setFilteredEvents(filtered);
  }, [currentFilter]);

  // Group events by date
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dateStr = event.date.toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {} as Record<string, EventCalendar[]>);

  const handleEventClick = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const handleCreateEvent = () => {
    // In a real app, you would save the event to your data store
    console.log("Creating new event:", newEvent);
    setShowCreateModal(false);
    setNewEvent({
      title: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "10:00",
    });
  };

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleExport = () => {
    const headers = [
      "Title",
      "Date",
      "Start Time",
      "End Time",
      "Course",
      "Instructor",
      "Link",
    ];

    const data = filteredEvents.map((event) => ({
      Title: event.title,
      Date: event.date.toLocaleDateString(),
      "Start Time": event.startTime,
      "End Time": event.endTime,
      Course: event.courseName || "",
      Instructor: event.instructor?.name || "",
      Link: event.link || "",
    }));

    exportToCSV(data, headers, `schedule_${currentFilter}`);
  };

  // Function to check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a date is yesterday
  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  return (
    <div className="bg-white px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Schedule</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>
      <div className="flex flex-col justify-between items-center gap-4 mb-6 md:flex-row">
        <div className="flex items-center space-x-2 mr-4">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              currentFilter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("upcoming")}
            className={`px-4 py-2 rounded-full text-sm ${
              currentFilter === "upcoming"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-4 py-2 rounded-full text-sm ${
              currentFilter === "pending"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleFilterChange("past")}
            className={`px-4 py-2 rounded-full text-sm ${
              currentFilter === "past"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Past
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center bg-white  text-muted-foreground px-4 py-2 border border-gray-300 rounded-full text-sm mr-2"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={handleExport}
            className="flex items-center bg-white  text-muted-foreground px-4 py-2 border border-gray-300 rounded-full text-sm mr-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center text-sm py-8 text-gray-500">
          No {currentFilter} events found
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([dateStr, dayEvents]) => {
            const date = new Date(dateStr);
            const options: Intl.DateTimeFormatOptions = {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            };

            return (
              <div key={dateStr}>
                <div className="flex items-center gap-2 mb-4">
                  {isToday(date) && (
                    <span className="font-semibold">Today</span>
                  )}
                  {isYesterday(date) && (
                    <span className="font-semibold">Yesterday</span>
                  )}
                  <h4 className="text-sm font-medium">
                    {date.toLocaleDateString("en-US", options)}
                  </h4>
                </div>

                <div className="space-y-4">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg transition-shadow"
                    >
                      <div className="p-4 cursor-pointer">
                        <div className="flex justify-between flex-col gap-4 flex-wrap lg:flex-row">
                          {/* Rest of your event rendering code remains exactly the same */}
                          <div className="flex flex-col justify-between gap-1 flex-1 ">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 ">
                              <span className="flex flex-col text-sm">
                                <span className="text-sm">From</span>
                                <span className="text-black">
                                  {event.startTime}
                                </span>
                              </span>
                              -
                              <span className="flex flex-col text-sm">
                                <span className="text-sm">To</span>
                                <span className="text-black">
                                  {event.endTime}
                                </span>
                              </span>
                            </div>
                            {event.students &&
                              event.students.length > 0 &&
                              expandedEventId === event.id && (
                                <div className="mt-4">
                                  <span className="text-sm text-gray-500">
                                    Students
                                  </span>
                                  <div className="flex -space-x-3">
                                    {event.students
                                      .slice(0, 5)
                                      .map((student, index) => (
                                        <div
                                          key={index}
                                          className="group relative flex items-center"
                                        >
                                          <Image
                                            width={200}
                                            height={200}
                                            src={student.avatar}
                                            alt={student.name}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                          />
                                          <span className="absolute top-full left-0 text-xs bg-black/30 text-white w-fit min-w-[100px] text-center px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                            {student.name}
                                          </span>
                                        </div>
                                      ))}

                                    {event.students.length > 5 && (
                                      <div className="w-10 h-10 z-10 flex items-center justify-center rounded-full bg-primary text-white text-xs font-medium border-2 border-white shadow-sm">
                                        +{event.students.length - 5}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="flex-1 space-y-2">
                            {event.courseName && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Course
                                </span>
                                <h5 className="font-medium text-gray-900 mr-2">
                                  {event.courseName}
                                </h5>
                              </div>
                            )}
                            {expandedEventId === event.id && (
                              <div className="space-y-2">
                                {event.lecturer && (
                                  <div>
                                    <span className="text-sm text-gray-500">
                                      Lecture
                                    </span>
                                    <h5 className="font-medium text-gray-900 mr-2">
                                      {event.lecturer}
                                    </h5>
                                  </div>
                                )}
                                {event.link && (
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Meeting Link
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <LinkIcon className="w-4 h-4 text-gray-500 " />
                                      <Link
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 text-sm hover:underline"
                                      >
                                        {event.link}
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex justify-between gap-4 ">
                              <div className="flex gap-2 items-center">
                                <Image
                                  className="w-10 h-10 rounded-full object-cover"
                                  src={
                                    event.instructor?.avatar ??
                                    "/images/placeholder-avatar.svg"
                                  }
                                  width={100}
                                  height={100}
                                  alt={
                                    event.instructor?.name ?? "instructor name"
                                  }
                                />
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Instructor
                                  </span>
                                  <h5 className="font-medium text-sm text-gray-900">
                                    {event.instructor?.name}
                                  </h5>
                                </div>
                              </div>
                              <button
                                onClick={() => handleEventClick(event.id)}
                                className="text-sm text-green-600 hover:text-green-700"
                              >
                                {expandedEventId === event.id
                                  ? "Show Less"
                                  : "Show More"}
                              </button>
                            </div>
                            {expandedEventId === event.id && (
                              <div className="flex justify-end space-x-2 mt-6">
                                <button className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 text-xs">
                                  Cancel
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-xs">
                                  Reschedule
                                </button>
                                {event.link && (
                                  <Link
                                    href={event.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                  >
                                    Join Meeting
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Event Modal (unchanged) */}
      <FormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
        title="Create New Event"
        maxWidth="lg"
        fields={[
          {
            name: "title",
            label: "Event Title",
            type: "text",
            required: true,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "date",
            label: "Date",
            type: "date",
            required: true,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "startTime",
            label: "From",
            type: "time",
            required: true,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "endTime",
            label: "To",
            type: "time",
            required: true,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "courseName",
            label: "Course Name",
            type: "text",
            required: false,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "instructor",
            label: "Instructor",
            type: "text",
            required: false,
            gridProps: { xs: 12, md: 6 },
          },
          {
            name: "link",
            label: "Meeting Link (optional)",
            type: "text",
            required: false,
            gridProps: { xs: 12, md: 6 },
          },
        ]}
        initialValues={{
          title: newEvent.title,
          date: newEvent.date?.toISOString().split("T")[0],
          startTime: newEvent.startTime,
          endTime: newEvent.endTime,
          courseName: newEvent.courseName || "",
          instructor: newEvent.instructor || "",
          link: newEvent.link || "",
        }}
        onChange={(fieldName, value) => {
          setNewEvent((prev) => {
            // Handle date field separately
            if (fieldName === "date") {
              return {
                ...prev,
                [fieldName]: value ? new Date(value) : undefined,
              };
            }
            return {
              ...prev,
              [fieldName]: value,
            };
          });
        }}
        submitButtonText="Create Event"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

const FullSchedulePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FullSchedule />
    </Suspense>
  );
};

export default FullSchedulePage;
